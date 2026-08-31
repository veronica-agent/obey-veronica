const BARS = [
  6, 10, 14, 8, 18, 22, 12, 20, 9, 16, 24, 11, 7, 19, 15, 21, 8, 13, 17, 10, 22,
  14, 9, 18, 12, 7, 16, 20, 11, 8,
];

export function Waveform({
  className,
  hot = false,
}: {
  className?: string;
  hot?: boolean;
}) {
  return (
    <svg
      className={`wave ${hot ? "wave-hot" : ""} ${className ?? ""}`}
      viewBox="0 0 180 24"
      aria-hidden="true"
      focusable="false"
    >
      {BARS.map((height, i) => (
        <rect
          key={i}
          x={i * 6}
          y={(24 - height) / 2}
          width="3"
          height={height}
          style={{ animationDelay: `${(i % 12) * 70}ms` }}
        />
      ))}
    </svg>
  );
}
