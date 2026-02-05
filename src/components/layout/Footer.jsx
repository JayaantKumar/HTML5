import { Link } from "react-router-dom";

const Footer = () => {
  const categories = [
    { name: "Home", icon: "🏠", link: "/" },
    { name: "New", icon: "🆕", link: "/?category=New" },
    { name: "Best", icon: "👍", link: "/?category=Best" },
    { name: "Match 3", icon: "💎", link: "/?category=Match 3" },
    { name: "Bubble Shooter", icon: "🔵", link: "/?category=Bubble Shooter" },
    { name: "Puzzle", icon: "🧩", link: "/?category=Puzzle" },
    { name: "Quiz", icon: "❓", link: "/?category=Quiz" },
    { name: "Cards", icon: "🃏", link: "/?category=Cards" },
    { name: "Girls", icon: "🎀", link: "/?category=Girls" },
    { name: "Jump & Run", icon: "🏃", link: "/?category=Jump & Run" },
    { name: "Arcade", icon: "🕹️", link: "/?category=Arcade" },
    { name: "Racing", icon: "🏎️", link: "/?category=Racing" },
    { name: "Sport", icon: "⚽", link: "/?category=Sport" },
    { name: "Multiplayer", icon: "👥", link: "/?category=Multiplayer" },
    { name: "All Games", icon: "☰", link: "/" },
  ];

  return (
    <footer className="bg-[#323232] mt-auto text-[#DDD0C8] pt-16 pb-12 border-t border-[#DDD0C8]/10">
      <div className="max-w-[1600px] mx-auto px-4 md:px-8 xl:px-40">
        
        {/* Category Pills */}
        <div className="flex flex-wrap justify-center gap-3 mb-16 border-b border-[#DDD0C8]/10 pb-12">
          {categories.map((cat) => (
             <Link 
               key={cat.name} 
               to={cat.link}
               className="group flex items-center gap-2 px-4 py-2 bg-[#444444] border border-[#DDD0C8]/10 hover:bg-[#DDD0C8] hover:text-[#323232] rounded-lg text-xs font-bold uppercase transition-all duration-300"
             >
               <span className="text-sm">{cat.icon}</span>
               <span>{cat.name}</span>
             </Link>
          ))}
        </div>

        {/* Brand & Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-6 text-[#DDD0C8]">
              <svg className="size-8" fill="currentColor" viewBox="0 0 48 48">
                <path d="M42.4379 44C42.4379 44 36.0744 33.9038 41.1692 24C46.8624 12.9336 42.2078 4 42.2078 4L7.01134 4C7.01134 4 11.6577 12.932 5.96912 23.9969C0.876273 33.9029 7.27094 44 7.27094 44L42.4379 44Z"></path>
              </svg>
              <span className="font-bold text-2xl">ArcadeHub</span>
            </div>
            <p className="text-sm opacity-60 leading-relaxed">
              The ultimate destination for next-gen HTML5 browser games. Play instantly, no downloads required.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-white mb-6">Discover</h4>
            <ul className="space-y-3 text-sm font-medium opacity-80">
              <li><Link to="/?category=New" className="hover:text-white transition-colors">New Arrivals</Link></li>
              <li><Link to="/?category=Racing" className="hover:text-white transition-colors">Racing</Link></li>
              <li><Link to="/portfolio" className="hover:text-white transition-colors">Editor's Picks</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-white mb-6">Support</h4>
            <ul className="space-y-3 text-sm font-medium opacity-80">
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
              <li><a href="#" className="hover:text-white transition-colors">Submit a Game</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-white mb-6">Legal</h4>
            <ul className="space-y-3 text-sm font-medium opacity-80">
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#DDD0C8]/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm opacity-40">© 2026 ArcadeHub Inc.</p>
          <div className="flex gap-6 text-sm opacity-60">
            <a href="#" className="hover:text-white hover:opacity-100 transition">Twitter</a>
            <a href="#" className="hover:text-white hover:opacity-100 transition">GitHub</a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;