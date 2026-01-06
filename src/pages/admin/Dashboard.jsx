import { useEffect, useState } from "react";
import { db } from "../../firebase";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

const Dashboard = () => {
  const [games, setGames] = useState([]);
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "games"));
        const list = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setGames(list);
      } catch (error) {
        console.error("Error fetching games:", error);
      }
    };
    fetchGames();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure? This cannot be undone.")) {
      try {
        await deleteDoc(doc(db, "games", id));
        setGames(prevGames => prevGames.filter(game => game.id !== id));
      } catch (error) {
        alert("Error deleting game: " + error.message);
      }
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-[#FEFAE0] p-8 pb-20">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 bg-white p-6 rounded-2xl border border-secondary/20 shadow-sm">
          <div>
            <h1 className="text-3xl font-black text-contrast">Dashboard</h1>
            <p className="text-primary font-medium mt-1">Manage your game library</p>
          </div>
          <div className="flex gap-4 mt-4 md:mt-0">
             <Link 
               to="/admin/add" 
               className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-xl font-bold text-sm shadow-lg shadow-primary/20 transition-transform active:scale-95 flex items-center gap-2"
             >
               <span>+</span> Add Game
             </Link>
             <button 
               onClick={handleLogout} 
               className="border-2 border-red-100 text-red-500 bg-red-50 hover:bg-red-100 px-6 py-3 rounded-xl text-sm font-bold transition-colors"
             >
               Logout
             </button>
          </div>
        </div>

        {/* Content Table */}
        <div className="bg-white rounded-2xl overflow-hidden border border-secondary/20 shadow-lg">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-contrast text-[#FEFAE0] uppercase text-xs tracking-wider">
                <tr>
                  <th className="p-5 font-bold">Title</th>
                  <th className="p-5 font-bold">Type</th>
                  <th className="p-5 font-bold">Status</th>
                  <th className="p-5 font-bold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-secondary/10">
                {games.map(game => (
                  <tr key={game.id} className="hover:bg-primary/5 transition-colors">
                    <td className="p-5">
                      <div className="font-bold text-contrast text-lg">{game.title}</div>
                      <div className="text-xs text-secondary font-mono mt-1">{game.slug}</div>
                    </td>
                    <td className="p-5">
                      <span className="bg-secondary/20 text-contrast px-3 py-1 rounded-full text-xs font-bold uppercase border border-secondary/30">
                        {game.type || 'game'}
                      </span>
                    </td>
                    <td className="p-5">
                      {game.isVisible ? (
                        <span className="inline-flex items-center gap-1.5 text-green-600 text-xs font-bold bg-green-50 px-2 py-1 rounded border border-green-100">
                          <span className="size-2 bg-green-500 rounded-full animate-pulse"></span> Live
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 text-gray-400 text-xs font-bold bg-gray-50 px-2 py-1 rounded border border-gray-100">
                          <span className="size-2 bg-gray-400 rounded-full"></span> Hidden
                        </span>
                      )}
                    </td>
                    <td className="p-5 text-right">
                      <button 
                        onClick={() => handleDelete(game.id)}
                        className="text-red-400 hover:text-red-600 text-sm font-bold hover:underline"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {games.length === 0 && (
             <div className="p-12 text-center text-secondary">
               No games found. Start by adding one!
             </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;