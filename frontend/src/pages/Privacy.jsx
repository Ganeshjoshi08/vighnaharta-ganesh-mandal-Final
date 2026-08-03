import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Privacy = () => {
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
    title: isMarathi ? "गोपनीयता धोरण" : "Privacy Policy",
    subTitle: isMarathi ? "॥ श्री विघ्नहर्ताय नमः ॥" : "|| Shree Vighnahartaya Namah ||",
    desc: isMarathi 
      ? "आपल्या गोपनीयतेचे रक्षण करणे ही आमची सर्वोच्च प्राथमिकता आहे. आम्ही आपले वैयक्तिक तपशील कसे सुरक्षित ठेवतो ते येथे वाचा."
      : "Protecting your privacy is our highest priority. Read here how we secure and handle your personal credentials.",
    lastUpdated: isMarathi ? "अंतिम अद्यतन: ३ ऑगस्ट २०२६" : "Last Updated: August 3, 2026",
    sections: [
      {
        icon: "badge",
        title: isMarathi ? "डेटा संकलन (Information We Collect)" : "Information We Collect",
        text: isMarathi 
          ? "आम्ही वापरकर्त्याचे नाव, ईमेल आयडी, संपर्क क्रमांक, पत्ता आणि देणगी दरम्यान पाठवलेली रक्कम किंवा स्पर्धा नोंदणी तपशील संकलित करतो."
          : "We collect basic identifying data including Name, Email Address, Phone Number, local coordinates, and transactions details during donations or competition registrations."
      },
      {
        icon: "query_stats",
        title: isMarathi ? "माहितीचा वापर (How We Use Information)" : "How We Use Information",
        text: isMarathi 
          ? "संकलित माहितीचा वापर केवळ ओटीपी पडताळणी, सुरक्षित लॉग इन, स्पर्धा तिकीट वाटप आणि मंडळाच्या महत्त्वाच्या सूचना पोहोचवण्यासाठी केला जातो."
          : "Collected credentials are used strictly for OTP verification, signup validations, ticket pass distributions, and processing donation receipts."
      },
      {
        icon: "cookie",
        title: isMarathi ? "कुकीज आणि स्थानिक संचयन (Cookies)" : "Cookies",
        text: isMarathi 
          ? "वेबसाईटचा वापर सुलभ करण्यासाठी आम्ही स्थानिक स्टोरेजचा (Local Storage) वापर करतो, जसे की आपली भाषा निवड (मराठी/इंग्रजी) आणि लॉगिन टोकन."
          : "We use browser local storage mechanisms to cache user preferences, such as selected language state and secure session tokens."
      },
      {
        icon: "lock",
        title: isMarathi ? "प्रमाणीकरण आणि सुरक्षा (Authentication)" : "Authentication",
        text: isMarathi 
          ? "आपले पासवर्ड डेटाबेसमध्ये Bcrypt हॅशिंग तंत्रज्ञानाने सुरक्षितपणे साठवले जातात. ते वाचण्यायोग्य किंवा कॉपी करण्यायोग्य नसतात."
          : "Passwords are encrypted using advanced Bcrypt cryptographic algorithms before storage, ensuring credentials remain unreadable and secure."
      },
      {
        icon: "mail",
        title: isMarathi ? "ईमेल पडताळणी (Email Verification)" : "Email Verification",
        text: isMarathi 
          ? "साइनअप किंवा पासवर्ड विसरल्यास ओटीपी पाठवण्यासाठी सुरक्षित ईमेल गेटवेचा (SMTP) वापर केला जातो, जेणेकरून अनाधिकृत प्रवेश रोखता येईल."
          : "We dispatch random OTP codes using secure Nodemailer SMTP gateways to verify authenticity and block illegal profile registrations."
      },
      {
        icon: "shield",
        title: isMarathi ? "डेटा सुरक्षा (Data Security)" : "Data Security",
        text: isMarathi 
          ? "आम्ही आपल्या डेटाची सुरक्षा सुनिश्चित करण्यासाठी एसएसएल (SSL) एन्क्रिप्शन आणि डेटाबेस फायरवॉल सुरक्षा मानकांचा वापर करतो."
          : "We employ SSL socket encryption layers and database firewall restrictions to ensure your personal details are fully guarded against breaches."
      },
      {
        icon: "api",
        title: isMarathi ? "तृतीय पक्ष सेवा (Third Party Services)" : "Third Party Services",
        text: isMarathi 
          ? "देणगी स्कॅन (UPI QR) किंवा गुगल नकाशे (Google Maps) यांसारख्या सेवांसाठी विश्वासार्ह बाह्य एपीआयचा वापर केला जातो."
          : "Our application integrates secure external API interfaces like Google Maps embeds and third-party payment gateways for donations."
      },
      {
        icon: "manage_accounts",
        title: isMarathi ? "वापरकर्त्याचे हक्क (User Rights)" : "User Rights",
        text: isMarathi 
          ? "वापरकर्त्याला त्यांचे प्रोफाइल तपशील पाहण्याचा, सुधारण्याचा किंवा खाते बंद (Delete) करण्याची विनंती करण्याचा पूर्ण अधिकार आहे."
          : "Users retain full rights to query, update, or request the deletion of their unverified profile logs and registered information."
      },
      {
        icon: "support_agent",
        title: isMarathi ? "संपर्क करा (Contact Information)" : "Contact Information",
        text: isMarathi 
          ? "आमच्या गोपनीयता धोरणांबद्दल कोणत्याही प्रश्नांसाठी, कृपया आम्हाला vighnahartamitramandal025@gmail.com वर संपर्क साधा."
          : "For any questions or concerns regarding our privacy policies, reach out to us at: vighnahartamitramandal025@gmail.com"
      }
    ]
  };

  return (
    <div className="min-h-screen pt-32 pb-20 px-4 md:px-8 lg:px-16 bg-gradient-to-b from-[#180d03] via-[#3d1d02] to-[#120700] text-[#FFF2CC] flex flex-col items-center">
      
      {/* Decorative background overlay */}
      <div className="absolute top-0 w-full h-[500px] bg-[radial-gradient(circle_at_top,rgba(246,196,83,0.15)_0%,transparent_70%)] pointer-events-none" />

      {/* Header section */}
      <div className="text-center max-w-3xl mb-16 relative z-10">
        <span className="text-amber-400 text-xs md:text-sm font-bold tracking-widest block uppercase mb-2">
          {content.subTitle}
        </span>
        <h1 className="font-display-hero text-3xl md:text-5xl font-black text-white tracking-wide drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
          {content.title}
        </h1>
        <div className="w-24 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto my-6" />
        <p className="text-sm md:text-base text-amber-100/80 leading-relaxed font-medium">
          {content.desc}
        </p>
        <span className="text-[10px] text-amber-500/60 font-bold block mt-4 uppercase tracking-wider">
          {content.lastUpdated}
        </span>
      </div>

      {/* Grid of Privacy Cards */}
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
        {content.sections.map((sec, idx) => (
          <div 
            key={idx}
            className="p-6 rounded-2xl bg-white/[0.03] backdrop-blur-md border border-amber-500/10 shadow-[0_4px_30px_rgba(0,0,0,0.3)] hover:border-amber-400/30 hover:bg-white/[0.05] transition-all duration-300 flex flex-col gap-4 items-start group"
          >
            <div className="p-3 bg-amber-500/10 rounded-xl text-amber-400 border border-amber-500/20 group-hover:scale-105 transition-transform duration-300 shrink-0">
              <span className="material-symbols-outlined text-2xl font-bold">{sec.icon}</span>
            </div>
            <div className="space-y-2">
              <h3 className="font-bold text-amber-300 text-sm md:text-base tracking-wide font-serif">
                {sec.title}
              </h3>
              <p className="text-xs md:text-sm text-amber-100/70 leading-relaxed font-medium">
                {sec.text}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Back button */}
      <button 
        onClick={() => navigate(-1)}
        className="mt-12 px-6 py-2.5 rounded-full font-bold text-xs tracking-wider text-amber-950 bg-gradient-to-r from-amber-400 to-[#F6C453] hover:from-amber-300 hover:to-[#FFE9A3] hover:scale-105 active:scale-95 transition-all shadow-lg cursor-pointer"
      >
        {isMarathi ? "मागे जा" : "GO BACK"}
      </button>

    </div>
  );
};

export default Privacy;
