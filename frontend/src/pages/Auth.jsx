import { useState, useEffect } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const [mode, setMode] = useState("login");

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    otp: "",
    newPassword: ""
  });

  const [loading, setLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);

  const navigate = useNavigate();

  // Handle Resend OTP Countdown
  useEffect(() => {
    let interval;
    if (resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [resendTimer]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;
    setLoading(true);

    try {
      if (mode === "login") {
        const res = await API.post("/auth/login", {
          email: form.email.toLowerCase().trim(),
          password: form.password
        });

        localStorage.setItem("token", res.data.token);
        localStorage.setItem("isAdmin", String(res.data.isAdmin));
        localStorage.setItem("user", JSON.stringify(res.data.user));

        navigate(res.data.isAdmin ? "/admin" : "/");
      }

      else if (mode === "signup") {
        const res = await API.post("/auth/signup", {
          name: form.name,
          email: form.email.toLowerCase().trim(),
          password: form.password
        });

        alert(res.data.msg || "OTP sent to email 📧");
        setResendTimer(60);
        setMode("verify");
      }

      else if (mode === "verify") {
        const res = await API.post("/auth/verify-otp", {
          email: form.email.toLowerCase().trim(),
          otp: form.otp
        });

        alert(res.data.msg || "Account verified ✅");
        setMode("login");
      }

      else if (mode === "forgot") {
        const res = await API.post("/auth/forgot-password", {
          email: form.email.toLowerCase().trim(),
        });

        alert(res.data.msg || "OTP sent 📧");
        setResendTimer(60);
        setMode("reset");
      }

      else if (mode === "reset") {
        const res = await API.post("/auth/reset-password", {
          email: form.email.toLowerCase().trim(),
          otp: form.otp,
          newPassword: form.newPassword
        });

        alert(res.data.msg || "Password reset successful 🔥");
        setMode("login");
      }

    } catch (err) {
      console.error("Auth Request Error:", err);
      // Display the exact backend error message or Axios network error
      const backendError = err.response?.data?.msg || err.response?.data?.message || err.message || "Connection failed. Please try again.";
      alert(backendError);
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    if (loading || resendTimer > 0) return;
    setLoading(true);

    try {
      const res = await API.post("/auth/resend-otp", {
        email: form.email.toLowerCase().trim()
      });
      alert(res.data.msg || "OTP resent successfully! 📧");
      setResendTimer(60);
    } catch (err) {
      console.error("Resend OTP Error:", err);
      const backendError = err.response?.data?.msg || err.response?.data?.message || err.message || "Failed to resend OTP.";
      alert(backendError);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={container}>
      <form
        onSubmit={handleSubmit}
        style={card}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow =
            "0 30px 70px rgba(255,122,0,0.35)";
          e.currentTarget.style.transform = "translateY(-5px)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow =
            "0 20px 40px rgba(255,122,0,0.15)";
          e.currentTarget.style.transform = "translateY(0)";
        }}
      >
        <h2 style={title}>
          {mode === "login" && "Welcome Back 👋"}
          {mode === "signup" && "Create Account 🚀"}
          {mode === "verify" && "Verify OTP 🔢"}
          {mode === "forgot" && "Forgot Password 🔁"}
          {mode === "reset" && "Reset Password 🔒"}
        </h2>

        {mode === "signup" && (
          <input
            placeholder="Name"
            style={input}
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />
        )}

        <input
          type="email"
          placeholder="Email"
          style={input}
          value={form.email}
          onChange={(e) =>
            setForm({
              ...form,
              email: e.target.value.toLowerCase()
            })
          }
        />

        {(mode === "login" || mode === "signup") && (
          <input
            type="password"
            placeholder="Password"
            style={input}
            value={form.password}
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
          />
        )}

        {(mode === "verify" || mode === "reset") && (
          <div style={{ width: "100%", textAlign: "left" }}>
            <input
              placeholder="Enter OTP"
              style={input}
              value={form.otp}
              onChange={(e) =>
                setForm({ ...form, otp: e.target.value })
              }
            />
            <p style={{ fontSize: "11px", color: "#8f4e00", margin: "2px 0 10px 4px", fontWeight: "600" }}>
              * OTP is valid for 10 minutes. Check your inbox & spam.
            </p>
            
            <div style={{ textAlign: "right", paddingRight: "4px" }}>
              {resendTimer > 0 ? (
                <span style={{ fontSize: "12px", color: "#888", fontWeight: "bold" }}>
                  Resend OTP in {resendTimer}s
                </span>
              ) : (
                <span
                  onClick={handleResendOTP}
                  style={resendBtnStyle}
                >
                  Resend OTP
                </span>
              )}
            </div>
          </div>
        )}

        {mode === "reset" && (
          <input
            type="password"
            placeholder="New Password"
            style={input}
            value={form.newPassword}
            onChange={(e) =>
              setForm({ ...form, newPassword: e.target.value })
            }
          />
        )}

        <button style={btn} disabled={loading}>
          {loading ? "Please wait..." : (
            mode === "login" ? "Login" :
            mode === "signup" ? "Signup" :
            mode === "verify" ? "Verify OTP" :
            mode === "forgot" ? "Send OTP" :
            "Reset Password"
          )}
        </button>

        <p style={switchText}>
          {mode === "login" && (
            <>
              Don't have account?
              <span onClick={() => setMode("signup")} style={switchBtn}>
                Signup
              </span>
            </>
          )}

          {mode === "signup" && (
            <>
              Already have account?
              <span onClick={() => setMode("login")} style={switchBtn}>
                Login
              </span>
            </>
          )}

          {mode === "login" && (
            <>
              <br />
              <span onClick={() => setMode("forgot")} style={switchBtn}>
                Forgot Password?
              </span>
            </>
          )}

          {(mode === "forgot" || mode === "reset" || mode === "verify") && (
            <>
              <br />
              <span onClick={() => setMode("login")} style={switchBtn}>
                Back to Login
              </span>
            </>
          )}
        </p>
      </form>
    </div>
  );
};

/* 🔥 WHITE BACKGROUND */

const container = {
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "#ffffff",
  padding: "20px"
};

const card = {
  padding: "40px",
  borderRadius: "18px",
  maxWidth: "360px",
  width: "100%",
  textAlign: "center",
  background: "#ffffff",
  border: "1px solid #eee",
  boxShadow: "0 20px 40px rgba(0,0,0,0.08)",
  transition: "all 0.3s ease"
};

const title = {
  marginBottom: "20px",
  color: "#ff5a00",
  fontWeight: "700"
};

const input = {
  width: "100%",
  padding: "12px",
  margin: "10px 0",
  borderRadius: "10px",
  border: "1px solid #ffd6bf",
  background: "#fff",
  color: "#333",
  outline: "none",
  transition: "0.3s",
  boxShadow: "0 2px 6px rgba(255,122,0,0.08)"
};

const btn = {
  width: "100%",
  padding: "12px",
  borderRadius: "999px",
  border: "none",
  marginTop: "15px",
  background: "linear-gradient(135deg,#ff7a00,#ff3c00)",
  color: "#fff",
  fontWeight: "bold",
  cursor: "pointer",
  boxShadow: "0 8px 20px rgba(255,122,0,0.3)",
  transition: "0.3s"
};

const switchText = {
  marginTop: "15px",
  color: "#777"
};

const switchBtn = {
  color: "#ff6a00",
  cursor: "pointer",
  fontWeight: "bold",
  marginLeft: "5px"
};

const resendBtnStyle = {
  cursor: "pointer",
  fontSize: "12px",
  color: "#ff7a00",
  fontWeight: "bold",
  textDecoration: "underline"
};

export default Auth;