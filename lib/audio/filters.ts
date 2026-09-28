export function createLowShelf(ctx: AudioContext, freq: number, gainDb: number): BiquadFilterNode {
  const node = ctx.createBiquadFilter();
  node.type = "lowshelf";
  node.frequency.value = freq;
  node.gain.value = gainDb;
  return node;
}

export function createHighShelf(ctx: AudioContext, freq: number, gainDb: number): BiquadFilterNode {
  const node = ctx.createBiquadFilter();
  node.type = "highshelf";
  node.frequency.value = freq;
  node.gain.value = gainDb;
  return node;
}

export function createPeaking(ctx: AudioContext, freq: number, gainDb: number, q = 1): BiquadFilterNode {
  const node = ctx.createBiquadFilter();
  node.type = "peaking";
  node.frequency.value = freq;
  node.gain.value = gainDb;
  node.Q.value = q;
  return node;
}

export function createCompressor(ctx: AudioContext, amount: number): DynamicsCompressorNode {
  const node = ctx.createDynamicsCompressor();
  node.threshold.value = -50 + (1 - amount / 100) * 30;
  node.knee.value = 20;
  node.ratio.value = 2 + (amount / 100) * 10;
  node.attack.value = 0.003;
  node.release.value = 0.25;
  return node;
}

export function createGain(ctx: AudioContext, value: number): GainNode {
  const node = ctx.createGain();
  node.gain.value = value;
  return node;
}
