import { TrendingUp, Bell } from "lucide-react";
import Modal from "./common/Modal";

export default function InfoModal({
  isOpen,
  onClose,
  title = "Salary Insights",
  message,
  badge = "Coming Soon",
}) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      subtitle="Market Intelligence & Compensation Analytics"
      icon={TrendingUp}
      badge={badge}
      maxWidth="max-w-md"
      footer={
        <>
          <span className="text-xs text-slate-400 font-medium">JobTrail Beta</span>
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
      <div className="space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
        <p>
          {message ||
            "We're developing aggregated compensation benchmarks, leveling guides, and negotiation tactics directly into your pipeline. You will soon be able to compare your offers against real market data across remote and on-site roles."}
        </p>

        <div className="p-3.5 rounded-2xl bg-indigo-50/70 border border-indigo-100 text-xs text-indigo-900 flex items-start gap-2.5">
          <Bell className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
          <span>
            All registered JobTrail members will receive early access to the Salary Intelligence module as soon as beta calibration concludes.
          </span>
        </div>
      </div>
    </Modal>
  );
}
