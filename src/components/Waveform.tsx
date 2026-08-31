const CHROME_BARS = [
  3, 5, 4, 6, 5, 7, 4, 6, 5, 4, 6, 5, 3, 5, 6, 4, 5, 3, 6, 4,
];

const MINI_BARS = [4, 7, 5, 9, 6, 8, 5, 7, 4, 8, 6, 5, 7, 4, 6];

export function Waveform({
  className,
  hot = false,
  variant = "chrome",
}: {
  className?: string;
  hot?: boolean;
  variant?: "chrome" | "mini";
}) {
  const mini = variant === "mini";
  const bars = mini ? MINI_BARS : CHROME_BARS;
  const viewBox = mini ? "0 0 90 12" : "0 0 120 8";
  const step = mini ? 6 : 6;
  const barWidth = mini ? 2.5 : 2;
  const viewHeight = mini ? 12 : 8;

  return (
    <svg
      className={`wave wave-${variant} ${hot ? "wave-hot" : ""} ${className ?? ""}`}
      viewBox={viewBox}
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
    >
      {bars.map((height, i) => (
        <rect
          key={i}
          x={i * step}
          y={(viewHeight - height) / 2}
          width={barWidth}
          height={height}
          rx={barWidth / 2}
          style={{ animationDelay: `${(i % 12) * 70}ms` }}
        />
      ))}
    </svg>
  );
}
