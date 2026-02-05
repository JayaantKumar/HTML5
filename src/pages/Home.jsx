import { useGames } from "../hooks/useGames";
import SmartImage from "../components/ui/SmartImage";
import SkeletonCard from "../components/ui/SkeletonCard"; 
import { Link, useSearchParams } from "react-router-dom"; // Import useSearchParams
import { useMemo } from "react";

const Home = () => {
  const { games = [], loading } = useGames(50); // Fetch more games so we have enough to filter
  const [searchParams] = useSearchParams();
  
  // Get the category from URL (e.g. ?category=Racing)
  const categoryFilter = searchParams.get("category");

  // Filter Logic
  const filteredGames = useMemo(() => {
    if (!categoryFilter) return games;
    return games.filter(game => 
      game.tags?.some(tag => tag.toLowerCase() === categoryFilter.toLowerCase())
    );
  }, [games, categoryFilter]);

  const displayTitle = categoryFilter ? `${categoryFilter} Games` : "Featured Games";

  return (
    <div className="min-h-screen pb-20 bg-[#DDD0C8]">
      
      {/* Category Pills (Sticky) */}
      <section className="sticky top-20 z-30 bg-[#DDD0C8]/95 backdrop-blur-md py-4 border-b border-[#323232]/5 mb-8">
        <div className="max-w-[1600px] mx-auto px-4 md:px-8 xl:px-40">
          <div className="flex gap-3 overflow-x-auto hide-scroll pb-2">
            <Link to="/" className={`flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-full px-6 transition-transform active:scale-95 shadow-md ${!categoryFilter ? 'bg-[#323232] text-[#DDD0C8]' : 'bg-[#E8E2DC] text-[#323232]'}`}>
              <span className="text-lg">🎮</span>
              <span className="text-sm font-bold">All Games</span>
            </Link>
            {["Action", "Puzzle", "Strategy", "Sport", "Racing", "Girls", "Cards"].map(cat => (
              <Link 
                key={cat} 
                to={`/?category=${cat}`}
                className={`flex h-10 shrink-0 items-center justify-center rounded-full border border-[#323232]/10 px-6 hover:border-[#323232] hover:bg-[#323232] hover:text-[#DDD0C8] transition-colors shadow-sm font-bold text-sm ${categoryFilter === cat ? 'bg-[#323232] text-[#DDD0C8]' : 'bg-[#E8E2DC] text-[#323232]'}`}
              >
                {cat}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Main Grid */}
      <div className="max-w-[1600px] mx-auto px-4 md:px-8 xl:px-40">
        <div className="flex items-center gap-3 mb-8">
          <span className="w-1.5 h-8 bg-[#323232] rounded-full"></span>
          <h2 className="text-2xl md:text-3xl font-black text-[#323232]">{displayTitle}</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {loading ? (
            Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)
          ) : (
            filteredGames.length > 0 ? (
              filteredGames.map((game) => (
                <Link 
                  key={game.id} 
                  to={`/game/${game.slug}`} 
                  className="group relative flex flex-col gap-3"
                >
                  <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-[#E8E2DC] shadow-sm border border-[#323232]/5">
                    <div className="h-full w-full transition-transform duration-500 group-hover:scale-105 opacity-90 group-hover:opacity-100">
                       <SmartImage src={game.bannerUrl} className="h-full w-full object-cover" />
                    </div>
                    <div className="absolute top-3 right-3">
                      <span className="px-2 py-1 bg-[#323232] text-[#DDD0C8] text-xs font-bold rounded flex items-center gap-1 shadow-lg">
                        ★ 4.8
                      </span>
                    </div>
                  </div>
                  <div className="px-1">
                    <h3 className="font-bold text-lg text-[#323232] group-hover:underline decoration-2 underline-offset-4 truncate">
                      {game.title}
                    </h3>
                    <div className="flex items-center justify-between mt-1">
                      <p className="text-xs font-bold uppercase text-[#323232]/60">
                        {game.tags?.[0] || "Arcade"}
                      </p>
                      <span className="text-xs font-bold text-[#323232] border border-[#323232]/20 px-2 py-0.5 rounded hover:bg-[#323232] hover:text-[#DDD0C8] transition-colors">
                         PLAY
                      </span>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
               <div className="col-span-full py-20 text-center">
                 <p className="text-xl font-bold text-[#323232]">No games found in this category.</p>
                 <Link to="/" className="text-[#323232] underline mt-2 inline-block">View All Games</Link>
               </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;