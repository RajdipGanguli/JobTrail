import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  Briefcase,
  Search,
  ChevronDown,
  LogOut,
} from "lucide-react";

export default function Header({
  quickStats = "Pipeline Active",
  onSearchClick,
}) {
  const { user, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on outside click or escape
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        setDropdownOpen(false);
      }
      // Keyboard shortcut ⌘K or Ctrl+K to trigger search
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        if (onSearchClick) {
          onSearchClick();
        } else {
          const searchInput = document.getElementById("dashboard-search-input");
          if (searchInput) {
            searchInput.focus();
          }
        }
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onSearchClick]);

  const handleSearchBadgeClick = () => {
    if (onSearchClick) {
      onSearchClick();
    } else {
      const searchInput = document.getElementById("dashboard-search-input");
      if (searchInput) {
        searchInput.focus();
      }
    }
  };

  const userInitial = user?.name ? user.name.trim().charAt(0).toUpperCase() : "U";

  return (
    <header className="backdrop-blur-md bg-white/80 border-b border-slate-200/80 sticky top-0 z-40 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        <Link
          to={"/"}
          className="flex items-center gap-2.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-xl py-1 px-1 -ml-1 transition-transform active:scale-95"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-sm shadow-indigo-200 group-hover:shadow group-hover:scale-105 transition-all">
            <Briefcase className="w-5 h-5 transition-transform group-hover:-rotate-6" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-700 bg-clip-text text-transparent">
              JobTrail
            </span>
          </div>
        </Link>

        <div className="flex items-center gap-2.5 sm:gap-3.5">
          <button
            type="button"
            onClick={handleSearchBadgeClick}
            title="Search applications (⌘K / Ctrl+K)"
            className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-slate-500 hover:text-slate-800 bg-slate-100 hover:bg-slate-200/70 border border-slate-200/80 rounded-xl transition-all shadow-2xs group cursor-pointer"
          >
            <Search className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-600 transition-colors" />
            <span className="font-sans text-[11px] text-slate-400">Search</span>
            <kbd className="font-mono text-[11px] bg-white border border-slate-200 px-1.5 py-0.5 rounded-md text-slate-600 shadow-2xs font-semibold">
              ⌘K
            </kbd>
          </button>

          {quickStats && (
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-indigo-50/80 text-indigo-700 border border-indigo-100/90 shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
              <span className="font-semibold">{quickStats}</span>
            </div>
          )}

          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setDropdownOpen((prev) => !prev)}
              aria-expanded={dropdownOpen}
              aria-haspopup="true"
              className="flex items-center gap-2 p-1 sm:px-2.5 sm:py-1.5 rounded-xl border border-transparent hover:border-slate-200 hover:bg-slate-100/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 transition-all cursor-pointer"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 via-indigo-600 to-purple-600 text-white font-semibold text-xs flex items-center justify-center shadow-xs ring-2 ring-white">
                {userInitial}
              </div>
              <div className="hidden md:flex flex-col text-left">
                <span className="text-xs font-semibold text-slate-800 leading-tight max-w-[110px] truncate">
                  {user?.name || "Account"}
                </span>
                <span className="text-[10px] text-slate-400 leading-tight max-w-[110px] truncate">
                  {user?.email || "Signed In"}
                </span>
              </div>
              <ChevronDown
                className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${
                  dropdownOpen ? "rotate-180 text-slate-600" : ""
                }`}
              />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-60 bg-white rounded-2xl shadow-xl border border-slate-200/80 py-1.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="px-4 py-3 border-b border-slate-100">
                  <p className="text-xs font-semibold text-slate-900 truncate">
                    {user?.name || "User"}
                  </p>
                  <p className="text-[11px] text-slate-500 truncate mt-0.5">
                    {user?.email || "No email available"}
                  </p>
                </div>

                <div className="py-1">
                  <div className="px-4 py-1.5 flex items-center justify-between text-xs text-slate-500">
                    <span>Role</span>
                    <span className="text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md font-medium text-[11px]">
                      Job Seeker
                    </span>
                  </div>
                </div>

                <div className="border-t border-slate-100 my-1" />

                <button
                  type="button"
                  onClick={() => {
                    setDropdownOpen(false);
                    logout();
                  }}
                  className="w-full px-4 py-2 text-left text-xs font-medium text-slate-700 hover:text-rose-600 hover:bg-rose-50 flex items-center gap-2.5 transition-colors cursor-pointer"
                >
                  <LogOut className="w-4 h-4 text-slate-400 group-hover:text-rose-500" />
                  <span>Log out</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
