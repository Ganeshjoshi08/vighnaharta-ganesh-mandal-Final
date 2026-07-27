import React, { useEffect, useState } from "react";
import API from "../api/api";
import ImageLightbox from "../components/ImageLightbox";

const GalleryCultural = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const lang = localStorage.getItem("lang") || "marathi";
  const isMarathi = lang === "marathi";

  // Lightbox State
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const res = await API.get("/gallery");
      const filtered = res.data.filter(img => img.category === "Cultural Activities");
      setImages(filtered);
    } catch (err) {
      console.log(err.message);
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

  return (
    <div style={container}>
      <header style={header}>
        <h1 style={title}>{isMarathi ? "📸 सांस्कृतिक उपक्रम गॅलरी" : "📸 Cultural Activities Gallery"}</h1>
        <p style={sub}>{isMarathi ? "भजन, कीर्तन, क्रीडा स्पर्धा आणि बालसंस्कार सोहळे" : "Lectures, sports tournaments, bhajan assemblies, and talent contests"}</p>
      </header>

      {loading ? (
        <p style={loadingText}>{isMarathi ? "फोटो लोड होत आहेत..." : "Loading images..."}</p>
      ) : (
        <div>
          {images.length === 0 ? (
            <p style={loadingText}>{isMarathi ? "या गॅलरीमध्ये अद्याप कोणतेही फोटो नाहीत." : "No images in this category yet."}</p>
          ) : (
            <div style={grid}>
              {images.map((img, idx) => (
                <div
                  key={img._id}
                  onClick={() => openLightbox(idx)}
                  style={{ ...card, cursor: "pointer" }}
                >
                  <div style={imgWrapper}>
                    <img src={img.imageUrl} alt={img.title || "gallery"} style={image} />
                  </div>
                  {img.title && <p style={imgTitle}>{img.title}</p>}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Lightbox Pop-up */}
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

/* Styles */
const container = {
  minHeight: "100vh",
  padding: "120px 5vw 60px 5vw",
  background: "#ffffff"
};

const header = {
  textAlign: "center",
  marginBottom: "45px"
};

const title = {
  fontSize: "2.4rem",
  fontWeight: "bold",
  color: "#ff7a00"
};

const sub = {
  fontSize: "1rem",
  color: "#666",
  marginTop: "10px"
};

const loadingText = {
  textAlign: "center",
  fontSize: "1.1rem",
  color: "#666",
  marginTop: "40px"
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
  gap: "25px",
  maxWidth: "1200px",
  margin: "0 auto"
};

const card = {
  background: "#ffffff",
  padding: "12px",
  borderRadius: "12px",
  border: "1px solid #eee",
  boxShadow: "0 4px 12px rgba(0,0,0,0.04)",
  textAlign: "center"
};

const imgWrapper = {
  width: "100%",
  height: "220px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "8px",
  background: "#f9fafb",
  overflow: "hidden"
};

const image = {
  maxWidth: "100%",
  maxHeight: "100%",
  objectFit: "contain"
};

const imgTitle = {
  color: "#333",
  marginTop: "12px",
  fontWeight: "600",
  fontSize: "0.95rem"
};

export default GalleryCultural;
