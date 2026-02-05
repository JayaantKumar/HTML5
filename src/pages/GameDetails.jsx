import { useParams, Link } from "react-router-dom";
import { useGameBySlug } from "../hooks/useGameBySlug";
import { useSimilarGames } from "../hooks/useSimilarGames";
import SmartImage from "../components/ui/SmartImage";
import { motion } from "framer-motion";

const GameDetails = () => {
  const { slug } = useParams();
  const game = useGameBySlug(slug);
  const similarGames = useSimilarGames(game?.id, game?.tags);

  if (!game) return <div className="text-center pt-20 font-bold">Loading...</div>;

  return (
    <div className="min-h-screen bg-[#DDD0C8] pb-20">
      
      {/* Hero Banner */}
      <div className="relative h-[40vh] md:h-[50vh] w-full group">
        <SmartImage src={game.bannerUrl} className="h-full w-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#DDD0C8] via-[#DDD0C8]/20 to-transparent" />
        
        <div className="absolute bottom-0 left-0 w-full p-6 max-w-[1600px] mx-auto text-center">
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-4xl md:text-6xl font-black text-[#323232] mb-4"
          >
            {game.title}
          </motion.h1>
          <div className="flex justify-center gap-2">
            {game.tags?.map(tag => (
               <span key={tag} className="bg-[#323232] text-[#DDD0C8] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm">
                 {tag}
               </span>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-[1200px] mx-auto px-4 mt-12 grid lg:grid-cols-3 gap-12">
        
        <div className="lg:col-span-2 space-y-12">
          {/* Icons Section */}
          <div className="bg-[#E8E2DC] p-8 rounded-xl text-center border border-[#323232]/10">
            <h3 className="text-[#323232] font-black uppercase tracking-wider mb-8 text-sm">Assets</h3>
            <div className="flex flex-wrap justify-center items-end gap-8">
              <div className="flex flex-col items-center gap-2">
                <div className="size-[120px] rounded-xl overflow-hidden shadow-sm bg-white p-1">
                  <SmartImage src={game.bannerUrl} className="w-full h-full object-cover rounded-lg" />
                </div>
                <span className="text-xs font-bold text-[#323232]/70">120x120</span>
              </div>
            </div>
          </div>

          {/* Similar Games */}
          <div>
             <h3 className="text-[#323232] font-black uppercase tracking-wider mb-6 text-sm">Similar Games</h3>
             {similarGames.length > 0 ? (
               <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                 {similarGames.map(simGame => (
                   <Link key={simGame.id} to={`/game/${simGame.slug}`} className="group text-center">
                     <div className="aspect-square rounded-xl overflow-hidden bg-[#E8E2DC] mb-2 relative border border-[#323232]/5">
                       <SmartImage src={simGame.bannerUrl} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                     </div>
                     <h4 className="font-bold text-[#323232] text-xs truncate">{simGame.title}</h4>
                   </Link>
                 ))}
               </div>
             ) : ( <p className="text-sm opacity-50">No related games.</p> )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="relative">
          <div className="sticky top-24 bg-[#E8E2DC] p-8 rounded-xl border border-[#323232]/10 shadow-sm text-center">
            <div className="mb-6">
              <span className="text-4xl">🎮</span>
              <p className="font-bold text-[#323232] mt-2 uppercase text-sm">Ready to play?</p>
            </div>
            
            <button className="w-full bg-[#323232] hover:bg-black text-[#DDD0C8] font-black text-xl py-4 rounded-lg transition-all shadow-md active:scale-95 flex items-center justify-center gap-2 mb-6">
              PLAY NOW
            </button>
            
            <div className="text-left space-y-3 text-sm text-[#323232]/70 border-t border-[#323232]/10 pt-4 font-mono">
              <div className="flex justify-between"><span>Rating</span><span className="font-bold">4.8</span></div>
              <div className="flex justify-between"><span>Type</span><span className="font-bold">HTML5</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameDetails;