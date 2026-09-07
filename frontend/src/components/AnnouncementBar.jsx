import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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
        const activeList = (res.data || []).filter(a => a.active !== false);
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

  const isMarathi = lang === "marathi";

  // Default values requested by user:
  const defaultTitle = isMarathi
    ? "गणेशोत्सवातील विविध धार्मिक व सांस्कृतिक कार्यक्रमांचे वेळापत्रक"
    : "Schedule of various religious & cultural programs of Ganeshotsav 2026";
  const defaultBtnText = isMarathi ? "येथे क्लिक करा" : "Click Here";
  const defaultLink = "/schedule";

  // Pick first active announcement, filtering out old demo strings
  const currentAnn = announcements.find(a => {
    if (a.active === false) return false;
    const msg = (a.message || a.messageMr || "").trim().toUpperCase();
    return msg !== "DEMO ANNOUNCEMENT" && msg !== "TEST" && msg !== "";
  }) || (announcements.length > 0 && announcements[0].active !== false ? announcements[0] : null);

  let displayText = defaultTitle;
  let buttonText = defaultBtnText;
  let buttonLink = defaultLink;
  let showButton = true;

  if (currentAnn) {
    const rawMsg = isMarathi 
      ? (currentAnn.messageMr || currentAnn.message) 
      : (currentAnn.messageEn || currentAnn.message);
    
    if (rawMsg && rawMsg.trim().toUpperCase() !== "DEMO ANNOUNCEMENT") {
      displayText = rawMsg;
    }
    
    buttonText = isMarathi 
      ? (currentAnn.buttonText || defaultBtnText) 
      : (currentAnn.buttonTextEn || currentAnn.buttonText || defaultBtnText);
    buttonLink = currentAnn.buttonLink || defaultLink;
    showButton = currentAnn.showButton !== false;
  }

  return (
    <div className="w-full bg-gradient-to-r from-[#D4AF37] via-[#FFDF73] to-[#D4AF37] text-[#200b02] font-bold py-2 px-3 sm:px-6 text-center text-xs sm:text-sm shadow-md border-y border-[#B8860B]/50 tracking-wide select-none">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center gap-2 sm:gap-4">
        
        {/* Announcement Message */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <span className="text-sm sm:text-base animate-pulse">📢</span>
          <span className="font-black text-neutral-900 drop-shadow-sm">
            {displayText}
          </span>
        </div>

        {/* Action Button */}
        {showButton && (
          <Link
            to={buttonLink}
            className="inline-flex items-center gap-1.5 bg-[#380b02] hover:bg-[#5a1603] text-[#FFE9A3] hover:text-white px-3 py-1 sm:px-4 sm:py-1 rounded-full text-[11px] sm:text-xs font-black shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105 border border-[#D4AF37] active:scale-95 whitespace-nowrap"
          >
            <span>{buttonText}</span>
            <span className="text-[11px] font-sans">➔</span>
          </Link>
        )}

      </div>
    </div>
  );
};

export default AnnouncementBar;
