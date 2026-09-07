import { Keyboard, Command } from "lucide-react";
import Modal from "./common/Modal";

const SHORTCUTS = [
  {
    keys: ["⌘K", "Ctrl+K"],
    title: "Global Search",
    description: "Instantly focus search to filter pipeline by role, company, or tech stack",
  },
  {
    keys: ["N"],
    title: "New Application",
    description: "Trigger the application creation modal from anywhere on the dashboard",
  },
  {
    keys: ["Esc"],
    title: "Close Modal / Cancel",
    description: "Dismiss any active modal, popover, or dropdown menu without saving",
  },
  {
    keys: ["Tab"],
    title: "Cycle Filters / Fields",
    description: "Quickly navigate through pipeline stage pills and form inputs",
  },
  {
    keys: ["Enter"],
    title: "Submit / Save",
    description: "Save application details, update status, or confirm actions",
  },
];

export default function ShortcutsModal({ isOpen, onClose }) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Keyboard Shortcuts"
      subtitle="Speed up your pipeline management with keyboard-first navigation"
      icon={Keyboard}
      badge="Cheat Sheet"
      maxWidth="max-w-lg"
      footer={
        <>
          <span className="text-xs text-slate-400">
            Press <kbd className="font-mono bg-white px-1.5 py-0.5 rounded border border-slate-200 text-[11px]">Esc</kbd> anytime to exit
          </span>
          <button
            type="button"
            onClick={onClose}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs sm:text-sm px-5 py-2.5 rounded-xl shadow-sm shadow-indigo-200 hover:shadow transition-all cursor-pointer"
          >
            Got it
          </button>
        </>
      }
    >
      <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-1">
        {SHORTCUTS.map((sc, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-100 hover:bg-indigo-50/50 hover:border-indigo-100 transition-colors gap-3"
          >
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-slate-800">
                {sc.title}
              </h4>
              <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5 leading-normal">
                {sc.description}
              </p>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              {sc.keys.map((key, keyIdx) => (
                <kbd
                  key={keyIdx}
                  className="font-mono text-xs font-semibold px-2.5 py-1 bg-white border border-slate-200 rounded-lg text-slate-700 shadow-2xs"
                >
                  {key}
                </kbd>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Modal>
  );
}
