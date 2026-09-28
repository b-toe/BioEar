export interface EngineParams {
  gain: number;
  low: number;
  mid: number;
  high: number;
  speechEmphasis: number;
  noiseReduction: number;
  compression: number;
}

export const DEFAULT_PARAMS: EngineParams = {
  gain: 60,
  low: 50,
  mid: 50,
  high: 50,
  speechEmphasis: 30,
  noiseReduction: 20,
  compression: 20,
};

export const PRESETS: Record<string, EngineParams> = {
  natural: { gain: 55, low: 50, mid: 50, high: 50, speechEmphasis: 10, noiseReduction: 5, compression: 10 },
  speechFocus: { gain: 65, low: 35, mid: 65, high: 55, speechEmphasis: 75, noiseReduction: 30, compression: 30 },
  quietRoom: { gain: 50, low: 50, mid: 50, high: 45, speechEmphasis: 20, noiseReduction: 10, compression: 15 },
  noisyRoom: { gain: 70, low: 30, mid: 60, high: 50, speechEmphasis: 70, noiseReduction: 70, compression: 55 },
  bioearPrototype: { gain: 65, low: 40, mid: 60, high: 55, speechEmphasis: 60, noiseReduction: 45, compression: 35 },
};

export const PRESET_LABELS: Record<keyof typeof PRESETS, { name: string; description: string }> = {
  natural: { name: "Natural", description: "Minimal processing." },
  speechFocus: { name: "Speech Focus", description: "Emphasize speech-relevant frequencies." },
  quietRoom: { name: "Quiet Environment", description: "Moderate processing." },
  noisyRoom: { name: "Noisy Environment", description: "Stronger noise reduction and speech emphasis." },
  bioearPrototype: { name: "BioEar Prototype", description: "Conceptual prototype setting — not a medically prescribed hearing profile." },
};
