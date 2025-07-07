
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { User, Home, LogIn, LogOut } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const { isAuthenticated, logout, principal } = useAuth();
  const isActive = (path: string) => location.pathname === path;

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">S</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                SkillPort
              </span>
            </Link>

            <div className="flex items-center space-x-6">
              <Link
                to="/"
                className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors ${
                  isActive("/")
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
                }`}
              >
                <Home size={18} />
                <span className="hidden sm:inline">Home</span>
              </Link>

              {isAuthenticated ? (
                <>
                  <Link
                    to="/dashboard"
                    className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors ${
                      isActive("/dashboard")
                        ? "bg-blue-100 text-blue-700"
                        : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
                    }`}
                  >
                    <User size={18} />
                    <span className="hidden sm:inline">Dashboard</span>
                  </Link>
                  
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-gray-500 hidden md:inline">
                      {principal?.slice(0, 8)}...
                    </span>
                    <button
                      onClick={handleLogout}
                      className="flex items-center space-x-1 px-3 py-2 rounded-lg text-gray-600 hover:text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <LogOut size={18} />
                      <span className="hidden sm:inline">Logout</span>
                    </button>
                  </div>
                </>
              ) : (
                <Link
                  to="/auth"
                  className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors ${
                    isActive("/auth")
                      ? "bg-blue-100 text-blue-700"
                      : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
                  }`}
                >
                  <LogIn size={18} />
                  <span className="hidden sm:inline">Login</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>

      <main>{children}</main>

      <footer className="bg-white border-t border-gray-200 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600">
            <p>&copy; 2024 SkillPort. Building the future of decentralized portfolios on ICP.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
