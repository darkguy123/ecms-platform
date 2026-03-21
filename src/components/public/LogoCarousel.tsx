"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

// ✅ Import your images (IMPORTANT)
import bpp from "@/components/public/bpp.png";
import cac from "@/components/public/cac.png";
import federalhigh2 from "@/components/public/federalhigh2.jpg";
import naseni from "@/components/public/nasemi.png";
import njc from "@/components/public/njc.png";
import paystack from "@/components/public/paystacklogo.png";
import remita from "@/components/public/remita.png";
import scon from "@/components/public/scon.png";
import sterling from "@/components/public/sterlingbanklogo.png";
import zenith from "@/components/public/zenith.png";

const images = [
  bpp,
  cac,
  federalhigh2,
  naseni,
  njc,
  paystack,
  remita,
  scon,
  sterling,
  zenith,
];

export default function LogoCarousel() {
  const [index, setIndex] = useState(0);

  const itemsPerView = 4;

  // ✅ Auto play
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 3000);

    return () => clearInterval(interval);
  }, [index]);

  const handleNext = () => {
    if (index + itemsPerView >= images.length) {
      setIndex(0); // loop back
    } else {
      setIndex(index + 1);
    }
  };

  const handlePrev = () => {
    if (index === 0) {
      setIndex(images.length - itemsPerView);
    } else {
      setIndex(index - 1);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto py-16 relative">

      {/* LEFT ARROW */}
      <button
        onClick={handlePrev}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg p-3 rounded-full hover:scale-110 transition"
      >
        <ChevronLeft />
      </button>

      {/* RIGHT ARROW */}
      <button
        onClick={handleNext}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg p-3 rounded-full hover:scale-110 transition"
      >
        <ChevronRight />
      </button>

      {/* SLIDER */}
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{
            transform: `translateX(-${(index * 100) / itemsPerView}%)`,
          }}
        >
          {images.map((img, i) => (
            <div
              key={i}
              className="w-1/4 flex-shrink-0 p-6
                         sm:w-1/2
                         md:w-1/3
                         lg:w-1/4"
            >
              <div className="bg-white rounded-2xl shadow-md h-28 flex items-center justify-center p-4 hover:shadow-xl transition">
                <Image
                  src={img}
                  alt={`logo-${i}`}
                  width={120}
                  height={80}
                  className="object-contain"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
