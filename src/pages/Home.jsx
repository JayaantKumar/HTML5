import { useGames } from "../hooks/useGames";
import SmartImage from "../components/ui/SmartImage";
import SkeletonCard from "../components/ui/SkeletonCard"; 
import { Link } from "react-router-dom";

const Home = () => {
  const { games = [], loading } = useGames(20) || {}; // Fetch more games for the grid

  return (
    <div className="min-h-screen bg-white pb-20 pt-8"> {/* White background like the site */}
      
      {/* Title Section */}
      <div className="text-center mb-10">
        <h2 className="text-[#005c74] text-4xl font-extrabold uppercase tracking-wide">
          All Games
        </h2>
        <div className="h-1 w-20 bg-[#005c74] mx-auto mt-2 rounded-full"></div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          
          {loading ? (
            Array.from({ length: 12 }).map((_, i) => <SkeletonCard key={i} />)
          ) : (
            games.length > 0 ? (
              games.map((game) => (
                <Link 
                  key={game.id} 
                  to={`/game/${game.slug}`} 
                  className="group flex flex-col items-center"
                >
                  {/* Card Container */}
                  <div className="relative w-full aspect-square rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    <SmartImage 
                      src={game.bannerUrl} 
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" 
                    />
                    
                    {/* Hover Overlay (Play Button) */}
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition flex items-center justify-center opacity-0 group-hover:opacity-100">
                       <div className="w-12 h-12 bg-[#f05a28] rounded-full flex items-center justify-center text-white shadow-lg">
                         ▶
                       </div>
                    </div>
                  </div>

                  {/* Title Below Card */}
                  <h3 className="mt-3 text-[#005c74] font-bold text-sm text-center line-clamp-1 group-hover:text-[#f05a28] transition">
                    {game.title}
                  </h3>
                </Link>
              ))
            ) : (
              <div className="col-span-full text-center text-gray-400 py-20">
                No games found. Seed the database to see content.
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;