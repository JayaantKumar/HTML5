import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import Home from "./pages/Home";
import Portfolio from "./pages/Portfolio";
import GameDetails from "./pages/GameDetails";
import ProjectDetails from "./pages/ProjectDetails";
import Login from "./pages/admin/Login";
import Dashboard from "./pages/admin/Dashboard";
import AddGame from "./pages/admin/AddGame"; // Import the new page
import Footer from "./components/layout/Footer";
import Seeder from "./components/shared/Seeder";

// 🔒 Protected Route Component
// If user is logged in, show the page. If not, redirect to Login.
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) return null; // Or a loading spinner
  if (!user) return <Navigate to="/login" replace />;
  
  return children;
};

function App() {
  // We need the user status to conditionally show the "Admin" link in the navbar
  const { user } = useAuth();

  return (
    <BrowserRouter>
      <div className="bg-[#0f172a] min-h-screen text-slate-100 font-sans selection:bg-cyan-500/30 flex flex-col">
        
        {/* Navbar */}
        <nav className="fixed top-0 w-full z-50 bg-[#0f172a]/80 backdrop-blur-md border-b border-slate-800 transition-all">
          <div className="max-w-7xl mx-auto px-6 h-16 flex justify-between items-center">
            <Link to="/" className="font-bold text-xl tracking-tighter hover:text-cyan-400 transition">
              GAME<span className="text-cyan-400">DEV</span>
            </Link>
            
            <div className="flex gap-8 text-sm font-medium text-slate-400 items-center">
               <Link to="/" className="hover:text-white transition-colors">Home</Link>
               <Link to="/portfolio" className="hover:text-white transition-colors">Portfolio</Link>
               
               {/* 👀 Only visible if you are logged in */}
               {user && (
                 <Link to="/admin" className="text-cyan-400 font-bold border border-cyan-500/30 px-3 py-1 rounded hover:bg-cyan-500/10 transition">
                   Admin Panel
                 </Link>
               )}
            </div>
          </div>
        </nav>

        {/* Main Content Area */}
        <div className="flex-grow pt-16"> 
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/game/:slug" element={<GameDetails />} />
            <Route path="/project/:slug" element={<ProjectDetails />} />
            <Route path="/login" element={<Login />} />

            {/* 🔐 Admin Protected Routes */}
            <Route 
              path="/admin" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
            {/* 👇 ADD THIS NEW ROUTE 👇 */}
            <Route 
              path="/admin/add" 
              element={
                <ProtectedRoute>
                  <AddGame />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </div>

        <Footer />
        
        {/* Helper tool (Remove this before deploying to production) */}
        <Seeder /> 

      </div>
    </BrowserRouter>
  );
}

export default App;
