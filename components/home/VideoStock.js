import Buttons from "../buttons/Buttons";
import CardVideoStock from "../cards/card_videoStock/CardVideoStock";
import Heading from "../headings/Heading";

export default function VideoStock({ data }) {
  const heading = data ? data.heading : "Cargando...";
  const cards =
    Array.isArray(data?.cards) && data.cards.length > 0 ? data.cards : null;

  // Visibilidad acumulativa por índice: móvil 4, md 6, xl todas
  const VISIBILITY = [
    "", // 0-3: siempre visibles
    "",
    "",
    "hidden sm:flex",
    "hidden md:flex", // 4-5: desde md
    "hidden md:flex",
  ];

  return (
    <section className="site-container py-16 md:py-24">
      <div data-aos="fade-up" data-aos-duration="1500">
        <Heading text={heading} className="mb-8" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {cards ? (
          cards.map((item, index) => (
            <CardVideoStock
              key={item.title}
              data={item}
              className={VISIBILITY[index] ?? "hidden lg:flex"}
            />
          ))
        ) : (
          <p>Cargando...</p>
        )}
      </div>
      <div data-aos="fade-up" className="flex justify-center mt-15 md:mt-20">
        <Buttons
          type="secondary"
          href={"/"}
          text={"Ver mas"}
          className="px-10"
        />
      </div>
    </section>
  );
}
