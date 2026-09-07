# 🎯 JobTrail

A modern, full-stack job application tracker designed to replace messy spreadsheets with an intuitive visual pipeline, actionable conversion analytics, and real-time status management.

🔗 **Live Demo:** [https://job-trail-six.vercel.app](https://job-trail-six.vercel.app)  
📦 **Repository:** [https://github.com/RajdipGanguli/JobTrail](https://github.com/RajdipGanguli/JobTrail)

---

## ✨ Features

- **Visual Application Pipeline:** Manage applications across key recruitment stages (Wishlist, Applied, Assessment, Interview, Offer, Rejected).
- **Conversion Metrics & Insights:** Real-time summary cards tracking active pipelines, total applications, interviews, and offer conversion rates.
- **Secure Authentication:** Complete registration and login system with encrypted credentials and JWT-based session security.
- **Automated Testing Suite:** Robust smoke and component tests using Vitest and React Testing Library to ensure UI stability.
- **Responsive UI:** Clean, modern interface styled with Tailwind CSS and smooth interactions powered by Framer Motion.

---

## 🛠️ Tech Stack

### Frontend
- **Framework:** React 19 + Vite
- **Styling:** Tailwind CSS, Lucide React
- **Animations:** Framer Motion
- **State & HTTP:** Axios
- **Testing:** Vitest, React Testing Library, jsdom
- **Hosting:** Vercel

### Backend
- **Runtime:** Node.js + Express.js
- **Database:** MongoDB Atlas (Mongoose ODM)
- **Security:** CORS middleware, bcryptjs, JSON Web Tokens (JWT)
- **Hosting:** Render

---

## 🏗️ Architecture & Deployment

```text
[ React / Vite Client ]  ──(Vercel)──>  HTTPS / Cross-Origin Requests
                                                    │
                                                    ▼
[ Express REST API ]     ──(Render)──>  CORS Validation & JWT Auth
                                                    │
                                                    ▼
[ MongoDB Atlas ]        ──(Cloud)───>  Encrypted User & Job Data
