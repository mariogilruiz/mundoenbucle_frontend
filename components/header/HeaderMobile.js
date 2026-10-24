"use client";

import { useState } from "react";
import Buttons from "../buttons/Buttons";
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
        className="flex h-10 w-10 items-center justify-center rounded-full text-[var(--primary)] hover:text-[var(--primary-hover)] focus-visible:outline-2 focus-visible:outline-[var(--secondary)]"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          aria-hidden="true"
        >
          {open ? (
            <path d="M6 6l12 12M18 6L6 18" />
          ) : (
            <path d="M4 7h16M4 12h16M4 17h16" />
          )}
        </svg>
      </button>

      {open && (
        <nav
          id="mobile-menu"
          aria-label={datas.aria?.mobileMenu}
          className="absolute left-0 right-0 top-full max-h-[calc(100vh-4rem)] overflow-y-auto bg-foreground px-6 pb-6 text-[var(--primary)] shadow-lg"
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
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              aria-hidden="true"
                            >
                              <path d="M9 6l6 6-6 6" />
                            </svg>
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
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M15 6l-6 6 6 6" />
                    </svg>
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
          <Buttons
            type="secondary"
            href="/contacto"
            onClick={close}
            className="mt-6 w-full"
          >
            {datas.cta}
          </Buttons>
        </nav>
      )}
    </div>
  );
}
