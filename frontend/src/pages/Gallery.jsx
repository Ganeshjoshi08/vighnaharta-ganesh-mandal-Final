import React, { useEffect, useState } from "react";
import API from "../api/api";
import aboutGanesha from "../assets/about_ganesha.jpg";
import ImageLightbox from "../components/ImageLightbox";

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lang, setLang] = useState(localStorage.getItem("lang") || "marathi");

  // Lightbox State
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const res = await API.get("/gallery");
      setImages([
        { _id: "local_ganesha", imageUrl: aboutGanesha, title: lang === "english" ? "Shree Vighnaharta Ganesha Murti" : "श्री विघ्नहर्ता गणेश मूर्ती" },
        ...res.data
      ]);
    } catch (err) {
      console.log(err.response?.data || err.message);
      setImages([
        { _id: "local_ganesha", imageUrl: aboutGanesha, title: lang === "english" ? "Shree Vighnaharta Ganesha Murti" : "श्री विघ्नहर्ता गणेश मूर्ती" }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const openLightbox = (index) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const handlePrev = () => {
    setLightboxIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setLightboxIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const text = {
    marathi: {
      title: "📸 गॅलरी",
      loading: "फोटो लोड होत आहेत...",
      noImages: "कोणतेही फोटो उपलब्ध नाहीत"
    },
    english: {
      title: "📸 Gallery",
      loading: "Loading images...",
      noImages: "No images available"
    }
  };

  return (
    <div style={container}>
      <h1 style={title}>{text[lang].title}</h1>

      {loading ? (
        <p style={loadingText}>{text[lang].loading}</p>
      ) : (
        <div style={grid}>
          {images.length === 0 ? (
            <p style={loadingText}>{text[lang].noImages}</p>
          ) : (
            images.map((img, idx) => (
              <div
                key={img._id}
                onClick={() => openLightbox(idx)}
                style={card}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-6px)";
                  e.currentTarget.style.boxShadow =
                    "0 10px 25px rgba(0,0,0,0.08)";
                  e.currentTarget.children[0].style.transform = "scale(1.05)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 4px 12px rgba(0,0,0,0.06)";
                  e.currentTarget.children[0].style.transform = "scale(1)";
                }}
              >
                {/* 🔥 FIXED WRAPPER */}
                <div style={imgWrapper}>
                  <img
                    src={img.imageUrl}
                    alt={img.title || "gallery"}
                    style={image}
                  />
                </div>

                {img.title && (
                  <p style={imgTitle}>{img.title}</p>
                )}
              </div>
            ))
          )}
        </div>
      )}

      {/* Fullscreen Image Lightbox Pop-up */}
      <ImageLightbox
        isOpen={lightboxOpen}
        images={images}
        currentIndex={lightboxIndex}
        onClose={() => setLightboxOpen(false)}
        onPrev={handlePrev}
        onNext={handleNext}
      />
    </div>
  );
};

/* ✅ WHITE THEME */

const container = {
  minHeight: "100vh",
  padding: "40px 5vw",
  background: "#f9fafb"
};

const title = {
  color: "#111",
  textAlign: "center",
  marginBottom: "30px"
};

const loadingText = {
  color: "#666",
  textAlign: "center"
};

/* 🔥 GRID */
const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: "20px"
};

const card = {
  borderRadius: "14px",
  cursor: "pointer",
  background: "#ffffff",
  border: "1px solid #eee",
  boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
  transition: "0.3s",
  padding: "10px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between"
};

/* 🔥 FINAL WRAPPER FIX */
const imgWrapper = {
  width: "100%",
  height: "220px",
  display: "flex",                // ✅ center fix
  alignItems: "center",
  justifyContent: "center",
  overflow: "hidden",
  borderRadius: "10px",
  background: "#f3f4f6"          // optional clean bg
};

/* 🔥 FINAL IMAGE FIX */
const image = {
  maxWidth: "100%",
  maxHeight: "100%",
  objectFit: "contain",          // ✅ FULL IMAGE (NO CUT)
  transition: "0.3s"
};

const imgTitle = {
  color: "#333",
  padding: "10px",
  fontSize: "14px",
  textAlign: "center"
};

export default Gallery;