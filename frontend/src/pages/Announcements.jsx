import { useEffect, useState } from "react";
import API from "../api/api";

const Announcements = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await API.get("/announcements");
      setData(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={container}>
      <h1 style={title}>📢 Announcements</h1>

      {data.length === 0 ? (
        <p style={empty}>No announcements yet</p>
      ) : (
        <div style={list}>
          {data.map((a) => (
            <div key={a._id} style={card}>
              <p style={message}>{a.message}</p>

              <small style={date}>
                {new Date(a.createdAt).toLocaleString()}
              </small>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

/* ✅ WHITE UI */

const container = {
  minHeight: "100vh",
  padding: "40px 5vw",
  background: "#f9fafb"
};

const title = {
  color: "#111",
  marginBottom: "25px",
  textAlign: "center"
};

const empty = {
  textAlign: "center",
  color: "#666"
};

const list = {
  maxWidth: "700px",
  margin: "auto",
  display: "flex",
  flexDirection: "column",
  gap: "15px"
};

const card = {
  background: "#ffffff",
  padding: "18px",
  borderRadius: "12px",
  border: "1px solid #eee",
  boxShadow: "0 4px 12px rgba(0,0,0,0.06)"
};

const message = {
  color: "#333",
  marginBottom: "8px"
};

const date = {
  color: "#888",
  fontSize: "12px"
};

export default Announcements;