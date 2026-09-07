import { useState, useEffect, useRef } from "react";
import {
  Briefcase,
  Calendar,
  ExternalLink,
  Plus,
  Search,
  Building2,
  Clock,
  CheckCircle2,
  TrendingUp,
  Edit2,
  Trash2,
  Sparkles,
} from "lucide-react";

import Header from "../components/Header";
import Footer from "../components/Footer";
import ApplicationModal from "../components/ApplicationModal";
import api from "../api/axios";

const STATUS_CONFIG = {
  applied: { label: "Applied", bg: "bg-blue-50 text-blue-700 border-blue-200", dot: "bg-blue-500" },
  assessment: { label: "Assessment", bg: "bg-amber-50 text-amber-700 border-amber-200", dot: "bg-amber-500" },
  oa: { label: "Assessment", bg: "bg-amber-50 text-amber-700 border-amber-200", dot: "bg-amber-500" },
  interview: { label: "Interview", bg: "bg-purple-50 text-purple-700 border-purple-200", dot: "bg-purple-500" },
  offer: { label: "Offer", bg: "bg-emerald-50 text-emerald-700 border-emerald-200", dot: "bg-emerald-500" },
  wishlist: { label: "Wishlist", bg: "bg-slate-100 text-slate-700 border-slate-200", dot: "bg-slate-400" },
  rejected: { label: "Rejected", bg: "bg-rose-50 text-rose-700 border-rose-200", dot: "bg-rose-500" },
};

function getStatusBadge(status) {
  const key = (status || "applied").toLowerCase();
  return STATUS_CONFIG[key] || STATUS_CONFIG.applied;
}

export default function ModernDashboard({
  applications: propApps,
  onAdd,
  onEdit,
  onDelete,
}) {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [internalApps, setInternalApps] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingApp, setEditingApp] = useState(null);

  const searchInputRef = useRef(null);

  useEffect(() => {
    if (propApps) return;

    api
      .get("/applications")
      .then((res) => {
        if (Array.isArray(res.data)) {
          setInternalApps(res.data);
        }
      })
      .catch((err) => {
        console.error("Could not fetch applications:", err);
      });
  }, [propApps]);

  const apps = propApps || internalApps;

  const handleAdd = () => {
    if (onAdd) {
      onAdd();
      return;
    }
    setEditingApp(null);
    setIsModalOpen(true);
  };

  const handleEdit = (app) => {
    if (onEdit) {
      onEdit(app);
      return;
    }
    setEditingApp(app);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (onDelete) {
      onDelete(id);
      return;
    }

    try {
      await api.delete(`/applications/${id}`);
      setInternalApps((prev) => prev.filter((app) => app._id !== id));
    } catch (err) {
      console.error("Could not delete application:", err);
    }
  };

  const handleSaveModal = async (form, id) => {
    try {
      if (id) {
        const { data } = await api.put(`/applications/${id}`, form);
        setInternalApps((prev) =>
          prev.map((item) => (item._id === id ? data : item))
        );
      } else {
        const { data } = await api.post("/applications", form);
        setInternalApps((prev) => [data, ...prev]);
      }
      setIsModalOpen(false);
      setEditingApp(null);
    } catch (err) {
      console.error("Could not save application:", err);
    }
  };

  const stats = [
    {
      label: "Total Applications",
      value: apps.length,
      icon: Briefcase,
      color: "bg-blue-50 text-blue-600",
    },
    {
      label: "In Interviews",
      value: apps.filter((a) => (a.status || "").toLowerCase() === "interview").length,
      icon: Clock,
      color: "bg-purple-50 text-purple-600",
    },
    {
      label: "Offers Received",
      value: apps.filter((a) => (a.status || "").toLowerCase() === "offer").length,
      icon: CheckCircle2,
      color: "bg-emerald-50 text-emerald-600",
    },
    {
      label: "Response Rate",
      value: apps.length
        ? `${Math.round(
            (apps.filter((a) => (a.status || "").toLowerCase() !== "applied").length /
              apps.length) *
              100
          )}%`
        : "0%",
      icon: TrendingUp,
      color: "bg-amber-50 text-amber-600",
    },
  ];

  const filteredApps = apps.filter((app) => {
    const appStatus = (app.status || "").toLowerCase();
    const filterKey = filter.toLowerCase();

    const matchesFilter =
      filter === "All" ||
      appStatus === filterKey ||
      (filterKey === "assessment" && appStatus === "oa");

    const roleName = app.roleTitle || app.role || "";
    const companyName = app.companyName || app.company || "";

    const matchesSearch =
      roleName.toLowerCase().includes(search.toLowerCase()) ||
      companyName.toLowerCase().includes(search.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50/50 flex flex-col justify-between">
      <div>
        <Header
          quickStats={apps.length > 0 ? `${apps.length} Active` : "Pipeline Active"}
          onSearchClick={() => searchInputRef.current?.focus()}
        />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
                Application Pipeline <Sparkles className="w-5 h-5 text-indigo-500" />
              </h1>
              <p className="text-sm text-slate-500 mt-1">
                Manage your career pipeline, track stages, and monitor interview conversions.
              </p>
            </div>
            <button
              onClick={handleAdd}
              className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-4 py-2.5 rounded-xl shadow-sm shadow-indigo-200 transition-all hover:shadow hover:-translate-y-0.5 active:translate-y-0 text-sm cursor-pointer"
            >
              <Plus className="w-4 h-4" /> New Application
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="bg-white/80 backdrop-blur-xs border border-slate-200/80 rounded-2xl p-5 shadow-xs hover:-translate-y-1 hover:shadow-lg hover:shadow-indigo-100/50 transition-all duration-300 ease-out flex items-center gap-4"
              >
                <div className={`rounded-xl p-2.5 ${stat.color} shrink-0`}>
                  <stat.icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    {stat.label}
                  </p>
                  <p className="text-2xl font-bold text-slate-900 mt-0.5 tracking-tight">
                    {stat.value}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col md:flex-row gap-3 items-center justify-between bg-white/80 backdrop-blur-xs p-2.5 rounded-2xl border border-slate-200/80 shadow-xs">
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              <input
                id="dashboard-search-input"
                ref={searchInputRef}
                type="text"
                placeholder="Filter by role or company... (⌘K)"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200/70 rounded-xl pl-9 pr-4 py-2 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:bg-white transition-all"
              />
            </div>

            <div className="flex flex-wrap gap-1 p-1 bg-slate-100/80 rounded-xl border border-slate-200/60 w-full md:w-auto overflow-x-auto">
              {["All", "Applied", "Assessment", "Interview", "Offer", "Wishlist", "Rejected"].map(
                (status) => {
                  const isActive = filter === status;
                  return (
                    <button
                      key={status}
                      type="button"
                      onClick={() => setFilter(status)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 cursor-pointer whitespace-nowrap ${
                        isActive
                          ? "bg-white text-slate-900 font-semibold shadow-xs"
                          : "text-slate-600 hover:text-slate-900 hover:bg-white/50"
                      }`}
                    >
                      {status}
                    </button>
                  );
                }
              )}
            </div>
          </div>

          {filteredApps.length === 0 ? (
            <div className="text-center py-16 px-6 bg-white/80 backdrop-blur-xs border border-slate-200/80 rounded-3xl shadow-xs max-w-xl mx-auto my-6">
              <div className="relative flex items-center justify-center w-20 h-20 mx-auto mb-5">
                <span className="animate-ping absolute inline-flex h-16 w-16 rounded-full bg-indigo-400/25 opacity-75" />
                <span className="absolute inline-flex h-16 w-16 rounded-full bg-indigo-50 border border-indigo-100/80 shadow-xs" />
                <div className="relative w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 via-indigo-600 to-purple-600 text-white flex items-center justify-center shadow-md shadow-indigo-200/60">
                  <Briefcase className="w-6 h-6" />
                </div>
              </div>

              <h3 className="text-xl font-bold text-slate-900 tracking-tight">
                {search || filter !== "All"
                  ? "No matching applications"
                  : "No applications found"}
              </h3>
              <p className="text-sm text-slate-500 mt-2 max-w-md mx-auto leading-relaxed">
                {search || filter !== "All"
                  ? "We couldn't find any applications matching your active search or filters. Try adjusting your search query or reset your filters."
                  : "Get started by adding your first job target to the pipeline and tracking your interview progress."}
              </p>

              <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                {(search || filter !== "All") && (
                  <button
                    type="button"
                    onClick={() => {
                      setSearch("");
                      setFilter("All");
                    }}
                    className="inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200/80 text-slate-700 font-medium px-4 py-2.5 rounded-xl transition-all text-sm cursor-pointer"
                  >
                    Clear Filters
                  </button>
                )}
                <button
                  type="button"
                  onClick={handleAdd}
                  className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-4 py-2.5 rounded-xl shadow-sm shadow-indigo-200 transition-all hover:shadow hover:-translate-y-0.5 active:translate-y-0 text-sm cursor-pointer"
                >
                  <Plus className="w-4 h-4" /> + Add Your First Application
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredApps.map((app) => {
                const statusBadge = getStatusBadge(app.status);
                const role = app.roleTitle || app.role || "Untitled Role";
                const company = app.companyName || app.company || "Unknown Company";
                const jobUrl = app.jobPostingUrl || app.jobUrl;

                return (
                  <div
                    key={app._id || `${role}-${company}`}
                    className="group bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs hover:shadow-md hover:border-indigo-100 transition-all duration-200 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div>
                          <h3 className="font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors">
                            {role}
                          </h3>
                          <div className="flex items-center gap-1.5 text-sm text-slate-500 mt-0.5">
                            <Building2 className="w-3.5 h-3.5" />
                            <span>{company}</span>
                          </div>
                        </div>
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${statusBadge.bg}`}
                        >
                          <span className={`w-1.5 h-1.5 rounded-full ${statusBadge.dot}`} />
                          {statusBadge.label}
                        </span>
                      </div>

                      {app.notes && (
                        <p className="mt-2.5 text-xs text-slate-600 line-clamp-2 leading-relaxed bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                          {app.notes}
                        </p>
                      )}

                      <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 mt-4">
                        {app.location && (
                          <span className="bg-slate-50 px-2 py-0.5 rounded-md border border-slate-100 text-slate-500">
                            {app.location}
                          </span>
                        )}
                        {app.salary && (
                          <span className="bg-slate-50 px-2 py-0.5 rounded-md border border-slate-100 text-slate-500 font-medium">
                            {app.salary}
                          </span>
                        )}
                        <span className="flex items-center gap-1 ml-auto">
                          <Calendar className="w-3 h-3" />
                          {app.createdAt
                            ? new Date(app.createdAt).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                              })
                            : "Recently"}
                        </span>
                      </div>
                    </div>

                    <div className="mt-5 pt-3.5 border-t border-slate-100 flex items-center justify-between text-xs">
                      {jobUrl ? (
                        <a
                          href={jobUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 text-indigo-600 hover:text-indigo-700 font-medium"
                        >
                          Job Posting <ExternalLink className="w-3 h-3" />
                        </a>
                      ) : (
                        <span className="text-slate-400 italic">No link attached</span>
                      )}

                      <div className="flex items-center gap-1 opacity-80 group-hover:opacity-100 transition">
                        <button
                          onClick={() => handleEdit(app)}
                          className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition cursor-pointer"
                          title="Edit Application"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(app._id)}
                          className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition cursor-pointer"
                          title="Delete Application"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </main>
      </div>

      <Footer />

      <ApplicationModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingApp(null);
        }}
        onSave={handleSaveModal}
        initialData={editingApp}
      />
    </div>
  );
}