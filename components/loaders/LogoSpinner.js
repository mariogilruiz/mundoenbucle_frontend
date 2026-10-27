import "./logoSpinner.css";

const SIZE_CLASSES = {
  sm: "logo-spinner--sm",
  md: "logo-spinner--md",
  lg: "logo-spinner--lg",
};

export default function LogoSpinner({
  label = "Cargando",
  size = "md",
  className = "",
}) {
  const sizeClass = SIZE_CLASSES[size] ?? SIZE_CLASSES.md;

  return (
    <div
      className={`logo-spinner flex-col ${sizeClass} ${className}`.trim()}
      role="status"
      aria-label={label}
    >
      <span className="logo-spinner__circles" aria-hidden="true">
        <span className="logo-spinner__circle logo-spinner__circle--red" />
        <span className="logo-spinner__circle logo-spinner__circle--orange" />
        <span className="logo-spinner__circle logo-spinner__circle--yellow" />
      </span>
      {label && (
        <span className="logo-spinner__label pt-1 md:pt-3 text-[var(--muted)]">
          {label}
        </span>
      )}
    </div>
  );
}
