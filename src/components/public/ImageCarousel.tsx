"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

const images = [
  "/images/logo1.png", // 👈 replace with your image paths
  "/images/logo2.png",
  "/images/logo3.png",
  "/images/logo4.png",
  "/images/logo5.png",
  "/images/logo6.png"
];

export default function ImageCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const itemsPerView = 4;

  const nextSlide = () => {
    if (currentIndex + itemsPerView < images.length) {
      setCurrentIndex(currentIndex + itemsPerView);
    }
  };

  const prevSlide = () => {
    if (currentIndex - itemsPerView >= 0) {
      setCurrentIndex(currentIndex - itemsPerView);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto py-10 relative">
      
      {/* Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow p-2 rounded-full"
      >
        <ChevronLeft />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow p-2 rounded-full"
      >
        <ChevronRight />
      </button>

      {/* Carousel */}
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500"
          style={{
            transform: `translateX(-${(currentIndex * 100) / itemsPerView}%)`
          }}
        >
          {images.map((src, index) => (
            <div
              key={index}
              className="w-1/4 p-4 flex-shrink-0
                         sm:w-1/2 
                         md:w-1/3 
                         lg:w-1/4"
            >
              <div className="bg-white rounded-2xl shadow p-6 flex items-center justify-center h-32">
                <Image
                  src={src}
                  alt={`Logo ${index}`}
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
