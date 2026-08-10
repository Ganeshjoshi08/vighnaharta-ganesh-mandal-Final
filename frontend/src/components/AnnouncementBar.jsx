import React, { useState, useEffect } from "react";
import API from "../api/api";

const AnnouncementBar = () => {
  const [lang, setLang] = useState(localStorage.getItem("lang") || "marathi");
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    const handleLangChange = () => {
      setLang(localStorage.getItem("lang") || "marathi");
    };
    window.addEventListener("langChange", handleLangChange);
    
    const fetchAnnouncements = async () => {
      try {
        const res = await API.get("/announcements");
        // Keep active announcements only
        const activeList = res.data.filter(a => a.active !== false);
        setAnnouncements(activeList);
      } catch (err) {
        console.log("Error fetching announcements:", err);
      }
    };
    fetchAnnouncements();

    return () => {
      window.removeEventListener("langChange", handleLangChange);
    };
  }, []);

  // Safe fallback banner text
  const defaultText = lang === "marathi"
    ? "📢 श्री गणेश जयंती व माघी गणेशोत्सव २०२६ चे भव्य नियोजन सुरू! अधिक माहितीसाठी लवकरच संपर्क साधा."
    : "📢 Grand planning for Shree Ganesh Jayanti & Maghi Ganeshotsav 2026 is underway! Contact us soon for more details.";

  const textToShow = announcements.length > 0 
    ? (lang === "marathi" ? announcements[0].textMr : announcements[0].textEn)
    : defaultText;

  return (
    <div className="w-full bg-gradient-to-r from-[#D4AF37] via-[#FFD700] to-[#D4AF37] text-[#1b0800] font-bold py-2.5 px-4 text-center text-xs md:text-sm shadow-md border-y border-[#B8860B]/40 tracking-wide select-none">
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-2">
        <span className="flex-1 animate-pulse">{textToShow}</span>
      </div>
    </div>
  );
};

export default AnnouncementBar;
