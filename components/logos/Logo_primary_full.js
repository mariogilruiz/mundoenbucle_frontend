import { getAssetUrl } from "@/lib/project";
import Image from "next/image";
import Link from "next/link";

export default function Logo_primary_full() {
  return (
    <Link
      href="/"
      aria-label="Ir al inicio de Mundo en Bucle"
      className="flex items-center gap-2 font-logo text-xl font-bold text-[var(--primary)]"
    >
      <Image
        src={getAssetUrl("logos/logo_MundoEnBucle_SVG.svg")}
        alt="logo principal de MundoEnBucle"
        width={32}
        height={32}
        unoptimized
        className="h-8 w-auto"
      />
      MundoEnBucle
      {/* <Image
        src={getAssetUrl("logos/logo_MundoEnBucle_E_SVG.svg")}
        alt="logo MundoEnBucle "
        width={32}
        height={32}
        unoptimized
        className="h-5 w-auto ml-[-7] mt-[5]"
      /> */}
    </Link>
  );
}
