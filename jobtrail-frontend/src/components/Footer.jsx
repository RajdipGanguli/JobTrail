import { useState } from "react";
import ShortcutsModal from "./ShortcutsModal";
import InfoModal from "./InfoModal";

export default function Footer({ version = "v1.0.0" }) {
  const [shortcutsOpen, setShortcutsOpen] = useState(false);
  const [docsOpen, setDocsOpen] = useState(false);

  return (
    <>
      <footer className="border-t border-slate-200 py-4 px-6 text-xs text-slate-400 flex justify-between items-center bg-white/60 backdrop-blur-xs">
        <div className="flex items-center gap-2.5">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="font-medium text-slate-600">
            JobTrail <span className="text-slate-300 mx-1">•</span> All systems operational
          </span>
        </div>

        <div className="flex items-center gap-4 sm:gap-6">
          <button
            type="button"
            onClick={() => setDocsOpen(true)}
            className="hover:text-indigo-600 transition-colors cursor-pointer"
          >
            Docs
          </button>
          <button
            type="button"
            onClick={() => setShortcutsOpen(true)}
            className="hover:text-indigo-600 transition-colors cursor-pointer"
          >
            Shortcuts
          </button>
          <span className="font-mono bg-slate-100 text-slate-500 px-2 py-0.5 rounded text-[11px] border border-slate-200/80 font-medium">
            {version}
          </span>
        </div>
      </footer>

      <ShortcutsModal isOpen={shortcutsOpen} onClose={() => setShortcutsOpen(false)} />

      {/* Docs Modal */}
      <InfoModal
        isOpen={docsOpen}
        onClose={() => setDocsOpen(false)}
        title="JobTrail Documentation"
        badge="Guide"
        message="Welcome to the JobTrail user guide. Use the Application Pipeline to log target jobs, track stages (Wishlist, Applied, Assessment, Interview, Offer, Rejected), record salary ranges, and store interview notes. Press ⌘K or Ctrl+K anywhere to activate global search."
      />
    </>
  );
}
