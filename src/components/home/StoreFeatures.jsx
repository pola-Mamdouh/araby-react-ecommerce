import React from 'react';
import { RefreshCw, ShieldCheck, Truck } from 'lucide-react';

const StoreFeatures = () => {
  return (
    <div className="relative z-20 max-w-4xl mx-auto -mt-16 mb-12">
      <div className="bg-white rounded-lg shadow-lg py-8 px-4 flex flex-col md:flex-row justify-around items-center gap-6 text-center border border-gray-100">
        
        {/* Feature 1 */}
        <div className="flex flex-col items-center gap-3 group cursor-pointer">
          <div className="text-red-500 group-hover:scale-110 transition-transform duration-300">
            <RefreshCw size={40} strokeWidth={1.5} />
          </div>
          <div>
            <h3 className="font-bold text-gray-800 text-sm">Return Policy</h3>
            <p className="text-xs text-gray-500 mt-1">Return within 30 days</p>
          </div>
        </div>

        {/* Divider (Hidden on mobile) */}
        <div className="hidden md:block w-px h-12 bg-gray-200"></div>

        {/* Feature 2 */}
        <div className="flex flex-col items-center gap-3 group cursor-pointer">
          <div className="text-red-500 group-hover:scale-110 transition-transform duration-300">
            <ShieldCheck size={40} strokeWidth={1.5} />
          </div>
          <div>
            <h3 className="font-bold text-gray-800 text-sm">Quality Guarantee</h3>
            <p className="text-xs text-gray-500 mt-1">1 Year Product Warranty</p>
          </div>
        </div>

        {/* Divider */}
        <div className="hidden md:block w-px h-12 bg-gray-200"></div>

        {/* Feature 3 */}
        <div className="flex flex-col items-center gap-3 group cursor-pointer">
          <div className="text-red-500 group-hover:scale-110 transition-transform duration-300">
            <Truck size={40} strokeWidth={1.5} />
          </div>
          <div>
            <h3 className="font-bold text-gray-800 text-sm">Free Shipping</h3>
            <p className="text-xs text-gray-500 mt-1">On orders over $200</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default StoreFeatures;