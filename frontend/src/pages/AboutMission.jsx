import React, { useEffect } from "react";

const AboutMission = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const lang = localStorage.getItem("lang") || "marathi";
  const isMarathi = lang === "marathi";

  return (
    <div style={container}>
      
      {/* HEADER SECTION */}
      <header style={headerSection}>
        <span style={subtitleStyle}>{isMarathi ? "आमचा संकल्प" : "OUR RESOLVE"}</span>
        <h1 style={mainTitle}>
          {isMarathi ? "ध्येय आणि उद्दिष्टे" : "Vision & Mission"}
        </h1>
        <div style={divider}>🔸</div>
      </header>

      {/* TWO COLUMN GRID FOR VISION & MISSION */}
      <div style={grid} className="about-mission-grid">
        
        {/* VISION BLOCK */}
        <div style={card}>
          <div style={iconHeader}>
            <span className="material-symbols-outlined" style={iconStyle}>visibility</span>
            <h2 style={cardTitle}>{isMarathi ? "ध्येय (Our Vision)" : "Our Vision"}</h2>
          </div>
          <p style={cardText}>
            {isMarathi
              ? "आमचे ध्येय पारंपारिक आणि नाविन्यपूर्ण पद्धतींच्या मिलाफाने गणेशोत्सव साजरा करणे आहे. शाश्वत पद्धती, तांत्रिक प्रगती आणि सर्वसमावेशक सहभागाच्या माध्यमातून बाप्पाची सेवा करतानाच समाजाचा विकास करणे हे आमचे उद्दिष्ट आहे. आधुनिक उपायांद्वारे सांस्कृतिक उत्सवांचे सौंदर्य कसे वाढवता येऊ शकते आणि पर्यावरण रक्षण व सामाजिक जबाबदारी कशी पार पाडली जाऊ शकते, याचे एक आदर्श उदाहरण आम्हाला निर्माण करायचे आहे."
              : "Our vision is to celebrate Ganpati Utsav with a mixture of tradition and innovation, developing a community that honors Ganpati Bappa through sustainable practices, technological advancements, and inclusive participation. We aspire to lead by example, showcasing how modern solutions can enhance cultural festivities while protecting our environment, promoting social responsibility, and creating a connected society."}
          </p>
        </div>

        {/* MISSION BLOCK */}
        <div style={card}>
          <div style={iconHeader}>
            <span className="material-symbols-outlined" style={iconStyle}>flag</span>
            <h2 style={cardTitle}>{isMarathi ? "उद्दिष्ट (Our Mission)" : "Our Mission"}</h2>
          </div>
          <p style={cardText}>
            {isMarathi
              ? "आमचे उद्दिष्ट पारंपारिक मूल्यांचा आदर राखून नवीन, पर्यावरणपूरक आणि सर्वसमावेशक पद्धतींनी गणेशोत्सवाचे आयोजन करणे आहे. एक बळकट समाज निर्माण करणे, पर्यावरणाची काळजी घेणे आणि उत्सवाला शाश्वत बनवण्यासाठी आधुनिक तंत्रज्ञानाचा वापर करणे ही आमची उद्दिष्टे आहेत. समाजाला जबाबदार आणि आनंददायी उत्सवांसाठी प्रेरित करणे हे आमचे ध्येय आहे."
              : "Our mission is to organize and celebrate Ganpati Utsav by respecting traditions and incorporating new, eco-friendly, and inclusive practices. We aim to build a strong community, care for the environment, and use modern technology to make the festival meaningful and sustainable. We strive to inspire others and set an example for responsible and joyful celebrations."}
          </p>
        </div>

      </div>

      {/* FOOTER SECTION */}
      <footer style={footerStyle}>
        <h3 style={footerLogo}>{isMarathi ? "श्री गणेश मंडळ" : "Shri Ganesh Mandal"}</h3>
        <p style={copyright}>
          © 2026 {isMarathi ? "श्री गणेश मंडळ" : "Shri Ganesh Mandal"}. All Rights Reserved. Developed by Ganesh Joshi
        </p>
      </footer>

    </div>
  );
};

/* Styles */
const container = {
  minHeight: "100vh",
  padding: "120px 0 0 0",
  background: "#ffffff",
  color: "#333333",
  fontFamily: "var(--font-headline-md)",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between"
};

const headerSection = {
  textAlign: "center",
  marginBottom: "40px",
  padding: "0 20px"
};

const subtitleStyle = {
  fontSize: "0.85rem",
  fontWeight: "bold",
  color: "#a0522d",
  letterSpacing: "2px"
};

const mainTitle = {
  fontSize: "2.6rem",
  fontWeight: "bold",
  color: "#b22222",
  marginTop: "10px"
};

const divider = {
  marginTop: "12px",
  color: "#e0d5c1"
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
  gap: "40px",
  maxWidth: "1200px",
  margin: "0 auto 80px auto",
  padding: "0 20px",
  alignItems: "start"
};

const card = {
  background: "#fdfcf9",
  border: "1px solid #ebdcb9",
  borderRadius: "12px",
  padding: "40px 30px",
  boxShadow: "0 6px 18px rgba(0,0,0,0.03)",
  display: "flex",
  flexDirection: "column",
  gap: "20px"
};

const iconHeader = {
  display: "flex",
  alignItems: "center",
  gap: "15px",
  borderBottom: "2px solid #ebdcb9",
  paddingBottom: "15px"
};

const iconStyle = {
  fontSize: "2.5rem",
  color: "#d84315"
};

const cardTitle = {
  fontSize: "1.6rem",
  fontWeight: "bold",
  color: "#a0522d",
  margin: "0"
};

const cardText = {
  fontSize: "1.05rem",
  lineHeight: "1.8",
  color: "#444444",
  margin: "0",
  textAlign: "justify"
};

const footerStyle = {
  background: "#1c2010",
  color: "#8d6e63",
  padding: "40px 20px",
  textAlign: "center",
  marginTop: "auto"
};

const footerLogo = {
  fontSize: "1.3rem",
  fontWeight: "bold",
  color: "#FAF7E6",
  margin: "0 0 10px 0"
};

const copyright = {
  fontSize: "0.8rem",
  color: "#705d56",
  margin: "0"
};

export default AboutMission;
