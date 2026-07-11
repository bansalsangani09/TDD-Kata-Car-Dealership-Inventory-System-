import { Link, useNavigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Navbar = () => {
  const { user, isAdmin, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const isActive = (path) => location.pathname === path;

  if (!isAuthenticated) return null;

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-slate-900/80 border-b border-slate-700/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            to="/dashboard"
            className="flex items-center gap-3 group"
          >
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center shadow-lg shadow-cyan-500/20 group-hover:shadow-cyan-500/40 transition-shadow">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10m10 0H3m10 0h2m4 0a1 1 0 001-1v-5a1 1 0 00-.293-.707l-3-3A1 1 0 0016.414 6H14" />
              </svg>
            </div>
            <span className="text-lg font-bold bg-gradient-to-r from-cyan-300 to-purple-400 bg-clip-text text-transparent hidden sm:block">
              AutoVault
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-2">
            <Link
              to="/dashboard"
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                isActive("/dashboard")
                  ? "bg-cyan-500/10 text-cyan-400 shadow-inner"
                  : "text-slate-400 hover:text-white hover:bg-slate-800"
              }`}
            >
              Inventory
            </Link>

            {isAdmin && (
              <Link
                to="/admin"
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive("/admin")
                    ? "bg-purple-500/10 text-purple-400 shadow-inner"
                    : "text-slate-400 hover:text-white hover:bg-slate-800"
                }`}
              >
                Admin Panel
              </Link>
            )}

            {/* User Badge & Logout */}
            <div className="flex items-center gap-3 ml-4 pl-4 border-l border-slate-700/50">
              <div className="hidden sm:flex flex-col items-end">
                <span className="text-xs font-medium text-slate-300">
                  {user?.name}
                </span>
                <span
                  className={`text-[10px] font-semibold uppercase tracking-wider ${
                    isAdmin ? "text-purple-400" : "text-cyan-400"
                  }`}
                >
                  {user?.role}
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200 cursor-pointer"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
