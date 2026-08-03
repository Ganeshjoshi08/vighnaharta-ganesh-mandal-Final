import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Copyright = () => {
  const [lang, setLang] = useState(localStorage.getItem("lang") || "marathi");
  const navigate = useNavigate();

  useEffect(() => {
    const handleLangChange = () => {
      setLang(localStorage.getItem("lang") || "marathi");
    };
    window.addEventListener("langChange", handleLangChange);
    window.scrollTo(0, 0);
    return () => {
      window.removeEventListener("langChange", handleLangChange);
    };
  }, []);

  const isMarathi = lang === "marathi";

  const content = {
    title: isMarathi ? "कॉपीराइट नोटीस" : "Copyright Notice",
    subTitle: isMarathi ? "॥ श्री विघ्नहर्ताय नमः ॥" : "|| Shree Vighnahartaya Namah ||",
    noticeYear: "© 2026 Vighnaharta Mitra Mandal.",
    devTitle: isMarathi ? "डिझाइन आणि विकसित" : "Designed & Developed By",
    devName: "Ganesh N. Joshi",
    legalStatement1: isMarathi 
      ? "या संकेतस्थळाचे सर्व सोर्स कोड, UI/UX डिझाइन, मांडणी (Layouts), अ‍ॅनिमेशन्स, ग्राफिक्स, छायाचित्रे, लोगो, चिन्हे, ऑडिओ, व्हिडिओ, डेटाबेस रचना, दस्तऐवज, मजकूर आणि सर्व डिजिटल मालमत्ता ही अन्यथा स्पष्ट केल्याशिवाय विघ्नहर्ता मित्र मंडळ, बीड यांची अनन्य मालमत्ता आहे."
      : "All website source code, UI/UX design, layouts, animations, graphics, photographs, logos, icons, audio, videos, database structures, documents, text, and all digital assets are the intellectual property of Vighnaharta Mitra Mandal unless otherwise stated.",
    legalStatement2: isMarathi 
      ? "विघ्नहर्ता मित्र मंडळाच्या लेखी परवानगीशिवाय या वेबसाईट किंवा तिच्या कोणत्याही भागाची अनधिकृत कॉपी करणे, पुनरुत्पादन, बदल करणे, पुनर्वितरण, व्यावसायिक वापर, रिव्हर्स इंजिनीअरिंग, मिररिंग किंवा पुनर्प्रकाशन करण्यास सक्त मनाई आहे."
      : "Unauthorized copying, reproduction, modification, redistribution, commercial use, reverse engineering, mirroring, or republication of this website or any part of it is strictly prohibited without prior written permission.",
    legalStatement3: isMarathi 
      ? "हे संकेतस्थळ लागू कॉपीराइट कायदे आणि बौद्धिक संपदा अधिकारांनुसार (Intellectual Property Rights) पूर्णपणे संरक्षित आहे. नियमांचे उल्लंघन केल्यास कायदेशीर कारवाई होऊ शकते."
      : "This website is protected under applicable Copyright Laws and Intellectual Property Rights. Violations may result in legal action.",
    metaTitle: isMarathi ? "तांत्रिक तपशील" : "Technical Details",
    metaItems: [
      { label: isMarathi ? "वेबसाईट आवृत्ती" : "Website Version", value: "v2.1.0-Prod" },
      { label: isMarathi ? "शेवटचे अद्यतनित" : "Last Updated", value: "03 Aug 2026" },
      { label: isMarathi ? "कॉपीराइट वर्ष" : "Copyright Year", value: "2026" },
      { label: isMarathi ? "मुख्य विकसक" : "Lead Developer", value: "Ganesh N. Joshi" }
    ]
  };

  return (
    <div className="min-h-screen pt-32 pb-20 px-4 md:px-8 lg:px-16 bg-gradient-to-b from-[#180d03] via-[#3d1d02] to-[#120700] text-[#FFF2CC] flex flex-col items-center">
      
      {/* Background glow effects */}
      <div className="absolute top-0 w-full h-[500px] bg-[radial-gradient(circle_at_top,rgba(246,196,83,0.15)_0%,transparent_70%)] pointer-events-none" />

      {/* Ornament layout header */}
      <div className="text-center max-w-3xl mb-12 relative z-10">
        <span className="text-amber-400 text-xs md:text-sm font-bold tracking-widest block uppercase mb-2">
          {content.subTitle}
        </span>
        <h1 className="font-display-hero text-3xl md:text-5xl font-black text-white tracking-wide drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
          {content.title}
        </h1>
        <div className="w-24 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto my-4" />
      </div>

      {/* Main glassmorphism container */}
      <div className="w-full max-w-3xl bg-white/[0.03] backdrop-blur-md border border-amber-500/15 rounded-3xl p-8 shadow-[0_4px_30px_rgba(0,0,0,0.4)] space-y-8 relative z-10 overflow-hidden">
        
        {/* Top brand header */}
        <div className="text-center space-y-2 border-b border-amber-500/10 pb-6">
          <h2 className="text-xl md:text-2xl font-black text-amber-400 font-serif tracking-wide">
            {content.noticeYear}
          </h2>
          <p className="text-xs text-amber-100/60 uppercase tracking-widest font-bold">
            {content.devTitle}: <span className="text-white font-serif">{content.devName}</span>
          </p>
        </div>

        {/* Legal policy text blocks */}
        <div className="space-y-6 text-sm md:text-base text-amber-100/80 leading-relaxed font-medium">
          <div className="flex gap-4 items-start">
            <span className="material-symbols-outlined text-amber-400 text-2xl shrink-0 mt-0.5">folder_shared</span>
            <p>{content.legalStatement1}</p>
          </div>
          <div className="flex gap-4 items-start">
            <span className="material-symbols-outlined text-amber-400 text-2xl shrink-0 mt-0.5">gavel</span>
            <p>{content.legalStatement2}</p>
          </div>
          <div className="flex gap-4 items-start">
            <span className="material-symbols-outlined text-amber-400 text-2xl shrink-0 mt-0.5">policy</span>
            <p>{content.legalStatement3}</p>
          </div>
        </div>

        {/* Technical details grid */}
        <div className="border-t border-amber-500/10 pt-6 space-y-4">
          <h3 className="text-amber-400 text-sm font-bold uppercase tracking-wider font-serif">
            🛡️ {content.metaTitle}
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {content.metaItems.map((item, idx) => (
              <div key={idx} className="bg-amber-500/[0.03] border border-amber-500/10 p-4 rounded-xl text-center space-y-1">
                <span className="text-[10px] text-amber-200/50 uppercase font-bold tracking-wide block">
                  {item.label}
                </span>
                <span className="text-xs md:text-sm text-white font-bold block">
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Back button navigation */}
      <button 
        onClick={() => navigate(-1)}
        className="mt-12 px-6 py-2.5 rounded-full font-bold text-xs tracking-wider text-amber-950 bg-gradient-to-r from-amber-400 to-[#F6C453] hover:from-amber-300 hover:to-[#FFE9A3] hover:scale-105 active:scale-95 transition-all shadow-lg cursor-pointer"
      >
        {isMarathi ? "मागे जा" : "GO BACK"}
      </button>

    </div>
  );
};

export default Copyright;
