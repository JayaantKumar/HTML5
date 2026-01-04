import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0b1120] border-t border-slate-800 mt-20 pb-10 pt-16">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 text-slate-400">
        
        {/* Brand */}
        <div className="md:col-span-2">
          <Link to="/" className="text-2xl font-bold text-white tracking-tighter">
            GAME<span className="text-cyan-400">DEV</span>
          </Link>
          <p className="mt-4 max-w-sm text-sm leading-relaxed">
            Creating immersive digital experiences through code, design, and motion. 
            Specializing in interactive web apps and indie games.
          </p>
        </div>

        {/* Links */}
        <div>
          <h4 className="text-white font-bold mb-4">Explore</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-cyan-400 transition">Games</Link></li>
            <li><Link to="/portfolio" className="hover:text-cyan-400 transition">Portfolio</Link></li>
            <li><Link to="/portfolio" className="hover:text-cyan-400 transition">Experiments</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-white font-bold mb-4">Connect</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-cyan-400 transition">GitHub</a></li>
            <li><a href="#" className="hover:text-cyan-400 transition">LinkedIn</a></li>
            <li><a href="#" className="hover:text-cyan-400 transition">Twitter</a></li>
            <li className="pt-4 text-cyan-500">hello@example.com</li>
          </ul>
        </div>
      </div>
      
      <div className="text-center text-xs text-slate-600 mt-16">
        © {currentYear} GameDev Portfolio. Built with React & Tailwind.
      </div>
    </footer>
  );
};

export default Footer;