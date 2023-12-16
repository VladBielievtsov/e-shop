import HeroSection from "@/components/HeroSection";
import LatestProducts from "@/components/LatestProducts";
import React from "react";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <div className="mt-20">
        <LatestProducts />
      </div>
    </main>
  );
}
