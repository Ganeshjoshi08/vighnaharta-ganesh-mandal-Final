import React, { useEffect, useState } from "react";
import API from "../api/api";

const ManageActivities = () => {
  const [activities, setActivities] = useState([]);
  const [file, setFile] = useState(null);
  
  // Form fields
  const [title, setTitle] = useState("");
  const [titleEn, setTitleEn] = useState("");
  const [tag, setTag] = useState("");
  const [tagEn, setTagEn] = useState("");
  const [description, setDescription] = useState("");
  const [descriptionEn, setDescriptionEn] = useState("");
  const [order, setOrder] = useState(0);

  useEffect(() => {
    fetchActivities();
  }, []);

  const fetchActivities = async () => {
    try {
      const res = await API.get("/activities");
      setActivities(res.data);
    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!file) return alert("Select an image first 😑");
    if (!title) return alert("Marathi Title is required ❌");

    const formData = new FormData();
    formData.append("image", file);
    formData.append("title", title);
    formData.append("titleEn", titleEn);
    formData.append("tag", tag);
    formData.append("tagEn", tagEn);
    formData.append("description", description);
    formData.append("descriptionEn", descriptionEn);
    formData.append("order", order);

    const token = localStorage.getItem("token");

    try {
      await API.post("/activities", formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      alert("✅ Activity uploaded successfully");
      setFile(null);
      setTitle("");
      setTitleEn("");
      setTag("");
      setTagEn("");
      setDescription("");
      setDescriptionEn("");
      setOrder(0);
      fetchActivities();

    } catch (err) {
      console.log(err.response?.data || err.message);
      alert(err.response?.data?.msg || "Upload failed ❌");
    }
  };

  const handleOrderUpdate = async (id, newOrder) => {
    const token = localStorage.getItem("token");
    try {
      await API.put(`/activities/${id}`, { order: newOrder }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      fetchActivities();
    } catch (err) {
      console.log(err.response?.data || err.message);
      alert("Order update failed ❌");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this activity?")) return;

    const token = localStorage.getItem("token");

    try {
      await API.delete(`/activities/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      fetchActivities();
    } catch (err) {
      console.log(err.response?.data || err.message);
      alert("Delete failed ❌");
    }
  };

  return (
    <div style={container}>
      <h1 style={titleStyle}>🎯 Manage Social & Cultural Activities</h1>

      <form onSubmit={handleUpload} style={form}>
        <div style={formGrid}>
          {/* Marathi Inputs */}
          <div style={formColumn}>
            <h3 style={sectionHeading}>मराठी माहिती (Marathi Details)</h3>
            <input
              type="text"
              placeholder="शीर्षक (Title - e.g. रक्तदान शिबिर)"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={input}
              required
            />
            <input
              type="text"
              placeholder="टॅग (Tag - e.g. सेवा)"
              value={tag}
              onChange={(e) => setTag(e.target.value)}
              style={input}
            />
            <textarea
              placeholder="सविस्तर माहिती (Description)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              style={textarea}
              rows={4}
            />
          </div>

          {/* English Inputs */}
          <div style={formColumn}>
            <h3 style={sectionHeading}>English Details (Optional)</h3>
            <input
              type="text"
              placeholder="English Title"
              value={titleEn}
              onChange={(e) => setTitleEn(e.target.value)}
              style={input}
            />
            <input
              type="text"
              placeholder="English Tag (e.g. Service)"
              value={tagEn}
              onChange={(e) => setTagEn(e.target.value)}
              style={input}
            />
            <textarea
              placeholder="English Description"
              value={descriptionEn}
              onChange={(e) => setDescriptionEn(e.target.value)}
              style={textarea}
              rows={4}
            />
          </div>
        </div>

        <div style={bottomControls}>
          <div style={controlGroup}>
            <label style={label}>Display Order:</label>
            <input
              type="number"
              placeholder="Order"
              value={order}
              onChange={(e) => setOrder(Number(e.target.value) || 0)}
              style={orderInputForm}
            />
          </div>

          <div style={controlGroup}>
            <label style={label}>Image File:</label>
            <input
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
              style={fileInput}
              required
            />
          </div>

          <button type="submit" style={btn}>Upload Activity</button>
        </div>
      </form>

      <div style={grid}>
        {activities.map((act) => (
          <div key={act._id} style={card}>
            <div style={imgWrapper}>
              <img src={act.imageUrl} style={image} alt={act.title} />
            </div>
            
            <div style={cardContent}>
              <span style={cardTag}>{act.tag || "Activity"}</span>
              <h3 style={cardTitle}>{act.title}</h3>
              {act.titleEn && <p style={cardSubtitle}>{act.titleEn}</p>}
              <p style={cardDesc}>{act.description}</p>
            </div>

            <div style={badgeAndOrderRow}>
              <div style={orderEditBox}>
                <span style={orderLabel}>Order:</span>
                <input
                  type="number"
                  defaultValue={act.order || 0}
                  onBlur={(e) => handleOrderUpdate(act._id, Number(e.target.value) || 0)}
                  style={orderInputItem}
                />
              </div>

              <button
                onClick={() => handleDelete(act._id)}
                style={deleteBtn}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ✅ STYLES */

const container = {
  padding: "110px 30px 30px 30px",
  minHeight: "100vh",
  background: "#f9fafb",
  fontFamily: "'Outfit', 'Inter', sans-serif"
};

const titleStyle = {
  color: "#111",
  textAlign: "center",
  marginBottom: "30px",
  fontWeight: "bold",
  fontSize: "2rem"
};

const form = {
  background: "#ffffff",
  padding: "25px",
  borderRadius: "16px",
  border: "1px solid #eee",
  boxShadow: "0 6px 20px rgba(0,0,0,0.05)",
  maxWidth: "900px",
  margin: "0 auto 40px auto",
  display: "flex",
  flexDirection: "column",
  gap: "20px"
};

const formGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
  gap: "25px"
};

const formColumn = {
  display: "flex",
  flexDirection: "column",
  gap: "15px"
};

const sectionHeading = {
  fontSize: "1rem",
  fontWeight: "bold",
  color: "#ff7a00",
  marginBottom: "5px",
  borderBottom: "2px solid #fff5eb",
  paddingBottom: "8px"
};

const input = {
  padding: "10px 14px",
  borderRadius: "8px",
  border: "1px solid #ddd",
  outline: "none",
  fontSize: "14px",
  fontFamily: "inherit"
};

const textarea = {
  padding: "10px 14px",
  borderRadius: "8px",
  border: "1px solid #ddd",
  outline: "none",
  fontSize: "14px",
  resize: "vertical",
  fontFamily: "inherit"
};

const bottomControls = {
  display: "flex",
  gap: "20px",
  flexWrap: "wrap",
  alignItems: "center",
  borderTop: "1px solid #eee",
  paddingTop: "20px"
};

const controlGroup = {
  display: "flex",
  flexDirection: "column",
  gap: "6px"
};

const label = {
  fontSize: "12px",
  fontWeight: "bold",
  color: "#666"
};

const orderInputForm = {
  width: "100px",
  padding: "10px",
  borderRadius: "8px",
  border: "1px solid #ddd",
  outline: "none"
};

const fileInput = {
  fontSize: "14px"
};

const btn = {
  background: "linear-gradient(135deg,#ff7a00,#ff3c00)",
  color: "#fff",
  padding: "12px 24px",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "600",
  marginLeft: "auto",
  alignSelf: "flex-end"
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
  gap: "25px",
  maxWidth: "1100px",
  margin: "0 auto"
};

const card = {
  background: "#ffffff",
  padding: "15px",
  borderRadius: "14px",
  border: "1px solid #eee",
  boxShadow: "0 6px 15px rgba(0,0,0,0.04)",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between"
};

const imgWrapper = {
  width: "100%",
  height: "180px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "10px",
  background: "#f3f4f6",
  overflow: "hidden"
};

const image = {
  width: "100%",
  height: "100%",
  objectFit: "cover"
};

const cardContent = {
  padding: "12px 4px",
  flexGrow: 1
};

const cardTag = {
  fontSize: "10px",
  fontWeight: "extrabold",
  color: "#d84315",
  textTransform: "uppercase",
  letterSpacing: "1px",
  display: "block",
  marginBottom: "4px"
};

const cardTitle = {
  fontSize: "1.2rem",
  fontWeight: "bold",
  color: "#111",
  margin: "0"
};

const cardSubtitle = {
  fontSize: "13px",
  color: "#666",
  margin: "2px 0 8px 0"
};

const cardDesc = {
  fontSize: "13px",
  lineHeight: "1.6",
  color: "#555",
  textAlign: "justify",
  margin: "0"
};

const badgeAndOrderRow = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  marginTop: "15px",
  borderTop: "1px solid #f5f5f5",
  paddingTop: "12px",
  gap: "10px"
};

const orderEditBox = {
  display: "flex",
  alignItems: "center",
  gap: "5px"
};

const orderLabel = {
  fontSize: "12px",
  fontWeight: "bold",
  color: "#666"
};

const orderInputItem = {
  width: "50px",
  padding: "4px",
  borderRadius: "4px",
  border: "1px solid #ccc",
  textAlign: "center",
  fontSize: "12px",
  outline: "none"
};

const deleteBtn = {
  background: "#ef4444",
  color: "#fff",
  border: "none",
  padding: "6px 14px",
  borderRadius: "6px",
  cursor: "pointer",
  fontSize: "12px",
  fontWeight: "600"
};

export default ManageActivities;
