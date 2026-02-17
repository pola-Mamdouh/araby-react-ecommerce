import React from 'react';
import { Facebook, Twitter, Instagram } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-[#1a1a1a] text-white pt-16 relative overflow-hidden">
      {/* Background Watermark */}
      <div className="absolute inset-0 opacity-5 pointer-events-none flex justify-between px-10">
         <div className="text-[200px] font-bold">@</div>
         <div className="text-[200px] font-bold">@</div>
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
        {/* Logo */}
        <h2 className="text-4xl font-bold text-accent mb-8">Araby</h2>

        {/* Navigation */}
        <ul className="flex flex-wrap justify-center gap-8 text-gray-400 text-sm mb-12">
          <li>
            <Link
              to="/"
              className="hover:text-accent transition-colors"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/searchResults"
              className="hover:text-accent transition-colors"
            >
              Advanced Search
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className="hover:text-accent transition-colors"
            >
              Contact Us
            </Link>
          </li>
        </ul>

        {/* Newsletter */}
        <div className="max-w-md mx-auto mb-16">
          <p className="text-gray-400 text-xs mb-4 uppercase tracking-widest">
            Follow our newsletter for the latest offers
          </p>
          <div className="flex shadow-2xl">
            <input 
              type="email" 
              placeholder="Email address" 
              className="flex-1 bg-white/10 border-none px-6 py-3 text-sm focus:ring-1 focus:ring-accent outline-none"
            />
            <button className="bg-accent text-white px-8 py-3 font-bold hover:bg-orange-500 transition-colors uppercase text-sm">
              Subscribe
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/5 py-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex gap-6 text-gray-500">
            <button
              type="button"
              className="hover:text-white cursor-pointer"
              aria-label="Visit our Instagram"
            >
              <Instagram size={18} />
            </button>
            <button
              type="button"
              className="hover:text-white cursor-pointer"
              aria-label="Visit our Twitter"
            >
              <Twitter size={18} />
            </button>
            <button
              type="button"
              className="hover:text-white cursor-pointer"
              aria-label="Visit our Facebook"
            >
              <Facebook size={18} />
            </button>
          </div>
          <p className="text-gray-500 text-[10px] uppercase tracking-widest">
            All rights reserved to the store 2026
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;