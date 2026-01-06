import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const CATEGORIES = [
  { name: "All Games", icon: "🎮" },
  { name: "Action", icon: "⚔️" },
  { name: "Puzzle", icon: "🧩" },
  { name: "Strategy", icon: "♟️" },
  { name: "Racing", icon: "🏎️" },
  { name: "Sports", icon: "⚽" },
  { name: "Adventure", icon: "🗺️" },
];

const Sidebar = ({ isOpen, closeSidebar }) => {
  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div 
          onClick={closeSidebar}
          className="fixed inset-0 bg-contrast/20 backdrop-blur-sm z-40 transition-opacity"
        />
      )}

      {/* Drawer */}
      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: isOpen ? "0%" : "-100%" }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed top-20 left-0 h-[calc(100vh-80px)] w-64 bg-[#FEFAE0] z-50 overflow-y-auto border-r border-secondary/30 shadow-2xl"
      >
        <div className="p-6 space-y-2">
          <div className="text-xs font-bold text-secondary uppercase tracking-wider mb-4 px-2">Discover</div>
          
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.name}
              to="/"
              onClick={closeSidebar}
              className="flex items-center gap-3 px-4 py-3 text-contrast hover:bg-primary hover:text-white rounded-xl transition-all font-medium group"
            >
              <span className="text-lg group-hover:scale-110 transition-transform">{cat.icon}</span>
              <span>{cat.name}</span>
            </Link>
          ))}

          <div className="border-t border-secondary/20 my-4 pt-4">
             <Link to="/admin" onClick={closeSidebar} className="flex items-center gap-3 px-4 py-3 text-secondary hover:text-primary font-bold text-sm">
                ⚙️ Admin Dashboard
             </Link>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Sidebar;