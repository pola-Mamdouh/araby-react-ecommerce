import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import StoreFeatures from "./StoreFeatures"; // Import the features component
import {getCleanImage} from '../../utils/helpers'
const Slider = ({ homeProducts }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  // Guard Clause: Prevent crash if data isn't ready
  if (!homeProducts || homeProducts.length === 0) {
    return (
      <div className="h-[60vh] bg-[#f9f9f7] flex items-center justify-center text-gray-400">
        Loading Featured Products...
      </div>
    );
  }
  useEffect(() => {
  const intervalId = setInterval(() => {
    setActiveIndex((prev) =>
      prev === homeProducts.length - 1 ? 0 : prev + 1
    );
  }, 5000);

  return () => clearInterval(intervalId); // cleanup on unmount
}, [homeProducts.length]); // only depends on length of products

  const currentProduct = homeProducts[activeIndex];



  return (
    <div className="relative bg-gray-50 shadow">
      {/* MAIN SLIDER SECTION - Approx 65vh Height */}
      <section className="relative w-full min-h-[500px] lg:h-[65vh] flex items-center overflow-hidden pb-16">
        {/* Navigation Arrows */}
        <button
          onClick={() =>
            setActiveIndex((prev) =>
              prev === 0 ? homeProducts.length - 1 : prev - 1,
            )
          }
          className="absolute left-2 md:left-8 top-1/2 -translate-y-1/2 z-20 text-gray-400 hover:text-red-500 transition-colors"
        >
          <ChevronLeft size={48} strokeWidth={1} />
        </button>

        <button
          onClick={() =>
            setActiveIndex((prev) =>
              prev === homeProducts.length - 1 ? 0 : prev + 1,
            )
          }
          className="absolute right-2 md:right-8 top-1/2 -translate-y-1/2 z-20 text-gray-400 hover:text-red-500 transition-colors"
        >
          <ChevronRight size={48} strokeWidth={1} />
        </button>

        <div className="max-w-7xl mx-auto px-4 w-full h-full flex flex-col md:flex-row items-center justify-center gap-8 md:gap-0">
          {/* LEFT: Text Content Box (Glassmorphism) */}
          <div className="w-full md:w-1/2 flex justify-center md:justify-start relative z-10 order-2 md:order-1">
            <div className="relative border border-gray-200 bg-white/60 backdrop-blur-sm p-8 md:p-12 w-full max-w-lg shadow-sm">
              {/* Floating Category Tag */}
              <span className="absolute -top-3 right-8 bg-gray-50 border border-gray-100 px-4 py-1 text-xs font-medium text-gray-500 uppercase tracking-wider">
                {currentProduct.category?.name || "Featured"}
              </span>

              <h2 className="text-3xl md:text-5xl font-bold text-gray-800 mb-6 leading-tight line-clamp-2">
                {currentProduct.title}
              </h2>

              <button className="border border-orange-400 text-orange-500 px-8 py-2 text-lg font-medium hover:bg-orange-500 hover:text-white transition-all duration-300">
                Shop Now
              </button>

              {/* Thumbnails */}
              <div className="flex gap-3 mt-8">
                {homeProducts.map((p, index) => (
                  <div
                    key={p.id}
                    onClick={() => setActiveIndex(index)}
                    className={`w-14 h-14 border cursor-pointer p-1 bg-white transition-all ${
                      activeIndex === index
                        ? "border-orange-400 ring-1 ring-orange-200"
                        : "border-gray-200 opacity-60 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={getCleanImage(p.images)}
                      alt={p.title}
                      onError={(e) => e.target.src = "https://via.placeholder.com/400"}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT: Hero Image */}
          <div className="w-full md:w-1/2 flex justify-center items-center h-full order-1 md:order-2">
            <img
              key={currentProduct.id} // Key forces re-render for animation
              src={getCleanImage(currentProduct.images)}
              alt={currentProduct.title}
              className="max-h-[350px] md:max-h-[450px] w-auto object-contain drop-shadow-xl animate-in fade-in slide-in-from-right-8 duration-700"
            />
          </div>
        </div>
      </section>

      {/* STORE FEATURES - Overlapping Section */}
      <StoreFeatures />
    </div>
  );
};

export default Slider;
