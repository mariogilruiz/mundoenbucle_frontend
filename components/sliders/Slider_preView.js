"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import AOS from "aos";
import { A11y, Pagination, Mousewheel } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "aos/dist/aos.css";
import "swiper/css";
import "swiper/css/pagination";
import "./slider_preView.css";
import { API_BASE_URL } from "@/lib/project";
import LogoSpinner from "../loaders/LogoSpinner";

// const previewCards = [
//   { title: "Proyecto 01", category: "Audiovisual" },
//   { title: "Proyecto 02", category: "Producción" },
//   { title: "Proyecto 03", category: "Creatividad" },
//   { title: "Proyecto 04", category: "Audiovisual" },
//   { title: "Proyecto 05", category: "Producción" },
//   { title: "Proyecto 06", category: "Creatividad" },
// ];

// Cards visibles por breakpoint (ancho de ventana). Valores cercanos a 1 = card ancha.
const SLIDER_BREAKPOINTS = {
  0: { slidesPerView: 1.05, spaceBetween: 16 },
  640: { slidesPerView: 1.1, spaceBetween: 24 },
  //   1024: { slidesPerView: 1.3, spaceBetween: 24 },
  //   1536: { slidesPerView: 1.3, spaceBetween: 24 },
};

export default function Slider_preView({ datas }) {
  const cards = datas?.slider_preview ?? null;

  const swiperRef = useRef(null);
  const [offset, setOffset] = useState(24);

  useEffect(() => {
    AOS.init({ duration: 700, easing: "ease-out", once: true });
  }, []);

  // Alinea la primera card con el borde izquierdo de site-container (80rem + 1.5rem de padding)
  useEffect(() => {
    const update = () =>
      setOffset(Math.max(24, (window.innerWidth - 1280) / 2 + 24));
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  if (!Array.isArray(cards) || cards.length === 0) return null;

  return (
    <section className="preview-section w-full py-16 md:py-24">
      <div className="site-container mb-8 md:mb-10">
        <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
          Proyectos recientes
        </h2>
      </div>

      <div>
        <Swiper
          className="preview-slider"
          modules={[A11y, Pagination, Mousewheel]}
          slidesOffsetBefore={offset}
          slidesOffsetAfter={offset}
          speed={600}
          mousewheel={{ forceToAxis: true, releaseOnEdges: false }}
          touchAngle={50}
          pagination={{ clickable: true }}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          breakpoints={SLIDER_BREAKPOINTS}
        >
          {cards.map((card, index) => (
            <SwiperSlide key={card.id ?? `${card.title}-${index}`}>
              <article
                className="preview-card border-shape"
                style={{ "--card-hue": `${(index * 43 + 205) % 360}deg` }}
              >
                <div className="preview-card__bottom max-w-3xl">
                  <h3
                    className="inline-block #text-secondary text-xl md:text-2xl lg:text-3xl"
                    dangerouslySetInnerHTML={{
                      __html: card.title ? card.title : `Cargando...`,
                    }}
                  ></h3>{" "}
                </div>
                {card.image?.src ? (
                  <div className="absolute bottom-0 left-1/2 z-10 h-[70%] w-[70%] max-w-[800px] -translate-x-1/2 overflow-hidden rounded-t-2xl">
                    <Image
                      src={API_BASE_URL + card.image.src}
                      alt={
                        card.image.alt ||
                        card.title ||
                        "Foto de la web Mundo en Bucle"
                      }
                      fill
                      quality={100}
                      sizes="200px"
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <LogoSpinner size="lg" />
                )}
              </article>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
