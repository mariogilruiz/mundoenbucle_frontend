"use client";

import { useEffect, useState } from "react";
import "./brandIntroCircle.css";

let hasPlayed = false;

export default function BrandIntroCircle({ className }) {
  const [shouldPlay] = useState(() => !hasPlayed);

  useEffect(() => {
    hasPlayed = true;
  }, []);

  if (!shouldPlay) return null;

  return (
    <div
      className={["brand-intro-circle", className].filter(Boolean).join(" ")}
      aria-hidden="true"
    >
      <span className="brand-intro-circle__orb brand-intro-circle__orb--red" />
      <span className="brand-intro-circle__orb brand-intro-circle__orb--orange" />
      <span className="brand-intro-circle__orb brand-intro-circle__orb--yellow" />
    </div>
  );
}
