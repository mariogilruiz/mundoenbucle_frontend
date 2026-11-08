import Icon from "../../icons/Icon";
import Buttons from "../../buttons/Buttons";

export default function CardVideoStock({ data, className = "" }) {
  function handleAddToCart() {
    console.log(`Añadiendo al carrito: ${data?.title || "clip"}`);
    // TODO: añadir el clip al carrito (fetch al carrito del usuario)
  }

  return (
    <div
      data-aos="zoom-in"
      data-aos-duration="500"
      data-aos-delay="500"
      className={`clip-card group flex flex-col border-shape-xs bg-[var(--neutral)] border border-white/10 hover:border-white/25 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-secondary-container/5 ${className}`.trim()}
    >
      {/* Thumbnail & Interactive Mock Player */}
      <div className="relative aspect-video w-full overflow-hidden bg-black cursor-pointer">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
          data-alt={data?.thumbnailAlt || data?.title || ""}
          style={
            data?.thumbnail
              ? { backgroundImage: `url("${data.thumbnail}")` }
              : undefined
          }
        ></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none"></div>

        {/* Floating Badges */}
        {Array.isArray(data?.badges) && data.badges.length > 0 && (
          <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
            {data.badges.map((badge, index) => (
              <span
                key={index}
                className={`px-2 py-0.5 rounded bg-black/70 border border-white/20 backdrop-blur-md font-mono text-[10px] ${
                  index === 0 ? "text-primary font-bold" : "text-secondary"
                }`}
              >
                {badge ? badge : "Cargando..."}
              </span>
            ))}
          </div>
        )}

        <div className="absolute bottom-2.5 right-2.5">
          <span className="px-2 py-0.5 rounded-full bg-black/80 text-primary font-mono text-[11px] backdrop-blur-md">
            {data?.duration ? data.duration : "Cargando..."}
          </span>
        </div>

        {/* Hover Play Scrubber Cue */}
        <div className="absolute bottom-0 inset-x-0 h-1 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="h-full bg-secondary w-1/3"></div>
        </div>

        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <a
            href={data?.videoUrl || "https://www.youtube.com/@MundoEnBucle"}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Ver video: ${data?.title || "clip"}`}
            className="w-10 h-10 rounded-full bg-black/60 border border-white/20 backdrop-blur-md flex items-center justify-center text-primary hover:bg-secondary/80 hover:scale-110 transition-all"
            onClick={(e) => e.stopPropagation()}
          >
            <Icon name="play" size={20} />
          </a>
        </div>
      </div>

      {/* Metadata & Buy Section */}
      <div className="p-4 flex flex-col flex-1 justify-between">
        <div>
          <h3 className="font-headline-sm text-[16px] leading-snug text-primary font-semibold group-hover:text-secondary transition-colors mb-1 line-clamp-1">
            {data?.title ? data.title : "Cargando..."}
          </h3>
          <p className="font-body-sm text-[12px] text-outline font-mono mb-3 py-5">
            {data?.keywords ? data.keywords : "Cargando..."}
          </p>
        </div>
        <div className="pt-3 border-t border-white/5 flex items-center justify-between">
          <div>
            <span className="font-headline-sm text-body-lg font-bold text-primary">
              {data?.price ? data.price : "..."}€
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              aria-label="Guardar clip en favoritos"
              onClick={() => {
                console.log(`Guardando en favoritos: ${data?.title || "clip"}`);
                // TODO: fetch al perfil del usuario para guardar el clip en favoritos
              }}
              className="p-1.5 rounded-lg bg-surface-container-high hover:bg-surface-container-highest text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
            >
              <Icon name="bookmark" size={18} />
            </button>
            <Buttons
              type="primary"
              text="Comprar"
              px="px-3"
              py="py-1.5"
              onClick={handleAddToCart}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
