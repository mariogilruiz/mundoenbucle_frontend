"use client";
import Aos from "aos";
import Buttons from "../buttons/Buttons";
import ReproductorVideo from "../reproductor_video/ReproductorVideo";
import { useEffect } from "react";

export default function Hero({ contentDatas, assetsDatas }) {
  // La clave del JSON llega como "hero " (con espacio)
  const hero = contentDatas?.hero ?? contentDatas?.["hero "];
  if (!hero) return null;

  const { title, subtitle, cta, cta2, titleShow } = hero;
  const playerConfig = hero.videoPlayer ?? {};
  const playerData = {
    ...playerConfig,
    title: playerConfig.title ?? titleShow,
    video: playerConfig.video ?? assetsDatas?.video,
    cover:
      playerConfig.cover ??
      playerConfig.video_cover ??
      assetsDatas?.video_cover,
  };

  useEffect(() => {
    Aos.init({
      duration: [300],
      delay: 1500,
      offset: 100,
      easing: "fade",
      once: true,
    });
  }, []);

  return (
    <section className="flex flex-col items-center gap-6 bg-[radial-gradient(circle_at_top_center,color-mix(in_srgb,var(--secondary)_10%,transparent),transparent_80%)] px-8 py-16 text-center">
      <h1
        data-aos="fade"
        className="text-4xl md:text-5xl lg:text-6xl font-bold px-2 md:px-4 "
        dangerouslySetInnerHTML={{ __html: title }}
      ></h1>

      <h2
        data-aos="fade"
        data-aos-duration="500"
        data-aos-delay="600"
        className="text-base font-normal text-[var(--muted)] px-2 md:px-4 max-w-3xl"
      >
        {subtitle}
      </h2>

      <div
        data-aos="fade"
        data-aos-duration="500"
        data-aos-delay="600"
        className="flex flex-wrap justify-center gap-4 pb-4 md:pb-10"
      >
        {cta && <Buttons type="primary" href={cta.href} text={cta.label} />}
        {cta2 && (
          <div className="hidden min-[450px]:block">
            <Buttons type="outline" href={cta2.href} text={cta2.label} />
          </div>
        )}
      </div>
      <div
        data-aos="fade"
        data-aos-duration="500"
        data-aos-delay="600"
        className="w-full max-w-6xl overflow-hidden border-shape-xs border border-[var(--border)] bg-[var(--background)] text-left shadow-2xl"
      >
        <ReproductorVideo data={playerData} />
      </div>
    </section>
  );
}
