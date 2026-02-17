import React, { useState } from "react";
import { ShoppingCart, Menu, X, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="w-full bg-white font-sans">
      
      <div className="max-w-7xl mx-auto px-4 border-b border-gray-100">
        <div className="flex items-center justify-between h-16 md:h-20">
        
          <div className="shrink-0">
            <Link to={"/"} className="text-3xl font-bold text-accent  cursor-pointer">
              <span className="text-gray-800 underline decoration-accent decoration-4 underline-offset-4">
                Araby
              </span>
            </Link>
          </div>

      
          <div className="hidden lg:flex items-center gap-8 text-[15px] font-medium text-gray-600">
            <Link to={"/"}  className="text-accent border-b-2 border-accent pb-1">
              Home
            </Link>
            <div className="flex items-center gap-1 cursor-pointer hover:text-accent transition-colors">
              <span>Store Sections</span>
              <ChevronDown size={14} />
            </div>

            <Link to={"/searchResults"}  className="hover:text-accent transition-colors">
              Advanced Search
            </Link>
            <Link to={"/contact"} className="hover:text-accent transition-colors">
              Contact Us
            </Link>
          </div>

          
          <div className="flex items-center gap-2">
            
            <div className="hidden md:flex items-center border border-gray-200 rounded-sm overflow-hidden">
              <input
                type="text"
                placeholder="Search keywords..."
                className="px-4 py-2 outline-none w-48 lg:w-64 text-sm"
              />

              <div className="relative flex items-center bg-gray-50 border-x border-border-soft-2 group">
                <select
                  className="appearance-none bg-transparent pl-4 pr-8 py-2 text-xs font-medium text-text-muted cursor-pointer outline-none focus:text-accent transition-colors"
                 
                >
                  <option hidden>
                    Category
                  </option>
                  <option value="men"> Men</option>
                  <option value="women">Women</option>
                  <option value="kids">Kids</option>
                </select>

                
                <div className="absolute right-2 pointer-events-none text-text-muted group-hover:text-accent transition-colors">
                  <ChevronDown size={12} strokeWidth={3} />
                </div>
              </div>

              <button className="bg-accent  hover:bg-red-600 text-white px-5 py-2 text-sm font-bold transition-colors h-10 cursor-pointer">
                SEARCH
              </button>
            </div>

           
            <div className="flex items-center gap-2 ml-2">
              <Link to={"/cart"} className="p-2 border border-gray-200 rounded text-gray-600 cursor-pointer hover:bg-gray-50">
                <ShoppingCart size={20} />
              </Link>

              {/* Mobile Hamburger Menu */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 border border-gray-200 rounded text-gray-600 hover:bg-gray-50"
              >
                {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Mobile Search Bar (Only visible on small screens - matches image 27e103) */}
      <div className="md:hidden p-4 border-b border-gray-100">
        <div className="flex items-center w-full border border-gray-200 rounded-sm overflow-hidden">
          <input
            type="text"
            placeholder="Search keywords..."
            className="flex-grow px-3 py-2 outline-none text-sm"
          />
          <button className="bg-accent text-white px-6 py-2 text-sm font-bold">
            SEARCH
          </button>
        </div>
      </div>

      {/* 5. Mobile Menu Drawer */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-200 animate-in fade-in slide-in-from-top-2">
          <div className="flex flex-col p-4 space-y-4 text-sm font-medium text-gray-700">
            <Link to="/" className="text-accent" onClick={() => setIsMenuOpen(false)}>
              Home
            </Link>
            <button
              type="button"
              className="flex justify-between items-center text-left"
            >
              Store Sections <ChevronDown size={14} />
            </button>
            <Link
              to="/searchResults"
              onClick={() => setIsMenuOpen(false)}
            >
              Advanced Search
            </Link>
            <Link
              to="/contact"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact Us
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
