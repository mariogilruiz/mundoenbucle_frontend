"use client";

import { useEffect, useRef, useState } from "react";
import { A11y, Pagination, Mousewheel, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "./slider_preView.css";
import Icon from "../icons/Icon";
import Heading from "../headings/Heading";
import { API_BASE_URL } from "@/lib/project";

// Cards visibles por breakpoint (ancho de ventana). Valores cercanos a 1 = card ancha.
const SLIDER_BREAKPOINTS = {
  0: { slidesPerView: 1.05, spaceBetween: 16 },
  640: { slidesPerView: 1.1, spaceBetween: 24 },
  //   1024: { slidesPerView: 1.3, spaceBetween: 24 },
  //   1536: { slidesPerView: 1.3, spaceBetween: 24 },
};

const PREVIEW_ICONS_BY_TYPE = {
  sensor: "sensor",
  horizontal: "format-horizontal",
  vertical: "format-vertical",
  perfil: "color-profile",
  bits: "bit-depth",
  muestreo: "color-sampling",
  resolucion: "resolution",
  focal: "lens",
  dron: "drone",
  sony: "camera",
  codec: "codec",
  bitrate: "bitrate",
};

function getPreviewIconName(label, specify) {
  const type =
    typeof specify === "string"
      ? specify
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .trim()
          .toLowerCase()
      : "";
  if (Object.hasOwn(PREVIEW_ICONS_BY_TYPE, type)) {
    return PREVIEW_ICONS_BY_TYPE[type];
  }

  const value = String(label ?? "")
    .trim()
    .toLowerCase();
  const ratio = value.match(/^(\d+)\s*[:;]\s*(\d+)$/);
  if (ratio) {
    const width = Number(ratio[1]);
    const height = Number(ratio[2]);
    if (width > 0 && height > 0) {
      if (width === height) return "format-square";
      return width > height ? "format-horizontal" : "format-vertical";
    }
  }
  if (["4/3", "aps-c"].includes(value) || /^\d+(?:[.,]\d+)?"$/.test(value)) {
    return "sensor";
  }
  if (/^(?:[cdsv]-log(?:-?m|\d+)?|hlg)$/.test(value)) return "color-profile";
  if (/^\d+[-\s]?bits?$/.test(value)) return "bit-depth";
  if (/^\d+:\d+:\d+$/.test(value)) return "color-sampling";
  if (/^\d+(?:k|p)$/.test(value)) return "resolution";
  if (/^\d+(?:[.,]\d+)?\s*mm$/.test(value)) return "lens";
  if (value === "dji") return "drone";
  if (/^(?:h\.?26[45]|hevc|av1|prores)$/.test(value)) return "codec";
  if (/^\d+(?:[.,]\d+)?\s*[kmg]?bps$/.test(value)) return "bitrate";
  return "camera";
}

function hasPreviewIcons(card) {
  return Array.isArray(card.icons) && card.icons.length > 0;
}

function getIconTextLayout(label) {
  const characters = Array.from(String(label ?? ""));
  const lines = characters.length > 3 ? 2 : 1;
  const charactersPerLine = Math.max(1, Math.ceil(characters.length / lines));

  // Reserva espacio para la fuente monoespaciada y hasta dos líneas.
  return {
    scale: Math.min(1 / (charactersPerLine * 0.42), 1 / (lines * 1.05)),
    parts:
      lines === 1
        ? [characters.join("")]
        : [
            characters.slice(0, charactersPerLine).join(""),
            characters.slice(charactersPerLine).join(""),
          ],
  };
}

export default function Slider_preView({ datas }) {
  const heading = datas?.slider_preview?.heading ?? "Cargando...";
  const cards = datas?.slider_preview?.slider ?? null;

  const sectionRef = useRef(null);
  const swiperRef = useRef(null);
  const [offset, setOffset] = useState(24);
  const [playing, setPlaying] = useState(true);

  const toggleAutoplay = () => {
    const swiper = swiperRef.current;
    if (!swiper) return;
    if (playing) {
      swiper.autoplay.stop();
    } else {
      swiper.autoplay.start();
    }
    setPlaying(!playing);
  };

  // Alinea la primera card con el borde izquierdo de site-container (80rem + 1.5rem de padding)
  useEffect(() => {
    const update = () =>
      setOffset(Math.max(24, (window.innerWidth - 1280) / 2 + 24));
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // Evita que el gesto horizontal del trackpad dispare la navegación del
  // navegador antes de que Swiper procese el movimiento.
  useEffect(() => {
    const slider = sectionRef.current?.querySelector(".preview-slider");
    if (!slider) return;

    const onWheel = (event) => {
      if (
        event.composedPath().includes(slider) &&
        Math.abs(event.deltaX) > Math.abs(event.deltaY)
      ) {
        event.preventDefault();
      }
    };

    window.addEventListener("wheel", onWheel, {
      capture: true,
      passive: false,
    });
    return () =>
      window.removeEventListener("wheel", onWheel, { capture: true });
  }, []);

  // La paginación queda pegada al borde inferior del viewport mientras el
  // slider entra, y se asienta cuando el bottom del slider la alcanza.
  // El movimiento va suavizado con lerp para evitar vibraciones.
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let current = 0;
    let target = 0;
    let trackedPagination = null;
    let paginationInView = null;

    const measure = () => {
      const slider = section.querySelector(".preview-slider");
      const pagination = slider?.querySelector(".swiper-pagination");
      if (!slider || !pagination) return null;

      const sliderRect = slider.getBoundingClientRect();
      const restTop = sliderRect.height - pagination.offsetHeight;
      const viewportMargin = 44;
      const stickyTop = Math.max(
        0,
        Math.min(window.innerHeight - viewportMargin, sliderRect.bottom) -
          sliderRect.top -
          pagination.offsetHeight,
      );
      return { slider, sliderRect, pagination, lift: stickyTop - restTop };
    };

    const updatePaginationVisibility = ({ sliderRect, pagination }, lift) => {
      if (pagination !== trackedPagination) {
        trackedPagination?.removeAttribute("data-pagination-in-view");
        trackedPagination = pagination;
        paginationInView = null;
      }

      // La posición sin escala evita que el rebote altere la detección.
      const top = sliderRect.top + pagination.offsetTop + lift;
      const inView =
        top < window.innerHeight && top + pagination.offsetHeight > 0;
      if (inView !== paginationInView) {
        pagination.dataset.paginationInView = String(inView);
        const toggle = section.querySelector(".preview-autoplay-toggle");
        toggle?.setAttribute("data-pagination-in-view", String(inView));
        paginationInView = inView;
      }
    };

    const tick = () => {
      const m = measure();
      if (!m) {
        frame = 0;
        return;
      }
      target = m.lift;
      current += (target - current) * 0.18;
      if (Math.abs(target - current) < 0.5) current = target;
      m.slider.style.setProperty("--pagination-lift", `${current}px`);
      section
        .querySelector(".preview-slider-wrap")
        ?.style.setProperty("--pagination-lift", `${current}px`);
      updatePaginationVisibility(m, current);
      frame = current === target ? 0 : requestAnimationFrame(tick);
    };

    const onScroll = () => {
      if (reduceMotion.matches) {
        const m = measure();
        if (m) {
          m.slider.style.setProperty("--pagination-lift", "0px");
          section
            .querySelector(".preview-slider-wrap")
            ?.style.setProperty("--pagination-lift", "0px");
          updatePaginationVisibility(m, 0);
        }
        return;
      }
      if (!frame) {
        const m = measure();
        if (m) current = m.lift;
        frame = requestAnimationFrame(tick);
      }
    };

    const onMotionChange = () => {
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
      onScroll();
    };

    // Swiper pinta la paginación después del primer render; esperamos a que exista
    const observer = new MutationObserver(onScroll);
    observer.observe(section, { childList: true, subtree: true });

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    reduceMotion.addEventListener("change", onMotionChange);
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      reduceMotion.removeEventListener("change", onMotionChange);
      trackedPagination?.removeAttribute("data-pagination-in-view");
      if (frame) cancelAnimationFrame(frame);
    };
  }, [cards]);

  if (!Array.isArray(cards) || cards.length === 0) return null;

  return (
    <section
      ref={sectionRef}
      data-direction="next"
      className="preview-section w-full py-16 md:py-24"
    >
      <div
        data-aos="fade-up"
        data-aos-duration="1500"
        className="site-container mb-8 md:mb-10"
      >
        <Heading text={heading} />
      </div>

      <div
        data-aos="zoom-in"
        data-aos-duration="500"
        data-aos-delay="500"
        className="preview-slider-wrap"
      >
        <Swiper
          className="preview-slider"
          modules={[A11y, Pagination, Mousewheel, Autoplay]}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          slidesOffsetBefore={offset}
          slidesOffsetAfter={offset}
          speed={600}
          mousewheel={{
            forceToAxis: true,
            releaseOnEdges: true,
            // Ignora la inercia del trackpad: un gesto = un slide.
            thresholdDelta: 12,
            thresholdTime: 600,
          }}
          longSwipesRatio={0.2}
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          onSlideChange={(swiper) => {
            const section = sectionRef.current;
            if (!section) return;
            const direction =
              swiper.activeIndex > swiper.previousIndex ? "next" : "prev";
            if (section.getAttribute("data-direction") !== direction) {
              // El texto oculto debe saltar instantáneamente al reposo de la
              // nueva dirección; si transicionara, la entrada arrancaría desde
              // el lado de la dirección anterior (efecto "un slide tarde").
              section.setAttribute("data-direction-switching", "");
              section.setAttribute("data-direction", direction);
              // Reflow forzado: registra el salto sin transición antes de que
              // Swiper mueva swiper-slide-active en esta misma tarea.
              void section.offsetWidth;
              section.removeAttribute("data-direction-switching");
            }
          }}
          breakpoints={SLIDER_BREAKPOINTS}
        >
          {cards?.map((card, index) => (
            <SwiperSlide key={card.id ?? `${card.title}-${index}`}>
              <article
                className="preview-card border-shape cursor-pointer"
                style={{ "--card-hue": `${(index * 43 + 205) % 360}deg` }}
              >
                <div className="preview-card__bottom max-w-3xl">
                  <h3
                    className="inline-block text-xl md:text-2xl lg:text-3xl text-balance"
                    dangerouslySetInnerHTML={{
                      __html: card.title ? card.title : `Cargando...`,
                    }}
                  ></h3>
                </div>
                <div className="preview-card__media">
                  {card.src ? (
                    <img
                      src={`${API_BASE_URL + card.src ?? "https://via.placeholder.com/250"}`}
                      alt={
                        card.alt ??
                        "Imagen del silder de la home sobre los contenidos que podras ver en mundo en bucle"
                      }
                      className={`preview-card__logo opacity-80 ${index === 2 ? "preview-card__logo--wide" : ""}`}
                      loading="lazy"
                    />
                  ) : null}

                  {hasPreviewIcons(card) && (
                    <ul
                      className="preview-card__icons "
                      aria-label="Características técnicas"
                    >
                      {card.icons.map((icon, iconIndex) => {
                        const label =
                          typeof icon === "string" ? icon : icon.label;
                        const specify =
                          typeof icon === "string" ? undefined : icon.specify;
                        const color =
                          typeof icon === "string" ? undefined : icon.color;
                        const { parts, scale } = getIconTextLayout(label);

                        return (
                          <li
                            key={`${label}-${iconIndex}`}
                            className="preview-card__icon-item"
                            aria-label={
                              specify ? `${label}: ${specify}` : label
                            }
                          >
                            <span
                              className="preview-card__icon border-shape"
                              aria-hidden="true"
                            >
                              <Icon
                                name={getPreviewIconName(label, specify)}
                                className="preview-card__icon-background"
                                style={{ color }}
                                focusable="false"
                              />
                              <span
                                className={`preview-card__icon-label${
                                  label === "α"
                                    ? " preview-card__icon-label--lg"
                                    : ""
                                }`}
                                style={{ "--icon-text-scale": scale }}
                              >
                                {parts.map((part, partIndex) => (
                                  <span key={partIndex}>{part}</span>
                                ))}
                              </span>
                            </span>
                            {specify && (
                              <span
                                className="preview-card__icon-caption"
                                aria-hidden="true"
                              >
                                {specify}
                              </span>
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </div>
              </article>
            </SwiperSlide>
          ))}
        </Swiper>
        <button
          type="button"
          className="preview-autoplay-toggle"
          onClick={toggleAutoplay}
          aria-label={
            playing
              ? "Pausar reproducción automática"
              : "Reanudar reproducción automática"
          }
          aria-pressed={playing}
        >
          {playing ? (
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M6 5h4v14H6zM14 5h4v14h-4z" />
            </svg>
          ) : (
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
              className="preview-autoplay-toggle__play"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>
      </div>
    </section>
  );
}
