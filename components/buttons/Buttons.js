"use client";

import Link from "next/link";
import { useRef, useState } from "react";

const variants = {
  primary:
    "border-[var(--primary)] bg-[var(--primary)] text-[var(--background)] hover:bg-[var(--primary-hover)] hover:border-[var(--primary-hover)] ",
  secondary:
    "border-[var(--neutral)] bg-[var(--neutral)]  hover:bg-[var(--neutral-hover)] hover:border-[var(--neutral-hover)] ",
  danger:
    "border-[var(--logo-red)] bg-[var(--logo-red)]  hover:bg-[var(--logo-red-hover)] hover:border-[var(--logo-red-hover)]",
  outline:
    "border-[var(--border)] bg-[var(--neutral)] text-[var(--primary)] hover:bg-[var(--neutral-hover)] hover:border-[var(--border-hover)]",
  send: "border-green-500 bg-green-500  hover:bg-green-600 hover:border-green-600",
};

export default function Buttons({
  type = "primary",
  text,
  children,
  href,
  buttonType = "button",
  className = "",
  onPointerDown,
  onKeyDown,
  ...props
}) {
  const [ripple, setRipple] = useState(null);
  const rippleId = useRef(0);
  const variantClasses = variants[type];

  if (!variantClasses) {
    throw new Error(
      `Invalid button type "${type}". Use primary, secondary, danger, or outline.`,
    );
  }

  const classes =
    `button-click-effect inline-flex items-center justify-center rounded-full border-2 gap-2 px-5 py-2 font-label text-sm font-bold font-label transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--secondary)] disabled:cursor-not-allowed disabled:opacity-50  ${variantClasses} ${className}`.trim();
  const content = children ?? text;

  function createRipple(element, x, y) {
    const { width, height } = element.getBoundingClientRect();
    const radius =
      Math.max(
        Math.hypot(x, y),
        Math.hypot(width - x, y),
        Math.hypot(x, height - y),
        Math.hypot(width - x, height - y),
      ) * 2;

    setRipple({
      id: ++rippleId.current,
      left: x - radius / 2,
      top: y - radius / 2,
      size: radius,
    });
  }

  function handlePointerDown(event) {
    onPointerDown?.(event);

    if (!event.defaultPrevented && !event.currentTarget.disabled) {
      const bounds = event.currentTarget.getBoundingClientRect();
      createRipple(
        event.currentTarget,
        event.clientX - bounds.left,
        event.clientY - bounds.top,
      );
    }
  }

  function handleKeyDown(event) {
    onKeyDown?.(event);

    const isButton = event.currentTarget.tagName === "BUTTON";
    const activatesWithKey =
      event.key === "Enter" || (isButton && event.key === " ");

    if (
      !event.defaultPrevented &&
      !event.repeat &&
      activatesWithKey &&
      !event.currentTarget.disabled
    ) {
      const { width, height } = event.currentTarget.getBoundingClientRect();
      createRipple(event.currentTarget, width / 2, height / 2);
    }
  }

  function renderRipple() {
    if (!ripple) return null;

    return (
      <span
        aria-hidden="true"
        className="button-ripple"
        key={ripple.id}
        onAnimationEnd={() =>
          setRipple((current) => (current?.id === ripple.id ? null : current))
        }
        style={{
          left: ripple.left,
          top: ripple.top,
          width: ripple.size,
          height: ripple.size,
        }}
      />
    );
  }

  if (href) {
    return (
      <Link
        className={classes}
        href={href}
        onKeyDown={handleKeyDown}
        onPointerDown={handlePointerDown}
        {...props}
      >
        {content}
        {renderRipple()}
      </Link>
    );
  }

  return (
    <button
      className={classes}
      type={buttonType}
      onKeyDown={handleKeyDown}
      onPointerDown={handlePointerDown}
      {...props}
    >
      {content}
      {renderRipple()}
    </button>
  );
}
