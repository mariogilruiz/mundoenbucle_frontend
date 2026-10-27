import HeaderLink from "../header/HeaderLink";
import FooterGroup from "./FooterGroup";
import Logos from "../logos/Logos";

const linkClass =
  "block py-1 text-sm text-[var(--muted)] transition-colors duration-300 hover:text-[var(--primary)]";

export default function FooterContent({ datas }) {
  if (!datas?.nav) return null;

  const sections = datas.nav.filter((item) => item.submenu);
  const singles = datas.nav.filter((item) => !item.submenu);

  return (
    <footer className="bg-foreground text-[var(--primary)]">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <Logos type="primary_full" />

        <nav
          aria-label={datas.aria?.footerNav || "Navegación del pie de página"}
          className="mt-10 lg:columns-4 lg:gap-x-8"
        >
          {sections.map((item) => (
            <FooterGroup key={item.label} title={item.label}>
              <ul>
                {item.submenu.map((sub) => (
                  <li key={sub.label}>
                    <HeaderLink href={sub.href} className={linkClass}>
                      {sub.label}
                    </HeaderLink>
                  </li>
                ))}
              </ul>
            </FooterGroup>
          ))}

          {singles.length > 0 && (
            <FooterGroup title={datas.moreLabel || "Más información"}>
              <ul>
                {singles.map((item) => (
                  <li key={item.label}>
                    <HeaderLink href={item.href} className={linkClass}>
                      {item.label}
                    </HeaderLink>
                  </li>
                ))}
              </ul>
            </FooterGroup>
          )}
        </nav>

        <p className="mt-12 border-t border-[var(--border)] pt-6 text-sm text-center text-[var(--muted)]">
          © {new Date().getFullYear()} {datas.brand}
        </p>
      </div>
    </footer>
  );
}
