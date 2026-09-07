import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api/api";

const ManageAnnouncements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState({ type: "", text: "" });

  // Form states
  const [editingId, setEditingId] = useState(null);
  const [messageMr, setMessageMr] = useState("");
  const [messageEn, setMessageEn] = useState("");
  const [buttonTextMr, setButtonTextMr] = useState("येथे क्लिक करा");
  const [buttonTextEn, setButtonTextEn] = useState("Click Here");
  const [buttonLink, setButtonLink] = useState("/schedule");
  const [showButton, setShowButton] = useState(true);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    setLoading(true);
    try {
      const res = await API.get("/announcements");
      setAnnouncements(res.data || []);
    } catch (err) {
      console.error("Error fetching announcements:", err);
    } finally {
      setLoading(false);
    }
  };

  const showToast = (type, text) => {
    setMsg({ type, text });
    setTimeout(() => setMsg({ type: "", text: "" }), 4000);
  };

  const resetForm = () => {
    setEditingId(null);
    setMessageMr("");
    setMessageEn("");
    setButtonTextMr("येथे क्लिक करा");
    setButtonTextEn("Click Here");
    setButtonLink("/schedule");
    setShowButton(true);
    setIsActive(true);
  };

  // Preset: Smart Ganeshotsav 2026 Schedule
  const applySchedulePreset = () => {
    setMessageMr("गणेशोत्सवातील विविध धार्मिक व सांस्कृतिक कार्यक्रमांचे वेळापत्रक");
    setMessageEn("Schedule of various religious & cultural programs of Ganeshotsav 2026");
    setButtonTextMr("येथे क्लिक करा");
    setButtonTextEn("Click Here");
    setButtonLink("/schedule");
    setShowButton(true);
    setIsActive(true);
  };

  // Preset: General Festive Notice
  const applyFestivalPreset = () => {
    setMessageMr("श्री गणेश जयंती व माघी गणेशोत्सव २०२६ चे भव्य नियोजन सुरू! अधिक माहितीसाठी संपर्क साधा.");
    setMessageEn("Grand planning for Shree Ganesh Jayanti & Maghi Ganeshotsav 2026 is underway! Contact us soon.");
    setButtonTextMr("अधिक माहिती");
    setButtonTextEn("Learn More");
    setButtonLink("/events");
    setShowButton(true);
    setIsActive(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const finalMsg = messageMr.trim() || messageEn.trim();
    if (!finalMsg) {
      showToast("error", "घोषणा संदेश (Announcement message) आवश्यक आहे!");
      return;
    }

    const payload = {
      message: finalMsg,
      messageMr: messageMr.trim() || finalMsg,
      messageEn: messageEn.trim() || finalMsg,
      buttonText: buttonTextMr.trim() || "येथे क्लिक करा",
      buttonTextEn: buttonTextEn.trim() || "Click Here",
      buttonLink: buttonLink.trim() || "/schedule",
      showButton,
      active: isActive
    };

    try {
      if (editingId) {
        await API.put(`/announcements/${editingId}`, payload);
        showToast("success", "घोषणा यशस्वीरित्या अपडेट केली! (Announcement Updated Successfully) ✅");
      } else {
        await API.post("/announcements", payload);
        showToast("success", "नवीन घोषणा यशस्वीरित्या प्रसिद्ध केली! (Announcement Published) ✅");
      }
      resetForm();
      fetchAnnouncements();
    } catch (err) {
      console.error("Error saving announcement:", err);
      showToast("error", "घोषणा सेव्ह करताना त्रुटी आली ❌");
    }
  };

  const handleEdit = (ann) => {
    setEditingId(ann._id);
    setMessageMr(ann.messageMr || ann.message || "");
    setMessageEn(ann.messageEn || ann.message || "");
    setButtonTextMr(ann.buttonText || "येथे क्लिक करा");
    setButtonTextEn(ann.buttonTextEn || "Click Here");
    setButtonLink(ann.buttonLink || "/schedule");
    setShowButton(ann.showButton !== false);
    setIsActive(ann.active !== false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleToggleActive = async (ann) => {
    try {
      await API.put(`/announcements/${ann._id}`, {
        active: !ann.active
      });
      showToast("success", `घोषणा ${!ann.active ? "सक्रिय (Active)" : "निष्क्रिय (Inactive)"} केली! ✅`);
      fetchAnnouncements();
    } catch (err) {
      console.error("Error toggling active state:", err);
      showToast("error", "स्टेटस बदलण्यात त्रुटी ❌");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("तुम्हाला खात्री आहे का ही घोषणा हटवायची आहे? (Are you sure you want to delete this announcement?)")) {
      return;
    }

    try {
      await API.delete(`/announcements/${id}`);
      showToast("success", "घोषणा हटवली! (Announcement Deleted) ✅");
      if (editingId === id) resetForm();
      fetchAnnouncements();
    } catch (err) {
      console.error("Error deleting announcement:", err);
      showToast("error", "हटवताना त्रुटी आली ❌");
    }
  };

  // Preview computation
  const previewText = messageMr.trim() || "गणेशोत्सवातील विविध धार्मिक व सांस्कृतिक कार्यक्रमांचे वेळापत्रक";
  const previewBtn = buttonTextMr.trim() || "येथे क्लिक करा";

  return (
    <div className="min-h-screen bg-slate-50 pt-28 pb-16 font-sans">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-6">
        
        {/* TOP HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">📢</span>
              <h1 className="text-2xl font-black text-slate-900 tracking-tight">
                वेबसाईट घोषणा व्यवस्थापन (Announcement Management)
              </h1>
            </div>
            <p className="text-sm text-slate-500 mt-1">
              वेबसाईटवरील शीर्षस्थ पिवळ्या पट्टीतील (Announcement Bar) घोषणा, लिंक व बटण व्यवस्थापित करा.
            </p>
          </div>

          <Link
            to="/admin"
            className="inline-flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-4 py-2 rounded-xl text-sm transition-all shadow-sm"
          >
            <span className="material-symbols-outlined text-base">arrow_back</span>
            ॲडमिन डॅशबोर्ड (Dashboard)
          </Link>
        </div>

        {/* TOAST NOTIFICATION */}
        {msg.text && (
          <div
            className={`p-4 rounded-xl text-sm font-bold flex items-center justify-between transition-all ${
              msg.type === "success"
                ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                : "bg-rose-50 text-rose-800 border border-rose-200"
            }`}
          >
            <span>{msg.text}</span>
            <button onClick={() => setMsg({ type: "", text: "" })} className="text-xs opacity-75 hover:opacity-100">
              ✕
            </button>
          </div>
        )}

        {/* LIVE PREVIEW BANNER CARD */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black uppercase text-amber-700 tracking-wider flex items-center gap-1.5">
              <span className="material-symbols-outlined text-sm">visibility</span>
              थेट पूर्वावलोकन (Live Preview on Website)
            </span>
            <span className="text-[11px] font-semibold text-slate-400">
              {isActive ? "🟢 Active Banner" : "⚪ Draft / Inactive"}
            </span>
          </div>

          <div className="w-full bg-gradient-to-r from-[#D4AF37] via-[#FFDF73] to-[#D4AF37] text-[#200b02] font-bold py-2.5 px-4 rounded-xl text-center text-xs sm:text-sm shadow border border-[#B8860B]/40">
            <div className="flex flex-wrap items-center justify-center gap-3">
              <div className="flex items-center gap-2">
                <span className="text-base animate-pulse">📢</span>
                <span className="font-black text-neutral-900 drop-shadow-sm">{previewText}</span>
              </div>
              {showButton && (
                <div className="inline-flex items-center gap-1 bg-[#380b02] text-[#FFE9A3] px-3 py-1 rounded-full text-[11px] font-black shadow border border-[#D4AF37]">
                  <span>{previewBtn}</span>
                  <span className="text-[10px]">➔</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* QUICK PRESETS */}
        <div className="bg-amber-50/60 p-4 rounded-2xl border border-amber-200/80 flex flex-wrap items-center justify-between gap-3">
          <div className="text-xs font-bold text-amber-900">
            ⚡ जलद पर्याय (Quick Presets):
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={applySchedulePreset}
              className="bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-sm transition-all flex items-center gap-1"
            >
              <span>📅</span>
              गणेशोत्सव २०२६ वेळापत्रक (Schedule Default)
            </button>
            <button
              type="button"
              onClick={applyFestivalPreset}
              className="bg-white hover:bg-amber-100 text-amber-900 border border-amber-300 text-xs font-bold px-3 py-1.5 rounded-lg shadow-sm transition-all flex items-center gap-1"
            >
              <span>🪔</span>
              सण / उत्सव घोषणा (Festival Event)
            </button>
          </div>
        </div>

        {/* ADD / EDIT FORM */}
        <form onSubmit={handleSave} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h2 className="text-lg font-black text-slate-900">
              {editingId ? "✏️ घोषणा संपादित करा (Edit Announcement)" : "➕ नवीन घोषणा जोडा (Add New Announcement)"}
            </h2>
            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="text-xs font-bold text-slate-500 hover:text-slate-800 underline"
              >
                रद्द करा (Cancel Edit)
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Marathi Message */}
            <div className="md:col-span-2 space-y-1.5">
              <label className="block text-xs font-bold text-slate-700">
                घोषणा मजकूर - मराठी (Marathi Announcement Text) <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={messageMr}
                onChange={(e) => setMessageMr(e.target.value)}
                placeholder="उदा. गणेशोत्सवातील विविध धार्मिक व सांस्कृतिक कार्यक्रमांचे वेळापत्रक"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none text-sm font-medium"
                required
              />
            </div>

            {/* English Message */}
            <div className="md:col-span-2 space-y-1.5">
              <label className="block text-xs font-bold text-slate-700">
                घोषणा मजकूर - इंग्रजी (English Announcement Text - Optional)
              </label>
              <input
                type="text"
                value={messageEn}
                onChange={(e) => setMessageEn(e.target.value)}
                placeholder="e.g. Schedule of various religious & cultural programs of Ganeshotsav 2026"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none text-sm font-medium"
              />
            </div>

            {/* Button Settings */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700">
                बटणावरील मजकूर (Button Text - Marathi)
              </label>
              <input
                type="text"
                value={buttonTextMr}
                onChange={(e) => setButtonTextMr(e.target.value)}
                placeholder="उदा. येथे क्लिक करा"
                className="w-full px-4 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none text-sm font-medium"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700">
                Button Text (English)
              </label>
              <input
                type="text"
                value={buttonTextEn}
                onChange={(e) => setButtonTextEn(e.target.value)}
                placeholder="e.g. Click Here"
                className="w-full px-4 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none text-sm font-medium"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700">
                बटण लिंक / Destination URL
              </label>
              <input
                type="text"
                value={buttonLink}
                onChange={(e) => setButtonLink(e.target.value)}
                placeholder="उदा. /schedule किंवा /events"
                className="w-full px-4 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none text-sm font-mono text-xs"
              />
            </div>

            <div className="flex items-center gap-6 pt-4">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={showButton}
                  onChange={(e) => setShowButton(e.target.checked)}
                  className="w-4 h-4 text-amber-600 rounded focus:ring-amber-500"
                />
                <span className="text-xs font-bold text-slate-700">बटण दाखवा (Show Button)</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={isActive}
                  onChange={(e) => setIsActive(e.target.checked)}
                  className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
                />
                <span className="text-xs font-bold text-slate-700">सक्रिय ठेवा (Active on Site)</span>
              </label>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 text-sm font-bold hover:bg-slate-50 transition"
              >
                रद्द करा (Cancel)
              </button>
            )}
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-black text-sm shadow-md hover:shadow-lg transition-all transform active:scale-95"
            >
              {editingId ? "अपडेट करा (Save Changes)" : "प्रसिद्ध करा (Publish Announcement)"}
            </button>
          </div>
        </form>

        {/* ALL ANNOUNCEMENTS LIST */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-black text-slate-900 flex items-center gap-2">
              <span>📋</span>
              सर्व घोषणांची यादी (All Announcements History) ({announcements.length})
            </h2>
            <button
              onClick={fetchAnnouncements}
              className="text-xs font-bold text-amber-700 hover:underline flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-sm">refresh</span>
              रिफ्रेश करा
            </button>
          </div>

          {loading ? (
            <div className="text-center py-8 text-sm text-slate-400">लोड होत आहे... (Loading...)</div>
          ) : announcements.length === 0 ? (
            <div className="text-center py-8 bg-slate-50 rounded-xl border border-dashed border-slate-200 space-y-2">
              <p className="text-sm font-bold text-slate-600">कोणतीही कस्टम घोषणा उपलब्ध नाही.</p>
              <p className="text-xs text-slate-400">
                वेबसाईटवर सध्या डीफॉल्ट **गणेशोत्सवातील विविध धार्मिक व सांस्कृतिक कार्यक्रमांचे वेळापत्रक** दाखवले जात आहे.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {announcements.map((ann) => {
                const isItemActive = ann.active !== false;
                const displayText = ann.messageMr || ann.message || ann.messageEn;
                return (
                  <div
                    key={ann._id}
                    className={`p-4 rounded-xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                      isItemActive
                        ? "bg-amber-50/40 border-amber-300/80 shadow-sm"
                        : "bg-slate-50 border-slate-200 opacity-75"
                    }`}
                  >
                    <div className="space-y-1.5 flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${
                            isItemActive
                              ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                              : "bg-slate-200 text-slate-600"
                          }`}
                        >
                          {isItemActive ? "🟢 Active (चालू)" : "⚪ Inactive (बंद)"}
                        </span>

                        {ann.buttonLink && (
                          <span className="text-[10px] font-mono bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                            🔗 {ann.buttonLink}
                          </span>
                        )}
                      </div>

                      <p className="font-bold text-slate-900 text-sm">{displayText}</p>

                      {ann.messageEn && ann.messageEn !== displayText && (
                        <p className="text-xs text-slate-500 font-medium">{ann.messageEn}</p>
                      )}
                    </div>

                    <div className="flex items-center gap-2 flex-shrink-0">
                      {/* Toggle Active Switch */}
                      <button
                        type="button"
                        onClick={() => handleToggleActive(ann)}
                        className={`text-xs font-bold px-3 py-1.5 rounded-lg border transition ${
                          isItemActive
                            ? "bg-amber-100 hover:bg-amber-200 text-amber-900 border-amber-300"
                            : "bg-emerald-100 hover:bg-emerald-200 text-emerald-900 border-emerald-300"
                        }`}
                        title="Toggle Active Status"
                      >
                        {isItemActive ? "बंद करा (Deactivate)" : "चालू करा (Activate)"}
                      </button>

                      {/* Edit */}
                      <button
                        type="button"
                        onClick={() => handleEdit(ann)}
                        className="bg-slate-100 hover:bg-slate-200 text-slate-700 p-2 rounded-lg transition"
                        title="Edit"
                      >
                        <span className="material-symbols-outlined text-base">edit</span>
                      </button>

                      {/* Delete */}
                      <button
                        type="button"
                        onClick={() => handleDelete(ann._id)}
                        className="bg-rose-50 hover:bg-rose-100 text-rose-600 p-2 rounded-lg transition"
                        title="Delete"
                      >
                        <span className="material-symbols-outlined text-base">delete</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default ManageAnnouncements;