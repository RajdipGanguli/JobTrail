const CONFIG = {
  wishlist: { label: "Wishlist", class: "bg-slate-100 text-slate-700 border-slate-200" },
  applied: { label: "Applied", class: "bg-blue-50 text-blue-700 border-blue-200" },
  oa: { label: "Online Assessment", class: "bg-amber-50 text-amber-700 border-amber-200" },
  interview: { label: "Interview", class: "bg-purple-50 text-purple-700 border-purple-200" },
  offer: { label: "Offer", class: "bg-emerald-50 text-emerald-700 border-emerald-200" },
  rejected: { label: "Rejected", class: "bg-rose-50 text-rose-700 border-rose-200" },
};

export default function StatusBadge({ status }) {
  const item = CONFIG[status] || CONFIG.wishlist;
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${item.class}`}
    >
      {item.label}
    </span>
  );
}