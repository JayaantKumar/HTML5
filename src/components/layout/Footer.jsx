import { Link } from "react-router-dom";

const Footer = () => {
  const categories = [
    { name: "Home", icon: "🏠", link: "/" },
    { name: "New", icon: "🆕", link: "/" },
    { name: "Best", icon: "👍", link: "/" },
    { name: "Match 3", icon: "💎", link: "/" },
    { name: "Bubble Shooter", icon: "🔵", link: "/" },
    { name: "Puzzle", icon: "🧩", link: "/" },
    { name: "Quiz", icon: "❓", link: "/" },
    { name: "Cards", icon: "🃏", link: "/" },
    { name: "Girls", icon: "🎀", link: "/" },
    { name: "Jump & Run", icon: "🏃", link: "/" },
    { name: "Arcade", icon: "🕹️", link: "/" },
    { name: "Racing", icon: "🏎️", link: "/" },
    { name: "Sport", icon: "⚽", link: "/" },
    { name: "Multiplayer", icon: "👥", link: "/" },
    { name: "All Games", icon: "☰", link: "/" },
  ];

  return (
    <footer className="bg-[#0A400C] mt-auto text-[#B1AB86] border-t border-[#B1AB86]/20 pt-16 pb-12">
      <div className="max-w-[1600px] mx-auto px-4 md:px-8 xl:px-40">
        
        {/* 1. Category Pills (Styled to match your Green Theme) */}
        <div className="flex flex-wrap justify-center gap-3 mb-16 border-b border-[#B1AB86]/10 pb-12">
          {categories.map((cat) => (
             <Link 
               key={cat.name} 
               to={cat.link}
               className="group flex items-center gap-2 px-4 py-2 bg-[#0F4E11] border border-[#B1AB86]/20 hover:bg-[#FEFAE0] hover:text-[#0A400C] hover:border-[#FEFAE0] rounded-lg text-xs font-bold uppercase transition-all duration-300"
             >
               <span className="text-sm">{cat.icon}</span>
               <span>{cat.name}</span>
             </Link>
          ))}
        </div>

        {/* 2. Main 4-Column Layout (From your reference code) */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          {/* Brand Column */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-6 text-[#819067]">
              <svg className="size-8" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <path d="M42.4379 44C42.4379 44 36.0744 33.9038 41.1692 24C46.8624 12.9336 42.2078 4 42.2078 4L7.01134 4C7.01134 4 11.6577 12.932 5.96912 23.9969C0.876273 33.9029 7.27094 44 7.27094 44L42.4379 44Z" fill="currentColor"></path>
              </svg>
              <span className="font-bold text-2xl text-[#FEFAE0]">ArcadeHub</span>
            </div>
            <p className="text-sm opacity-80 leading-relaxed">
              The ultimate destination for next-gen HTML5 browser games. Play instantly, no downloads required.
            </p>
          </div>

          {/* Discover Column */}
          <div>
            <h4 className="font-bold text-[#FEFAE0] mb-6">Discover</h4>
            <ul className="space-y-3 text-sm font-medium">
              <li><Link to="/" className="hover:text-[#FEFAE0] transition-colors">New Arrivals</Link></li>
              <li><Link to="/" className="hover:text-[#FEFAE0] transition-colors">Most Popular</Link></li>
              <li><Link to="/portfolio" className="hover:text-[#FEFAE0] transition-colors">Editor's Picks</Link></li>
            </ul>
          </div>

          {/* Support Column */}
          <div>
            <h4 className="font-bold text-[#FEFAE0] mb-6">Support</h4>
            <ul className="space-y-3 text-sm font-medium">
              <li><Link to="/contact" className="hover:text-[#FEFAE0] transition-colors">Contact Us</Link></li>
              <li><a href="#" className="hover:text-[#FEFAE0] transition-colors">Submit a Game</a></li>
              <li><a href="#" className="hover:text-[#FEFAE0] transition-colors">Developers</a></li>
            </ul>
          </div>

          {/* Legal Column */}
          <div>
            <h4 className="font-bold text-[#FEFAE0] mb-6">Legal</h4>
            <ul className="space-y-3 text-sm font-medium">
              <li><a href="#" className="hover:text-[#FEFAE0] transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-[#FEFAE0] transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
        </div>

        {/* 3. Bottom Bar */}
        <div className="pt-8 border-t border-[#B1AB86]/20 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm opacity-60">© 2026 ArcadeHub Inc. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="opacity-60 hover:opacity-100 hover:text-[#FEFAE0] transition">Twitter</a>
            <a href="#" className="opacity-60 hover:opacity-100 hover:text-[#FEFAE0] transition">GitHub</a>
            <a href="#" className="opacity-60 hover:opacity-100 hover:text-[#FEFAE0] transition">Discord</a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;