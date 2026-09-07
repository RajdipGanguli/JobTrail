import { ShieldCheck, FileText, Lock } from "lucide-react";
import Modal from "./common/Modal";

const LEGAL_DOCS = {
  terms: {
    title: "Terms of Service",
    icon: FileText,
    badge: "Legal Agreement",
    effectiveDate: "March 2026",
    sections: [
      {
        heading: "1. Acceptance of Terms",
        body: "By creating an account or accessing the JobTrail platform, you agree to comply with and be legally bound by these Terms of Service. If you do not agree to these terms, you must discontinue platform use immediately.",
      },
      {
        heading: "2. User Accounts & Responsibilities",
        body: "You are responsible for safeguarding your credentials and password. You agree not to disclose your password to any third party and to notify JobTrail immediately upon becoming aware of any breach of security or unauthorized account use.",
      },
      {
        heading: "3. Acceptable Use",
        body: "JobTrail is provided strictly for personal and professional career management. You agree not to reverse engineer, scrape, abuse API endpoints, or store unlawful or malicious content within notes or application attachments.",
      },
      {
        heading: "4. Intellectual Property & Data Ownership",
        body: "All application data, personal notes, and company pipeline logs remain 100% your intellectual property. JobTrail does not sell, license, or claim ownership over your individual career data.",
      },
    ],
  },
  security: {
    title: "Security Protocol & Compliance",
    icon: Lock,
    badge: "Security Standard",
    effectiveDate: "March 2026",
    sections: [
      {
        heading: "1. Data Encryption & Transport",
        body: "All data in transit is encrypted using industry-standard TLS 1.3 encryption. Passwords are cryptographically hashed using salted bcrypt prior to database storage, ensuring zero plain-text exposure.",
      },
      {
        heading: "2. Authentication Architecture",
        body: "JobTrail utilizes stateless JSON Web Token (JWT) architecture with strictly scoped expiration windows. Auth tokens are stored securely in browser storage and validated on every API request via authentication middleware.",
      },
      {
        heading: "3. Data Isolation & Tenant Privacy",
        body: "Application pipeline models enforce per-user document isolation in our MongoDB cluster. Every database query strictly filters by authenticated user IDs, preventing cross-tenant leakage or enumeration vulnerabilities.",
      },
      {
        heading: "4. Continuous Threat Mitigation",
        body: "Our infrastructure implements input sanitization, automated SQL/NoSQL injection prevention, strict CORS policies, and rate limiting to defend against brute force attempts.",
      },
    ],
  },
  privacy: {
    title: "Privacy Policy",
    icon: ShieldCheck,
    badge: "Data Protection",
    effectiveDate: "March 2026",
    sections: [
      {
        heading: "1. Information We Collect",
        body: "We only collect information necessary to deliver and improve your job search experience: your name, email address, application history, job titles, companies, salary targets, and user-generated interview notes.",
      },
      {
        heading: "2. Zero Third-Party Monetization",
        body: "JobTrail does not sell, rent, or monetize your career data, recruiter contacts, or salary information to third-party data brokers, recruitment agencies, or advertisers.",
      },
      {
        heading: "3. How We Use Your Data",
        body: "Your information is used exclusively to populate your personalized Kanban pipeline, compute interview conversion statistics, and enable seamless cross-device synchronization.",
      },
      {
        heading: "4. Your Rights & Deletion",
        body: "You maintain full control over your career data. You may delete individual applications or request complete account erasure at any time, which permanently purges all records from our database.",
      },
    ],
  },
};

export default function LegalModal({ isOpen, onClose, type = "privacy" }) {
  const content = LEGAL_DOCS[type] || LEGAL_DOCS.privacy;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={content.title}
      subtitle={`Effective ${content.effectiveDate} • JobTrail Platform`}
      icon={content.icon}
      badge={content.badge}
      maxWidth="max-w-xl"
      footer={
        <>
          <span className="text-[11px] text-slate-400 font-medium">
            Confidential & Protected
          </span>
          <button
            type="button"
            onClick={onClose}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs sm:text-sm px-5 py-2.5 rounded-xl shadow-sm shadow-indigo-200 hover:shadow transition-all cursor-pointer"
          >
            I understand
          </button>
        </>
      }
    >
      <div className="max-h-[60vh] overflow-y-auto space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed pr-1">
        {content.sections.map((sec, idx) => (
          <div key={idx} className="space-y-1">
            <h4 className="font-bold text-slate-800 text-xs sm:text-sm">
              {sec.heading}
            </h4>
            <p className="text-slate-500 leading-relaxed">{sec.body}</p>
          </div>
        ))}
      </div>
    </Modal>
  );
}
