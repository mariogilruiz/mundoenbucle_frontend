import Icon from "../icons/Icon";

const buttonClass =
  "flex h-11 w-11 items-center justify-center rounded-full text-[var(--muted)] transition-colors duration-300 hover:text-[var(--primary)] focus-visible:outline-2 focus-visible:outline-[var(--secondary)]";

export default function HeaderActions({ datas }) {
  return (
    <div className="flex items-center">
      <button
        type="button"
        aria-label={datas.aria?.search || "Buscar"}
        className={buttonClass}
      >
        <Icon name="search" />
      </button>
      <button
        type="button"
        aria-label={datas.aria?.cart || "Carrito de la compra"}
        className={buttonClass}
      >
        <Icon name="cart" />
      </button>
    </div>
  );
}
