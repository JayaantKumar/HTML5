import { useParams, Link } from "react-router-dom";
import { useGameBySlug } from "../hooks/useGameBySlug";
import { useSimilarGames } from "../hooks/useSimilarGames";
import SmartImage from "../components/ui/SmartImage";
import { motion } from "framer-motion";

const GameDetails = () => {
  const { slug } = useParams();
  const game = useGameBySlug(slug);
  const similarGames = useSimilarGames(game?.id, game?.tags);

  if (!game) return <div className="text-center pt-20 text-contrast font-bold">Loading Game...</div>;

  return (
    <div className="min-h-screen bg-[#FEFAE0] pb-20">
      
      {/* 1. Hero Banner */}
      <div className="relative h-[40vh] md:h-[50vh] w-full group">
        <SmartImage src={game.bannerUrl} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#FEFAE0] via-[#FEFAE0]/20 to-transparent" />
        
        <div className="absolute bottom-0 left-0 w-full p-6 max-w-[1600px] mx-auto text-center">
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-4xl md:text-6xl font-black text-contrast drop-shadow-sm mb-2"
          >
            {game.title}
          </motion.h1>
          <div className="flex justify-center gap-2">
            {game.tags?.map(tag => (
               <span key={tag} className="bg-white/80 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-primary border border-primary/20">
                 {tag}
               </span>
            ))}
          </div>
        </div>
      </div>

      {/* 2. Main Content & Sidebar */}
      <div className="max-w-[1200px] mx-auto px-4 mt-8 grid lg:grid-cols-3 gap-12">
        
        {/* CENTER COLUMN: Languages & Icons */}
        <div className="lg:col-span-2 space-y-12">
          
          {/* A. Language Section */}
          <div className="text-center">
            <h3 className="text-[#005c74] font-black uppercase tracking-wider mb-4 text-sm">Languages</h3>
            <div className="flex justify-center gap-6">
              {[
                { code: "de", label: "DE", flag: "🇩🇪" },
                { code: "tr", label: "TR", flag: "🇹🇷" },
                { code: "en", label: "EN", flag: "🇺🇸" }
              ].map(lang => (
                <div key={lang.code} className="flex flex-col items-center gap-1 group cursor-pointer">
                  <div className="text-3xl filter grayscale group-hover:grayscale-0 transition-all transform group-hover:scale-110">
                    {lang.flag}
                  </div>
                  <span className="text-xs font-bold text-secondary uppercase group-hover:text-primary">{lang.code}</span>
                </div>
              ))}
            </div>
          </div>

          {/* B. Game Icons (Asset Downloads) */}
          <div className="bg-[#f0f2f5] p-8 rounded-xl text-center border border-secondary/10">
            <h3 className="text-[#005c74] font-black uppercase tracking-wider mb-8 text-sm">Game Icons</h3>
            
            <div className="flex flex-wrap justify-center items-end gap-8">
              {/* 180x180 */}
              <div className="flex flex-col items-center gap-2">
                <div className="size-[180px] rounded-2xl overflow-hidden shadow-md bg-white p-1">
                  <SmartImage src={game.bannerUrl} className="w-full h-full object-cover rounded-xl" />
                </div>
                <span className="text-xs font-bold text-[#005c74]">180x180</span>
              </div>

              {/* 120x120 */}
              <div className="flex flex-col items-center gap-2">
                <div className="size-[120px] rounded-xl overflow-hidden shadow-md bg-white p-1">
                  <SmartImage src={game.bannerUrl} className="w-full h-full object-cover rounded-lg" />
                </div>
                <span className="text-xs font-bold text-[#005c74]">120x120</span>
              </div>

              {/* 60x60 */}
              <div className="flex flex-col items-center gap-2">
                <div className="size-[60px] rounded-lg overflow-hidden shadow-md bg-white p-0.5">
                  <SmartImage src={game.bannerUrl} className="w-full h-full object-cover rounded" />
                </div>
                <span className="text-xs font-bold text-[#005c74]">60x60</span>
              </div>
            </div>
          </div>

          {/* C. Similar Games Grid */}
          <div className="pt-8">
             <h3 className="text-[#005c74] font-black uppercase tracking-wider mb-8 text-center text-sm">Similar Games</h3>
             
             {similarGames.length > 0 ? (
               <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                 {similarGames.map(simGame => (
                   <Link key={simGame.id} to={`/game/${simGame.slug}`} className="group text-center">
                     <div className="aspect-square rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all mb-3 relative">
                       <SmartImage src={simGame.bannerUrl} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                     </div>
                     <h4 className="font-bold text-[#005c74] text-sm group-hover:text-primary truncate px-2">
                       {simGame.title}
                     </h4>
                   </Link>
                 ))}
               </div>
             ) : (
               <p className="text-center text-secondary text-sm">No similar games found.</p>
             )}
          </div>
        </div>

        {/* RIGHT COLUMN: Play Button (Sticky) */}
        <div className="relative">
          <div className="sticky top-24 bg-white p-6 rounded-2xl border border-secondary/20 shadow-xl text-center">
            <div className="mb-6">
              <span className="text-4xl">🎮</span>
              <p className="font-bold text-contrast mt-2">Ready to play?</p>
            </div>
            
            <button className="w-full bg-primary hover:bg-contrast text-white font-black text-xl py-4 rounded-xl transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2 mb-4">
              PLAY NOW
            </button>
            
            <div className="text-left space-y-3 text-sm text-secondary border-t border-secondary/10 pt-4">
              <div className="flex justify-between">
                <span>Rating:</span>
                <span className="font-bold text-primary">4.8 / 5</span>
              </div>
              <div className="flex justify-between">
                <span>Technology:</span>
                <span className="font-bold text-primary">HTML5</span>
              </div>
              <div className="flex justify-between">
                <span>Platform:</span>
                <span className="font-bold text-primary">Browser (PC/Mobile)</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default GameDetails;