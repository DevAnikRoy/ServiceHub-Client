# ServiceHub 🛠️

A full-stack service booking platform where users can explore, book, and manage services—while providers can manage tasks and stay organized.

---

## 🚀 Live Demo

🌐 [https://servicehub-client.web.app](https://servicehub-client.web.app)

---

## 🧩 Features

### 👤 Users
- 🔐 Authentication (Firebase)
- 📚 Browse Featured & All Services
- 🛒 Book services with schedule & instructions
- 📄 View booked services with status badges (Pending / Working / Completed)

### 🧑‍🔧 Providers
- 🧭 View assigned services in “Service To-Do” dashboard
- ✅ Track task status

---

## 🛠️ Tech Stack

- **Frontend**: React + Vite + TailwindCSS + Framer Motion  
- **Backend**: Node.js + Express + MongoDB (hosted on Vercel)
- **Auth**: Firebase Authentication
- **Deployment**: Firebase Hosting (client), Vercel (server)

---

## ⚙️ Setup Instructions

1. **Clone This Repo**
   ```bash
   git clone https://github.com/your-username/servicehub.git
   cd servicehub
    Install Dependencies

bash
npm install
Environment Variables Create a .env file in the root directory with:

VITE_FIREBASE_API_KEY=xxx
VITE_FIREBASE_AUTH_DOMAIN=xxx
VITE_FIREBASE_PROJECT_ID=xxx
VITE_BACKEND_URL=https://service-assingment-server.vercel.app
Run Locally

bash
npm run dev
📁 Folder Structure (Client)
src/
│
├── components/     → Reusable UI components
├── pages/          → Route-based pages
├── contexts/       → Auth context provider
├── utils/          → Helper functions & config
├── App.jsx         
├── main.jsx        