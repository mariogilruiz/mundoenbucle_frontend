import { API_BASE_URL } from "@/lib/project";
import HeroVideo from "../home/HeroVideo";

function resolveAsset(src) {
  if (typeof src !== "string" || !src.trim()) return "";

  const cleanSrc = src.trim();
  if (/^(https?:)?\/\//i.test(cleanSrc)) return cleanSrc;

  return `${API_BASE_URL}/${cleanSrc.replace(/^\/+/, "")}`;
}

function getDisplayValue(value) {
  if (typeof value === "string" || typeof value === "number") {
    return String(value);
  }

  return "";
}

export default function ReproductorVideo({ data }) {
  const video = data?.video;
  const cover = data?.cover ?? data?.video_cover;
  const videoSrc = resolveAsset(video?.src);
  const coverSrc = resolveAsset(cover?.src);

  if (!videoSrc || !coverSrc) return null;

  const title = getDisplayValue(data?.title ?? data?.titleShow ?? video?.title);
  const videoTitle =
    getDisplayValue(video.title) || title || "Reproductor de video";
  const coverAlt = getDisplayValue(cover.alt) || title || "Portada del video";
  const location = getDisplayValue(data?.location);
  const quality = getDisplayValue(data?.quality);
  const keywords = Array.isArray(data?.keywords)
    ? data.keywords.filter((keyword) => typeof keyword === "string")
    : [];
  const specs = Array.isArray(data?.specs)
    ? data.specs.filter(
        (spec) =>
          spec && typeof spec.label === "string" && getDisplayValue(spec.value),
      )
    : [];
  const technicalDetails = [["duration", "Duración"]]
    .map(([key, label]) => ({
      label,
      value: getDisplayValue(data?.[key]),
    }))
    .filter(({ value }) => value);

  return (
    <>
      <div className="grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-2 border-b border-[var(--border)] px-5 py-3">
        <span aria-hidden="true" />
        <span className="min-w-0 max-w-[60vw] truncate px-2 text-center font-mono text-xs text-[var(--muted)]">
          {title ? `${title} — ` : ""}
          Reproductor
        </span>
        <span className="justify-self-end rounded bg-[var(--primary)] px-1.5 py-0.5 font-mono text-[10px] font-bold text-[var(--background)]">
          {quality || "4K"}
        </span>
      </div>

      <div className="relative z-2 flex items-center justify-center p-2 md:p-4">
        {specs.length > 0 && (
          <ul className="pointer-events-none absolute left-0 right-0 top-0 z-1 hidden flex-wrap gap-2 p-3 font-mono text-[11px] md:flex md:p-7">
            {specs.map(({ label, value }) => (
              <li
                key={label}
                className="border-shape border-2 border-[var(--border)] bg-[var(--background)] px-3 py-1"
              >
                <span className="text-[var(--muted)]">{label}: </span>
                {value}
              </li>
            ))}
          </ul>
        )}
        <div className="relative w-full max-w-4xl bg-background">
          <HeroVideo
            videoSrc={videoSrc}
            videoTitle={videoTitle}
            coverSrc={coverSrc}
            coverAlt={coverAlt}
            loop={data?.loop !== false}
          />
        </div>
      </div>

      {(location || keywords.length > 0 || specs.length > 0) && (
        <div className=" flex-col gap-3 border-t border-[var(--border)] p-4 font-mono text-xs hidden md:flex">
          {location && (
            <p>
              <span className="text-[var(--muted)]">Ubicación: </span>
              {location}
            </p>
          )}
          {keywords.length > 0 && (
            <p>
              <span className="text-[var(--muted)]">Keywords: </span>
              {keywords.join(", ")}
            </p>
          )}
        </div>
      )}

      {(technicalDetails.length > 0 || videoSrc) && (
        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 border-t border-[var(--border)] px-4 py-2 font-mono text-[11px] text-[var(--muted)]">
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-[#28c840]" />
            Listo
          </span>
          {technicalDetails.map(({ label, value }) => (
            <span key={label}>
              {label}: {value}
            </span>
          ))}
        </div>
      )}
    </>
  );
}
