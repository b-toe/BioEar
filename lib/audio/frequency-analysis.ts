export function getFrequencyData(analyser: AnalyserNode): Uint8Array {
  const data = new Uint8Array(analyser.frequencyBinCount);
  analyser.getByteFrequencyData(data);
  return data;
}

export function getWaveformData(analyser: AnalyserNode): Uint8Array {
  const data = new Uint8Array(analyser.fftSize);
  analyser.getByteTimeDomainData(data);
  return data;
}

export function binToFrequency(binIndex: number, sampleRate: number, fftSize: number): number {
  return (binIndex * sampleRate) / fftSize;
}

export function frequencyToBin(freq: number, sampleRate: number, fftSize: number): number {
  return Math.round((freq * fftSize) / sampleRate);
}

export function normalize(value: number, max = 255): number {
  return value / max;
}
