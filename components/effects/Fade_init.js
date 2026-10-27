import "./fade_init.css";

export default function Fade_init({
  children,
  durationMs = 1000,
  delayMs = 600,
  easing = "ease",
  className,
}) {
  return (
    <div
      className={["fade-init", className].filter(Boolean).join(" ")}
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
