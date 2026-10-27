"use client";

import { useEffect, useState } from "react";
import "./brandIntro.css";

let hasPlayed = false;

export default function BrandIntro() {
  const [shouldPlay] = useState(() => !hasPlayed);

  useEffect(() => {
    hasPlayed = true;
  }, []);

  if (!shouldPlay) return null;

  return (
    <div
      className="brand-intro brand-intro--visible"
      aria-label="Mundo En Bucle"
      role="img"
    >
      <div className="brand-intro__content">
        <span className="brand-intro__orb brand-intro__orb--red" />
        <span className="brand-intro__orb brand-intro__orb--orange" />
        <span className="brand-intro__orb brand-intro__orb--yellow" />
        <p className="brand-intro__name">Mundo En Bucle</p>
      </div>
    </div>
  );
}
