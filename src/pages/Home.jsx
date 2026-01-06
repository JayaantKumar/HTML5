import { useGames } from "../hooks/useGames";
import SmartImage from "../components/ui/SmartImage";
import SkeletonCard from "../components/ui/SkeletonCard"; 
import { Link } from "react-router-dom";

const Home = () => {
  const { games = [], loading } = useGames(20);

  return (
    <div className="min-h-screen pb-20">
      
      {/* Category Pills (Sticky) */}
      <section className="sticky top-20 z-30 bg-[#FEFAE0]/95 backdrop-blur-md py-4 border-b border-secondary/10 mb-8">
        <div className="max-w-[1600px] mx-auto px-4 md:px-8 xl:px-40">
          <div className="flex gap-3 overflow-x-auto hide-scroll pb-2">
            <button className="flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-full bg-primary text-white px-6 transition-transform active:scale-95 shadow-lg shadow-primary/20">
              <span className="text-lg">🎮</span>
              <span className="text-sm font-bold">All Games</span>
            </button>
            {["Action", "Puzzle", "Strategy", "Sports", "Racing"].map(cat => (
              <button key={cat} className="flex h-10 shrink-0 items-center justify-center rounded-full bg-white border border-secondary px-6 hover:border-primary hover:text-primary text-contrast transition-colors shadow-sm font-medium">
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Grid */}
      <div className="max-w-[1600px] mx-auto px-4 md:px-8 xl:px-40">
        
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <span className="w-1.5 h-8 bg-primary rounded-full"></span>
            <h2 className="text-2xl md:text-3xl font-bold text-contrast">Featured Games</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          
          {loading ? (
            Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)
          ) : (
            games.map((game) => (
              <Link 
                key={game.id} 
                to={`/game/${game.slug}`} 
                className="group relative flex flex-col gap-3"
              >
                {/* Image Container */}
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-secondary shadow-sm">
                  <div className="h-full w-full transition-transform duration-500 group-hover:scale-110">
                     <SmartImage src={game.bannerUrl} className="h-full w-full object-cover" />
                  </div>
                  
                  {/* Overlay Play Button */}
                  <div className="absolute inset-0 bg-contrast/0 group-hover:bg-contrast/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <div className="size-14 rounded-full bg-primary text-white flex items-center justify-center shadow-lg transform scale-50 group-hover:scale-100 transition-transform duration-300">
                       <span className="text-3xl ml-1">▶</span>
                    </div>
                  </div>

                  {/* Rating Badge */}
                  <div className="absolute top-3 right-3">
                    <span className="px-2 py-1 bg-contrast/80 backdrop-blur-md text-white text-xs font-bold rounded-lg flex items-center gap-1 shadow-lg">
                      <span className="text-yellow-400">★</span> 4.8
                    </span>
                  </div>
                </div>

                {/* Text Info */}
                <div className="px-1">
                  <h3 className="font-bold text-lg text-contrast group-hover:text-primary transition-colors truncate">
                    {game.title}
                  </h3>
                  <div className="flex items-center justify-between mt-1">
                    <p className="text-sm text-primary/80 font-medium">
                      {game.tags?.[0] || "Arcade"} • Casual
                    </p>
                    <span className="text-xs text-secondary bg-white px-2 py-0.5 rounded border border-secondary/30">
                       PLAY
                    </span>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;