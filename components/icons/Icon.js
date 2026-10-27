// Los iconos viven en public/sprite.svg; name es el id del <symbol>
export default function Icon({ name, size = 24, className, ...props }) {
  return (
    <svg
      width={size}
      height={size}
      aria-hidden="true"
      className={className}
      {...props}
    >
      <use href={`/sprite.svg#${name}`} />
    </svg>
  );
}
