// Builds a synthetic, speech-like demo clip in the browser so the Sound Lab has
// something closer to a voice than a pure tone, without shipping a recording.
// Voiced syllables use a glottal pulse train shaped by vowel formants, with
// short "s" fricatives between some of them, over a bed of low rumble, mains
// hum and high hiss so the noise reduction control has something to remove.

type Vowel = [number, number, number];

const VOWELS: Record<string, Vowel> = {
  a: [730, 1090, 2440],
  e: [530, 1840, 2480],
  i: [270, 2290, 3010],
  o: [570, 840, 2410],
  u: [300, 870, 2240],
};

// [vowel, duration in s, pitch in Hz, followed by an "s"]
const PHRASE: Array<[keyof typeof VOWELS, number, number, boolean]> = [
  ["e", 0.18, 150, false],
  ["o", 0.22, 160, false],
  ["i", 0.16, 170, true],
  ["a", 0.26, 155, false],
  ["u", 0.18, 140, false],
  ["e", 0.2, 165, true],
  ["o", 0.3, 130, false],
];

const GAP = 0.07;
const PAUSE = 0.6;

function resonate(input: Float32Array, freq: number, bandwidth: number, sampleRate: number): Float32Array {
  const out = new Float32Array(input.length);
  const r = Math.exp((-Math.PI * bandwidth) / sampleRate);
  const b1 = 2 * r * Math.cos((2 * Math.PI * freq) / sampleRate);
  const b2 = -r * r;
  const a0 = 1 - r;
  let y1 = 0;
  let y2 = 0;
  for (let n = 0; n < input.length; n++) {
    const y = a0 * input[n] + b1 * y1 + b2 * y2;
    out[n] = y;
    y2 = y1;
    y1 = y;
  }
  return out;
}

function envelope(n: number, length: number, fade: number): number {
  return Math.min(1, n / fade, (length - n) / fade);
}

export function createSpeechBuffer(ctx: BaseAudioContext): AudioBuffer {
  const sr = ctx.sampleRate;
  const speechSeconds = PHRASE.reduce((t, [, d, , s]) => t + d + GAP + (s ? 0.12 + GAP : 0), 0);
  const total = Math.ceil((speechSeconds + PAUSE) * sr);
  const data = new Float32Array(total);

  let cursor = 0;
  for (const [vowel, duration, pitch, sibilant] of PHRASE) {
    const len = Math.floor(duration * sr);
    const pulses = new Float32Array(len);
    let phase = 0;
    for (let n = 0; n < len; n++) {
      // Gentle downward glide within each syllable, like natural intonation.
      const f0 = pitch * (1.05 - 0.1 * (n / len));
      phase += f0 / sr;
      if (phase >= 1) {
        phase -= 1;
        pulses[n] = 1;
      }
    }
    const [f1, f2, f3] = VOWELS[vowel];
    const a = resonate(pulses, f1, 90, sr);
    const b = resonate(pulses, f2, 110, sr);
    const c = resonate(pulses, f3, 160, sr);
    const fade = Math.floor(0.03 * sr);
    for (let n = 0; n < len; n++) {
      data[cursor + n] += (a[n] + 0.6 * b[n] + 0.35 * c[n]) * envelope(n, len, fade);
    }
    cursor += len + Math.floor(GAP * sr);

    if (sibilant) {
      const sLen = Math.floor(0.12 * sr);
      const white = new Float32Array(sLen).map(() => Math.random() * 2 - 1);
      const s = resonate(white, 6000, 2500, sr);
      const sFade = Math.floor(0.02 * sr);
      for (let n = 0; n < sLen; n++) data[cursor + n] += 1.6 * s[n] * envelope(n, sLen, sFade);
      cursor += sLen + Math.floor(GAP * sr);
    }
  }

  // Level the voice by its loudness (RMS) rather than its spiky peaks, while
  // keeping peaks clear of clipping.
  let peak = 0;
  let energy = 0;
  for (let n = 0; n < cursor; n++) {
    peak = Math.max(peak, Math.abs(data[n]));
    energy += data[n] * data[n];
  }
  const rms = Math.sqrt(energy / cursor) || 1;
  const speechScale = Math.min(0.12 / rms, 0.75 / (peak || 1));

  // Background noise: brown-noise rumble, 60 Hz hum and high-frequency hiss.
  const hiss = resonate(new Float32Array(total).map(() => Math.random() * 2 - 1), 12000, 6000, sr);
  let brown = 0;
  for (let n = 0; n < total; n++) {
    brown = 0.995 * brown + 0.02 * (Math.random() * 2 - 1);
    const hum = Math.sin((2 * Math.PI * 60 * n) / sr);
    data[n] = data[n] * speechScale + 0.1 * brown + 0.02 * hum + 0.04 * hiss[n];
  }

  const buffer = ctx.createBuffer(1, total, sr);
  buffer.copyToChannel(data, 0);
  return buffer;
}
