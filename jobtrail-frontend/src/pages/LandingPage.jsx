import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Briefcase,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  BarChart3,
  Search,
  Check,
  Building2,
  Calendar,
  Clock,
  ExternalLink,
  Star,
  Lock,
  Layers,
  Award,
  ArrowUp,
} from "lucide-react";

import LegalModal from "../components/LegalModal";
import ShortcutsModal from "../components/ShortcutsModal";
import InfoModal from "../components/InfoModal";
import { useAuth } from "../context/AuthContext";
import { useScrollProgress } from "../hooks/useScrollProgress";

const FEATURES = [
  {
    icon: Layers,
    title: "Visual Pipeline Tracking",
    description: "Stage-based visibility across Wishlist, Applied, Assessment, Interview, and Offer with zero guesswork.",
    color: "bg-indigo-50 text-indigo-600",
  },
  {
    icon: BarChart3,
    title: "Conversion Analytics",
    description: "Real-time feedback on your interview response rates and pipeline velocity to calibrate your resume.",
    color: "bg-purple-50 text-purple-600",
  },
  {
    icon: Clock,
    title: "Interview Intelligence",
    description: "Attach notes, recruiter contact details, screening questions, and compensation figures right where they belong.",
    color: "bg-blue-50 text-blue-600",
  },
  {
    icon: Search,
    title: "Instant ⌘K Search",
    description: "Keyboard-first navigation lets you filter through dozens of roles and companies in milliseconds.",
    color: "bg-amber-50 text-amber-600",
  },
  {
    icon: ExternalLink,
    title: "Direct Posting Links",
    description: "Never lose the original job description. Launch straight back to the live posting with a single click.",
    color: "bg-emerald-50 text-emerald-600",
  },
  {
    icon: Lock,
    title: "100% Private & Secure",
    description: "Your target salaries and interview loops remain strictly confidential with JWT authenticated session security.",
    color: "bg-rose-50 text-rose-600",
  },
];

const WORKFLOW_STEPS = [
  {
    step: "01",
    title: "Wishlist",
    desc: "Save promising job posts and gather compensation & culture intel before drafting tailored applications.",
    icon: Sparkles,
  },
  {
    step: "02",
    title: "Applied",
    desc: "Log submission dates, referral sources, and track when follow-up messages are due.",
    icon: Calendar,
  },
  {
    step: "03",
    title: "Interview",
    desc: "Store round schedules, questions asked, and prep notes for hiring managers and technical loops.",
    icon: Clock,
  },
  {
    step: "04",
    title: "Offer",
    desc: "Compare base salaries, bonuses, and equity grants to negotiate with complete leverage.",
    icon: Award,
  },
];

const TESTIMONIALS = [
  {
    quote: "JobTrail completely replaced my clumsy Notion board. The ⌘K search and instant job links saved me hours when managing 25+ simultaneous applications.",
    author: "Sarah Lin",
    role: "Senior Frontend Engineer",
    company: "Landed offer at Series B Unicorn",
    stars: 5,
  },
  {
    quote: "Having interview notes directly tied to each application card kept all my prep notes organized. I felt so much more confident in final interview rounds.",
    author: "David Kovacs",
    role: "Lead Product Designer",
    company: "Secured $210k Design Role",
    stars: 5,
  },
  {
    quote: "The response rate metrics opened my eyes. I tweaked my portfolio and watched my interview conversions double within two weeks.",
    author: "Priya Sharma",
    role: "Fullstack Developer",
    company: "Landed Remote Tech Lead Role",
    stars: 5,
  },
];

export default function LandingPage() {
  const { user, login, signup, logout, loading: isSubmitting } = useAuth();
  const navigate = useNavigate();
  const { progress, isScrolled, showBackToTop } = useScrollProgress(20, 400);

  const [authTab, setAuthTab] = useState("signup");
  const [authForm, setAuthForm] = useState({ name: "", email: "", password: "" });
  const [authError, setAuthError] = useState("");

  const [legalModal, setLegalModal] = useState({ isOpen: false, type: "privacy" });
  const [shortcutsModal, setShortcutsModal] = useState(false);
  const [infoModal, setInfoModal] = useState({
    isOpen: false,
    title: "",
    message: "",
    badge: "Coming Soon",
  });

  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    setAuthError("");

    const action = authTab === "signin" 
      ? login(authForm.email, authForm.password)
      : signup(authForm.name, authForm.email, authForm.password);

    const res = await action;
    if (res.success) {
      navigate("/dashboard");
    } else {
      setAuthError(res.message || "Authentication failed");
    }
  };

  const scrollToAuth = (e) => {
    e?.preventDefault();
    const target = document.getElementById("auth-section") || document.getElementById("auth-card");
    if (!target) return;

    target.scrollIntoView({ behavior: "smooth" });
    if (!user) {
      setTimeout(() => target.querySelector("input")?.focus(), 500);
    }
  };

  const scrollToSection = (id) => (e) => {
    e?.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const handleWebAppClick = (e) => {
    e.preventDefault();
    if (user) {
      navigate("/dashboard");
      return;
    }

    const target = document.getElementById("auth-section") || document.getElementById("auth-card");
    if (!target) return;

    target.scrollIntoView({ behavior: "smooth" });
    target.classList.add("ring-4", "ring-indigo-500/50", "rounded-3xl", "transition-all", "duration-500");
    setTimeout(() => target.classList.remove("ring-4", "ring-indigo-500/50"), 1600);
    setTimeout(() => target.querySelector("input")?.focus(), 600);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 relative overflow-hidden flex flex-col justify-between selection:bg-indigo-500 selection:text-white">
      <div
        className="fixed top-0 left-0 h-[3px] bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 z-50 transition-all duration-150 ease-out"
        style={{ width: `${progress}%` }}
      />

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1100px] h-[550px] bg-gradient-to-tr from-indigo-500/15 via-purple-500/10 to-pink-500/5 blur-3xl rounded-full pointer-events-none -z-10 animate-float-slow" />
      <div className="absolute top-[650px] right-0 w-[600px] h-[600px] bg-gradient-to-bl from-purple-500/10 via-indigo-500/5 to-transparent blur-3xl rounded-full pointer-events-none -z-10 animate-float-delayed" />
      <div className="absolute top-[1600px] left-0 w-[700px] h-[700px] bg-gradient-to-tr from-indigo-500/10 via-purple-500/5 to-transparent blur-3xl rounded-full pointer-events-none -z-10 animate-float-alt" />

      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? "backdrop-blur-md bg-white/80 border-b border-slate-200/70 shadow-xs py-3"
            : "bg-transparent border-b border-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4 transition-all duration-300">
          <Link
            to={user ? "/dashboard" : "/"}
            className="flex items-center gap-2.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-xl py-1 px-1 -ml-1 transition-transform active:scale-95"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-sm shadow-indigo-200 group-hover:shadow group-hover:scale-105 transition-all">
              <Briefcase className="w-5 h-5 transition-transform group-hover:-rotate-6" />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-700 bg-clip-text text-transparent">
                JobTrail
              </span>
              <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200/80 shadow-2xs">
                SaaS 2.0
              </span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600">
            <button
              type="button"
              onClick={scrollToSection("features")}
              className="hover:text-indigo-600 transition-colors cursor-pointer"
            >
              Features
            </button>
            <button
              type="button"
              onClick={scrollToSection("pipeline-demo")}
              className="hover:text-indigo-600 transition-colors cursor-pointer"
            >
              Pipeline Demo
            </button>
            <button
              type="button"
              onClick={scrollToSection("workflow")}
              className="hover:text-indigo-600 transition-colors cursor-pointer"
            >
              Workflow
            </button>
            <button
              type="button"
              onClick={scrollToSection("testimonials")}
              className="hover:text-indigo-600 transition-colors cursor-pointer"
            >
              Testimonials
            </button>
          </nav>

          <div className="flex items-center gap-3">
            {user ? (
              <Link
                to="/dashboard"
                className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs sm:text-sm px-4 py-2 rounded-xl shadow-sm shadow-indigo-200 hover:shadow hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer"
              >
                Go to Dashboard <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            ) : (
              <button
                type="button"
                onClick={scrollToAuth}
                className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs sm:text-sm px-4 py-2 rounded-xl shadow-sm shadow-indigo-200 hover:shadow hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer"
              >
                Sign In / Join Now <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="pt-8 sm:pt-14 pb-16 lg:pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-7 space-y-6 sm:space-y-8"
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-white/90 border border-indigo-100/90 text-indigo-700 shadow-sm backdrop-blur-xs">
                <Sparkles className="w-3.5 h-3.5 text-indigo-600 animate-pulse" />
                <span>The Modern Career Pipeline Command Center</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
                Organize your job hunt.{" "}
                <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Land offers faster.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-600 max-w-xl leading-relaxed">
                Stop losing high-value opportunities in messy spreadsheets. JobTrail gives you
                a visual Kanban pipeline, intelligent interview timelines, and salary tracking to
                run your career search like a pro.
              </p>

              <div className="relative py-2 flex flex-wrap gap-3">
                <div className="animate-float-slow bg-white/90 backdrop-blur-md border border-slate-200/80 rounded-2xl px-4 py-2.5 shadow-sm shadow-indigo-100 flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xs">
                    💼
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-800">24 Applications Tracked</p>
                    <p className="text-[10px] text-slate-400">Active across 5 stages</p>
                  </div>
                </div>

                <div className="animate-float-delayed bg-white/90 backdrop-blur-md border border-slate-200/80 rounded-2xl px-4 py-2.5 shadow-sm shadow-indigo-100 flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-xs">
                    🎯
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-800">Response Rate: 42%</p>
                    <p className="text-[10px] text-emerald-600 font-medium">↑ 18% vs industry avg</p>
                  </div>
                </div>

                <div className="animate-float-alt bg-white/90 backdrop-blur-md border border-purple-200/80 rounded-2xl px-4 py-2.5 shadow-sm shadow-purple-100 flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center font-bold text-xs">
                    🎉
                  </div>
                  <div>
                    <p className="text-xs font-bold text-purple-950">Offer Received</p>
                    <p className="text-[10px] text-purple-600 font-semibold">Senior Frontend Dev • $195k</p>
                  </div>
                </div>
              </div>

              <div className="space-y-2.5 pt-2">
                {[
                  "Kanban pipeline with drag-ready stages (Wishlist, Interview, Offer)",
                  "Interview scheduling notes, recruiter tags, and salary logging",
                  "Fast ⌘K keyboard search & instant links directly to live postings",
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-xs sm:text-sm text-slate-700 font-medium">
                    <div className="w-5 h-5 rounded-full bg-indigo-50 border border-indigo-200/80 text-indigo-600 flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3 stroke-[2.5]" />
                    </div>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-5 relative"
              id="auth-section"
            >
              <div className="absolute -inset-1.5 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-[32px] blur-xl -z-10" />

              <div id="auth-card" className="backdrop-blur-2xl bg-white/90 shadow-2xl border border-white/80 rounded-3xl p-6 sm:p-8 transition-all relative">
                {user ? (
                  <div className="text-center py-4 space-y-5">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-600 text-white font-bold text-xl flex items-center justify-center mx-auto shadow-md shadow-indigo-200 ring-4 ring-indigo-50">
                      {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-900">
                        Welcome back, {user.name || "Seeker"}!
                      </h3>
                      <p className="text-xs text-slate-500 mt-1">{user.email}</p>
                    </div>
                    <div className="bg-indigo-50/70 border border-indigo-100 rounded-2xl p-4 text-xs text-indigo-900 leading-relaxed">
                      Your pipeline is active. Head over to your dashboard to review interview schedules and new opportunities.
                    </div>
                    <div className="space-y-2.5 pt-2">
                      <Link
                        to="/dashboard"
                        className="w-full inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-4 rounded-xl shadow-sm shadow-indigo-200 hover:shadow transition-all text-sm cursor-pointer"
                      >
                        Open Pipeline Dashboard <ArrowRight className="w-4 h-4" />
                      </Link>
                      <button
                        type="button"
                        onClick={logout}
                        className="w-full text-xs text-slate-500 hover:text-rose-600 py-1.5 transition-colors cursor-pointer"
                      >
                        Sign out of account
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="flex bg-slate-100/90 p-1 rounded-2xl border border-slate-200/60 mb-6">
                      <button
                        type="button"
                        onClick={() => {
                          setAuthTab("signin");
                          setAuthError("");
                        }}
                        className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all duration-200 cursor-pointer ${
                          authTab === "signin"
                            ? "bg-white text-slate-900 shadow-xs"
                            : "text-slate-500 hover:text-slate-800"
                        }`}
                      >
                        Sign In
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setAuthTab("signup");
                          setAuthError("");
                        }}
                        className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all duration-200 cursor-pointer ${
                          authTab === "signup"
                            ? "bg-white text-slate-900 shadow-xs"
                            : "text-slate-500 hover:text-slate-800"
                        }`}
                      >
                        Create Account
                      </button>
                    </div>

                    <div className="mb-5">
                      <h2 className="text-xl font-bold text-slate-900">
                        {authTab === "signup" ? "Get started with JobTrail" : "Sign in to your pipeline"}
                      </h2>
                      <p className="text-xs text-slate-500 mt-1">
                        {authTab === "signup"
                          ? "Set up your workspace in under 30 seconds"
                          : "Enter your credentials to manage your applications"}
                      </p>
                    </div>

                    {authError && (
                      <div className="mb-4 p-3 bg-rose-50 border border-rose-100 text-rose-600 rounded-xl text-xs font-medium flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0" />
                        <span>{authError}</span>
                      </div>
                    )}

                    <form onSubmit={handleAuthSubmit} className="space-y-4">
                      {authTab === "signup" && (
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                            Full Name
                          </label>
                          <input
                            type="text"
                            required
                            value={authForm.name}
                            onChange={(e) => setAuthForm({ ...authForm, name: e.target.value })}
                            placeholder="Alex Mercer"
                            className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                          />
                        </div>
                      )}

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                          Email Address
                        </label>
                        <input
                          type="email"
                          required
                          value={authForm.email}
                          onChange={(e) => setAuthForm({ ...authForm, email: e.target.value })}
                          placeholder="alex@domain.com"
                          className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                          Password {authTab === "signup" ? "(min 6 characters)" : ""}
                        </label>
                        <input
                          type="password"
                          required
                          minLength={authTab === "signup" ? 6 : undefined}
                          value={authForm.password}
                          onChange={(e) => setAuthForm({ ...authForm, password: e.target.value })}
                          placeholder="••••••••"
                          className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white text-sm font-semibold rounded-xl shadow-sm shadow-indigo-200 hover:shadow hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer flex items-center justify-center gap-2"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            <span>Authenticating...</span>
                          </>
                        ) : authTab === "signup" ? (
                          <>
                            <span>Create Free Account</span>
                            <ArrowRight className="w-4 h-4" />
                          </>
                        ) : (
                          <>
                            <span>Sign In to Dashboard</span>
                            <ArrowRight className="w-4 h-4" />
                          </>
                        )}
                      </button>
                    </form>

                    <p className="text-[11px] text-center text-slate-400 mt-4 leading-normal">
                      By registering, you agree to our Terms of Service & Privacy Policy. 100% private data.
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </section>

        <section id="pipeline-demo" className="py-16 bg-white/60 backdrop-blur-md border-y border-slate-200/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
                Interactive Showcase
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-3">
                A High-Fidelity Command Center for Every Stage
              </h2>
              <p className="text-sm sm:text-base text-slate-500 mt-2">
                Say goodbye to scattered notes. Monitor your pipeline with real-time conversion KPIs, salary details, and instant job links.
              </p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 45, rotateX: 8 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
              style={{ transformPerspective: 1200 }}
              className="bg-white rounded-3xl shadow-xl border border-slate-200/90 overflow-hidden max-w-5xl mx-auto"
            >
              <div className="bg-slate-900 text-white px-5 py-3.5 flex items-center justify-between border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500" />
                  <div className="w-3 h-3 rounded-full bg-amber-500" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500" />
                  <span className="text-xs font-mono text-slate-400 ml-3 hidden sm:inline">
                    https://app.jobtrail.io/dashboard
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span>Live Demo View</span>
                </div>
              </div>

              <div className="p-6 sm:p-8 bg-slate-50/50 space-y-6">
                <div className="flex flex-col md:flex-row gap-3 items-center justify-between bg-white p-2.5 rounded-2xl border border-slate-200/80 shadow-2xs">
                  <div className="relative w-full md:w-80">
                    <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      readOnly
                      type="text"
                      value="Senior"
                      className="w-full bg-slate-50 border border-slate-200/70 rounded-xl pl-9 pr-4 py-2 text-sm text-slate-800 cursor-default"
                    />
                  </div>
                  <div className="flex flex-wrap gap-1 p-1 bg-slate-100 rounded-xl text-xs font-medium">
                    <span className="bg-white text-slate-900 font-semibold px-3 py-1 rounded-lg shadow-2xs">
                      All (24)
                    </span>
                    <span className="text-slate-500 px-3 py-1">Interview (4)</span>
                    <span className="text-slate-500 px-3 py-1">Offer (2)</span>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-5">
                  <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs hover:border-purple-200 hover:shadow-md transition-all">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div>
                        <h4 className="font-semibold text-slate-900">Senior Frontend Engineer</h4>
                        <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-0.5">
                          <Building2 className="w-3.5 h-3.5" />
                          <span>Stripe</span>
                        </div>
                      </div>
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border bg-purple-50 text-purple-700 border-purple-200">
                        <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                        Interview
                      </span>
                    </div>
                    <p className="mt-2.5 text-xs text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-100 leading-relaxed">
                      System design round with hiring manager. Prep distributed UI caching questions.
                    </p>
                    <div className="flex items-center justify-between text-xs text-slate-400 mt-4 pt-3 border-t border-slate-100">
                      <span className="font-medium text-slate-600">$185k - $210k • Remote</span>
                      <span className="flex items-center gap-1 text-indigo-600 font-medium">
                        Job Posting <ExternalLink className="w-3 h-3" />
                      </span>
                    </div>
                  </div>

                  <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs hover:border-emerald-200 hover:shadow-md transition-all">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div>
                        <h4 className="font-semibold text-slate-900">Staff Product Designer</h4>
                        <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-0.5">
                          <Building2 className="w-3.5 h-3.5" />
                          <span>Figma</span>
                        </div>
                      </div>
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border bg-emerald-50 text-emerald-700 border-emerald-200">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        Offer
                      </span>
                    </div>
                    <p className="mt-2.5 text-xs text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-100 leading-relaxed">
                      Official written offer received. Reviewing equity vesting schedule and sign-on bonus.
                    </p>
                    <div className="flex items-center justify-between text-xs text-slate-400 mt-4 pt-3 border-t border-slate-100">
                      <span className="font-medium text-slate-600">$220k + Equity • SF</span>
                      <span className="flex items-center gap-1 text-emerald-600 font-medium">
                        Accepted Loop <CheckCircle2 className="w-3 h-3" />
                      </span>
                    </div>
                  </div>

                  <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs hover:border-blue-200 hover:shadow-md transition-all">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div>
                        <h4 className="font-semibold text-slate-900">Fullstack Engineer</h4>
                        <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-0.5">
                          <Building2 className="w-3.5 h-3.5" />
                          <span>Linear</span>
                        </div>
                      </div>
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border bg-blue-50 text-blue-700 border-blue-200">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                        Applied
                      </span>
                    </div>
                    <p className="mt-2.5 text-xs text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-100 leading-relaxed">
                      Referred by team lead. Waiting on resume screening confirmation.
                    </p>
                    <div className="flex items-center justify-between text-xs text-slate-400 mt-4 pt-3 border-t border-slate-100">
                      <span className="font-medium text-slate-600">$175k • Remote EU/US</span>
                      <span className="flex items-center gap-1 text-indigo-600 font-medium">
                        Job Posting <ExternalLink className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section id="features" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
              Built for High Velocity
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-3">
              Engineered for Modern Job Seekers
            </h2>
            <p className="text-base text-slate-500 mt-2">
              Everything you need to turn initial applications into competitive multi-offer negotiations.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {FEATURES.map((feat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.5, delay: idx * 0.08, ease: "easeOut" }}
                className="bg-white border border-slate-200/80 rounded-3xl p-7 shadow-xs hover:-translate-y-1.5 hover:shadow-xl hover:shadow-indigo-100/50 transition-all duration-300 group"
              >
                <div className={`w-12 h-12 rounded-2xl ${feat.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                  <feat.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                  {feat.title}
                </h3>
                <p className="text-sm text-slate-500 mt-2 leading-relaxed">
                  {feat.description}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        <section id="workflow" className="py-20 bg-slate-900 text-white relative overflow-hidden">
          <div className="absolute -top-32 -left-32 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest bg-indigo-950/80 px-3 py-1 rounded-full border border-indigo-800">
                The Four Stages of Success
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-3">
                From First Bookmark to Signed Offer
              </h2>
              <p className="text-sm sm:text-base text-slate-400 mt-2">
                A clean, sequential workflow engineered to keep you focused on what converts.
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-6 relative">
              {WORKFLOW_STEPS.map((st, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: idx * 0.1, ease: "easeOut" }}
                  className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-6 backdrop-blur-sm relative group hover:border-indigo-500/50 transition-colors"
                >
                  <div className="text-xs font-mono font-bold text-indigo-400 mb-3">
                    STAGE {st.step}
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-indigo-600/20 border border-indigo-500/30 text-indigo-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <st.icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{st.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">{st.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="testimonials" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
              Community Endorsements
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-3">
              Loved by Engineers, Designers & PMs
            </h2>
            <p className="text-base text-slate-500 mt-2">
              See how job seekers landed their dream roles with organized pipeline tracking.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
            {TESTIMONIALS.map((t, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.5, delay: idx * 0.12, ease: "easeOut" }}
                className="bg-white border border-slate-200/80 rounded-3xl p-7 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-1 text-amber-400 mb-4">
                    {[...Array(t.stars)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-sm text-slate-700 leading-relaxed italic">
                    "{t.quote}"
                  </p>
                </div>
                <div className="pt-6 mt-6 border-t border-slate-100 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 text-white font-bold text-xs flex items-center justify-center">
                    {t.author.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">{t.author}</h4>
                    <p className="text-[11px] text-slate-500">{t.role} • {t.company}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-700 rounded-3xl p-8 sm:p-12 text-white text-center relative overflow-hidden shadow-xl shadow-indigo-200"
          >
            <div className="relative z-10 max-w-2xl mx-auto space-y-4">
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                Ready to take control of your job search?
              </h2>
              <p className="text-indigo-100 text-sm sm:text-base leading-relaxed">
                Join thousands of career changers and tech professionals organizing their pipeline with JobTrail today.
              </p>
              <div className="pt-4">
                <button
                  type="button"
                  onClick={scrollToAuth}
                  className="inline-flex items-center gap-2 bg-white text-indigo-700 hover:bg-indigo-50 font-bold text-sm px-6 py-3.5 rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer"
                >
                  Start Tracking for Free <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        </section>
      </main>

      <footer className="border-t border-slate-200/80 bg-white/70 backdrop-blur-md py-12 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-8 mb-10">
          <div className="col-span-2 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white">
                <Briefcase className="w-4 h-4" />
              </div>
              <span className="text-lg font-extrabold tracking-tight bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                JobTrail
              </span>
            </div>
            <p className="text-xs text-slate-500 max-w-sm leading-relaxed">
              The high-velocity job application pipeline engineered for engineers, designers, and modern tech leaders.
            </p>
            <div className="flex items-center gap-2 pt-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-xs font-medium text-slate-500">
                All systems operational
              </span>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">Product</h4>
            <ul className="space-y-2.5">
              <li>
                <button
                  type="button"
                  onClick={scrollToSection("pipeline-demo")}
                  className="text-slate-500 hover:text-indigo-600 transition-colors duration-200 cursor-pointer text-sm flex items-center gap-1.5 group text-left"
                >
                  <span className="group-hover:translate-x-1 transition-transform duration-200 inline-flex items-center gap-1">
                    Pipeline Demo
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity text-xs font-bold text-indigo-500">→</span>
                  </span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={scrollToSection("features")}
                  className="text-slate-500 hover:text-indigo-600 transition-colors duration-200 cursor-pointer text-sm flex items-center gap-1.5 group text-left"
                >
                  <span className="group-hover:translate-x-1 transition-transform duration-200 inline-flex items-center gap-1">
                    Features
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity text-xs font-bold text-indigo-500">→</span>
                  </span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={scrollToSection("workflow")}
                  className="text-slate-500 hover:text-indigo-600 transition-colors duration-200 cursor-pointer text-sm flex items-center gap-1.5 group text-left"
                >
                  <span className="group-hover:translate-x-1 transition-transform duration-200 inline-flex items-center gap-1">
                    Workflow
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity text-xs font-bold text-indigo-500">→</span>
                  </span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={handleWebAppClick}
                  className="text-slate-500 hover:text-indigo-600 transition-colors duration-200 cursor-pointer text-sm flex items-center gap-1.5 group text-left"
                >
                  <span className="group-hover:translate-x-1 transition-transform duration-200 inline-flex items-center gap-1">
                    Web App
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity text-xs font-bold text-indigo-500">→</span>
                  </span>
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">Resources</h4>
            <ul className="space-y-2.5">
              <li>
                <button
                  type="button"
                  onClick={scrollToSection("testimonials")}
                  className="text-slate-500 hover:text-indigo-600 transition-colors duration-200 cursor-pointer text-sm flex items-center gap-1.5 group text-left"
                >
                  <span className="group-hover:translate-x-1 transition-transform duration-200 inline-flex items-center gap-1">
                    Success Stories
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity text-xs font-bold text-indigo-500">→</span>
                  </span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() =>
                    setInfoModal({
                      isOpen: true,
                      title: "Salary Insights & Market Intel",
                      badge: "Coming Soon",
                      message:
                        "We're developing verified compensation benchmarks, leveling guides, and equity negotiation analytics directly into your pipeline cards. Stay tuned for the public release!",
                    })
                  }
                  className="text-slate-500 hover:text-indigo-600 transition-colors duration-200 cursor-pointer text-sm flex items-center gap-1.5 group text-left"
                >
                  <span className="group-hover:translate-x-1 transition-transform duration-200 inline-flex items-center gap-1">
                    Salary Insights
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity text-xs font-bold text-indigo-500">→</span>
                  </span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setShortcutsModal(true)}
                  className="text-slate-500 hover:text-indigo-600 transition-colors duration-200 cursor-pointer text-sm flex items-center gap-1.5 group text-left"
                >
                  <span className="group-hover:translate-x-1 transition-transform duration-200 inline-flex items-center gap-1">
                    Keyboard Shortcuts
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity text-xs font-bold text-indigo-500">→</span>
                  </span>
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">Legal & Security</h4>
            <ul className="space-y-2.5">
              <li>
                <button
                  type="button"
                  onClick={() => setLegalModal({ isOpen: true, type: "privacy" })}
                  className="text-slate-500 hover:text-indigo-600 transition-colors duration-200 cursor-pointer text-sm flex items-center gap-1.5 group text-left"
                >
                  <span className="group-hover:translate-x-1 transition-transform duration-200 inline-flex items-center gap-1">
                    Privacy Policy
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity text-xs font-bold text-indigo-500">→</span>
                  </span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setLegalModal({ isOpen: true, type: "terms" })}
                  className="text-slate-500 hover:text-indigo-600 transition-colors duration-200 cursor-pointer text-sm flex items-center gap-1.5 group text-left"
                >
                  <span className="group-hover:translate-x-1 transition-transform duration-200 inline-flex items-center gap-1">
                    Terms of Service
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity text-xs font-bold text-indigo-500">→</span>
                  </span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setLegalModal({ isOpen: true, type: "security" })}
                  className="text-slate-500 hover:text-indigo-600 transition-colors duration-200 cursor-pointer text-sm flex items-center gap-1.5 group text-left"
                >
                  <span className="group-hover:translate-x-1 transition-transform duration-200 inline-flex items-center gap-1">
                    Security Protocol
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity text-xs font-bold text-indigo-500">→</span>
                  </span>
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto pt-6 border-t border-slate-200/60 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© {new Date().getFullYear()} JobTrail Inc. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="font-mono text-[11px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded border border-slate-200">
              v2.0.0
            </span>
          </div>
        </div>
      </footer>

      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 15 }}
            transition={{ duration: 0.25 }}
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Back to top"
            className="fixed bottom-6 right-20 sm:right-24 p-3.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white shadow-xl hover:scale-110 active:scale-95 transition-all duration-300 z-40 cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2"
          >
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>

      <LegalModal
        isOpen={legalModal.isOpen}
        onClose={() => setLegalModal({ ...legalModal, isOpen: false })}
        type={legalModal.type}
      />

      <ShortcutsModal
        isOpen={shortcutsModal}
        onClose={() => setShortcutsModal(false)}
      />

      <InfoModal
        isOpen={infoModal.isOpen}
        onClose={() => setInfoModal({ ...infoModal, isOpen: false })}
        title={infoModal.title}
        message={infoModal.message}
        badge={infoModal.badge}
      />
    </div>
  );
}
