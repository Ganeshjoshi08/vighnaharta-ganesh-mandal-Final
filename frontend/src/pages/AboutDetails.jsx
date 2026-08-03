import React, { useEffect, useState } from "react";
import aboutImg from "../assets/about_ganesha.jpg";
import { useNavigate } from "react-router-dom";

const AboutDetails = () => {
  const navigate = useNavigate();
  const [showVolunteerModal, setShowVolunteerModal] = useState(false);
  const [volunteerForm, setVolunteerForm] = useState({ name: "", phone: "", area: "" });
  const [volunteerSuccess, setVolunteerSuccess] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const lang = localStorage.getItem("lang") || "marathi";
  const isMarathi = lang === "marathi";

  const handleVolunteerSubmit = (e) => {
    e.preventDefault();
    if (!volunteerForm.name || !volunteerForm.phone || !volunteerForm.area) {
      alert(isMarathi ? "कृपया सर्व फील्ड भरा." : "Please fill all fields.");
      return;
    }
    setVolunteerSuccess(true);
    setTimeout(() => {
      setVolunteerSuccess(false);
      setShowVolunteerModal(false);
      setVolunteerForm({ name: "", phone: "", area: "" });
    }, 2500);
  };

  const aboutSections = [
    {
      badge: "🌟",
      titleMr: "आमची ओळख – एक उत्सव नव्हे, तर एक अखंड चळवळ",
      titleEn: "Who We Are – More Than a Festival, A Living Movement",
      descMr: [
        "विघ्नहर्ता मित्र मंडळ ही केवळ सार्वजनिक गणेशोत्सव साजरा करणारी संस्था नाही, तर श्रद्धा, संस्कृती, समाजसेवा, राष्ट्रभक्ती आणि आधुनिक विचारांचा संगम असलेली एक प्रेरणादायी सामाजिक चळवळ आहे. गेल्या तीन दशककांहून अधिक काळ आम्ही श्री गणरायाच्या पवित्र चरणी नतमस्तक होत समाजहिताला सर्वोच्च स्थान देत आलो आहोत. प्रत्येक वर्षी उत्सव अधिक भव्य करण्यापेक्षा तो अधिक अर्थपूर्ण, समाजोपयोगी आणि प्रेरणादायी कसा होईल, यासाठी आमचे प्रत्येक सदस्य वर्षभर अथक परिश्रम घेत असतात.",
        "आमच्या प्रत्येक उपक्रमामागे केवळ आयोजन नसते, तर एक विचार असतो. प्रत्येक देखाव्यामागे केवळ आकर्षण नसते, तर समाजप्रबोधनाचा संदेश असतो. प्रत्येक सामाजिक कार्यामागे केवळ मदत नसते, तर माणुसकीची भावना असते. आणि प्रत्येक उत्सवामागे केवळ परंपरा नसते, तर पुढील पिढीला संस्कारांचा अमूल्य वारसा देण्याचा दृढ संकल्प असतो."
      ],
      descEn: [
        "Vighnaharta Mitra Mandal is not merely an organization that celebrates the public Ganesh Utsav; it is an inspiring movement built on the values of faith, culture, social service, patriotism, and progressive thinking. For more than three decades, we have dedicated ourselves at the sacred feet of Lord Ganesha while placing the welfare of society above all else. Every year, our members work tirelessly—not just to make the festival grander, but to make it more meaningful, socially impactful, and truly inspiring.",
        "Behind every initiative lies a vision. Behind every theme lies a message of social awareness. Behind every act of service lies the spirit of humanity. And behind every celebration stands our unwavering commitment to passing on the priceless values of culture, devotion, and character to future generations."
      ]
    },
    {
      badge: "🤝",
      titleMr: "आमची कार्यसंस्कृती",
      titleEn: "Our Work Culture",
      descMr: [
        "विघ्नहर्ता मित्र मंडळाची खरी ताकद म्हणजे आमचे समर्पित कार्यकर्ते. कोणत्याही प्रकारचा स्वार्थ, प्रसिद्धी किंवा वैयक्तिक लाभ न बाळगता शेकडो हात, एकाच ध्येयाने आणि एकाच श्रद्धेने वर्षभर समाजासाठी कार्यरत असतात. शिस्त, पारदर्शकता, नियोजन, वेळेचे महत्त्व आणि सामूहिक नेतृत्व ही आमच्या कार्यपद्धतीची मूलभूत तत्त्वे आहेत.",
        "नवीन तंत्रज्ञानाचा स्वीकार, डिजिटल माध्यमांचा प्रभावी वापर, पर्यावरणपूरक उपक्रम, सामाजिक जबाबदारी आणि नाविन्यपूर्ण संकल्पना यांमुळे आज विघ्नहर्ता मित्र मंडळाने केवळ बीडमध्येच नव्हे, तर संपूर्ण जिल्ह्यात स्वतःची वेगळी ओळख निर्माण केली आहे."
      ],
      descEn: [
        "The true strength of Vighnaharta Mitra Mandal lies in its dedicated volunteers. Without seeking personal recognition, publicity, or gain, hundreds of committed members work selflessly throughout the year with one common purpose and one shared devotion—to serve society.",
        "Discipline, transparency, meticulous planning, respect for time, and collective leadership form the foundation of our working culture.",
        "By embracing modern technology, effectively utilizing digital platforms, promoting eco-friendly initiatives, fulfilling social responsibilities, and introducing innovative ideas, Vighnaharta Mitra Mandal has established a distinct identity not only in Beed but across the entire district."
      ]
    },
    {
      badge: "🏆",
      titleMr: "आमचा स्वाभिमान",
      titleEn: "Our Pride",
      descMr: [
        "आज “बीडचा विघ्नहर्ता” ही केवळ एक उपाधी नाही; ती लाखो भाविकांनी, नागरिकांनी आणि समाजाने दिलेली प्रेमाची आणि विश्वासाची ओळख आहे. हा सन्मान कोणत्याही एका व्यक्तीचा नाही, तर अनेक पिढ्यांच्या निस्वार्थ सेवाभावाचा, अथक परिश्रमांचा आणि श्री गणरायावरील अढळ श्रद्धेचा परिणाम आहे.",
        "आम्ही प्रत्येक सन्मानाला जबाबदारी समजतो आणि प्रत्येक वर्षी स्वतःला मागील वर्षापेक्षा अधिक सक्षम, अधिक समाजाभिमुख आणि अधिक प्रेरणादायी सिद्ध करण्याचा प्रयत्न करतो."
      ],
      descEn: [
        "Today, the title 'Beed's Vighnaharta' is more than just a name—it is a symbol of the love, trust, and blessings bestowed upon us by thousands of devotees, citizens, and the community.",
        "This honor does not belong to any one individual. It is the result of generations of selfless service, relentless dedication, and unwavering faith in Lord Ganesha.",
        "Every recognition we receive is treated as a responsibility, inspiring us each year to become more capable, more socially committed, and more impactful than ever before."
      ]
    },
    {
      badge: "🧗",
      titleMr: "आमचा संघर्ष आणि आमची ओळख",
      titleEn: "Our Journey of Challenges and Identity",
      descMr: [
        "प्रत्येक यशामागे संघर्ष असतो, आणि प्रत्येक संघर्षामागे श्रद्धा असते. विघ्नहर्ता मित्र मंडळाचा प्रवासही त्याला अपवाद नाही. अनेक अडचणी, अनेक आव्हाने, बदलते काळ, बदलती परिस्थिती आणि सतत वाढणाऱ्या अपेक्षा यांचा सामना करत आम्ही आज या स्थानापर्यंत पोहोचलो आहोत. पण प्रत्येक वेळी आमच्या पाठीशी उभे राहिले ते श्री गणरायाचे आशीर्वाद, आमच्या ज्येष्ठांचे मार्गदर्शन आणि नागरिकांचा अमूल्य विश्वास.",
        "आज आम्ही ज्या उंचीवर उभे आहोत, ती केवळ आमच्या यशाची नाही; ती प्रत्येक कार्यकर्त्याच्या घामाची, प्रत्येक भक्ताच्या श्रद्धेची आणि प्रत्येक नागरिकाच्या प्रेमाची उंची आहे."
      ],
      descEn: [
        "Behind every success lies a struggle, and behind every struggle lies faith. The journey of Vighnaharta Mitra Mandal is no exception.",
        "Over the years, we have faced numerous challenges, changing times, evolving circumstances, and ever-growing expectations. Yet, every obstacle has been overcome with the divine blessings of Lord Ganesha, the guidance of our respected elders, and the unwavering trust of our community.",
        "The position we proudly hold today is not merely a reflection of our achievements—it represents the hard work of every volunteer, the devotion of every devotee, and the heartfelt support of every citizen."
      ]
    },
    {
      badge: "🎯",
      titleMr: "आमचा निर्धार – विघ्नहर्त्याचा मार्ग कधीही थांबणार नाही",
      titleEn: "Our Resolve – The Journey of Vighnaharta Will Never Stop",
      descMr: [
        "आम्ही प्रसिद्धीसाठी कार्य करत नाही; आम्ही इतिहास घडविण्यासाठी कार्य करतो. आम्ही गर्दी जमवण्यासाठी उत्सव साजरा करत नाही; आम्ही समाजाला एकत्र आणण्यासाठी उत्सव साजरा करतो. आम्ही केवळ देखावे उभारत नाही; आम्ही विचार घडवतो. आम्ही केवळ घोषणाबाजी करत नाही; आम्ही कृतीतून विश्वास निर्माण करतो.",
        "आमच्यासाठी गणेशोत्सव हा दहा दिवसांचा कार्यक्रम नाही; तो वर्षभर चालणारा सेवा, संस्कार, राष्ट्रभक्ती आणि सामाजिक जबाबदारीचा संकल्प आहे.",
        "जोपर्यंत श्री गणरायाची कृपा आमच्यावर आहे, तोपर्यंत विघ्नहर्ता मित्र मंडळ समाजासाठी नवनवीन आदर्श निर्माण करत राहील. प्रत्येक वर्षी अधिक भव्य, अधिक दिव्य, अधिक शिस्तबद्ध आणि अधिक समाजोपयोगी कार्य करत “बीडचा विघ्नहर्ता” ही ओळख अधिक उज्ज्वल करण्यासाठी आम्ही सदैव कटिबद्ध आहोत.",
        "आमचा उत्सव केवळ दहा दिवसांचा नाही… आमचा विचार वर्षभर जगतो. आमची ओळख केवळ नावात नाही… ती प्रत्येक समाजोपयोगी कृतीत आहे. आमची शक्ती केवळ संख्येत नाही… ती श्रद्धा, सेवा, संस्कार आणि एकतेत आहे.",
        "आणि जोपर्यंत श्री गणरायाचा आशीर्वाद आमच्यासोबत आहे, तोपर्यंत “बीडचा विघ्नहर्ता” हा केवळ इतिहास घडवत राहणार नाही, तर भविष्यासाठी नवे आदर्शही निर्माण करत राहील.",
        "॥ जय विघ्नहर्ता ॥"
      ],
      descEn: [
        "We do not work for recognition; we work to create history. We do not celebrate festivals merely to gather crowds; we celebrate them to unite society. We do not simply build decorative displays; we build awareness and inspire thought. We do not believe in empty slogans; we earn trust through meaningful action.",
        "For us, Ganesh Utsav is not a ten-day celebration—it is a year-round commitment to service, values, patriotism, and social responsibility.",
        "As long as Lord Ganesha's blessings remain with us, Vighnaharta Mitra Mandal will continue setting new benchmarks for society. Every year, we remain committed to making our celebrations grander, more disciplined, more meaningful, and more beneficial to society, while strengthening the proud identity of 'Beed's Vighnaharta.'",
        "Our festival is not limited to ten days... our vision lives throughout the year. Our identity is not defined by our name... it is reflected in every act of selfless service. Our strength does not lie in numbers... it lies in faith, service, values, and unity.",
        "And as long as the divine blessings of Lord Ganesha remain with us, 'Beed's Vighnaharta' will not only continue creating history but will also inspire generations by setting new ideals for the future.",
        "|| Jai Vighnaharta ||"
      ]
    }
  ];

  return (
    <div style={container}>
      
      {/* HEADER TITLE */}
      <header style={headerSection}>
        <span style={legacyTag}>{isMarathi ? "आमचा वारसा" : "OUR LEGACY"}</span>
        <h1 style={mainTitle}>
          {isMarathi ? "आमच्याबद्दल विघ्नहर्ता मित्र मंडळ" : "About Vighnaharta Mitra Mandal"}
        </h1>
        <div style={divider}>🔸</div>
      </header>

      {/* TOP ROW: TWO COLUMN GRID */}
      <div style={grid} className="about-details-grid">
        
        {/* LEFT COLUMN: GANESHA FRAME */}
        <div style={leftCol}>
          <div style={frameContainer}>
            <img src={aboutImg} alt="Ganesha Murti" style={ganeshaImage} />
          </div>
          <p style={frameCaption}>
            {isMarathi ? "“एकता जिथे विघ्नहर्ता तिथे श्री गणेश”" : "“Where there is Unity, there is Ganesha”"}
          </p>
        </div>

        {/* RIGHT COLUMN: FIRST SECTION ONLY (Matches photo height) */}
        <div style={rightCol}>
          <div style={timelineCardNoBorder}>
            <span style={badgeStyle}>{aboutSections[0].badge}</span>
            <h3 style={cardTitle}>{isMarathi ? aboutSections[0].titleMr : aboutSections[0].titleEn}</h3>
            <div style={textBlockContainer}>
              {(isMarathi ? aboutSections[0].descMr : aboutSections[0].descEn).map((paragraphText, pIdx) => (
                <p key={pIdx} style={cardText}>{paragraphText}</p>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* BOTTOM ROW: FULL WIDTH CONTAINER FOR REMAINING 4 SECTIONS */}
      <div style={bottomContainer}>
        {aboutSections.slice(1).map((item, idx) => (
          <div key={idx} style={bottomCard}>
            <div style={bottomCardHeader}>
              <span style={bottomBadgeStyle}>{item.badge}</span>
              <h3 style={bottomCardTitle}>{isMarathi ? item.titleMr : item.titleEn}</h3>
            </div>
            <div style={textBlockContainer}>
              {(isMarathi ? item.descMr : item.descEn).map((paragraphText, pIdx) => (
                <p key={pIdx} style={bottomCardText}>{paragraphText}</p>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* BOTTOM CTA: JOIN THE MANDAL */}
      <section style={ctaSection}>
        <h2 style={ctaTitle}>
          {isMarathi ? "मंडळाच्या कार्यात सहभागी व्हा" : "Participate in Mandal Activities"}
        </h2>
        <p style={ctaText}>
          {isMarathi 
            ? "आमच्याकडे समाजासाठी काही देण्याची इच्छा असेल, तर आमच्या स्वयंसेवक टीममध्ये सामील व्हा." 
            : "If you wish to contribute to the community, join our active volunteer team."}
        </p>
        <div style={btnGroup}>
          <button onClick={() => setShowVolunteerModal(true)} style={volunteerBtn}>
            Volunteer Signup
          </button>
          <button onClick={() => navigate("/donation")} style={donateBtn}>
            Donate Now
          </button>
        </div>
      </section>

      {/* FOOTER SECTION */}
      <footer style={footerStyle}>
        <h3 style={footerLogo}>{isMarathi ? "श्री गणेश मंडळ" : "Shri Ganesh Mandal"}</h3>
        <div style={footerLinks}>
          <a href="#" style={footerLink}>Privacy Policy</a>
          <a href="#" style={footerLink}>Terms of Service</a>
          <a href="#" onClick={() => setShowVolunteerModal(true)} style={footerLink}>Volunteer Signup</a>
          <a href="#" onClick={() => navigate("/donation")} style={footerLink}>Temple Timing</a>
        </div>
        <p style={copyright}>
          © 2026 {isMarathi ? "श्री गणेश मंडळ" : "Shri Ganesh Mandal"}. Developed by Ganesh Joshi
        </p>
      </footer>

      {/* VOLUNTEER REGISTRATION MODAL */}
      {showVolunteerModal && (
        <div style={modalOverlay}>
          <div style={modalCard}>
            <h3 style={modalTitle}>{isMarathi ? "स्वयंसेवक नोंदणी" : "Volunteer Registration"}</h3>
            {volunteerSuccess ? (
              <div style={successMessage}>
                🎉 {isMarathi ? "नोंदणी यशस्वी झाली! आम्ही लवकरच संपर्क करू." : "Registration Successful! We will contact you soon."}
              </div>
            ) : (
              <form onSubmit={handleVolunteerSubmit} style={modalForm}>
                <input
                  placeholder={isMarathi ? "पूर्ण नाव" : "Full Name"}
                  value={volunteerForm.name}
                  onChange={(e) => setVolunteerForm({ ...volunteerForm, name: e.target.value })}
                  style={modalInput}
                  required
                />
                <input
                  placeholder={isMarathi ? "संपर्क क्रमांक" : "Contact Number"}
                  value={volunteerForm.phone}
                  onChange={(e) => setVolunteerForm({ ...volunteerForm, phone: e.target.value })}
                  style={modalInput}
                  required
                />
                <input
                  placeholder={isMarathi ? "पत्ता / परिसर" : "Area / Address"}
                  value={volunteerForm.area}
                  onChange={(e) => setVolunteerForm({ ...volunteerForm, area: e.target.value })}
                  style={modalInput}
                  required
                />
                <div style={modalBtns}>
                  <button type="submit" style={modalSubmitBtn}>
                    {isMarathi ? "नोंदणी करा" : "Register"}
                  </button>
                  <button type="button" onClick={() => setShowVolunteerModal(false)} style={modalCloseBtn}>
                    {isMarathi ? "बंद करा" : "Close"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
};

/* Style Declarations */
const container = {
  minHeight: "100vh",
  padding: "120px 0 0 0",
  background: "#ffffff",
  color: "#3e2723",
  fontFamily: "var(--font-headline-md)"
};

const headerSection = {
  textAlign: "center",
  marginBottom: "50px",
  padding: "0 20px"
};

const legacyTag = {
  fontSize: "0.85rem",
  fontWeight: "bold",
  color: "#a1887f",
  letterSpacing: "2px",
  textTransform: "uppercase"
};

const mainTitle = {
  fontSize: "2.5rem",
  fontWeight: "bold",
  color: "#8d6e63",
  marginTop: "8px"
};

const divider = {
  marginTop: "12px",
  color: "#bcaaa4"
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
  gap: "40px",
  maxWidth: "1200px",
  margin: "0 auto 40px auto",
  padding: "0 20px",
  alignItems: "start"
};

const leftCol = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center"
};

const frameContainer = {
  background: "#fff",
  padding: "12px",
  borderRadius: "8px",
  boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
  border: "1px solid #d7ccc8",
  maxWidth: "380px",
  width: "100%"
};

const ganeshaImage = {
  width: "100%",
  borderRadius: "4px",
  display: "block"
};

const frameCaption = {
  marginTop: "20px",
  fontSize: "1.15rem",
  fontStyle: "italic",
  fontWeight: "bold",
  color: "#5d4037",
  textAlign: "center"
};

const rightCol = {
  display: "flex",
  flexDirection: "column",
  gap: "35px"
};

const timelineCardNoBorder = {
  background: "transparent",
  paddingLeft: "10px",
  position: "relative"
};

const badgeStyle = {
  background: "#8d6e63",
  color: "#fff",
  padding: "4px 12px",
  borderRadius: "4px",
  fontSize: "0.8rem",
  fontWeight: "bold",
  display: "inline-block",
  marginBottom: "12px"
};

const cardTitle = {
  fontSize: "1.7rem",
  fontWeight: "bold",
  color: "#5d4037",
  margin: "0 0 15px 0"
};

const textBlockContainer = {
  display: "flex",
  flexDirection: "column",
  gap: "12px"
};

const cardText = {
  fontSize: "1.15rem",
  lineHeight: "1.85",
  color: "#5d4037",
  margin: "0",
  textAlign: "justify"
};

/* Bottom flow layout styles */
const bottomContainer = {
  maxWidth: "1200px",
  margin: "0 auto 80px auto",
  padding: "0 20px",
  display: "flex",
  flexDirection: "column",
  gap: "40px"
};

const bottomCard = {
  background: "#fdfcf9",
  border: "1px solid #ebdcb9",
  borderRadius: "12px",
  padding: "30px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.03)"
};

const bottomCardHeader = {
  display: "flex",
  alignItems: "center",
  gap: "15px",
  marginBottom: "15px"
};

const bottomBadgeStyle = {
  background: "#8d6e63",
  color: "#fff",
  padding: "6px 14px",
  borderRadius: "4px",
  fontSize: "0.95rem",
  fontWeight: "bold"
};

const bottomCardTitle = {
  fontSize: "1.45rem",
  fontWeight: "bold",
  color: "#5d4037",
  margin: "0"
};

const bottomCardText = {
  fontSize: "1.02rem",
  lineHeight: "1.8",
  color: "#5d4037",
  margin: "0",
  textAlign: "justify"
};

const ctaSection = {
  background: "#2e331a",
  color: "#FAF7E6",
  padding: "60px 20px",
  textAlign: "center",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "15px"
};

const ctaTitle = {
  fontSize: "2rem",
  fontWeight: "bold",
  margin: "0"
};

const ctaText = {
  fontSize: "1.1rem",
  color: "#d7ccc8",
  maxWidth: "600px",
  margin: "0"
};

const btnGroup = {
  display: "flex",
  gap: "20px",
  marginTop: "10px",
  flexWrap: "wrap",
  justifyContent: "center"
};

const volunteerBtn = {
  background: "#d87a00",
  color: "#fff",
  border: "none",
  padding: "12px 28px",
  borderRadius: "4px",
  fontWeight: "bold",
  cursor: "pointer",
  fontSize: "0.95rem",
  boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
  transition: "all 0.2s"
};

const donateBtn = {
  background: "transparent",
  color: "#FAF7E6",
  border: "2px solid #FAF7E6",
  padding: "10px 28px",
  borderRadius: "4px",
  fontWeight: "bold",
  cursor: "pointer",
  fontSize: "0.95rem",
  transition: "all 0.2s"
};

const footerStyle = {
  background: "#1c2010",
  color: "#8d6e63",
  padding: "50px 20px",
  textAlign: "center",
  borderTop: "1px solid #33391d"
};

const footerLogo = {
  fontSize: "1.5rem",
  fontWeight: "bold",
  color: "#FAF7E6",
  margin: "0 0 20px 0"
};

const footerLinks = {
  display: "flex",
  justifyContent: "center",
  gap: "25px",
  flexWrap: "wrap",
  marginBottom: "30px"
};

const footerLink = {
  color: "#bcaaa4",
  textDecoration: "none",
  fontSize: "0.9rem",
  transition: "color 0.2s"
};

const copyright = {
  fontSize: "0.8rem",
  color: "#705d56",
  margin: "0"
};

const modalOverlay = {
  fixed: "position",
  position: "fixed",
  top: "0",
  left: "0",
  right: "0",
  bottom: "0",
  background: "rgba(0,0,0,0.6)",
  backdropFilter: "blur(4px)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: "100"
};

const modalCard = {
  background: "#ffffff",
  padding: "30px",
  borderRadius: "8px",
  maxWidth: "400px",
  width: "90%",
  boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
  border: "3px solid #8d6e63"
};

const modalTitle = {
  color: "#8d6e63",
  margin: "0 0 20px 0",
  fontWeight: "bold",
  textAlign: "center",
  fontSize: "1.4rem"
};

const modalForm = {
  display: "flex",
  flexDirection: "column",
  gap: "15px"
};

const modalInput = {
  width: "100%",
  padding: "10px",
  borderRadius: "4px",
  border: "1px solid #d7ccc8",
  background: "#fff",
  outline: "none"
};

const modalBtns = {
  display: "flex",
  gap: "15px",
  marginTop: "10px"
};

const modalSubmitBtn = {
  flex: "1",
  padding: "10px",
  background: "#d87a00",
  color: "white",
  border: "none",
  borderRadius: "4px",
  fontWeight: "bold",
  cursor: "pointer"
};

const modalCloseBtn = {
  padding: "10px 20px",
  background: "#ccc",
  color: "#333",
  border: "none",
  borderRadius: "4px",
  fontWeight: "bold",
  cursor: "pointer"
};

const successMessage = {
  color: "#2e7d32",
  fontWeight: "bold",
  textAlign: "center",
  padding: "20px 0"
};

export default AboutDetails;
