import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Events from "./pages/Events";
import Gallery from "./pages/Gallery";
import Donation from "./pages/Donation";
import Atharvashirsha from "./pages/Atharvashirsha";
import Announcements from "./pages/Announcements";
import Mantras from "./pages/Mantras";

import Auth from "./pages/Auth";
import Admin from "./pages/Admin";

import ManageUsers from "./pages/ManageUsers";
import ManageDonations from "./pages/ManageDonations";
import ManageAnnouncements from "./pages/ManageAnnouncements";
import ManageEvents from "./pages/ManageEvents";
import ManageGallery from "./pages/ManageGallery"; // ✅ ADD

import PrivateRoute from "./components/PrivateRoute";

function App() {
  const location = useLocation();

  const hideLayout = location.pathname.startsWith("/auth");

  return (
    <>
      {!hideLayout && <Navbar />}

      <Routes>

        {/* 🌐 PUBLIC */}
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<Events />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/donation" element={<Donation />} />
        <Route path="/atharva" element={<Atharvashirsha />} />
        <Route path="/announcements" element={<Announcements />} />
        <Route path="/mantras" element={<Mantras />} />

        {/* 🔐 AUTH */}
        <Route path="/auth" element={<Auth />} />

        {/* 👑 ADMIN ROOT */}
        <Route
          path="/admin"
          element={
            <PrivateRoute>
              <Admin />
            </PrivateRoute>
          }
        />

        {/* 🔥 ADMIN PAGES */}
        <Route
          path="/admin/users"
          element={
            <PrivateRoute>
              <ManageUsers />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin/donations"
          element={
            <PrivateRoute>
              <ManageDonations />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin/announcements"
          element={
            <PrivateRoute>
              <ManageAnnouncements />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin/events"
          element={
            <PrivateRoute>
              <ManageEvents />
            </PrivateRoute>
          }
        />

        {/* ✅ ONLY ADDITION (BUG FIX) */}
        <Route
          path="/admin/gallery"
          element={
            <PrivateRoute>
              <ManageGallery />
            </PrivateRoute>
          }
        />

        {/* ❌ 404 */}
        <Route
          path="*"
          element={
            <h2 style={{ textAlign: "center", marginTop: "50px" }}>
              404 - Page Not Found ❌
            </h2>
          }
        />

      </Routes>

      {!hideLayout && <Footer />}
    </>
  );
}

export default App;