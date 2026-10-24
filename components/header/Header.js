import { getHeaderContent } from "@/lib/content";
import HeaderContent from "./HeaderContent";

export default async function Header() {
  const res = await getHeaderContent();

  if (!res) {
    return null;
  }

  const datas = res?.content ? res.content : null;

  return <HeaderContent datas={datas} />;
}
