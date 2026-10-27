import Fade_init from "@/components/effects/Fade_init";
import Slider_preView from "@/components/sliders/Slider_preView";
import { getAssetsContent, getHomeContent } from "@/lib/content";
import Hero from "@/components/home/Hero";
import BrandIntro from "@/components/logos/BrandIntro";

export default async function Home() {
  const [resData, resAssets] = await Promise.all([
    getHomeContent(),
    getAssetsContent(),
  ]);
  // const resAssets = await getAssetsContent();

  if (!resData) {
    return null;
  }

  if (!resAssets) {
    return null;
  }
  const datasContent = resData.content ? resData.content : null;
  const datasAssets = resAssets.assets ? resAssets.assets.home : null;

  const heroAssets = datasAssets ? datasAssets.hero : null;

  // console.log(datasAssets);

  return (
    <>
      <BrandIntro />
      <main className="">
        <Hero contentDatas={datasContent} assetsDatas={heroAssets} />
        <Fade_init>
          <Slider_preView datas={datasContent} />
          <div className="container mx-auto h-[2000] bg-background"></div>
        </Fade_init>
      </main>
    </>
  );
}
