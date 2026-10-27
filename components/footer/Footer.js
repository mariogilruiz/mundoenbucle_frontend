import { getFooterContent } from "@/lib/content";
import FooterContent from "./FooterContent";

export default async function Footer() {
  const res = await getFooterContent();

  if (!res) return null;
  const datas = res?.content ? res.content : null;
  // console.log(datas);
  return <FooterContent datas={datas} />;
}
