import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import API from "../api/api";

// Helper components for Native SVG Charting
const SVGAreaChart = ({ data, color = "#ff7a00", gradId = "grad1" }) => {
  if (!data || data.length === 0) {
    return (
      <div className="flex h-40 items-center justify-center text-on-surface-variant/40 text-sm">
        No data available
      </div>
    );
  }
  const padding = 35;
  const width = 500;
  const height = 180;
  
  const maxVal = Math.max(...data.map(d => Number(d.value) || 0), 1) * 1.15;
  const points = data.map((d, i) => {
    const x = padding + (i * (width - 2 * padding)) / (data.length - 1);
    const y = height - padding - ((Number(d.value) || 0) * (height - 2 * padding)) / maxVal;
    return { x, y, label: d.label, value: d.value };
  });

  const pathD = points.reduce((acc, p, i) => {
    return acc + `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`;
  }, "");

  const areaD = pathD + ` L ${points[points.length - 1].x} ${height - padding} L ${points[0].x} ${height - padding} Z`;

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto">
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.45" />
          <stop offset="100%" stopColor={color} stopOpacity="0.0" />
        </linearGradient>
      </defs>
      <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} stroke="#e5e7eb" strokeWidth="1" />
      <path d={areaD} fill={`url(#${gradId})`} />
      <path d={pathD} fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      {points.map((p, i) => (
        <g key={i} className="group cursor-pointer">
          <circle cx={p.x} cy={p.y} r="4" fill={color} stroke="#ffffff" strokeWidth="1.5" className="transition-all duration-300 hover:r-6" />
          <text x={p.x} y={p.y - 8} textAnchor="middle" className="text-[9px] font-bold fill-on-background opacity-0 group-hover:opacity-100 transition-opacity bg-surface px-1 pointer-events-none">
            {p.value}
          </text>
          <text x={p.x} y={height - padding + 15} textAnchor="middle" className="text-[8px] fill-on-surface-variant font-medium">
            {p.label}
          </text>
        </g>
      ))}
    </svg>
  );
};

const SVGBarChart = ({ data, color = "#d89000" }) => {
  if (!data || data.length === 0) {
    return (
      <div className="flex h-40 items-center justify-center text-on-surface-variant/40 text-sm">
        No data available
      </div>
    );
  }
  const padding = 35;
  const width = 500;
  const height = 180;
  
  const maxVal = Math.max(...data.map(d => Number(d.value) || 0), 1) * 1.15;
  const chartWidth = width - 2 * padding;
  const barWidth = (chartWidth / data.length) * 0.6;
  const gap = (chartWidth / data.length) * 0.4;

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto">
      <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} stroke="#e5e7eb" strokeWidth="1" />
      {data.map((d, i) => {
        const val = Number(d.value) || 0;
        const barHeight = (val * (height - 2 * padding)) / maxVal;
        const x = padding + i * (barWidth + gap) + gap / 2;
        const y = height - padding - barHeight;

        return (
          <g key={i} className="group cursor-pointer">
            <rect x={x} y={y} width={barWidth} height={barHeight} fill={color} rx="3" className="transition-all duration-300 hover:opacity-80" />
            <text x={x + barWidth / 2} y={y - 8} textAnchor="middle" className="text-[9px] font-bold fill-on-background opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              {d.value}
            </text>
            <text x={x + barWidth / 2} y={height - padding + 15} textAnchor="middle" className="text-[8px] fill-on-surface-variant font-medium">
              {d.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
};

const Admin = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Active Tab
  const [activeTab, setActiveTab] = useState("dashboard");

  // Summary Metrics Caches
  const [stats, setStats] = useState(null);
  const [statsLoading, setStatsLoading] = useState(true);

  // Health Metrics
  const [health, setHealth] = useState(null);
  const [healthLoading, setHealthLoading] = useState(true);

  // Paginated Activity Logs
  const [activities, setActivities] = useState([]);
  const [actPage, setActPage] = useState(1);
  const [actTotalPages, setActTotalPages] = useState(1);
  const [actLoading, setActLoading] = useState(false);
  const [dateFilter, setDateFilter] = useState("");
  const [actionFilter, setActionFilter] = useState("");
  const [userFilter, setUserFilter] = useState("");

  // Notifications
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  // CMS: Website settings & Hero CMS states
  const [settingsForm, setSettingsForm] = useState({
    websiteName: "",
    addressMr: "",
    addressEn: "",
    phoneNumber: "",
    email: "",
    googleMapsLink: "",
    facebook: "",
    instagram: "",
    youtube: "",
    twitter: "",
    footerTextMr: "",
    footerTextEn: "",
    copyrightMr: "",
    copyrightEn: "",
    supportEmail: ""
  });
  const [heroForm, setHeroForm] = useState({
    titleMr: "",
    titleEn: "",
    subMr: "",
    subEn: "",
    subtitleMr: "",
    subtitleEn: "",
    countdownDate: "",
    buttons: []
  });
  const [logoFile, setLogoFile] = useState(null);
  const [favFile, setFavFile] = useState(null);
  const [heroFile, setHeroFile] = useState(null);
  const [bgFile, setBgFile] = useState(null);

  // Legacy About timeline state
  const [aboutTimeline, setAboutTimeline] = useState({
    aboutMr1: "",
    aboutMr2: "",
    aboutMr3: "",
    aboutMr4: "",
    aboutEn1: "",
    aboutEn2: "",
    aboutEn3: "",
    aboutEn4: "",
    timeline1990Mr: "",
    timeline1990En: "",
    timeline2010Mr: "",
    timeline2010En: "",
    timeline2024Mr: "",
    timeline2024En: ""
  });

  // Global Search state
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);

  const [saveLoading, setSaveLoading] = useState(false);

  useEffect(() => {
    fetchDashboardSummary();
    fetchSystemHealth();
    fetchActivityTimeline(1);
    fetchNotificationsList();
    fetchCmsSettings();
    fetchAboutTimeline();

    // Set auto-refresh loops
    const healthInterval = setInterval(fetchSystemHealth, 30000);
    const summaryInterval = setInterval(fetchDashboardSummary, 30000);

    return () => {
      clearInterval(healthInterval);
      clearInterval(summaryInterval);
    };
  }, []);

  // Fetch stats summary
  const fetchDashboardSummary = async () => {
    try {
      const res = await API.get("/analytics/summary");
      if (res.data && res.data.success) {
        setStats(res.data.data);
      }
    } catch (e) {
      console.error("Failed to load analytics summary:", e);
    } finally {
      setStatsLoading(false);
    }
  };

  // Fetch health monitor variables
  const fetchSystemHealth = async () => {
    try {
      const res = await API.get("/analytics/health");
      if (res.data && res.data.success) {
        setHealth(res.data.data);
      }
    } catch (e) {
      console.error("Health monitor fetch failure:", e);
    } finally {
      setHealthLoading(false);
    }
  };

  // Fetch timeline logs
  const fetchActivityTimeline = async (page = 1) => {
    setActLoading(true);
    try {
      const qParams = new URLSearchParams({
        page,
        limit: 10,
        dateFilter,
        actionFilter,
        userFilter
      }).toString();
      
      const res = await API.get(`/analytics/activities?${qParams}`);
      if (res.data && res.data.success) {
        setActivities(res.data.data);
        setActPage(res.data.pagination.page);
        setActTotalPages(res.data.pagination.pages);
      }
    } catch (e) {
      console.error("Failed to fetch logs:", e);
    } finally {
      setActLoading(false);
    }
  };

  // Fetch notifications
  const fetchNotificationsList = async () => {
    try {
      const res = await API.get("/analytics/notifications");
      if (res.data && res.data.success) {
        setNotifications(res.data.data);
        setUnreadCount(res.data.unreadCount);
      }
    } catch (e) {
      console.error("Failed to load notifications list:", e);
    }
  };

  // Mark single notification read
  const markNotifRead = async (id) => {
    try {
      const res = await API.put(`/analytics/notifications/${id}/read`);
      if (res.data?.success) {
        fetchNotificationsList();
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Mark all read
  const markAllNotifRead = async () => {
    try {
      const res = await API.put("/analytics/notifications/read-all");
      if (res.data?.success) {
        fetchNotificationsList();
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Fetch settings & hero content
  const fetchCmsSettings = async () => {
    try {
      const [sRes, hRes] = await Promise.all([
        API.get("/settings"),
        API.get("/hero")
      ]);
      if (sRes.data?.success) {
        setSettingsForm(sRes.data.data);
      }
      if (hRes.data?.success) {
        setHeroForm(hRes.data.data);
      }
    } catch (e) {
      console.error("CMS read error:", e);
    }
  };

  // Legacy fetch about us & timeline
  const fetchAboutTimeline = async () => {
    try {
      const res = await API.get("/about-history");
      if (res.data) {
        setAboutTimeline(res.data);
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Submit Website Settings form
  const handleSettingsSubmit = async (e) => {
    e.preventDefault();
    setSaveLoading(true);
    try {
      const fd = new FormData();
      Object.keys(settingsForm).forEach(key => {
        if (settingsForm[key] !== undefined && settingsForm[key] !== null) {
          fd.append(key, settingsForm[key]);
        }
      });
      if (logoFile) fd.append("logo", logoFile);
      if (favFile) fd.append("favicon", favFile);

      const res = await API.put("/settings", fd, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      if (res.data?.success) {
        alert("Website settings saved successfully! 🎉");
        setLogoFile(null);
        setFavFile(null);
        window.dispatchEvent(new Event("settingsUpdated"));
        fetchCmsSettings();
      }
    } catch (err) {
      alert(err.response?.data?.msg || "Failed to save website settings ❌");
    } finally {
      setSaveLoading(false);
    }
  };

  // Submit Hero CMS setup
  const handleHeroSubmit = async (e) => {
    e.preventDefault();
    setSaveLoading(true);
    try {
      const fd = new FormData();
      Object.keys(heroForm).forEach(key => {
        if (key === "buttons") {
          fd.append("buttons", JSON.stringify(heroForm.buttons));
        } else if (heroForm[key] !== undefined && heroForm[key] !== null) {
          fd.append(key, heroForm[key]);
        }
      });
      if (heroFile) fd.append("heroImage", heroFile);
      if (bgFile) fd.append("bgImage", bgFile);

      const res = await API.put("/hero", fd, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      if (res.data?.success) {
        alert("Hero Section parameters updated successfully! 💫");
        setHeroFile(null);
        setBgFile(null);
        window.dispatchEvent(new Event("settingsUpdated"));
        fetchCmsSettings();
      }
    } catch (err) {
      alert(err.response?.data?.msg || "Failed to update Hero settings ❌");
    } finally {
      setSaveLoading(false);
    }
  };

  // Save Legacy About timeline setup
  const handleLegacyAboutSubmit = async (e) => {
    e.preventDefault();
    setSaveLoading(true);
    try {
      await API.post("/about-history", aboutTimeline);
      alert("About Us timeline milestones saved successfully! 🏛️");
      fetchAboutTimeline();
    } catch (err) {
      alert("Failed to save timelines ❌");
    } finally {
      setSaveLoading(false);
    }
  };

  // Global Multi-Collection Search
  const handleGlobalSearch = async (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (!query.trim()) {
      setSearchResults(null);
      setSearchOpen(false);
      return;
    }

    try {
      // Direct client side filters from local list/fetch queries or standard routing hits
      const res = await API.get(`/admin/users`);
      const donationsRes = await API.get(`/admin/donations`);
      const eventsRes = await API.get(`/admin/events`);
      
      const filteredUsers = (res.data || []).filter(u => 
        u.name.toLowerCase().includes(query.toLowerCase()) || 
        u.email.toLowerCase().includes(query.toLowerCase())
      );
      const filteredDonations = (donationsRes.data || []).filter(d => 
        d.name.toLowerCase().includes(query.toLowerCase()) || 
        (d.email && d.email.toLowerCase().includes(query.toLowerCase())) ||
        String(d.amount).includes(query)
      );
      const filteredEvents = (eventsRes.data?.events || eventsRes.data || []).filter(ev =>
        ev.title.toLowerCase().includes(query.toLowerCase()) ||
        ev.description.toLowerCase().includes(query.toLowerCase())
      );

      setSearchResults({
        users: filteredUsers.slice(0, 5),
        donations: filteredDonations.slice(0, 5),
        events: filteredEvents.slice(0, 5)
      });
      setSearchOpen(true);
    } catch (err) {
      console.error("Search failed:", err);
    }
  };

  const addHeroButton = () => {
    setHeroForm(prev => ({
      ...prev,
      buttons: [...prev.buttons, { textMr: "", textEn: "", link: "" }]
    }));
  };

  const removeHeroButton = (idx) => {
    setHeroForm(prev => ({
      ...prev,
      buttons: prev.buttons.filter((_, i) => i !== idx)
    }));
  };

  const handleHeroButtonChange = (idx, field, value) => {
    const updated = [...heroForm.buttons];
    updated[idx][field] = value;
    setHeroForm(prev => ({ ...prev, buttons: updated }));
  };

  const handleLogout = async () => {
    if (window.confirm("Are you sure you want to logout? 🚪")) {
      try {
        await API.post("/auth/logout");
      } catch (e) {
        // fail silently
      }
      localStorage.removeItem("token");
      localStorage.removeItem("isAdmin");
      navigate("/auth");
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF9F5] flex flex-col md:flex-row text-slate-800 font-sans">
      
      {/* 👑 CMS SIDEBAR (DARK & CURATED) */}
      <aside className="w-full md:w-64 bg-slate-900 text-slate-300 flex flex-col shrink-0 border-r border-slate-800">
        <div className="p-6 border-b border-slate-800 flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold text-amber-500 tracking-wide font-serif">विघ्नहर्ता चौक, बीड</h1>
            <span className="text-xs text-slate-500 uppercase tracking-widest font-semibold block">CMS Core Controls</span>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
          <button 
            onClick={() => setActiveTab("dashboard")}
            className={`w-full text-left px-4 py-3 rounded-lg text-sm font-semibold flex items-center gap-3 transition-colors ${
              activeTab === "dashboard" ? "bg-amber-500 text-slate-950 font-bold" : "hover:bg-slate-800 hover:text-white"
            }`}
          >
            <span className="material-symbols-outlined text-lg">dashboard</span>
            Summary Dashboard
          </button>
          
          <button 
            onClick={() => setActiveTab("timeline")}
            className={`w-full text-left px-4 py-3 rounded-lg text-sm font-semibold flex items-center gap-3 transition-colors ${
              activeTab === "timeline" ? "bg-amber-500 text-slate-950 font-bold" : "hover:bg-slate-800 hover:text-white"
            }`}
          >
            <span className="material-symbols-outlined text-lg">history</span>
            Activity Logs
          </button>

          <button 
            onClick={() => setActiveTab("hero")}
            className={`w-full text-left px-4 py-3 rounded-lg text-sm font-semibold flex items-center gap-3 transition-colors ${
              activeTab === "hero" ? "bg-amber-500 text-slate-950 font-bold" : "hover:bg-slate-800 hover:text-white"
            }`}
          >
            <span className="material-symbols-outlined text-lg">layers</span>
            Hero Section CMS
          </button>

          <button 
            onClick={() => setActiveTab("settings")}
            className={`w-full text-left px-4 py-3 rounded-lg text-sm font-semibold flex items-center gap-3 transition-colors ${
              activeTab === "settings" ? "bg-amber-500 text-slate-950 font-bold" : "hover:bg-slate-800 hover:text-white"
            }`}
          >
            <span className="material-symbols-outlined text-lg">settings_suggest</span>
            Website Configuration
          </button>

          <button 
            onClick={() => setActiveTab("legacyAbout")}
            className={`w-full text-left px-4 py-3 rounded-lg text-sm font-semibold flex items-center gap-3 transition-colors ${
              activeTab === "legacyAbout" ? "bg-amber-500 text-slate-950 font-bold" : "hover:bg-slate-800 hover:text-white"
            }`}
          >
            <span className="material-symbols-outlined text-lg">edit_note</span>
            About Us & Timeline
          </button>

          <div className="h-[1px] bg-slate-800 my-4" />

          {/* Module Links */}
          <Link to="/admin/events" className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-xs font-semibold hover:bg-slate-800 hover:text-white transition-colors">
            <span className="material-symbols-outlined text-base">event</span> Manage Events
          </Link>
          <Link to="/admin/gallery" className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-xs font-semibold hover:bg-slate-800 hover:text-white transition-colors">
            <span className="material-symbols-outlined text-base">photo_library</span> Manage Gallery
          </Link>
          <Link to="/admin/activities" className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-xs font-semibold hover:bg-slate-800 hover:text-white transition-colors">
            <span className="material-symbols-outlined text-base">palette</span> Manage Activities
          </Link>
          <Link to="/admin/mantras" className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-xs font-semibold hover:bg-slate-800 hover:text-white transition-colors">
            <span className="material-symbols-outlined text-base">graphic_eq</span> Manage Mantras
          </Link>
          <Link to="/admin/announcements" className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-xs font-semibold hover:bg-slate-800 hover:text-white transition-colors">
            <span className="material-symbols-outlined text-base">campaign</span> Announcements
          </Link>
          <Link to="/admin/donations" className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-xs font-semibold hover:bg-slate-800 hover:text-white transition-colors">
            <span className="material-symbols-outlined text-base">payments</span> Donations
          </Link>
          <Link to="/admin/users" className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-xs font-semibold hover:bg-slate-800 hover:text-white transition-colors">
            <span className="material-symbols-outlined text-base">group</span> Users List
          </Link>
        </nav>

        <div className="p-4 border-t border-slate-800 flex items-center justify-between">
          <Link to="/" target="_blank" className="text-xs font-bold text-amber-500 hover:underline flex items-center gap-1.5">
            <span className="material-symbols-outlined text-sm">open_in_new</span> Live Website
          </Link>
          <button 
            onClick={handleLogout}
            className="text-xs font-bold text-red-400 hover:text-red-300 flex items-center gap-1"
          >
            <span className="material-symbols-outlined text-sm">logout</span> Exit
          </button>
        </div>
      </aside>

      {/* 🖥️ MAIN CMS CONTENT */}
      <main className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8 max-w-7xl mx-auto w-full">
        
        {/* TOP BAR SEARCH & HEADINGS */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative">
          <div>
            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight font-serif">
              ⚙️ {activeTab.toUpperCase()} CMS workspace
            </h2>
            <p className="text-sm text-slate-500">Shree Vighnaharta Ganesh Mandal Beed Administration Hub</p>
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-80 z-40">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <span className="material-symbols-outlined text-lg">search</span>
            </div>
            <input
              type="text"
              placeholder="Global records search..."
              value={searchQuery}
              onChange={handleGlobalSearch}
              onFocus={() => setSearchOpen(true)}
              className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all shadow-sm"
            />
            {/* Search Dropdown Panel */}
            {searchOpen && searchResults && (
              <div className="absolute top-full right-0 w-full md:w-96 bg-white border border-slate-200 shadow-xl rounded-lg mt-1 overflow-hidden z-50 max-h-96 overflow-y-auto">
                <div className="p-3 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Search Results</span>
                  <button 
                    onClick={() => {
                      setSearchOpen(false);
                      setSearchQuery("");
                      setSearchResults(null);
                    }}
                    className="text-xs text-slate-400 hover:text-slate-600 font-bold"
                  >
                    Clear
                  </button>
                </div>
                <div className="p-3 space-y-4">
                  {/* Users */}
                  {searchResults.users?.length > 0 && (
                    <div>
                      <h4 className="text-[10px] font-bold text-amber-600 uppercase tracking-widest mb-1.5">Members ({searchResults.users.length})</h4>
                      <ul className="space-y-1">
                        {searchResults.users.map((u, idx) => (
                          <li key={idx} className="text-xs py-1 border-b border-slate-50 flex justify-between items-center">
                            <span className="font-bold text-slate-700">{u.name}</span>
                            <span className="text-slate-400 text-[10px]">{u.email}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {/* Donations */}
                  {searchResults.donations?.length > 0 && (
                    <div>
                      <h4 className="text-[10px] font-bold text-green-600 uppercase tracking-widest mb-1.5">Donations ({searchResults.donations.length})</h4>
                      <ul className="space-y-1">
                        {searchResults.donations.map((d, idx) => (
                          <li key={idx} className="text-xs py-1 border-b border-slate-50 flex justify-between items-center">
                            <span className="font-bold text-slate-700">{d.name}</span>
                            <span className="text-green-600 font-black">₹{d.amount}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {/* Events */}
                  {searchResults.events?.length > 0 && (
                    <div>
                      <h4 className="text-[10px] font-bold text-blue-600 uppercase tracking-widest mb-1.5">Events ({searchResults.events.length})</h4>
                      <ul className="space-y-1">
                        {searchResults.events.map((e, idx) => (
                          <li key={idx} className="text-xs py-1 border-b border-slate-50">
                            <span className="font-bold text-slate-700 block">{e.title}</span>
                            <span className="text-slate-400 text-[9px]">{new Date(e.date).toLocaleDateString()}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {searchResults.users?.length === 0 && searchResults.donations?.length === 0 && searchResults.events?.length === 0 && (
                    <div className="text-center py-6 text-sm text-slate-400">
                      No matching records found. 🔍
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </header>

        {/* ========================================================
            TAB 1: DASHBOARD CMS
            ======================================================== */}
        {activeTab === "dashboard" && (
          <div className="space-y-8 animate-fade-in">
            
            {/* STATS OVERVIEW CARDS GRID */}
            {statsLoading ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="h-24 bg-white border border-slate-100 rounded-xl animate-pulse" />
                ))}
              </div>
            ) : stats ? (
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                
                {/* User card */}
                <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 border border-indigo-200/50 p-4 md:p-6 rounded-2xl shadow-sm hover:scale-[1.03] transition-transform duration-300 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-indigo-600 tracking-wider">Total Users</span>
                    <h3 className="text-2xl md:text-3xl font-extrabold text-slate-800 mt-1">{stats.counts.users}</h3>
                  </div>
                  <span className="material-symbols-outlined text-3xl text-indigo-500 opacity-60">group</span>
                </div>

                {/* Donation card */}
                <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 border border-emerald-200/50 p-4 md:p-6 rounded-2xl shadow-sm hover:scale-[1.03] transition-transform duration-300 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-emerald-600 tracking-wider">Total Donations</span>
                    <h3 className="text-2xl md:text-3xl font-extrabold text-slate-800 mt-1">{stats.counts.donations}</h3>
                  </div>
                  <span className="material-symbols-outlined text-3xl text-emerald-500 opacity-60">payments</span>
                </div>

                {/* Event card */}
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200/50 p-4 md:p-6 rounded-2xl shadow-sm hover:scale-[1.03] transition-transform duration-300 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-blue-600 tracking-wider">Total Events</span>
                    <h3 className="text-2xl md:text-3xl font-extrabold text-slate-800 mt-1">{stats.counts.events}</h3>
                  </div>
                  <span className="material-symbols-outlined text-3xl text-blue-500 opacity-60">event</span>
                </div>

                {/* Gallery Images card */}
                <div className="bg-gradient-to-br from-amber-50 to-amber-100 border border-amber-200/50 p-4 md:p-6 rounded-2xl shadow-sm hover:scale-[1.03] transition-transform duration-300 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-amber-600 tracking-wider">Gallery Images</span>
                    <h3 className="text-2xl md:text-3xl font-extrabold text-slate-800 mt-1">{stats.counts.gallery}</h3>
                  </div>
                  <span className="material-symbols-outlined text-3xl text-amber-500 opacity-60">photo_library</span>
                </div>

                {/* Total activities card */}
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200/50 p-4 md:p-6 rounded-2xl shadow-sm hover:scale-[1.03] transition-transform duration-300 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-purple-600 tracking-wider">Total Activities</span>
                    <h3 className="text-2xl md:text-3xl font-extrabold text-slate-800 mt-1">{stats.counts.activities}</h3>
                  </div>
                  <span className="material-symbols-outlined text-3xl text-purple-500 opacity-60">palette</span>
                </div>

                {/* Total mantras card */}
                <div className="bg-gradient-to-br from-rose-50 to-rose-100 border border-rose-200/50 p-4 md:p-6 rounded-2xl shadow-sm hover:scale-[1.03] transition-transform duration-300 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-rose-600 tracking-wider">Total Mantras</span>
                    <h3 className="text-2xl md:text-3xl font-extrabold text-slate-800 mt-1">{stats.counts.mantras}</h3>
                  </div>
                  <span className="material-symbols-outlined text-3xl text-rose-500 opacity-60">graphic_eq</span>
                </div>

                {/* Announcements card */}
                <div className="bg-gradient-to-br from-sky-50 to-sky-100 border border-sky-200/50 p-4 md:p-6 rounded-2xl shadow-sm hover:scale-[1.03] transition-transform duration-300 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-sky-600 tracking-wider">Announcements</span>
                    <h3 className="text-2xl md:text-3xl font-extrabold text-slate-800 mt-1">{stats.counts.announcements}</h3>
                  </div>
                  <span className="material-symbols-outlined text-3xl text-sky-500 opacity-60">campaign</span>
                </div>

                {/* Unique visitor count card */}
                <div className="bg-gradient-to-br from-violet-50 to-violet-100 border border-violet-200/50 p-4 md:p-6 rounded-2xl shadow-sm hover:scale-[1.03] transition-transform duration-300 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-violet-600 tracking-wider">Total Visitors</span>
                    <h3 className="text-2xl md:text-3xl font-extrabold text-slate-800 mt-1">{stats.visitors.total}</h3>
                  </div>
                  <span className="material-symbols-outlined text-3xl text-violet-500 opacity-60">bar_chart</span>
                </div>

                {/* Today visitors */}
                <div className="bg-gradient-to-br from-teal-50 to-teal-100 border border-teal-200/50 p-4 md:p-6 rounded-2xl shadow-sm hover:scale-[1.03] transition-transform duration-300 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-teal-600 tracking-wider">Today's Visitors</span>
                    <h3 className="text-2xl md:text-3xl font-extrabold text-slate-800 mt-1">{stats.visitors.today}</h3>
                  </div>
                  <span className="material-symbols-outlined text-3xl text-teal-500 opacity-60">show_chart</span>
                </div>

                {/* Monthly visitors */}
                <div className="bg-gradient-to-br from-cyan-50 to-cyan-100 border border-cyan-200/50 p-4 md:p-6 rounded-2xl shadow-sm hover:scale-[1.03] transition-transform duration-300 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-cyan-600 tracking-wider">This Month Visitors</span>
                    <h3 className="text-2xl md:text-3xl font-extrabold text-slate-800 mt-1">{stats.visitors.monthly}</h3>
                  </div>
                  <span className="material-symbols-outlined text-3xl text-cyan-500 opacity-60">calendar_month</span>
                </div>

                {/* Active mantras */}
                <div className="bg-gradient-to-br from-pink-50 to-pink-100 border border-pink-200/50 p-4 md:p-6 rounded-2xl shadow-sm hover:scale-[1.03] transition-transform duration-300 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-pink-600 tracking-wider">Active Mantras</span>
                    <h3 className="text-2xl md:text-3xl font-extrabold text-slate-800 mt-1">{stats.counts.activeMantras}</h3>
                  </div>
                  <span className="material-symbols-outlined text-3xl text-pink-500 opacity-60">music_note</span>
                </div>

                {/* Gallery categories count */}
                <div className="bg-gradient-to-br from-fuchsia-50 to-fuchsia-100 border border-fuchsia-200/50 p-4 md:p-6 rounded-2xl shadow-sm hover:scale-[1.03] transition-transform duration-300 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-fuchsia-600 tracking-wider">Gallery Categories</span>
                    <h3 className="text-2xl md:text-3xl font-extrabold text-slate-800 mt-1">{stats.counts.galleryCategoriesCount}</h3>
                  </div>
                  <span className="material-symbols-outlined text-3xl text-fuchsia-500 opacity-60">collections</span>
                </div>

              </div>
            ) : null}

            {/* CHARTS GRID SECTION */}
            {!statsLoading && stats && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Visitors graph */}
                <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-4">Unique Visitors Trend (Last 7 Days)</h3>
                  <SVGAreaChart data={stats.charts.visitorTrend} color="#3b82f6" gradId="visitorGrad" />
                </div>
                {/* Donations graph */}
                <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-4">Donation Receipts Trend (Last 6 Months)</h3>
                  <SVGBarChart data={stats.charts.donationsTrend} color="#10b981" />
                </div>
                {/* Event registrations */}
                <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-4">Event Competitions Registrations</h3>
                  <SVGBarChart data={stats.charts.eventRegsTrend} color="#f59e0b" />
                </div>
                {/* Gallery growth */}
                <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-4">Gallery Image Archives Growth</h3>
                  <SVGAreaChart data={stats.charts.galleryTrend} color="#8b5cf6" gradId="galleryGrad" />
                </div>
              </div>
            )}

            {/* NOTIFICATIONS WIDGET & HEALTH MONITOR SIDE-BY-SIDE */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Notifications Widget */}
              <div className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden flex flex-col">
                <div className="p-4 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-amber-500">notifications_active</span>
                    <h3 className="font-bold text-slate-900 text-sm font-serif">System Alerts Center</h3>
                  </div>
                  {unreadCount > 0 && (
                    <div className="flex items-center gap-2">
                      <span className="bg-amber-500 text-slate-950 font-black text-xs px-2 py-0.5 rounded-full">{unreadCount} New</span>
                      <button onClick={markAllNotifRead} className="text-xs text-amber-600 hover:text-amber-800 font-bold">Mark all read</button>
                    </div>
                  )}
                </div>
                <div className="flex-1 max-h-80 overflow-y-auto divide-y divide-slate-100 p-2 space-y-1">
                  {notifications.length === 0 ? (
                    <div className="text-center py-10 text-xs text-slate-400">
                      No notifications recorded. System is quiet. 😇
                    </div>
                  ) : (
                    notifications.map((notif, idx) => (
                      <div key={idx} className={`p-3 rounded-lg flex items-start gap-3 transition-colors ${notif.isRead ? "opacity-60 bg-transparent" : "bg-amber-500/5 border-l-4 border-amber-500"}`}>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-center gap-2">
                            <span className="text-xs font-bold text-slate-800 block truncate">{notif.title}</span>
                            <span className="text-[9px] text-slate-400 whitespace-nowrap shrink-0">{new Date(notif.createdAt).toLocaleTimeString()}</span>
                          </div>
                          <p className="text-xs text-slate-500 mt-1 leading-relaxed">{notif.message}</p>
                        </div>
                        {!notif.isRead && (
                          <button 
                            onClick={() => markNotifRead(notif._id)}
                            className="text-[10px] text-amber-600 hover:text-amber-800 font-bold shrink-0 self-center"
                          >
                            Read
                          </button>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* System Health Widget */}
              <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-4 border-b border-slate-100 pb-3">
                    <span className="material-symbols-outlined text-emerald-500">sensors</span>
                    <h3 className="font-bold text-slate-900 text-sm font-serif">System Health Monitor</h3>
                  </div>
                  {healthLoading || !health ? (
                    <div className="space-y-3 animate-pulse">
                      {[...Array(6)].map((_, i) => (
                        <div key={i} className="h-6 bg-slate-100 rounded" />
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-4 text-xs">
                      <div className="flex justify-between items-center">
                        <span className="text-slate-500 font-medium">Backend Server</span>
                        <span className="font-bold text-emerald-600">{health.backendStatus}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-500 font-medium">MongoDB Connection</span>
                        <span className="font-bold text-emerald-600">{health.mongodbStatus}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-500 font-medium">SMTP Gateway status</span>
                        <span className={`font-bold ${health.smtpStatus.includes("Connected") ? "text-emerald-600" : "text-rose-600"}`}>{health.smtpStatus}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-500 font-medium">Directory storage size (`uploads/`)</span>
                        <span className="font-bold text-slate-800">{health.storageUsage}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-500 font-medium">Server Uptime</span>
                        <span className="font-bold text-slate-800">{health.serverUptime}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-500 font-medium">Environment Mode</span>
                        <span className="font-bold text-amber-600 capitalize">{health.environment}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-500 font-medium">Node Version</span>
                        <span className="font-bold text-slate-800">{health.nodeVersion}</span>
                      </div>
                    </div>
                  )}
                </div>
                <div className="text-[10px] text-slate-400 mt-4 border-t border-slate-100 pt-3 text-center">
                  Auto-refreshes every 30 seconds
                </div>
              </div>

            </div>

          </div>
        )}

        {/* ========================================================
            TAB 2: SYSTEM TIMELINE ACTIVITY LOGS
            ======================================================== */}
        {activeTab === "timeline" && (
          <div className="space-y-6 animate-fade-in bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <h3 className="text-lg font-bold text-slate-800 mb-2 font-serif">Audit Activity Log Timeline</h3>
            
            {/* Filters */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-slate-50 rounded-xl border border-slate-200/50">
              <div>
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-1">Date Interval</label>
                <select 
                  value={dateFilter}
                  onChange={(e) => { setDateFilter(e.target.value); setActPage(1); }}
                  className="w-full text-xs p-2 border border-slate-200 rounded-lg bg-white"
                >
                  <option value="">All History</option>
                  <option value="Today">Today</option>
                  <option value="Week">This Week</option>
                  <option value="Month">This Month</option>
                </select>
              </div>
              <div>
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-1">Action keyword</label>
                <input 
                  type="text" 
                  placeholder="e.g. Created, Uploaded..." 
                  value={actionFilter}
                  onChange={(e) => { setActionFilter(e.target.value); setActPage(1); }}
                  className="w-full text-xs p-2 border border-slate-200 rounded-lg bg-white"
                />
              </div>
              <div>
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-1">User filter</label>
                <input 
                  type="text" 
                  placeholder="Username, Admin..." 
                  value={userFilter}
                  onChange={(e) => { setUserFilter(e.target.value); setActPage(1); }}
                  className="w-full text-xs p-2 border border-slate-200 rounded-lg bg-white"
                />
              </div>
              <div className="flex items-end">
                <button 
                  onClick={() => fetchActivityTimeline(1)}
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs py-2 px-4 rounded-lg flex items-center justify-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-sm">filter_alt</span> Apply filters
                </button>
              </div>
            </div>

            {/* List Table */}
            {actLoading ? (
              <div className="space-y-2 py-10 animate-pulse">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="h-10 bg-slate-100 rounded" />
                ))}
              </div>
            ) : activities.length === 0 ? (
              <div className="text-center py-20 text-sm text-slate-400">
                No logs recorded matching search queries.
              </div>
            ) : (
              <div className="overflow-x-auto border border-slate-100 rounded-xl">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-50 text-slate-600 font-bold uppercase tracking-wider border-b border-slate-100">
                      <th className="p-4">Actor</th>
                      <th className="p-4">Action</th>
                      <th className="p-4">Timestamp</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {activities.map((act, idx) => (
                      <tr key={idx} className="hover:bg-slate-50 transition-colors">
                        <td className="p-4 font-bold text-slate-800">{act.username}</td>
                        <td className="p-4 text-slate-600">{act.action}</td>
                        <td className="p-4 text-slate-400">{new Date(act.timestamp).toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Pagination Controls */}
            {actTotalPages > 1 && (
              <div className="flex justify-between items-center pt-4 border-t border-slate-100">
                <button
                  disabled={actPage === 1}
                  onClick={() => fetchActivityTimeline(actPage - 1)}
                  className="px-3 py-1.5 text-xs bg-slate-100 hover:bg-slate-200 disabled:opacity-50 text-slate-600 font-bold rounded-lg transition-colors cursor-pointer"
                >
                  Previous
                </button>
                <span className="text-xs text-slate-500 font-medium">Page {actPage} of {actTotalPages}</span>
                <button
                  disabled={actPage === actTotalPages}
                  onClick={() => fetchActivityTimeline(actPage + 1)}
                  className="px-3 py-1.5 text-xs bg-slate-100 hover:bg-slate-200 disabled:opacity-50 text-slate-600 font-bold rounded-lg transition-colors cursor-pointer"
                >
                  Next
                </button>
              </div>
            )}

          </div>
        )}

        {/* ========================================================
            TAB 3: HERO SECTION CMS
            ======================================================== */}
        {activeTab === "hero" && (
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-8 animate-fade-in">
            <h3 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-3 font-serif">Home Hero banner content setup</h3>
            
            <form onSubmit={handleHeroSubmit} className="space-y-6 text-xs">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Title Mr */}
                <div className="space-y-2">
                  <label className="font-bold text-slate-600">Marathi title (AMS Chhatrapati calligraphy code or Devnagari)</label>
                  <input
                    type="text"
                    value={heroForm.titleMr}
                    onChange={(e) => setHeroForm({ ...heroForm, titleMr: e.target.value })}
                    placeholder="e.g. ivaGnahtaa_ imaPa ma/DL"
                    className="w-full p-2.5 border border-slate-200 rounded-lg bg-[#FAF9F5] focus:outline-none focus:ring-2 focus:ring-amber-500"
                    required
                  />
                  <span className="text-[10px] text-slate-400 block">AMS Chhatrapati converts ASCII letters (e.g. ivaGnahtaa_) to Devnagari calligraphy. Standard Devnagari works as well.</span>
                </div>

                {/* Title En */}
                <div className="space-y-2">
                  <label className="font-bold text-slate-600">English title</label>
                  <input
                    type="text"
                    value={heroForm.titleEn}
                    onChange={(e) => setHeroForm({ ...heroForm, titleEn: e.target.value })}
                    className="w-full p-2.5 border border-slate-200 rounded-lg bg-[#FAF9F5] focus:outline-none focus:ring-2 focus:ring-amber-500"
                    required
                  />
                </div>

                {/* subMr */}
                <div className="space-y-2">
                  <label className="font-bold text-slate-600">Marathi sacred banner header</label>
                  <input
                    type="text"
                    value={heroForm.subMr}
                    onChange={(e) => setHeroForm({ ...heroForm, subMr: e.target.value })}
                    className="w-full p-2.5 border border-slate-200 rounded-lg bg-[#FAF9F5] focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                {/* subEn */}
                <div className="space-y-2">
                  <label className="font-bold text-slate-600">English sacred banner header</label>
                  <input
                    type="text"
                    value={heroForm.subEn}
                    onChange={(e) => setHeroForm({ ...heroForm, subEn: e.target.value })}
                    className="w-full p-2.5 border border-slate-200 rounded-lg bg-[#FAF9F5] focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                {/* subtitleMr */}
                <div className="space-y-2">
                  <label className="font-bold text-slate-600">Marathi subtitle tags (join items with • )</label>
                  <input
                    type="text"
                    value={heroForm.subtitleMr}
                    onChange={(e) => setHeroForm({ ...heroForm, subtitleMr: e.target.value })}
                    className="w-full p-2.5 border border-slate-200 rounded-lg bg-[#FAF9F5] focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                {/* subtitleEn */}
                <div className="space-y-2">
                  <label className="font-bold text-slate-600">English subtitle tags (join items with • )</label>
                  <input
                    type="text"
                    value={heroForm.subtitleEn}
                    onChange={(e) => setHeroForm({ ...heroForm, subtitleEn: e.target.value })}
                    className="w-full p-2.5 border border-slate-200 rounded-lg bg-[#FAF9F5] focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                {/* Countdown Date */}
                <div className="space-y-2">
                  <label className="font-bold text-slate-600">Timer target date (ISO format or blank to disable)</label>
                  <input
                    type="datetime-local"
                    value={heroForm.countdownDate}
                    onChange={(e) => setHeroForm({ ...heroForm, countdownDate: e.target.value })}
                    className="w-full p-2.5 border border-slate-200 rounded-lg bg-[#FAF9F5] focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                  <span className="text-[10px] text-slate-400 block">Sets a live countdown timer widget inside the Home hero section.</span>
                </div>

              </div>

              {/* Graphic Asset Uploads */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-slate-100 pt-6">
                
                <div className="space-y-2">
                  <label className="font-bold text-slate-600">Ganesha divine image overlay file (PNG with transparent background)</label>
                  <input 
                    type="file" 
                    onChange={(e) => setHeroFile(e.target.files[0])}
                    className="w-full"
                    accept="image/*"
                  />
                  {heroForm.heroImage && (
                    <div className="mt-2 h-16 w-16 border border-slate-200 rounded-lg overflow-hidden bg-slate-50">
                      <img src={`http://localhost:5000${heroForm.heroImage}`} alt="Ganesha setup" className="h-full w-full object-contain" />
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="font-bold text-slate-600">Background graphic overlay</label>
                  <input 
                    type="file" 
                    onChange={(e) => setBgFile(e.target.files[0])}
                    className="w-full"
                    accept="image/*"
                  />
                  {heroForm.bgImage && (
                    <div className="mt-2 h-16 w-32 border border-slate-200 rounded-lg overflow-hidden bg-slate-50">
                      <img src={`http://localhost:5000${heroForm.bgImage}`} alt="Background setup" className="h-full w-full object-cover" />
                    </div>
                  )}
                </div>

              </div>

              {/* CTA Buttons array */}
              <div className="border-t border-slate-100 pt-6 space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="font-bold text-slate-700 text-sm">Action CTA Buttons ({heroForm.buttons?.length || 0})</h4>
                  <button 
                    type="button" 
                    onClick={addHeroButton}
                    className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-sm">add_circle</span> Add Button
                  </button>
                </div>
                
                <div className="space-y-4">
                  {heroForm.buttons?.map((btn, idx) => (
                    <div key={idx} className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 border border-slate-200 rounded-xl bg-slate-50/50 items-end">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-500">Marathi label</label>
                        <input
                          type="text"
                          value={btn.textMr}
                          onChange={(e) => handleHeroButtonChange(idx, "textMr", e.target.value)}
                          className="w-full p-2 border border-slate-200 rounded-lg bg-white"
                          required
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-500">English label</label>
                        <input
                          type="text"
                          value={btn.textEn}
                          onChange={(e) => handleHeroButtonChange(idx, "textEn", e.target.value)}
                          className="w-full p-2 border border-slate-200 rounded-lg bg-white"
                          required
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-500">Target path/URL</label>
                        <input
                          type="text"
                          value={btn.link}
                          onChange={(e) => handleHeroButtonChange(idx, "link", e.target.value)}
                          className="w-full p-2 border border-slate-200 rounded-lg bg-white"
                          required
                        />
                      </div>
                      <div>
                        <button
                          type="button"
                          onClick={() => removeHeroButton(idx)}
                          className="w-full bg-rose-50 hover:bg-rose-100 text-rose-600 font-bold py-2 rounded-lg text-center transition-colors cursor-pointer"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end pt-4 border-t border-slate-100">
                <button
                  type="submit"
                  disabled={saveLoading}
                  className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-sm py-2.5 px-6 rounded-lg shadow-md transition-colors cursor-pointer"
                >
                  {saveLoading ? "Saving..." : "Save Hero Section Setup 💫"}
                </button>
              </div>

            </form>
          </div>
        )}

        {/* ========================================================
            TAB 4: WEBSITE CONFIGURATION SETTINGS
            ======================================================== */}
        {activeTab === "settings" && (
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-8 animate-fade-in">
            <h3 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-3 font-serif">Global website details setup</h3>
            
            <form onSubmit={handleSettingsSubmit} className="space-y-6 text-xs">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* websiteName */}
                <div className="space-y-2">
                  <label className="font-bold text-slate-600">Website Name</label>
                  <input
                    type="text"
                    value={settingsForm.websiteName}
                    onChange={(e) => setSettingsForm({ ...settingsForm, websiteName: e.target.value })}
                    className="w-full p-2.5 border border-slate-200 rounded-lg bg-[#FAF9F5] focus:outline-none focus:ring-2 focus:ring-amber-500"
                    required
                  />
                </div>

                {/* phoneNumber */}
                <div className="space-y-2">
                  <label className="font-bold text-slate-600">Contact phone numbers</label>
                  <input
                    type="text"
                    value={settingsForm.phoneNumber}
                    onChange={(e) => setSettingsForm({ ...settingsForm, phoneNumber: e.target.value })}
                    className="w-full p-2.5 border border-slate-200 rounded-lg bg-[#FAF9F5] focus:outline-none focus:ring-2 focus:ring-amber-500"
                    required
                  />
                </div>

                {/* email */}
                <div className="space-y-2">
                  <label className="font-bold text-slate-600">Public Contact Email</label>
                  <input
                    type="email"
                    value={settingsForm.email}
                    onChange={(e) => setSettingsForm({ ...settingsForm, email: e.target.value })}
                    className="w-full p-2.5 border border-slate-200 rounded-lg bg-[#FAF9F5] focus:outline-none focus:ring-2 focus:ring-amber-500"
                    required
                  />
                </div>

                {/* supportEmail */}
                <div className="space-y-2">
                  <label className="font-bold text-slate-600">Support / Admin email</label>
                  <input
                    type="email"
                    value={settingsForm.supportEmail}
                    onChange={(e) => setSettingsForm({ ...settingsForm, supportEmail: e.target.value })}
                    className="w-full p-2.5 border border-slate-200 rounded-lg bg-[#FAF9F5] focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                {/* addressMr */}
                <div className="space-y-2">
                  <label className="font-bold text-slate-600">Mandal address (Marathi)</label>
                  <input
                    type="text"
                    value={settingsForm.addressMr}
                    onChange={(e) => setSettingsForm({ ...settingsForm, addressMr: e.target.value })}
                    className="w-full p-2.5 border border-slate-200 rounded-lg bg-[#FAF9F5] focus:outline-none focus:ring-2 focus:ring-amber-500"
                    required
                  />
                </div>

                {/* addressEn */}
                <div className="space-y-2">
                  <label className="font-bold text-slate-600">Mandal address (English)</label>
                  <input
                    type="text"
                    value={settingsForm.addressEn}
                    onChange={(e) => setSettingsForm({ ...settingsForm, addressEn: e.target.value })}
                    className="w-full p-2.5 border border-slate-200 rounded-lg bg-[#FAF9F5] focus:outline-none focus:ring-2 focus:ring-amber-500"
                    required
                  />
                </div>

                {/* footerTextMr */}
                <div className="space-y-2">
                  <label className="font-bold text-slate-600">Footer tagline (Marathi)</label>
                  <input
                    type="text"
                    value={settingsForm.footerTextMr}
                    onChange={(e) => setSettingsForm({ ...settingsForm, footerTextMr: e.target.value })}
                    className="w-full p-2.5 border border-slate-200 rounded-lg bg-[#FAF9F5] focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                {/* footerTextEn */}
                <div className="space-y-2">
                  <label className="font-bold text-slate-600">Footer tagline (English)</label>
                  <input
                    type="text"
                    value={settingsForm.footerTextEn}
                    onChange={(e) => setSettingsForm({ ...settingsForm, footerTextEn: e.target.value })}
                    className="w-full p-2.5 border border-slate-200 rounded-lg bg-[#FAF9F5] focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                {/* copyrightMr */}
                <div className="space-y-2">
                  <label className="font-bold text-slate-600">Copyright label (Marathi)</label>
                  <input
                    type="text"
                    value={settingsForm.copyrightMr}
                    onChange={(e) => setSettingsForm({ ...settingsForm, copyrightMr: e.target.value })}
                    className="w-full p-2.5 border border-slate-200 rounded-lg bg-[#FAF9F5] focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                {/* copyrightEn */}
                <div className="space-y-2">
                  <label className="font-bold text-slate-600">Copyright label (English)</label>
                  <input
                    type="text"
                    value={settingsForm.copyrightEn}
                    onChange={(e) => setSettingsForm({ ...settingsForm, copyrightEn: e.target.value })}
                    className="w-full p-2.5 border border-slate-200 rounded-lg bg-[#FAF9F5] focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                {/* googleMapsLink */}
                <div className="space-y-2 md:col-span-2">
                  <label className="font-bold text-slate-600">Google Maps Iframe src URL link</label>
                  <textarea
                    rows="2"
                    value={settingsForm.googleMapsLink}
                    onChange={(e) => setSettingsForm({ ...settingsForm, googleMapsLink: e.target.value })}
                    className="w-full p-2.5 border border-slate-200 rounded-lg bg-[#FAF9F5] focus:outline-none focus:ring-2 focus:ring-amber-500 font-mono text-[10px]"
                    required
                  />
                </div>

              </div>

              {/* BRAND IMAGE UPLOADS */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-slate-100 pt-6">
                
                <div className="space-y-2">
                  <label className="font-bold text-slate-600">Upload website logo (Circular aspect recommended)</label>
                  <input 
                    type="file" 
                    onChange={(e) => setLogoFile(e.target.files[0])}
                    className="w-full"
                    accept="image/*"
                  />
                  {settingsForm.logoUrl && (
                    <div className="mt-2 h-16 w-16 border border-slate-200 rounded-full overflow-hidden bg-slate-50">
                      <img src={`http://localhost:5000${settingsForm.logoUrl}`} alt="Mandal logo setup" className="h-full w-full object-cover" />
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="font-bold text-slate-600">Upload site favicon file (PNG/ICO)</label>
                  <input 
                    type="file" 
                    onChange={(e) => setFavFile(e.target.files[0])}
                    className="w-full"
                    accept="image/*"
                  />
                  {settingsForm.faviconUrl && (
                    <div className="mt-2 h-10 w-10 border border-slate-200 rounded-lg overflow-hidden bg-slate-50 p-1">
                      <img src={`http://localhost:5000${settingsForm.faviconUrl}`} alt="favicon setup" className="h-full w-full object-contain" />
                    </div>
                  )}
                </div>

              </div>

              {/* SOCIAL PROFILES */}
              <div className="border-t border-slate-100 pt-6 space-y-4">
                <h4 className="font-bold text-slate-700 text-sm">Social Media coordinates</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  <div className="space-y-2">
                    <label className="font-bold text-slate-600">Facebook URL</label>
                    <input
                      type="text"
                      value={settingsForm.facebook}
                      onChange={(e) => setSettingsForm({ ...settingsForm, facebook: e.target.value })}
                      className="w-full p-2.5 border border-slate-200 rounded-lg bg-[#FAF9F5] focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="font-bold text-slate-600">Instagram URL</label>
                    <input
                      type="text"
                      value={settingsForm.instagram}
                      onChange={(e) => setSettingsForm({ ...settingsForm, instagram: e.target.value })}
                      className="w-full p-2.5 border border-slate-200 rounded-lg bg-[#FAF9F5] focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="font-bold text-slate-600">YouTube URL</label>
                    <input
                      type="text"
                      value={settingsForm.youtube}
                      onChange={(e) => setSettingsForm({ ...settingsForm, youtube: e.target.value })}
                      className="w-full p-2.5 border border-slate-200 rounded-lg bg-[#FAF9F5] focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="font-bold text-slate-600">Twitter/X URL</label>
                    <input
                      type="text"
                      value={settingsForm.twitter}
                      onChange={(e) => setSettingsForm({ ...settingsForm, twitter: e.target.value })}
                      className="w-full p-2.5 border border-slate-200 rounded-lg bg-[#FAF9F5] focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                </div>
              </div>

              <div className="flex justify-end pt-4 border-t border-slate-100">
                <button
                  type="submit"
                  disabled={saveLoading}
                  className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-sm py-2.5 px-6 rounded-lg shadow-md transition-colors cursor-pointer"
                >
                  {saveLoading ? "Saving..." : "Save website details ⚙️"}
                </button>
              </div>

            </form>
          </div>
        )}

        {/* ========================================================
            TAB 5: LEGACY ABOUT US & TIMELINE CMS
            ======================================================== */}
        {activeTab === "legacyAbout" && (
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6 animate-fade-in">
            <h3 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-3 font-serif">Edit About Us & Timeline Milestones</h3>
            
            <form onSubmit={handleLegacyAboutSubmit} className="space-y-6 text-xs">
              
              {/* ABOUT US MARATHI */}
              <div className="space-y-4">
                <h4 className="font-bold text-amber-600 text-sm border-b border-slate-100 pb-1">आमच्याबद्दल (About us - Marathi)</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-bold text-slate-600">Paragraph 1</label>
                    <textarea
                      rows="3"
                      value={aboutTimeline.aboutMr1}
                      onChange={(e) => setAboutTimeline({ ...aboutTimeline, aboutMr1: e.target.value })}
                      className="w-full p-2.5 border border-slate-200 rounded-lg bg-[#FAF9F5]"
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-bold text-slate-600">Paragraph 2</label>
                    <textarea
                      rows="3"
                      value={aboutTimeline.aboutMr2}
                      onChange={(e) => setAboutTimeline({ ...aboutTimeline, aboutMr2: e.target.value })}
                      className="w-full p-2.5 border border-slate-200 rounded-lg bg-[#FAF9F5]"
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-bold text-slate-600">Paragraph 3</label>
                    <textarea
                      rows="3"
                      value={aboutTimeline.aboutMr3}
                      onChange={(e) => setAboutTimeline({ ...aboutTimeline, aboutMr3: e.target.value })}
                      className="w-full p-2.5 border border-slate-200 rounded-lg bg-[#FAF9F5]"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-bold text-slate-600">Paragraph 4</label>
                    <textarea
                      rows="3"
                      value={aboutTimeline.aboutMr4}
                      onChange={(e) => setAboutTimeline({ ...aboutTimeline, aboutMr4: e.target.value })}
                      className="w-full p-2.5 border border-slate-200 rounded-lg bg-[#FAF9F5]"
                    />
                  </div>
                </div>
              </div>

              {/* ABOUT US ENGLISH */}
              <div className="space-y-4 pt-4 border-t border-slate-100">
                <h4 className="font-bold text-amber-600 text-sm border-b border-slate-100 pb-1">About us (English)</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-bold text-slate-600">Paragraph 1</label>
                    <textarea
                      rows="3"
                      value={aboutTimeline.aboutEn1}
                      onChange={(e) => setAboutTimeline({ ...aboutTimeline, aboutEn1: e.target.value })}
                      className="w-full p-2.5 border border-slate-200 rounded-lg bg-[#FAF9F5]"
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-bold text-slate-600">Paragraph 2</label>
                    <textarea
                      rows="3"
                      value={aboutTimeline.aboutEn2}
                      onChange={(e) => setAboutTimeline({ ...aboutTimeline, aboutEn2: e.target.value })}
                      className="w-full p-2.5 border border-slate-200 rounded-lg bg-[#FAF9F5]"
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-bold text-slate-600">Paragraph 3</label>
                    <textarea
                      rows="3"
                      value={aboutTimeline.aboutEn3}
                      onChange={(e) => setAboutTimeline({ ...aboutTimeline, aboutEn3: e.target.value })}
                      className="w-full p-2.5 border border-slate-200 rounded-lg bg-[#FAF9F5]"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-bold text-slate-600">Paragraph 4</label>
                    <textarea
                      rows="3"
                      value={aboutTimeline.aboutEn4}
                      onChange={(e) => setAboutTimeline({ ...aboutTimeline, aboutEn4: e.target.value })}
                      className="w-full p-2.5 border border-slate-200 rounded-lg bg-[#FAF9F5]"
                    />
                  </div>
                </div>
              </div>

              {/* GLORIOUS TIMELINE MILESTONES */}
              <div className="space-y-4 pt-4 border-t border-slate-100">
                <h4 className="font-bold text-amber-600 text-sm border-b border-slate-100 pb-1">गौरवशाली इतिहास (Timeline Milestones)</h4>
                
                <div className="space-y-4">
                  {/* 1990 */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="font-bold text-slate-600">Year 1990 Milestone (Marathi)</label>
                      <textarea
                        rows="2"
                        value={aboutTimeline.timeline1990Mr}
                        onChange={(e) => setAboutTimeline({ ...aboutTimeline, timeline1990Mr: e.target.value })}
                        className="w-full p-2.5 border border-slate-200 rounded-lg bg-[#FAF9F5]"
                        required
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="font-bold text-slate-600">Year 1990 Milestone (English)</label>
                      <textarea
                        rows="2"
                        value={aboutTimeline.timeline1990En}
                        onChange={(e) => setAboutTimeline({ ...aboutTimeline, timeline1990En: e.target.value })}
                        className="w-full p-2.5 border border-slate-200 rounded-lg bg-[#FAF9F5]"
                        required
                      />
                    </div>
                  </div>

                  {/* 2010 */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="font-bold text-slate-600">Year 2010 Milestone (Marathi)</label>
                      <textarea
                        rows="2"
                        value={aboutTimeline.timeline2010Mr}
                        onChange={(e) => setAboutTimeline({ ...aboutTimeline, timeline2010Mr: e.target.value })}
                        className="w-full p-2.5 border border-slate-200 rounded-lg bg-[#FAF9F5]"
                        required
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="font-bold text-slate-600">Year 2010 Milestone (English)</label>
                      <textarea
                        rows="2"
                        value={aboutTimeline.timeline2010En}
                        onChange={(e) => setAboutTimeline({ ...aboutTimeline, timeline2010En: e.target.value })}
                        className="w-full p-2.5 border border-slate-200 rounded-lg bg-[#FAF9F5]"
                        required
                      />
                    </div>
                  </div>

                  {/* 2024 */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="font-bold text-slate-600">Year 2024 Milestone (Marathi)</label>
                      <textarea
                        rows="2"
                        value={aboutTimeline.timeline2024Mr}
                        onChange={(e) => setAboutTimeline({ ...aboutTimeline, timeline2024Mr: e.target.value })}
                        className="w-full p-2.5 border border-slate-200 rounded-lg bg-[#FAF9F5]"
                        required
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="font-bold text-slate-600">Year 2024 Milestone (English)</label>
                      <textarea
                        rows="2"
                        value={aboutTimeline.timeline2024En}
                        onChange={(e) => setAboutTimeline({ ...aboutTimeline, timeline2024En: e.target.value })}
                        className="w-full p-2.5 border border-slate-200 rounded-lg bg-[#FAF9F5]"
                        required
                      />
                    </div>
                  </div>

                </div>
              </div>

              <div className="flex justify-end pt-4 border-t border-slate-100">
                <button
                  type="submit"
                  disabled={saveLoading}
                  className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-sm py-2.5 px-6 rounded-lg shadow-md transition-colors cursor-pointer"
                >
                  {saveLoading ? "Saving..." : "Save About Us & Timelines 🏛️"}
                </button>
              </div>

            </form>
          </div>
        )}

      </main>

    </div>
  );
};

export default Admin;