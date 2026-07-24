import React, { useState, useEffect } from "react";
import offeringsImg from "../assets/daily_offerings.jpg";

const Mantras = () => {
  const [lang, setLang] = useState(localStorage.getItem("lang") || "marathi");
  const [selectedIdx, setSelectedIdx] = useState(0);

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
    };
  }, []);

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
        "हिरण्यवर्णां हरिणीं सुवर्णरजतस्रजाम्।",
        "चन्द्रां हिरण्मयीं लक्ष्मीं जातवेदो म आवह॥",
        "divider",
        "तां म आवह जातवेदो लक्ष्मीमनपगामिनीम्।",
        "यस्यां हिरण्यं विन्देयं गामश्वं पुरुषानहम्॥",
        "divider",
        "अश्वपूर्वां रथमध्यां हस्तिनादप्रमोदिनीम्।",
        "श्रियं देवीमुपह्वये श्रीर्मा देवी जुषताम्॥",
        "divider",
        "कांसोऽस्मि तां हिरण्यप्राकारामार्द्रां ज्वलन्तीं तृप्तां तर्पयन्तीम्।",
        "पद्मे स्थितां पद्मवर्णां तामिहोपह्वये श्रियम्॥",
        "divider",
        "चन्द्रां प्रभासां यशसा ज्वलन्तीं श्रियं लोके देवजुष्टामुदाराम्।",
        "तां पद्मिनीमीं शरणमहं प्रपद्येऽलक्ष्मीर्मे नश्यतां त्वां वृणे॥",
        "divider",
        "आदित्यवर्णे तपसोऽधिजातो वनस्पतिस्तव वृक्षोऽथ बिल्वः।",
        "तस्य फलानि तपसा नुदन्तु मायान्तरायाश्च बाह्या अलक्ष्मीः॥",
        "divider",
        "उपैतु मां देवसखः कीर्तिश्च मणिना सह।",
        "प्रादुर्भूतोऽस्मि राष्ट्रेऽस्मिन् कीर्तिमृद्धिं ददातु मे॥",
        "divider",
        "क्षुत्पिपासामलां ज्येष्ठामलक्ष्मीं नाशयाम्यहम्।",
        "अभूतिमसमृद्धिं च सर्वां निर्णुद मे गृहात्॥",
        "divider",
        "गन्धद्वारां दुराधर्षां नित्यपुष्टां करीषिणीम्।",
        "ईश्वरीं सर्वभूतानां तामिहोपह्वये श्रियम्॥",
        "divider",
        "मनसः काममाकूतिं वाचः सत्यमशीमहि।",
        "पशूनां रूपमन्नस्य मयि श्रीः श्रयतां यशः॥",
        "divider",
        "कर्दमेन प्रजाभूता मयि सम्भव कर्दम।",
        "श्रियं वासय मे कुले मातरं पद्ममालिनीम्॥",
        "divider",
        "आपः स्रजन्तु स्निग्धानि चिक्लीत वस मे गृहे।",
        "नि च देवीं मातरं श्रियं वासय मे कुले॥",
        "divider",
        "आर्द्रां पुष्करिणीं पुष्टिं सुवर्णां हेममालिनीम्।",
        "सूर्यां हिरण्मयीं लक्ष्मीं जातवेदो म आवह॥",
        "divider",
        "आर्द्रां यः करिणीं यष्टिं पिङ्गलां पद्ममालिनीम्।",
        "चन्द्रां हिरण्मयीं लक्ष्मीं जातवेदो म आवह॥",
        "divider",
        "तां म आवह जातवेदो लक्ष्मीमनपगामिनीम्।",
        "यस्यां हिरण्यं प्रभूतं गावो दास्योऽश्वान् विन्देयं पुरुषानहम्॥",
        "divider",
        "Phalaśruti — fruit of recitation",
        "divider",
        "यः शुचिः प्रयतो भूत्वा जुहुयादाज्यमन्वहम्।",
        "सूक्तं पञ्चदशर्चं च श्रीकामः सततं जपेत्॥",
        "divider",
        "पद्मानने पद्म ऊरू पद्माक्षी पद्मसम्भवे।",
        "तन्मे भजसि पद्माक्षी येन सौख्यं लभाम्यहम्॥",
        "divider",
        "अश्वदायी गोदायी धनदायी महाधने।",
        "धनं मे जुषतां देवि सर्वकामांश्च देहि मे॥",
        "divider",
        "पद्मानने पद्मविपद्मपत्रे पद्मप्रिये पद्मदलायताक्षि।",
        "विश्वप्रिये विश्वमनोनुकूले त्वत्पादपद्मं मयि संनिधत्स्व॥",
        "divider",
        "पुत्रपौत्रं धनं धान्यं हस्त्यश्वादिगवेरथम्।",
        "प्रजानां भवसि माता आयुष्मन्तं करोतु मे॥",
        "divider",
        "धनमग्निर्धनं वायुर्धनं सूर्यो धनं वसुः।",
        "धनमिन्द्रो बृहस्पतिर्वरुणं धनमस्तु ते॥",
        "divider",
        "वैनतेय सोमं पिब सोमं पिबतु वृत्रहा।",
        "सोमं धनस्य सोमिनो मह्यं ददातु सोमिनः॥",
        "divider",
        "न क्रोधो न च मात्सर्यं न लोभो नाशुभा मतिः।",
        "भवन्ति कृतपुण्यानां भक्तानां श्रीसूक्तं जपेत्॥",
        "divider",
        "सरसिजनिलये सरोजहस्ते धवलतरांशुकगन्धमाल्यशोभे।",
        "भगवति हरिवल्लभे मनोज्ञे त्रिभुवनभूतिकरि प्रसीद मह्यम्॥",
        "divider",
        "विष्णुपत्नीं क्षमादेवीं माधवीं माधवप्रियाम्।",
        "लक्ष्मीं प्रियसखीं देवीं नमाम्यच्युतवल्लभाम्॥",
        "divider",
        "महालक्ष्मी च विद्महे विष्णुपत्नी च धीमहि।",
        "तन्नो लक्ष्मीः प्रचोदयात्॥",
        "divider",
        "श्रीवर्चस्वमायुष्यमारोग्यमाविधाच्छोभमानं महीयते।",
        "धान्यं धनं पशुं बहुपुत्रलाभं शतसंवत्सरं दीर्घमायुः॥",
        "ॐ शान्तिः शान्तिः शान्तिः॥"
      ]
    },
    {
      id: "०४",
      titleEn: "Ganesha Aarti",
      titleMr: "गणेश आरती",
      subtitle: "SUKHAKARTA DUKHAKARTA VARTA VIGHNACHI",
      verses: [
        "सुख करता दुखकर्ता, वार्ता विघ्नाची",
        "नूर्वी पूर्वी प्रेम कृपा जयाची",
        "सर्वांगी सुन्दर उटी शेंदु राची",
        "कंठी झलके माल मुकताफळांची",
        "divider",
        "जय देव जय देव, जय मंगल मूर्ति",
        "दर्शनमात्रे मनःकमाना पूर्ति",
        "जय देव जय देव",
        "divider",
        "रत्नखचित फरा तुझ गौरीकुमरा",
        "चंदनाची उटी कुमकुम केशरा",
        "हीरे जडित मुकुट शोभतो बरा",
        "रुन्झुनती नूपुरे चरनी घागरिया",
        "divider",
        "जय देव जय देव, जय मंगल मूर्ति",
        "दर्शनमात्रे मनःकमाना पूर्ति",
        "जय देव जय देव",
        "divider",
        "लम्बोदर पीताम्बर फनिवर वंदना",
        "सरल सोंड वक्रतुंडा त्रिनयना",
        "दास रामाचा वाट पाहे सदना",
        "संकटी पावावे निर्वाणी रक्षावे सुरवर वंदना",
        "divider",
        "जय देव जय देव, जय मंगल मूर्ति",
        "दर्शनमात्रे मनःकमाना पूर्ति",
        "जय देव जय देव"
      ]
    }
  ];

  const currentMantra = mantrasData[selectedIdx];

  const UI = {
    marathi: {
      selectTitle: "निवडा (Select)",
      dailyOfferings: "नैवेद्य आणि पूजा",
      dailyOfferingsSub: "Daily Offerings",
      mantrasTitle: "मंत्र (Mantras)"
    },
    english: {
      selectTitle: "निवडा (Select)",
      dailyOfferings: "नैवेद्य आणि पूजा",
      dailyOfferingsSub: "Daily Offerings",
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
          <div className="w-full max-w-lg text-center mb-4 overflow-y-auto max-h-[440px] px-2 py-1 scrollbar-thin">
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

        </div>

      </div>
    </div>
  );
};

export default Mantras;
