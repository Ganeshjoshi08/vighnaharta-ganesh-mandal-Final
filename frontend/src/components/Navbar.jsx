import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import logoImg from "../assets/logo.jpeg";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [lang, setLang] = useState(localStorage.getItem("lang") || "marathi");

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
      if (window.scrollY > 50) {
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

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("storage", handleStorage);
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
  const isMantras = location.pathname === "/mantras" || location.pathname === "/events";

  return (
    <header
      className={`fixed top-0 w-full z-50 flex justify-between items-center px-6 md:px-16 py-4 transition-all duration-300 ${
        isMantras
          ? "bg-[#FAF6E5] text-[#5C4017] border-b border-[#d8c39e]/40 shadow-none"
          : scrolled || location.pathname !== "/"
          ? "bg-white/95 backdrop-blur-md shadow-md border-b border-outline-variant/30 text-[#111827]"
          : "bg-transparent text-white"
      }`}
    >
      {/* LOGO & TITLE */}
      <div
        className="flex items-center gap-3 cursor-pointer"
        onClick={() => {
          window.scrollTo({ top: 0, behavior: "smooth" });
          navigate("/");
        }}
      >
        <img
          src={logoImg}
          alt="Mandal Logo"
          className="w-10 h-10 rounded-full border border-secondary shadow-sm"
        />
        <div className="flex flex-col">
          <span
            className={`font-headline-md text-lg md:text-2xl font-bold tracking-wide ${
              isMantras
                ? "text-[#5C4017]"
                : scrolled || location.pathname !== "/"
                ? "text-primary"
                : "text-white"
            }`}
          >
            {current.title}
          </span>
          <span
            className={`text-[8px] md:text-[9px] font-label-caps uppercase tracking-widest font-semibold ${
              isMantras
                ? "text-[#8f4e00]/70"
                : scrolled || location.pathname !== "/"
                ? "text-on-surface-variant"
                : "text-white/80"
            }`}
          >
            {current.sub}
          </span>
        </div>
      </div>

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
        <span
          onClick={() => handleNavClick("about")}
          className={`cursor-pointer font-label-caps text-xs uppercase tracking-wider font-bold transition-colors ${
            isMantras ? "text-[#5C4017]/70 hover:text-[#5C4017]" : "hover:text-primary"
          }`}
        >
          {current.about}
        </span>
        <span
          onClick={() => handleNavClick("history")}
          className={`cursor-pointer font-label-caps text-xs uppercase tracking-wider font-bold transition-colors ${
            isMantras ? "text-[#5C4017]/70 hover:text-[#5C4017]" : "hover:text-primary"
          }`}
        >
          {current.history}
        </span>
        <span
          onClick={() => handleNavClick("gallery")}
          className={`cursor-pointer font-label-caps text-xs uppercase tracking-wider font-bold transition-colors ${
            isMantras ? "text-[#5C4017]/70 hover:text-[#5C4017]" : "hover:text-primary"
          }`}
        >
          {current.gallery}
        </span>
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
        <div className="flex items-center gap-2">
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
          className={`px-6 py-2 rounded font-label-caps text-xs font-bold tracking-widest transition-all active:scale-95 shadow-md shrink-0 border ${
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
          <span
            onClick={() => handleNavClick("about")}
            className="block py-2 font-label-caps text-sm uppercase tracking-wider font-bold hover:text-primary"
          >
            {current.about}
          </span>
          <span
            onClick={() => handleNavClick("history")}
            className="block py-2 font-label-caps text-sm uppercase tracking-wider font-bold hover:text-primary"
          >
            {current.history}
          </span>
          <span
            onClick={() => handleNavClick("gallery")}
            className="block py-2 font-label-caps text-sm uppercase tracking-wider font-bold hover:text-primary"
          >
            {current.gallery}
          </span>
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
            className="block py-2 font-label-caps text-sm uppercase tracking-wider font-bold hover:text-primary"
          >
            {current.contact}
          </span>
        </div>
      )}
    </header>
  );
};

export default Navbar;