import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import Home from "./pages/Home";
import Portfolio from "./pages/Portfolio";
import GameDetails from "./pages/GameDetails";
import ProjectDetails from "./pages/ProjectDetails";
import Login from "./pages/admin/Login";
import Dashboard from "./pages/admin/Dashboard";
import AddGame from "./pages/admin/AddGame";
import Footer from "./components/layout/Footer";
import Seeder from "./components/shared/Seeder";
import Contact from "./pages/Contact"; 
import Navbar from "./components/layout/Navbar";
import Sidebar from "./components/layout/Sidebar";

// 🔒 Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return null;
  if (!user) return <Navigate to="/login" replace />;
  return children;
};

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <BrowserRouter>
      {/* Updated Background to Beige (#DDD0C8) and Text to Dark Grey (#323232) */}
      <div className="bg-[#DDD0C8] min-h-screen font-sans flex flex-col text-[#323232]">
        
        <Navbar toggleSidebar={() => setIsSidebarOpen(true)} />
        <Sidebar isOpen={isSidebarOpen} closeSidebar={() => setIsSidebarOpen(false)} />

        <div className="flex-grow"> 
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/game/:slug" element={<GameDetails />} />
            <Route path="/project/:slug" element={<ProjectDetails />} />
            <Route path="/login" element={<Login />} />

            {/* Admin Protected Routes */}
            <Route path="/admin" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/admin/add" element={<ProtectedRoute><AddGame /></ProtectedRoute>} />
          </Routes>
        </div>

        <Footer />
        <Seeder /> 

      </div>
    </BrowserRouter>
  );
}

export default App;