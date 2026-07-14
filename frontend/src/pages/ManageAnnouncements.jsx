import { useEffect, useState } from "react";
import API from "../api/api";

const ManageAnnouncements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    try {
      const res = await API.get("/announcements");
      setAnnouncements(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleAdd = async () => {
    if (!text) return;

    try {
      await API.post("/announcements", { message: text });
      setText("");
      fetchAnnouncements();
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/announcements/${id}`);
      fetchAnnouncements();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={container}>
      <h1 style={title}>📢 Manage Announcements</h1>

      {/* ADD */}
      <div style={card}>
        <input
          placeholder="Enter announcement"
          value={text}
          onChange={(e) => setText(e.target.value)}
          style={input}
        />
        <button onClick={handleAdd} style={btn}>
          Add
        </button>
      </div>

      {/* LIST */}
      {announcements.length === 0 ? (
        <p style={empty}>No announcements</p>
      ) : (
        <div style={list}>
          {announcements.map((a) => (
            <div key={a._id} style={item}>
              <span style={message}>{a.message}</span>

              <button
                onClick={() => handleDelete(a._id)}
                style={deleteBtn}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

/* ✅ WHITE ADMIN UI */

const container = {
  minHeight: "100vh",
  padding: "30px",
  background: "#f9fafb"
};

const title = {
  color: "#111",
  marginBottom: "20px"
};

const card = {
  display: "flex",
  gap: "10px",
  marginBottom: "20px",
  background: "#ffffff",
  padding: "15px",
  borderRadius: "12px",
  border: "1px solid #eee",
  boxShadow: "0 4px 12px rgba(0,0,0,0.06)"
};

const input = {
  flex: 1,
  padding: "10px",
  borderRadius: "8px",
  border: "1px solid #ddd",
  outline: "none"
};

const btn = {
  padding: "10px 16px",
  borderRadius: "8px",
  background: "linear-gradient(135deg,#ff7a00,#ffb347)",
  color: "#fff",
  border: "none",
  cursor: "pointer",
  fontWeight: "600"
};

const list = {
  display: "flex",
  flexDirection: "column",
  gap: "10px"
};

const item = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  background: "#ffffff",
  padding: "12px 15px",
  borderRadius: "10px",
  border: "1px solid #eee",
  boxShadow: "0 4px 10px rgba(0,0,0,0.05)"
};

const message = {
  color: "#333"
};

const deleteBtn = {
  background: "#ef4444",
  color: "#fff",
  border: "none",
  padding: "6px 12px",
  borderRadius: "6px",
  cursor: "pointer"
};

const empty = {
  color: "#666"
};

export default ManageAnnouncements;