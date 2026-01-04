import { useState } from "react";
import { useAllPortfolioItems } from "../hooks/useAllPortfolioItems";
import SmartImage from "../components/ui/SmartImage";
import { Link } from "react-router-dom";
import * as FM from "framer-motion";

const { motion, AnimatePresence } = FM;

const Portfolio = () => {
  const { items, loading } = useAllPortfolioItems();
  const [filter, setFilter] = useState("all"); // 'all', 'game', 'client', 'ghost'

  const filteredItems = filter === "all" 
    ? items 
    : items.filter(item => item.type === filter);

  if (loading) return <div className="text-center p-20">Loading Portfolio...</div>;

  return (
    <div className="min-h-screen p-8 pt-10 max-w-7xl mx-auto">
      <header className="mb-12 text-center">
        <h1 className="text-5xl font-bold mb-4">Master Portfolio</h1>
        <div className="flex justify-center gap-4 mt-8">
          {["all", "game", "client", "ghost"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-full text-sm font-medium capitalize transition-all ${
                filter === f 
                  ? "bg-cyan-500 text-black shadow-lg shadow-cyan-500/50" 
                  : "bg-slate-800 text-slate-400 hover:bg-slate-700"
              }`}
            >
              {f === "ghost" ? "Experiments" : f}
            </button>
          ))}
        </div>
      </header>

      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredItems.map((item) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              key={item.id}
            >
              <Link 
                to={`/${item.type === 'game' ? 'game' : 'project'}/${item.slug}`}
                className="block group relative h-72 rounded-2xl overflow-hidden bg-slate-900 border border-slate-800"
              >
                {/* Image with Zoom Effect */}
                <div className="h-full w-full transition-transform duration-500 group-hover:scale-110">
                   <SmartImage src={item.bannerUrl} className="h-full w-full opacity-80 group-hover:opacity-100" />
                </div>

                {/* Overlay Info */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent flex flex-col justify-end p-6">
                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest mb-1 block">
                      {item.type}
                    </span>
                    <h3 className="text-2xl font-bold text-white mb-2">{item.title}</h3>
                    <div className="flex gap-2">
                       {item.tags?.slice(0, 3).map(t => (
                         <span key={t} className="text-[10px] px-2 py-1 border border-slate-600 rounded-md text-slate-300">
                           {t}
                         </span>
                       ))}
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default Portfolio;