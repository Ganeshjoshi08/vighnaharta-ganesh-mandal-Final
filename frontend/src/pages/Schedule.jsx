import React, { useEffect, useState } from "react";
import mandalLogo from "../assets/mandallogo.png";
import tilakImg from "../assets/Tilak.jpg";
import savarkarImg from "../assets/savarkar.png";
import qrImg from "../assets/qr.png";

const Schedule = () => {
  const [lang, setLang] = useState(localStorage.getItem("lang") || "marathi");

  useEffect(() => {
    window.scrollTo(0, 0);
    const handleLangChange = () => {
      setLang(localStorage.getItem("lang") || "marathi");
    };
    window.addEventListener("langChange", handleLangChange);
    return () => {
      window.removeEventListener("langChange", handleLangChange);
    };
  }, []);

  const isMarathi = lang === "marathi";

  const scheduleData = [
    {
      dateMr: "०६/०९/२०२६",
      dateEn: "06/09/2026",
      dayMr: "रविवार",
      dayEn: "Sunday",
      eventsMr: ["* वासापुजन"],
      eventsEn: ["* Vasa Pujan"],
      timeMr: ["सकाळी ११.०० वा."],
      timeEn: ["11:00 AM"]
    },
    {
      dateMr: "१४/०९/२०२६",
      dateEn: "14/09/2026",
      dayMr: "सोमवार",
      dayEn: "Monday",
      eventsMr: ["* राजोपचार पूजा", "* आगमन सोहळा"],
      eventsEn: ["* Rajopchar Puja", "* Grand Welcome Procession"],
      timeMr: ["दुपारी ३ ते ५ वा.", "सायं. ६.०० वा."],
      timeEn: ["03:00 PM to 05:00 PM", "06:00 PM"]
    },
    {
      dateMr: "१५/०९/२०२६",
      dateEn: "15/09/2026",
      dayMr: "मंगळवार",
      dayEn: "Tuesday",
      eventsMr: ["* श्री सुक्त हवन व", "* अथर्वशीर्ष पठण"],
      eventsEn: ["* Sri Suktam Havan &", "* Atharvashirsha Recitation"],
      timeMr: ["सायं. ५.३० वा."],
      timeEn: ["05:30 PM"]
    },
    {
      dateMr: "१६/०९/२०२६ व १७/०९/२०२६",
      dateEn: "16/09/2026 & 17/09/2026",
      dayMr: "बुधवार व गुरूवार",
      dayEn: "Wednesday & Thursday",
      eventsMr: ["* विविध स्पर्धा (चित्रकला, वक्तृत्व इ.)"],
      eventsEn: ["* Various Competitions (Drawing, Elocution, etc.)"],
      timeMr: ["सायं. ४.०० वा."],
      timeEn: ["04:00 PM"]
    },
    {
      dateMr: "१८/०९/२०२६",
      dateEn: "18/09/2026",
      dayMr: "शुक्रवार",
      dayEn: "Friday",
      eventsMr: [
        "गौरी गणपती सजावट स्पर्धा (ऑनलाईन)",
        "फोटो / व्हिडीओ पाठवण्यासाठी संपर्क: ८२३७९१९१७९"
      ],
      eventsEn: [
        "Gauri Ganpati Decoration Competition (Online)",
        "Contact to submit Photo/Video: 8237919179"
      ],
      timeMr: ["दिवसभर (Online)"],
      timeEn: ["Full Day (Online)"],
      highlight: true
    },
    {
      dateMr: "२०/०९/२०२६",
      dateEn: "20/09/2026",
      dayMr: "रविवार",
      dayEn: "Sunday",
      eventsMr: [
        "* मॅरेथॉन (Run for unity) (मार्ग: सारडा कॅपिटल ते विघ्नहर्ता चौक)",
        "* बुद्धीमत्ता चाचणी परीक्षा",
        "* खाद्य पदार्थांचे स्टॉल (Fun Fair)",
        "* व्याख्यान (विषय: हिंदुत्व)"
      ],
      eventsEn: [
        "* Marathon (Run for Unity) (Route: Sarda Capital to Vighnaharta Chowk)",
        "* Intelligence & Aptitude Exam",
        "* Food Stalls (Fun Fair)",
        "* Public Lecture (Topic: Hindutva)"
      ],
      timeMr: [
        "सकाळी ५.०० वा.",
        "सकाळी ११.०० वा.",
        "सायं. ४.०० वा.",
        "सायं. ७.०० वा."
      ],
      timeEn: [
        "05:00 AM",
        "11:00 AM",
        "04:00 PM",
        "07:00 PM"
      ]
    },
    {
      dateMr: "२१/०९/२०२६",
      dateEn: "21/09/2026",
      dayMr: "सोमवार",
      dayEn: "Monday",
      eventsMr: ["* शालेय साहित्य वाटप"],
      eventsEn: ["* School Stationery Distribution for Students"],
      timeMr: ["दुपारी ३.०० वा."],
      timeEn: ["03:00 PM"]
    },
    {
      dateMr: "२२/०९/२०२६",
      dateEn: "22/09/2026",
      dayMr: "मंगळवार",
      dayEn: "Tuesday",
      eventsMr: ["* साई भजन"],
      eventsEn: ["* Devotional Sai Bhajan Sandhya"],
      timeMr: ["रात्री ८.०० वा."],
      timeEn: ["08:00 PM"]
    },
    {
      dateMr: "२३/०९/२०२६",
      dateEn: "23/09/2026",
      dayMr: "बुधवार",
      dayEn: "Wednesday",
      eventsMr: [
        "* श्री सत्यनारायण पुजा",
        "* सहस्त्र आवर्तन",
        "* महाप्रसाद"
      ],
      eventsEn: [
        "* Shri Satyanarayan Puja",
        "* Sahasra Avartan Recitation",
        "* Grand Mahaprasad"
      ],
      timeMr: [
        "दुपारी १२.०० वा.",
        "दुपारी २.०० वा.",
        "सायं. ६ ते १० पर्यंत"
      ],
      timeEn: [
        "12:00 PM",
        "02:00 PM",
        "06:00 PM to 10:00 PM"
      ],
      highlight: true
    },
    {
      dateMr: "२४/०९/२०२६",
      dateEn: "24/09/2026",
      dayMr: "गुरूवार",
      dayEn: "Thursday",
      eventsMr: ["* सर्व स्पर्धांचे भव्य बक्षीस वितरण सोहळा"],
      eventsEn: ["* Grand Prize Distribution Ceremony for All Competitions"],
      timeMr: ["सायं. ७.०० वा."],
      timeEn: ["07:00 PM"]
    },
    {
      dateMr: "२५/०९/२०२६",
      dateEn: "25/09/2026",
      dayMr: "शुक्रवार",
      dayEn: "Friday",
      eventsMr: ["* भव्य विसर्जन सोहळा"],
      eventsEn: ["* Grand Ganpati Visarjan Ceremony"],
      timeMr: ["दुपारी ३.०० वा."],
      timeEn: ["03:00 PM"],
      highlight: true
    }
  ];

  const contacts = [
    { nameMr: "शुभम जोशी", nameEn: "Shubham Joshi", phone: "८३९०७७४२२४", tel: "8390774224" },
    { nameMr: "मयुरेश कव्हाळे", nameEn: "Mayuresh Kavhale", phone: "७७७४०२५५२४", tel: "7774025524" },
    { nameMr: "अक्षय कुलकर्णी", nameEn: "Akshay Kulkarni", phone: "८७६७१३४६२३", tel: "8767134623" },
    { nameMr: "गौरव कुलकर्णी", nameEn: "Gaurav Kulkarni", phone: "८७६७०१८२४२", tel: "8767018242" },
    { nameMr: "गिरीश सेलमोरकर", nameEn: "Girish Selmokar", phone: "९०२१९३६४१२", tel: "9021936412" }
  ];

  return (
    <div className="min-h-screen bg-neutral-100 pt-28 pb-16 font-serif">
      <div className="max-w-5xl mx-auto px-3 sm:px-6 space-y-8">
        
        {/* PRINTABLE / VIEWABLE POSTER CARD */}
        <div className="bg-white rounded-3xl shadow-2xl border-4 border-[#D4AF37] overflow-hidden">
          
          {/* 1. TOP HEADER BANNER */}
          <div className="bg-gradient-to-r from-[#200b02] via-[#4a1c02] to-[#200b02] text-white p-4 sm:p-6 border-b-4 border-[#D4AF37] flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
            {/* Left: Mandal Logo */}
            <div className="flex items-center gap-3">
              <div className="w-20 h-20 bg-white/10 p-2 rounded-2xl border border-[#D4AF37]/50 shadow-md flex items-center justify-center">
                <img src={mandalLogo} alt="Logo" className="w-full h-full object-contain" />
              </div>
            </div>

            {/* Center: Title & Address */}
            <div className="flex-1 text-center space-y-1">
              <h1 className="text-2xl sm:text-4xl font-black text-[#FFE9A3] tracking-wide filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                {isMarathi ? "विघ्नहर्ता मित्र मंडळ" : "Vighnaharta Mitra Mandal"}
              </h1>
              <div className="inline-block bg-[#D4AF37]/20 text-[#FFE9A3] border border-[#D4AF37]/50 px-4 py-1 rounded-full text-xs sm:text-sm font-bold tracking-wider uppercase">
                {isMarathi ? "आयोजित :- स्मार्ट गणेशोत्सव - २०२६" : "Organized :- Smart Ganeshotsav - 2026"}
              </div>
              <p className="text-xs sm:text-sm text-white/90 font-sans mt-1 font-semibold">
                {isMarathi ? "विघ्नहर्ता चौक, जुन्या तहसील मागे, बीड." : "Vighnaharta Chowk, Behind Old Tehsil, Beed."}
              </p>
            </div>

            {/* Right: National Icons */}
            <div className="flex items-center gap-3">
              <div className="flex flex-col items-center">
                <img
                  src={tilakImg}
                  alt="Lokmanya Tilak"
                  className="w-11 h-14 object-cover rounded border border-[#D4AF37] shadow-sm"
                />
                <span className="text-[9px] text-[#FFE9A3] mt-1 font-sans font-bold">
                  {isMarathi ? "लोकमान्य टिळक" : "L. Tilak"}
                </span>
              </div>
              <div className="flex flex-col items-center">
                <img
                  src={savarkarImg}
                  alt="Swatantryaveer Savarkar"
                  className="w-11 h-14 object-cover rounded border border-[#D4AF37] shadow-sm"
                />
                <span className="text-[9px] text-[#FFE9A3] mt-1 font-sans font-bold">
                  {isMarathi ? "स्वा. सावरकर" : "Sv. Savarkar"}
                </span>
              </div>
            </div>
          </div>

          {/* MAIN TIMETABLE TITLE */}
          <div className="bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 text-white py-3 px-4 text-center font-bold text-sm sm:text-lg tracking-wider border-b-2 border-amber-700 uppercase shadow-inner">
            📅 {isMarathi ? "धार्मिक व सांस्कृतिक कार्यक्रमांचे सविस्तर वेळापत्रक" : "Detailed Schedule of Religious & Cultural Programs"}
          </div>

          {/* 2. PROGRAM TIMETABLE TABLE */}
          <div className="p-3 sm:p-6 overflow-x-auto">
            <table className="w-full border-collapse border-2 border-neutral-800 text-neutral-900 text-xs sm:text-sm font-sans">
              <thead>
                <tr className="bg-[#4a1c02] text-[#FFE9A3] font-bold text-center border-b-2 border-neutral-800 text-xs sm:text-base">
                  <th className="border-r border-amber-200/30 p-2 sm:p-3 w-28 sm:w-36">
                    {isMarathi ? "दिनांक" : "Date"}
                  </th>
                  <th className="border-r border-amber-200/30 p-2 sm:p-3 w-24 sm:w-32">
                    {isMarathi ? "वार" : "Day"}
                  </th>
                  <th className="border-r border-amber-200/30 p-2 sm:p-3 text-left">
                    {isMarathi ? "कार्यक्रम" : "Event / Program"}
                  </th>
                  <th className="p-2 sm:p-3 w-28 sm:w-40 text-center">
                    {isMarathi ? "वेळ" : "Time"}
                  </th>
                </tr>
              </thead>
              <tbody>
                {scheduleData.map((row, idx) => (
                  <tr
                    key={idx}
                    className={`border-b border-neutral-300 transition hover:bg-amber-50/50 ${
                      row.highlight
                        ? "bg-amber-50/80 font-semibold"
                        : idx % 2 === 0
                        ? "bg-white"
                        : "bg-[#FCF9F2]/60"
                    }`}
                  >
                    {/* Date */}
                    <td className="border-r border-neutral-300 p-2.5 sm:p-3 font-bold text-center text-neutral-800 whitespace-nowrap">
                      {isMarathi ? row.dateMr : row.dateEn}
                    </td>

                    {/* Day */}
                    <td className="border-r border-neutral-300 p-2.5 sm:p-3 font-bold text-center text-amber-900 whitespace-nowrap">
                      {isMarathi ? row.dayMr : row.dayEn}
                    </td>

                    {/* Events */}
                    <td className="border-r border-neutral-300 p-2.5 sm:p-3 text-left">
                      <div className="space-y-1">
                        {(isMarathi ? row.eventsMr : row.eventsEn).map((ev, eIdx) => (
                          <div
                            key={eIdx}
                            className={`leading-relaxed ${
                              ev.includes("८२३७९१९१७९") || ev.includes("8237919179")
                                ? "font-bold text-amber-800 text-sm"
                                : "font-medium text-neutral-900"
                            }`}
                          >
                            {ev}
                          </div>
                        ))}
                      </div>
                    </td>

                    {/* Time */}
                    <td className="p-2.5 sm:p-3 font-bold text-center text-neutral-800 whitespace-nowrap">
                      <div className="space-y-1">
                        {(isMarathi ? row.timeMr : row.timeEn).map((t, tIdx) => (
                          <div key={tIdx} className="text-amber-900">
                            {t}
                          </div>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 3. AARTI TIMING BANNER */}
          <div className="mx-3 sm:mx-6 mb-6 p-4 rounded-2xl bg-gradient-to-r from-amber-100 via-yellow-50 to-amber-100 border-2 border-amber-400 text-center space-y-1 shadow-sm">
            <h3 className="text-sm sm:text-base font-black text-[#4a1c02] tracking-wide">
              🔔 {isMarathi ? "आरतीची वेळ : रोज सकाळी ०९:०० वा. व रात्री ०८:३० वा." : "Daily Aarti Timings: 09:00 AM & 08:30 PM"}
            </h3>
            <p className="text-[11px] sm:text-xs text-neutral-600 font-sans italic">
              {isMarathi
                ? "(नियोजित कार्यक्रमात बदल करण्याचे अधिकार मंडळाचे अध्यक्ष, सदस्य व कार्यकर्ते यांच्याकडे राखीव राहतील आणि मंडळाचे घेतलेले सर्व निर्णय अंतिम राहतील.)"
                : "(The Mandal reserves the right to make changes in the schedule if required. All decisions taken by the Mandal will be final.)"}
            </p>
          </div>

          {/* 4. GRAND IMMERSION PROCESSION BANNER (भव्य दिव्य नेत्रदिपक विसर्जन मिरवणूक सोहळा) */}
          <div className="mx-3 sm:mx-6 mb-6 p-5 rounded-2xl bg-gradient-to-r from-[#380b02] via-[#5c1903] to-[#380b02] text-white border-2 border-[#D4AF37] shadow-lg space-y-3">
            <div className="text-center">
              <h2 className="text-lg sm:text-2xl font-black text-[#FFE9A3] tracking-wide filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                🚩 {isMarathi ? "भव्य दिव्य नेत्रदीपक विसर्जन मिरवणूक सोहळा" : "Grand Eye-Catching Ganpati Visarjan Procession"} 🚩
              </h2>
            </div>

            <div className="bg-white/10 p-3.5 rounded-xl border border-white/20 text-xs sm:text-sm font-sans space-y-2 text-center">
              <p className="font-bold text-amber-200">
                🚶 {isMarathi ? "मिरवणूक प्रस्थान: अमृत मंगल कार्यालय, सुभाष रोड, बीड • वेळ: दुपारी ३.०० वा." : "Procession Departure: Amrut Mangal Karyalaya, Subhash Road, Beed • Time: 03:00 PM"}
              </p>
              <p className="text-white/95 leading-relaxed">
                <strong className="text-[#FFE9A3]">{isMarathi ? "विसर्जन मार्ग:-" : "Route:-"}</strong>{" "}
                {isMarathi
                  ? "अमृत मंगल कार्यालय → माळीवेस → सराफा लाईन कॉर्नर → धोंडीपुरा → बळभीम चौक → जुनी तहसील → विघ्नहर्ता चौक, बीड."
                  : "Amrut Mangal Karyalaya → Maliwesh → Sarafa Line Corner → Dhondipura → Balbheem Chowk → Old Tehsil → Vighnaharta Chowk, Beed."}
              </p>
              <p className="font-bold text-amber-200">
                ✨ {isMarathi ? "विसर्जन सोहळा: विघ्नहर्ता चौक, बीड • वेळ: रात्री ८.०० वा." : "Visarjan Finale: Vighnaharta Chowk, Beed • Time: 08:00 PM"}
              </p>
            </div>
          </div>

          {/* 5. CONTACT SECTION FOOTER */}
          <div className="bg-[#FAF8F2] p-4 sm:p-6 border-t-2 border-[#D4AF37]/50 text-center space-y-3 font-sans">
            <h4 className="text-xs sm:text-sm font-black text-[#4a1c02] uppercase tracking-wider">
              :: {isMarathi ? "अधिक माहितीसाठी संपर्क" : "For More Information Contact"} ::
            </h4>

            <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-6 text-xs sm:text-sm font-bold text-neutral-800">
              {contacts.map((c, idx) => (
                <div key={idx} className="bg-white px-3 py-1.5 rounded-xl border border-amber-300 shadow-sm flex items-center gap-1.5">
                  <span className="text-amber-700 font-bold">{isMarathi ? c.nameMr : c.nameEn}:</span>
                  <a href={`tel:${c.tel}`} className="text-amber-900 hover:underline">
                    {c.phone}
                  </a>
                </div>
              ))}
            </div>

            <p className="text-xs font-bold text-[#4a1c02] pt-2 font-serif tracking-wider">
              🚩 {isMarathi ? "गणपती बाप्पा मोरया, पुढच्या वर्षी लवकर या!" : "Ganpati Bappa Morya, Pudhchya Varshi Lavkar Ya!"}
            </p>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Schedule;
