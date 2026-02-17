import React, { useState } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getCleanImage } from '../../utils/helpers';

const CategoryCard = ({ categoryName, products }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  // Guard clause if no products exist for this category
  if (!products || products.length === 0) return null;

  const currentProduct = products[activeIndex];



  // Slider Navigation
  const nextSlide = () => {
    setActiveIndex((prev) => (prev === products.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev === 0 ? products.length - 1 : prev - 1));
  };

  return (
    <div className="bg-white border border-gray-100 p-6 flex relative group hover:shadow-md transition-shadow h-[320px] rounded-sm">
      
      {/* 1. Price Tag (Top Left) - Cyan color matches image reference */}
      <span className="absolute top-4 left-6 text-cyan-400 font-bold text-xl">
        ${currentProduct.price}
      </span>

      {/* 2. Content Section (Left Side) */}
      <div className="flex-1 flex flex-col items-center justify-center text-center pr-6">
        
        {/* Product Title */}
        <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-1">
          {currentProduct.title}
        </h3>
        
        {/* Short Description */}
        <p className="text-[11px] text-gray-400 leading-relaxed mb-4 line-clamp-2 px-2">
          {currentProduct.description}
        </p>

        {/* Rating Stars */}
        <div className="flex gap-0.5 mb-6">
          {[...Array(5)].map((_, i) => (
            <Star 
              key={i} 
              size={14} 
              fill={i < 4 ? "#fbbf24" : "none"} 
              className={i < 4 ? "text-yellow-400" : "text-gray-200"} 
            />
          ))}
        </div>

        {/* Action Button */}
        <Link to={`product/${currentProduct.id}`} className="border-2 border-orange-300 text-orange-400 px-8 py-1.5 text-xs font-bold rounded hover:bg-orange-400 hover:text-white transition-all uppercase tracking-wide">
          Browse Product
        </Link>

        {/* Category Badge (Bottom Right) */}
        <div className="absolute bottom-5  left-3 flex items-center gap-1.5">
          <span className="text-[9px] text-gray-400 font-bold uppercase tracking-tighter">Category:</span>
          <span className="text-xs font-black italic text-gray-900 uppercase">
            {categoryName}
          </span>
        </div>

        {/* Navigation Controls (Bottom Left) */}
        <div className="absolute bottom-5 right-6 flex gap-1.5">
          <button 
            onClick={prevSlide}
            className="p-1 border border-gray-100 text-gray-400 hover:text-accent hover:border-accent transition-all cursor-pointer"
          >
            <ChevronLeft size={16} />
          </button>
          <button 
            onClick={nextSlide}
            className="p-1 border border-gray-100 text-gray-400 hover:text-accent hover:border-accent transition-all cursor-pointer"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* 3. Product Image Section (Right Side) */}
      <div className="w-1/3 flex items-center justify-center overflow-hidden">
        <img 
          key={currentProduct.id} // Forces re-animation on slide change
          src={getCleanImage(currentProduct.images)} 
          alt={currentProduct.title} 
          className="max-h-[180px] w-auto object-contain group-hover:scale-110 transition-transform duration-700 animate-in fade-in zoom-in-90" 
        />
      </div>
    </div>
  );
};

export default CategoryCard;