import React, { useEffect, useState, useRef } from "react";
import cricketImg from "../assets/event_cricket.jpg";

const Events = () => {
  const [lang, setLang] = useState(localStorage.getItem("lang") || "marathi");
  const formRef = useRef(null);

  // Form states
  const [formData, setFormData] = useState({
    fullName: "",
    contactNumber: "",
    competition: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [ticketData, setTicketData] = useState(null);

  // Volunteer Modal state
  const [showVolunteerModal, setShowVolunteerModal] = useState(false);
  const [volunteerForm, setVolunteerForm] = useState({
    name: "",
    phone: "",
    area: ""
  });
  const [volunteerSuccess, setVolunteerSuccess] = useState(false);

  // Timings Modal state
  const [showTimingsModal, setShowTimingsModal] = useState(false);

  useEffect(() => {
    // Override page background to soft cream gradient
    const originalBgColor = document.body.style.backgroundColor;
    const originalBgImage = document.body.style.backgroundImage;
    const originalAttachment = document.body.style.backgroundAttachment;

    document.body.style.backgroundColor = "#FEFCEB"; 
    document.body.style.backgroundImage = "none";
    document.body.style.backgroundAttachment = "unset";

    const handleLangChange = () => {
      setLang(localStorage.getItem("lang") || "marathi");
    };
    window.addEventListener("langChange", handleLangChange);

    return () => {
      document.body.style.backgroundColor = originalBgColor;
      document.body.style.backgroundImage = originalBgImage;
      document.body.style.backgroundAttachment = originalAttachment;
      window.removeEventListener("langChange", handleLangChange);
    };
  }, []);

  const translations = {
    marathi: {
      subTitle: "भव्य उत्सव",
      mainTitle: "मुख्य स्पर्धा / Events",
      tagline: "सहकार्य आणि भक्तीच्या भावनेने आमच्या भव्य उत्सवाच्या स्पर्धांमध्ये सहभागी व्हा. विघ्नहर्ता मित्र मंडळाच्या ऐतिहासिक वारशाचा हिस्सा बना.",
      cricket: {
        tag: "PREMIUM TOURNAMENT",
        title: "Box Cricket",
        mrTitle: "बॉक्स क्रिकेट",
        desc: "विघ्नहर्ता कपच्या थराराचा अनुभव घ्या. देवाच्या सानिध्यात स्थानिक खेळाडूंच्या कौशल्याला वाव देणारे भव्य व्यासपीठ.",
        date: "१२ सप्टेंबर - १५ सप्टेंबर, २०२४",
        fee: ""
      },
      kabaddi: {
        title: "Kabaddi Championship",
        mrTitle: "कबड्डी स्पर्धा",
        desc: "आपल्या तरुणांच्या पारंपरिक ताकद आणि चपळतेचा गौरव.",
        date: "१६ सप्टेंबर, २०२४",
        fee: "₹५०० प्रति संघ"
      },
      rangoli: {
        title: "Rangoli Competition",
        mrTitle: "रांगोळी स्पर्धा",
        desc: "कला आणि भक्तीचा मिलाफ. पारंपरिक रंगांनी तुमची कला सादर करा.",
        date: "१३ सप्टेंबर, २०२४",
        fee: "₹५०/प्रवेश"
      },
      drawing: {
        title: "Drawing Contest",
        mrTitle: "चित्रकला स्पर्धा",
        desc: "बाल भक्तांसाठी. त्यांच्या कल्पनाशक्तीला रंगांचे पंख देऊया.",
        date: "१४ सप्टेंबर, २०२४",
        fee: "मोफत प्रवेश"
      },
      traditional: {
        title: "Traditional Games",
        mrTitle: "पारंपरिक खेळ",
        desc: "लगोरी, विटी-दांडू आणि बरेच काही. आपल्या जुन्या खेळांचे पुनरुज्जीवन.",
        date: "१७ सप्टेंबर, २०२४",
        fee: "मोफत सहभाग"
      },
      registerBtn: "REGISTER NOW",
      form: {
        title: "त्वरित नोंदणी / Quick Registration",
        sub: "भव्य उत्सवाच्या स्पर्धांमध्ये आपली जागा निश्चित करा. सहभागासाठी खालील फॉर्म भरा.",
        fullName: "FULL NAME",
        fullNamePl: "Enter your name",
        contact: "CONTACT NUMBER",
        contactPl: "+९१ ००००० ०००००",
        selectEvent: "SELECT COMPETITION",
        chooseEventPl: "Choose an event",
        confirmBtn: "CONFIRM REGISTRATION",
        terms: "By registering, you agree to follow the Mandal's rules and spiritual guidelines."
      },
      volunteer: {
        title: "Become a Volunteer",
        desc: "Beyond the games, come serve the community. Join our team of volunteers to help organize the grandest Utsav yet.",
        signUpBtn: "SIGN UP NOW",
        viewTimingsBtn: "VIEW TIMINGS"
      }
    },
    english: {
      subTitle: "GRAND UTSAV",
      mainTitle: "मुख्य स्पर्धा / Events",
      tagline: "Celebrate the spirit of togetherness and devotion through our grand festive competitions. Join the legacy of Vighnaharta Mitra Mandal.",
      cricket: {
        tag: "PREMIUM TOURNAMENT",
        title: "Box Cricket",
        mrTitle: "बॉक्स क्रिकेट",
        desc: "Experience the thrill of the Vighnaharta Cup. A grand stage for local talent to shine in the presence of the Lord.",
        date: "Sept 12 - Sept 15, 2024",
        fee: ""
      },
      kabaddi: {
        title: "Kabaddi Championship",
        mrTitle: "कबड्डी स्पर्धा",
        desc: "Honoring the traditional strength and agility of our youth.",
        date: "Sept 16, 2024",
        fee: "₹500 Per Team"
      },
      rangoli: {
        title: "Rangoli Competition",
        mrTitle: "रांगोळी स्पर्धा",
        desc: "Artistry meets devotion. Showcase your skill with traditional colors.",
        date: "Sept 13, 2024",
        fee: "₹50/Entry"
      },
      drawing: {
        title: "Drawing Contest",
        mrTitle: "चित्रकला स्पर्धा",
        desc: "For the little devotees. Let their imagination run wild with colors.",
        date: "Sept 14, 2024",
        fee: "Free Entry"
      },
      traditional: {
        title: "Traditional Games",
        mrTitle: "पारंपरिक खेळ",
        desc: "Lagori, Viti Dandu, and more. Reviving the games of our heritage.",
        date: "Sept 17, 2024",
        fee: "Free Participation"
      },
      registerBtn: "REGISTER NOW",
      form: {
        title: "त्वरित नोंदणी / Quick Registration",
        sub: "Secure your spot in the divine celebrations. Fill the form below to participate.",
        fullName: "FULL NAME",
        fullNamePl: "Enter your name",
        contact: "CONTACT NUMBER",
        contactPl: "+91 00000 00000",
        selectEvent: "SELECT COMPETITION",
        chooseEventPl: "Choose an event",
        confirmBtn: "CONFIRM REGISTRATION",
        terms: "By registering, you agree to follow the Mandal's rules and spiritual guidelines."
      },
      volunteer: {
        title: "Become a Volunteer",
        desc: "Beyond the games, come serve the community. Join our team of volunteers to help organize the grandest Utsav yet.",
        signUpBtn: "SIGN UP NOW",
        viewTimingsBtn: "VIEW TIMINGS"
      }
    }
  };

  const currentUI = translations[lang] || translations.marathi;

  // Handle trigger register from event card
  const handleRegisterTrigger = (eventName) => {
    setFormData((prev) => ({
      ...prev,
      competition: eventName
    }));
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  // Submit dynamic registration
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.contactNumber || !formData.competition) {
      alert(lang === "english" ? "Please fill all fields." : "कृपया सर्व फील्ड भरा.");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      const ticketId = `VMM-${Math.floor(10000 + Math.random() * 90000)}`;
      setTicketData({
        name: formData.fullName,
        phone: formData.contactNumber,
        event: formData.competition,
        id: ticketId
      });
      // Clear form
      setFormData({ fullName: "", contactNumber: "", competition: "" });
    }, 1500);
  };

  // Submit Volunteer
  const handleVolunteerSubmit = (e) => {
    e.preventDefault();
    if (!volunteerForm.name || !volunteerForm.phone || !volunteerForm.area) {
      alert(lang === "english" ? "Please fill all fields." : "कृपया सर्व फील्ड भरा.");
      return;
    }
    setVolunteerSuccess(true);
    setTimeout(() => {
      setVolunteerSuccess(false);
      setShowVolunteerModal(false);
      setVolunteerForm({ name: "", phone: "", area: "" });
    }, 3000);
  };

  return (
    <div className="min-h-screen pt-28 pb-20 px-4 md:px-16 bg-gradient-to-b from-[#FFF2D4] via-[#FEFCEB] to-[#FAF7DC] flex flex-col items-center justify-start w-full">
      
      {/* HEADER SECTION */}
      <div className="text-center mb-12 flex flex-col items-center">
        <span className="font-label-caps text-xs text-[#8f4e00]/70 font-semibold tracking-widest uppercase mb-1">
          {currentUI.subTitle}
        </span>
        <h1 className="font-display-hero text-4xl md:text-5xl font-black text-[#5C4017] inline-block pb-3 tracking-wide">
          {currentUI.mainTitle}
        </h1>
        <p className="font-body-lg text-sm md:text-base text-[#6d3a00]/70 max-w-2xl text-center italic mt-2 px-4 leading-relaxed">
          {currentUI.tagline}
        </p>
        
        {/* Shikhara/Temple Motif Ornament */}
        <div className="mt-4 flex items-center gap-3">
          <div className="w-16 h-[1px] bg-[#8f4e00]/25" />
          <svg className="w-5 h-5 text-[#8f4e00]" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L4 10h3v10h10V10h3L12 2zm0 4.8l4.2 4.2H14v6h-4v-6H7.8L12 6.8z" />
          </svg>
          <div className="w-16 h-[1px] bg-[#8f4e00]/25" />
        </div>
      </div>

      {/* EVENTS GRID */}
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-3 gap-6 relative z-10">
        
        {/* ROW 1: Featured Cricket Tournament (col-span-2) */}
        <div className="lg:col-span-2 bg-[#FAF6E5] border border-[#d8c39e] rounded-sm overflow-hidden flex flex-col md:flex-row shadow-sm hover:shadow-md transition-all duration-300 group">
          {/* Cover image with overlay */}
          <div className="w-full md:w-[45%] relative aspect-[4/3] md:aspect-auto min-h-[220px] overflow-hidden">
            <img 
              src={cricketImg} 
              alt="Cricket Tournament" 
              className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700" 
            />
            <div className="absolute bottom-3 left-3 bg-[#f97316] text-white text-[9px] font-black uppercase px-2.5 py-1 tracking-widest rounded-sm">
              {currentUI.cricket.tag}
            </div>
          </div>
          
          {/* Card Info details */}
          <div className="w-full md:w-[55%] p-6 md:p-8 flex flex-col justify-between">
            <div>
              <h3 className="font-display-hero text-xl md:text-2xl font-black text-[#5C4017] mb-1">
                {currentUI.cricket.title}
              </h3>
              <p className="text-xs text-[#8f4e00]/60 font-semibold mb-3">
                ({currentUI.cricket.mrTitle})
              </p>
              <p className="text-xs md:text-sm text-[#5C4017]/80 mb-5 leading-relaxed font-medium">
                {currentUI.cricket.desc}
              </p>
            </div>
            <div>
              <div className="flex flex-col gap-2 border-t border-[#d8c39e]/20 pt-4 text-xs text-[#5C4017]/70 font-bold">
                <div className="flex items-center gap-2">
                  <span>📅</span>
                  <span>{currentUI.cricket.date}</span>
                </div>
                {currentUI.cricket.fee && (
                  <div className="flex items-center gap-2">
                    <span>🏆</span>
                    <span>{currentUI.cricket.fee}</span>
                  </div>
                )}
              </div>
              <button 
                onClick={() => handleRegisterTrigger(currentUI.cricket.title)}
                className="bg-[#8f4e00] text-white hover:bg-[#733e00] text-[10px] font-black uppercase tracking-widest py-3 px-6 rounded-sm w-fit mt-5 transition-all duration-200 active:scale-97 cursor-pointer block"
              >
                {currentUI.registerBtn}
              </button>
            </div>
          </div>
        </div>

        {/* ROW 1: Kabaddi Championship (col-span-1) */}
        <div className="lg:col-span-1 bg-[#FAF6E5] border border-[#d8c39e] rounded-sm overflow-hidden flex flex-col justify-between shadow-sm hover:shadow-md transition-all duration-300 group">
          {/* High-end decorative fall-back cover */}
          <div className="w-full h-[180px] bg-gradient-to-br from-[#802C13] to-[#B24E31] relative flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 opacity-15 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/40 via-transparent to-transparent" />
            <div className="absolute w-32 h-32 border border-white/5 rounded-full" />
            <div className="absolute w-44 h-44 border border-white/10 rounded-full" />
            <span className="font-display-hero text-lg font-bold text-[#FFD700] tracking-widest relative z-10 drop-shadow-md">
              KABADDI
            </span>
          </div>
          
          <div className="p-5 flex flex-col justify-between flex-grow">
            <div>
              <h3 className="font-display-hero text-lg font-black text-[#5C4017] mb-0.5">
                {currentUI.kabaddi.title}
              </h3>
              <p className="text-[10px] text-[#8f4e00]/60 font-semibold mb-2">
                ({currentUI.kabaddi.mrTitle})
              </p>
              <p className="text-xs text-[#5C4017]/80 leading-relaxed font-medium mb-3">
                {currentUI.kabaddi.desc}
              </p>
            </div>
            
            <div className="mt-auto">
              <div className="flex justify-between items-center text-[11px] text-[#5C4017]/70 py-2 border-y border-[#d8c39e]/20 my-3 font-bold">
                <span>DATE: {currentUI.kabaddi.date}</span>
                <span>FEE: {currentUI.kabaddi.fee}</span>
              </div>
              <button 
                onClick={() => handleRegisterTrigger(currentUI.kabaddi.title)}
                className="border border-[#8f4e00] text-[#8f4e00] hover:bg-[#8f4e00]/10 text-[10px] font-black uppercase tracking-widest py-2.5 rounded-sm text-center w-full mt-1 transition-all duration-200 cursor-pointer block"
              >
                {currentUI.registerBtn}
              </button>
            </div>
          </div>
        </div>

        {/* ROW 2: Rangoli Competition */}
        <div className="bg-[#FAF6E5] border border-[#d8c39e] rounded-sm overflow-hidden flex flex-col justify-between shadow-sm hover:shadow-md transition-all duration-300 group">
          <div className="w-full h-[180px] bg-gradient-to-br from-[#C2780E] to-[#F1C40F] relative flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 opacity-20" style={{
              backgroundImage: `radial-gradient(circle, #fff 10%, transparent 11%), radial-gradient(circle, #fff 10%, transparent 11%)`,
              backgroundSize: '20px 20px',
              backgroundPosition: '0 0, 10px 10px'
            }} />
            <div className="absolute w-24 h-24 border-2 border-dashed border-white/20 rounded-full" />
            <span className="font-display-hero text-lg font-bold text-white tracking-widest relative z-10 drop-shadow-md">
              RANGOLI
            </span>
          </div>

          <div className="p-5 flex flex-col justify-between flex-grow">
            <div>
              <h3 className="font-display-hero text-lg font-black text-[#5C4017] mb-0.5">
                {currentUI.rangoli.title}
              </h3>
              <p className="text-[10px] text-[#8f4e00]/60 font-semibold mb-2">
                ({currentUI.rangoli.mrTitle})
              </p>
              <p className="text-xs text-[#5C4017]/80 leading-relaxed font-medium mb-3">
                {currentUI.rangoli.desc}
              </p>
            </div>

            <div className="mt-auto">
              <div className="flex justify-between items-center text-[11px] text-[#5C4017]/70 py-2 border-y border-[#d8c39e]/20 my-3 font-bold">
                <span>DATE: {currentUI.rangoli.date}</span>
                <span>FEE: {currentUI.rangoli.fee}</span>
              </div>
              <button 
                onClick={() => handleRegisterTrigger(currentUI.rangoli.title)}
                className="border border-[#8f4e00] text-[#8f4e00] hover:bg-[#8f4e00]/10 text-[10px] font-black uppercase tracking-widest py-2.5 rounded-sm text-center w-full mt-1 transition-all duration-200 cursor-pointer block"
              >
                {currentUI.registerBtn}
              </button>
            </div>
          </div>
        </div>

        {/* ROW 2: Drawing Contest */}
        <div className="bg-[#FAF6E5] border border-[#d8c39e] rounded-sm overflow-hidden flex flex-col justify-between shadow-sm hover:shadow-md transition-all duration-300 group">
          <div className="w-full h-[180px] bg-gradient-to-br from-[#D35400] to-[#E67E22] relative flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 opacity-10 bg-[linear-gradient(45deg,_#fff_25%,_transparent_25%,_transparent_75%,_#fff_75%,_#fff),_linear-gradient(45deg,_#fff_25%,_transparent_25%,_transparent_75%,_#fff_75%,_#fff)]" style={{ backgroundSize: '30px 30px', backgroundPosition: '0 0, 15px 15px' }} />
            <div className="absolute w-20 h-20 bg-white/5 rotate-45 rounded-xl border border-white/10" />
            <span className="font-display-hero text-lg font-bold text-[#FFF2CC] tracking-widest relative z-10 drop-shadow-md">
              DRAWING
            </span>
          </div>

          <div className="p-5 flex flex-col justify-between flex-grow">
            <div>
              <h3 className="font-display-hero text-lg font-black text-[#5C4017] mb-0.5">
                {currentUI.drawing.title}
              </h3>
              <p className="text-[10px] text-[#8f4e00]/60 font-semibold mb-2">
                ({currentUI.drawing.mrTitle})
              </p>
              <p className="text-xs text-[#5C4017]/80 leading-relaxed font-medium mb-3">
                {currentUI.drawing.desc}
              </p>
            </div>

            <div className="mt-auto">
              <div className="flex justify-between items-center text-[11px] text-[#5C4017]/70 py-2 border-y border-[#d8c39e]/20 my-3 font-bold">
                <span>DATE: {currentUI.drawing.date}</span>
                <span>FEE: {currentUI.drawing.fee}</span>
              </div>
              <button 
                onClick={() => handleRegisterTrigger(currentUI.drawing.title)}
                className="border border-[#8f4e00] text-[#8f4e00] hover:bg-[#8f4e00]/10 text-[10px] font-black uppercase tracking-widest py-2.5 rounded-sm text-center w-full mt-1 transition-all duration-200 cursor-pointer block"
              >
                {currentUI.registerBtn}
              </button>
            </div>
          </div>
        </div>

        {/* ROW 2: Traditional Games */}
        <div className="bg-[#FAF6E5] border border-[#d8c39e] rounded-sm overflow-hidden flex flex-col justify-between shadow-sm hover:shadow-md transition-all duration-300 group">
          <div className="w-full h-[180px] bg-gradient-to-br from-[#4A3311] to-[#735227] relative flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 opacity-10" style={{
              backgroundImage: `repeating-linear-gradient(45deg, #fff, #fff 1px, transparent 1px, transparent 10px)`
            }} />
            <div className="absolute w-28 h-20 border border-white/10 rounded-sm rotate-12" />
            <span className="font-display-hero text-lg font-bold text-[#E9DBB5] tracking-widest relative z-10 drop-shadow-md">
              TRADITIONAL
            </span>
          </div>

          <div className="p-5 flex flex-col justify-between flex-grow">
            <div>
              <h3 className="font-display-hero text-lg font-black text-[#5C4017] mb-0.5">
                {currentUI.traditional.title}
              </h3>
              <p className="text-[10px] text-[#8f4e00]/60 font-semibold mb-2">
                ({currentUI.traditional.mrTitle})
              </p>
              <p className="text-xs text-[#5C4017]/80 leading-relaxed font-medium mb-3">
                {currentUI.traditional.desc}
              </p>
            </div>

            <div className="mt-auto">
              <div className="flex justify-between items-center text-[11px] text-[#5C4017]/70 py-2 border-y border-[#d8c39e]/20 my-3 font-bold">
                <span>DATE: {currentUI.traditional.date}</span>
                <span>FEE: {currentUI.traditional.fee}</span>
              </div>
              <button 
                onClick={() => handleRegisterTrigger(currentUI.traditional.title)}
                className="border border-[#8f4e00] text-[#8f4e00] hover:bg-[#8f4e00]/10 text-[10px] font-black uppercase tracking-widest py-2.5 rounded-sm text-center w-full mt-1 transition-all duration-200 cursor-pointer block"
              >
                {currentUI.registerBtn}
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* QUICK REGISTRATION FORM */}
      <div 
        ref={formRef}
        className="w-full max-w-2xl bg-[#FEFCEB]/90 border border-[#d8c39e]/60 rounded-sm p-6 md:p-10 relative flex flex-col items-center justify-start shadow-sm mt-20"
      >
        {/* Border offsets decoration */}
        <div className="absolute inset-2 border border-[#8f4e00]/15 pointer-events-none rounded-sm" />
        
        {/* Title */}
        <div className="text-center mb-8">
          <h2 className="font-display-hero text-2xl md:text-3xl font-extrabold text-[#5C4017] mb-2">
            {currentUI.form.title}
          </h2>
          <p className="text-xs md:text-sm text-[#8f4e00]/70 font-medium">
            {currentUI.form.sub}
          </p>
        </div>

        {/* Input form */}
        <form onSubmit={handleFormSubmit} className="w-full flex flex-col gap-6 relative z-10">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Full Name */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] md:text-xs font-bold text-[#5C4017] tracking-wider font-label-caps">
                {currentUI.form.fullName}
              </label>
              <input 
                type="text"
                value={formData.fullName}
                onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                placeholder={currentUI.form.fullNamePl}
                className="border border-[#d8c39e]/70 bg-white/50 focus:bg-white focus:outline-none focus:border-[#8f4e00] px-4 py-3 rounded-sm text-sm text-[#271b05] w-full transition-colors"
                required
              />
            </div>

            {/* Contact Number */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] md:text-xs font-bold text-[#5C4017] tracking-wider font-label-caps">
                {currentUI.form.contact}
              </label>
              <input 
                type="tel"
                value={formData.contactNumber}
                onChange={(e) => setFormData({...formData, contactNumber: e.target.value})}
                placeholder={currentUI.form.contactPl}
                className="border border-[#d8c39e]/70 bg-white/50 focus:bg-white focus:outline-none focus:border-[#8f4e00] px-4 py-3 rounded-sm text-sm text-[#271b05] w-full transition-colors"
                required
              />
            </div>
          </div>

          {/* Select Competition */}
          <div className="flex flex-col gap-1.5 w-full">
            <label className="text-[10px] md:text-xs font-bold text-[#5C4017] tracking-wider font-label-caps">
              {currentUI.form.selectEvent}
            </label>
            <select
              value={formData.competition}
              onChange={(e) => setFormData({...formData, competition: e.target.value})}
              className="border border-[#d8c39e]/70 bg-white/50 focus:bg-white focus:outline-none focus:border-[#8f4e00] px-4 py-3 rounded-sm text-sm text-[#271b05] w-full transition-colors appearance-none cursor-pointer"
              required
            >
              <option value="" disabled>{currentUI.form.chooseEventPl}</option>
              <option value={currentUI.cricket.title}>{currentUI.cricket.title}{currentUI.cricket.fee ? ` (${currentUI.cricket.fee})` : ""}</option>
              <option value={currentUI.kabaddi.title}>{currentUI.kabaddi.title} (FEE: {currentUI.kabaddi.fee})</option>
              <option value={currentUI.rangoli.title}>{currentUI.rangoli.title} (FEE: {currentUI.rangoli.fee})</option>
              <option value={currentUI.drawing.title}>{currentUI.drawing.title} (FEE: {currentUI.drawing.fee})</option>
              <option value={currentUI.traditional.title}>{currentUI.traditional.title} (FEE: {currentUI.traditional.fee})</option>
            </select>
          </div>

          {/* Confirm Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#8f4e00] hover:bg-[#733e00] text-white text-[11px] font-black uppercase tracking-widest py-3 px-8 rounded-sm mt-2 transition-all duration-200 active:scale-98 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {isSubmitting ? (
              <span>REGISTERING...</span>
            ) : (
              <>
                <span>{currentUI.form.confirmBtn}</span>
                <span className="text-sm">➔</span>
              </>
            )}
          </button>

          {/* Terms info */}
          <p className="text-[10px] text-center text-[#5C4017]/60 leading-relaxed font-semibold italic mt-1">
            {currentUI.form.terms}
          </p>

        </form>
      </div>

      {/* BECOME A VOLUNTEER SECTION */}
      <div className="mt-24 text-center max-w-xl px-6 flex flex-col items-center gap-4">
        {/* Hand icon with heart */}
        <div className="text-[#8f4e00] mb-2 animate-pulse">
          <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </div>

        <h2 className="font-display-hero text-3xl font-extrabold text-[#5C4017]">
          {currentUI.volunteer.title}
        </h2>
        <p className="text-sm text-[#6d3a00]/70 leading-relaxed font-medium">
          {currentUI.volunteer.desc}
        </p>

        <div className="flex flex-wrap justify-center gap-4 mt-4 w-full">
          <button 
            onClick={() => setShowVolunteerModal(true)}
            className="bg-[#8f4e00] hover:bg-[#733e00] text-white text-[10px] font-black uppercase tracking-widest py-3 px-8 rounded-sm transition-all active:scale-97 cursor-pointer"
          >
            {currentUI.volunteer.signUpBtn}
          </button>
          <button 
            onClick={() => setShowTimingsModal(true)}
            className="border border-[#8f4e00] text-[#8f4e00] hover:bg-[#8f4e00]/10 text-[10px] font-black uppercase tracking-widest py-3 px-8 rounded-sm transition-all active:scale-97 cursor-pointer"
          >
            {currentUI.volunteer.viewTimingsBtn}
          </button>
        </div>
      </div>

      {/* -------------------- SUCCESS / TICKET CONFIRMATION MODAL -------------------- */}
      {ticketData && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-md bg-[#FEFCEB] border-4 border-[#8f4e00] rounded-sm p-6 md:p-8 flex flex-col items-center text-center shadow-2xl">
            {/* Border lines decoration */}
            <div className="absolute inset-1.5 border border-[#8f4e00]/30 rounded-sm pointer-events-none" />

            <div className="w-12 h-12 bg-green-100 text-green-700 flex items-center justify-center rounded-full text-xl mb-4">
              ✔
            </div>

            <h3 className="font-display-hero text-2xl font-black text-[#5C4017] mb-1">
              {lang === "english" ? "Registration Confirmed" : "नोंदणी यशस्वी"}
            </h3>
            <p className="text-[10px] font-bold text-[#8f4e00]/70 tracking-widest font-label-caps uppercase mb-4">
              जय गणेश • Vighnaharta Mitra Mandal
            </p>

            {/* Ticket Card Box */}
            <div className="w-full bg-[#FAF6E5] border border-[#d8c39e] p-5 rounded-sm flex flex-col gap-3 text-left relative overflow-hidden mb-6">
              {/* Devotional motif watermark */}
              <div className="absolute bottom-2 right-2 text-[#8f4e00]/5 opacity-10">
                <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L4 10h3v10h10V10h3L12 2zm0 4.8l4.2 4.2H14v6h-4v-6H7.8L12 6.8z" />
                </svg>
              </div>

              <div>
                <span className="text-[9px] font-black uppercase text-[#8f4e00]/60 block font-label-caps">DEVOTEE NAME</span>
                <span className="text-sm font-bold text-[#271b05]">{ticketData.name}</span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-[9px] font-black uppercase text-[#8f4e00]/60 block font-label-caps">COMPETITION</span>
                  <span className="text-xs font-bold text-[#271b05]">{ticketData.event}</span>
                </div>
                <div>
                  <span className="text-[9px] font-black uppercase text-[#8f4e00]/60 block font-label-caps">TICKET ID</span>
                  <span className="text-xs font-bold text-[#8f4e00] font-mono">{ticketData.id}</span>
                </div>
              </div>
              <div className="border-t border-dashed border-[#d8c39e] pt-3 mt-1 flex justify-between items-center">
                <span className="text-[9px] font-black text-green-700 tracking-wider">✔ STATE: REGISTERED</span>
                <span className="text-[9px] font-black text-[#5C4017]/70 font-label-caps uppercase">VIGHNAHARTA CHOWK</span>
              </div>
            </div>

            <p className="text-xs text-[#5C4017]/80 leading-relaxed font-semibold italic mb-6 max-w-xs">
              {lang === "english" 
                ? "Please take a screenshot of this ticket and show it at the Mandal office at Vighnaharta Chowk to collect your pass." 
                : "कृपया या तिकिटाचा स्क्रीनशॉट घ्या आणि तुमचा पास गोळा करण्यासाठी विघ्नहर्ता चौक येथील मंडळाच्या कार्यालयात दाखवा."}
            </p>

            <button
              onClick={() => setTicketData(null)}
              className="bg-[#8f4e00] hover:bg-[#733e00] text-white text-[10px] font-black uppercase tracking-widest py-3 px-8 rounded-sm w-full transition-all active:scale-97 cursor-pointer"
            >
              {lang === "english" ? "CLOSE TICKET" : "बंद करा"}
            </button>
          </div>
        </div>
      )}

      {/* -------------------- VOLUNTEER SIGNUP MODAL -------------------- */}
      {showVolunteerModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-md bg-[#FEFCEB] border-4 border-[#8f4e00] rounded-sm p-6 md:p-8 shadow-2xl">
            <div className="absolute inset-1.5 border border-[#8f4e00]/30 rounded-sm pointer-events-none" />

            {/* Close trigger */}
            <button 
              onClick={() => setShowVolunteerModal(false)}
              className="absolute top-4 right-4 text-[#5C4017] hover:text-[#8f4e00] font-bold text-lg cursor-pointer"
            >
              ✕
            </button>

            <div className="text-center mb-6">
              <h3 className="font-display-hero text-xl md:text-2xl font-black text-[#5C4017]">
                {lang === "english" ? "Volunteer Registration" : "स्वयंसेवक नोंदणी"}
              </h3>
              <p className="text-xs text-[#8f4e00]/70 font-semibold mt-1">
                {lang === "english" ? "Serve Ganesha, Serve Society" : "गणेश सेवा हीच समाज सेवा"}
              </p>
            </div>

            {volunteerSuccess ? (
              <div className="flex flex-col items-center text-center p-6 bg-green-50 border border-green-200 rounded-sm">
                <span className="text-3xl mb-2">🌸</span>
                <span className="text-sm font-bold text-green-800">
                  {lang === "english" ? "Submission Successful!" : "नोंदणी यशस्वी झाली!"}
                </span>
                <p className="text-xs text-green-700/80 mt-2 leading-relaxed font-semibold">
                  {lang === "english" 
                    ? "Thank you for volunteering. Our coordinators will contact you shortly." 
                    : "स्वयंसेवक बनल्याबद्दल धन्यवाद. आमचे समन्वयक लवकरच तुमच्याशी संपर्क साधतील."}
                </p>
              </div>
            ) : (
              <form onSubmit={handleVolunteerSubmit} className="flex flex-col gap-4 relative z-10">
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold text-[#5C4017] tracking-wider uppercase font-label-caps">
                    {lang === "english" ? "YOUR NAME" : "तुमचे नाव"}
                  </label>
                  <input 
                    type="text"
                    value={volunteerForm.name}
                    onChange={(e) => setVolunteerForm({...volunteerForm, name: e.target.value})}
                    placeholder={lang === "english" ? "Enter your name" : "नाव प्रविष्ट करा"}
                    className="border border-[#d8c39e]/70 bg-white/50 px-3 py-2 rounded-sm text-sm text-[#271b05] focus:outline-none focus:border-[#8f4e00]"
                    required
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold text-[#5C4017] tracking-wider uppercase font-label-caps">
                    {lang === "english" ? "CONTACT PHONE" : "फोन नंबर"}
                  </label>
                  <input 
                    type="tel"
                    value={volunteerForm.phone}
                    onChange={(e) => setVolunteerForm({...volunteerForm, phone: e.target.value})}
                    placeholder={lang === "english" ? "+91 00000 00000" : "+९१ ००००० ०००००"}
                    className="border border-[#d8c39e]/70 bg-white/50 px-3 py-2 rounded-sm text-sm text-[#271b05] focus:outline-none focus:border-[#8f4e00]"
                    required
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold text-[#5C4017] tracking-wider uppercase font-label-caps">
                    {lang === "english" ? "SERVICE AREA" : "सेवेचे क्षेत्र"}
                  </label>
                  <select
                    value={volunteerForm.area}
                    onChange={(e) => setVolunteerForm({...volunteerForm, area: e.target.value})}
                    className="border border-[#d8c39e]/70 bg-white/50 px-3 py-2 rounded-sm text-sm text-[#271b05] focus:outline-none focus:border-[#8f4e00] cursor-pointer"
                    required
                  >
                    <option value="" disabled>{lang === "english" ? "Select service area" : "क्षेत्र निवडा"}</option>
                    <option value="Prasad">{lang === "english" ? "Prasad Distribution (प्रसाद वाटप)" : "प्रसाद वाटप"}</option>
                    <option value="Crowd">{lang === "english" ? "Crowd Management (गर्दी व्यवस्थापन)" : "गर्दी व्यवस्थापन"}</option>
                    <option value="Medical">{lang === "english" ? "Medical Camp Support (वैद्यकीय मदत)" : "वैद्यकीय मदत"}</option>
                    <option value="Decoration">{lang === "english" ? "Decoration & Lights (सजावट)" : "सजावट"}</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="bg-[#8f4e00] hover:bg-[#733e00] text-white text-[10px] font-black uppercase tracking-widest py-3 px-6 rounded-sm w-full mt-2 transition-all active:scale-97 cursor-pointer"
                >
                  {lang === "english" ? "SUBMIT APPLICATION" : "अर्ज सादर करा"}
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* -------------------- VIEW TIMINGS MODAL -------------------- */}
      {showTimingsModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-md bg-[#FEFCEB] border-4 border-[#8f4e00] rounded-sm p-6 md:p-8 shadow-2xl">
            <div className="absolute inset-1.5 border border-[#8f4e00]/30 rounded-sm pointer-events-none" />

            <button 
              onClick={() => setShowTimingsModal(false)}
              className="absolute top-4 right-4 text-[#5C4017] hover:text-[#8f4e00] font-bold text-lg cursor-pointer"
            >
              ✕
            </button>

            <div className="text-center mb-6">
              <h3 className="font-display-hero text-xl md:text-2xl font-black text-[#5C4017]">
                {lang === "english" ? "Mandal Utsav Timings" : "मंडळ उत्सव वेळापत्रक"}
              </h3>
              <p className="text-xs text-[#8f4e00]/70 font-semibold mt-1">
                विघ्नहर्ता चौक, बीड
              </p>
            </div>

            {/* Timings Table */}
            <div className="w-full bg-[#FAF6E5] border border-[#d8c39e] rounded-sm p-4 flex flex-col gap-3 font-semibold text-[#271b05]">
              <div className="flex justify-between items-center py-2 border-b border-[#d8c39e]/40 text-xs md:text-sm">
                <span>{lang === "english" ? "🌅 Temple Opens (दर्शन सुरु):" : "🌅 दर्शन सुरु:"}</span>
                <span className="text-[#8f4e00]">6:00 AM</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-[#d8c39e]/40 text-xs md:text-sm">
                <span>{lang === "english" ? "🌸 Morning Aarti (सकाळची आरती):" : "🌸 सकाळची आरती:"}</span>
                <span className="text-[#8f4e00]">7:30 AM</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-[#d8c39e]/40 text-xs md:text-sm">
                <span>{lang === "english" ? "🍲 Naivedya Prasad (महाप्रसाद):" : "🍲 महाप्रसाद:"}</span>
                <span className="text-[#8f4e00]">12:30 PM</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-[#d8c39e]/40 text-xs md:text-sm">
                <span>{lang === "english" ? "✨ Evening Maha-Aarti (संध्या आरती):" : "✨ संध्या आरती:"}</span>
                <span className="text-[#8f4e00]">8:00 PM</span>
              </div>
              <div className="flex justify-between items-center py-2 text-xs md:text-sm">
                <span>{lang === "english" ? "🌌 Temple Closes (दर्शन बंद):" : "🌌 दर्शन बंद:"}</span>
                <span className="text-[#8f4e00]">11:00 PM</span>
              </div>
            </div>

            <button
              onClick={() => setShowTimingsModal(false)}
              className="bg-[#8f4e00] hover:bg-[#733e00] text-white text-[10px] font-black uppercase tracking-widest py-3 px-8 rounded-sm w-full mt-6 transition-all active:scale-97 cursor-pointer"
            >
              {lang === "english" ? "CLOSE WINDOW" : "बंद करा"}
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

export default Events;