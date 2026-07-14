import { useState, useEffect } from "react";
import API from "../api/api";

const Donation = () => {

  const [form, setForm] = useState({
    name: "",
    amount: "",
    message: ""
  });

  const [loading, setLoading] = useState(false);

  const [lang, setLang] = useState(localStorage.getItem("lang") || "marathi");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user?.name) {
      setForm((prev) => ({ ...prev, name: user.name }));
    }
  }, []);

  const text = {
    marathi: {
      title: "💰 मंडळाला मदत करा",
      name: "तुमचे नाव",
      amount: "रक्कम (₹)",
      message: "संदेश (ऐच्छिक)",
      btn: "दान करा ❤️",
      processing: "प्रक्रिया सुरू आहे...",
      success: "🙏 तुमच्या दानासाठी धन्यवाद!",
      error1: "नाव आणि रक्कम आवश्यक आहे ❌",
      error2: "योग्य रक्कम टाका ❌",
      failed: "दान अयशस्वी ❌"
    },
    english: {
      title: "💰 Support the Mandal",
      name: "Your Name",
      amount: "Amount (₹)",
      message: "Message (optional)",
      btn: "Donate Now ❤️",
      processing: "Processing...",
      success: "🙏 Thank you for your donation!",
      error1: "Name and amount required ❌",
      error2: "Enter valid amount ❌",
      failed: "Donation failed ❌"
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.amount) {
      return alert(text[lang].error1);
    }

    if (Number(form.amount) <= 0) {
      return alert(text[lang].error2);
    }

    try {
      setLoading(true);

      await API.post("/donations", {
        name: form.name,
        amount: Number(form.amount),
        message: form.message
      });

      alert(text[lang].success);

      setForm({
        name: form.name,
        amount: "",
        message: ""
      });

    } catch (err) {
      console.log(err);
      alert(err.response?.data?.msg || text[lang].failed);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={container}>
      <form onSubmit={handleSubmit} style={card}>
        <h2 style={title}>{text[lang].title}</h2>

        <input
          placeholder={text[lang].name}
          style={input}
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />

        <input
          type="number"
          placeholder={text[lang].amount}
          style={input}
          value={form.amount}
          onChange={(e) =>
            setForm({ ...form, amount: e.target.value })
          }
        />

        <textarea
          placeholder={text[lang].message}
          style={textarea}
          value={form.message}
          onChange={(e) =>
            setForm({ ...form, message: e.target.value })
          }
        />

        <button style={btn} disabled={loading}>
          {loading ? text[lang].processing : text[lang].btn}
        </button>
      </form>
    </div>
  );
};

/* ✅ WHITE UI */

const container = {
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "#f9fafb",
  padding: "20px"
};

const card = {
  padding: "40px",
  borderRadius: "16px",
  width: "350px",
  textAlign: "center",
  background: "#ffffff",
  border: "1px solid #eee",
  boxShadow: "0 10px 30px rgba(0,0,0,0.08)"
};

const title = {
  marginBottom: "20px",
  color: "#111"
};

const input = {
  width: "100%",
  padding: "12px",
  margin: "10px 0",
  borderRadius: "10px",
  border: "1px solid #ddd",
  background: "#fff",
  color: "#333",
  outline: "none"
};

const textarea = {
  ...input,
  minHeight: "80px",
  resize: "none"
};

const btn = {
  width: "100%",
  padding: "12px",
  borderRadius: "999px",
  border: "none",
  marginTop: "10px",
  background: "linear-gradient(135deg,#ff7a00,#ff3c00)",
  color: "#fff",
  fontWeight: "bold",
  cursor: "pointer"
};

export default Donation;