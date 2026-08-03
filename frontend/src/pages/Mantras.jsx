import React, { useState, useEffect, useRef } from "react";
import offeringsImg from "../assets/daily_offerings.jpg";
import API from "../api/api";

const Mantras = () => {
  const [lang, setLang] = useState(localStorage.getItem("lang") || "marathi");
  const [mantras, setMantras] = useState([]);
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [loading, setLoading] = useState(true);

  // Audio Player states
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1.0);
  const audioRef = useRef(null);

  // Force body background to solid cream-beige
  useEffect(() => {
    const originalBgColor = document.body.style.backgroundColor;
    const originalBgImage = document.body.style.backgroundImage;
    const originalAttachment = document.body.style.backgroundAttachment;

    document.body.style.backgroundColor = "#FAF6E5"; 
    document.body.style.backgroundImage = "none";
    document.body.style.backgroundAttachment = "unset";

    const handleLangChange = () => {
      setLang(localStorage.getItem("lang") || "marathi");
    };
    window.addEventListener("langChange", handleLangChange);

    fetchMantras();

    return () => {
      document.body.style.backgroundColor = originalBgColor;
      document.body.style.backgroundImage = originalBgImage;
      document.body.style.backgroundAttachment = originalAttachment;
      window.removeEventListener("langChange", handleLangChange);
    };
  }, []);

  const fetchMantras = async () => {
    try {
      const res = await API.get("/mantras?activeOnly=true");
      setMantras(res.data.data || []);
    } catch (err) {
      console.error("Failed to load mantras:", err);
    } finally {
      setLoading(false);
    }
  };

  const currentMantra = mantras[selectedIdx];

  // Stop audio on tab switch/hidden state
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && audioRef.current && isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [isPlaying]);

  // Audio Handshake and Lifecycle management
  useEffect(() => {
    // 1. Stop and clear old audio
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setIsPlaying(false);
    setCurrentTime(0);
    setDuration(0);

    // 2. Setup new Audio if available
    if (currentMantra && currentMantra.audioFile) {
      const audio = new Audio(currentMantra.audioFile);
      audioRef.current = audio;
      audio.volume = volume;

      const onLoadedMetadata = () => {
        setDuration(audio.duration || 0);
      };

      const onTimeUpdate = () => {
        setCurrentTime(audio.currentTime || 0);
      };

      const onEnded = () => {
        setIsPlaying(false);
        setCurrentTime(0);
        audio.currentTime = 0;
      };

      audio.addEventListener("loadedmetadata", onLoadedMetadata);
      audio.addEventListener("timeupdate", onTimeUpdate);
      audio.addEventListener("ended", onEnded);

      return () => {
        audio.removeEventListener("loadedmetadata", onLoadedMetadata);
        audio.removeEventListener("timeupdate", onTimeUpdate);
        audio.removeEventListener("ended", onEnded);
        audio.pause();
        audioRef.current = null;
      };
    }
  }, [selectedIdx, currentMantra]);

  const handlePlayPause = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch((err) => console.log("Audio play failed:", err));
      setIsPlaying(true);
    }
  };

  const handleStop = () => {
    if (!audioRef.current) return;
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    setIsPlaying(false);
    setCurrentTime(0);
  };

  const handleSeekChange = (e) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  const handleVolumeChange = (e) => {
    const newVol = parseFloat(e.target.value);
    setVolume(newVol);
    if (audioRef.current) {
      audioRef.current.volume = newVol;
    }
  };

  const formatTime = (secs) => {
    if (isNaN(secs)) return "0:00";
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  const toDevanagariNumber = (num) => {
    const devanagariDigits = ["०", "१", "२", "३", "४", "५", "६", "७", "८", "९"];
    return String(num)
      .padStart(2, "0")
      .split("")
      .map((char) => {
        const digit = parseInt(char);
        return isNaN(digit) ? char : devanagariDigits[digit];
      })
      .join("");
  };

  const getVerses = (text) => {
    if (!text) return [];
    return text.split("\n").map((line) => {
      const trimmed = line.trim();
      return trimmed === "" ? "divider" : trimmed;
    });
  };

  const UI = {
    marathi: {
      selectTitle: "निवडा (Select)",
      dailyOfferings: "नैवेद्य आणि पूजा",
      dailyOfferingsSub: "Daily Offerings",
      mantrasTitle: "मंत्र (Mantras)",
      noMantras: "सध्या कोणतेही मंत्र उपलब्ध नाहीत.",
      loadingText: "मंत्र लोड होत आहेत..."
    },
    english: {
      selectTitle: "Select Mantra",
      dailyOfferings: "Daily Offerings",
      dailyOfferingsSub: "Daily Offerings & Pujas",
      mantrasTitle: "Mantras (Spiritual Hymns)",
      noMantras: "No mantras available at the moment.",
      loadingText: "Loading mantras..."
    }
  };

  const currentUI = UI[lang] || UI.marathi;

  return (
    <div className="min-h-screen pt-28 pb-20 px-6 md:px-16 flex flex-col items-center justify-start w-full">
      {/* HEADER TITLE */}
      <div className="text-center mb-10">
        <h1 className="font-display-hero text-4xl md:text-5xl font-black text-[#5C4017] inline-block relative pb-3 tracking-wide">
          {currentUI.mantrasTitle}
          <div className="absolute bottom-0 left-1/4 right-1/4 h-[2px] bg-[#5C4017]" />
        </h1>
      </div>

      {loading ? (
        <div className="text-[#8f4e00] font-bold text-lg mt-20">{currentUI.loadingText}</div>
      ) : mantras.length === 0 ? (
        <div className="text-[#8f4e00] font-bold text-lg mt-20">{currentUI.noMantras}</div>
      ) : (
        /* MAIN CONTAINER */
        <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
          
          {/* LEFT COLUMN: SIDEBAR SELECT & OFFERINGS CARD */}
          <div className="lg:col-span-4 flex flex-col gap-6 w-full">
            
            {/* SELECT BOARD */}
            <div className="bg-[#FAF6E5] border border-[#d8c39e] rounded-sm overflow-hidden shadow-sm">
              <div className="px-5 py-4 border-b border-[#d8c39e]/40 bg-[#FAF6E5]">
                <h2 className="font-display-hero text-[#5C4017] text-xl font-bold tracking-wide">
                  {currentUI.selectTitle}
                </h2>
              </div>
              
              <div className="flex flex-col">
                {mantras.map((mantra, idx) => {
                  const isActive = selectedIdx === idx;
                  return (
                    <button
                      key={mantra._id}
                      onClick={() => setSelectedIdx(idx)}
                      className={`flex items-center gap-4 px-5 py-4 text-left border-b border-[#d8c39e]/30 transition-all outline-none group ${
                        isActive 
                          ? "bg-[#FFECA1]/30 border-l-4 border-l-[#8f4e00]" 
                          : "hover:bg-[#FFECA1]/10 border-l-4 border-l-transparent"
                      }`}
                    >
                      {/* Gold Devanagari Number */}
                      <span className="font-display-hero text-lg font-bold text-[#8f4e00]/70 group-hover:text-[#8f4e00] transition-colors w-6">
                        {toDevanagariNumber(idx + 1)}
                      </span>
                      
                      {/* Titles */}
                      <div className="flex flex-col">
                        <span className="font-headline-md text-sm font-bold text-[#111827]">
                          {lang === "english" ? mantra.mantraNameEn : mantra.mantraNameMr}
                        </span>
                        <span className="text-xs text-on-surface-variant/70 font-semibold mt-0.5">
                          {lang === "english" ? `(${mantra.mantraNameMr})` : `(${mantra.mantraNameEn})`}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* DAILY OFFERINGS CARD */}
            <div className="relative rounded-sm overflow-hidden shadow-md aspect-[4/3] group border border-[#d8c39e]">
              <img 
                src={offeringsImg} 
                alt="Daily Offerings thali" 
                className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700" 
              />
              {/* Dark gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-5">
                <span className="text-[10px] text-white/70 font-bold uppercase tracking-widest mb-1 font-label-caps">
                  {currentUI.dailyOfferings}
                </span>
                <h3 className="text-lg md:text-xl font-display-hero font-bold text-white tracking-wide">
                  {currentUI.dailyOfferingsSub}
                </h3>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: SCENE SCROLL DISPLAY */}
          <div className="lg:col-span-8 bg-[#FAF6E5] border border-[#d8c39e] rounded-sm p-6 md:p-12 relative flex flex-col items-center justify-start shadow-sm min-h-[500px]">
            
            {/* Double Gold Decorative Border Offset */}
            <div className="absolute inset-3 border border-[#8f4e00]/15 pointer-events-none rounded-sm" />
            
            {/* Decorative Corner Bracket Lines */}
            <div className="absolute top-5 left-5 w-6 h-6 border-t border-l border-[#8f4e00]/40 pointer-events-none" />
            <div className="absolute top-5 right-5 w-6 h-6 border-t border-r border-[#8f4e00]/40 pointer-events-none" />
            <div className="absolute bottom-5 left-5 w-6 h-6 border-b border-l border-[#8f4e00]/40 pointer-events-none" />
            <div className="absolute bottom-5 right-5 w-6 h-6 border-b border-r border-[#8f4e00]/40 pointer-events-none" />

            {/* Lotus Motif */}
            <div className="mb-3 pt-2">
              <svg className="w-8 h-8 text-[#8f4e00]/70" viewBox="0 0 64 64" fill="currentColor">
                <path d="M32 8c-2 8-8 16-16 20 6 2 12 0 16-6 4 6 10 8 16 6-8-4-14-12-16-20z" />
                <path d="M32 16c-1.5 6-6 12-12 15 4.5 1.5 9 0 12-4.5 3 4.5 7.5 6 12 4.5-6-3-10.5-9-12-15z" className="opacity-60" />
                <path d="M32 48c-1.5-4-4-8-8-10 3 1.5 6 1 8-2 2 3 5 3.5 8 2-4 2-6.5 6-8 10z" />
              </svg>
            </div>

            {/* Heading */}
            <div className="text-center mb-6">
              <h2 className="font-display-hero text-3xl md:text-4xl font-extrabold text-[#6d3a00] mb-1 tracking-wide leading-tight">
                {lang === "english" ? currentMantra.mantraNameEn : currentMantra.mantraNameMr}
              </h2>
              <p className="font-label-caps text-[10px] text-[#8f4e00] font-black uppercase tracking-[0.25em]">
                {lang === "english" ? currentMantra.mantraNameMr : currentMantra.mantraNameEn}
              </p>
            </div>

            {/* DEVOTIONAL AUDIO PLAYER */}
            {currentMantra.audioFile && (
              <div className="w-full max-w-lg bg-[#fffdf5] border border-[#d8c39e] rounded-md p-4 mb-6 flex flex-col gap-3 shadow-inner relative z-20">
                <div className="flex items-center justify-between gap-4">
                  {/* Play/Pause Button */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handlePlayPause}
                      className="w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-r from-[#ff7a00] to-[#ff3c00] text-white hover:scale-105 transition-transform shadow-md outline-none"
                    >
                      {isPlaying ? (
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                          <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                        </svg>
                      ) : (
                        <svg className="w-4 h-4 fill-current translate-x-0.5" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      )}
                    </button>

                    {/* Stop Button */}
                    <button
                      onClick={handleStop}
                      className="w-10 h-10 rounded-full flex items-center justify-center bg-[#FAF6E5] border border-[#d8c39e] text-[#8f4e00] hover:bg-[#FFECA1]/30 transition-colors outline-none"
                      title="Stop"
                    >
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M6 6h12v12H6z" />
                      </svg>
                    </button>
                  </div>

                  {/* Progress & Time */}
                  <div className="flex-1 flex flex-col gap-1">
                    <input
                      type="range"
                      min={0}
                      max={duration || 1}
                      value={currentTime}
                      onChange={handleSeekChange}
                      className="w-full h-1 bg-[#d8c39e]/40 accent-[#ff7a00] rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between text-[11px] text-[#8f4e00]/70 font-semibold font-display-hero">
                      <span>{formatTime(currentTime)}</span>
                      <span>{formatTime(duration)}</span>
                    </div>
                  </div>

                  {/* Volume Control */}
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-[#8f4e00]/70" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z" />
                    </svg>
                    <input
                      type="range"
                      min={0}
                      max={1}
                      step={0.05}
                      value={volume}
                      onChange={handleVolumeChange}
                      className="w-16 h-1 bg-[#d8c39e]/40 accent-[#ff7a00] rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Verses lyrics */}
            <div className="w-full max-w-lg text-center mb-4 overflow-y-auto max-h-[440px] px-2 py-1 scrollbar-thin">
              <div className="space-y-6">
                {getVerses(lang === "english" ? currentMantra.mantraTextEn : currentMantra.mantraTextMr).map((line, lineIdx) => {
                  if (line === "divider") {
                    return (
                      <div key={lineIdx} className="flex justify-center items-center py-2">
                        <div className="w-16 h-[1px] bg-[#8f4e00]/20" />
                      </div>
                    );
                  }
                  return (
                    <p 
                      key={lineIdx} 
                      className="font-body-lg text-lg md:text-xl font-semibold text-[#271b05] leading-relaxed select-text"
                    >
                      {line}
                    </p>
                  );
                })}
              </div>
            </div>

          </div>

        </div>
      )}
    </div>
  );
};

export default Mantras;
