export interface ArtSource {
  name: string;
  asset: string;
  sourceUrl: string;
  license: string;
  attributionRequired: boolean;
}

export const ART_SOURCES: ArtSource[] = [
  {
    name: "Custom",
    asset: "All device, signal-path, waveform, and bone-conduction illustrations",
    sourceUrl: "",
    license: "Original artwork for this project",
    attributionRequired: false,
  },
];

export const ICON_LIBRARY = {
  name: "Lucide",
  sourceUrl: "https://lucide.dev",
  license: "ISC License",
  attributionRequired: false,
  note: "Used throughout the interface for consistent, lightweight iconography.",
};
