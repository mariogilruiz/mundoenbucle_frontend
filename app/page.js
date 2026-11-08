import { getAssetsContent, getHomeContent } from "@/lib/content";
import HomeContent from "@/components/home/HomeContent";

export default async function Home() {
  const [resData, resAssets] = await Promise.all([
    getHomeContent(),
    getAssetsContent(),
  ]);

  if (!resData) {
    return null;
  }

  if (!resAssets) {
    return null;
  }
  const datasContent = resData.content ? resData.content : null;
  const datasAssets = resAssets.assets ? resAssets.assets.home : null;

  // console.log(datasAssets);

  return <HomeContent datasContent={datasContent} datasAssets={datasAssets} />;
}
