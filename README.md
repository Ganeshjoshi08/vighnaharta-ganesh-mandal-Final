# 🕉️ Shree Vighnaharta Ganesh Mandal Portal

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)
[![Render](https://img.shields.io/badge/Render-46E3B7?style=for-the-badge&logo=render&logoColor=white)](https://render.com/)

A premium, full-stack devotional web application built using the **MERN Stack** to manage, display, and coordinate festival activities digitally for Shree Vighnaharta Ganesh Mandal, Beed.

---

## 🌟 Key Features

### 🏠 Devotional Homepage & Premium UI
- **Devotional Theme**: Sleek dark and golden theme honoring traditional colors.
- **Countdown Widget**: Dynamic countdown to the upcoming Ganesh Chaturthi.
- **Mandal History Timeline**: Interactive milestone timelines charting the Mandal's growth since 1990.
- **Aarti & Mantra Console**: Complete digital library of traditional hymns (Ganesh Aarti, Shrisukta) formatted in elegant Devanagari typography.

### 📅 Event Coordination & Devotee Registration
- **Event Management**: Public display of cultural and sports competitions (Box Cricket, BGMI, etc.).
- **Automatic Devotee Tickets**: Auto-generates a unique Devotee Registration Ticket ID (e.g., `VMM-XXXXX`) upon successful registration.
- **Secure Authentication**: Secure Sign Up & Log In with OTP verification delivered straight to user email addresses via **Resend's API**.

### 📸 Photos & Highlights Gallery
- **Dynamic Photo Grid**: Interactive media gallery displaying celebrations categorized by Smart Ganesh, Social, Religious, and Cultural activities.
- **Announcement Banner**: Dynamic notifications managed by admins.

### 💰 Donation Portal
- **Devotee Contributions**: Fully integrated QR-based donation module.
- **Transaction Logs**: Securely records and tracks all donation logs in the database.

### ⚙️ Full-Featured Admin Panel
- **Realtime Dashboard**: Overview of total user signups, event registrations, and donation metrics.
- **Mandal Settings Manager**: Upload logos, edit banners, update address/contact details, and modify home screen text blocks dynamically.
- **Notification Center**: Realtime alerts on user activities.

---

## 🛠️ Technical Architecture

- **Frontend**: React (Vite compiler), React Router DOM (v6), Vanilla CSS (Tailwind variables mapped dynamically).
- **Backend**: Node.js & Express.js server, Resend API integration for email dispatch.
- **Database**: MongoDB Atlas (strict schemas & validation via Mongoose).
- **Security**: Password hashing using bcryptjs, route authorization via JWT tokens.

---

## 📂 Project Structure

```
vighnaharta-ganesh-mandal/
├── backend/
│   ├── config/             # DB connection settings
│   ├── controllers/        # Controllers (Auth, Donations, Events, settings, etc.)
│   ├── middleware/         # Admin protection and Auth verification
│   ├── models/             # Mongoose schemas (User, Event, Settings, etc.)
│   ├── routes/             # Express API endpoints
│   ├── utils/              # Email sending utilities (Resend API)
│   └── server.js           # Server startup script
│
└── frontend/
    ├── vercel.json         # SPA router configuration for Vercel
    ├── src/
    │   ├── api/            # Axios API config with credentials
    │   ├── assets/         # Fonts, icons, and logo assets
    │   ├── components/     # Reusable components (Navbar, Footer)
    │   ├── pages/          # Page views (Home, Mantras, Events, Admin, etc.)
    │   ├── App.jsx         # App router config
    │   ├── index.css       # Styling tokens and Tailwind configurations
    │   └── main.jsx        # Mounting point
```

---

## 🚀 Installation & Configuration

### Prerequisites
- Node.js (v18+)
- MongoDB database (local or Atlas)

### Step 1: Configure Environment Variables

Create a `.env` file inside the `backend/` directory:

```env
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_uri
JWT_SECRET=your_jwt_secret_token
EMAIL=joshiganeshcsmss@gmail.com
RESEND_API_KEY=your_resend_api_key
```

### Step 2: Install Dependencies

```bash
# Install backend packages
cd backend
npm install

# Install frontend packages
cd ../frontend
npm install
```

### Step 3: Run the Application (Development Mode)

```bash
# Launch backend server
cd backend
npm run dev

# Launch frontend server
cd ../frontend
npm run dev
```

---

## 🌐 Production Deployment

### Frontend (Vercel)
The frontend is optimized for static hosting on Vercel. 
- Build command: `npm run build`
- Output directory: `dist`
- Route rewrites are handled natively by `vercel.json` to prevent `404 Not Found` errors on page refresh.

### Backend (Render)
The backend is deployed as a Web Service on Render.
- Build command: `npm install`
- Start command: `node server.js`
- Make sure to configure all environment variables (especially `RESEND_API_KEY` and `MONGO_URI`) in the Render Dashboard under **Environment**.

---

## 👨‍💻 Developed By

**Ganesh Nitin Joshi**  
*Electronics & Computer Engineering*  
[CSMSS Chh. Shahu College of Engineering, Aurangabad]

---

## 🙏 Ganpati Bappa Morya
*Serving Devotion and Community Through Technology ❤️*