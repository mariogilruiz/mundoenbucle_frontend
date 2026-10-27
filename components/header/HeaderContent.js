import Icon from "../icons/Icon";
import HeaderLink from "./HeaderLink";
import HeaderMobile from "./HeaderMobile";
import Logos from "../logos/Logos";
import HeaderCompact from "./HeaderCompact";
import HeaderActions from "./HeaderActions";
import HeroObserver from "./HeroObserver";

export default function HeaderContent({ datas }) {
  if (!datas?.nav) return null;

  return (
    <>
      <HeroObserver />
      <HeaderCompact datas={datas} />
      <header className="header-main sticky top-0 z-50 bg-foreground text-[var(--primary)]">
        <div className="mx-auto flex h-16 max-w-7xl items-stretch justify-between gap-4 px-6">
          <Logos type="primary_brand" />

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
                      <Icon
                        name="chevron-down"
                        size={14}
                        className="transition-transform group-hover:rotate-180 group-focus-within:rotate-180"
                      />
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

          <div className="flex items-center">
            <HeaderActions datas={datas} />
            <div className="lg:hidden">
              <HeaderMobile datas={datas} />
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
