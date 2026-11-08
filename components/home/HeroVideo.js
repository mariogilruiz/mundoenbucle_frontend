"use client";

import Image from "next/image";
import { useState } from "react";

// Muestra solo la portada; el <video> no existe en el DOM hasta pulsar play
export default function HeroVideo({
  videoSrc,
  videoTitle,
  coverSrc,
  coverAlt,
  loop,
}) {
  const [playing, setPlaying] = useState(false);

  const canPlay = Boolean(videoSrc);
  const hasCover = Boolean(coverSrc);

  return (
    <div className="w-full max-w-4xl overflow-hidden bg-background">
      <div className="relative aspect-video w-full">
        {playing && canPlay ? (
          <video
            src={videoSrc}
            title={videoTitle ?? "Video"}
            aria-label={videoTitle ?? "Video"}
            className="h-full w-full object-cover"
            // controls
            autoPlay
            loop={loop}
            playsInline
            preload="metadata"
            poster={hasCover ? coverSrc : undefined}
          />
        ) : (
          <>
            {hasCover ? (
              <Image
                src={coverSrc}
                alt={coverAlt ?? ""}
                fill
                priority
                unoptimized
                sizes="(min-width: 896px) 896px, 100vw"
                className="object-cover"
              />
            ) : (
              <div className="h-full w-full bg-[var(--neutral)]" />
            )}
            {canPlay && (
              <button
                type="button"
                onClick={() => setPlaying(true)}
                aria-label={videoTitle ?? "Reproducir video"}
                className="group absolute inset-0 flex cursor-pointer items-center justify-center bg-black/20 transition-colors hover:bg-black/30 focus-visible:outline-2 focus-visible:outline-[var(--secondary)]"
              >
                <span className="flex h-15 w-15 md:h-20 md:w-20 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white shadow-[0_8px_32px_rgb(0_0_0/40%)] backdrop-blur-md transition-all duration-300 group-hover:scale-110 group-hover:bg-[var(--secondary)]/80">
                  <svg
                    width="50"
                    height="50"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                    className="ml-1"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </span>
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}
