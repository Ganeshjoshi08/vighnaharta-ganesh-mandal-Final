import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AboutCommittee = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const lang = localStorage.getItem("lang") || "marathi";
  const isMarathi = lang === "marathi";

  // Remaining office bearers (excluding the President who is highlighted at the top)
  const mainBearers = [
    {
      roleMr: "मुख्यसचिव",
      roleEn: "General Secretary",
      nameMr: "कौस्तुभ गुळजकर",
      nameEn: "Kaustubh Gulajkar"
    },
    {
      roleMr: "कार्याध्यक्ष",
      roleEn: "Working President",
      nameMr: "अक्षय कुलकर्णी",
      nameEn: "Akshay Kulkarni"
    },
    {
      roleMr: "उपाध्यक्ष",
      roleEn: "Vice President",
      nameMr: "उमेश कुलकर्णी",
      nameEn: "Umesh Kulkarni"
    },
    {
      roleMr: "उपाध्यक्ष",
      roleEn: "Vice President",
      nameMr: "मयुरेश कव्हाळे",
      nameEn: "Mayuresh Kavhale"
    },
    {
      roleMr: "कोषाध्यक्ष",
      roleEn: "Treasurer",
      nameMr: "गौरव कुलकर्णी",
      nameEn: "Gaurav Kulkarni"
    }
  ];

  const committeeMembers = [
    { roleMr: "सचिव", roleEn: "Secretary", nameMr: "मंदार कुलकर्णी", nameEn: "Mandar Kulkarni" },
    { roleMr: "सचिव", roleEn: "Secretary", nameMr: "गिरीश सेलमोकर", nameEn: "Girish Selmokar" },
    { roleMr: "सहकोषाध्यक्ष", roleEn: "Joint Treasurer", nameMr: "प्रशांत जोतकर", nameEn: "Prashant Jotkar" },
    { roleMr: "विभाग प्रमुख", roleEn: "Dept. Head", nameMr: "श्रेयस आवडाळ", nameEn: "Shreyas Avadal" },
    { roleMr: "माहिती प्रमुख", roleEn: "IT/Info Head", nameMr: "अक्षय अ. कुलकर्णी", nameEn: "Akshay A. Kulkarni" },
    { roleMr: "व्यवस्थापक", roleEn: "Manager", nameMr: "अमोघ बाभुळगावकर", nameEn: "Amogh Babhulgaonkar" },
    { roleMr: "व्यवस्थापक", roleEn: "Manager", nameMr: "सोहम ऋषी", nameEn: "Soham Rishi" },
    { roleMr: "व्यवस्थापक", roleEn: "Manager", nameMr: "सार्थक गोले", nameEn: "Sarthak Gole" },
    { roleMr: "सोशल मीडिया प्रमुख", roleEn: "Social Media Head", nameMr: "गणेश जोशी", nameEn: "Ganesh Joshi" },
    { roleMr: "तंत्रज्ञान मीडिया प्रमुख", roleEn: "Tech Media Head", nameMr: "वरद कुलकर्णी", nameEn: "Varad Kulkarni" },
    { roleMr: "कार्यसेवक", roleEn: "Volunteer Coordinator", nameMr: "सागर जोतकर", nameEn: "Sagar Jotkar" },
    { roleMr: "कार्यसेवक", roleEn: "Volunteer Coordinator", nameMr: "कुणाल कुलकर्णी", nameEn: "Kunnal Kulkarni" },
    { roleMr: "कार्यसेवक", roleEn: "Volunteer Coordinator", nameMr: "यशराज कापसे", nameEn: "Yashraj Kapse" },
    { roleMr: "पुरोहित प्रमुख", roleEn: "Chief Priest", nameMr: "प्रशांत सरवदे", nameEn: "Prashant Sarvade" },
    { roleMr: "समन्वयक", roleEn: "Coordinator", nameMr: "भाग्येश जोशी", nameEn: "Bhagyesh Joshi" }
  ];

  const generalMembers = [
    { nameMr: "मयूर लवांडे", nameEn: "Mayur Lawande" },
    { nameMr: "प्रतीक देशमुख", nameEn: "Pratik Deshmukh" },
    { nameMr: "सुयोग जोशी", nameEn: "Suyog Joshi" },
    { nameMr: "यज्ञेश कुलकर्णी", nameEn: "Yagnesh Kulkarni" },
    { nameMr: "सर्वेश बदलापूरकर", nameEn: "Sarvesh Badlapurkar" },
    { nameMr: "अर्णव पांढरे", nameEn: "Arnav Pandhare" },
    { nameMr: "शंभू पाटील", nameEn: "Shambhu Patil" },
    { nameMr: "समर्थ क्षीरसागर", nameEn: "Samarth Kshirsagar" }
  ];

  return (
    <div style={container}>
      
      {/* HEADER SECTION */}
      <header style={headerSection}>
        <div style={headerFlex}>
          <div style={badgeContainer}>
            <span style={orangeBadgeIcon}>🕉️</span>
          </div>

          <div style={titleCenterBlock}>
            <h1 style={titleTop}>{isMarathi ? "विघ्नहर्ता मित्र मंडळ, बीड" : "Vighnaharta Mitra Mandal, Beed"}</h1>
            <h2 style={titleSub}>{isMarathi ? "॥ कार्यकारिणी २०२६-२०२७ ॥" : "|| Executive Committee 2026-2027 ||"}</h2>
            <div style={omIcon}>ॐ</div>
          </div>

          <div style={medallionContainer}>
            <span style={orangeMedallionText}>ॐ</span>
          </div>
        </div>
      </header>

      {/* HIGHLIGHTED PRESIDENT MESSAGE SECTION */}
      <section style={presidentSection}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 bg-[#fdfcf9] border-2 border-[#ebdcb9] rounded-xl p-8 items-center shadow-md">
          
          {/* President Card Details */}
          <div style={presidentCard}>
            <div style={avatarContainer}>👑</div>
            <span style={bearerRole}>{isMarathi ? "अध्यक्ष" : "President"}</span>
            <h3 style={bearerName}>{isMarathi ? "शुभम (विक्की) जोशी" : "Shubham (Vikki) Joshi"}</h3>
            <div style={goldUnderline} />
          </div>

          {/* President Message Content */}
          <div className="lg:col-span-2 flex flex-col gap-3">
            <h3 style={messageTitle}>
              {isMarathi ? "अध्यक्षांचा संदेश (President’s Message)" : "President’s Message"}
            </h3>
            <p style={messageGreeting}>
              {isMarathi ? "प्रिय भाविक आणि हितचिंतक," : "Dear Devotees & Well-Wishers,"}
            </p>
            <p style={messageBody}>
              {isMarathi
                ? "२०२५ च्या गणेशोत्सवात बाप्पाचे स्वागत करताना, पारंपारिक वारसा आणि आधुनिक तंत्रज्ञान यांचा मिलाफ साधत आमचे मंडळ अभिमानाने मार्गक्रमण करत आहे. आपण सर्वांनी एकत्र येऊन हा उत्सव पर्यावरणपूरक, सामाजिक जबाबदारीने आणि डिजिटल माध्यमांचा वापर करून साजरा करूया. विघ्नहर्ता बाप्पा तुम्हाला आणि तुमच्या कुटुंबाला सुख, समृद्धी आणि आनंद देवो हीच प्रार्थना. गणपती बाप्पा मोरया!"
                : "As we welcome Ganpati Bappa for the 2025 Utsav, our Mandal proudly continues its mission to blend our rich traditions with modern innovations. Together, let us celebrate responsibly: protect nature, uplift society, and embrace technology to connect every devotee. May Bappa bless you and your family with joy and prosperity. Ganpati Bappa Morya!"}
            </p>
            <p style={messageSign}>
              — {isMarathi ? "अध्यक्ष शुभम (विक्की) जोशी" : "President Shubham (Vikki) Joshi"}
            </p>
          </div>

        </div>
      </section>

      {/* SECTION 1: REMAINING MAIN BEARERS */}
      <section style={sectionBlock}>
        <h2 style={sectionHeader}>
          {isMarathi ? "मुख्य पदाधिकारी" : "Main Office Bearers"}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {mainBearers.map((b, idx) => (
            <div key={idx} style={bearerCard}>
              <span style={bearerRole}>{isMarathi ? b.roleMr : b.roleEn}</span>
              <h3 style={bearerName}>{isMarathi ? b.nameMr : b.nameEn}</h3>
              <div style={goldUnderline} />
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 2: EXECUTIVE COMMITTEE MEMBERS */}
      <section style={sectionBlock}>
        <h2 style={sectionHeader}>
          {isMarathi ? "कार्यकारिणी समिती सदस्य" : "Executive Committee Members"}
        </h2>
        <div style={membersGrid}>
          {committeeMembers.map((m, idx) => (
            <div key={idx} style={memberCard}>
              <span style={memberRole}>{isMarathi ? m.roleMr : m.roleEn}</span>
              <h4 style={memberName}>{isMarathi ? m.nameMr : m.nameEn}</h4>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 3: GENERAL MEMBERS CONTAINER */}
      <section style={sectionBlock}>
        <div style={generalContainer}>
          <h2 style={generalHeader}>
            {isMarathi ? "समिती सदस्य" : "Committee Members"}
          </h2>
          <div style={generalGrid}>
            {generalMembers.map((g, idx) => (
              <div key={idx} style={generalCard}>
                <span style={generalName}>{isMarathi ? g.nameMr : g.nameEn}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: SLOGAN QUOTE */}
      <div style={sloganBlock}>
        <p style={sloganText}>
          {isMarathi
            ? `"भक्ती, शक्ती आणि युक्तीचा संगम - आमची ताकद आमचा विश्वास!"`
            : `"The Union of Devotion, Strength, and Wisdom - Our Strength, Our Faith!"`}
        </p>
      </div>

      {/* FOOTER SECTION */}
      <footer style={footerStyle}>
        <div style={footerContent}>
          <div style={footerLeft}>
            <h3 style={footerLogo}>{isMarathi ? "Ganesh Mandal" : "Ganesh Mandal"}</h3>
            <p style={footerCopyright}>
              © 2026 Ganesh Mandal. All Rights Reserved. Traditionally Crafted for the Divine.
            </p>
          </div>
          <div style={footerRight}>
            <a href="#" style={footerLink}>{isMarathi ? "Privacy Policy" : "Privacy Policy"}</a>
            <a href="#" style={footerLink}>{isMarathi ? "Terms of Service" : "Terms of Service"}</a>
            <a href="#" onClick={() => navigate("/events")} style={footerLink}>{isMarathi ? "Volunteer Signup" : "Volunteer Signup"}</a>
            <a href="#" onClick={() => navigate("/donation")} style={footerLink}>{isMarathi ? "Live Stream" : "Live Stream"}</a>
            <a href="#" style={footerLink}>{isMarathi ? "Aarti Timings" : "Aarti Timings"}</a>
          </div>
        </div>
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
  fontFamily: "var(--font-headline-md)"
};

const headerSection = {
  maxWidth: "1200px",
  margin: "0 auto 40px auto",
  padding: "0 20px"
};

const headerFlex = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "20px",
  flexWrap: "wrap"
};

const badgeContainer = {
  width: "80px",
  height: "100px",
  background: "#faf8f2",
  border: "1px solid #e0d5c1",
  borderRadius: "8px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
};

const orangeBadgeIcon = {
  fontSize: "2rem"
};

const titleCenterBlock = {
  textAlign: "center",
  flex: "1",
  minWidth: "280px"
};

const titleTop = {
  fontSize: "2.3rem",
  fontWeight: "bold",
  color: "#a0522d",
  margin: "0"
};

const titleSub = {
  fontSize: "1.4rem",
  fontWeight: "bold",
  color: "#333",
  marginTop: "5px"
};

const omIcon = {
  color: "#9c27b0",
  fontSize: "1.6rem",
  margin: "8px 0 0 0"
};

const medallionContainer = {
  width: "80px",
  height: "80px",
  borderRadius: "50%",
  background: "#faf8f2",
  border: "1px solid #e0d5c1",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
};

const orangeMedallionText = {
  fontSize: "1.8rem",
  color: "#d84315",
  fontWeight: "bold"
};

const presidentSection = {
  maxWidth: "1200px",
  margin: "0 auto 50px auto",
  padding: "0 20px"
};

const presidentGrid = {
  display: "grid",
  gridTemplateColumns: "1fr 2fr",
  gap: "40px",
  background: "#fdfcf9",
  border: "2px solid #ebdcb9",
  borderRadius: "12px",
  padding: "30px",
  alignItems: "center",
  boxShadow: "0 6px 18px rgba(0,0,0,0.04)"
};

// Responsive override handled through grid wrap behaviors natively
const presidentCard = {
  background: "#fff",
  border: "1px solid #ebdcb9",
  borderRadius: "8px",
  padding: "30px 20px",
  textAlign: "center",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "10px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.03)"
};

const avatarContainer = {
  width: "80px",
  height: "80px",
  borderRadius: "50%",
  background: "linear-gradient(135deg, #ff7a00, #ffb347)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "2.5rem",
  color: "#fff",
  boxShadow: "0 4px 12px rgba(255,122,0,0.2)"
};

const messageContainer = {
  display: "flex",
  flexDirection: "column",
  gap: "12px"
};

const messageTitle = {
  fontSize: "1.6rem",
  color: "#b22222",
  margin: "0",
  fontWeight: "bold"
};

const messageGreeting = {
  fontSize: "1.05rem",
  fontWeight: "bold",
  color: "#333",
  margin: "0"
};

const messageBody = {
  fontSize: "1rem",
  lineHeight: "1.7",
  color: "#555",
  margin: "0",
  textAlign: "justify"
};

const messageSign = {
  fontSize: "1.05rem",
  fontWeight: "bold",
  color: "#a0522d",
  margin: "5px 0 0 0"
};

const sectionBlock = {
  maxWidth: "1200px",
  margin: "0 auto 60px auto",
  padding: "0 20px"
};

const sectionHeader = {
  textAlign: "center",
  fontSize: "1.8rem",
  fontWeight: "bold",
  color: "#b22222",
  marginBottom: "35px",
  textDecoration: "underline",
  textDecorationColor: "#e0d5c1",
  textUnderlineOffset: "8px"
};

const mainGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: "30px"
};

const bearerCard = {
  background: "#fdfcf9",
  border: "1px solid #ebdcb9",
  borderRadius: "6px",
  padding: "30px 20px",
  textAlign: "center",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "10px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.03)"
};

const bearerRole = {
  fontSize: "0.8rem",
  fontWeight: "bold",
  color: "#b22222",
  textTransform: "uppercase",
  letterSpacing: "1px"
};

const bearerName = {
  fontSize: "1.4rem",
  fontWeight: "bold",
  color: "#111",
  margin: "0"
};

const goldUnderline = {
  width: "60px",
  height: "3px",
  background: "#a0522d",
  marginTop: "5px"
};

const membersGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
  gap: "20px"
};

const memberCard = {
  background: "#FAF7E6",
  borderRadius: "6px",
  padding: "20px 15px",
  textAlign: "center",
  boxShadow: "0 2px 8px rgba(0,0,0,0.02)"
};

const memberRole = {
  fontSize: "0.75rem",
  color: "#a0522d",
  fontWeight: "bold",
  display: "block",
  marginBottom: "4px"
};

const memberName = {
  fontSize: "1.1rem",
  fontWeight: "bold",
  color: "#111",
  margin: "0"
};

const generalContainer = {
  background: "#FAF7E6",
  borderRadius: "10px",
  border: "1px solid #ebdcb9",
  padding: "40px"
};

const generalHeader = {
  textAlign: "center",
  fontSize: "1.6rem",
  fontWeight: "bold",
  color: "#a0522d",
  marginBottom: "30px"
};

const generalGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
  gap: "20px"
};

const generalCard = {
  background: "#ffffff",
  border: "1px solid #ebdcb9",
  borderRadius: "8px",
  padding: "15px 10px",
  textAlign: "center",
  boxShadow: "0 4px 10px rgba(0,0,0,0.03)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
};

const bulletStyle = {
  color: "#d84315",
  fontSize: "1.4rem"
};

const generalName = {
  fontSize: "1.2rem",
  fontWeight: "bold",
  color: "#333",
  margin: "0"
};

const sloganBlock = {
  textAlign: "center",
  margin: "50px 0 80px 0",
  padding: "0 20px"
};

const sloganText = {
  fontSize: "1.3rem",
  fontWeight: "bold",
  fontStyle: "italic",
  color: "#a0522d"
};

const footerStyle = {
  background: "#1c2010",
  padding: "50px 20px"
};

const footerContent = {
  maxWidth: "1200px",
  margin: "0 auto",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  flexWrap: "wrap",
  gap: "30px"
};

const footerLeft = {
  display: "flex",
  flexDirection: "column",
  gap: "10px"
};

const footerLogo = {
  fontSize: "1.5rem",
  fontWeight: "bold",
  color: "#FAF7E6",
  margin: "0"
};

const footerCopyright = {
  fontSize: "0.85rem",
  color: "#8d6e63",
  margin: "0"
};

const footerRight = {
  display: "flex",
  gap: "20px",
  flexWrap: "wrap"
};

const footerLink = {
  color: "#bcaaa4",
  textDecoration: "none",
  fontSize: "0.85rem",
  transition: "color 0.2s"
};

export default AboutCommittee;
