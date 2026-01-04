import { useEffect, useState } from "react";
import { db } from "../../firebase";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

const Dashboard = () => {
  const [games, setGames] = useState([]);
  const { logout } = useAuth();
  const navigate = useNavigate();

  // FIX: fetchGames is now defined INSIDE the useEffect
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
  }, []); // Empty dependency array = runs once on mount

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure? This cannot be undone.")) {
      try {
        await deleteDoc(doc(db, "games", id));
        // Manually filter the state to remove the deleted item (faster than re-fetching)
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
    <div className="min-h-screen bg-[#0f172a] p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8 bg-slate-800 p-6 rounded-xl border border-slate-700">
          <div>
            <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
            <p className="text-slate-400 text-sm">Manage your games and projects</p>
          </div>
          <div className="flex gap-4">
             <Link to="/admin/add" className="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded font-bold text-sm">
               + Add New Game
             </Link>
             <button onClick={handleLogout} className="bg-red-600/20 text-red-400 border border-red-600/50 px-4 py-2 rounded text-sm hover:bg-red-600 hover:text-white transition">
               Logout
             </button>
          </div>
        </div>

        {/* Content Table */}
        <div className="bg-slate-800 rounded-xl overflow-hidden border border-slate-700">
          <table className="w-full text-left">
            <thead className="bg-slate-900 text-slate-400 uppercase text-xs">
              <tr>
                <th className="p-4">Title</th>
                <th className="p-4">Type</th>
                <th className="p-4">Visible</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700 text-slate-300">
              {games.map(game => (
                <tr key={game.id} className="hover:bg-slate-700/50 transition">
                  <td className="p-4 font-medium">{game.title}</td>
                  <td className="p-4">
                    <span className="bg-slate-900 px-2 py-1 rounded text-xs border border-slate-600">
                      {game.type || 'game'}
                    </span>
                  </td>
                  <td className="p-4">
                    {game.isVisible ? (
                      <span className="text-green-400 text-xs font-bold">● Live</span>
                    ) : (
                      <span className="text-slate-500 text-xs">○ Hidden</span>
                    )}
                  </td>
                  <td className="p-4 text-right space-x-2">
                    <button 
                      onClick={() => handleDelete(game.id)}
                      className="text-red-400 hover:text-red-300 text-sm font-medium"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {games.length === 0 && (
             <div className="p-8 text-center text-slate-500">No content found.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;