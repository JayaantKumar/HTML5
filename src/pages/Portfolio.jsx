import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAllPortfolioItems } from "../hooks/useAllPortfolioItems";
import SmartImage from "../components/ui/SmartImage";

const Portfolio = () => {
  const { items, loading } = useAllPortfolioItems();
  const [filter, setFilter] = useState("all");

  const filteredItems = filter === "all" 
    ? items 
    : items.filter(item => item.type === filter);

  if (loading) return <div className="text-center p-20 text-primary font-bold">Loading Portfolio...</div>;

  return (
    <div className="min-h-screen bg-[#FEFAE0] p-6 pt-12">
      <div className="max-w-[1600px] mx-auto">
        
        {/* Header */}
        <header className="mb-12 text-center">
          <h1 className="text-5xl md:text-6xl font-black text-contrast mb-6 tracking-tight">
            Creative Portfolio
          </h1>
          
          {/* Filter Pills */}
          <div className="inline-flex bg-white p-1.5 rounded-full border border-secondary/20 shadow-sm">
            {["all", "game", "client", "ghost"].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-6 py-2.5 rounded-full text-sm font-bold capitalize transition-all ${
                  filter === f 
                    ? "bg-primary text-white shadow-md" 
                    : "text-contrast hover:bg-secondary/10"
                }`}
              >
                {f === "ghost" ? "Experiments" : f}
              </button>
            ))}
          </div>
        </header>

        {/* Masonry Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
                  className="block group relative h-[340px] rounded-3xl overflow-hidden bg-white border border-secondary/20 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  {/* Image */}
                  <div className="h-3/4 w-full overflow-hidden relative">
                     <SmartImage 
                       src={item.bannerUrl} 
                       className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" 
                     />
                     <div className="absolute top-3 right-3 bg-white/90 backdrop-blur text-contrast text-[10px] font-black uppercase px-2 py-1 rounded border border-secondary/20">
                       {item.type}
                     </div>
                  </div>

                  {/* Info Card */}
                  <div className="h-1/4 p-5 flex flex-col justify-center bg-white relative z-10">
                    <h3 className="text-xl font-bold text-contrast truncate group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                    <div className="flex gap-2 mt-2">
                       {item.tags?.slice(0, 2).map(t => (
                         <span key={t} className="text-xs text-secondary font-medium bg-secondary/10 px-2 py-0.5 rounded">
                           {t}
                         </span>
                       ))}
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default Portfolio;