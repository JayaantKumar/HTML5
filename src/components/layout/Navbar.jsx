import { Link } from "react-router-dom";

const Navbar = ({ toggleSidebar }) => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#323232]/10 bg-[#DDD0C8]/95 backdrop-blur-md">
      <div className="px-4 md:px-8 xl:px-40 flex h-20 items-center justify-between gap-4">
        
        {/* Left: Hamburger & Logo */}
        <div className="flex items-center gap-4 shrink-0">
          <button 
            onClick={toggleSidebar}
            className="flex items-center justify-center p-2 rounded-lg text-[#323232] hover:bg-[#323232]/10 transition-colors"
          >
            <span className="text-2xl">☰</span>
          </button>

          <Link to="/" className="flex items-center gap-3">
            <div className="size-8 text-[#323232]">
              <svg className="h-full w-full" fill="currentColor" viewBox="0 0 48 48">
                <path d="M42.4379 44C42.4379 44 36.0744 33.9038 41.1692 24C46.8624 12.9336 42.2078 4 42.2078 4L7.01134 4C7.01134 4 11.6577 12.932 5.96912 23.9969C0.876273 33.9029 7.27094 44 7.27094 44L42.4379 44Z"></path>
              </svg>
            </div>
            <h1 className="text-xl font-bold tracking-tight text-[#323232] hidden sm:block">ArcadeHub</h1>
          </Link>
        </div>

        {/* Center: Search Bar */}
        <div className="hidden md:flex flex-1 max-w-2xl mx-4">
          <div className="relative w-full group">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-[#323232]/50 group-focus-within:text-[#323232]">
              <span className="text-lg">🔍</span>
            </div>
            {/* Input is lighter beige to stand out slightly */}
            <input 
              className="block w-full p-2.5 pl-10 text-sm text-[#323232] border border-[#323232]/20 rounded-lg bg-[#E8E2DC] focus:ring-1 focus:ring-[#323232] focus:border-[#323232] outline-none placeholder-[#323232]/40 transition-all shadow-sm" 
              placeholder="Search for games..." 
              type="text"
            />
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-3 shrink-0">
          <Link to="/portfolio" className="hidden md:flex items-center px-4 py-2 text-sm font-bold text-[#323232] hover:bg-[#323232]/5 rounded-lg transition">
            Portfolio
          </Link>
          <div className="size-8 rounded-full bg-[#323232] flex items-center justify-center text-[#DDD0C8] font-bold border border-[#323232]">
            AH
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;