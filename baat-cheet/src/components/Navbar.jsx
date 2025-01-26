import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { LogOut, MessageSquare, User } from "lucide-react";
import Settings from "../pages/Settings";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();

  return (
    <header className="fixed w-full top-0 z-40 border-b border-slate-800/50 backdrop-blur-xl bg-slate-900/70">
      <div className="container mx-auto px-4 h-16">
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center gap-8">
            <Link
              to="/"
              className="flex items-center gap-2.5 hover:opacity-90 transition-all group"
            >
              <div className="size-9 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-900/20 flex items-center justify-center group-hover:from-cyan-500/30 group-hover:to-blue-900/30">
                <MessageSquare className="w-5 h-5 text-cyan-400" />
              </div>
              <h1 className="text-lg font-bold bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
                Baat Cheet
              </h1>
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to={"/settings"}
              className="btn btn-sm gap-2 bg-slate-800/50 border-slate-700/50 hover:bg-slate-800 text-slate-300 hover:text-slate-200"
            >
              <span className="hidden sm:inline">Settings</span>
            </Link>

            {authUser && (
              <>
                <Link
                  to={"/profile"}
                  className="btn btn-sm gap-2 bg-slate-800/50 border-slate-700/50 hover:bg-slate-800 text-slate-300 hover:text-slate-200"
                >
                  <User className="size-4" />
                  <span className="hidden sm:inline">Profile</span>
                </Link>

                <button
                  onClick={logout}
                  className="btn btn-sm gap-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 border-red-500/20"
                >
                  <LogOut className="size-4" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
