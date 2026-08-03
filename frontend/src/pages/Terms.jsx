import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Terms = () => {
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
    title: isMarathi ? "अटी आणि शर्ती" : "Terms & Conditions",
    subTitle: isMarathi ? "॥ श्री विघ्नहर्ताय नमः ॥" : "|| Shree Vighnahartaya Namah ||",
    desc: isMarathi 
      ? "विघ्नहर्ता मित्र मंडळ, बीड च्या अधिकृत संकेतस्थळावर आपले स्वागत आहे. कृपया खालील अटी व शर्ती काळजीपूर्वक वाचा."
      : "Welcome to the official website of Vighnaharta Mitra Mandal, Beed. Please read these terms and conditions carefully.",
    lastUpdated: isMarathi ? "अंतिम अद्यतन: ३ ऑगस्ट २०२६" : "Last Updated: August 3, 2026",
    sections: [
      {
        icon: "description",
        title: isMarathi ? "१. अटींची स्वीकृती (Acceptance of Terms)" : "1. Acceptance of Terms",
        text: isMarathi 
          ? "या संकेतस्थळाचा वापर करून, आपण या अटी आणि शर्तींचे पूर्ण पालन करण्यास सहमती दर्शवता. जर आपण या अटींशी असहमत असाल, तर कृपया संकेतस्थळाचा वापर करू नये."
          : "By accessing and using this website, you accept and agree to be bound by these Terms & Conditions. If you do not agree, please do not use this website."
      },
      {
        icon: "language",
        title: isMarathi ? "२. संकेतस्थळ वापर (Website Usage)" : "2. Website Usage",
        text: isMarathi 
          ? "हे संकेतस्थळ केवळ माहिती मिळवणे, सामाजिक उपक्रमांमध्ये सहभागी होणे, स्पर्धांसाठी नोंदणी करणे आणि देणगी देणे यासाठी उपलब्ध आहे. संकेतस्थळाचा कोणताही अनधिकृत वापर कायद्यानुसार गुन्हा मानला जाईल."
          : "This website is provided for informational, donation, and event registration purposes. Any unauthorized, illegal, or commercial exploitation of this site is strictly prohibited."
      },
      {
        icon: "account_circle",
        title: isMarathi ? "३. वापरकर्त्याची जबाबदारी (User Responsibilities)" : "3. User Responsibilities",
        text: isMarathi 
          ? "नोंदणी किंवा देणगी देताना योग्य आणि अचूक माहिती देणे ही वापरकर्त्याची संपूर्ण जबाबदारी आहे. खोटी माहिती दिल्यास नोंदणी रद्द करण्याचा अधिकार मंडळाकडे राखीव आहे."
          : "Users are responsible for providing accurate and truthful information during signup, event registration, and donations. Providing false information may lead to termination of access."
      },
      {
        icon: "volunteer_activism",
        title: isMarathi ? "४. देणगी धोरण (Donations Policy)" : "4. Donations Policy",
        text: isMarathi 
          ? "मंडळाला दिलेली देणगी सामाजिक आणि धार्मिक कार्यांसाठी वापरली जाते. एकदा दिलेली देणगी कोणत्याही परिस्थितीत परत (Refund) केली जाणार नाही. सर्व देणग्यांवर कर सवलत नियमांनुसार लागू आहे."
          : "All donations made to the Mandal are voluntary and non-refundable. Funds are utilized directly for social, environmental, and religious initiatives organized by the Mandal."
      },
      {
        icon: "event_available",
        title: isMarathi ? "५. स्पर्धा व कार्यक्रम नोंदणी (Event Registration)" : "5. Event Registration Policy",
        text: isMarathi 
          ? "स्पर्धांच्या नोंदणीसाठी दिलेले नियम पाळणे बंधनकारक आहे. प्रवेश पास मिळवण्यासाठी दर्शविलेला तिकीट आयडी (Ticket ID) मंडळाच्या कार्यालयात दाखवणे आवश्यक आहे."
          : "Registrations for cultural or sports events must follow corresponding entry guidelines. Devotees must present their digital Ticket ID at the Mandal office to collect physical passes."
      },
      {
        icon: "workspace_premium",
        title: isMarathi ? "६. बौद्धिक संपदा अधिकार (Intellectual Property)" : "6. Intellectual Property Rights",
        text: isMarathi 
          ? "संकेतस्थळावरील सर्व मजकूर, ग्राफिक्स, लोगो, कॅलिग्राफी आणि इतर बौद्धिक संपदा ही केवळ मंडळाची मालकी आहे. मंडळाच्या पूर्वपरवानगीशिवाय याचे कॉपी किंवा पुनर्प्रकाशन करता येणार नाही."
          : "All original content, graphics, custom font mappings, UI designs, animations, and photos are the intellectual property of the Mandal and protected under copyright laws."
      },
      {
        icon: "copyright",
        title: isMarathi ? "७. कॉपीराइट संरक्षण (Copyright Protection)" : "7. Copyright Protection",
        text: isMarathi 
          ? "वेबसाईटचा कोणताही भाग बेकायदेशीरपणे वापरणे, कॉपी करणे, किंवा पुन्हा वितरित करणे कायद्याने प्रतिबंधित आहे. कॉपीराइट कायद्याचे उल्लंघन करणाऱ्यांवर कडक कायदेशीर कारवाई केली जाईल."
          : "Unauthorized duplication, mirroring, reverse engineering, or redistributing of any asset from this website is strictly prohibited and subject to legal action under copyright acts."
      },
      {
        icon: "link",
        title: isMarathi ? "८. तृतीय पक्ष दुवे (Third Party Links)" : "8. Third Party Links",
        text: isMarathi 
          ? "आमच्या वेबसाईटवर इतर सामाजिक दुवे किंवा देणगी गेटवे असू शकतात. त्यांच्या अचूकतेसाठी किंवा धोरणांसाठी आमचे मंडळ जबाबदार असणार नाही."
          : "This website may contain links to external sites or third-party payment gateways. We do not assume responsibility for the content, privacy policies, or practices of third-party platforms."
      },
      {
        icon: "gavel",
        title: isMarathi ? "९. अस्वीकरण (Disclaimer)" : "9. Disclaimer",
        text: isMarathi 
          ? "हे संकेतस्थळ कोणत्याही हमीशिवाय 'जसे आहे तसे' (As Is) तत्वावर उपलब्ध आहे. तांत्रिक बिघाड किंवा तात्पुरत्या बंद पडण्याबाबत मंडळ कोणतीही हमी देत नाही."
          : "This site and its content are provided on an 'as is' basis without warranties of any kind. We do not guarantee uninterrupted server operations or instantaneous SMS delivery."
      },
      {
        icon: "warning",
        title: isMarathi ? "१०. दायित्वाची मर्यादा (Limitation of Liability)" : "10. Limitation of Liability",
        text: isMarathi 
          ? "या संकेतस्थळाच्या वापरामुळे किंवा वापराच्या असमर्थतेमुळे होणाऱ्या कोणत्याही अप्रत्यक्ष किंवा प्रत्यक्ष नुकसानीस मंडळ किंवा त्याचे पदाधिकारी जबाबदार राहणार नाहीत."
          : "In no event shall the Mandal or its executives be liable for any damages arising out of the use or inability to use the services, including network errors during OTP verification."
      },
      {
        icon: "security",
        title: isMarathi ? "११. गोपनीयता आणि डेटा वापर (Privacy & Data Usage)" : "11. Privacy & Data Usage",
        text: isMarathi 
          ? "आम्ही आपल्या गोपनीयतेचा आदर करतो. आपले डेटा संकलन आणि वापर आमच्या गोपनीयता धोरणांतर्गत (Privacy Policy) सुरक्षित ठेवले जाते."
          : "We respect your personal privacy. Any information collected during authentication, registration, or contact is handled in accordance with our Privacy Policy."
      },
      {
        icon: "update",
        title: isMarathi ? "१२. शर्तींमधील बदल (Changes to Terms)" : "12. Changes to Terms",
        text: isMarathi 
          ? "मंडळ कोणत्याही पूर्वसूचनेशिवाय या अटींमध्ये सुधारणा किंवा बदल करण्याचा अधिकार राखून ठेवते. सुधारित अटी वेबसाईटवर त्वरित लागू केल्या जातील."
          : "The Mandal reserves the right to modify or replace these terms at any time. Your continued usage after amendments constitute acceptance of the updated terms."
      },
      {
        icon: "contact_support",
        title: isMarathi ? "१३. संपर्क माहिती (Contact Information)" : "13. Contact Information",
        text: isMarathi 
          ? "अटी आणि शर्तींविषयी आपल्या काही शंका असल्यास, कृपया आम्हाला vighnahartamitramandal025@gmail.com वर संपर्क साधा."
          : "If you have any questions regarding these Terms & Conditions, please contact us at: vighnahartamitramandal025@gmail.com"
      }
    ]
  };

  return (
    <div className="min-h-screen pt-32 pb-20 px-4 md:px-8 lg:px-16 bg-gradient-to-b from-[#180d03] via-[#3d1d02] to-[#120700] text-[#FFF2CC] flex flex-col items-center">
      
      {/* Decorative aura */}
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

      {/* Grid of Terms Cards */}
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
        {content.sections.map((sec, idx) => (
          <div 
            key={idx}
            className="p-6 rounded-2xl bg-white/[0.03] backdrop-blur-md border border-amber-500/10 shadow-[0_4px_30px_rgba(0,0,0,0.3)] hover:border-amber-400/30 hover:bg-white/[0.05] transition-all duration-300 flex gap-4 items-start group"
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

export default Terms;
