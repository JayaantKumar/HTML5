import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate("/admin");
    } catch (err) {
      setError("Failed to log in: " + err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FEFAE0] p-4">
      <div className="bg-white p-8 rounded-2xl border-2 border-secondary/20 shadow-xl w-full max-w-md">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center size-12 rounded-full bg-primary/10 text-primary mb-4">
            <svg className="size-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h2 className="text-2xl font-black text-contrast">Admin Access</h2>
          <p className="text-primary/80 text-sm mt-1">Enter your credentials to manage games.</p>
        </div>

        {error && <p className="bg-red-50 text-red-600 border border-red-100 p-3 rounded-lg mb-6 text-sm font-medium text-center">{error}</p>}
        
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-bold text-contrast mb-1.5">Email</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white border-2 border-secondary/30 rounded-xl p-3 text-contrast focus:border-primary focus:ring-0 outline-none transition-colors font-medium"
              placeholder="admin@arcadehub.com"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-contrast mb-1.5">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white border-2 border-secondary/30 rounded-xl p-3 text-contrast focus:border-primary focus:ring-0 outline-none transition-colors font-medium"
              placeholder="••••••••"
            />
          </div>
          <button type="submit" className="w-full bg-primary hover:bg-contrast text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-primary/20 active:scale-95">
            Enter Dashboard
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;