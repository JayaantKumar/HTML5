import { useGames } from "../hooks/useGames";
import SmartImage from "../components/ui/SmartImage";
import { Link } from "react-router-dom";

const Home = () => {
  // 🛡️ Safety: Default to empty object if hook fails, default games to []
  const { games = [], loading } = useGames(8) || {}; 

  if (loading) return <div className="text-center p-20">Loading Games...</div>;

  return (
    <div className="min-h-screen p-8">
      <header className="mb-12">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          Our Games
        </h1>
        <p className="text-slate-400 mt-2">Latest releases and updates</p>
      </header>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {/* 🛡️ Safety Check: Ensure games is an array before mapping */}
        {Array.isArray(games) && games.length > 0 ? (
          games.map((game) => (
            <Link key={game.id} to={`/game/${game.slug}`} className="group relative block h-64 overflow-hidden rounded-xl bg-slate-800 transition-transform hover:-translate-y-2">
              <SmartImage 
                src={game.bannerUrl} 
                className="h-full w-full opacity-90 transition-opacity group-hover:opacity-100" 
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent p-4 flex flex-col justify-end">
                <h3 className="font-bold text-lg text-white">{game.title}</h3>
                <div className="flex gap-2 mt-2">
                  {game.tags?.map(tag => (
                    <span key={tag} className="text-xs px-2 py-1 bg-white/10 rounded-full backdrop-blur-sm">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="col-span-full text-center text-slate-500 py-10">
            {/* This shows if database is empty or connection failed */}
            <p>No games found. Click the [DEV] Seed button to add data.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;