import { motion } from "framer-motion";
import { Pencil, Trash2, ExternalLink, Calendar } from "lucide-react";
import StatusBadge from "./StatusBadge";

export default function ApplicationCard({ application, onEdit, onDelete }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.22, ease: "easeOut" }}
      className="group relative bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all hover:border-slate-300 flex flex-col justify-between"
    >
      <div>
        <div className="flex items-start justify-between gap-3 mb-2">
          <div className="min-w-0 flex-1">
            <h3 className="font-semibold text-slate-900 text-base leading-snug truncate group-hover:text-brand-600 transition-colors">
              {application.roleTitle}
            </h3>
            <p className="text-sm font-medium text-slate-500 truncate mt-0.5">
              {application.companyName}
            </p>
          </div>
          <StatusBadge status={application.status} />
        </div>

        {application.notes && (
          <p className="mt-3 text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed bg-slate-50 p-2.5 rounded-lg border border-slate-100">
            {application.notes}
          </p>
        )}
      </div>

      <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
        {application.jobPostingUrl ? (
          <a
            href={application.jobPostingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-medium text-brand-600 hover:text-brand-700 transition-colors"
          >
            Job link <ExternalLink size={12} />
          </a>
        ) : (
          <span>No link</span>
        )}

        <div className="flex items-center gap-1">
          <button
            onClick={() => onEdit(application)}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
            aria-label="Edit"
          >
            <Pencil size={14} />
          </button>
          <button
            onClick={() => onDelete(application._id)}
            className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
            aria-label="Delete"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}