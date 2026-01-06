import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const CATEGORIES = [
  { name: "Home", icon: "🏠" },
  { name: "New", icon: "🆕" },
  { name: "Best", icon: "👍" },
  { name: "Match 3", icon: "💎" },
  { name: "Bubble Shooter", icon: "🔵" },
  { name: "Puzzle", icon: "🧩" },
  { name: "Quiz", icon: "❓" },
  { name: "Cards", icon: "🃏" },
  { name: "Girls", icon: "🎀" },
  { name: "Jump & Run", icon: "🏃" },
  { name: "Arcade", icon: "🕹️" },
  { name: "Racing", icon: "🏎️" },
  { name: "Sport", icon: "⚽" },
];

const Sidebar = ({ isOpen, closeSidebar }) => {
  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div 
          onClick={closeSidebar}
          className="fixed inset-0 bg-black/50 z-40 transition-opacity"
        />
      )}

      {/* Drawer */}
      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: isOpen ? "0%" : "-100%" }}
        transition={{ type: "tween", duration: 0.3 }}
        className="fixed top-16 left-0 h-[calc(100vh-64px)] w-64 bg-[#f0f2f5] z-50 overflow-y-auto border-r border-gray-300 shadow-xl"
      >
        <div className="p-4 space-y-1">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.name}
              to="/"
              onClick={closeSidebar}
              className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-white hover:text-[#f05a28] hover:shadow-sm rounded-lg transition font-bold"
            >
              <span className="text-xl">{cat.icon}</span>
              <span>{cat.name}</span>
            </Link>
          ))}
          {/* Admin Link for you */}
          <div className="border-t border-gray-300 my-2 pt-2">
             <Link to="/admin" onClick={closeSidebar} className="flex items-center gap-3 px-4 py-3 text-gray-500 hover:text-cyan-600 font-bold text-sm">
                ⚙️ Admin Panel
             </Link>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Sidebar;