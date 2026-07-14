import { useState, useEffect } from "react";
import API from "../api/api";
import { Link, useLocation } from "react-router-dom";

const Admin = () => {
  const location = useLocation();

  const [event, setEvent] = useState({
    title: "",
    description: "",
    date: ""
  });

  const [users, setUsers] = useState([]);
  const [donations, setDonations] = useState([]);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const u = await API.get("/admin/users");
      const d = await API.get("/admin/donations");
      const e = await API.get("/admin/events");

      setUsers(u.data || []);
      setDonations(d.data || []);
      setEvents(e.data?.events || e.data || []);

    } catch (err) {
      console.log("FETCH ERROR:", err.response?.data || err.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        title: event.title.trim(),
        description: event.description.trim(),
        date: new Date(event.date).toISOString()
      };

      const res = await API.post("/admin/events", payload);

      alert(res.data.msg || "Event Added 🎉");

      setEvent({ title: "", description: "", date: "" });
      fetchData();

    } catch (err) {
      console.log("ADD ERROR:", err.response?.data || err.message);
      alert(err.response?.data?.msg || "Error ❌");
    }
  };

  const isActive = (path) =>
    location.pathname === path ? activeLink : link;

  return (
    <div style={wrapper}>

      {/* SIDEBAR (UNCHANGED DARK) */}
      <div style={sidebar}>
        <h2 style={{ color: "#ff7a00" }}>Admin Panel</h2>

        <Link to="/admin" style={isActive("/admin")}>Dashboard</Link>
        <Link to="/admin/events" style={isActive("/admin/events")}>Manage Events</Link>
        <Link to="/admin/gallery" style={isActive("/admin/gallery")}>📸 Manage Gallery</Link>
        <Link to="/admin/announcements" style={isActive("/admin/announcements")}>Announcements</Link>
        <Link to="/admin/donations" style={isActive("/admin/donations")}>Donations</Link>
        <Link to="/admin/users" style={isActive("/admin/users")}>Users</Link>
      </div>

      {/* MAIN WHITE AREA */}
      <div style={main}>

        <h1 style={title}>⚙️ Admin Dashboard</h1>

        {/* STATS */}
        <div style={statsContainer}>
          <div style={statCard}>👤 {users.length} Users</div>
          <div style={statCard}>💰 {donations.length} Donations</div>
          <div style={statCard}>🎉 {events.length} Events</div>
        </div>

        {/* ADD EVENT */}
        <div style={card}>
          <h2 style={sectionTitle}>Add Event</h2>

          <form onSubmit={handleSubmit}>
            <input
              placeholder="Event Title"
              style={input}
              value={event.title}
              onChange={(e) =>
                setEvent({ ...event, title: e.target.value })
              }
              required
            />

            <textarea
              placeholder="Event Description"
              style={textarea}
              value={event.description}
              onChange={(e) =>
                setEvent({ ...event, description: e.target.value })
              }
              required
            />

            <input
              type="date"
              style={input}
              value={event.date}
              onChange={(e) =>
                setEvent({ ...event, date: e.target.value })
              }
              required
            />

            <button style={btn}>Add Event 🚀</button>
          </form>
        </div>

        {/* EVENTS */}
        <div style={dataCard}>
          <h2 style={sectionTitle}>🎉 Events</h2>

          {events.length === 0 ? (
            <p style={{ color: "#666" }}>No events</p>
          ) : (
            events.map((e) => (
              <p key={e._id} style={{ color: "#444" }}>
                {e.title} -{" "}
                {new Date(e.date).toLocaleDateString("en-IN")}
              </p>
            ))
          )}
        </div>

      </div>
    </div>
  );
};

/* ✅ HYBRID UI */

const wrapper = {
  display: "flex",
  minHeight: "100vh",
  background: "#f9fafb"
};

/* SIDEBAR DARK */
const sidebar = {
  width: "230px",
  background: "#020617",
  padding: "20px",
  borderRight: "1px solid rgba(255,255,255,0.1)"
};

const link = {
  display: "block",
  margin: "12px 0",
  color: "#aaa",
  textDecoration: "none",
  padding: "10px",
  borderRadius: "8px",
  transition: "0.3s"
};

const activeLink = {
  ...link,
  color: "#ff7a00",
  background: "rgba(255,122,0,0.1)",
  borderLeft: "3px solid #ff7a00"
};

/* MAIN WHITE */
const main = {
  flex: 1,
  padding: "30px"
};

const title = {
  color: "#111",
  marginBottom: "20px"
};

const statsContainer = {
  display: "flex",
  gap: "20px",
  marginBottom: "20px"
};

const statCard = {
  flex: 1,
  padding: "20px",
  borderRadius: "12px",
  background: "#ffffff",
  border: "1px solid #eee",
  boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
  textAlign: "center",
  color: "#333"
};

const card = {
  background: "#ffffff",
  padding: "20px",
  borderRadius: "12px",
  marginBottom: "20px",
  border: "1px solid #eee",
  boxShadow: "0 4px 12px rgba(0,0,0,0.06)"
};

const sectionTitle = {
  color: "#ff7a00",
  marginBottom: "10px"
};

const input = {
  width: "100%",
  padding: "10px",
  margin: "10px 0",
  borderRadius: "8px",
  border: "1px solid #ddd",
  background: "#fff",
  color: "#333",
  outline: "none"
};

const textarea = {
  ...input,
  height: "100px"
};

const btn = {
  width: "100%",
  padding: "12px",
  background: "linear-gradient(135deg,#ff7a00,#ffb347)",
  color: "#fff",
  border: "none",
  borderRadius: "999px",
  cursor: "pointer",
  fontWeight: "600"
};

const dataCard = {
  background: "#ffffff",
  padding: "20px",
  marginBottom: "20px",
  borderRadius: "12px",
  border: "1px solid #eee",
  boxShadow: "0 4px 12px rgba(0,0,0,0.06)"
};

export default Admin;