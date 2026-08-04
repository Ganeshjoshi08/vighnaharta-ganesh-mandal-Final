import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import logoImg from "../assets/logo.jpeg";
import { useSettings } from "../context/SettingsContext";
import { BACKEND_URL } from "../api/api";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [lang, setLang] = useState(localStorage.getItem("lang") || "marathi");
  const [mobileAboutOpen, setMobileAboutOpen] = useState(false);
  const [mobileGalleryOpen, setMobileGalleryOpen] = useState(false);

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

  const isAdmin = localStorage.getItem("isAdmin") === "true";

  useEffect(() => {
    const handleScroll = () => {
      const isHome = window.location.pathname === "/";
      const threshold = isHome ? window.innerHeight - 120 : 50;
      if (window.scrollY > threshold) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    const handleStorage = () => {
      setToken(localStorage.getItem("token"));
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("storage", handleStorage);
    
    // Run initially to position correctly
    handleScroll();

    // Set interval to check pathname changes (as react-router doesn't reload window scroll sometimes)
    const interval = setInterval(handleScroll, 500);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("storage", handleStorage);
      clearInterval(interval);
    };
  }, [location.pathname]);

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

  const handleNavClick = (hash) => {
    setOpen(false);
    if (location.pathname === "/") {
      const el = document.getElementById(hash);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      navigate(`/#${hash}`);
    }
  };

  const navText = {
    marathi: {
      title: "विघ्नहर्ता मित्र मंडळ",
      sub: "विघ्नहर्ता चौक, बीड - स्थापना: १९९०",
      home: "Home",
      about: "About",
      history: "History",
      gallery: "Gallery",
      events: "Events",
      mantras: "Mantras",
      donation: "Donations",
      contact: "Contact",
      darshan: "Donations",
      admin: "Admin ⚙️",
      logout: "Logout",
      login: "Login"
    },
    english: {
      title: "Vighnaharta Mitra Mandal",
      sub: "Vighnaharta Chowk, Beed - Estd: 1990",
      home: "Home",
      about: "About",
      history: "History",
      gallery: "Gallery",
      events: "Events",
      mantras: "Mantras",
      donation: "Donations",
      contact: "Contact",
      darshan: "Donations",
      admin: "Admin ⚙️",
      logout: "Logout",
      login: "Login"
    }
  };

  const current = navText[lang];
  const { settings } = useSettings();
  const titleText = settings?.websiteName || current.title;
  const subText = settings ? (lang === "marathi" ? settings.addressMr : settings.addressEn) : current.sub;
  const logoSrc = settings?.logoUrl ? `${BACKEND_URL}${settings.logoUrl}` : logoImg;

  const isMantras = location.pathname === "/mantras" || location.pathname === "/events";

  const isHome = location.pathname === "/";

  return (
    <header
      className={`z-50 transition-all duration-500 ${
        isHome && !scrolled
          ? "absolute bottom-6 left-1/2 w-[92%] max-w-6xl flex justify-between items-center px-6 md:px-10 py-2 rounded-xl border border-amber-500/20 bg-amber-950/50 backdrop-blur-lg text-white shadow-2xl"
          : isMantras
          ? "fixed top-0 left-0 w-full flex justify-between items-center px-6 md:px-16 py-4 bg-[#FAF6E5] text-[#5C4017] border-b border-[#d8c39e]/40 shadow-none"
          : scrolled || location.pathname !== "/"
          ? "fixed top-0 left-0 w-full flex justify-between items-center px-6 md:px-16 py-4 bg-white/95 backdrop-blur-md shadow-md border-b border-outline-variant/30 text-[#111827]"
          : "fixed top-0 left-0 w-full flex justify-between items-center px-6 md:px-16 py-4 bg-transparent text-white"
      }`}
      style={isHome && !scrolled ? { transform: "translateX(-50%)", top: "auto" } : {}}
    >
      {/* LOGO & TITLE */}
      {!(isHome && !scrolled) && (
        <div
          className="flex items-center gap-2 md:gap-3 cursor-pointer min-w-0 flex-shrink-0"
          onClick={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
            navigate("/");
          }}
        >
          <img
            src={logoSrc}
            alt="Mandal Logo"
            className="w-10 h-10 rounded-full border border-secondary shadow-sm flex-shrink-0"
          />
          <div className="flex flex-col min-w-0">
            <span
              className={`font-headline-md font-bold tracking-wide truncate block max-w-[150px] xs:max-w-[200px] sm:max-w-xs md:max-w-md lg:max-w-none ${
                lang === "english" ? "text-base sm:text-lg md:text-xl" : "text-lg md:text-2xl"
              } ${
                isMantras
                  ? "text-[#5C4017]"
                  : scrolled || location.pathname !== "/"
                  ? "text-primary"
                  : "text-white"
              }`}
            >
              {titleText}
            </span>
            <span
              className={`text-[8px] md:text-[9px] font-label-caps uppercase tracking-widest font-semibold truncate block max-w-[150px] xs:max-w-[200px] sm:max-w-xs md:max-w-md lg:max-w-none ${
                isMantras
                  ? "text-[#8f4e00]/70"
                  : scrolled || location.pathname !== "/"
                  ? "text-on-surface-variant"
                  : "text-white/80"
              }`}
            >
              {subText}
            </span>
          </div>
        </div>
      )}

      {/* DESKTOP MENU - EXACTLY MATCHES SCREENSHOT */}
      <nav className="hidden lg:flex gap-8 items-center h-full">
        <span
          onClick={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
            navigate("/");
          }}
          className={`cursor-pointer font-label-caps text-xs uppercase tracking-wider font-bold transition-colors ${
            isMantras
              ? "text-[#5C4017]/70 hover:text-[#5C4017]"
              : location.pathname === "/" && window.scrollY < 200
              ? "text-primary"
              : "hover:text-primary"
          }`}
        >
          {current.home}
        </span>
        <div className="relative group py-2">
          <span
            className={`cursor-pointer font-label-caps text-xs uppercase tracking-wider font-bold transition-colors flex items-center gap-1 ${
              isMantras ? "text-[#5C4017]/70 hover:text-[#5C4017]" : "hover:text-primary"
            }`}
          >
            {current.about}
            <span className="material-symbols-outlined text-[16px]">keyboard_arrow_down</span>
          </span>
          
          {/* Dropdown Box */}
          <div className="absolute top-full left-0 mt-1 w-56 bg-white border border-outline-variant/30 rounded-xl shadow-lg opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-300 z-50 py-2">
            <span
              onClick={() => navigate("/about/details")}
              className="block px-4 py-2.5 text-xs font-bold text-[#111827] hover:bg-[#ff7a00]/10 hover:text-[#ff7a00] transition-colors"
            >
              {lang === "marathi" ? "आमच्याबद्दल" : "About Us"}
            </span>
            <span
              onClick={() => navigate("/about/committee")}
              className="block px-4 py-2.5 text-xs font-bold text-[#111827] hover:bg-[#ff7a00]/10 hover:text-[#ff7a00] transition-colors"
            >
              {lang === "marathi" ? "विद्यमान कार्यकारी मंडळ" : "Executive Committee"}
            </span>
            <span
              onClick={() => navigate("/about/journey")}
              className="block px-4 py-2.5 text-xs font-bold text-[#111827] hover:bg-[#ff7a00]/10 hover:text-[#ff7a00] transition-colors"
            >
              {lang === "marathi" ? "मंडळाचा गौरवशाली प्रवास" : "Mandal's Glorious Journey"}
            </span>
            <span
              onClick={() => navigate("/about/vision-mission")}
              className="block px-4 py-2.5 text-xs font-bold text-[#111827] hover:bg-[#ff7a00]/10 hover:text-[#ff7a00] transition-colors"
            >
              {lang === "marathi" ? "ध्येय आणि उद्दिष्टे" : "Vision & Mission"}
            </span>
          </div>
        </div>

        <div className="relative group py-2">
          <span
            className={`cursor-pointer font-label-caps text-xs uppercase tracking-wider font-bold transition-colors flex items-center gap-1 ${
              isMantras ? "text-[#5C4017]/70 hover:text-[#5C4017]" : "hover:text-primary"
            }`}
          >
            {current.gallery}
            <span className="material-symbols-outlined text-[16px]">keyboard_arrow_down</span>
          </span>
          
          {/* Gallery Dropdown Box */}
          <div className="absolute top-full left-0 mt-1 w-56 bg-white border border-outline-variant/30 rounded-xl shadow-lg opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-300 z-50 py-2">
            <span
              onClick={() => navigate("/gallery/smart-ganesh")}
              className="block px-4 py-2.5 text-xs font-bold text-[#111827] hover:bg-[#ff7a00]/10 hover:text-[#ff7a00] transition-colors"
            >
              {lang === "marathi" ? "स्मार्ट गणेश उत्सव" : "Smart Ganesh Utsav"}
            </span>
            <span
              onClick={() => navigate("/gallery/religious")}
              className="block px-4 py-2.5 text-xs font-bold text-[#111827] hover:bg-[#ff7a00]/10 hover:text-[#ff7a00] transition-colors"
            >
              {lang === "marathi" ? "धार्मिक उपक्रम" : "Religious Activities"}
            </span>
            <span
              onClick={() => navigate("/gallery/social")}
              className="block px-4 py-2.5 text-xs font-bold text-[#111827] hover:bg-[#ff7a00]/10 hover:text-[#ff7a00] transition-colors"
            >
              {lang === "marathi" ? "सामाजिक उपक्रम" : "Social Activities"}
            </span>
            <span
              onClick={() => navigate("/gallery/cultural")}
              className="block px-4 py-2.5 text-xs font-bold text-[#111827] hover:bg-[#ff7a00]/10 hover:text-[#ff7a00] transition-colors"
            >
              {lang === "marathi" ? "सांस्कृतिक उपक्रम" : "Cultural Activities"}
            </span>
            <span
              onClick={() => navigate("/gallery/press")}
              className="block px-4 py-2.5 text-xs font-bold text-[#111827] hover:bg-[#ff7a00]/10 hover:text-[#ff7a00] transition-colors"
            >
              {lang === "marathi" ? "वृत्तपत्र वार्तांकन" : "Press Coverage"}
            </span>
          </div>
        </div>
        <span
          onClick={() => navigate("/events")}
          className={`cursor-pointer font-label-caps text-xs uppercase tracking-wider font-bold transition-all ${
            location.pathname === "/events"
              ? isMantras
                ? "text-[#8f4e00] border-b-2 border-[#8f4e00] pb-1"
                : "text-primary border-b-2 border-primary pb-1"
              : isMantras
              ? "text-[#5C4017]/70 hover:text-[#5C4017]"
              : "hover:text-primary"
          }`}
        >
          {current.events}
        </span>
        <span
          onClick={() => navigate("/mantras")}
          className={`cursor-pointer font-label-caps text-xs uppercase tracking-wider font-bold transition-all ${
            location.pathname === "/mantras"
              ? isMantras
                ? "text-[#8f4e00] border-b-2 border-[#8f4e00] pb-1"
                : "text-primary border-b-2 border-primary pb-1"
              : isMantras
              ? "text-[#5C4017]/70 hover:text-[#5C4017]"
              : "hover:text-primary"
          }`}
        >
          {current.mantras}
        </span>
        <span
          onClick={() => handleNavClick("contact")}
          className={`cursor-pointer font-label-caps text-xs uppercase tracking-wider font-bold transition-colors ${
            isMantras ? "text-[#5C4017]/70 hover:text-[#5C4017]" : "hover:text-primary"
          }`}
        >
          {current.contact}
        </span>
      </nav>

      {/* RIGHTS UTILITIES (LANG SWITCHER, AUTH, AND ACTION DARSHAN BUTTON) */}
      <div className="flex items-center gap-3">
        {/* Compact Admin/Auth elements */}
        {token && isAdmin && (
          <span
            onClick={() => navigate("/admin")}
            className={`cursor-pointer text-xs font-label-caps font-bold px-2.5 py-1 border rounded bg-surface/20 hover:bg-surface/40 ${
              isMantras ? "border-[#d8c39e] text-[#5C4017]" : "border-outline"
            }`}
          >
            {current.admin}
          </span>
        )}

        {/* LANGUAGE SWITCHER */}
        <div className={`flex items-center rounded-full p-0.5 border ${
          isMantras ? "bg-[#8f4e00]/10 border-[#d8c39e]/40" : "bg-black/10 border-white/10"
        }`}>
          <button
            onClick={() => changeLang("english")}
            className={`px-1.5 py-0.5 rounded-full text-[9px] font-bold transition-all ${
              lang === "english"
                ? isMantras
                  ? "bg-[#8f4e00] text-white"
                  : "bg-primary text-white"
                : isMantras
                ? "text-[#5C4017]/60 hover:text-[#5C4017]"
                : "text-white/60 hover:text-white"
            }`}
          >
            EN
          </button>
          <button
            onClick={() => changeLang("marathi")}
            className={`px-2 py-0.5 rounded-full text-[9px] font-bold transition-all ${
              lang === "marathi"
                ? isMantras
                  ? "bg-[#8f4e00] text-white"
                  : "bg-primary text-white"
                : isMantras
                ? "text-[#5C4017]/60 hover:text-[#5C4017]"
                : "text-white/60 hover:text-white"
            }`}
          >
            मराठी
          </button>
        </div>

        {/* AUTH BUTTONS */}
        <div className="hidden sm:flex items-center gap-2">
          {token ? (
            <button
              onClick={handleLogout}
              className={`text-[10px] uppercase font-bold tracking-wider px-3 py-1 rounded transition-all hover:text-primary ${
                isMantras ? "bg-[#8f4e00]/15 text-[#5C4017]" : "bg-black/15 text-white"
              }`}
            >
              {current.logout}
            </button>
          ) : (
            <span
              onClick={() => navigate("/auth")}
              className={`cursor-pointer text-[10px] uppercase font-bold tracking-wider px-3 py-1 rounded transition-all hover:text-primary ${
                isMantras ? "bg-[#8f4e00]/15 text-[#5C4017]" : "bg-black/15 text-white"
              }`}
            >
              {current.login}
            </span>
          )}
        </div>

        {/* SUPPORT US BUTTON - EXACT MATCH TO THE SCREENSHOT GOLD ACTION BUTTON */}
        <button
          onClick={() => navigate("/donation")}
          className={`hidden sm:block px-6 py-2 rounded font-label-caps text-xs font-bold tracking-widest transition-all active:scale-95 shadow-md shrink-0 border ${
            isMantras
              ? "bg-[#8f4e00] text-white border-[#733e00] hover:bg-[#784200]"
              : "bg-primary text-white border-[#735c00] hover:bg-secondary"
          }`}
        >
          {current.darshan}
        </button>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden flex items-center justify-center p-1"
        >
          <span className="material-symbols-outlined text-2xl font-bold">
            {open ? "close" : "menu"}
          </span>
        </button>
      </div>

      {/* MOBILE DRAWER */}
      {open && (
        <div className="absolute top-[68px] left-0 w-full bg-white text-[#111827] border-b border-outline-variant/40 shadow-xl flex flex-col p-6 gap-3 lg:hidden z-40">
          <span
            onClick={() => {
              setOpen(false);
              window.scrollTo({ top: 0, behavior: "smooth" });
              navigate("/");
            }}
            className="block py-2 font-label-caps text-sm uppercase tracking-wider font-bold hover:text-primary"
          >
            {current.home}
          </span>
          <div>
            <span
              onClick={() => setMobileAboutOpen(!mobileAboutOpen)}
              className="py-2 font-label-caps text-sm uppercase tracking-wider font-bold hover:text-primary flex items-center justify-between cursor-pointer w-full"
            >
              {current.about}
              <span className="material-symbols-outlined">
                {mobileAboutOpen ? "keyboard_arrow_up" : "keyboard_arrow_down"}
              </span>
            </span>
            
            {/* Mobile Submenu */}
            {mobileAboutOpen && (
              <div className="pl-4 flex flex-col gap-2 border-l border-primary/20 mt-1 pb-2">
                <span
                  onClick={() => { setOpen(false); navigate("/about/details"); }}
                  className="block py-1.5 font-label-caps text-xs uppercase tracking-wider font-bold text-gray-700 hover:text-primary"
                >
                  {lang === "marathi" ? "आमच्याबद्दल" : "About Us"}
                </span>
                <span
                  onClick={() => { setOpen(false); navigate("/about/committee"); }}
                  className="block py-1.5 font-label-caps text-xs uppercase tracking-wider font-bold text-gray-700 hover:text-primary"
                >
                  {lang === "marathi" ? "विद्यमान कार्यकारी मंडळ" : "Executive Committee"}
                </span>
                <span
                  onClick={() => { setOpen(false); navigate("/about/journey"); }}
                  className="block py-1.5 font-label-caps text-xs uppercase tracking-wider font-bold text-gray-700 hover:text-primary"
                >
                  {lang === "marathi" ? "मंडळाचा गौरवशाली प्रवास" : "Mandal's Glorious Journey"}
                </span>
                <span
                  onClick={() => { setOpen(false); navigate("/about/vision-mission"); }}
                  className="block py-1.5 font-label-caps text-xs uppercase tracking-wider font-bold text-gray-700 hover:text-primary"
                >
                  {lang === "marathi" ? "ध्येय आणि उद्दिष्टे" : "Vision & Mission"}
                </span>
              </div>
            )}
          </div>

          <div>
            <span
              onClick={() => setMobileGalleryOpen(!mobileGalleryOpen)}
              className="py-2 font-label-caps text-sm uppercase tracking-wider font-bold hover:text-primary flex items-center justify-between cursor-pointer w-full"
            >
              {current.gallery}
              <span className="material-symbols-outlined">
                {mobileGalleryOpen ? "keyboard_arrow_up" : "keyboard_arrow_down"}
              </span>
            </span>
            
            {/* Mobile Submenu */}
            {mobileGalleryOpen && (
              <div className="pl-4 flex flex-col gap-2 border-l border-primary/20 mt-1 pb-2">
                <span
                  onClick={() => { setOpen(false); navigate("/gallery/smart-ganesh"); }}
                  className="block py-1.5 font-label-caps text-xs uppercase tracking-wider font-bold text-gray-700 hover:text-primary"
                >
                  {lang === "marathi" ? "स्मार्ट गणेश उत्सव" : "Smart Ganesh Utsav"}
                </span>
                <span
                  onClick={() => { setOpen(false); navigate("/gallery/religious"); }}
                  className="block py-1.5 font-label-caps text-xs uppercase tracking-wider font-bold text-gray-700 hover:text-primary"
                >
                  {lang === "marathi" ? "धार्मिक उपक्रम" : "Religious Activities"}
                </span>
                <span
                  onClick={() => { setOpen(false); navigate("/gallery/social"); }}
                  className="block py-1.5 font-label-caps text-xs uppercase tracking-wider font-bold text-gray-700 hover:text-primary"
                >
                  {lang === "marathi" ? "सामाजिक उपक्रम" : "Social Activities"}
                </span>
                <span
                  onClick={() => { setOpen(false); navigate("/gallery/cultural"); }}
                  className="block py-1.5 font-label-caps text-xs uppercase tracking-wider font-bold text-gray-700 hover:text-primary"
                >
                  {lang === "marathi" ? "सांस्कृतिक उपक्रम" : "Cultural Activities"}
                </span>
                <span
                  onClick={() => { setOpen(false); navigate("/gallery/press"); }}
                  className="block py-1.5 font-label-caps text-xs uppercase tracking-wider font-bold text-gray-700 hover:text-primary"
                >
                  {lang === "marathi" ? "वृत्तपत्र वार्तांकन" : "Press Coverage"}
                </span>
              </div>
            )}
          </div>
          <span
            onClick={() => { setOpen(false); navigate("/events"); }}
            className="block py-2 font-label-caps text-sm uppercase tracking-wider font-bold hover:text-primary"
          >
            {current.events}
          </span>
          <span
            onClick={() => { setOpen(false); navigate("/mantras"); }}
            className="block py-2 font-label-caps text-sm uppercase tracking-wider font-bold hover:text-primary"
          >
            {current.mantras}
          </span>
          <span
            onClick={() => handleNavClick("contact")}
            className="block py-2 font-label-caps text-sm uppercase tracking-wider font-bold hover:text-primary mb-2"
          >
            {current.contact}
          </span>
          <div className="flex flex-col gap-3 mt-2 pt-4 border-t border-gray-100 sm:hidden">
            {token ? (
              <button
                onClick={() => { setOpen(false); handleLogout(); }}
                className="w-full py-2.5 rounded font-label-caps text-xs font-bold tracking-widest uppercase bg-red-50 text-red-600 border border-red-100 transition-colors"
              >
                {current.logout}
              </button>
            ) : (
              <button
                onClick={() => { setOpen(false); navigate("/auth"); }}
                className="w-full py-2.5 rounded font-label-caps text-xs font-bold tracking-widest uppercase bg-amber-500/10 text-primary border border-amber-500/20 hover:bg-amber-500/20 transition-all"
              >
                {current.login}
              </button>
            )}
            <button
              onClick={() => { setOpen(false); navigate("/donation"); }}
              className="w-full py-2.5 rounded font-label-caps text-xs font-bold tracking-widest uppercase bg-[#8f4e00] text-white border border-[#733e00] hover:bg-[#784200]"
            >
              {current.darshan}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;