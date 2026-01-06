import { Link } from "react-router-dom";

const Navbar = ({ toggleSidebar }) => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-secondary bg-[#FEFAE0]/95 backdrop-blur-md">
      <div className="px-4 md:px-8 xl:px-40 flex h-20 items-center justify-between gap-4">
        
        {/* Left: Hamburger & Logo */}
        <div className="flex items-center gap-4 shrink-0">
          <button 
            onClick={toggleSidebar}
            className="flex items-center justify-center p-2 rounded-lg text-contrast hover:bg-primary/20 transition-colors"
          >
            <span className="text-2xl">☰</span>
          </button>

          <Link to="/" className="flex items-center gap-3">
            <div className="size-8 text-primary">
              <svg className="h-full w-full" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <path d="M42.4379 44C42.4379 44 36.0744 33.9038 41.1692 24C46.8624 12.9336 42.2078 4 42.2078 4L7.01134 4C7.01134 4 11.6577 12.932 5.96912 23.9969C0.876273 33.9029 7.27094 44 7.27094 44L42.4379 44Z" fill="currentColor"></path>
              </svg>
            </div>
            <h1 className="text-xl font-bold tracking-tight text-contrast hidden sm:block">ArcadeHub</h1>
          </Link>
        </div>

        {/* Center: Search Bar (Desktop) */}
        <div className="hidden md:flex flex-1 max-w-2xl mx-4">
          <div className="relative w-full group">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-secondary group-focus-within:text-primary">
              <span className="text-lg">🔍</span>
            </div>
            <input 
              className="block w-full p-2.5 pl-10 text-sm text-contrast border border-secondary rounded-lg bg-white focus:ring-2 focus:ring-primary focus:border-primary outline-none placeholder-secondary transition-all shadow-sm" 
              placeholder="Search for games..." 
              type="text"
            />
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-3 shrink-0">
          <Link to="/portfolio" className="hidden md:flex items-center px-4 py-2 text-sm font-bold text-contrast hover:text-primary transition">
            Portfolio
          </Link>
          <button className="flex items-center justify-center p-2 rounded-lg text-secondary hover:bg-secondary/20 transition-colors relative">
            <span className="text-xl">🔔</span>
            <span className="absolute top-2 right-2 size-2 bg-primary rounded-full border border-[#FEFAE0]"></span>
          </button>
          <div className="size-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
            AH
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;