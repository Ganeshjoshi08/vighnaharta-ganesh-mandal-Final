import React, { useEffect } from "react";
import timeline2010 from "../assets/timeline_2010.jpg";
import aboutGaneshaTemple from "../assets/about_ganesha_temple.jpg";
import ganarayaAward from "../assets/ganaraya_award_2014.jpg";
import aartiUtsav from "../assets/mandal_aarti_utsav.jpg";

const AboutJourney = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const lang = localStorage.getItem("lang") || "marathi";
  const isMarathi = lang === "marathi";

  const milestones = [
    {
      phaseMr: "प्रथम चरण",
      phaseEn: "PHASE 1",
      year: "1990",
      yearMr: "१९९०",
      titleMr: "स्थापना",
      titleEn: "Establishment",
      image: timeline2010,
      descMr: "१९९० साली अत्यंत मर्यादित साधनसामग्रीतून विघ्नहर्ता मित्र मंडळाची स्थापना झाली. भक्ती, संस्कृती आणि समाजसेवा या त्रिसूत्रीला केंद्रस्थानी ठेवत मंडळाने आपल्या कार्याची सुरुवात केली. दरवर्षी सामाजिक, ऐतिहासिक व प्रबोधनात्मक विषयांवरील आकर्षक देखावे आणि देखण्या थीम्स साकारून मंडळाने शहरात आपली वेगळी ओळख निर्माण केली तसेच या नाविन्यपूर्ण सादरीकरणासाठी विविध स्पर्धांमध्ये अनेक पुरस्कारही मिळवले. स्थानिक नागरिकांच्या विश्वास, सहकार्य आणि आशीर्वादामुळे मंडळाचा विस्तार होत गेला आणि एका छोट्याशा उपक्रमातून समाजाच्या विश्वासाचे व सेवाभावाचे सशक्त केंद्र म्हणून विघ्नहर्ता मित्र मंडळाची ओळख निर्माण झाली.",
      descEn: "In 1990, Vighnaharta Mitra Mandal was established with very limited resources. Keeping the three pillars of devotion, culture, and social service at its core, the Mandal began its journey. Every year, by creating attractive mock displays and beautiful themes on social, historical, and educational topics, the Mandal built a unique identity in the city and won several awards in various competitions for these innovative presentations. With the trust, cooperation, and blessings of the local citizens, the Mandal expanded from a small initiative into a strong center of social welfare and devotion."
    },
    {
      phaseMr: "द्वितीय चरण",
      phaseEn: "PHASE 2",
      year: "2015",
      yearMr: "२०१५",
      titleMr: "स्मार्ट गणेशोत्सव",
      titleEn: "Smart Ganesh Utsav",
      image: ganarayaAward,
      descMr: "२०१५ मध्ये नव्या पिढीने मंडळाची धुरा सांभाळत स्मार्ट गणेशोत्सव ही अभिनव संकल्पना सुरू केली. परंपरा आणि आधुनिक तंत्रज्ञानाची सांगड घालत डिजिटल इंडिया, मेक इन इंडिया, पर्यावरण संवर्धन आणि सामाजिक जनजागृती यांसारखे उपक्रम राबविण्यात आले. प्रदूषणमुक्त मिरवणूक, गुलालाऐवजी पुष्पवृष्टी, इंटरनेटद्वारे गणेशोत्सवाचे थेट प्रसारण तसेच विविध वयोगटांसाठी स्पर्धांचे आयोजन करून उत्सवाला आधुनिक आणि समाजाभिमुख स्वरूप देण्यात आले. नावीन्य, तंत्रज्ञानाचा प्रभावी वापर आणि सामाजिक बांधिलकी यांचा सुंदर संगम साधत विघ्नहर्ता मित्र मंडळाने स्मार्ट गणेशोत्सव ही एक प्रेरणादायी चळवळ म्हणून यशस्वीपणे विकसित केली.",
      descEn: "In 2015, the new generation took over the leadership of the Mandal and introduced the innovative concept of 'Smart Ganesh Utsav'. Blending tradition with modern technology, campaigns like Digital India, Make in India, environmental conservation, and social awareness were launched. With pollution-free processions, flower showers instead of gulal, live streaming of Ganesha festival via internet, and organizing competitions for different age groups, the festival was given a modern and society-oriented format. Successfully merging innovation, technology, and social responsibility, Vighnaharta Mitra Mandal transformed the Smart Ganesh Utsav into an inspiring movement."
    },
    {
      phaseMr: "तृतीय चरण",
      phaseEn: "PHASE 3",
      year: "2020",
      yearMr: "२०२०",
      titleMr: "नव्या पिढीचा नवा अध्याय",
      titleEn: "New Chapter of New Generation",
      image: aartiUtsav,
      descMr: "२०२० पासून अनेक नव्या सदस्यांनी मंडळात प्रवेश करून नवीन ऊर्जा, दूरदृष्टी आणि नाविन्यपूर्ण कल्पनांनी मंडळाच्या कार्याला नवी दिशा दिली. गणेशोत्सवापुरते कार्य मर्यादित न ठेवता वर्षभर धार्मिक, सामाजिक आणि सांस्कृतिक उपक्रमांचे सातत्याने आयोजन सुरू करण्यात आले. संत मुक्ताबाई पालखी स्वागत सोहळा, स्त्रीशक्ती प्रदर्शन, वृक्षारोपण, शालेय साहित्य वाटप, स्वच्छता अभियान तसेच विविध समाजोपयोगी उपक्रमांमधून मंडळाने समाजाशी आपली नाळ अधिक दृढ केली. २०२२ मध्ये गरबा-दांडिया महोत्सव या नव्या उपक्रमाची सुरुवात झाली आणि तो आज मंडळाचा लोकप्रिय वार्षिक उत्सव बनला आहे. युवकांना एकत्र आणत समाजसेवा आणि संस्कृती संवर्धनाचा वसा जपत मंडळाने नवे मानदंड निर्माण केले. या सातत्यपूर्ण कार्याची दखल घेत बीड पोलीस विभागातर्फे २०२४ मध्ये “गणराया पुरस्कार” द्वितीय क्रमांकाने, तर २०२५ मध्ये प्रथम क्रमांकाने मंडळाचा गौरव करण्यात आला, ज्यामुळे विघ्नहर्ता मित्र मंडळाच्या कार्याला नवी उंची प्राप्त झाली.",
      descEn: "Since 2020, many new members joined the Mandal, bringing new energy, vision, and innovative ideas to guide the Mandal's work. The activities were no longer restricted only to the Ganesh festival, but expanded year-round to include religious, social, and cultural events. Welcoming ceremonies for Sant Muktabai Palkhi, women empowerment exhibitions, tree plantation drives, distributing school supplies, cleanliness campaigns, and other social welfare initiatives further strengthened the Mandal's bond with society. In 2022, the Garba-Dandiya Festival was launched as a new initiative, which has now become a highly popular annual celebration. By bringing youth together and preserving social service and cultural heritage, the Mandal set new benchmarks. In recognition of this consistent work, the Beed Police Department honored the Mandal with the 2nd prize 'Ganaraya Award' in 2024, and the 1st prize in 2025, taking the Mandal's glory to new heights."
    },
    {
      phaseMr: "चतुर्थ चरण",
      phaseEn: "PHASE 4",
      year: "2026",
      yearMr: "२०२६",
      titleMr: "विघ्नहर्ताचे मंदिर",
      titleEn: "Temple of Vighnaharta",
      image: aboutGaneshaTemple,
      descMr: "२०२६ हे वर्ष विघ्नहर्ता मित्र मंडळाच्या इतिहासातील एक सुवर्णक्षण ठरले. अनेक वर्षांच्या अथक परिश्रम, अखंड श्रद्धा आणि गणेशभक्तांच्या सहकार्याने श्री गणरायाची विधिवत प्राणप्रतिष्ठा करून सुंदर व देखणे गणेश मंदिर उभारण्यात आले. मंडळाच्या स्थापनेपासून जपलेले हे स्वप्न अखेर साकार झाले आणि भक्तांसाठी कायमस्वरूपी श्रद्धास्थान निर्माण झाले. हे मंदिर धार्मिक, सामाजिक आणि सांस्कृतिक उपक्रमांचे प्रेरणाकेंद्र बनले असून वर्षभर विविध कार्यक्रमांचे आयोजन येथे केले जात आहे. १९९० मध्ये एका छोट्याशा उपक्रमातून सुरू झालेला हा प्रवास आज हजारो गणेशभक्तांच्या विश्वास, सेवाभाव आणि संस्कृती संवर्धनाचे प्रेरणादायी प्रतीक म्हणून अभिमानाने उभा आहे.",
      descEn: "The year 2026 proved to be a golden moment in the history of Vighnaharta Mitra Mandal. Through years of hard work, unwavering faith, and the support of Ganesha devotees, a beautiful Ganesha Temple was constructed with the ritual installation (pran-pratishtha) of Shree Ganesha's idol. This dream, nurtured since the establishment of the Mandal, was finally realized, establishing a permanent place of faith for devotees. Today, this temple serves as an inspiration center for religious, social, and cultural activities, hosting various programs throughout the year. The journey that started in 1990 from a small initiative proudly stands today as an inspiring symbol of trust, service, and cultural preservation for thousands of Ganesha devotees."
    }
  ];

  return (
    <div style={container}>
      <header style={headerSection}>
        <h1 style={mainTitle}>
          {isMarathi ? "📜 मंडळाचा गौरवशाली प्रवास" : "📜 Glorious Journey"}
        </h1>
        <p style={subtitle}>
          {isMarathi 
            ? "१९९० पासून सुरू झालेली भक्ती, संस्कृती आणि सामाजिक कार्याची यशस्वी वाटचाल" 
            : "A chronicle of devotion, culture, and service since 1990"}
        </p>
        <div style={dividerLine} />
      </header>

      <div style={timelineContainer}>
        {milestones.map((m, idx) => (
          <div key={idx} style={timelineItem}>
            {/* Year / Phase Badge */}
            <div style={yearBadge}>
              <span style={badgePhase}>{isMarathi ? m.phaseMr : m.phaseEn}</span>
              <span style={badgeYear}>{isMarathi ? m.yearMr : m.year}</span>
            </div>

            {/* Content Card */}
            <div style={card}>
              <h3 style={cardTitle}>
                <span style={titleYear}>{isMarathi ? m.yearMr : m.year}</span>
                <span style={titleSep}>—</span>
                <span>{isMarathi ? m.titleMr : m.titleEn}</span>
              </h3>
              
              <div style={cardGrid} className="journey-card-grid">
                {/* Text Block */}
                <div style={textCol}>
                  <p style={cardDesc}>{isMarathi ? m.descMr : m.descEn}</p>
                </div>

                {/* Photo Block */}
                {m.image && (
                  <div style={imageCol}>
                    <div style={imageWrapper}>
                      <img src={m.image} alt={m.titleEn} style={timelineImage} />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

/* Styles */
const container = {
  minHeight: "100vh",
  padding: "130px 5vw 80px 5vw",
  background: "linear-gradient(to bottom, #FFFDF5, #F9F3DF)",
  color: "#333",
  fontFamily: "'Outfit', 'Inter', sans-serif"
};

const headerSection = {
  textAlign: "center",
  marginBottom: "60px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center"
};

const mainTitle = {
  fontSize: "2.8rem",
  fontWeight: "800",
  color: "#a0522d",
  textShadow: "0 2px 4px rgba(0,0,0,0.05)",
  marginBottom: "10px"
};

const subtitle = {
  fontSize: "1.2rem",
  color: "#5c5c5c",
  maxWidth: "700px",
  lineHeight: "1.6",
  fontWeight: "500"
};

const dividerLine = {
  width: "120px",
  height: "4px",
  background: "linear-gradient(90deg, #ff7a00, #ffc837)",
  borderRadius: "2px",
  marginTop: "20px"
};

const timelineContainer = {
  maxWidth: "1100px",
  margin: "0 auto",
  display: "flex",
  flexDirection: "column",
  gap: "50px",
  position: "relative",
  paddingLeft: "40px",
  borderLeft: "4px solid #ebdcb9"
};

const timelineItem = {
  position: "relative",
  display: "flex",
  flexDirection: "column"
};

const yearBadge = {
  position: "absolute",
  left: "-72px",
  top: "10px",
  width: "60px",
  height: "60px",
  borderRadius: "50%",
  background: "linear-gradient(135deg, #ff7a00, #d84315)",
  color: "#fff",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  boxShadow: "0 6px 15px rgba(216, 67, 21, 0.25)",
  border: "4px solid #FFFDF5"
};

const badgePhase = {
  fontSize: "7px",
  fontWeight: "bold",
  textTransform: "uppercase",
  letterSpacing: "0.5px",
  opacity: "0.9"
};

const badgeYear = {
  fontSize: "13px",
  fontWeight: "bold",
  marginTop: "2px"
};

const card = {
  background: "#ffffff",
  padding: "35px",
  borderRadius: "20px",
  boxShadow: "0 10px 30px rgba(0,0,0,0.04)",
  border: "1px solid #ebdcb9",
  borderTop: "6px solid #ff7a00", // Stylish top accent line
  transition: "all 0.3s ease"
};

const cardTitle = {
  fontSize: "1.6rem",
  color: "#ff7a00",
  margin: "0 0 25px 0",
  fontWeight: "bold",
  display: "flex",
  alignItems: "center",
  gap: "10px"
};

const titleYear = {
  color: "#d84315",
  fontWeight: "800"
};

const titleSep = {
  color: "#ebdcb9"
};

const cardGrid = {
  display: "grid",
  gridTemplateColumns: "1fr",
  gap: "30px",
  alignItems: "center"
};

// CSS media query simulation using standard grid responsiveness:
// For desktop width, we style it cleanly
const textCol = {
  width: "100%"
};

const cardDesc = {
  fontSize: "1.1rem",
  lineHeight: "1.8",
  color: "#444",
  margin: "0",
  textAlign: "justify"
};

const imageCol = {
  width: "100%",
  display: "flex",
  justifyContent: "center"
};

const imageWrapper = {
  borderRadius: "16px",
  overflow: "hidden",
  boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
  width: "100%",
  maxWidth: "240px",
  border: "4px solid #FAF7E6"
};

const timelineImage = {
  width: "100%",
  height: "auto",
  objectFit: "contain",
  display: "block"
};

// Add responsive grid style properties
if (typeof window !== "undefined") {
  const matchMobile = window.matchMedia("(min-width: 900px)");
  if (matchMobile.matches) {
    cardGrid.gridTemplateColumns = "1.5fr 1fr";
  }
}

export default AboutJourney;
