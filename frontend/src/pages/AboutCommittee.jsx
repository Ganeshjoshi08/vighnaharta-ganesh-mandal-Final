import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AboutCommittee = () => {
  const navigate = useNavigate();
  const [lang, setLang] = useState(localStorage.getItem("lang") || "marathi");

  useEffect(() => {
    window.scrollTo(0, 0);
    const handleLangChange = () => {
      setLang(localStorage.getItem("lang") || "marathi");
    };
    window.addEventListener("langChange", handleLangChange);
    return () => {
      window.removeEventListener("langChange", handleLangChange);
    };
  }, []);

  const isMarathi = lang === "marathi";

  // 1. Founder & Advisory Board (मुख्य मार्गदर्शक मंडळ)
  const founderPresident = {
    roleMr: "संस्थापक अध्यक्ष",
    roleEn: "Founder President",
    nameMr: "श्री. शुभम (विक्की) जोशी",
    nameEn: "Mr. Shubham (Vikki) Joshi"
  };

  const advisoryBoard = [
    {
      roleMr: "मुख्य सचिव",
      roleEn: "Chief Secretary",
      nameMr: "श्री. कौस्तुभ गुळजकर",
      nameEn: "Mr. Kaustubh Gulajkar"
    },
    {
      roleMr: "मुख्य सचिव",
      roleEn: "Chief Secretary",
      nameMr: "श्री. उमेश कुलकर्णी",
      nameEn: "Mr. Umesh Kulkarni"
    },
    {
      roleMr: "कार्याध्यक्ष",
      roleEn: "Working President",
      nameMr: "श्री. अक्षय मिलिंद कुलकर्णी",
      nameEn: "Mr. Akshay Milind Kulkarni"
    }
  ];

  // 2. Executive Committee 2026 (नवीन कार्यकारिणी)
  const executiveCommittee = [
    {
      roleMr: "अध्यक्ष",
      roleEn: "President",
      nameMr: "श्री. गौरव कुलकर्णी",
      nameEn: "Mr. Gaurav Kulkarni",
      icon: "👑"
    },
    {
      roleMr: "कार्याध्यक्ष",
      roleEn: "Working President",
      nameMr: "श्री. अक्षय मिलिंद कुलकर्णी",
      nameEn: "Mr. Akshay Milind Kulkarni",
      icon: "🎖️"
    },
    {
      roleMr: "उपाध्यक्ष",
      roleEn: "Vice President",
      nameMr: "श्री. मयुरेश कव्हाळे",
      nameEn: "Mr. Mayuresh Kavhale",
      icon: "⚡"
    },
    {
      roleMr: "सचिव",
      roleEn: "Secretary",
      nameMr: "श्री. मंदार कुलकर्णी",
      nameEn: "Mr. Mandar Kulkarni",
      icon: "📝"
    },
    {
      roleMr: "सचिव",
      roleEn: "Secretary",
      nameMr: "श्री. गिरीश सेलमोरकर",
      nameEn: "Mr. Girish Selmokar",
      icon: "📝"
    },
    {
      roleMr: "कोषाध्यक्ष",
      roleEn: "Treasurer",
      nameMr: "श्री. प्रशांत जोतकर",
      nameEn: "Mr. Prashant Jotkar",
      icon: "💰"
    },
    {
      roleMr: "सोशल मिडिया प्रमुख",
      roleEn: "Social Media Head",
      nameMr: "श्री. अक्षय अजित कुलकर्णी",
      nameEn: "Mr. Akshay Ajit Kulkarni",
      icon: "📣"
    },
    {
      roleMr: "सोशल मिडिया प्रमुख",
      roleEn: "Social Media Head",
      nameMr: "श्री. गणेश जोशी",
      nameEn: "Mr. Ganesh Joshi",
      icon: "📣"
    },
    {
      roleMr: "सोशल मिडिया प्रमुख",
      roleEn: "Social Media Head",
      nameMr: "श्री. कुणाल कुलकर्णी",
      nameEn: "Mr. Kunal Kulkarni",
      icon: "📣"
    },
    {
      roleMr: "कार्यवाहक",
      roleEn: "Executive Coordinator",
      nameMr: "श्री. सार्थक गोले",
      nameEn: "Mr. Sarthak Gole",
      icon: "💼"
    },
    {
      roleMr: "कार्यवाहक",
      roleEn: "Executive Coordinator",
      nameMr: "श्री. वरद कुलकर्णी",
      nameEn: "Mr. Varad Kulkarni",
      icon: "💼"
    },
    {
      roleMr: "सहकार्यवाहक",
      roleEn: "Joint Coordinator",
      nameMr: "श्री. प्रतीक देशमुख",
      nameEn: "Mr. Pratik Deshmukh",
      icon: "🤝"
    },
    {
      roleMr: "व्यवस्थापक",
      roleEn: "Manager",
      nameMr: "श्री. श्रेयस अवधाळ",
      nameEn: "Mr. Shreyas Avadhal",
      icon: "⚙️"
    },
    {
      roleMr: "व्यवस्थापक",
      roleEn: "Manager",
      nameMr: "श्री. अमोघ बाभुळगांवकर",
      nameEn: "Mr. Amogh Babhulgaonkar",
      icon: "⚙️"
    },
    {
      roleMr: "विभाग प्रमुख",
      roleEn: "Department Head",
      nameMr: "श्री. सोहम ऋषी",
      nameEn: "Mr. Soham Rishi",
      icon: "📍"
    },
    {
      roleMr: "विभाग प्रमुख",
      roleEn: "Department Head",
      nameMr: "श्री. सागर जोतकर",
      nameEn: "Mr. Sagar Jotkar",
      icon: "📍"
    },
    {
      roleMr: "पुरोहित प्रमुख",
      roleEn: "Priest Coordinator",
      nameMr: "श्री. प्रशांत सरवदे",
      nameEn: "Mr. Prashant Sarvade",
      icon: "🙏"
    },
    {
      roleMr: "सांस्कृतिक प्रमुख",
      roleEn: "Cultural Coordinator",
      nameMr: "श्री. वेदांत पाटील",
      nameEn: "Mr. Vedant Patil",
      icon: "🎨"
    }
  ];

  // 3. Women Representatives Committee (महिला प्रतिनिधी मंडळ)
  const womenCommittee = [
    { nameMr: "कु. पूर्वा पातोदकर", nameEn: "Miss Purva Patodkar" },
    { nameMr: "कु. सावी तट्टे", nameEn: "Miss Savi Tatte" },
    { nameMr: "कु. शिवाणी खडकीकर", nameEn: "Miss Shivani Khadkikar" },
    { nameMr: "कु. श्रावणी रुईकर", nameEn: "Miss Shravani Ruikar" }
  ];

  // 4. Members (सदस्य)
  const generalMembers = [
    { nameMr: "भाग्येश जोशी", nameEn: "Bhagyesh Joshi" },
    { nameMr: "यशराज कापसे", nameEn: "Yashraj Kapse" },
    { nameMr: "मानस जोशी", nameEn: "Manas Joshi" },
    { nameMr: "मयूर लवंडे", nameEn: "Mayur Lawande" },
    { nameMr: "सुयोग जोशी", nameEn: "Suyog Joshi" },
    { nameMr: "यज्ञेश कुलकर्णी", nameEn: "Yagnesh Kulkarni" },
    { nameMr: "सर्वेश बर्दापूरकर", nameEn: "Sarvesh Bardapurkar" },
    { nameMr: "अर्णव पांडव", nameEn: "Arnav Pandav" },
    { nameMr: "शंभू पाटील", nameEn: "Shambhu Patil" },
    { nameMr: "समर्थ क्षीरसागर", nameEn: "Samarth Kshirsagar" },
    { nameMr: "प्रसाद बाभुळगावकर", nameEn: "Prasad Babhulgaonkar" }
  ];

  return (
    <div className="min-h-screen bg-neutral-50 pt-28 pb-16 font-serif">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* HEADER HERO */}
        <div className="text-center bg-gradient-to-r from-[#200b02] via-[#4a1c02] to-[#200b02] text-[#FFE9A3] py-10 px-6 rounded-3xl border-2 border-[#D4AF37] shadow-xl relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
          <h1 className="text-3xl md:text-5xl font-black tracking-wide filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.85)]">
            {isMarathi ? "विघ्नहर्ता मित्र मंडळ, बीड" : "Vighnaharta Mitra Mandal, Beed"}
          </h1>
          <p className="text-sm md:text-lg mt-3 text-white/90 italic tracking-wider font-semibold">
            {isMarathi ? "स्थापना: १९९० • विघ्नहर्ता चौक, जुन्या तहसीलच्या मागे, बीड" : "Estd: 1990 • Vighnaharta Chowk, Behind Old Tehsil, Beed"}
          </p>
          <div className="mt-4 inline-block bg-amber-500/20 text-[#FFE9A3] border border-[#D4AF37]/50 px-5 py-1.5 rounded-full text-xs md:text-sm font-bold tracking-widest uppercase">
            {isMarathi ? "॥ स्मार्ट गणेशोत्सव २०२६ ॥" : "|| Smart Ganeshotsav 2026 ||"}
          </div>
        </div>

        {/* SECTION 1: FOUNDER & ADVISORY BOARD (मुख्य मार्गदर्शक मंडळ) */}
        <section className="space-y-6">
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-black text-[#4a1c02] border-b-2 border-[#D4AF37] inline-block pb-1">
              {isMarathi ? "• मुख्य मार्गदर्शक मंडळ •" : "• Founder & Advisory Board •"}
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            
            {/* Highlighted Founder President Card */}
            <div className="lg:col-span-1 bg-white p-8 rounded-2xl border-2 border-[#D4AF37] shadow-md flex flex-col items-center text-center justify-center gap-4 relative overflow-hidden bg-gradient-to-b from-[#FCF9F2] to-white">
              <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-500 to-yellow-400 flex items-center justify-center text-3xl shadow-md border border-[#D4AF37]/50 select-none">
                👑
              </div>
              <div>
                <span className="text-xs font-black text-amber-800 uppercase tracking-widest block mb-1">
                  {isMarathi ? founderPresident.roleMr : founderPresident.roleEn}
                </span>
                <h3 className="text-xl md:text-2xl font-black text-neutral-900">
                  {isMarathi ? founderPresident.nameMr : founderPresident.nameEn}
                </h3>
              </div>
              <div className="w-16 h-0.5 bg-[#4a1c02]/50" />
            </div>

            {/* Other Advisory Board Members */}
            <div className="lg:col-span-2 bg-[#FCF9F2]/60 rounded-2xl border border-[#ebdcb9] p-6 grid grid-cols-1 sm:grid-cols-3 gap-6">
              {advisoryBoard.map((b, idx) => (
                <div key={idx} className="bg-white p-6 rounded-xl border border-[#ebdcb9]/60 shadow-sm flex flex-col items-center text-center justify-center gap-3 hover:scale-[1.02] transition">
                  <span className="text-xs font-bold text-amber-700 uppercase tracking-wider block">
                    {isMarathi ? b.roleMr : b.roleEn}
                  </span>
                  <h4 className="text-md md:text-lg font-black text-neutral-900">
                    {isMarathi ? b.nameMr : b.nameEn}
                  </h4>
                  <div className="w-10 h-0.5 bg-[#D4AF37]" />
                </div>
              ))}
            </div>

          </div>

          {/* Mandal Message */}
          <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm text-center max-w-4xl mx-auto space-y-3">
            <h4 className="text-lg font-bold text-[#4a1c02]">{isMarathi ? "मंडळाचा संदेश" : "Mandal's Message"}</h4>
            <p className="text-sm md:text-base text-neutral-600 leading-relaxed">
              {isMarathi
                ? "यांच्या सातत्यपूर्ण मार्गदर्शनाखाली मंडळाची कार्यकारिणी कार्यरत असून, त्यांच्या मार्गदर्शनातून स्मार्ट गणेशोत्सव २०२६ साठी नवीन कार्यकारिणी जाहीर करण्यात आली आहे. यंदाच्या कार्यकारिणीत महिला सहभागाला प्रोत्साहन देत महिला प्रतिनिधी मंडळाची नियुक्ती करण्यात आली आहे."
                : "Under their continuous guidance, the executive committee is actively working, and this new committee has been announced for Smart Ganeshotsav 2026. Empowering women participation, a special Women Representatives Committee has been appointed this year."}
            </p>
          </div>
        </section>

        {/* SECTION 2: NEW EXECUTIVE COMMITTEE (नवीन कार्यकारिणी) */}
        <section className="space-y-6">
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-black text-[#4a1c02] border-b-2 border-[#D4AF37] inline-block pb-1">
              {isMarathi ? "• नवीन कार्यकारिणी २०२६ •" : "• New Executive Committee 2026 •"}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {executiveCommittee.map((member, idx) => (
              <div key={idx} className="bg-white p-5 rounded-2xl border border-neutral-200 shadow-sm hover:shadow-md hover:border-[#D4AF37]/50 hover:scale-[1.02] transition flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center text-2xl border border-amber-200/50 flex-shrink-0 select-none">
                  {member.icon}
                </div>
                <div>
                  <span className="text-[10px] font-bold text-amber-700 uppercase tracking-widest block mb-0.5">
                    {isMarathi ? member.roleMr : member.roleEn}
                  </span>
                  <h4 className="text-sm md:text-base font-black text-neutral-900">
                    {isMarathi ? member.nameMr : member.nameEn}
                  </h4>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 3: WOMEN REPRESENTATIVES COMMITTEE (महिला प्रतिनिधी मंडळ) */}
        <section className="space-y-6">
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-black text-[#4a1c02] border-b-2 border-[#D4AF37] inline-block pb-1">
              {isMarathi ? "• महिला प्रतिनिधी मंडळ •" : "• Women Representatives Committee •"}
            </h2>
          </div>

          <div className="max-w-3xl mx-auto bg-gradient-to-b from-[#FCF9F2] to-white p-8 rounded-3xl border-2 border-pink-200/50 shadow-sm">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {womenCommittee.map((w, idx) => (
                <div key={idx} className="bg-white p-4 rounded-xl border border-pink-100/50 shadow-sm flex items-center gap-3">
                  <span className="text-pink-500 font-bold text-lg select-none">🌸</span>
                  <span className="text-base font-bold text-neutral-800">{isMarathi ? w.nameMr : w.nameEn}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 4: GENERAL MEMBERS (सदस्य) */}
        <section className="space-y-6">
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-black text-[#4a1c02] border-b-2 border-[#D4AF37] inline-block pb-1">
              {isMarathi ? "• सदस्य •" : "• General Members •"}
            </h2>
          </div>

          <div className="max-w-4xl mx-auto bg-[#FCF9F2]/40 p-8 rounded-3xl border border-[#ebdcb9] shadow-sm">
            <div className="flex flex-wrap justify-center gap-3">
              {generalMembers.map((m, idx) => (
                <div key={idx} className="bg-white px-5 py-2.5 rounded-full border border-neutral-200 hover:border-[#D4AF37]/50 hover:bg-amber-50/20 shadow-sm transition text-sm font-bold text-neutral-800 flex items-center gap-2">
                  <span className="text-amber-500 font-bold select-none">🚩</span>
                  <span>{isMarathi ? m.nameMr : m.nameEn}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* JAY VIGHNAHARTA SLOGAN */}
        <div className="text-center pt-8">
          <p className="text-xl md:text-3xl font-black text-[#4a1c02] italic tracking-widest flex items-center justify-center gap-2">
            🚩 {isMarathi ? "जय विघ्नहर्ता !" : "Jay Vighnaharta !"}
          </p>
        </div>

      </div>
    </div>
  );
};

export default AboutCommittee;
