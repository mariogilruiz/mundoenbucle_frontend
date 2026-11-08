import "./fade_down.css";

export default function Fade_down({
  children,
  durationMs = 3000,
  delayMs = 100,
  easing = "ease",
  className,
}) {
  return (
    <div
      className={["fade-down", className].filter(Boolean).join(" ")}
      style={{
        "--fade-duration": `${durationMs}ms`,
        "--fade-delay": `${delayMs}ms`,
        "--fade-easing": easing,
      }}
    >
      {children}
    </div>
  );
}
