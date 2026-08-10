import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import logoImg from "../assets/mandallogo.png";
import tilakImg from "../assets/Tilak.jpg";
import savarkarImg from "../assets/savarkar.png";
import AnnouncementBar from "./AnnouncementBar";
import { useSettings } from "../context/SettingsContext";
import { BACKEND_URL } from "../api/api";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(null);
  const [lang, setLang] = useState(localStorage.getItem("lang") || "marathi");
  const [mobileAboutOpen, setMobileAboutOpen] = useState(false);
  const [mobileGalleryOpen, setMobileGalleryOpen] = useState(false);

  const isCalligraphyFont = (text) => {
    if (!text) return false;
    return !/[\u0900-\u097F]/.test(text);
  };

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser && storedUser !== "undefined") {
        setUser(JSON.parse(storedUser));
      } else {
        setUser(null);
      }
    } catch {
      setUser(null);
    }
  }, [token]);

  useEffect(() => {
    const handleStorage = () => {
      setToken(localStorage.getItem("token"));
    };
    const handleLangChange = () => {
      setLang(localStorage.getItem("lang") || "marathi");
    };

    window.addEventListener("storage", handleStorage);
    window.addEventListener("langChange", handleLangChange);

    return () => {
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener("langChange", handleLangChange);
    };
  }, []);

  const changeLang = (selected) => {
    setLang(selected);
    localStorage.setItem("lang", selected);
    window.dispatchEvent(new Event("langChange"));
  };

  const handleLogout = () => {
    localStorage.clear();
    setToken(null);
    setUser(null);
    navigate("/auth");
  };

  const { settings } = useSettings();
  const mandalName = lang === "marathi"
    ? (settings?.websiteNameMr || "ivaGnahtaa_ imaPa ma/DL, baID.")
    : (settings?.websiteNameEn || "Vighnaharta Mitra Mandal, Beed.");
  const logoSrc = settings?.logoUrl ? `${BACKEND_URL}${settings.logoUrl}` : logoImg;

  return (
    <header className="w-full flex flex-col relative z-50">
      {/* 1. THIN TOP UTILITY BAR (Language, Dashboard, Login) */}
      <div className="w-full bg-[#1b0800] text-amber-200/80 text-[10px] md:text-xs py-1.5 px-4 md:px-12 flex justify-between items-center border-b border-[#D4AF37]/25">
        <div className="font-serif">
          {lang === "marathi" ? "📍 विघ्नहर्ता चौक, बीड - स्थापना: १९९०" : "📍 Vighnaharta Chowk, Beed - Estd: 1990"}
        </div>
        <div className="flex items-center gap-4">
          {/* Language Switcher */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => changeLang("english")}
              className={`hover:text-white transition-colors cursor-pointer ${
                lang === "english" ? "text-amber-400 font-bold" : ""
              }`}
            >
              EN
            </button>
            <span className="text-amber-500/30">|</span>
            <button
              onClick={() => changeLang("marathi")}
              className={`hover:text-white transition-colors cursor-pointer ${
                lang === "marathi" ? "text-amber-400 font-bold" : ""
              }`}
            >
              मराठी
            </button>
          </div>
          <span className="text-amber-500/30">|</span>
          {/* Admin / Login */}
          {user ? (
            <div className="flex items-center gap-3">
              <span
                onClick={() => navigate("/admin")}
                className="cursor-pointer hover:text-white flex items-center gap-1 font-bold text-amber-400 transition-colors"
              >
                <span className="material-symbols-outlined text-[14px]">admin_panel_settings</span>
                {lang === "marathi" ? "डॅशबोर्ड" : "Dashboard"}
              </span>
              <span className="text-amber-500/30">|</span>
              <span
                onClick={handleLogout}
                className="cursor-pointer hover:text-white flex items-center gap-1 transition-colors"
              >
                <span className="material-symbols-outlined text-[14px]">logout</span>
                {lang === "marathi" ? "बाहेर पडा" : "Logout"}
              </span>
            </div>
          ) : (
            <span
              onClick={() => navigate("/auth")}
              className="cursor-pointer hover:text-white flex items-center gap-1 transition-colors"
            >
              <span className="material-symbols-outlined text-[14px]">login</span>
              {lang === "marathi" ? "लॉगिन" : "Login"}
            </span>
          )}
        </div>
      </div>

      {/* 2. TOP FESTIVE HEADER / BANNER */}
      <div className="w-full bg-gradient-to-r from-[#200b02] via-[#4a1c02] to-[#200b02] border-b-2 border-[#D4AF37]/50 px-2 sm:px-4 md:px-12 py-2.5 sm:py-4 flex flex-row justify-between items-center gap-2 sm:gap-4">
        {/* Left: Mandal Logo */}
        <div className="flex items-center flex-shrink-0">
          <div className="relative p-1 rounded-xl border border-amber-400/40 bg-[#301103]/20 shadow-[0_0_15px_rgba(212,175,55,0.35)]">
            <img
              src={logoSrc}
              alt="Mandal Logo"
              className="w-8 h-8 xs:w-10 h-10 sm:w-14 sm:h-14 md:w-20 md:h-20 object-contain select-none rounded-lg"
            />
          </div>
        </div>

        {/* Center: Large Marathi Mandal Name */}
        <div className="text-center flex-1 min-w-0 mx-1 sm:mx-2 pl-4 pr-1">
          <h1
            className="font-bold text-white text-[15px] xs:text-lg sm:text-3xl md:text-4xl lg:text-[46px] xl:text-[54px] filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.85)] drop-shadow-[0_4px_8px_rgba(0,0,0,0.9)] whitespace-nowrap sm:whitespace-normal"
            style={{
              fontFamily: (lang === "marathi" && isCalligraphyFont(mandalName))
                ? "'AMS Chhatrapati', 'AMSChhatrapati', serif"
                : "serif",
              letterSpacing: (lang === "marathi" && isCalligraphyFont(mandalName))
                ? "normal"
                : "inherit",
              lineHeight: "1.45"
            }}
          >
            {mandalName}
          </h1>
        </div>

        {/* Right: Portraits (Lokmanya Tilak & Savarkar) */}
        <div className="flex items-center gap-1.5 sm:gap-3 md:gap-4 select-none flex-shrink-0">
          <div className="flex flex-col items-center">
            <img
              src={tilakImg}
              alt="Lokmanya Tilak"
              className="w-6 h-8.5 xs:w-8 xs:h-11 sm:w-11 sm:h-15 md:w-14 md:h-20 object-cover rounded border border-[#D4AF37]/40 shadow-md"
            />
            <span className="hidden lg:block text-[8px] md:text-[9px] text-amber-200/80 mt-1 font-serif">लोकमान्य टिळक</span>
          </div>
          <div className="flex flex-col items-center">
            <img
              src={savarkarImg}
              alt="Veer Savarkar"
              className="w-6 h-8.5 xs:w-8 xs:h-11 sm:w-11 sm:h-15 md:w-14 md:h-20 object-cover rounded border border-[#D4AF37]/40 shadow-md"
            />
            <span className="hidden lg:block text-[8px] md:text-[9px] text-amber-200/80 mt-1 font-serif font-bold">स्वा. सावरकर</span>
          </div>
        </div>
      </div>

      {/* 3. NAVIGATION BAR */}
      <nav className="w-full bg-[#301103] border-b border-[#D4AF37]/30 text-amber-100 font-bold select-none shadow-md">
        {/* Desktop Layout: 6 items in one horizontal row */}
        <div className="hidden lg:flex justify-center items-center gap-12 py-3.5 max-w-7xl mx-auto">
          <span
            onClick={() => {
              navigate("/");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="cursor-pointer hover:text-amber-400 font-serif tracking-widest uppercase text-sm transition-colors duration-200"
          >
            {lang === "marathi" ? "मुख्य पृष्ठ" : "Home"}
          </span>

          {/* ABOUT DROPDOWN */}
          <div className="relative group py-1">
            <span className="cursor-pointer hover:text-amber-400 font-serif tracking-widest uppercase text-sm transition-colors duration-200 flex items-center gap-1">
              {lang === "marathi" ? "आमच्याबद्दल" : "About"}
              <span className="material-symbols-outlined text-[16px] font-bold">keyboard_arrow_down</span>
            </span>
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 w-60 bg-[#301103] border border-[#D4AF37]/30 rounded-xl shadow-2xl opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-300 z-50 py-2 flex flex-col divide-y divide-[#D4AF37]/15">
              <span onClick={() => navigate("/about/details")} className="px-4 py-2.5 text-xs font-bold text-amber-100 hover:bg-[#D4AF37]/10 hover:text-amber-400 transition-colors cursor-pointer text-center">
                {lang === "marathi" ? "आमच्याबद्दल" : "About Us"}
              </span>
              <span onClick={() => navigate("/about/committee")} className="px-4 py-2.5 text-xs font-bold text-amber-100 hover:bg-[#D4AF37]/10 hover:text-amber-400 transition-colors cursor-pointer text-center">
                {lang === "marathi" ? "विद्यमान कार्यकारी मंडळ" : "Executive Committee"}
              </span>
              <span onClick={() => navigate("/about/journey")} className="px-4 py-2.5 text-xs font-bold text-amber-100 hover:bg-[#D4AF37]/10 hover:text-amber-400 transition-colors cursor-pointer text-center">
                {lang === "marathi" ? "मंडळाचा गौरवशाली प्रवास" : "Mandal's Glorious Journey"}
              </span>
              <span onClick={() => navigate("/about/vision-mission")} className="px-4 py-2.5 text-xs font-bold text-amber-100 hover:bg-[#D4AF37]/10 hover:text-amber-400 transition-colors cursor-pointer text-center">
                {lang === "marathi" ? "ध्येय आणि उद्दिष्टे" : "Vision & Mission"}
              </span>
            </div>
          </div>

          <span
            onClick={() => navigate("/events")}
            className="cursor-pointer hover:text-amber-400 font-serif tracking-widest uppercase text-sm transition-colors duration-200"
          >
            {lang === "marathi" ? "कार्यक्रम" : "Events"}
          </span>

          {/* GALLERY DROPDOWN */}
          <div className="relative group py-1">
            <span className="cursor-pointer hover:text-amber-400 font-serif tracking-widest uppercase text-sm transition-colors duration-200 flex items-center gap-1">
              {lang === "marathi" ? "चित्रदालन" : "Gallery"}
              <span className="material-symbols-outlined text-[16px] font-bold">keyboard_arrow_down</span>
            </span>
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 w-60 bg-[#301103] border border-[#D4AF37]/30 rounded-xl shadow-2xl opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-300 z-50 py-2 flex flex-col divide-y divide-[#D4AF37]/15">
              <span onClick={() => navigate("/gallery/smart-ganesh")} className="px-4 py-2.5 text-xs font-bold text-amber-100 hover:bg-[#D4AF37]/10 hover:text-amber-400 transition-colors cursor-pointer text-center">
                {lang === "marathi" ? "स्मार्ट गणेश उत्सव" : "Smart Ganesh Utsav"}
              </span>
              <span onClick={() => navigate("/gallery/religious")} className="px-4 py-2.5 text-xs font-bold text-amber-100 hover:bg-[#D4AF37]/10 hover:text-amber-400 transition-colors cursor-pointer text-center">
                {lang === "marathi" ? "धार्मिक उपक्रम" : "Religious Activities"}
              </span>
              <span onClick={() => navigate("/gallery/social")} className="px-4 py-2.5 text-xs font-bold text-amber-100 hover:bg-[#D4AF37]/10 hover:text-amber-400 transition-colors cursor-pointer text-center">
                {lang === "marathi" ? "सामाजिक उपक्रम" : "Social Activities"}
              </span>
              <span onClick={() => navigate("/gallery/cultural")} className="px-4 py-2.5 text-xs font-bold text-amber-100 hover:bg-[#D4AF37]/10 hover:text-amber-400 transition-colors cursor-pointer text-center">
                {lang === "marathi" ? "सांस्कृतिक उपक्रम" : "Cultural Activities"}
              </span>
              <span onClick={() => navigate("/gallery/press")} className="px-4 py-2.5 text-xs font-bold text-amber-100 hover:bg-[#D4AF37]/10 hover:text-amber-400 transition-colors cursor-pointer text-center">
                {lang === "marathi" ? "वृत्तपत्र वार्तांकन" : "Press Coverage"}
              </span>
            </div>
          </div>

          <span
            onClick={() => navigate("/mantras")}
            className="cursor-pointer hover:text-amber-400 font-serif tracking-widest uppercase text-sm transition-colors duration-200"
          >
            {lang === "marathi" ? "मंत्र" : "Mantras"}
          </span>
          <span
            onClick={() => {
              const footer = document.querySelector("footer");
              if (footer) {
                footer.scrollIntoView({ behavior: "smooth" });
              } else {
                navigate("/");
              }
            }}
            className="cursor-pointer hover:text-amber-400 font-serif tracking-widest uppercase text-sm transition-colors duration-200"
          >
            {lang === "marathi" ? "संपर्क" : "Contact"}
          </span>
        </div>

        {/* Mobile/Tablet Layout: 2 rows (3 + 3) */}
        <div className="lg:hidden flex flex-col w-full text-center divide-y divide-[#D4AF37]/15">
          {/* Row 1 */}
          <div className="grid grid-cols-3 divide-x divide-[#D4AF37]/15 py-3 relative">
            <span
              onClick={() => {
                navigate("/");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="cursor-pointer active:text-amber-400 font-serif tracking-wider uppercase text-xs transition-colors py-1"
            >
              {lang === "marathi" ? "मुख्य पृष्ठ" : "Home"}
            </span>
            <div className="relative">
              <span
                onClick={() => {
                  setMobileAboutOpen(!mobileAboutOpen);
                  setMobileGalleryOpen(false);
                }}
                className="cursor-pointer active:text-amber-400 font-serif tracking-wider uppercase text-xs transition-colors py-1 flex items-center justify-center gap-0.5"
              >
                {lang === "marathi" ? "आमच्याबद्दल" : "About"} ▾
              </span>
              {/* Mobile About Dropdown Overlay */}
              {mobileAboutOpen && (
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 w-48 bg-[#301103] border border-[#D4AF37]/30 rounded-lg shadow-xl py-2 z-50 flex flex-col divide-y divide-[#D4AF37]/10 text-xs">
                  <span
                    onClick={() => {
                      navigate("/about/details");
                      setMobileAboutOpen(false);
                    }}
                    className="py-2 hover:bg-[#D4AF37]/10 text-amber-100 cursor-pointer"
                  >
                    {lang === "marathi" ? "आमच्याबद्दल" : "About Us"}
                  </span>
                  <span
                    onClick={() => {
                      navigate("/about/committee");
                      setMobileAboutOpen(false);
                    }}
                    className="py-2 hover:bg-[#D4AF37]/10 text-amber-100 cursor-pointer"
                  >
                    {lang === "marathi" ? "विद्यमान कार्यकारी मंडळ" : "Executive Committee"}
                  </span>
                  <span
                    onClick={() => {
                      navigate("/about/journey");
                      setMobileAboutOpen(false);
                    }}
                    className="py-2 hover:bg-[#D4AF37]/10 text-amber-100 cursor-pointer"
                  >
                    {lang === "marathi" ? "मंडळाचा गौरवशाली प्रवास" : "Mandal's Journey"}
                  </span>
                  <span
                    onClick={() => {
                      navigate("/about/vision-mission");
                      setMobileAboutOpen(false);
                    }}
                    className="py-2 hover:bg-[#D4AF37]/10 text-amber-100 cursor-pointer"
                  >
                    {lang === "marathi" ? "ध्येय आणि उद्दिष्टे" : "Vision & Mission"}
                  </span>
                </div>
              )}
            </div>
            <span
              onClick={() => navigate("/events")}
              className="cursor-pointer active:text-amber-400 font-serif tracking-wider uppercase text-xs transition-colors py-1"
            >
              {lang === "marathi" ? "कार्यक्रम" : "Events"}
            </span>
          </div>
          {/* Row 2 */}
          <div className="grid grid-cols-3 divide-x divide-[#D4AF37]/15 py-3 relative">
            <div className="relative">
              <span
                onClick={() => {
                  setMobileGalleryOpen(!mobileGalleryOpen);
                  setMobileAboutOpen(false);
                }}
                className="cursor-pointer active:text-amber-400 font-serif tracking-wider uppercase text-xs transition-colors py-1 flex items-center justify-center gap-0.5"
              >
                {lang === "marathi" ? "चित्रदालन" : "Gallery"} ▾
              </span>
              {/* Mobile Gallery Dropdown Overlay */}
              {mobileGalleryOpen && (
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 w-48 bg-[#301103] border border-[#D4AF37]/30 rounded-lg shadow-xl py-2 z-50 flex flex-col divide-y divide-[#D4AF37]/10 text-xs">
                  <span
                    onClick={() => {
                      navigate("/gallery/smart-ganesh");
                      setMobileGalleryOpen(false);
                    }}
                    className="py-2 hover:bg-[#D4AF37]/10 text-amber-100 cursor-pointer"
                  >
                    {lang === "marathi" ? "स्मार्ट गणेश उत्सव" : "Smart Ganesh"}
                  </span>
                  <span
                    onClick={() => {
                      navigate("/gallery/religious");
                      setMobileGalleryOpen(false);
                    }}
                    className="py-2 hover:bg-[#D4AF37]/10 text-amber-100 cursor-pointer"
                  >
                    {lang === "marathi" ? "धार्मिक उपक्रम" : "Religious"}
                  </span>
                  <span
                    onClick={() => {
                      navigate("/gallery/social");
                      setMobileGalleryOpen(false);
                    }}
                    className="py-2 hover:bg-[#D4AF37]/10 text-amber-100 cursor-pointer"
                  >
                    {lang === "marathi" ? "सामाजिक उपक्रम" : "Social"}
                  </span>
                  <span
                    onClick={() => {
                      navigate("/gallery/cultural");
                      setMobileGalleryOpen(false);
                    }}
                    className="py-2 hover:bg-[#D4AF37]/10 text-amber-100 cursor-pointer"
                  >
                    {lang === "marathi" ? "सांस्कृतिक उपक्रम" : "Cultural"}
                  </span>
                  <span
                    onClick={() => {
                      navigate("/gallery/press");
                      setMobileGalleryOpen(false);
                    }}
                    className="py-2 hover:bg-[#D4AF37]/10 text-amber-100 cursor-pointer"
                  >
                    {lang === "marathi" ? "वृत्तपत्र वार्तांकन" : "Press Coverage"}
                  </span>
                </div>
              )}
            </div>
            <span
              onClick={() => navigate("/mantras")}
              className="cursor-pointer active:text-amber-400 font-serif tracking-wider uppercase text-xs transition-colors py-1"
            >
              {lang === "marathi" ? "मंत्र" : "Mantras"}
            </span>
            <span
              onClick={() => {
                const footer = document.querySelector("footer");
                if (footer) {
                  footer.scrollIntoView({ behavior: "smooth" });
                } else {
                  navigate("/");
                }
              }}
              className="cursor-pointer active:text-amber-400 font-serif tracking-wider uppercase text-xs transition-colors py-1"
            >
              {lang === "marathi" ? "संपर्क" : "Contact"}
            </span>
          </div>
        </div>
      </nav>

      {/* 4. ANNOUNCEMENT BAR */}
      <AnnouncementBar />
    </header>
  );
};

export default Navbar;