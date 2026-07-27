import { useState, useEffect } from "react";
import API from "../api/api";
import { Link, useLocation } from "react-router-dom";

const Admin = () => {
  const location = useLocation();

  const [users, setUsers] = useState([]);
  const [donations, setDonations] = useState([]);
  const [events, setEvents] = useState([]);

  // Editable settings fields
  const [aboutTimeline, setAboutTimeline] = useState({
    aboutMr1: "",
    aboutMr2: "",
    aboutMr3: "",
    aboutMr4: "",
    aboutEn1: "",
    aboutEn2: "",
    aboutEn3: "",
    aboutEn4: "",
    timeline1990Mr: "",
    timeline1990En: "",
    timeline2010Mr: "",
    timeline2010En: "",
    timeline2024Mr: "",
    timeline2024En: ""
  });
  const [saveLoading, setSaveLoading] = useState(false);

  useEffect(() => {
    fetchData();
    fetchAboutHistory();
  }, []);

  const fetchData = async () => {
    try {
      const u = await API.get("/admin/users");
      const d = await API.get("/admin/donations");
      const e = await API.get("/admin/events");

      setUsers(u.data || []);
      setDonations(d.data || []);
      setEvents(e.data?.events || e.data || []);
    } catch (err) {
      console.log("FETCH ERROR:", err.response?.data || err.message);
    }
  };

  const fetchAboutHistory = async () => {
    try {
      const res = await API.get("/about-history");
      if (res.data) {
        setAboutTimeline(res.data);
      } else {
        // Defaults matching initial translations in Home
        setAboutTimeline({
          aboutMr1: "१९९० सालापासून बीड शहराच्या सांस्कृतिक, धार्मिक आणि सामाजिक वैभवात मोलाची भर घालणारे ‘विघ्नहर्ता मित्र मंडळ’ हे केवळ गणेशोत्सव साजरा करणारे मंडळ नसून समाजसेवा, संस्कार आणि भक्ती यांचे प्रेरणादायी केंद्र आहे. विघ्नहर्ता चौक येथे दरवर्षी श्री गणेशाचे आगमन भक्तिभाव, उत्साह आणि पारंपरिक जल्लोषात होत असून हजारो भाविकांच्या श्रद्धा आणि विश्वासाचे केंद्रस्थान बनले आहे.",
          aboutMr2: "स्थापनेपासून गेली ३६ वर्षे मंडळाने धार्मिक परंपरांचे जतन करत विविध सामाजिक उपक्रम, रक्तदान शिबिरे, आरोग्य जनजागृती मोहिमा, पर्यावरण संवर्धन उपक्रम तसेच गरजू आणि होतकरू विद्यार्थ्यांना शैक्षणिक मदत करण्याचे कार्य सातत्याने केले आहे. समाजहित आणि सेवाभाव यांची सांगड घालत मंडळाने बीडकरांच्या मनात एक विशेष आणि मानाचे स्थान निर्माण केले आहे.",
          aboutMr3: "२०२० मध्ये ३१ व्या वर्षात पदार्पण करताना, ‘विघ्नहर्ता मित्र मंडळ’ श्रद्धा, सेवा आणि सामाजिक बांधिलकीचा वारसा अधिक दृढ करण्याचा संकल्प बाळगून आहे. आमचे बाप्पा हे केवळ मंडळाचे आराध्य दैवत नसून संपूर्ण बीडकरांच्या श्रद्धा, एकात्मता आणि विश्वासाचे प्रतीक आहेत.",
          aboutMr4: "॥ गणपती बाप्पा मोरया ॥ 🙏🏻🐘✨",
          aboutEn1: "Since 1990, 'Vighnaharta Mitra Mandal', adding significantly to the cultural, religious and social glory of Beed city, is not just a Mandal celebrating Ganesh festival, but an inspiring center of social service, values and devotion. Every year, the arrival of Shri Ganesha at Vighnaharta Chowk takes place with devotion, enthusiasm and traditional fervor, making it a center of faith and trust for thousands of devotees.",
          aboutEn2: "For the past 36 years since its establishment, preserving religious traditions, the Mandal has continuously conducted various social activities, blood donation camps, health awareness campaigns, environmental conservation initiatives, as well as educational assistance to needy and promising students. Combining social welfare and service, the Mandal has created a special and proud place in the hearts of the people of Beed.",
          aboutEn3: "Entering its 37th year in 2026, 'Vighnaharta Mitra Mandal' is resolved to strengthen the legacy of faith, service and social commitment. Our Bappa is not only the deity of the Mandal, but a symbol of faith, unity and trust of the entire people of Beed.",
          aboutEn4: "|| Ganpati Bappa Morya || 🙏🏻🐘✨",
          timeline1990Mr: "मंडळाची स्थापना आणि प्रथम सार्वजनिक गणेशोत्सव सोहळा. एका छोट्या मांडवात सुरू झालेला हा प्रवास आज महाकाय वटवृक्षाप्रमाणे विस्तारला आहे.",
          timeline1990En: "Establishment of the Mandal and first public Ganesh festival. This journey started in a small pandal and has expanded like a giant banyan tree today.",
          timeline2010Mr: "दशकोत्सव सोहळा साजरा. चांदीच्या सिंहासनाची निर्मिती आणि भव्य मिरवणूक. बीड शहरात प्रथमच एवढ्या मोठ्या प्रमाणावर सामाजिक उपक्रमांची सुरुवात.",
          timeline2010En: "Celebrated 10th anniversary. Made silver throne and grand procession. Started major social welfare campaigns in Beed for the first time.",
          timeline2024Mr: "आज आम्ही अद्ययावत तंत्रज्ञान आणि पारंपारिक भक्ती यांचा मेळ घालून 'डिजीटल दर्शन' आणि जागतिक स्तरावर उत्सव पोहचवत आहोत.",
          timeline2024En: "Today we combine modern technology and traditional devotion to bring 'Digital Darshan' and celebrate the festival globally."
        });
      }
    } catch (err) {
      console.log("FETCH ABOUT SETTINGS ERROR:", err);
    }
  };

  const handleSettingsSubmit = async (e) => {
    e.preventDefault();
    setSaveLoading(true);
    try {
      const res = await API.post("/about-history", aboutTimeline);
      alert(res.data.msg || "Settings saved successfully! 🎉");
    } catch (err) {
      console.log("SAVE ERROR:", err.response?.data || err.message);
      alert("Failed to save settings ❌");
    } finally {
      setSaveLoading(false);
    }
  };

  const isActive = (path) =>
    location.pathname === path ? activeLink : link;

  return (
    <div style={wrapper}>
      {/* SIDEBAR (UNCHANGED DARK) */}
      <div style={sidebar}>
        <h2 style={{ color: "#ff7a00" }}>Admin Panel</h2>

        <Link to="/admin" style={isActive("/admin")}>Dashboard</Link>
        <Link to="/admin/events" style={isActive("/admin/events")}>Manage Events</Link>
        <Link to="/admin/gallery" style={isActive("/admin/gallery")}>📸 Manage Gallery</Link>
        <Link to="/admin/activities" style={isActive("/admin/activities")}>🎯 Manage Activities</Link>
        <Link to="/admin/announcements" style={isActive("/admin/announcements")}>Announcements</Link>
        <Link to="/admin/donations" style={isActive("/admin/donations")}>Donations</Link>
        <Link to="/admin/users" style={isActive("/admin/users")}>Users</Link>
      </div>

      {/* MAIN WHITE AREA */}
      <div style={main}>
        <h1 style={title}>⚙️ Admin Dashboard</h1>

        {/* STATS */}
        <div style={statsContainer}>
          <div style={statCard}>👤 {users.length} Users</div>
          <div style={statCard}>💰 {donations.length} Donations</div>
          <div style={statCard}>🎉 {events.length} Events</div>
        </div>

        {/* EDIT ABOUT & HISTORY */}
        <div style={card}>
          <h2 style={sectionTitle}>ℹ️ Edit About Us & Timeline Milestones</h2>
          <form onSubmit={handleSettingsSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            
            {/* ABOUT US MARATHI */}
            <div style={formGroup}>
              <h3 style={subSectionTitle}>आमच्याबद्दल (About us - Marathi)</h3>
              <label style={label}>Paragraph 1</label>
              <textarea
                style={textarea}
                value={aboutTimeline.aboutMr1}
                onChange={(e) => setAboutTimeline({ ...aboutTimeline, aboutMr1: e.target.value })}
                required
              />
              <label style={label}>Paragraph 2</label>
              <textarea
                style={textarea}
                value={aboutTimeline.aboutMr2}
                onChange={(e) => setAboutTimeline({ ...aboutTimeline, aboutMr2: e.target.value })}
                required
              />
              <label style={label}>Paragraph 3</label>
              <textarea
                style={textarea}
                value={aboutTimeline.aboutMr3}
                onChange={(e) => setAboutTimeline({ ...aboutTimeline, aboutMr3: e.target.value })}
              />
              <label style={label}>Paragraph 4</label>
              <textarea
                style={textarea}
                value={aboutTimeline.aboutMr4}
                onChange={(e) => setAboutTimeline({ ...aboutTimeline, aboutMr4: e.target.value })}
              />
            </div>

            {/* ABOUT US ENGLISH */}
            <div style={formGroup}>
              <h3 style={subSectionTitle}>About Us (English)</h3>
              <label style={label}>Paragraph 1</label>
              <textarea
                style={textarea}
                value={aboutTimeline.aboutEn1}
                onChange={(e) => setAboutTimeline({ ...aboutTimeline, aboutEn1: e.target.value })}
                required
              />
              <label style={label}>Paragraph 2</label>
              <textarea
                style={textarea}
                value={aboutTimeline.aboutEn2}
                onChange={(e) => setAboutTimeline({ ...aboutTimeline, aboutEn2: e.target.value })}
                required
              />
              <label style={label}>Paragraph 3</label>
              <textarea
                style={textarea}
                value={aboutTimeline.aboutEn3}
                onChange={(e) => setAboutTimeline({ ...aboutTimeline, aboutEn3: e.target.value })}
              />
              <label style={label}>Paragraph 4</label>
              <textarea
                style={textarea}
                value={aboutTimeline.aboutEn4}
                onChange={(e) => setAboutTimeline({ ...aboutTimeline, aboutEn4: e.target.value })}
              />
            </div>

            {/* TIMELINE MILESTONES */}
            <div style={formGroup}>
              <h3 style={subSectionTitle}>प्रवासाचे महत्त्वाचे टप्पे (Timeline Milestones)</h3>
              
              <label style={label}>1990 Milestone (Marathi)</label>
              <textarea
                style={textarea}
                value={aboutTimeline.timeline1990Mr}
                onChange={(e) => setAboutTimeline({ ...aboutTimeline, timeline1990Mr: e.target.value })}
                required
              />
              <label style={label}>1990 Milestone (English)</label>
              <textarea
                style={textarea}
                value={aboutTimeline.timeline1990En}
                onChange={(e) => setAboutTimeline({ ...aboutTimeline, timeline1990En: e.target.value })}
                required
              />

              <label style={label}>2010 Milestone (Marathi)</label>
              <textarea
                style={textarea}
                value={aboutTimeline.timeline2010Mr}
                onChange={(e) => setAboutTimeline({ ...aboutTimeline, timeline2010Mr: e.target.value })}
                required
              />
              <label style={label}>2010 Milestone (English)</label>
              <textarea
                style={textarea}
                value={aboutTimeline.timeline2010En}
                onChange={(e) => setAboutTimeline({ ...aboutTimeline, timeline2010En: e.target.value })}
                required
              />

              <label style={label}>2024 Milestone (Marathi)</label>
              <textarea
                style={textarea}
                value={aboutTimeline.timeline2024Mr}
                onChange={(e) => setAboutTimeline({ ...aboutTimeline, timeline2024Mr: e.target.value })}
                required
              />
              <label style={label}>2024 Milestone (English)</label>
              <textarea
                style={textarea}
                value={aboutTimeline.timeline2024En}
                onChange={(e) => setAboutTimeline({ ...aboutTimeline, timeline2024En: e.target.value })}
                required
              />
            </div>

            <button disabled={saveLoading} style={btn}>
              {saveLoading ? "Saving Settings..." : "Save About & History Settings 🚀"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

/* ✅ HYBRID UI */

const wrapper = {
  display: "flex",
  minHeight: "100vh",
  background: "#f9fafb",
  paddingTop: "90px"
};

const sidebar = {
  width: "230px",
  background: "#020617",
  padding: "20px",
  borderRight: "1px solid rgba(255,255,255,0.1)"
};

const link = {
  display: "block",
  margin: "12px 0",
  color: "#aaa",
  textDecoration: "none",
  padding: "10px",
  borderRadius: "8px",
  transition: "0.3s"
};

const activeLink = {
  ...link,
  color: "#ff7a00",
  background: "rgba(255,122,0,0.1)",
  borderLeft: "3px solid #ff7a00"
};

const main = {
  flex: 1,
  padding: "30px"
};

const title = {
  color: "#111",
  marginBottom: "20px"
};

const statsContainer = {
  display: "flex",
  gap: "20px",
  marginBottom: "20px"
};

const statCard = {
  flex: 1,
  padding: "20px",
  borderRadius: "12px",
  background: "#ffffff",
  border: "1px solid #eee",
  boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
  textAlign: "center",
  color: "#333"
};

const card = {
  background: "#ffffff",
  padding: "20px",
  borderRadius: "12px",
  marginBottom: "20px",
  border: "1px solid #eee",
  boxShadow: "0 4px 12px rgba(0,0,0,0.06)"
};

const sectionTitle = {
  color: "#ff7a00",
  marginBottom: "20px"
};

const subSectionTitle = {
  color: "#8f4e00",
  fontSize: "16px",
  fontWeight: "bold",
  borderBottom: "1px solid #eee",
  paddingBottom: "6px",
  marginBottom: "10px"
};

const formGroup = {
  display: "flex",
  flexDirection: "column",
  gap: "8px",
  background: "#fcfcfc",
  padding: "15px",
  borderRadius: "8px",
  border: "1px solid #f0f0f0"
};

const label = {
  fontSize: "12px",
  fontWeight: "600",
  color: "#666"
};

const textarea = {
  width: "100%",
  height: "80px",
  padding: "8px",
  borderRadius: "6px",
  border: "1px solid #ddd",
  background: "#fff",
  color: "#333",
  outline: "none",
  fontSize: "13px"
};

const btn = {
  width: "100%",
  padding: "12px",
  background: "linear-gradient(135deg,#ff7a00,#ffb347)",
  color: "#fff",
  border: "none",
  borderRadius: "999px",
  cursor: "pointer",
  fontWeight: "600"
};

export default Admin;