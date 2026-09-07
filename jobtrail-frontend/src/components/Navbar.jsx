import { useAuth } from "../context/AuthContext";
import { LogOut, Compass } from "lucide-react";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 bg-brand-600 text-white rounded-xl flex items-center justify-center shadow-sm">
            <Compass size={20} />
          </div>
          <span className="font-bold text-slate-900 tracking-tight text-lg">JobTrail</span>
        </div>

        {user && (
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-slate-600 hidden sm:inline-block">
              {user.name}
            </span>
            <button
              onClick={logout}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-rose-600 hover:bg-rose-50 border border-slate-200 rounded-lg transition-colors"
            >
              <LogOut size={14} />
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}