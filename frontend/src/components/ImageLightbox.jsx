import React, { useState, useEffect } from "react";

const ImageLightbox = ({ isOpen, images = [], currentIndex = 0, onClose, onPrev, onNext }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isOpen) {
      setLoading(true);
      document.body.style.overflow = "hidden"; // Disable scroll when open
    } else {
      document.body.style.overflow = ""; // Re-enable scroll
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen, currentIndex]);

  if (!isOpen || images.length === 0) return null;

  const currentImage = images[currentIndex];
  if (!currentImage) return null;

  const handleOverlayClick = (e) => {
    if (e.target.id === "lightbox-overlay") {
      onClose();
    }
  };

  return (
    <div
      id="lightbox-overlay"
      onClick={handleOverlayClick}
      style={overlayStyle}
    >
      {/* Close Button */}
      <button onClick={onClose} style={closeBtn} title="Close">
        ✕
      </button>

      {/* Navigation Buttons */}
      {images.length > 1 && (
        <>
          <button onClick={onPrev} style={prevBtn} title="Previous">
            ‹
          </button>
          <button onClick={onNext} style={nextBtn} title="Next">
            ›
          </button>
        </>
      )}

      {/* Image Container with Spinner */}
      <div style={mediaContainer}>
        {loading && <div style={spinner} />}
        
        <img
          src={currentImage.imageUrl || currentImage}
          alt={currentImage.title || "Zoomed view"}
          onLoad={() => setLoading(false)}
          style={{
            ...largeImage,
            opacity: loading ? 0 : 1,
            transform: loading ? "scale(0.95)" : "scale(1)"
          }}
        />

        {/* Caption */}
        {!loading && (
          <div style={captionBox}>
            <p style={captionText}>
              {currentImage.title || "Vighnaharta Ganesh Mandal Celebrations"}
            </p>
            <span style={counter}>
              {currentIndex + 1} / {images.length}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

/* Styles */
const overlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(10, 10, 10, 0.95)",
  backdropFilter: "blur(8px)",
  zIndex: 99999,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  animation: "fadeIn 0.25s ease-out"
};

const closeBtn = {
  position: "absolute",
  top: "25px",
  right: "30px",
  background: "none",
  border: "none",
  color: "#fff",
  fontSize: "28px",
  cursor: "pointer",
  zIndex: 100000,
  transition: "0.2s",
  textShadow: "0 2px 8px rgba(0,0,0,0.5)"
};

const prevBtn = {
  position: "absolute",
  left: "30px",
  background: "rgba(255,255,255,0.1)",
  border: "none",
  color: "#fff",
  fontSize: "44px",
  width: "60px",
  height: "60px",
  borderRadius: "50%",
  cursor: "pointer",
  zIndex: 100000,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "0.2s",
  userSelect: "none"
};

const nextBtn = {
  position: "absolute",
  right: "30px",
  background: "rgba(255,255,255,0.1)",
  border: "none",
  color: "#fff",
  fontSize: "44px",
  width: "60px",
  height: "60px",
  borderRadius: "50%",
  cursor: "pointer",
  zIndex: 100000,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "0.2s",
  userSelect: "none"
};

const mediaContainer = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  maxWidth: "85vw",
  maxHeight: "85vh",
  position: "relative"
};

const spinner = {
  width: "50px",
  height: "50px",
  border: "4px solid rgba(255,255,255,0.1)",
  borderTop: "4px solid #ff7a00",
  borderRadius: "50%",
  animation: "spin 1s linear infinite",
  position: "absolute"
};

const largeImage = {
  maxWidth: "100%",
  maxHeight: "72vh",
  objectFit: "contain",
  borderRadius: "12px",
  boxShadow: "0 20px 50px rgba(0,0,0,0.3)",
  transition: "opacity 0.3s ease, transform 0.3s ease"
};

const captionBox = {
  marginTop: "20px",
  textAlign: "center",
  color: "#fff",
  fontFamily: "'Outfit', 'Inter', sans-serif"
};

const captionText = {
  fontSize: "1.1rem",
  fontWeight: "600",
  margin: "0 0 5px 0",
  textShadow: "0 2px 4px rgba(0,0,0,0.6)"
};

const counter = {
  fontSize: "13px",
  color: "#aaa"
};

export default ImageLightbox;
