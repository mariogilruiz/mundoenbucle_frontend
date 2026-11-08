import Buttons from "../buttons/Buttons";
import Fade_down from "../effects/Fade_down";
import ReproductorVideo from "../reproductor_video/ReproductorVideo";

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

  return (
    <section className="flex flex-col items-center gap-6 bg-[radial-gradient(circle_at_top_center,color-mix(in_srgb,var(--secondary)_10%,transparent),transparent_80%)] px-8 py-18 md:py-26 text-center">
      <Fade_down className="flex w-full flex-col items-center gap-10">
        <h1
          className="text-4xl md:text-5xl lg:text-6xl font-bold px-2 md:px-4 "
          dangerouslySetInnerHTML={{ __html: title ? title : "Cargando..." }}
        ></h1>

        <h2 className="text-base font-normal text-[var(--muted)] px-2 md:px-4 max-w-3xl">
          {subtitle ? subtitle : "Cargando..."}
        </h2>

        <div className="flex flex-wrap justify-center gap-4 pb-4 md:pb-10">
          {cta && (
            <Buttons
              type="primary"
              href={cta ? cta.href : "#"}
              text={cta ? cta.label : "Cargando..."}
            />
          )}
          {cta2 && (
            <div className="hidden min-[450px]:block">
              <Buttons
                type="outline"
                href={cta2 ? cta2.href : "/"}
                text={cta2 ? cta2.label : "Cargando..."}
              />
            </div>
          )}
        </div>
        <div className="w-full max-w-6xl overflow-hidden rounded-2xl border border-[var(--border)]/60 bg-[var(--background)]/80 text-left shadow-[0_24px_60px_-12px_rgb(0_0_0/60%),0_0_0_1px_rgb(255_255_255/4%)] ring-1 ring-[var(--secondary)]/10 backdrop-blur-sm">
          <ReproductorVideo data={playerData} />
        </div>
      </Fade_down>
    </section>
  );
}
