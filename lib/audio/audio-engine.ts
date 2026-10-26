import {
  createCompressor,
  createGain,
  createHighShelf,
  createHighpass,
  createLowShelf,
  createLowpass,
  createPeaking,
} from "./filters";
import { DEFAULT_PARAMS, EngineParams } from "./presets";
import { createSpeechBuffer } from "./speech-sample";

// Noise reduction narrows the band to where speech lives: the highpass climbs
// from 20 Hz to 300 Hz (rumble, hum) and the lowpass falls from 18 kHz to
// 6.5 kHz (hiss) as the slider goes from 0 to 100.
function noiseHighpassHz(amount: number) {
  return 20 * Math.pow(15, amount / 100);
}

function noiseLowpassHz(amount: number) {
  return 18000 * Math.pow(6500 / 18000, amount / 100);
}

// Tones are generated at a moderate level so the gain stage has headroom.
const TONE_LEVEL = 0.3;

export type SourceKind = "sample" | "tone" | "microphone";

export class BioEarAudioEngine {
  private ctx: AudioContext | null = null;
  private sourceNode: AudioNode | null = null;
  private mediaStream: MediaStream | null = null;
  private playingSource: AudioScheduledSourceNode | null = null;

  private inputGain: GainNode | null = null;
  private noiseHighpass: BiquadFilterNode | null = null;
  private noiseLowpass: BiquadFilterNode | null = null;
  private lowFilter: BiquadFilterNode | null = null;
  private midFilter: BiquadFilterNode | null = null;
  private highFilter: BiquadFilterNode | null = null;
  private speechFilter: BiquadFilterNode | null = null;
  private compressor: DynamicsCompressorNode | null = null;
  private outputGain: GainNode | null = null;
  private monitorGain: GainNode | null = null;
  // Choose which version reaches the speakers: the untouched input or the
  // BioEar-processed signal. Both analysers keep running either way.
  private rawOut: GainNode | null = null;
  private processedOut: GainNode | null = null;
  private listenProcessed = true;

  public rawAnalyser: AnalyserNode | null = null;
  public processedAnalyser: AnalyserNode | null = null;

  private ensureContext(): AudioContext {
    if (!this.ctx) {
      this.ctx = new AudioContext();
    }
    return this.ctx;
  }

  private buildChain(params: EngineParams, monitor: boolean) {
    const ctx = this.ensureContext();
    this.inputGain = createGain(ctx, params.gain / 50);
    this.noiseHighpass = createHighpass(ctx, noiseHighpassHz(params.noiseReduction));
    this.noiseLowpass = createLowpass(ctx, noiseLowpassHz(params.noiseReduction));
    this.lowFilter = createLowShelf(ctx, 300, (params.low - 50) / 2.5);
    this.midFilter = createPeaking(ctx, 1500, (params.mid - 50) / 2.5, 0.9);
    this.highFilter = createHighShelf(ctx, 4000, (params.high - 50) / 2.5);
    this.speechFilter = createPeaking(ctx, 2500, (params.speechEmphasis / 100) * 12, 1.4);
    this.compressor = createCompressor(ctx, params.compression);
    this.outputGain = createGain(ctx, 1);
    this.monitorGain = createGain(ctx, monitor ? 1 : 0);
    this.rawOut = createGain(ctx, this.listenProcessed ? 0 : 1);
    this.processedOut = createGain(ctx, this.listenProcessed ? 1 : 0);

    this.rawAnalyser = ctx.createAnalyser();
    this.rawAnalyser.fftSize = 2048;
    this.processedAnalyser = ctx.createAnalyser();
    this.processedAnalyser.fftSize = 2048;
  }

  private connectChain() {
    if (
      !this.sourceNode || !this.inputGain || !this.noiseHighpass || !this.noiseLowpass || !this.lowFilter || !this.midFilter ||
      !this.highFilter || !this.speechFilter || !this.compressor || !this.outputGain ||
      !this.monitorGain || !this.rawOut || !this.processedOut ||
      !this.rawAnalyser || !this.processedAnalyser || !this.ctx
    ) return;

    this.sourceNode.connect(this.rawAnalyser);
    this.sourceNode.connect(this.inputGain);
    this.inputGain
      .connect(this.noiseHighpass)
      .connect(this.noiseLowpass)
      .connect(this.lowFilter)
      .connect(this.midFilter)
      .connect(this.highFilter)
      .connect(this.speechFilter)
      .connect(this.compressor)
      .connect(this.outputGain);
    this.outputGain.connect(this.processedAnalyser);
    this.sourceNode.connect(this.rawOut).connect(this.monitorGain);
    this.outputGain.connect(this.processedOut).connect(this.monitorGain);
    this.monitorGain.connect(this.ctx.destination);
  }

  async startSample(params: EngineParams = DEFAULT_PARAMS): Promise<void> {
    const ctx = this.ensureContext();
    await ctx.resume();
    const source = ctx.createBufferSource();
    source.buffer = createSpeechBuffer(ctx);
    source.loop = true;
    this.playingSource = source;
    this.sourceNode = source;
    this.buildChain(params, true);
    this.connectChain();
    source.start();
  }

  async startTone(freq: number, params: EngineParams = DEFAULT_PARAMS): Promise<void> {
    const ctx = this.ensureContext();
    await ctx.resume();
    const osc = ctx.createOscillator();
    osc.type = "sine";
    osc.frequency.value = freq;
    const level = createGain(ctx, TONE_LEVEL);
    osc.connect(level);
    this.playingSource = osc;
    this.sourceNode = level;
    this.buildChain(params, true);
    this.connectChain();
    osc.start();
  }

  // The microphone is not sent to the speakers unless `monitor` is true:
  // playing it back through open speakers feeds back into the mic and howls.
  async startMicrophone(params: EngineParams = DEFAULT_PARAMS, monitor = false): Promise<void> {
    const ctx = this.ensureContext();
    await ctx.resume();
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: { echoCancellation: true, noiseSuppression: false, autoGainControl: false },
    });
    this.mediaStream = stream;
    const micSource = ctx.createMediaStreamSource(stream);
    this.sourceNode = micSource;
    this.buildChain(params, monitor);
    this.connectChain();
  }

  setMonitor(monitor: boolean) {
    if (!this.monitorGain) return;
    this.monitorGain.gain.value = monitor ? 1 : 0;
  }

  updateParams(params: EngineParams) {
    if (!this.inputGain || !this.noiseHighpass || !this.noiseLowpass || !this.lowFilter || !this.midFilter || !this.highFilter || !this.speechFilter || !this.compressor) return;
    this.inputGain.gain.value = params.gain / 50;
    this.noiseHighpass.frequency.value = noiseHighpassHz(params.noiseReduction);
    this.noiseLowpass.frequency.value = noiseLowpassHz(params.noiseReduction);
    this.lowFilter.gain.value = (params.low - 50) / 2.5;
    this.midFilter.gain.value = (params.mid - 50) / 2.5;
    this.highFilter.gain.value = (params.high - 50) / 2.5;
    this.speechFilter.gain.value = (params.speechEmphasis / 100) * 12;
    this.compressor.threshold.value = -50 + (1 - params.compression / 100) * 30;
    this.compressor.ratio.value = 2 + (params.compression / 100) * 10;
  }

  setListenProcessed(processed: boolean) {
    this.listenProcessed = processed;
    if (!this.ctx || !this.rawOut || !this.processedOut) return;
    // Short crossfade so switching doesn't click.
    const now = this.ctx.currentTime;
    this.rawOut.gain.setTargetAtTime(processed ? 0 : 1, now, 0.02);
    this.processedOut.gain.setTargetAtTime(processed ? 1 : 0, now, 0.02);
  }

  stop() {
    this.playingSource?.stop();
    this.playingSource = null;
    this.mediaStream?.getTracks().forEach((t) => t.stop());
    this.mediaStream = null;
    this.sourceNode = null;
    this.ctx?.close();
    this.ctx = null;
  }
}
