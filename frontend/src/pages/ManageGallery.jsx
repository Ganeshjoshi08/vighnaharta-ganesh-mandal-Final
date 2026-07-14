import React, { useEffect, useState } from "react";
import API from "../api/api";

const ManageGallery = () => {
  const [images, setImages] = useState([]);
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");

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
      fetchImages();

    } catch (err) {
      console.log(err.response?.data || err.message);
      alert(err.response?.data?.msg || "Upload failed ❌");
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

            <p style={imgTitle}>{img.title}</p>

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
  padding: "30px",
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
  marginTop: "10px",
  borderRadius: "6px",
  cursor: "pointer"
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: "20px"
};

const card = {
  background: "#ffffff",
  padding: "10px",
  borderRadius: "10px",
  textAlign: "center",
  border: "1px solid #eee",
  boxShadow: "0 4px 10px rgba(0,0,0,0.05)"
};

/* 🔥 FINAL FIX */
const imgWrapper = {
  width: "100%",
  height: "200px",
  display: "flex",              // ✅ center fix
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "10px",
  background: "#f3f4f6"
};

const image = {
  maxWidth: "100%",
  maxHeight: "100%",
  objectFit: "contain"          // ✅ FULL IMAGE (NO CUT)
};

const imgTitle = {
  color: "#333",
  marginTop: "8px"
};

export default ManageGallery;