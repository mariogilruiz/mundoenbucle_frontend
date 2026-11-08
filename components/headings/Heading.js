export default function Heading({ text, as: Tag = "h2", className = "" }) {
  return (
    <Tag
      data-aos="fade-up"
      className={`text-3xl font-semibold tracking-tight text-primary md:text-4xl ${className}`.trim()}
    >
      {text ? text : "Cargando..."}
    </Tag>
  );
}
