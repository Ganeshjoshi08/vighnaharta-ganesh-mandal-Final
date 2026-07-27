# 🕉️ Shree Vighnaharta Ganesh Mandal Portal

A premium, full-stack devotional web application built using the **MERN Stack** to manage, display, and coordinate festival activities digitally for Shree Vighnaharta Ganesh Mandal.

---

## 🌟 Key Features

### 🏠 Devotional Homepage
- **Countdown Timer**: Real-time ticker counting down to the Ganesh Chaturthi festival.
- **Dynamic Ganesha Showcase**: Section displaying Ganesha Murti images with editable history text blocks.
- **Journey Timeline**: Interactive milestone timelines showing important milestones of the Mandal (from 1990 to today).

### 📅 Event Management & DB Registration
- **Event Highlights**: Details on competitions (e.g., Box Cricket, Esports BGMI, etc.) with `COMING SOON` overlays.
- **MongoDB Registration Hook**: Attendee signup forms connected to database storage.
- **Dynamic Devotee Tickets**: Auto-generates a unique Devotee Registration Ticket ID (e.g., `VMM-XXXXX`) upon successful database entry.

### 📖 Devotional Mantras & Aarti Console
- **Traditional Texts**: Complete traditional lyrics of **Ganesh Aarti** and **Shrisukta**.
- **Devanagari Typography**: Custom font loading (using *SF Pro* and *ITF Devanagari Marathi*) for clean Marathi display.

### 📸 Photo Gallery & Announcements
- **Interactive Gallery**: Showcase of past celebrations with photo lightbox displays.
- **Dynamic Announcements**: Real-time banner notices and announcements published by admins.

### 💰 Secure Donation Portal
- **Devotee Contributions**: Fully integrated donation options with a QR payment interface.
- **Transaction Logs**: Devotees' contributions are registered in database collections.

### ⚙️ Admin Console Dashboard
- **Content Management**: Control panel for uploading gallery photos, managing banners, and creating events.
- **Devotee Registration Logs**: Comprehensive overview of all user accounts and competition registries.
- **Live Text Editor**: Edit the Homepage "About us" text block and timeline milestones dynamically without touching code.

---

## 🛠️ Technical Architecture & Tech Stack

### Frontend
- **Framework**: React.js (Vite compiler engine)
- **Routing**: React Router DOM (v6)
- **Styling**: Vanilla CSS (Tailwind variables mapped dynamically)
- **HTTP Client**: Axios (configured interceptors for session authentication and CORS settings)

### Backend
- **Server Framework**: Node.js & Express.js
- **Authentication**: JSON Web Tokens (JWT) & bcryptjs passwords hashing
- **File Uploads**: Multer storage configuration
- **CORS Configuration**: Supports ports `5173`, `5174`, and `5175` for local environment stability

### Database
- **Provider**: MongoDB Atlas
- **Object Modeling**: Mongoose (strict schemas and validation rules)

---

## 📂 Project Structure

```
vighnaharta-ganesh-mandal/
├── backend/
│   ├── config/             # DB connection settings
│   ├── controllers/        # Route controllers (Auth, Donations, Events, etc.)
│   ├── middleware/         # Admin protection and Auth verification
│   ├── models/             # Mongoose schemas (User, Event, Registration, etc.)
│   ├── routes/             # Express API endpoints
│   ├── uploads/            # Local media files uploads folder
│   └── server.js           # Server startup script
│
└── frontend/
    ├── src/
    │   ├── api/            # Axios API config
    │   ├── assets/         # Images, logs, and icons
    │   ├── components/     # Reusable layout components (Navbar, Footer)
    │   ├── pages/          # Page layouts (Home, Mantras, Events, Admin, etc.)
    │   ├── App.jsx         # App router config
    │   ├── index.css       # Global design tokens
    │   └── main.jsx        # App mounting configuration
```

---

## 🚀 Installation & Configuration

### Prerequisites
- Node.js installed locally
- MongoDB database instance (local or Atlas)

### Step 1: Configure Environment Variables

Create a `.env` file inside the `backend/` directory:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_signing_token
CLIENT_URL=http://localhost:5173
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

### Step 3: Run the Application

```bash
# Launch backend server (listening on port 5000)
cd backend
npm start

# Launch frontend server (bound to localhost:5173/5174)
cd ../frontend
npm run dev
```

---

## 👨‍💻 Developed By

**Ganesh Nitin Joshi**  
*Electronics & Computer Engineering*  
[CSMSS Chh. Shahu College of Engineering, Aurangabad]

---

## 🙏 Ganpati Bappa Morya
*Serving Devotion and Community Through Technology ❤️*