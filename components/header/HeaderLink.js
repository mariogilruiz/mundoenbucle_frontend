"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const isInternal = (href) => href?.startsWith("/") || href?.startsWith("#");

export default function HeaderLink({
  href,
  children,
  className = "",
  ...props
}) {
  const pathname = usePathname();
  const isActive =
    isInternal(href) && !href.startsWith("#") && pathname === href;
  const classes =
    `${className} ${isActive ? "text-[var(--secondary)]!" : ""}`.trim();

  if (isInternal(href)) {
    return (
      <Link href={href} className={classes} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={classes}
      {...props}
    >
      {children}
    </a>
  );
}
