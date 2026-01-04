import { useParams, Link } from "react-router-dom";
import { useGameBySlug } from "../hooks/useGameBySlug";
import SmartImage from "../components/ui/SmartImage";
import * as FM from "framer-motion";

const { motion, AnimatePresence } = FM;

const GameDetails = () => {
  const { slug } = useParams();
  const game = useGameBySlug(slug);

  if (!game) return <div className="text-center pt-20">Loading Game Data...</div>;

  return (
    <div className="min-h-screen bg-[#0f172a]">
      {/* Hero Section */}
      <div className="relative h-[60vh] w-full">
        <SmartImage src={game.bannerUrl} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/50 to-transparent" />
        
        <div className="absolute bottom-0 left-0 w-full p-8 md:p-16 max-w-7xl mx-auto">
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-5xl md:text-7xl font-bold text-white mb-4"
          >
            {game.title}
          </motion.h1>
          
          <div className="flex flex-wrap gap-3">
            {game.tags.map(tag => (
              <span key={tag} className="px-3 py-1 bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 rounded-lg text-sm">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-4xl mx-auto p-8 grid md:grid-cols-3 gap-12">
        {/* Left: Main Description */}
        <div className="md:col-span-2 space-y-6">
          <h2 className="text-2xl font-bold text-slate-200">About the Game</h2>
          <p className="text-slate-400 leading-relaxed text-lg">
            {game.description}
          </p>
          <p className="text-slate-500">
            (This is where the longDescription from Firestore will go. 
            We can inject HTML or Markdown here later.)
          </p>
          
          <div className="mt-8">
            <Link to="/" className="text-cyan-400 hover:underline">← Back to Home</Link>
          </div>
        </div>

        {/* Right: Sidebar Stats */}
        <div className="space-y-6">
          <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Project Details</h3>
            
            <div className="space-y-4">
              <div>
                <span className="block text-xs text-slate-500">Release Date</span>
                <span className="text-white">Jan 2026</span>
              </div>
              <div>
                 <span className="block text-xs text-slate-500">Platform</span>
                 <span className="text-white">Web / PC</span>
              </div>
              
              <button className="w-full mt-4 bg-cyan-500 hover:bg-cyan-400 text-black font-bold py-3 rounded-xl transition-colors">
                Play Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameDetails;