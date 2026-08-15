import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { useSettings } from "../context/SettingsContext";

const Footer = () => {
  const [lang, setLang] = useState(localStorage.getItem("lang") || "marathi");
  const location = useLocation();

  useEffect(() => {
    const handleLangChange = () => {
      setLang(localStorage.getItem("lang") || "marathi");
    };
    window.addEventListener("langChange", handleLangChange);
    return () => {
      window.removeEventListener("langChange", handleLangChange);
    };
  }, []);

  const footerText = {
    marathi: {
      title: "श्री विघ्नहर्ता मित्र मंडळ",
      tag: "श्रद्धा • सेवा • संस्कृती",
      privacy: "गोपनीयता धोरण",
      terms: "अटी व शर्ती",
      copyrightNotice: "कॉपीराइट नोटीस",
      timings: "उत्सव वेळापत्रक",
      copyright: "© 2026 श्री विघ्नहर्ता मित्र मंडळ. Developed by VMM-2026",
      dev: "Developed by VMM-2026",
    },
    english: {
      title: "Shree Vighnaharta Mitra Mandal",
      tag: "DEVOTION • SERVICE • CULTURE",
      privacy: "Privacy Policy",
      terms: "Terms & Conditions",
      copyrightNotice: "Copyright Notice",
      timings: "Utsav Timings",
      copyright: "© 2026 Shree Vighnaharta Mitra Mandal. Developed by VMM-2026",
      dev: "Developed by VMM",
    }
  };

  const current = footerText[lang];
  const { settings } = useSettings();
  const titleText = settings?.websiteName || current.title;
  const tagText = settings ? (lang === "marathi" ? settings.footerTextMr : settings.footerTextEn) : current.tag;
  const copyrightText = settings ? (lang === "marathi" ? settings.copyrightMr : settings.copyrightEn) : current.copyright;

  const isMantras = location.pathname === "/mantras";

  return (
    <footer className={`w-full py-12 px-6 md:px-16 flex flex-col items-center gap-4 text-center border-t-4 border-secondary-container transition-colors duration-300 ${isMantras ? "bg-[#232514] text-surface-variant/90" : "bg-on-background text-surface-variant"
      }`}>
      <div className="mb-4">
        <span className="font-headline-md text-3xl text-primary-fixed mb-2 block font-black">
          {titleText}
        </span>
        <p className="font-label-caps text-xs text-surface-variant/60 uppercase tracking-[0.2em] font-bold">
          {tagText}
        </p>
      </div>

      <nav className="flex flex-wrap justify-center gap-6 md:gap-8 mb-4 text-xs md:text-sm">
        <Link to="/terms" className="font-label-caps uppercase tracking-wider text-surface-variant hover:text-primary-fixed transition-colors">
          {current.terms}
        </Link>
        <Link to="/privacy" className="font-label-caps uppercase tracking-wider text-surface-variant hover:text-primary-fixed transition-colors">
          {current.privacy}
        </Link>
        <Link to="/copyright" className="font-label-caps uppercase tracking-wider text-surface-variant hover:text-primary-fixed transition-colors">
          {current.copyrightNotice}
        </Link>
      </nav>

      <div className="space-y-1 text-xs md:text-sm">
        <p className="text-surface-variant/80 font-medium">
          {copyrightText && !copyrightText.includes("Developed by VMM-2026")
            ? `${copyrightText.replace(/\.?\s*Developed by.*$/gi, "")}. Developed by VMM-2026`
            : copyrightText}
        </p>
      </div>

      <div className="mt-4 pt-4 border-t border-white/5 w-full max-w-lg">
        <p className="font-body-md text-sm italic opacity-50 text-primary-fixed-dim">
          {current.chant}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
