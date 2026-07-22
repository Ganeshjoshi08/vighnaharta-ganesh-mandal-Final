import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import qrImg from "../assets/qr.png";
import homeImg from "../assets/HOME_IMG.jpg";
import aboutGanesha from "../assets/about_ganesha.jpg";
import timeline2010 from "../assets/timeline_2010.jpg";

const Home = () => {
  const navigate = useNavigate();
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [lang, setLang] = useState(localStorage.getItem("lang") || "marathi");

  useEffect(() => {
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

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const galleryImages = [
    aboutGanesha,
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCEomG5rqOpviVPKAJB2u3TPGeHPcqrq3cLADrh2Ue1wviaHJt7YjxrVikzjD2SEkX6vFUXcywvnKgpYk3efkVm9RO1IRWYxHTlbp_Q2PfIVYelBcgoUpaw2NaPHTaU-QqFT3HEYA9jVT_6HWUd9Wv438kC9hqcReAbtMrNyCeGrgkyIHN8fiC8laKjsgsWaBSnJ5pUbzKOmFvkRwH38PYcXekbeUjm4GdVX1nOkEH1N4c46bInhqn3e2POgtUl04DMHKI4ffMlSFM",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAhHgjHWfTx0FB2KyiboTf3f8XwXYLX2Dy6ryjkzRJcCEqWp-KKAnC7jwFCka4YIyM1rOmSb-Q37PDyNM8IQPIbnhbZx4i7nJuwLjEBSEBJXHbAZLk-Cr7e2hml7AuiRe1W50ftRUs9V4q6gsazHxgREVOEO_Xo9eseoXIdHs-sXU92OtVYqrTrTvVWD7tvxgbz2VFOPGsRAU7po68mh_bJcjDyNjMyZiyc-iO8DCZa0AuhB0MEJ1Z_GMesrVhtW18NC2iG72p0pb4",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDFeQqWSJqAYdo7PagZeXkqMuMh0beRB6yZvIFO_Oj00btcdilyTqVgfE4IXXPmRdWWsv6UT0m9aK1l6k7-iOcyv6Nv8OzeMS4IvI9vP-xid-RpMIPxdHAfqdfXyls9oKhuxlLlYt3e_MUmJIGAaECd7RpUQlzZZgpSN0yPr8Z_2yoQEORRQxRg17QgseMBj3AxqfZc9qVApP65z2WtQtOEK1jK-6IVB3oVQiApB2CvbSbIVuwYbBLWOBhVIdaRnPsZhMrwGzPEbjQ",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAZFxtwNfx9lJiFuXn-dNUkVQN1qnzWXIghPKPEnTMtLXxg1rxBkLXIutFhjLqkmgHQ-x1vVtA4saSibZh7Nbn4MioAMAOvAfxWb3WWfR2DtpjB1Vxv5nNheFaf7kSMjscZYDQHguBD0QcIuzZpn0vs4bDlZ7lzQvDWfH4FKjGbQs-TcVzwlS64svG_2gEBdHyoDMhUOc8tt7gKPz0zkk0MdD6ZvsN9IjCpW5y3wVGmMpn1kyqYFVhBP4Cl9zInw0xBTzZ38ZyJmOY",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAouLfbwgb8UKSjnQvNQ-YzIQ7Niu4rcpuubf5uH9IAWiDG1McYUoxjtgnbjytT8nytXPqGnQQn8hfdd6VHMY7ghEDT7RSv6yy12NmlOoH3UNLT0DQwhdEu1b5_uMBsj_BfmCYQuDSUYm_y11EcWv6D67rM7qVxPz1IOtmLTojQJA9CcaYgJRJgms3gU65J8NLeZ7X43r7SacQ9qEa7d93uxJQ3PKKb4wS0sFfAtCS9olHGqIgamv_qx-cZGe0-DOX9UJTDsxo7mSc",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuB3XCYop5e8Bp4gmzn6KCakjyrF9IG1YiosW_PuSB4OqGoOjN9kRvjwmLCEDwCyAv5Uc3m3MuonWZ6KoCl4ZbSkB6sfBnAo_XbfxeQqPdzG9uSm5bGJZG5Lz6OPi60nOh762O5OaeZ8BT3LyNlEWpzxd9gujhYGka9JMX6zH6ZO3hvG8jpzTD-7lgroYibn6CVa9B5gfjdYwGGnFCPifdJTMvzpRpRyZYDVsL-YdO3fqTz2N_HnnrEkUvTnOtkjG1iAXijvTw4ZQck"
  ];

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

  const current = translations[lang];

  return (
    <div className="bg-background text-on-background font-body-md overflow-x-hidden selection:bg-primary-container selection:text-on-primary-container">
      
      {/* 1. HERO BANNER SECTION */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div
            className="w-full h-full bg-cover bg-center"
            style={{
              backgroundImage: `url(${homeImg})`,
            }}
          />
          <div className="absolute inset-0 divine-overlay" />
        </div>
        <div className="relative z-10 text-center px-gutter max-w-4xl animate-fade-in flex flex-col items-center">
          <h2 className="font-label-caps text-label-caps text-secondary-container mb-4 tracking-[0.3em] uppercase">
            {current.hero.sub}
          </h2>
          <h1 className="font-display-hero text-display-hero text-white divine-glow mb-2">
            {current.hero.title}
          </h1>
          <p className="font-headline-md text-headline-md text-primary-fixed mb-8 font-normal italic">
            {current.hero.est}
          </p>
          <div className="flex flex-col items-center gap-6">
            <div
              onClick={() => {
                const aboutSec = document.getElementById("about");
                if (aboutSec) aboutSec.scrollIntoView({ behavior: "smooth" });
              }}
              className="w-16 h-16 rounded-full border-2 border-primary-container flex items-center justify-center animate-bounce cursor-pointer hover:bg-primary-container/20 transition-all"
            >
              <span className="material-symbols-outlined text-primary-container text-4xl">
                keyboard_double_arrow_down
              </span>
            </div>
            <span className="font-label-caps text-label-caps text-white/70 uppercase tracking-widest">
              {current.hero.morya}
            </span>
          </div>
        </div>

        {/* Decorative corner borders - exactly matches template dimensions */}
        <div className="absolute top-0 left-0 w-32 h-32 border-t-8 border-l-8 border-secondary-container opacity-50 m-container-padding" />
        <div className="absolute bottom-0 right-0 w-32 h-32 border-b-8 border-r-8 border-secondary-container opacity-50 m-container-padding" />
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
              className="w-full aspect-[4/5] object-cover shadow-2xl relative z-10 border-4 border-white"
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

      {/* 3. HISTORICAL TIMELINE SECTION */}
      <section
        className="py-section-gap px-container-padding bg-on-background text-white relative overflow-hidden"
        id="history"
      >
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="font-display-hero text-headline-lg golden-text-gradient mb-4">
              {current.history.title}
            </h2>
            <div className="w-24 h-1 bg-secondary-container mx-auto" />
          </div>

          <div className="relative space-y-16">
            {/* Timeline Line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-primary/30 hidden md:block -translate-x-1/2" />

            {/* 1990: Text Left, Image Right */}
            <div className="flex flex-col md:flex-row items-center gap-12 relative">
              <div className="md:w-1/2 md:text-right">
                <h3 className="font-display-hero text-headline-lg text-primary-fixed">
                  {current.history.y1990}
                </h3>
                <p className="font-body-lg text-body-lg text-surface-variant">
                  {current.history.d1990}
                </p>
              </div>
              
              {/* Node (maps to rounded-full which has 12px border radius, rendering a rounded square) */}
              <div className="w-8 h-8 rounded-full bg-primary-container border-4 border-on-background z-10 shrink-0 shadow-[0_0_15px_rgba(255,153,51,0.5)] hidden md:block" />
              
              <div className="md:w-1/2 w-full">
                {/* No image for 1990 */}
              </div>
            </div>

            {/* 2010: Text Right, Image Left */}
            <div className="flex flex-col md:flex-row-reverse items-center gap-12 relative">
              <div className="md:w-1/2">
                <h3 className="font-display-hero text-headline-lg text-primary-fixed">
                  {current.history.y2010}
                </h3>
                <p className="font-body-lg text-body-lg text-surface-variant">
                  {current.history.d2010}
                </p>
              </div>
              
              {/* Node */}
              <div className="w-8 h-8 rounded-full bg-primary-container border-4 border-on-background z-10 shrink-0 shadow-[0_0_15px_rgba(255,153,51,0.5)] hidden md:block" />
              
              <div className="md:w-1/2 w-full">
                <img
                  className="rounded-lg aspect-video object-cover w-full shadow-lg border border-white/10"
                  src={timeline2010}
                  alt="Mandal Group Photo 2010"
                />
              </div>
            </div>

            {/* 2024: Text Left, Image Right */}
            <div className="flex flex-col md:flex-row items-center gap-12 relative">
              <div className="md:w-1/2 md:text-right">
                <h3 className="font-display-hero text-headline-lg text-primary-fixed">
                  {current.history.y2024}
                </h3>
                <p className="font-body-lg text-body-lg text-surface-variant">
                  {current.history.d2024}
                </p>
              </div>
              
              {/* Node */}
              <div className="w-8 h-8 rounded-full bg-primary-container border-4 border-on-background z-10 shrink-0 shadow-[0_0_15px_rgba(255,153,51,0.5)] hidden md:block" />
              
              <div className="md:w-1/2 w-full">
                <img
                  className="rounded-lg aspect-video object-cover w-full shadow-lg border border-white/10"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuC95HoUVmhDk4FzLW0xGJqWJA2Aa7M48WJP75S09bdVIZZ9GrlDDCn7_G5ysROkx940T4srNZmYloSnZSgLtB7IVOdxlGQwytETDRlzvijYZqbuelrra_0ZSJeqWTBdAhzIUXh3B5Ek2JlipoVjV8cMeGU1LhAcBvJTkWCze8ou2jXdlWRIlcgoKmGubbsOD6b-dsvBFqxc09XKy-k37QZV_MP_6t7QG6OvHBH8lbvXScooW_y85gR0CABhwjXUcJQCh6O642GxbHU"
                  alt="Luminous gate night view 2024"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. SOCIAL & CULTURAL ACTIVITIES SECTION */}
      <section
        className="py-section-gap px-container-padding bg-surface"
        id="activities"
      >
        <div className="text-center mb-20">
          <span className="font-label-caps text-label-caps text-primary tracking-widest uppercase">
            {current.activities.sub}
          </span>
          <h2 className="font-headline-lg text-headline-lg text-on-background mt-2">
            {current.activities.title}
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Card 1 */}
          <div className="group bg-white p-unit shadow-xl border-t-4 border-primary transition-transform hover:-translate-y-4 rounded border border-outline-variant/20">
            <div className="overflow-hidden mb-6 rounded">
              <img
                className="w-full aspect-square object-cover group-hover:scale-110 transition-transform duration-500"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBEr85RcMA3ZBdg0KWRvpCvYCVk59DpxGaPZQxFEj4c23dyVyUjzZ5VLu82QtNJvfqUrA5L4SVci2yeJXNIEhu6ZHaXSWbqDrU5Atvk3sPQwYZK0jfy-IKKrmqcQGXHSD4eGhrxrjs6Mu9dwTn78t8XTVJA4-uTVDmacmwsKQ2NLNpL7Gy5p_uAbusaBK6GyLggR7sJiZazU54kco5D7VUf0IR9GzoFBGtgkCYtC8kNjGig-pJ27ZkHjjmmAoGtnmZM3ibzqkrN4mo"
                alt="Procession performance"
              />
            </div>
            <div className="px-6 pb-8">
              <h3 className="font-headline-md text-headline-md text-on-background mb-4">
                {current.activities.c1Title}
              </h3>
              <p className="text-on-surface-variant font-body-md leading-relaxed text-sm">
                {current.activities.c1Desc}
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="group bg-white p-unit shadow-xl border-t-4 border-primary transition-transform hover:-translate-y-4 rounded border border-outline-variant/20">
            <div className="overflow-hidden mb-6 rounded">
              <img
                className="w-full aspect-square object-cover group-hover:scale-110 transition-transform duration-500"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB5yFW_LBFKACCPZcPR1wgHEw4gXOPCTSx6DmsJ5XclQUlC52JH3r87K4xyR6qruefcHj8DIVSMDbXzGVLWEtfyZ_A-0VOX-gdQwjmhHoM5Pst6_1XN2eMT3tOU7EYDInMIrPgyrOZGMER_k0XGQX5ZcUWKA0j4mfq3NH_WIhgx2SUdutxeATuqDdJLYCXd55y3G95CVtVCdmvBhYTn79in1rYdMWiG5hP4w3_HYdAmDYsvcntXk5C7X2kQhLBtHDgD0WIcXJ9-oNM"
                alt="Blood donation activity"
              />
            </div>
            <div className="px-6 pb-8">
              <h3 className="font-headline-md text-headline-md text-on-background mb-4">
                {current.activities.c2Title}
              </h3>
              <p className="text-on-surface-variant font-body-md leading-relaxed text-sm">
                {current.activities.c2Desc}
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="group bg-white p-unit shadow-xl border-t-4 border-primary transition-transform hover:-translate-y-4 rounded border border-outline-variant/20">
            <div className="overflow-hidden mb-6 rounded">
              <img
                className="w-full aspect-square object-cover group-hover:scale-110 transition-transform duration-500"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAu7ODGa2HmZWAEiuU7MS6nlGQ82NrFmyGicJtdPIRrA26kwvyr-S3weZhqzDjmxocEsiFha_VAFEHGqiix9_7HoN-0KAlhLZ-b5yVhYBhEVy7O6v4k7pRpAFGNxm4WD2sbkaBz8Qg6tkFpIV2J7tDl09QYZJbCOlsN736fBqAb2dNPIuKFS14V6spFBCiN_C3b-_08iQjb1Wk5dF1-WFQAHvQ-4FkCHyM-GzzIzFWu5GPWjoQS3Hco9LNCDJc8oJGnaG_XsGNT8M8"
                alt="Mythological Play on stage"
              />
            </div>
            <div className="px-6 pb-8">
              <h3 className="font-headline-md text-headline-md text-on-background mb-4">
                {current.activities.c3Title}
              </h3>
              <p className="text-on-surface-variant font-body-md leading-relaxed text-sm">
                {current.activities.c3Desc}
              </p>
            </div>
          </div>
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
          {galleryImages.map((src, i) => (
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
            <div
              className="w-full h-full bg-cover bg-center"
              style={{
                backgroundImage:
                  "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDtOstaP5gffv70y5SjpI8cC4kYZQbUeEhfKCY8-aQhh53liHq2q8-E6sUlDf5DoOTYEpa66TQFGyWid9fYg9keAi1j6ojFJ8bTRqGl_jAepOzNoYZOaHkSSX_QtT-jLk5-DYoM24835PXb_ECM0Tvwi7hhYVHmgN48lUdi_JiRAFLjaZdiT7qzwwgtI5BOUSoVFHYtrGw6eJmZTAyfDKXb69WE0BisYZVGaYrDtUeqwoLk24ph5DE7vKymdzoHAq2l3rZVBF8Hag0')",
              }}
            >
              <div className="w-full h-full flex items-center justify-center bg-black/5">
                <div className="bg-white p-4 rounded shadow-2xl flex flex-col items-center border border-outline-variant/10">
                  <span
                    className="material-symbols-outlined text-primary text-4xl animate-bounce"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    location_on
                  </span>
                  <span className="font-bold text-on-background mt-2 text-xs md:text-sm font-label-caps">
                    {current.contact.mapMarker}
                  </span>
                </div>
              </div>
            </div>
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
    </div>
  );
};

export default Home;