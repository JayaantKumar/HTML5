import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = ({ toggleSidebar }) => {
  return (
    <nav className="fixed top-0 w-full z-40 bg-[#333333] h-16 shadow-md border-b border-gray-800">
      <div className="max-w-[1400px] mx-auto px-4 h-full flex justify-between items-center relative">
        
        {/* Left: Hamburger Menu */}
        <button 
          onClick={toggleSidebar}
          className="p-2 bg-gray-600/50 hover:bg-gray-500 rounded-md text-white transition"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Center: Orange Logo Badge (Absolute Centered) */}
        <div className="absolute left-1/2 top-0 transform -translate-x-1/2">
          <Link to="/" className="block">
            {/* CSS shape to mimic the orange badge */}
            <div className="bg-[#f05a28] h-20 w-48 flex items-center justify-center rounded-b-full shadow-lg pt-2 pb-6">
               <h1 className="text-2xl font-black text-white italic tracking-tighter">
                 HTML<span className="text-5xl align-middle mx-1">5</span>GAMES
               </h1>
            </div>
          </Link>
        </div>

        {/* Right: Language / Extra (Placeholder) */}
        <div className="hidden md:block">
           <button className="flex items-center gap-2 bg-gray-600/50 hover:bg-gray-500 px-3 py-1 rounded text-sm text-white font-bold transition">
             EN ▼
           </button>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;