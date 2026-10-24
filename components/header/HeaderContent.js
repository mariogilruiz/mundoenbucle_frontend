import Image from "next/image";
import Link from "next/link";
import { getAssetUrl } from "@/lib/project";
import Buttons from "../buttons/Buttons";
import HeaderLink from "./HeaderLink";
import HeaderMobile from "./HeaderMobile";

export default function HeaderContent({ datas }) {
  if (!datas?.nav) return null;

  return (
    <header className="sticky top-0 z-50 bg-foreground text-[var(--primary)]">
      <div className="mx-auto flex h-16 max-w-7xl items-stretch justify-between gap-4 px-6">
        <Link
          href="/"
          aria-label={datas.aria?.home}
          className="flex items-center gap-2 font-logo text-xl font-bold text-[var(--primary)]"
        >
          <Image
            src={getAssetUrl("logos/logo_MundoEnBucle_SVG.svg")}
            alt=""
            width={32}
            height={32}
            unoptimized
            className="h-8 w-auto"
          />
          {datas.brand}
        </Link>

        <nav aria-label={datas.aria?.mainNav} className="hidden lg:flex">
          <ul className="flex items-stretch gap-[22px]">
            {datas.nav.map((item) => (
              <li key={item.label} className="group flex items-stretch">
                <HeaderLink
                  href={item.href}
                  className="flex items-center gap-1 whitespace-nowrap text-[12px] font-medium transition-colors hover:text-[var(--primary-hover)] group-hover:text-[var(--primary-hover)] group-focus-within:text-[var(--primary-hover)]"
                >
                  {item.label}
                  {item.submenu && (
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      aria-hidden="true"
                      className="transition-transform group-hover:rotate-180 group-focus-within:rotate-180"
                    >
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  )}
                </HeaderLink>

                {item.submenu && (
                  <div className="reveal-down absolute left-0 right-0 top-full bg-foreground shadow-lg">
                    <div className="overflow-hidden">
                      <ul className="mx-auto grid max-w-7xl grid-cols-2 gap-x-8 gap-y-1 px-6 py-6 xl:grid-cols-3">
                        {item.submenu.map((sub) => (
                          <li key={sub.label}>
                            <HeaderLink
                              href={sub.href}
                              className="block py-2 text-sm text-[var(--muted)] transition-colors hover:text-[var(--primary)]"
                            >
                              {sub.label}
                            </HeaderLink>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden items-center lg:flex">
          <Buttons type="secondary" href="/contacto">
            {datas.cta}
          </Buttons>
        </div>

        <div className="flex items-center lg:hidden">
          <HeaderMobile datas={datas} />
        </div>
      </div>
    </header>
  );
}
