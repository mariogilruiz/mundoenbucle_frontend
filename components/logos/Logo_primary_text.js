import Link from "next/link";

export default function Logo_primary_text() {
  return (
    <Link
      href="/"
      aria-label="Ir al inicio de Mundo en Bucle"
      className="flex items-center gap-2 font-logo text-xl font-bold text-[var(--primary)]"
    >
      MundoEnBucle
    </Link>
  );
}
