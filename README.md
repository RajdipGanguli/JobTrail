# JobTrail 🎯

> A full-stack job application tracker with a real-time Kanban board, KPI metrics, JWT authentication, and a modern dashboard UI.

Built and maintained by [Rajdip Ganguli](https://github.com/RajdipGanguli).

---

## 🚀 Features

- **Pipeline Board:** Drag-and-drop / stage-based application tracking (Applied, Assessment, Interview, Offer, Wishlist, Rejected).
- **Analytics & KPIs:** Real-time metrics tracking conversion rates, active interviews, and offers.
- **Authentication:** Secure user signup and login backed by JWT and bcrypt password hashing.
- **Data Persistence:** Cloud database integration using MongoDB Atlas and Mongoose.
- **Modern UI:** Built with Vite, React, and styled with Tailwind CSS.

---

## 🛠️ Tech Stack

- **Frontend:** React, Vite, Tailwind CSS, Lucide Icons, React Router
- **Backend:** Node.js, Express.js, MongoDB Atlas, Mongoose
- **Auth & Security:** JSON Web Tokens (JWT), bcryptjs, CORS

---

## 💻 Local Development

### 1. Backend Setup
\`\`\`bash
cd jobtrail-backend
npm install
node server.js
\`\`\`
*Runs on `http://localhost:5000`*

### 2. Frontend Setup
\`\`\`bash
cd jobtrail-frontend
npm install
npm run dev
\`\`\`
*Runs on `http://localhost:5173`*
