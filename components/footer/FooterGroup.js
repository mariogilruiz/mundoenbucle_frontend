"use client";

import { useId, useState } from "react";
import Icon from "../icons/Icon";

// En móvil es un desplegable; desde lg siempre está abierto.
// El contenido permanece en el DOM para SEO.
export default function FooterGroup({ title, children }) {
  const [open, setOpen] = useState(false);
  const id = useId();

  return (
    <section className="break-inside-avoid border-b border-[var(--border)] last:border-b-0 lg:mb-8 lg:border-b-0">
      <h2 className="text-[14px]">
        <button
          type="button"
          aria-expanded={open}
          aria-controls={id}
          onClick={() => setOpen((v) => !v)}
          className="flex w-full items-center justify-between py-4 text-left lg:pointer-events-none lg:py-0 lg:pb-3"
        >
          {title}
          <Icon
            name="chevron-down"
            size={20}
            className={`transition-transform duration-300 lg:hidden ${open ? "rotate-180" : ""}`}
          />
        </button>
      </h2>
      <div
        id={id}
        className={`grid transition-[grid-template-rows] duration-300 ease-in-out lg:visible lg:grid-rows-[1fr] ${open ? "visible grid-rows-[1fr]" : "invisible grid-rows-[0fr]"}`}
      >
        <div className="min-h-0 overflow-hidden">
          <div className="pb-4 lg:pb-0">{children}</div>
        </div>
      </div>
    </section>
  );
}
