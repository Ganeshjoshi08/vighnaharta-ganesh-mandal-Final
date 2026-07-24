import { useEffect, useState } from "react";
import API from "../api/api";

const ManageEvents = () => {
  const [events, setEvents] = useState([]);
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    title: "",
    description: "",
    date: ""
  });

  useEffect(() => {
    fetchEvents();
    fetchRegistrations();
  }, []);

  //--------------------------------------------------
  // 📥 FETCH EVENTS
  //--------------------------------------------------
  const fetchEvents = async () => {
    try {
      const res = await API.get("/admin/events");
      setEvents(res.data.events || res.data);
    } catch (err) {
      console.log("FETCH ERROR:", err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  //--------------------------------------------------
  // 📥 FETCH REGISTRATIONS
  //--------------------------------------------------
  const fetchRegistrations = async () => {
    try {
      const res = await API.get("/admin/registrations");
      setRegistrations(res.data || []);
    } catch (err) {
      console.log("FETCH REGISTRATIONS ERROR:", err.response?.data || err.message);
    }
  };

  //--------------------------------------------------
  // ➕ ADD EVENT
  //--------------------------------------------------
  const handleAdd = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        title: form.title.trim(),
        description: form.description.trim(),
        date: new Date(form.date).toISOString()
      };

      const res = await API.post("/admin/events", payload);

      alert(res.data.msg || "Event added 🎉");

      setForm({
        title: "",
        description: "",
        date: ""
      });

      fetchEvents();

    } catch (err) {
      console.log("ADD ERROR:", err.response?.data || err.message);
      alert(err.response?.data?.msg || "Error ❌");
    }
  };

  //--------------------------------------------------
  // ❌ DELETE EVENT
  //--------------------------------------------------
  const handleDelete = async (id) => {
    try {
      await API.delete(`/admin/events/${id}`);
      fetchEvents();
    } catch (err) {
      console.log("DELETE ERROR:", err.response?.data || err.message);
    }
  };

  return (
    <div style={container}>
      <h1 style={title}>🎉 Manage Events</h1>

      {/* ➕ ADD EVENT */}
      <form onSubmit={handleAdd} style={card}>
        <input
          placeholder="Event Title"
          value={form.title}
          onChange={(e) =>
            setForm({ ...form, title: e.target.value })
          }
          style={input}
          required
        />

        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) =>
            setForm({ ...form, description: e.target.value })
          }
          style={textarea}
          required
        />

        <input
          type="date"
          value={form.date}
          onChange={(e) =>
            setForm({ ...form, date: e.target.value })
          }
          style={input}
          required
        />

        <button style={btn}>Add Event 🚀</button>
      </form>

      {/* 📋 EVENTS LIST */}
      <div style={list}>
        {loading ? (
          <p style={empty}>Loading...</p>
        ) : events.length === 0 ? (
          <p style={empty}>No events found</p>
        ) : (
          events.map((e) => (
            <div key={e._id} style={eventCard}>
              <h3 style={eventTitle}>{e.title}</h3>
              <p style={desc}>{e.description}</p>

              <p style={date}>
                📅 {new Date(e.date).toLocaleDateString("en-IN")}
              </p>

              <button
                onClick={() => handleDelete(e._id)}
                style={deleteBtn}
              >
                Delete ❌
              </button>
            </div>
          ))
        )}
      </div>

      {/* 📋 EVENT REGISTRATIONS LIST */}
      <div style={{ marginTop: "40px" }}>
        <h2 style={title}>🎫 Devotee Event Registrations</h2>
        <div style={tableWrapper}>
          <table style={table}>
            <thead>
              <tr>
                <th style={th}>#</th>
                <th style={th}>Devotee Name</th>
                <th style={th}>Contact</th>
                <th style={th}>Competition</th>
                <th style={th}>Ticket ID</th>
                <th style={th}>Registration Date</th>
              </tr>
            </thead>
            <tbody>
              {registrations.length === 0 ? (
                <tr>
                  <td colSpan="6" style={noData}>
                    No registrations found
                  </td>
                </tr>
              ) : (
                registrations.map((reg, i) => (
                  <tr key={reg._id || i}>
                    <td style={td}>{i + 1}</td>
                    <td style={td}>{reg.fullName}</td>
                    <td style={td}>{reg.contactNumber}</td>
                    <td style={td}>{reg.competition}</td>
                    <td style={{ ...td, fontWeight: "bold", color: "#ff7a00" }}>{reg.ticketId}</td>
                    <td style={td}>
                      {new Date(reg.createdAt).toLocaleDateString("en-IN")}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

/* ✅ WHITE ADMIN STYLE */

const container = {
  minHeight: "100vh",
  padding: "30px",
  background: "#f9fafb"
};

const title = {
  marginBottom: "20px",
  color: "#111"
};

const card = {
  background: "#ffffff",
  padding: "20px",
  borderRadius: "12px",
  marginBottom: "20px",
  border: "1px solid #eee",
  boxShadow: "0 4px 12px rgba(0,0,0,0.06)"
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
  background: "linear-gradient(135deg,#ff7a00,#ff3c00)",
  color: "#fff",
  border: "none",
  borderRadius: "999px",
  cursor: "pointer",
  fontWeight: "600",
  marginBottom: "20px"
};

const list = {
  display: "grid",
  gap: "15px"
};

const eventCard = {
  background: "#ffffff",
  padding: "15px",
  borderRadius: "10px",
  border: "1px solid #eee",
  boxShadow: "0 4px 10px rgba(0,0,0,0.05)"
};

const eventTitle = {
  color: "#ff7a00"
};

const desc = {
  color: "#444"
};

const date = {
  color: "#777",
  marginTop: "5px"
};

const deleteBtn = {
  marginTop: "10px",
  background: "#ef4444",
  border: "none",
  padding: "8px 12px",
  borderRadius: "6px",
  color: "#fff",
  cursor: "pointer"
};

const empty = {
  color: "#666"
};

const tableWrapper = {
  overflowX: "auto",
  background: "#ffffff",
  borderRadius: "12px",
  padding: "15px",
  border: "1px solid #eee",
  boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
  marginTop: "15px"
};

const table = {
  width: "100%",
  borderCollapse: "collapse"
};

const th = {
  padding: "12px",
  textAlign: "left",
  borderBottom: "2px solid #eee",
  color: "#ff7a00"
};

const td = {
  padding: "12px",
  borderBottom: "1px solid #eee",
  color: "#444"
};

const noData = {
  textAlign: "center",
  padding: "20px",
  color: "#666"
};

export default ManageEvents;