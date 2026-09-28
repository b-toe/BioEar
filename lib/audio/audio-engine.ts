import { createCompressor, createGain, createHighShelf, createLowShelf, createPeaking } from "./filters";
import { DEFAULT_PARAMS, EngineParams } from "./presets";

export type SourceKind = "sample" | "tone" | "microphone";

export class BioEarAudioEngine {
  private ctx: AudioContext | null = null;
  private sourceNode: AudioNode | null = null;
  private mediaStream: MediaStream | null = null;
  private oscillator: OscillatorNode | null = null;

  private inputGain: GainNode | null = null;
  private lowFilter: BiquadFilterNode | null = null;
  private midFilter: BiquadFilterNode | null = null;
  private highFilter: BiquadFilterNode | null = null;
  private speechFilter: BiquadFilterNode | null = null;
  private compressor: DynamicsCompressorNode | null = null;
  private outputGain: GainNode | null = null;

  public rawAnalyser: AnalyserNode | null = null;
  public processedAnalyser: AnalyserNode | null = null;

  private ensureContext(): AudioContext {
    if (!this.ctx) {
      this.ctx = new AudioContext();
    }
    return this.ctx;
  }

  private buildChain(params: EngineParams) {
    const ctx = this.ensureContext();
    this.inputGain = createGain(ctx, params.gain / 50);
    this.lowFilter = createLowShelf(ctx, 300, (params.low - 50) / 2.5);
    this.midFilter = createPeaking(ctx, 1500, (params.mid - 50) / 2.5, 0.9);
    this.highFilter = createHighShelf(ctx, 4000, (params.high - 50) / 2.5);
    this.speechFilter = createPeaking(ctx, 2500, (params.speechEmphasis / 100) * 12, 1.4);
    this.compressor = createCompressor(ctx, params.compression);
    this.outputGain = createGain(ctx, 1);

    this.rawAnalyser = ctx.createAnalyser();
    this.rawAnalyser.fftSize = 2048;
    this.processedAnalyser = ctx.createAnalyser();
    this.processedAnalyser.fftSize = 2048;
  }

  private connectChain() {
    if (
      !this.sourceNode || !this.inputGain || !this.lowFilter || !this.midFilter ||
      !this.highFilter || !this.speechFilter || !this.compressor || !this.outputGain ||
      !this.rawAnalyser || !this.processedAnalyser || !this.ctx
    ) return;

    this.sourceNode.connect(this.rawAnalyser);
    this.sourceNode.connect(this.inputGain);
    this.inputGain
      .connect(this.lowFilter)
      .connect(this.midFilter)
      .connect(this.highFilter)
      .connect(this.speechFilter)
      .connect(this.compressor)
      .connect(this.outputGain);
    this.outputGain.connect(this.processedAnalyser);
    this.outputGain.connect(this.ctx.destination);
  }

  async startSample(url: string, params: EngineParams = DEFAULT_PARAMS): Promise<void> {
    const ctx = this.ensureContext();
    await ctx.resume();
    const audioEl = new Audio(url);
    audioEl.loop = true;
    audioEl.crossOrigin = "anonymous";
    const mediaSource = ctx.createMediaElementSource(audioEl);
    this.sourceNode = mediaSource;
    this.buildChain(params);
    this.connectChain();
    await audioEl.play();
  }

  async startTone(freq: number, params: EngineParams = DEFAULT_PARAMS): Promise<void> {
    const ctx = this.ensureContext();
    await ctx.resume();
    const osc = ctx.createOscillator();
    osc.type = "sine";
    osc.frequency.value = freq;
    this.oscillator = osc;
    this.sourceNode = osc;
    this.buildChain(params);
    this.connectChain();
    osc.start();
  }

  async startMicrophone(params: EngineParams = DEFAULT_PARAMS): Promise<void> {
    const ctx = this.ensureContext();
    await ctx.resume();
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    this.mediaStream = stream;
    const micSource = ctx.createMediaStreamSource(stream);
    this.sourceNode = micSource;
    this.buildChain(params);
    this.connectChain();
  }

  updateParams(params: EngineParams) {
    if (!this.inputGain || !this.lowFilter || !this.midFilter || !this.highFilter || !this.speechFilter || !this.compressor) return;
    this.inputGain.gain.value = params.gain / 50;
    this.lowFilter.gain.value = (params.low - 50) / 2.5;
    this.midFilter.gain.value = (params.mid - 50) / 2.5;
    this.highFilter.gain.value = (params.high - 50) / 2.5;
    this.speechFilter.gain.value = (params.speechEmphasis / 100) * 12;
    this.compressor.ratio.value = 2 + (params.compression / 100) * 10;
  }

  setBypass(bypass: boolean) {
    if (!this.outputGain) return;
    this.outputGain.gain.value = bypass ? 0 : 1;
  }

  stop() {
    this.oscillator?.stop();
    this.oscillator = null;
    this.mediaStream?.getTracks().forEach((t) => t.stop());
    this.mediaStream = null;
    this.sourceNode = null;
    this.ctx?.close();
    this.ctx = null;
  }
}
