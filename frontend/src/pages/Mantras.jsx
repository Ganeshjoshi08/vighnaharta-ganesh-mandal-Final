import React, { useState, useEffect, useRef } from "react";
import offeringsImg from "../assets/daily_offerings.jpg";

const Mantras = () => {
  const [lang, setLang] = useState(localStorage.getItem("lang") || "marathi");
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  // Audio references
  const audioCtxRef = useRef(null);
  const droneOscRef = useRef(null);
  const droneGainRef = useRef(null);
  const bellIntervalRef = useRef(null);
  const timerRef = useRef(null);

  // Force body background to solid cream-beige exactly as shown in the screenshot
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

    return () => {
      document.body.style.backgroundColor = originalBgColor;
      document.body.style.backgroundImage = originalBgImage;
      document.body.style.backgroundAttachment = originalAttachment;
      window.removeEventListener("langChange", handleLangChange);
      stopAudio();
    };
  }, []);

  // Stop audio when active mantra changes
  useEffect(() => {
    stopAudio();
  }, [selectedIdx]);

  const mantrasData = [
    {
      id: "०१",
      titleEn: "Ganesh Mantra",
      titleMr: "गणेश मंत्र",
      subtitle: "OM GAN GANAPATAYE NAMAHA",
      verses: [
        "वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ।",
        "निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा॥",
        "divider",
        "ॐ गं गणपतये नमः ॥",
        "ॐ एकदन्ताय विद्महे वक्रतुण्डाय धीमहि। तन्नो दन्ती प्रचोदयात्॥",
        "गजाननाय विद्महे वक्रतुण्डाय धीमहि। तन्नो दन्ती प्रचोदयात्॥"
      ]
    },
    {
      id: "०२",
      titleEn: "Atharvashirsh",
      titleMr: "अथर्वशीर्ष",
      subtitle: "OM NAMASTE GANAPATAYE",
      verses: [
        "ॐ नमस्ते गणपतये ॥ त्वमेव प्रत्यक्षं तत्त्वमसि ॥",
        "त्वमेव केवलं कर्तासि ॥ त्वमेव केवलं धर्तासि ॥",
        "त्वमेव केवलं हर्तासि ॥ त्वमेव सर्वं खल्विदं ब्रम्हासि ॥",
        "त्वं साक्षादात्मासि नित्यम् ॥ १ ॥",
        "divider",
        "ऋतं वच्मि ॥ सत्यं वच्मि ॥ २ ॥",
        "divider",
        "अव त्वं माम् ॥ अव वक्तारम् ॥ अव श्रोतारम् ॥",
        "अव दातारम् ॥ अव धातारम् ॥ अवानूचानमव शिष्यम् ॥",
        "अव पश्चात्तात् ॥ अव पुरस्तात् ॥ अवोत्तरात्तात् ॥",
        "अव दक्षिणात्तात् ॥ अव चोर्ध्वात्तात् ॥ अवाधरात्तात् ॥",
        "सर्वतो मां पाहि पाहि समंतात् ॥ ३ ॥",
        "divider",
        "त्वं वाग्ड़मयस्त्वं चिन्मयः ॥",
        "त्वं आनंदमयस्त्वं ब्रम्हमयः ॥",
        "त्वं सच्चिदानंदाद्वितीयोसि ॥",
        "त्वं प्रत्यक्षं ब्रम्हासि ॥",
        "त्वं ज्ञानमयो विज्ञानमयोसि ॥ ४ ॥",
        "divider",
        "सर्वं जगदिदं त्वत्तो जायते ॥",
        "सर्वं जगदिदं त्वत्तस्तिष्ठति ॥",
        "सर्वं जगदिदं त्वयि लयमेष्यति ॥",
        "सर्वं जगदिदं त्वयि प्रत्येति ॥",
        "त्वं भूमिरापो नलो निलो नभः ॥",
        "त्वं चत्वारि वाक्पदानि ॥ ५ ॥",
        "divider",
        "त्वं गुणत्रयातीतः ॥ त्वं देहत्रयातीतः ॥",
        "त्वं कालत्रयातीतः ॥ त्वं मूलाधार: स्थितोसि नित्यम ॥",
        "त्वं शक्ति त्रयात्मकः ॥",
        "त्वां योगिनो ध्यायन्ती नित्यम ॥",
        "divider",
        "त्वं ब्रम्हास्त्वंविष्णुस्त्वंरुद्रस्त्वंइंद्रस्त्वंअग्निस्त्वंवायुस्त्वंसूर्यस्त्वंचंद्रमास्त्वं ब्रम्हभूर्भुवस्वरोम् ॥ ६ ॥",
        "divider",
        "गणादिं पूर्वमुच्चार्यं वर्णादिं तदनंतरम् ॥",
        "अनुस्वारः परतरः ॥ अर्धेंदुलसितम् ॥",
        "तारेण ऋध्दम् ॥ एतत्तव मनुस्वरुपम् ॥",
        "गकारः पूर्वरुपम् ॥ अकारो मध्यमरुपम् ॥",
        "अनुस्वारश्चान्त्यरुपम् ॥ बिन्दुरुत्तररुपम् ॥",
        "नादःसंधानम् ॥ संहितासंधी: ॥ सैषा गणेश विद्या ॥",
        "गणकऋषि: निछद् गायत्री छंदः ॥",
        "गणपतीर्देवता ॥ ॐ गं गणपतये नमः ॥ ७ ॥",
        "divider",
        "एकदंताय विद्महे वक्रतुंडाय धीमहि ॥",
        "तन्नो दंति: प्रचोदयात् ॥ ८ ॥",
        "divider",
        "एकदंतं चतुर्हस्तं पाशमंकुशधारिणम् ॥",
        "रदं च वरदं हस्तै बिभ्राणं मूषकध्वजम् ॥",
        "रक्तं लंबोदरं शूर्पकर्णकं रक्तवाससम् ॥",
        "रक्तगंधानुलिप्तांगं रक्तपुष्पै: सुपूजितम् ॥",
        "भक्तानुकंपिन देवं जगत्कारणमच्युतम् ॥",
        "divider",
        "आविर्भूतं च सृष्ट्यादो प्रकॄते: पुरुषात्परम् ॥",
        "एवं ध्यायति यो नित्यम् स योगी योगिनां वरः ॥ ९ ॥",
        "divider",
        "नमो व्रातपतये । नमो गणपतये नमः ।",
        "प्रमथपतये । नमस्ते अस्तु लंबोदराय एकदंताय ॥",
        "विघ्ननाशिने शिवसुताय ॥ श्री वरदमूर्तये नमः ॥ १० ॥"
      ]
    },
    {
      id: "०३",
      titleEn: "Shrisukta",
      titleMr: "श्रीसूक्त",
      subtitle: "OM HIRANYAVARNAM HARINIM",
      verses: [
        "ॐ हिरण्यवर्णां हरिणीं सुवर्णरजतस्रजाम्।",
        "चन्द्रां हिरण्मयीं लक्ष्मीं जातवेदो म आवह॥",
        "divider",
        "तां म आवह जातवेदो लक्ष्मीमनपगामिनीम्।",
        "यस्यां हिरण्यं विन्देयं गामश्वं पुरुषानहम्॥",
        "divider",
        "अश्वपूर्वां रथमध्यां हस्तिनादप्रबोधिनीम्।",
        "श्रियं देवीमुपह्वये श्रीर्मा देवी जुषताम्॥"
      ]
    },
    {
      id: "०४",
      titleEn: "Ganesha Aarti",
      titleMr: "गणेश आरती",
      subtitle: "SUKHAKARTA DUKHAKARTA VARTA VIGHNACHI",
      verses: [
        "सुखकर्ता दुखहर्ता वार्ता विघ्नाची।",
        "नुरवी पूर्वी प्रेम कृपा जयाची॥",
        "सर्वांगी सुंदर उटी शेंदुराची।",
        "कंठी झळके माळ मुक्ताफळांची॥",
        "divider",
        "जय देव जय देव जय मंगलमूर्ती।",
        "दर्शनमात्रे मनकामना पुरती॥"
      ]
    }
  ];

  // Web Audio API Synthesizer
  const playDroneAndBells = () => {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;

      const ctx = new AudioContext();
      audioCtxRef.current = ctx;

      const now = ctx.currentTime;

      // 1. Resonant cosmic OM drone hum
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();

      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(136.1, now); 
      
      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(220, now);

      gainNode.gain.setValueAtTime(0, now);
      gainNode.gain.linearRampToValueAtTime(0.18, now + 1.5); 

      osc.connect(filter);
      filter.connect(gainNode);
      gainNode.connect(ctx.destination);

      osc.start(now);

      droneOscRef.current = osc;
      droneGainRef.current = gainNode;

      playBellChime(ctx);

      bellIntervalRef.current = setInterval(() => {
        if (ctx.state === "running") {
          playBellChime(ctx);
        }
      }, 4000);

    } catch (e) {
      console.error("Audio synthesis failed:", e);
    }
  };

  const playBellChime = (ctx) => {
    const now = ctx.currentTime;
    const harmonics = [440, 554.37, 659.25, 880];
    const gains = [0.12, 0.06, 0.04, 0.02];

    harmonics.forEach((freq, idx) => {
      const bellOsc = ctx.createOscillator();
      const bellGain = ctx.createGain();

      bellOsc.type = "sine";
      bellOsc.frequency.setValueAtTime(freq, now);

      bellGain.gain.setValueAtTime(gains[idx], now);
      bellGain.gain.exponentialRampToValueAtTime(0.0001, now + 2.5);

      bellOsc.connect(bellGain);
      bellGain.connect(ctx.destination);

      bellOsc.start(now);
      bellOsc.stop(now + 2.5);
    });
  };

  const stopAudio = () => {
    setIsPlaying(false);
    setProgress(0);
    
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    if (bellIntervalRef.current) {
      clearInterval(bellIntervalRef.current);
      bellIntervalRef.current = null;
    }

    if (droneGainRef.current && audioCtxRef.current) {
      const ctx = audioCtxRef.current;
      const now = ctx.currentTime;
      try {
        droneGainRef.current.gain.cancelScheduledValues(now);
        droneGainRef.current.gain.setValueAtTime(droneGainRef.current.gain.gain.value, now);
        droneGainRef.current.gain.linearRampToValueAtTime(0, now + 0.4);
        
        setTimeout(() => {
          if (droneOscRef.current) {
            droneOscRef.current.stop();
            droneOscRef.current.disconnect();
          }
          if (audioCtxRef.current) {
            audioCtxRef.current.close();
          }
          droneOscRef.current = null;
          audioCtxRef.current = null;
        }, 500);
      } catch (e) {
        // Safe catch
      }
    }
  };

  const handleAudioToggle = () => {
    if (isPlaying) {
      stopAudio();
    } else {
      setIsPlaying(true);
      playDroneAndBells();

      let currentProgress = 0;
      timerRef.current = setInterval(() => {
        currentProgress += 1.67; 
        if (currentProgress >= 100) {
          currentProgress = 0;
        }
        setProgress(currentProgress);
      }, 1000);
    }
  };

  const currentMantra = mantrasData[selectedIdx];

  const UI = {
    marathi: {
      selectTitle: "निवडा (Select)",
      dailyOfferings: "नैवेद्य आणि पूजा",
      dailyOfferingsSub: "Daily Offerings",
      listenBtn: "Listen Audio",
      stopBtn: "Pause Audio",
      mantrasTitle: "मंत्र (Mantras)"
    },
    english: {
      selectTitle: "निवडा (Select)",
      dailyOfferings: "नैवेद्य आणि पूजा",
      dailyOfferingsSub: "Daily Offerings",
      listenBtn: "Listen Audio",
      stopBtn: "Pause Audio",
      mantrasTitle: "मंत्र (Mantras)"
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

      {/* MAIN CONTAINER */}
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
              {mantrasData.map((mantra, idx) => {
                const isActive = selectedIdx === idx;
                return (
                  <button
                    key={mantra.id}
                    onClick={() => setSelectedIdx(idx)}
                    className={`flex items-center gap-4 px-5 py-4 text-left border-b border-[#d8c39e]/30 transition-all outline-none group ${
                      isActive 
                        ? "bg-[#FFECA1]/30 border-l-4 border-l-[#8f4e00]" 
                        : "hover:bg-[#FFECA1]/10 border-l-4 border-l-transparent"
                    }`}
                  >
                    {/* Gold Devanagari Number */}
                    <span className="font-display-hero text-lg font-bold text-[#8f4e00]/70 group-hover:text-[#8f4e00] transition-colors w-6">
                      {mantra.id}
                    </span>
                    
                    {/* Titles */}
                    <div className="flex flex-col">
                      <span className="font-headline-md text-sm font-bold text-[#111827]">
                        {mantra.titleEn}
                      </span>
                      <span className="text-xs text-on-surface-variant/70 font-semibold mt-0.5">
                        ({mantra.titleMr})
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
        <div className="lg:col-span-8 bg-[#FAF6E5] border border-[#d8c39e] rounded-sm p-6 md:p-14 relative flex flex-col items-center justify-start shadow-sm min-h-[500px]">
          
          {/* Double Gold Decorative Border Offset */}
          <div className="absolute inset-3 border border-[#8f4e00]/15 pointer-events-none rounded-sm" />
          
          {/* Decorative Corner Bracket Lines */}
          <div className="absolute top-5 left-5 w-6 h-6 border-t border-l border-[#8f4e00]/40 pointer-events-none" />
          <div className="absolute top-5 right-5 w-6 h-6 border-t border-r border-[#8f4e00]/40 pointer-events-none" />
          <div className="absolute bottom-5 left-5 w-6 h-6 border-b border-l border-[#8f4e00]/40 pointer-events-none" />
          <div className="absolute bottom-5 right-5 w-6 h-6 border-b border-r border-[#8f4e00]/40 pointer-events-none" />

          {/* Lotus Motif */}
          <div className="mb-4 pt-2">
            <svg className="w-8 h-8 text-[#8f4e00]/70" viewBox="0 0 64 64" fill="currentColor">
              <path d="M32 8c-2 8-8 16-16 20 6 2 12 0 16-6 4 6 10 8 16 6-8-4-14-12-16-20z" />
              <path d="M32 16c-1.5 6-6 12-12 15 4.5 1.5 9 0 12-4.5 3 4.5 7.5 6 12 4.5-6-3-10.5-9-12-15z" className="opacity-60" />
              <path d="M32 48c-1.5-4-4-8-8-10 3 1.5 6 1 8-2 2 3 5 3.5 8 2-4 2-6.5 6-8 10z" />
            </svg>
          </div>

          {/* Heading */}
          <div className="text-center mb-8">
            <h2 className="font-display-hero text-3xl md:text-4xl font-extrabold text-[#6d3a00] mb-2 tracking-wide leading-tight">
              {currentMantra.titleMr}
            </h2>
            <p className="font-label-caps text-[10px] text-[#8f4e00] font-black uppercase tracking-[0.25em]">
              {currentMantra.subtitle}
            </p>
          </div>

          {/* Verses lyrics */}
          <div className="w-full max-w-lg text-center mb-10 overflow-y-auto max-h-[380px] px-2 py-1 scrollbar-thin">
            <div className="space-y-6">
              {currentMantra.verses.map((line, lineIdx) => {
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

          {/* AUDIO CONTROLLER SYSTEM */}
          <div className="w-full max-w-xs flex flex-col items-center gap-3 mt-auto">
            <button 
              onClick={handleAudioToggle}
              className="flex items-center justify-center gap-2 px-8 py-2.5 rounded-sm bg-[#FFA093] hover:bg-[#ff8c7e] text-[#271b05] font-bold tracking-wide transition-all shadow-sm active:scale-97 cursor-pointer text-xs"
            >
              {/* Play/Pause SVG Icon */}
              {isPlaying ? (
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
                </svg>
              ) : (
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/>
                </svg>
              )}
              <span>
                {isPlaying ? currentUI.stopBtn : currentUI.listenBtn}
              </span>
            </button>

            {/* Progress line */}
            {isPlaying && (
              <div className="w-full bg-[#8f4e00]/10 rounded-full h-[2px] overflow-hidden">
                <div 
                  className="bg-[#FFA093] h-full rounded-full transition-all duration-1000 ease-linear"
                  style={{ width: `${progress}%` }}
                />
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};

export default Mantras;
