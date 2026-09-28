"use client";

export function FloatingWave({ className }: { className?: string }) {
  return (
    <div className={className} aria-hidden="true">
      <svg viewBox="0 0 200 40" width="100%" height="40" preserveAspectRatio="none">
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
          <rect
            key={i}
            x={i * 26}
            y={20 - 10}
            width="6"
            height="20"
            rx="3"
            fill="var(--ink)"
            opacity="0.3"
            style={{
              transformOrigin: `${i * 26 + 3}px 20px`,
              animation: `wave-pulse ${1.2 + (i % 3) * 0.3}s ease-in-out infinite`,
              animationDelay: `${i * 0.08}s`,
            }}
          />
        ))}
      </svg>
    </div>
  );
}
