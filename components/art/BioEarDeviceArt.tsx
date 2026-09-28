export function BioEarDeviceArt({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 320 320" fill="none" className={className} role="img" aria-label="Side profile of a person wearing the BioEar headband device.">
      <path
        d="M120 70c50 0 88 40 92 90 14 4 22 18 18 34-4 14-18 22-32 20-10 32-38 56-74 60v30h-32v-32c-42-10-72-46-72-90 0-62 48-112 100-112Z"
        fill="var(--cream)"
        stroke="var(--ink)"
        strokeOpacity="0.5"
        strokeWidth="1.5"
      />
      {/* headband arc */}
      <path d="M64 150c10-70 78-116 150-96" stroke="var(--lavender)" strokeWidth="6" strokeLinecap="round" fill="none" opacity="0.85" />
      {/* actuator pod near ear */}
      <rect x="196" y="150" width="26" height="46" rx="12" fill="var(--peach)" stroke="var(--ink)" strokeOpacity="0.4" strokeWidth="1.2" />
      <circle cx="209" cy="173" r="4" fill="var(--ink)" opacity="0.4" />
    </svg>
  );
}
