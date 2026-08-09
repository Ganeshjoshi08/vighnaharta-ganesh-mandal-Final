import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API, { BACKEND_URL } from "../api/api";
import { useSettings } from "../context/SettingsContext";
import qrImg from "../assets/qr.png";
import homeImg from "../assets/HOME_IMG.jpg";
import aboutGanesha from "../assets/about_ganesha.jpg";
import timeline2010 from "../assets/timeline_2010.jpg";

// New activity assets
import beedPoliceAward from "../assets/beed_police_award.jpg";
import ganarayaAward2014 from "../assets/ganaraya_award_2014.jpg";
import mandalAartiUtsav from "../assets/mandal_aarti_utsav.jpg";
import lokmanyaTilakTribute from "../assets/lokmanya_tilak_tribute.jpg";

import sriSuktamHavan from "../assets/sri_suktam_havan.png";
import holiDahanColor from "../assets/holi_dahan_color.png";
import radhaKrishnaBhajan from "../assets/radha_krishna_bhajan.png";
import athavasheershaPathan from "../assets/athavasheersha_pathan.png";
import ganeshYaag from "../assets/ganesh_yaag.png";

import ganeshDivineHero from "../assets/ganesh_transparent.png";
import logoImg from "../assets/logo.jpeg";
import mandalTitleGradient from "../assets/mandal_title_gradient.png";
import mandalLogoCircular from "../assets/mandal_logo_circular.png";

const Home = () => {
  const navigate = useNavigate();
  const { settings, hero } = useSettings();
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [lang, setLang] = useState(localStorage.getItem("lang") || "marathi");
  const [dbInfo, setDbInfo] = useState(null);
  const [dbImages, setDbImages] = useState([]);
  const [dbActivities, setDbActivities] = useState([]);
  const [activeModal, setActiveModal] = useState(null);
  const [timeLeft, setTimeLeft] = useState(null);

  const isCalligraphyFont = (text) => {
    if (!text) return false;
    return !/[\u0900-\u097F]/.test(text);
  };

  useEffect(() => {
    if (!hero?.countdownDate) return;
    const target = new Date(hero.countdownDate).getTime();
    if (isNaN(target)) return;

    const interval = setInterval(() => {
      const distance = target - Date.now();
      if (distance < 0) {
        setTimeLeft(null);
        clearInterval(interval);
      } else {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        setTimeLeft({ days, hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [hero?.countdownDate]);

  useEffect(() => {
    fetchDbInfo();
    fetchGalleryImages();
    fetchActivities();
    const handleLangChange = () => {
      setLang(localStorage.getItem("lang") || "marathi");
    };
    window.addEventListener("langChange", handleLangChange);

    const handleScroll = () => {
      if (window.scrollY > 500) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("langChange", handleLangChange);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const fetchDbInfo = async () => {
    try {
      const res = await API.get("/about-history");
      if (res.data) {
        setDbInfo(res.data);
      }
    } catch (err) {
      console.log("FETCH DB INFO ERROR:", err);
    }
  };

  const fetchGalleryImages = async () => {
    try {
      const res = await API.get("/gallery");
      if (res.data && res.data.length > 0) {
        const resolved = res.data.map(img => ({
          ...img,
          imageUrl: img.imageUrl && !img.imageUrl.startsWith("http") ? `${BACKEND_URL}${img.imageUrl}` : img.imageUrl
        }));
        setDbImages(resolved);
      }
    } catch (err) {
      console.log("FETCH GALLERY IMAGES ERROR:", err);
    }
  };

  const fetchActivities = async () => {
    try {
      const res = await API.get("/activities");
      if (res.data && res.data.length > 0) {
        const resolved = res.data.map(act => ({
          ...act,
          imageUrl: act.imageUrl && !act.imageUrl.startsWith("http") ? `${BACKEND_URL}${act.imageUrl}` : act.imageUrl
        }));
        setDbActivities(resolved);
      }
    } catch (err) {
      console.log("FETCH ACTIVITIES ERROR:", err);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const galleryImages = [
    aboutGanesha,
    beedPoliceAward,
    ganarayaAward2014,
    mandalAartiUtsav,
    lokmanyaTilakTribute
  ];

  // Limit display list to first 6 items
  const displayImages = dbImages.length > 0
    ? dbImages.slice(0, 6).map(img => img.imageUrl)
    : galleryImages;

  const defaultActivities = [
    {
      title: "श्री सूक्तम् हवन सोहळा",
      titleEn: "Sri Suktam Havan",
      tag: "धार्मिक",
      tagEn: "Religious",
      description: "श्री यज्ञेश्वर सेलुकर महाराज यांच्या मंगल उपस्थितीत श्री सूक्तम् हवन सोहळ्याचे आयोजन करण्यात आले. या सोहळ्यात शेकडो भाविकांनी सहभाग घेऊन पूजेचा लाभ घेतला आणि बाप्पांचे आशीर्वाद मिळवले.",
      descriptionEn: "Sri Suktam Havan was organized in the auspicious presence of Shri Yadneshwar Selukar Maharaj. Hundreds of devotees participated, took part in the prayers, and received blessings.",
      imageUrl: sriSuktamHavan
    },
    {
      title: "गणपती अथर्वशीर्ष पठण",
      titleEn: "Ganpati Atharva Shirsh Pathan",
      tag: "संस्कार",
      tagEn: "Values",
      description: "लहान मुलांसाठी आणि महिलांसाठी सामूहिक गणपती अथर्वशीर्ष पठण उपक्रमाचे आयोजन करण्यात आले. यामुळे मुलांमध्ये धार्मिक संस्कार रुजण्यास मदत होते.",
      descriptionEn: "Mass chanting of Ganpati Atharva Shirsha was organized for children and women. This initiative helps instill cultural and spiritual values in the young generation.",
      imageUrl: athavasheershaPathan
    },
    {
      title: "राधा कृष्ण भजन आणि आरती",
      titleEn: "Radha Krishna Bhajan",
      tag: "भक्ती",
      tagEn: "Devotion",
      description: "श्री गणरायाच्या चरणी भक्तीभावाने राधा कृष्ण भजनाचे आयोजन करण्यात आले. सुमधुर भजनांच्या तालावर भाविक मंत्रमुग्ध झाले आणि आरतीने सोहळ्याची सांगता झाली.",
      descriptionEn: "Devotional Radha Krishna Bhajans were organized at the feet of Lord Ganesha. Devotees were mesmerized by the sweet musical bhajans, followed by the concluding traditional Aarti.",
      imageUrl: radhaKrishnaBhajan
    },
    {
      title: "श्री गणेश याग सोहळा",
      titleEn: "Shree Ganesh Yaag",
      tag: "यज्ञ",
      tagEn: "Yajna",
      description: "मंडळातर्फे सार्वजनिक गणेशोत्सव निमित्त भव्य श्री गणेश याग सोहळ्याचे आयोजन करण्यात आले. यामध्ये मंत्रोच्चाराच्या जयघोषात विधीवत होम-हवन करण्यात आले आणि परिसर भक्तीमय झाला.",
      descriptionEn: "A grand Shree Ganesh Yaag ceremony was organized by the Mandal on the occasion of Ganesh Utsav. Ritual prayers and fire offerings were performed amidst chanting of sacred mantras.",
      imageUrl: ganeshYaag
    },
    {
      title: "होळी दहन आणि रंगोत्सव",
      titleEn: "Holi Dahan & Colour Festival",
      tag: "उत्सव",
      tagEn: "Festival",
      description: "होळी दहन आणि धूळवड उत्साहात साजरी करण्यात आली. सामूहिक होळी प्रज्वलित करून वाईट प्रवृत्तींचे दहन करण्यात आले आणि दुसऱ्या दिवशी रंगांची उधळण करत पारंपरिक आनंद साजरा करण्यात आला.",
      descriptionEn: "Holi Dahan and the Festival of Colors were celebrated with great joy. The community gathered to light the bonfire, symbols of burning away negativity, followed by colorful celebrations.",
      imageUrl: holiDahanColor
    }
  ];

  const displayActivities = dbActivities.length > 0 ? dbActivities : defaultActivities;

  const translations = {
    marathi: {
      hero: {
        sub: "श्री विघ्नहर्ताय नमः",
        title: "विघ्नहर्ता मित्र मंडळ",
        est: "स्थापना: १९९० • विघ्नहर्ता चौक, बीड",
        morya: "गणपती बाप्पा मोरया!"
      },
      about: {
        tag: "आमच्याबद्दल",
        title: "मंडळाचा गौरवशाली इतिहास",
        p1: "१९९० सालापासून बीड शहराच्या सांस्कृतिक, धार्मिक आणि सामाजिक वैभवात मोलाची भर घालणारे ‘विघ्नहर्ता मित्र मंडळ’ हे केवळ गणेशोत्सव साजरा करणारे मंडळ नसून समाजसेवा, संस्कार आणि भक्ती यांचे प्रेरणादायी केंद्र आहे. विघ्नहर्ता चौक येथे दरवर्षी श्री गणेशाचे आगमन भक्तिभाव, उत्साह आणि पारंपरिक जल्लोषात होत असून हजारो भाविकांच्या श्रद्धा आणि विश्वासाचे केंद्रस्थान बनले आहे.",
        p2: "स्थापनेपासून गेली ३६ वर्षे मंडळाने धार्मिक परंपरांचे जतन करत विविध सामाजिक उपक्रम, रक्तदान शिबिरे, आरोग्य जनजागृती मोहिमा, पर्यावरण संवर्धन उपक्रम तसेच गरजू आणि होतकरू विद्यार्थ्यांना शैक्षणिक मदत करण्याचे कार्य सातत्याने केले आहे. समाजहित आणि सेवाभाव यांची सांगड घालत मंडळाने बीडकरांच्या मनात एक विशेष आणि मानाचे स्थान निर्माण केले आहे.",
        p3: "२०२६ मध्ये ३७ व्या वर्षात पदार्पण करताना, ‘विघ्नहर्ता मित्र मंडळ’ श्रद्धा, सेवा आणि सामाजिक बांधिलकीचा वारसा अधिक दृढ करण्याचा संकल्प बाळगून आहे. आमचे बाप्पा हे केवळ मंडळाचे आराध्य दैवत नसून संपूर्ण बीडकरांच्या श्रद्धा, एकात्मता आणि विश्वासाचे प्रतीक आहेत.",
        p4: "॥ गणपती बाप्पा मोरया ॥ 🙏🏻🐘✨",
        yearsVal: "३६+",
        yearsLbl: "उत्सवाचे वर्ष",
        socialVal: "१००+",
        socialLbl: "सामाजिक उपक्रम"
      },
      history: {
        title: "प्रवासाचे महत्त्वाचे टप्पे",
        y1990: "१९९०",
        d1990: "मंडळाची स्थापना आणि प्रथम सार्वजनिक गणेशोत्सव सोहळा. एका छोट्या मांडवात सुरू झालेला हा प्रवास आज महाकाय वटवृक्षाप्रमाणे विस्तारला आहे.",
        y2010: "२०१०",
        d2010: "दशकोत्सव सोहळा साजरा. चांदीच्या सिंहासनाची निर्मिती आणि भव्य मिरवणूक. बीड शहरात प्रथमच एवढ्या मोठ्या प्रमाणावर सामाजिक उपक्रमांची सुरुवात.",
        y2024: "२०२४",
        d2024: "आज आम्ही अद्ययावत तंत्रज्ञान आणि पारंपारिक भक्ती यांचा मेळ घालून 'डिजीटल दर्शन' आणि जागतिक स्तरावर उत्सव पोहचवत आहोत."
      },
      activities: {
        sub: "उत्सवाचे आकर्षण",
        title: "सामाजिक आणि सांस्कृतिक उपक्रम",
        c1Title: "भव्य मिरवणूक",
        c1Desc: "ढोल-ताशांच्या गजरात आणि गुलाल उधळत होणारी आमची मिरवणूक बीड शहराचे मुख्य आकर्षण असते.",
        c2Title: "रक्तदान शिबिर",
        c2Desc: "उत्सवाच्या काळात आम्ही दरवर्षी भव्य रक्तदान शिबिर आयोजित करतो, ज्यातून हजारो गरजूंना मदत मिळते.",
        c3Title: "सांस्कृतिक कार्यक्रम",
        c3Desc: "भजन, कीर्तन आणि मुलांसाठी विविध कला स्पर्धांचे आयोजन करून आम्ही संस्कृतीचे जतन करतो."
      },
      gallery: {
        sub: "छायाचित्र",
        title: "भक्तीचा सोहळा: गॅलरी",
        btn: "SEE ALL"
      },
      committee: {
        title: "मंडळ कार्यकारिणी समिती",
        topRow: [
          { role: "अध्यक्ष", name: "शुभम जोशी" },
          { role: "मुख्यसचिव", name: "कौस्तुभ गुळजकर" },
          { role: "कार्याध्यक्ष", name: "अक्षय कुलकर्णी" },
          { role: "उपाध्यक्ष", name: "उमेश कुलकर्णी" },
          { role: "उपाध्यक्ष", name: "मयुरेश कव्हाळे" },
          { role: "कोषाध्यक्ष", name: "गौरव कुलकर्णी" }
        ],
        grid: [
          [
            { name: "मंदार कुलकर्णी", role: "सचिव" },
            { name: "गिरीश सेलमोकर", role: "सचिव" },
            { name: "प्रशांत जोतकर", role: "सहकोषाध्यक्ष" },
            { name: "श्रेयस आवढाळ", role: "विभाग प्रमुख" },
            { name: "अक्षय अ. कुलकर्णी", role: "प्रसिद्धी प्रमुख" }
          ],
          [
            { name: "अमोघ बाभुळगावकर", role: "व्यवस्थापक" },
            { name: "सोहम ऋषी", role: "व्यवस्थापक" },
            { name: "सार्थक गोले", role: "व्यवस्थापक" },
            { name: "गणेश जोशी", role: "सोशल मीडिया प्रमुख" },
            { name: "वरद कुलकर्णी", role: "सोशल मीडिया प्रमुख" }
          ],
          [
            { name: "सागर जोतकर", role: "कार्यवाहक" },
            { name: "कुणाल कुलकर्णी", role: "कार्यवाहक" },
            { name: "यशराज कापसे", role: "कार्यवाहक" },
            { name: "प्रशांत सरवदे", role: "पुरोहित प्रमुख" },
            { name: "भाग्येश जोशी", role: "समन्वयक" }
          ],
          [
            { name: "मयूर लवंडे", role: "सदस्य" },
            { name: "प्रतीक देशमुख", role: "सदस्य" },
            { name: "सुयोग जोशी", role: "सदस्य" },
            { name: "यज्ञेश कुलकर्णी", role: "सदस्य" },
            { name: "सर्वेश बर्दापूरकर", role: "सदस्य" }
          ],
          [
            { name: "", role: "" },
            { name: "अर्णव पांडव", role: "सदस्य" },
            { name: "शंभू पाटील", role: "सदस्य" },
            { name: "समर्थ क्षीरसागर", role: "सदस्य" },
            { name: "", role: "" }
          ]
        ]
      },
      donations: {
        title: "देणगी आणि सहकार्य",
        desc: "तुमचे लहानसे सहकार्य देखील आमच्या सामाजिक कार्याला बळ देते. गणेशोत्सवाच्या माध्यमातून राबवल्या जाणाऱ्या सामाजिक उपक्रमांसाठी आपण सढळ हाताने मदत करू शकता. सर्व देणग्यांवर आयकरात सवलत उपलब्ध आहे.",
        bankDetails: "बँक तपशील:",
        bankName: "बँक: बँक ऑफ बडोदा (Bank of Baroda)",
        branch: "शाखा: सुभाष रोड बीड",
        accNo: "खाते क्र.: ७६४५८१००००१५०४",
        ifsc: "IFSC Code: BARB0VJBEED",
        scanTitle: "स्कॅन करून मदत करा",
        upiLabel: "All UPI Apps Accepted"
      },
      contact: {
        title: "संपर्क साधा",
        desc: "तुमच्या काही सूचना किंवा प्रश्न असल्यास आम्हाला खालील पत्त्यावर अवश्य भेटा किंवा संपर्क करा.",
        addrLabel: "पत्ता:",
        addrVal: "विघ्नहर्ता चौक, जुन्या तहसीलच्या मागे, बीड.",
        phoneLabel: "फोन:",
        phoneVal: "+९१ ८७६७१ ३४६२३ / +९१ ८३९०७ ७४२२४",
        emailLabel: "ईमेल:",
        emailVal: "vighnahartamitramandal025@gmail.com",
        mapMarker: "विघ्नहर्ता चौक"
      }
    },
    english: {
      hero: {
        sub: "Shree Vighnahartaya Namah",
        title: "Vighnaharta Mitra Mandal",
        est: "Established: 1990 • Vighnaharta Chowk, Beed",
        morya: "Ganpati Bappa Morya!"
      },
      about: {
        tag: "About Us",
        title: "Glorious History of the Mandal",
        p1: "Since 1990, 'Vighnaharta Mitra Mandal', adding significantly to the cultural, religious and social glory of Beed city, is not just a Mandal celebrating Ganesh festival, but an inspiring center of social service, values and devotion. Every year, the arrival of Shri Ganesha at Vighnaharta Chowk takes place with devotion, enthusiasm and traditional fervor, making it a center of faith and trust for thousands of devotees.",
        p2: "For the past 36 years since its establishment, preserving religious traditions, the Mandal has continuously conducted various social activities, blood donation camps, health awareness campaigns, environmental conservation initiatives, as well as educational assistance to needy and promising students. Combining social welfare and service, the Mandal has created a special and proud place in the hearts of the people of Beed.",
        p3: "Entering its 37th year in 2026, 'Vighnaharta Mitra Mandal' is resolved to strengthen the legacy of faith, service and social commitment. Our Bappa is not only the deity of the Mandal, but a symbol of faith, unity and trust of the entire people of Beed.",
        p4: "|| Ganpati Bappa Morya || 🙏🏻🐘✨",
        yearsVal: "36+",
        yearsLbl: "Years of Celebration",
        socialVal: "100+",
        socialLbl: "Social Initiatives"
      },
      history: {
        title: "Glorious Timeline",
        y1990: "1990",
        d1990: "Establishment of the Mandal and first public Ganesh festival. This journey started in a small pandal and has expanded like a giant banyan tree today.",
        y2010: "2010",
        d2010: "Celebrated 10th anniversary. Made silver throne and grand procession. Started major social welfare campaigns in Beed for the first time.",
        y2024: "2024",
        d2024: "Today we combine modern technology and traditional devotion to bring 'Digital Darshan' and celebrate the festival globally."
      },
      activities: {
        sub: "Festival Attractions",
        title: "Social & Cultural Activities",
        c1Title: "Grand Procession",
        c1Desc: "Our procession accompanied by the thumping rhythms of Dhol-Tasha and saffron colors is the main attraction of Beed.",
        c2Title: "Blood Donation Camp",
        c2Desc: "We organize a grand blood donation camp every year during the festival, helping thousands of patients in need.",
        c3Title: "Cultural Festivals",
        c3Desc: "We preserve our rich culture by organizing Bhajans, Kirtans, and various art competitions for children."
      },
      gallery: {
        sub: "Photos",
        title: "Devotional Celebrations: Gallery",
        btn: "SEE ALL"
      },
      committee: {
        title: "Mandal Executive Committee",
        topRow: [
          { role: "President", name: "Shubham Joshi" },
          { role: "General Secretary", name: "Kaustubh Gulajkar" },
          { role: "Executive President", name: "Akshay Kulkarni" },
          { role: "Vice President", name: "Umesh Kulkarni" },
          { role: "Vice President", name: "Mayuresh Kavhale" },
          { role: "Treasurer", name: "Gaurav Kulkarni" }
        ],
        grid: [
          [
            { name: "Mandar Kulkarni", role: "Secretary" },
            { name: "Girish Selmokar", role: "Secretary" },
            { name: "Prashant Jotkar", role: "Co-Treasurer" },
            { name: "Shreyas Avhadhal", role: "Department Head" },
            { name: "Akshay A. Kulkarni", role: "Publicity Chief" }
          ],
          [
            { name: "Amogh Babhulgaonkar", role: "Manager" },
            { name: "Soham Rishi", role: "Manager" },
            { name: "Sarthak Gole", role: "Manager" },
            { name: "Ganesh Joshi", role: "Social Media Head" },
            { name: "Varad Kulkarni", role: "Social Media Head" }
          ],
          [
            { name: "Sagar Jotkar", role: "Organizer" },
            { name: "Kunal Kulkarni", role: "Organizer" },
            { name: "Yashraj Kapse", role: "Organizer" },
            { name: "Prashant Sarvade", role: "Chief Priest" },
            { name: "Bhagyesh Joshi", role: "Coordinator" }
          ],
          [
            { name: "Mayur Lawande", role: "Member" },
            { name: "Pratik Deshmukh", role: "Member" },
            { name: "Suyog Joshi", role: "Member" },
            { name: "Yajnesh Kulkarni", role: "Member" },
            { name: "Sarvesh Bardapurkar", role: "Member" }
          ],
          [
            { name: "", role: "" },
            { name: "Arnav Pandav", role: "Member" },
            { name: "Shambhu Patil", role: "Member" },
            { name: "Samarth Kshirsagar", role: "Member" },
            { name: "", role: "" }
          ]
        ]
      },
      donations: {
        title: "Donations & Support",
        desc: "Your small support gives strength to our social work. You can generously support the social initiatives implemented through Ganesh Utsav. Tax exemption is available on all donations.",
        bankDetails: "Bank Details:",
        bankName: "Bank: Bank of Baroda",
        branch: "Branch: SUBHASH ROAD BEED",
        accNo: "Acc No: 76458100001504",
        ifsc: "IFSC Code: BARB0VJBEED",
        scanTitle: "Scan to Support",
        upiLabel: "All UPI Apps Accepted"
      },
      contact: {
        title: "Contact Us",
        desc: "If you have any suggestions or questions, feel free to visit us or reach out using the details below.",
        addrLabel: "Address:",
        addrVal: "Vighnaharta Chowk, Behind Old Tehsil, Beed.",
        phoneLabel: "Phone:",
        phoneVal: "+91 87671 34623 / +91 83907 74224",
        emailLabel: "Email:",
        emailVal: "vighnahartamitramandal025@gmail.com",
        mapMarker: "Vighnaharta Chowk"
      }
    }
  };

  const current = { ...translations[lang] };

  if (settings) {
    if (current.contact) {
      current.contact.addrVal = lang === "marathi" ? settings.addressMr : settings.addressEn;
      current.contact.phoneVal = settings.phoneNumber;
      current.contact.emailVal = settings.email;
    }
  }
  if (hero) {
    if (current.hero) {
      current.hero.title = lang === "marathi" ? hero.titleMr : hero.titleEn;
      current.hero.sub = lang === "marathi" ? hero.subMr : hero.subEn;
      current.hero.est = lang === "marathi" ? hero.subtitleMr : hero.subtitleEn;
    }
  }

  if (dbInfo) {
    if (lang === "marathi") {
      current.about = {
        ...current.about,
        p1: dbInfo.aboutMr1 || current.about.p1,
        p2: dbInfo.aboutMr2 || current.about.p2,
        p3: dbInfo.aboutMr3 || current.about.p3,
        p4: dbInfo.aboutMr4 || current.about.p4
      };
      current.history = {
        ...current.history,
        d1990: dbInfo.timeline1990Mr || current.history.d1990,
        d2010: dbInfo.timeline2010Mr || current.history.d2010,
        d2024: dbInfo.timeline2024Mr || current.history.d2024
      };
    } else {
      current.about = {
        ...current.about,
        p1: dbInfo.aboutEn1 || current.about.p1,
        p2: dbInfo.aboutEn2 || current.about.p2,
        p3: dbInfo.aboutEn3 || current.about.p3,
        p4: dbInfo.aboutEn4 || current.about.p4
      };
      current.history = {
        ...current.history,
        d1990: dbInfo.timeline1990En || current.history.d1990,
        d2010: dbInfo.timeline2010En || current.history.d2010,
        d2024: dbInfo.timeline2024En || current.history.d2024
      };
    }
  }

  return (
    <div className="bg-background text-on-background font-body-md overflow-x-hidden selection:bg-primary-container selection:text-on-primary-container">
      
      {/* 1. HERO BANNER SECTION */}
      <section className="relative min-h-screen lg:h-screen w-full flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#180d03] via-[#3d1d02] to-[#120700]">
        
        {/* CSS Keyframes for particles and floating Ganesha */}
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes floatPetal {
            0% { transform: translateY(110vh) translateX(0) scale(0.6) rotate(0deg); opacity: 0; }
            10% { opacity: 0.35; }
            90% { opacity: 0.35; }
            100% { transform: translateY(-10vh) translateX(60px) scale(1.1) rotate(360deg); opacity: 0; }
          }
          .floating-particle-item {
            animation: floatPetal 20s linear infinite;
          }
          @keyframes floatGanesha {
            0% { transform: translateY(0); }
            50% { transform: translateY(-12px); }
            100% { transform: translateY(0); }
          }
          .ganesha-float-animation {
            animation: floatGanesha 6s ease-in-out infinite;
          }
        `}} />

        {/* Ambient Glowing Orbs */}
        <div className="absolute top-[15%] right-[-5%] lg:right-[10%] w-[320px] md:w-[550px] h-[320px] md:h-[550px] rounded-full bg-gradient-to-br from-amber-500/10 to-orange-500/5 blur-[80px] md:blur-[140px] pointer-events-none z-0" />
        <div className="absolute bottom-[10%] left-[-10%] w-[250px] md:w-[400px] h-[250px] md:h-[400px] rounded-full bg-amber-600/5 blur-[80px] md:blur-[120px] pointer-events-none z-0" />

        {/* Floating Petals/Particles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-5">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute bg-gradient-to-tr from-amber-400 to-orange-500 rounded-full blur-[1px] opacity-0 floating-particle-item"
              style={{
                left: `${(i * 9) + 4}%`,
                width: `${(i % 3) * 3 + 4}px`,
                height: `${(i % 3) * 3 + 4}px`,
                animationDelay: `${i * 1.5}s`,
                animationDuration: `${15 + (i % 4) * 4}s`
              }}
            />
          ))}
        </div>

        {/* 2-Column Hero Grid Wrapper */}
        <div className="w-full max-w-7xl mx-auto px-6 md:px-16 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center z-10 pt-24 pb-28 lg:pb-16">
          
          {/* Left: Text/Branding Contents */}
          <div className="space-y-6 md:space-y-8 text-center max-w-2xl flex flex-col items-center mx-auto lg:mx-0 relative z-20">
            <div className="flex flex-col items-center gap-4 w-full">
              {/* Sacred Heading above Logo */}
              <div className="flex items-center gap-3 text-xs md:text-sm font-bold tracking-widest uppercase select-none mb-1">
                <div className="h-[1px] w-8 md:w-12 bg-gradient-to-r from-transparent to-[#F6C453]/60" />
                <span 
                  className="bg-gradient-to-r from-[#FFE9A3] via-[#F6C453] to-[#D89000] bg-clip-text text-transparent filter drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] font-serif"
                  style={{ WebkitTextFillColor: "transparent" }}
                >
                  ॥ श्री विघ्नहर्ताय नमः ॥
                </span>
                <div className="h-[1px] w-8 md:w-12 bg-gradient-to-l from-transparent to-[#F6C453]/60" />
              </div>

              {/* Circular Logo on top with glowing ring and spotlight background */}
              <div className="relative p-1.5 rounded-full border border-amber-400/40 shadow-[0_0_20px_rgba(246,196,83,0.3)] bg-amber-950/20 my-2">
                <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_center,rgba(246,196,83,0.2)_0%,transparent_70%)] blur-md pointer-events-none" />
                <img
                  src={settings?.logoUrl ? `${BACKEND_URL}${settings.logoUrl}` : mandalLogoCircular}
                  alt="Mandal Logo"
                  className="relative z-10 w-24 h-24 md:w-28 md:h-28 object-contain select-none rounded-full"
                />
              </div>
              {/* One-line Title in AMS Chhatrapati Calligraphy font */}
              <h1 
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-wide text-white whitespace-nowrap pt-8 pb-6 pl-4 pr-4 select-none w-full text-center"
                style={{
                  fontFamily: (lang === "marathi" && isCalligraphyFont(hero?.titleMr || "ivaGnahtaa_ imaPa ma/DL")) ? "'AMS Chhatrapati', 'AMSChhatrapati', var(--font-display-hero)" : "var(--font-display-hero)",
                  lineHeight: "1.45",
                  textShadow: "0 2px 5px rgba(0, 0, 0, 0.75)",
                  fontSize: lang === "marathi" ? undefined : "clamp(1.5rem, 4.5vw, 3.25rem)"
                }}
              >
                {current.hero.title}
              </h1>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 text-amber-200/90 font-medium text-sm md:text-base mt-6">
              <span className="bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20 shadow-inner">
                {lang === "marathi" ? (hero?.subtitleMr?.split("•")[0]?.trim() || "स्थापना: १९९०") : (hero?.subtitleEn?.split("•")[0]?.trim() || "Established: 1990")}
              </span>
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
              <span className="bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20 shadow-inner">
                {lang === "marathi" ? (hero?.subtitleMr?.split("•")[1]?.trim() || "विघ्नहर्ता चौक, बीड") : (hero?.subtitleEn?.split("•")[1]?.trim() || "Vighnaharta Chowk, Beed")}
              </span>
            </div>

            {/* Countdown Widget */}
            {timeLeft && (
              <div className="flex lg:hidden gap-4 text-center justify-center mt-6 bg-black/40 backdrop-blur-md p-4 rounded-xl border border-amber-500/30 w-full max-w-sm z-30">
                <div className="flex-1">
                  <span className="block text-2xl md:text-3xl font-extrabold text-amber-400 font-display-hero">{timeLeft.days}</span>
                  <span className="text-[9px] font-bold text-white/80 uppercase tracking-widest">Days</span>
                </div>
                <span className="text-amber-400 text-2xl font-bold self-center animate-pulse">:</span>
                <div className="flex-1">
                  <span className="block text-2xl md:text-3xl font-extrabold text-amber-400 font-display-hero">{timeLeft.hours}</span>
                  <span className="text-[9px] font-bold text-white/80 uppercase tracking-widest">Hours</span>
                </div>
                <span className="text-amber-400 text-2xl font-bold self-center animate-pulse">:</span>
                <div className="flex-1">
                  <span className="block text-2xl md:text-3xl font-extrabold text-amber-400 font-display-hero">{timeLeft.minutes}</span>
                  <span className="text-[9px] font-bold text-white/80 uppercase tracking-widest">Mins</span>
                </div>
                <span className="text-amber-400 text-2xl font-bold self-center animate-pulse">:</span>
                <div className="flex-1">
                  <span className="block text-2xl md:text-3xl font-extrabold text-amber-400 font-display-hero">{timeLeft.seconds}</span>
                  <span className="text-[9px] font-bold text-white/80 uppercase tracking-widest">Secs</span>
                </div>
              </div>
            )}

            {/* Hero CTA buttons */}
            {hero?.buttons && hero.buttons.length > 0 && (
              <div className="flex lg:hidden flex-wrap gap-4 justify-center mt-6 z-30">
                {hero.buttons.map((btn, idx) => (
                  <button
                    key={idx}
                    onClick={() => btn.link.startsWith("http") ? window.open(btn.link, "_blank") : navigate(btn.link)}
                    className="px-6 py-2.5 rounded-full font-bold text-sm tracking-wide text-amber-950 bg-gradient-to-r from-amber-400 to-[#F6C453] hover:from-amber-300 hover:to-[#FFE9A3] hover:scale-105 active:scale-95 transition-all shadow-lg cursor-pointer"
                  >
                    {lang === "marathi" ? btn.textMr : btn.textEn}
                  </button>
                ))}
              </div>
            )}

          </div>

          {/* Right: Large Lord Ganesha Image without background, with dynamic floating animation */}
          <div className="flex justify-center items-center relative select-none z-10">
            {/* Spinning decorative aura rings */}
            <div className="absolute w-[300px] md:w-[480px] h-[300px] md:h-[480px] rounded-full bg-amber-500/5 border border-amber-500/10 animate-[spin_60s_linear_infinite]" />
            <div className="absolute w-[350px] md:w-[540px] h-[350px] md:h-[540px] rounded-full bg-orange-500/3 border border-orange-500/5 animate-[spin_90s_linear_infinite] [animation-direction:reverse]" />
            
            <img
              src={hero?.heroImage ? `${BACKEND_URL}${hero.heroImage}` : ganeshDivineHero}
              alt="Lord Ganesha"
              className="relative z-10 w-full max-w-[220px] xs:max-w-[260px] sm:max-w-[300px] md:max-w-[460px] lg:max-w-[480px] h-auto object-contain drop-shadow-[0_15px_35px_rgba(0,0,0,0.65)] ganesha-float-animation hover:scale-103 transition-transform duration-700"
            />
          </div>
        </div>
      </section>

      {/* 2. ABOUT MANDAL SECTION */}
      <section
        className="py-section-gap px-container-padding bg-surface-bright relative animate-fade-in"
        id="about"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div className="relative group">
            <div className="absolute -inset-4 border-2 border-primary/20 transition-transform group-hover:scale-105" />
            <img
              className="w-full h-auto max-h-[500px] object-contain shadow-2xl relative z-10 border-4 border-white bg-amber-950/5 mx-auto"
              src={aboutGanesha}
              alt="Mandal Ganesha Murti"
            />
            <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-primary/10 -z-0 rotate-12" />
          </div>
          <div className="space-y-8">
            <div className="space-y-2">
              <span className="font-label-caps text-label-caps text-primary tracking-widest uppercase">
                {current.about.tag}
              </span>
              <h2 className="font-headline-lg text-headline-lg text-on-background border-b-4 border-secondary-container inline-block pb-2">
                {current.about.title}
              </h2>
            </div>
            <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
              {current.about.p1}
            </p>
            <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
              {current.about.p2}
            </p>
            {current.about.p3 && (
              <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
                {current.about.p3}
              </p>
            )}
            {current.about.p4 && (
              <p className="font-body-lg text-body-lg text-primary font-bold text-center md:text-left text-lg leading-relaxed pt-2">
                {current.about.p4}
              </p>
            )}

            {/* 3 POP-UPS TRIGGER CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6">
              {/* Card 1: About Us */}
              <button
                onClick={() => setActiveModal("details")}
                className="flex flex-col items-center justify-center p-5 bg-[#FAF7DC] border-2 border-secondary-container rounded-xl shadow-md hover:shadow-lg hover:bg-secondary-container/20 transition-all duration-300 group cursor-pointer text-center"
              >
                <span className="material-symbols-outlined text-[#ff7a00] text-3xl mb-2 group-hover:scale-110 transition-transform">
                  info
                </span>
                <span className="font-bold text-on-background text-sm">
                  {lang === "marathi" ? "आमच्याबद्दल" : "About Us"}
                </span>
              </button>

              {/* Card 2: Executive Committee */}
              <button
                onClick={() => setActiveModal("committee")}
                className="flex flex-col items-center justify-center p-5 bg-[#FAF7DC] border-2 border-secondary-container rounded-xl shadow-md hover:shadow-lg hover:bg-secondary-container/20 transition-all duration-300 group cursor-pointer text-center"
              >
                <span className="material-symbols-outlined text-[#ff7a00] text-3xl mb-2 group-hover:scale-110 transition-transform">
                  groups
                </span>
                <span className="font-bold text-on-background text-sm">
                  {lang === "marathi" ? "विद्यमान कार्यकारी मंडळ" : "Executive Committee"}
                </span>
              </button>

              {/* Card 3: Glorious Journey */}
              <button
                onClick={() => setActiveModal("journey")}
                className="flex flex-col items-center justify-center p-5 bg-[#FAF7DC] border-2 border-secondary-container rounded-xl shadow-md hover:shadow-lg hover:bg-secondary-container/20 transition-all duration-300 group cursor-pointer text-center"
              >
                <span className="material-symbols-outlined text-[#ff7a00] text-3xl mb-2 group-hover:scale-110 transition-transform">
                  history_edu
                </span>
                <span className="font-bold text-on-background text-sm">
                  {lang === "marathi" ? "गौरवशाली इतिहास" : "Glorious Journey"}
                </span>
              </button>
            </div>

            <div className="grid grid-cols-2 gap-8 pt-8">
              <div className="p-6 bg-surface-container rounded-lg border-l-4 border-primary">
                <h4 className="font-headline-md text-headline-md text-primary">
                  {current.about.yearsVal}
                </h4>
                <p className="font-label-caps text-label-caps uppercase text-on-surface-variant">
                  {current.about.yearsLbl}
                </p>
              </div>
              <div className="p-6 bg-surface-container rounded-lg border-l-4 border-primary">
                <h4 className="font-headline-md text-headline-md text-primary">
                  {current.about.socialVal}
                </h4>
                <p className="font-label-caps text-label-caps uppercase text-on-surface-variant">
                  {current.about.socialLbl}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* 4. SOCIAL & CULTURAL ACTIVITIES SECTION */}
      <section
        className="py-section-gap px-container-padding bg-[#FAF7DC]/15"
        id="activities"
      >
        <div className="text-center mb-20">
          <span className="font-label-caps text-label-caps text-primary tracking-widest uppercase">
            {current.activities.sub}
          </span>
          <h2 className="font-headline-lg text-headline-lg text-on-background mt-2">
            {current.activities.title}
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mt-4" />
        </div>

        <div className="max-w-6xl mx-auto space-y-24">
          {displayActivities.map((act, idx) => {
            const isEven = idx % 2 === 0;
            const displayTitle = lang === "marathi" ? act.title : (act.titleEn || act.title);
            const displayTag = lang === "marathi" ? act.tag : (act.tagEn || act.tag);
            const displayDesc = lang === "marathi" ? act.description : (act.descriptionEn || act.description);

            return (
              <div
                key={act._id || idx}
                className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center"
              >
                {/* Text Block - on left if even, right if odd */}
                <div className={`space-y-6 ${!isEven ? "lg:order-2" : ""}`}>
                  <div
                    className={`bg-white p-8 md:p-10 shadow-xl rounded-xl border border-outline-variant/10 ${
                      isEven ? "border-l-8 border-primary" : "border-r-8 border-primary"
                    }`}
                  >
                    {displayTag && (
                      <span className="font-label-caps text-xs text-[#d84315] font-extrabold uppercase tracking-widest block mb-2">
                        {displayTag}
                      </span>
                    )}
                    <h3 className="font-display-hero text-2xl md:text-3xl font-extrabold text-on-background mb-4 font-serif">
                      {displayTitle}
                    </h3>
                    <p className="text-on-surface-variant font-body-md leading-relaxed text-sm md:text-base text-justify">
                      {displayDesc}
                    </p>
                  </div>
                </div>

                {/* Image Block - on right if even, left if odd */}
                <div className={`flex justify-center items-center ${!isEven ? "lg:order-1" : ""}`}>
                  <div className="bg-white p-3 shadow-xl rounded-2xl border border-outline-variant/15 w-full max-w-xl">
                    <div className="overflow-hidden rounded-xl">
                      <img
                        className="w-full h-auto object-contain hover:scale-103 transition-transform duration-500 rounded-xl"
                        src={act.imageUrl}
                        alt={displayTitle}
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. GALLERY GRID SECTION */}
      <section
        className="py-section-gap px-container-padding bg-surface-container-low"
        id="gallery"
      >
        <div className="flex justify-between items-end mb-16">
          <div className="space-y-2">
            <span className="font-label-caps text-label-caps text-primary tracking-widest uppercase">
              {current.gallery.sub}
            </span>
            <h2 className="font-headline-lg text-headline-lg text-on-background">
              {current.gallery.title}
            </h2>
          </div>
          <button
            onClick={() => navigate("/gallery")}
            className="border-2 border-primary text-primary px-8 py-3 rounded-DEFAULT font-label-caps text-label-caps hover:bg-primary hover:text-white transition-all shadow-md font-bold"
          >
            {current.gallery.btn}
          </button>
        </div>

        {/* Masonry-style column grid matching the template HTML columns */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-gutter space-y-gutter">
          {displayImages.map((src, i) => (
            <div
              key={i}
              className="break-inside-avoid shadow-lg cursor-pointer overflow-hidden rounded-lg border border-outline-variant/10"
              onClick={() => navigate("/gallery")}
            >
              <img
                className="w-full rounded-lg hover:scale-103 transition-transform duration-300"
                src={src}
                alt={`Mandal Gallery Image ${i}`}
              />
            </div>
          ))}
        </div>
      </section>

      {/* 6. COMMITTEE MEMBERS SECTION */}
      <section
        className="py-section-gap px-container-padding bg-surface-container-low"
        id="committee"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-headline-lg text-headline-lg text-on-background">
              {current.committee.title}
            </h2>
            <div className="w-24 h-1 bg-tertiary mx-auto mt-4" />
          </div>

          <div className="bg-white/90 p-6 md:p-12 rounded-xl shadow-xl border border-tertiary/10 max-w-5xl mx-auto font-body-md text-center">
            
            {/* Top row - Executive Committee */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-y-8 gap-x-2 md:gap-x-0">
              {current.committee.topRow.map((item, idx) => (
                <div 
                  key={idx} 
                  className={`flex flex-col items-center justify-center px-2 py-4 ${
                    idx < current.committee.topRow.length - 1 ? 'md:border-r border-tertiary/20' : ''
                  }`}
                >
                  <span className="text-tertiary text-sm font-bold tracking-wide mb-1 font-label-caps">
                    {item.role}
                  </span>
                  <span className="text-on-background text-base md:text-lg font-bold font-serif">
                    {item.name}
                  </span>
                </div>
              ))}
            </div>

            {/* Double divider line */}
            <div className="my-10 flex flex-col gap-[3px] max-w-4xl mx-auto">
              <div className="border-t border-tertiary/30" />
              <div className="border-t border-tertiary/10" />
            </div>

            {/* Grid rows for Desktop */}
            <div className="space-y-0 max-w-4xl mx-auto hidden md:block">
              {current.committee.grid.map((row, rowIdx) => (
                <div key={rowIdx} className="grid grid-cols-5">
                  {row.map((cell, cellIdx) => {
                    const isEmpty = !cell.name;
                    const hasRightBorder = cellIdx < row.length - 1 && cell.name && row[cellIdx + 1].name;
                    const hasBottomBorder = rowIdx < current.committee.grid.length - 1;
                    
                    return (
                      <div 
                        key={cellIdx}
                        className={`flex flex-col items-center justify-center p-4 min-h-[90px] ${
                          hasRightBorder ? 'border-r border-tertiary/20' : ''
                        } ${
                          (cell.name && hasBottomBorder) || (rowIdx === current.committee.grid.length - 1 && cell.name) ? 'border-b border-tertiary/20' : ''
                        }`}
                      >
                        {!isEmpty && (
                          <>
                            <span className="text-on-background text-base font-bold font-serif mb-1">
                              {cell.name}
                            </span>
                            <span className="text-tertiary text-xs font-semibold">
                              {cell.role}
                            </span>
                          </>
                        )}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>

            {/* Responsive list for Mobile */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden text-left">
              {current.committee.grid.flatMap((row) => row).filter(cell => cell.name).map((cell, idx) => (
                <div key={idx} className="bg-surface-container-lowest p-4 rounded border border-tertiary/10 flex flex-col justify-center">
                  <span className="text-on-background text-sm font-bold font-serif">
                    {cell.name}
                  </span>
                  <span className="text-tertiary text-xs font-semibold mt-1">
                    {cell.role}
                  </span>
                </div>
              ))}
            </div>

          </div>

        </div>
      </section>

      {/* 7. DONATION SECTION */}
      <section
        className="py-section-gap px-container-padding bg-[#ff9933]/10"
        id="donations"
      >
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div className="space-y-8">
            <h2 className="font-display-hero text-headline-lg text-primary">
              {current.donations.title}
            </h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
              {current.donations.desc}
            </p>
            <div className="space-y-4 bg-white p-8 rounded-lg shadow-inner border border-primary/20 max-w-lg">
              <h4 className="font-headline-md text-body-lg font-bold text-primary mb-4">
                {current.donations.bankDetails}
              </h4>
              <div className="grid grid-cols-1 gap-2 text-on-surface font-body-md text-sm md:text-base leading-relaxed">
                <p>{current.donations.bankName}</p>
                <p>{current.donations.branch}</p>
                <p>{current.donations.accNo}</p>
                <p>{current.donations.ifsc}</p>
              </div>
            </div>
          </div>

          {/* Scanner block */}
          <div className="bg-white p-12 rounded-xl shadow-2xl text-center space-y-8 border-4 border-secondary max-w-sm mx-auto lg:max-w-full">
            <h3 className="font-headline-md text-headline-md text-on-background">
              {current.donations.scanTitle}
            </h3>
            <div className="w-64 h-64 mx-auto bg-surface-container flex items-center justify-center border-2 border-dashed border-primary p-2 rounded">
              <div className="w-full h-full flex items-center justify-center bg-white border border-primary overflow-hidden">
                <img
                  src={qrImg}
                  alt="Mandal PhonePe QR Code"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
            <p className="font-label-caps text-label-caps text-on-surface-variant uppercase font-bold tracking-wider">
              {current.donations.upiLabel}
            </p>
            <div className="flex justify-center gap-6 opacity-60">
              <span className="material-symbols-outlined text-4xl text-primary">payments</span>
              <span className="material-symbols-outlined text-4xl text-primary">account_balance</span>
              <span className="material-symbols-outlined text-4xl text-primary">contactless</span>
            </div>
          </div>
        </div>
      </section>

      {/* 8. CONTACT & MAP SECTION */}
      <section
        className="py-section-gap px-container-padding bg-surface"
        id="contact"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-gutter">
          <div className="space-y-12">
            <div>
              <h2 className="font-headline-lg text-headline-lg text-on-background mb-4">
                {current.contact.title}
              </h2>
              <p className="font-body-lg text-body-lg text-on-surface-variant">
                {current.contact.desc}
              </p>
            </div>
            
            <div className="space-y-6">
              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-primary text-xl font-bold">location_on</span>
                </div>
                <div>
                  <h4 className="font-bold text-on-background">
                    {current.contact.addrLabel}
                  </h4>
                  <p className="text-on-surface-variant font-body-md mt-1 leading-relaxed text-sm md:text-base">
                    {current.contact.addrVal}
                  </p>
                </div>
              </div>
              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-primary text-xl font-bold">call</span>
                </div>
                <div>
                  <h4 className="font-bold text-on-background">
                    {current.contact.phoneLabel}
                  </h4>
                  <p className="text-on-surface-variant font-body-md mt-1 text-sm md:text-base">
                    {current.contact.phoneVal}
                  </p>
                </div>
              </div>
              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-primary text-xl font-bold">mail</span>
                </div>
                <div>
                  <h4 className="font-bold text-on-background">
                    {current.contact.emailLabel}
                  </h4>
                  <p className="text-on-surface-variant font-body-md mt-1 text-sm md:text-base">
                    {current.contact.emailVal}
                  </p>
                </div>
              </div>
            </div>

            {/* Social Share links */}
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 bg-on-surface text-white rounded-full flex items-center justify-center hover:bg-primary transition-colors"
              >
                <span className="material-symbols-outlined text-lg">share</span>
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-on-surface text-white rounded-full flex items-center justify-center hover:bg-primary transition-colors"
              >
                <span className="material-symbols-outlined text-lg">chat</span>
              </a>
            </div>
          </div>

          {/* Location Map Graphic */}
          <div className="h-[500px] bg-surface-container rounded-xl overflow-hidden shadow-lg border border-outline-variant relative">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3772.6595280323722!2d75.76022137414726!3d18.99063815464892!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc52b000a0a2cf3%3A0x90f7441ea36d8859!2sShree%20Vighnaharta%20Ganesh%20Mandir%2CBeed!5e0!3m2!1sen!2sin!4v1784914638915!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              title="Shree Vighnaharta Ganesh Mandir Beed Map"
            />
          </div>
        </div>
      </section>

      {/* Back to top scroll button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 w-14 h-14 bg-primary text-on-primary rounded-full shadow-2xl flex items-center justify-center transition-all duration-500 hover:bg-secondary focus:outline-none z-40 ${
          showScrollTop ? "translate-y-0 opacity-100 scale-100" : "translate-y-32 opacity-0 pointer-events-none"
        }`}
        aria-label="Back to top"
      >
        <span className="material-symbols-outlined text-xl">arrow_upward</span>
      </button>

      {/* 🔮 3 ABOUT MODAL POP-UPS */}
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-[#FAF7DC] border-4 border-[#ff7a00] rounded-2xl max-w-lg w-full p-6 md:p-8 shadow-2xl relative animate-scale-in">
            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-[#ff7a00]/10 text-[#ff7a00] hover:bg-[#ff7a00]/20 flex items-center justify-center cursor-pointer transition-all"
            >
              <span className="material-symbols-outlined">close</span>
            </button>

            {activeModal === "details" && (
              <div className="space-y-4">
                <div className="flex items-center gap-3 border-b-2 border-secondary-container pb-3">
                  <span className="material-symbols-outlined text-[#ff7a00] text-3xl">info</span>
                  <h3 className="font-display-hero text-xl text-[#ff7a00] font-bold">
                    {lang === "marathi" ? "आमच्याबद्दल सविस्तर माहिती" : "About Us Information"}
                  </h3>
                </div>
                <p className="text-on-surface-variant leading-relaxed text-sm md:text-base">
                  {lang === "marathi"
                    ? "१९९० सालापासून बीड शहराच्या सांस्कृतिक आणि सामाजिक जीवनात मोलाचे योगदान देणारे आमचे ‘विघ्नहर्ता मित्र मंडळ’ भक्ती, सेवा आणि संस्कृतीचे केंद्र आहे. दरवर्षी गणेशोत्सवाचे भव्य आयोजन करतानाच आम्ही वर्षभर रक्तदान, आरोग्य आणि पर्यावरण संरक्षणाचे काम करतो."
                    : "Since 1990, Vighnaharta Mitra Mandal has been an active religious and social community center in Beed city. Beyond organizing public Ganesh festivals, we actively participate in environmental, educational, and healthcare drives."}
                </p>
                <div className="flex gap-4 pt-4">
                  <button
                    onClick={() => {
                      setActiveModal(null);
                      navigate("/about/details");
                    }}
                    className="flex-1 py-3 bg-gradient-to-r from-[#ff7a00] to-[#ffb347] text-white font-bold rounded-full shadow-md hover:shadow-lg transition-all cursor-pointer text-center text-sm"
                  >
                    {lang === "marathi" ? "सविस्तर वाचा 🚀" : "Read More 🚀"}
                  </button>
                  <button
                    onClick={() => setActiveModal(null)}
                    className="px-6 py-3 border-2 border-gray-300 rounded-full text-gray-700 font-bold hover:bg-gray-100 transition-all cursor-pointer text-sm"
                  >
                    {lang === "marathi" ? "बंद करा" : "Close"}
                  </button>
                </div>
              </div>
            )}

            {activeModal === "committee" && (
              <div className="space-y-4">
                <div className="flex items-center gap-3 border-b-2 border-[#ff7a00]/30 pb-3">
                  <span className="material-symbols-outlined text-[#ff7a00] text-3xl">groups</span>
                  <h3 className="font-display-hero text-xl text-[#ff7a00] font-bold">
                    {lang === "marathi" ? "विद्यमान कार्यकारी मंडळ" : "Executive Committee"}
                  </h3>
                </div>
                <p className="text-on-surface-variant leading-relaxed text-sm md:text-base">
                  {lang === "marathi"
                    ? "आमच्या मंडळाचे विद्यमान कार्यकारी मंडळ अत्यंत निष्ठेने आणि सेवाभावाने कार्यरत आहे. मंडळाचे अध्यक्ष शुभम जोशी यांच्या नेतृत्वाखाली सर्व सदस्य शिस्तबद्ध नियोजन आणि पारदर्शकता जपून उत्सव यशस्वी करतात."
                    : "Under the leadership of our President Shubham Joshi, the Executive Committee manages all social and devotional activities transparently, maintaining community unity and spiritual traditions."}
                </p>
                <div className="flex gap-4 pt-4">
                  <button
                    onClick={() => {
                      setActiveModal(null);
                      navigate("/about/committee");
                    }}
                    className="flex-1 py-3 bg-gradient-to-r from-[#ff7a00] to-[#ffb347] text-white font-bold rounded-full shadow-md hover:shadow-lg transition-all cursor-pointer text-center text-sm"
                  >
                    {lang === "marathi" ? "सविस्तर वाचा 🚀" : "Read More 🚀"}
                  </button>
                  <button
                    onClick={() => setActiveModal(null)}
                    className="px-6 py-3 border-2 border-gray-300 rounded-full text-gray-700 font-bold hover:bg-gray-100 transition-all cursor-pointer text-sm"
                  >
                    {lang === "marathi" ? "बंद करा" : "Close"}
                  </button>
                </div>
              </div>
            )}

            {activeModal === "journey" && (
              <div className="space-y-4">
                <div className="flex items-center gap-3 border-b-2 border-secondary-container pb-3">
                  <span className="material-symbols-outlined text-[#ff7a00] text-3xl">history_edu</span>
                  <h3 className="font-display-hero text-xl text-[#ff7a00] font-bold">
                    {lang === "marathi" ? "मंडळाचा गौरवशाली इतिहास" : "Glorious History"}
                  </h3>
                </div>
                <p className="text-on-surface-variant leading-relaxed text-sm md:text-base">
                  {lang === "marathi"
                    ? "१९९० पासून सुरू झालेली विघ्नहर्ता मित्र मंडळाची वाटचाल आज ३६ वर्षांहून अधिक काळ यशस्वीपणे सुरू आहे. एका छोट्या मांडवातून सुरू झालेला हा प्रवास आज भव्य डिजिटल उत्सव आणि व्यापक समाजोपयोगी उपक्रमांपर्यंत पोहोचला आहे."
                    : "For over 36 years since 1990, Vighnaharta Mitra Mandal has grown from a humble street pandal to a digitally-enabled community center supporting education, health, and local heritage in Beed."}
                </p>
                <div className="flex gap-4 pt-4">
                  <button
                    onClick={() => {
                      setActiveModal(null);
                      navigate("/about/journey");
                    }}
                    className="flex-1 py-3 bg-gradient-to-r from-[#ff7a00] to-[#ffb347] text-white font-bold rounded-full shadow-md hover:shadow-lg transition-all cursor-pointer text-center text-sm"
                  >
                    {lang === "marathi" ? "सविस्तर वाचा 🚀" : "Read More 🚀"}
                  </button>
                  <button
                    onClick={() => setActiveModal(null)}
                    className="px-6 py-3 border-2 border-gray-300 rounded-full text-gray-700 font-bold hover:bg-gray-100 transition-all cursor-pointer text-sm"
                  >
                    {lang === "marathi" ? "बंद करा" : "Close"}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;