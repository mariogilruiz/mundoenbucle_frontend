"use client";

import Icon from "../icons/Icon";
import { useState } from "react";
import HeaderLink from "./HeaderLink";

export default function HeaderMobile({ datas }) {
  const [open, setOpen] = useState(false);
  const [openSub, setOpenSub] = useState(null);
  const [lastSub, setLastSub] = useState(null);

  const inSub = openSub !== null;
  // Mantiene el contenido del submenú mientras se desliza de vuelta
  const activeItem = lastSub === null ? null : datas.nav[lastSub];

  const goSub = (i) => {
    setLastSub(i);
    setOpenSub(i);
  };

  const close = () => {
    setOpen(false);
    setOpenSub(null);
    setLastSub(null);
  };

  return (
    <div className="lg:hidden">
      <button
        type="button"
        aria-label={datas.aria?.openMenu}
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => (open ? close() : setOpen(true))}
        className="flex h-11 w-12 items-center justify-center rounded-full text-[var(--muted)] transition-colors duration-300 hover:text-[var(--primary)] focus-visible:outline-2 focus-visible:outline-[var(--secondary)]"
      >
        <svg
          width="40"
          height="32"
          viewBox="0 0 40 32"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          aria-hidden="true"
        >
          <line
            x1="2"
            y1="11"
            x2="38"
            y2="11"
            style={{
              transformOrigin: "20px 11px",
              transition: "transform 300ms ease",
              transform: open
                ? "translateY(5px) rotate(45deg) scaleX(0.55)"
                : "none",
            }}
          />
          <line
            x1="2"
            y1="21"
            x2="38"
            y2="21"
            style={{
              transformOrigin: "20px 21px",
              transition: "transform 300ms ease",
              transform: open
                ? "translateY(-5px) rotate(-45deg) scaleX(0.55)"
                : "none",
            }}
          />
        </svg>
      </button>

      {open && (
        <nav
          id="mobile-menu"
          aria-label={datas.aria?.mobileMenu}
          className="menu-enter absolute left-0 right-0 top-full max-h-[calc(100vh-4rem)] overflow-y-auto bg-foreground px-6 pb-2 text-[var(--primary)] shadow-lg"
        >
          <div className="grid">
            <div className="contents">
              <div
                aria-hidden={inSub}
                inert={inSub}
                className="fade-view"
                data-active={!inSub}
              >
                <div>
                  <ul className="flex flex-col">
                    {datas.nav.map((item, i) => (
                      <li key={item.label}>
                        {item.submenu ? (
                          <button
                            type="button"
                            onClick={() => goSub(i)}
                            className="flex w-full items-center justify-between py-4 text-left font-medium hover:text-[var(--primary-hover)]"
                          >
                            {item.label}
                            <Icon name="chevron-right" size={16} />
                          </button>
                        ) : (
                          <HeaderLink
                            href={item.href}
                            onClick={close}
                            className="block py-4 font-medium hover:text-[var(--primary-hover)]"
                          >
                            {item.label}
                          </HeaderLink>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div
                aria-hidden={!inSub}
                inert={!inSub}
                className="fade-view"
                data-active={inSub}
              >
                <div>
                  <button
                    type="button"
                    onClick={() => setOpenSub(null)}
                    className="flex w-full items-center gap-2 py-4 text-left font-medium hover:text-[var(--primary-hover)]"
                  >
                    <Icon name="chevron-left" size={18} />
                    {activeItem?.label}
                  </button>
                  <ul className="flex flex-col pb-3">
                    <li>
                      <HeaderLink
                        href={activeItem?.href}
                        onClick={close}
                        className="block py-2 text-sm font-semibold text-[var(--muted)] hover:text-[var(--primary)]"
                      >
                        {activeItem?.label}
                      </HeaderLink>
                    </li>
                    {activeItem?.submenu.map((sub) => (
                      <li key={sub.label}>
                        <HeaderLink
                          href={sub.href}
                          onClick={close}
                          className="block py-2 text-sm text-[var(--muted)] hover:text-[var(--primary)]"
                        >
                          {sub.label}
                        </HeaderLink>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </nav>
      )}
    </div>
  );
}
