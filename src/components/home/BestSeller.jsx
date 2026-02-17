import React, { useState } from "react";
/* 1. Added 'Check' icon */
import { ShoppingCart, Eye, Check } from "lucide-react"; 
import { Link } from "react-router-dom";
import { getCleanImage } from "../../utils/helpers";

/* 2. Added cartItems to props */
const BestSeller = ({ bestSeller, addToCart, cartItems }) => { 
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 4;
  const totalPages = Math.ceil(bestSeller.length / itemsPerPage) || 1;

  const startIndex = currentPage * itemsPerPage;
  const visibleItems = bestSeller.slice(startIndex, startIndex + itemsPerPage);

  /* 3. Helper function to check if item is in cart */
  const isInCart = (id) => cartItems?.some((item) => item.id === id);

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="flex flex-col items-center mb-12">
        <h2 className="text-3xl font-bold text-gray-800 tracking-tight">
          Best Seller
        </h2>
        <div className="w-20 h-1 bg-accent mt-2"></div>
      </div>

      <div className="relative overflow-hidden">
        <div className="flex">
          {visibleItems.map((p) => (
            <div
              key={p.id}
              className="w-full md:w-1/4 flex-shrink-0 px-2"
            >
              <div className="group bg-white border border-gray-100 p-4 hover:shadow-xl transition-all duration-300 relative">
                <div className="aspect-square mb-4 overflow-hidden bg-gray-50 relative">
                  <Link
                    to={`/product/${p.id}`}
                    className="block w-full h-full"
                    aria-label={`View details for ${p.title}`}
                  >
                    <img
                      src={getCleanImage(p.images)}
                      alt={p.title}
                      onError={(e) => {
                        e.currentTarget.src = "https://via.placeholder.com/400";
                      }}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </Link>

                  <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <Link
                      to={`/product/${p.id}`}
                      className="bg-white p-2 rounded-full shadow-md hover:text-accent"
                      aria-label={`Quick view for ${p.title}`}
                    >
                      <Eye size={18} />
                    </Link>

                    {/* 4. Conditional Rendering for the Icon */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        if (!isInCart(p.id)) addToCart(p);
                      }}
                      className={`p-2 rounded-full shadow-md transition-colors ${
                        isInCart(p.id)
                          ? "bg-green-500 text-white"
                          : "bg-white text-gray-800 hover:text-accent"
                      }`}
                      aria-label={
                        isInCart(p.id)
                          ? "Already in cart"
                          : `Add ${p.title} to cart`
                      }
                    >
                      {isInCart(p.id) ? (
                        <Check size={18} />
                      ) : (
                        <ShoppingCart size={18} />
                      )}
                    </button>
                  </div>
                </div>

                <div className="text-center">
                  <p className="text-[10px] text-accent font-bold uppercase tracking-widest mb-1">
                    {p.category.name}
                  </p>
                  <h3 className="text-sm font-medium text-gray-700 line-clamp-1 mb-2">
                    {p.title}
                  </h3>
                  <p className="text-lg font-bold text-gray-900">${p.price}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-center gap-3 mt-10">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setCurrentPage(i)}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                currentPage === i ? "w-8 bg-accent" : "w-2 bg-gray-300"
              }`}
              aria-label={`Go to page ${i + 1} of best sellers`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BestSeller;