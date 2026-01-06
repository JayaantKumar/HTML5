import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const cats = ["Home", "New", "Best", "Match 3", "Bubble Shooter", "Puzzle", "Quiz", "Cards", "Girls", "Jump & Run", "Arcade", "Racing", "Sport", "Multiplayer", "All Games"];

  return (
    <footer className="bg-[#222222] text-white pt-16 pb-8 mt-auto">
      <div className="max-w-[1200px] mx-auto px-4 text-center">
        
        {/* 1. Category Pills */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {cats.map(cat => (
             <button key={cat} className="px-4 py-2 bg-[#333333] hover:bg-white hover:text-black rounded-lg text-sm font-bold uppercase transition flex items-center gap-2">
               {cat === 'Home' && '🏠'} {cat}
             </button>
          ))}
        </div>

        {/* 2. Promo Boxes */}
        <div className="grid md:grid-cols-2 gap-6 mb-16 max-w-4xl mx-auto">
           {/* About */}
           <div className="bg-[#1a1a1a] p-6 rounded-lg flex items-center gap-4 text-left hover:bg-[#2a2a2a] transition cursor-pointer group">
              <div className="bg-[#f05a28] text-white text-3xl font-bold h-12 w-12 flex items-center justify-center rounded group-hover:scale-110 transition">5</div>
              <div>
                <h4 className="font-bold uppercase text-lg">About</h4>
                <p className="text-gray-400 text-xs uppercase">What is HTML5 Games?</p>
              </div>
           </div>
           
           {/* Publishers */}
           <div className="bg-[#1a1a1a] p-6 rounded-lg flex items-center gap-4 text-left hover:bg-[#2a2a2a] transition cursor-pointer group">
              <div className="bg-[#f05a28] text-white text-3xl font-bold h-12 w-12 flex items-center justify-center rounded group-hover:scale-110 transition">📡</div>
              <div>
                <h4 className="font-bold uppercase text-lg">Publishers</h4>
                <p className="text-gray-400 text-xs uppercase">Buy and License HTML5 Games</p>
              </div>
           </div>
           
           {/* Developers (Full Width on mobile, centered on desktop grid logic) */}
           <div className="md:col-span-2 flex justify-center">
             <div className="bg-[#1a1a1a] p-6 rounded-lg flex items-center gap-4 text-left hover:bg-[#2a2a2a] transition cursor-pointer w-full md:w-auto min-w-[300px] group">
                <div className="bg-[#f05a28] text-white text-3xl font-bold h-12 w-12 flex items-center justify-center rounded group-hover:scale-110 transition">☁️</div>
                <div>
                  <h4 className="font-bold uppercase text-lg">Developers</h4>
                  <p className="text-gray-400 text-xs uppercase">Submit your HTML5 Game</p>
                </div>
             </div>
           </div>
        </div>

        {/* 3. Bottom Links */}
        <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-400 underline decoration-gray-600 mb-8">
           <a href="#" className="hover:text-white">Imprint</a>
           <a href="#" className="hover:text-white">Ad Vendors</a>
           <a href="#" className="hover:text-white">Privacy Policy</a>
           <a href="#" className="hover:text-white">gamebow.com</a>
        </div>

        {/* 4. Copyright & Logo */}
        <div className="text-gray-500 text-xs mb-4">
          © 2014-{currentYear} HTML5Games.com
        </div>
        
        <div className="flex flex-col items-center gap-1 opacity-50 hover:opacity-100 transition">
           <span className="text-[10px] uppercase tracking-widest">powered by</span>
           {/* Simple CSS logo for Famobi placeholder */}
           <div className="font-black text-xl tracking-tighter text-white">
             Famobi
           </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;