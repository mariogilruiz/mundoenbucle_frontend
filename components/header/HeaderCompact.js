import Buttons from "../buttons/Buttons";
import Logos from "../logos/Logos";

export default function HeaderCompact({ datas }) {
  return (
    <div className="header-compact fixed inset-x-0 top-0 z-50 bg-foreground text-[var(--primary)] shadow-lg">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-around gap-4 px-6">
        <Logos type="primary_text" />
        <Buttons type="secondary" href="/contacto">
          {datas.cta}
        </Buttons>
      </div>
    </div>
  );
}
