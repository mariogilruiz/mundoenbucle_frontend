"use client";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Slider_preView from "../sliders/Slider_preView";
import Hero from "./Hero";
import VideoStock from "./VideoStock";

export default function HomeContent({ datasContent, datasAssets }) {
  const heroAssets = datasAssets ? datasAssets.hero : null;
  // // const sliderAssets = datasAssets ? datasAssets.slider : null;
  const videoStockDatas = datasContent ? datasContent.catalogoStock : null;
  console.log(videoStockDatas);

  useEffect(() => {
    AOS.init({
      offset: 100,
      easing: "ease-out-cubic",
      once: true,
    });
  }, []);

  return (
    <main className="">
      <Hero contentDatas={datasContent} assetsDatas={heroAssets} />
      <Slider_preView datas={datasContent} />
      <VideoStock data={videoStockDatas} />
      <div className="container mx-auto h-[2000] bg-background"></div>
    </main>
  );
}
