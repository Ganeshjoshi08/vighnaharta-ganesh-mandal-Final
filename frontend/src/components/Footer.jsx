import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

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
      title: "श्री गणेश मंडळ",
      tag: "श्रद्धा • सेवा • संस्कृती",
      privacy: "Privacy Policy",
      terms: "Terms of Service",
      volunteer: "Volunteer Signup",
      timings: "Temple Timing",
      copyright: "© 2024 श्री गणेश मंडळ. Developed by Ganesh Joshi",
      dev: "Developed by Ganesh Joshi",
      chant: "“गणपती बाप्पा मोरया, पुढच्या वर्षी लवकर या!”"
    },
    english: {
      title: "Shree Ganesh Mandal",
      tag: "DEVOTION • SERVICE • CULTURE",
      privacy: "Privacy Policy",
      terms: "Terms of Service",
      volunteer: "Volunteer Signup",
      timings: "Temple Timing",
      copyright: "© 2024 श्री गणेश मंडळ. Developed by Ganesh Joshi",
      dev: "Developed by Ganesh Joshi",
      chant: "“Ganpati Bappa Morya, Pudhchya Varshi Lavkar Ya!”"
    }
  };

  const current = footerText[lang];
  const isMantras = location.pathname === "/mantras";

  return (
    <footer className={`w-full py-12 px-6 md:px-16 flex flex-col items-center gap-4 text-center border-t-4 border-secondary-container transition-colors duration-300 ${
      isMantras ? "bg-[#232514] text-surface-variant/90" : "bg-on-background text-surface-variant"
    }`}>
      <div className="mb-4">
        <span className="font-headline-md text-3xl text-primary-fixed mb-2 block font-black">
          {current.title}
        </span>
        <p className="font-label-caps text-xs text-surface-variant/60 uppercase tracking-[0.2em] font-bold">
          {current.tag}
        </p>
      </div>

      <nav className="flex flex-wrap justify-center gap-6 md:gap-8 mb-4 text-xs md:text-sm">
        <a href="#about" className="font-label-caps uppercase tracking-wider text-surface-variant hover:text-primary-fixed transition-colors">
          {current.privacy}
        </a>
        <a href="#about" className="font-label-caps uppercase tracking-wider text-surface-variant hover:text-primary-fixed transition-colors">
          {current.terms}
        </a>
        <a href="#about" className="font-label-caps uppercase tracking-wider text-surface-variant hover:text-primary-fixed transition-colors">
          {current.volunteer}
        </a>
        <a href="#about" className="font-label-caps uppercase tracking-wider text-surface-variant hover:text-primary-fixed transition-colors">
          {current.timings}
        </a>
      </nav>

      <div className="space-y-1 text-xs md:text-sm">
        <p className="text-surface-variant/80 font-medium">
          {current.copyright}
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
