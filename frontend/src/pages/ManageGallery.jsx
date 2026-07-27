import React, { useEffect, useState } from "react";
import API from "../api/api";

const ManageGallery = () => {
  const [images, setImages] = useState([]);
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Smart Ganesh Utsav");
  const [order, setOrder] = useState(0);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const res = await API.get("/gallery");
      setImages(res.data);
    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!file) return alert("Image select kar bhai 😑");

    const formData = new FormData();
    formData.append("image", file);
    formData.append("title", title);
    formData.append("category", category);
    formData.append("order", order);

    const token = localStorage.getItem("token");

    try {
      await API.post("/gallery", formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      alert("✅ Image uploaded");
      setFile(null);
      setTitle("");
      setOrder(0);
      fetchImages();

    } catch (err) {
      console.log(err.response?.data || err.message);
      alert(err.response?.data?.msg || "Upload failed ❌");
    }
  };

  const handleOrderUpdate = async (id, newOrder) => {
    const token = localStorage.getItem("token");
    try {
      await API.put(`/gallery/${id}`, { order: newOrder }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      fetchImages();
    } catch (err) {
      console.log(err.response?.data || err.message);
      alert("Order update failed ❌");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete kare?")) return;

    const token = localStorage.getItem("token");

    try {
      await API.delete(`/gallery/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      fetchImages();
    } catch (err) {
      console.log(err.response?.data || err.message);
      alert("Delete failed ❌");
    }
  };

  return (
    <div style={container}>
      <h1 style={titleStyle}>📸 Manage Gallery</h1>

      <form onSubmit={handleUpload} style={form}>
        <input
          type="text"
          placeholder="Image title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={input}
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={selectStyle}
        >
          <option value="Smart Ganesh Utsav">Smart Ganesh Utsav</option>
          <option value="Religious Activities">Religious Activities</option>
          <option value="Social Activities">Social Activities</option>
          <option value="Cultural Activities">Cultural Activities</option>
          <option value="Press Coverage">Press Coverage</option>
        </select>

        <input
          type="number"
          placeholder="Display Order"
          value={order}
          onChange={(e) => setOrder(Number(e.target.value) || 0)}
          style={orderInputForm}
        />

        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          style={input}
        />

        <button type="submit" style={btn}>Upload</button>
      </form>

      <div style={grid}>
        {images.map((img) => (
          <div key={img._id} style={card}>
            
            {/* 🔥 FIXED WRAPPER */}
            <div style={imgWrapper}>
              <img src={img.imageUrl} style={image} />
            </div>
            {img.title && (
              <p style={imgTitle}>{img.title}</p>
            )}

            <div style={badgeAndOrderRow}>
              {img.category && (
                <span className="inline-block text-[10px] bg-primary/10 text-primary font-bold px-2 py-0.5 rounded">
                  {img.category}
                </span>
              )}

              {/* display order input updates on blur */}
              <div style={orderEditBox}>
                <span style={orderLabel}>Order:</span>
                <input
                  type="number"
                  defaultValue={img.order || 0}
                  onBlur={(e) => handleOrderUpdate(img._id, Number(e.target.value) || 0)}
                  style={orderInputItem}
                />
              </div>
            </div>

            <button
              onClick={() => handleDelete(img._id)}
              style={deleteBtn}
            >
              Delete
            </button>
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
  background: "#f9fafb"
};

const titleStyle = {
  color: "#111",
  textAlign: "center",
  marginBottom: "20px"
};

const form = {
  display: "flex",
  gap: "10px",
  justifyContent: "center",
  marginBottom: "30px",
  flexWrap: "wrap",
  background: "#ffffff",
  padding: "15px",
  borderRadius: "12px",
  border: "1px solid #eee",
  boxShadow: "0 4px 12px rgba(0,0,0,0.06)"
};

const input = {
  padding: "10px",
  borderRadius: "8px",
  border: "1px solid #ddd",
  outline: "none"
};

const selectStyle = {
  padding: "10px",
  borderRadius: "8px",
  border: "1px solid #ddd",
  outline: "none",
  background: "#fff"
};

const orderInputForm = {
  width: "120px",
  padding: "10px",
  borderRadius: "8px",
  border: "1px solid #ddd",
  outline: "none"
};

const btn = {
  background: "linear-gradient(135deg,#ff7a00,#ff3c00)",
  color: "#fff",
  padding: "10px 20px",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "600"
};

const deleteBtn = {
  background: "#ef4444",
  color: "#fff",
  border: "none",
  padding: "6px 12px",
  marginTop: "12px",
  borderRadius: "6px",
  cursor: "pointer",
  width: "100%"
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
  gap: "20px"
};

const card = {
  background: "#ffffff",
  padding: "12px",
  borderRadius: "10px",
  textAlign: "center",
  border: "1px solid #eee",
  boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between"
};

const imgWrapper = {
  width: "100%",
  height: "200px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "10px",
  background: "#f3f4f6"
};

const image = {
  maxWidth: "100%",
  maxHeight: "100%",
  objectFit: "contain"
};

const imgTitle = {
  color: "#333",
  marginTop: "8px",
  fontSize: "14px",
  fontWeight: "600"
};

const badgeAndOrderRow = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  marginTop: "12px",
  gap: "8px"
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

export default ManageGallery;