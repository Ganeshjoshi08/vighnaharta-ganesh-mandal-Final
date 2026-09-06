import { useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";
import mandalLogo from "../assets/mandallogo.png";

const Auth = () => {
  const [mode, setMode] = useState("login"); // 'login' | 'signup'

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    password: ""
  });

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    setErrorMsg("");
    setLoading(true);

    try {
      if (mode === "login") {
        if (!form.phone || !form.password) {
          setErrorMsg("कृपया मोबाईल नंबर आणि पासवर्ड टाका.");
          setLoading(false);
          return;
        }

        const res = await API.post("/auth/login", {
          phone: form.phone.trim(),
          password: form.password
        });

        localStorage.setItem("token", res.data.token);
        localStorage.setItem("isAdmin", String(res.data.isAdmin));
        localStorage.setItem("user", JSON.stringify(res.data.user));

        navigate(res.data.isAdmin ? "/admin" : "/");
      } else {
        // Direct Signup
        if (!form.firstName || !form.lastName || !form.phone || !form.password) {
          setErrorMsg("कृपया नाव, आडनाव, मोबाईल नंबर आणि पासवर्ड टाका.");
          setLoading(false);
          return;
        }

        if (form.phone.replace(/\D/g, "").length < 10) {
          setErrorMsg("कृपया वैध १० अंकी मोबाईल नंबर टाका.");
          setLoading(false);
          return;
        }

        if (form.password.length < 6) {
          setErrorMsg("पासवर्ड किमान ६ अक्षरांचा असावा.");
          setLoading(false);
          return;
        }

        const res = await API.post("/auth/signup", {
          firstName: form.firstName.trim(),
          lastName: form.lastName.trim(),
          phone: form.phone.trim(),
          password: form.password
        });

        localStorage.setItem("token", res.data.token);
        localStorage.setItem("isAdmin", String(res.data.isAdmin));
        localStorage.setItem("user", JSON.stringify(res.data.user));

        alert(res.data.msg || "साइन अप यशस्वी झाले! 🎉");
        navigate(res.data.isAdmin ? "/admin" : "/");
      }
    } catch (err) {
      console.error("Auth Error:", err);
      const backendError =
        err.response?.data?.msg ||
        err.response?.data?.message ||
        "लॉगिन / साइन अप करण्यात त्रुटी आली. कृपया पुन्हा प्रयत्न करा.";
      setErrorMsg(backendError);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#200b02] via-[#381403] to-[#1a0801] p-4 sm:p-6 font-serif">
      <div className="w-full max-w-md bg-white/95 rounded-3xl shadow-2xl border-2 border-[#D4AF37] p-8 sm:p-10 relative overflow-hidden backdrop-blur-md">
        
        {/* Subtle decorative background glow */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-amber-400/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-orange-600/10 rounded-full blur-2xl pointer-events-none" />

        {/* Logo & Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 mx-auto mb-3 bg-[#FAF8F2] p-2 rounded-2xl border border-[#D4AF37]/40 shadow-sm flex items-center justify-center">
            <img src={mandalLogo} alt="Mandal Logo" className="w-full h-full object-contain" />
          </div>
          <h1 className="text-2xl font-black text-[#4a1c02] tracking-wide">
            विघ्नहर्ता मित्र मंडळ
          </h1>
          <p className="text-xs text-neutral-500 font-sans mt-1">
            {mode === "login" ? "आपल्या खात्यामध्ये लॉगिन करा" : "नवीन खाते तयार करा"}
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex bg-[#FAF8F2] p-1 rounded-xl border border-neutral-200 mb-6 font-sans">
          <button
            type="button"
            onClick={() => {
              setMode("login");
              setErrorMsg("");
            }}
            className={`flex-1 py-2 rounded-lg text-sm font-bold transition ${
              mode === "login"
                ? "bg-[#4a1c02] text-[#FFE9A3] shadow-md"
                : "text-neutral-600 hover:text-neutral-900"
            }`}
          >
            लॉगिन (Login)
          </button>
          <button
            type="button"
            onClick={() => {
              setMode("signup");
              setErrorMsg("");
            }}
            className={`flex-1 py-2 rounded-lg text-sm font-bold transition ${
              mode === "signup"
                ? "bg-[#4a1c02] text-[#FFE9A3] shadow-md"
                : "text-neutral-600 hover:text-neutral-900"
            }`}
          >
            साइन अप (Sign Up)
          </button>
        </div>

        {/* Error Alert Message */}
        {errorMsg && (
          <div className="mb-5 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-sans font-medium flex items-center gap-2">
            <span>⚠️</span>
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 font-sans">
          {mode === "signup" && (
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-1">
                  नाव (First Name) *
                </label>
                <input
                  type="text"
                  placeholder="उदा. गणेश"
                  required
                  value={form.firstName}
                  onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 focus:border-[#D4AF37] focus:ring-2 focus:ring-amber-500/20 outline-none text-sm transition bg-white"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-1">
                  आडनाव (Last Name) *
                </label>
                <input
                  type="text"
                  placeholder="उदा. जोशी"
                  required
                  value={form.lastName}
                  onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 focus:border-[#D4AF37] focus:ring-2 focus:ring-amber-500/20 outline-none text-sm transition bg-white"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-neutral-700 mb-1">
              मोबाईल नंबर (Mobile Number) *
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-2.5 text-neutral-400 text-sm">📱</span>
              <input
                type="tel"
                placeholder="10-digit number (उदा. 9876543210)"
                required
                maxLength={10}
                value={form.phone}
                onChange={(e) =>
                  setForm({ ...form, phone: e.target.value.replace(/\D/g, "") })
                }
                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-neutral-300 focus:border-[#D4AF37] focus:ring-2 focus:ring-amber-500/20 outline-none text-sm transition bg-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-neutral-700 mb-1">
              पासवर्ड (Password) *
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-2.5 text-neutral-400 text-sm">🔒</span>
              <input
                type="password"
                placeholder="किमान ६ अक्षरे"
                required
                minLength={6}
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-neutral-300 focus:border-[#D4AF37] focus:ring-2 focus:ring-amber-500/20 outline-none text-sm transition bg-white"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-3 bg-gradient-to-r from-[#4a1c02] via-[#612403] to-[#4a1c02] text-[#FFE9A3] hover:from-[#381403] hover:to-[#381403] rounded-xl font-bold text-sm tracking-wide uppercase border border-[#D4AF37]/60 shadow-lg hover:shadow-xl transition transform active:scale-98 disabled:opacity-70 cursor-pointer"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="animate-spin text-base">⏳</span> कृपया प्रतीक्षा करा...
              </span>
            ) : mode === "login" ? (
              "लॉगिन करा (Login)"
            ) : (
              "साइन अप करा (Sign Up)"
            )}
          </button>
        </form>

        {/* Footer switch prompt */}
        <div className="text-center mt-6 pt-4 border-t border-neutral-200 text-xs text-neutral-600 font-sans">
          {mode === "login" ? (
            <p>
              खाते नाही का?{" "}
              <button
                type="button"
                onClick={() => {
                  setMode("signup");
                  setErrorMsg("");
                }}
                className="text-[#4a1c02] font-bold hover:underline ml-1"
              >
                नवीन खाते तयार करा (Sign Up)
              </button>
            </p>
          ) : (
            <p>
              आधीच खाते आहे?{" "}
              <button
                type="button"
                onClick={() => {
                  setMode("login");
                  setErrorMsg("");
                }}
                className="text-[#4a1c02] font-bold hover:underline ml-1"
              >
                येथे लॉगिन करा (Login)
              </button>
            </p>
          )}
        </div>

      </div>
    </div>
  );
};

export default Auth;