import React, { useEffect, useState } from "react";
import API from "../api/api";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const [lang, setLang] = useState(localStorage.getItem("lang") || "marathi");

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await API.get("/events");

      // ✅ SAME FIX (unchanged)
      setEvents(res.data.events || res.data);

    } catch (err) {
      console.log(err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  const text = {
    marathi: {
      title: "🎉 येणारे कार्यक्रम",
      loading: "लोड होत आहे...",
      noEvents: "कोणतेही कार्यक्रम उपलब्ध नाहीत"
    },
    english: {
      title: "🎉 Upcoming Events",
      loading: "Loading events...",
      noEvents: "No events available"
    }
  };

  return (
    <div style={container}>
      
      <h1 style={title}>{text[lang].title}</h1>

      {loading ? (
        <p style={loadingText}>{text[lang].loading}</p>
      ) : (
        <div style={grid}>
          {events.length === 0 ? (
            <p style={loadingText}>{text[lang].noEvents}</p>
          ) : (
            events.map((e) => (
              <div
                key={e._id}
                style={card}
                onMouseEnter={(ev) => {
                  ev.currentTarget.style.transform = "translateY(-6px)";
                  ev.currentTarget.style.boxShadow =
                    "0 10px 25px rgba(0,0,0,0.08)";
                }}
                onMouseLeave={(ev) => {
                  ev.currentTarget.style.transform = "translateY(0)";
                  ev.currentTarget.style.boxShadow =
                    "0 4px 12px rgba(0,0,0,0.06)";
                }}
              >
                <h3 style={cardTitle}>{e.title}</h3>

                <p style={cardDesc}>{e.description}</p>

                {e.date && (
                  <p style={date}>
                    📅{" "}
                    {new Date(e.date).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                )}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

/* ✅ WHITE THEME */

const container = {
  minHeight: "100vh",
  padding: "40px 5vw",
  background: "#f9fafb"
};

const title = {
  color: "#111",
  textAlign: "center",
  marginBottom: "30px"
};

const loadingText = {
  color: "#666",
  textAlign: "center"
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
  gap: "20px"
};

const card = {
  padding: "20px",
  borderRadius: "14px",
  background: "#ffffff",
  border: "1px solid #eee",
  boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
  transition: "0.3s",
  cursor: "pointer"
};

const cardTitle = {
  color: "#ff7a00",
  marginBottom: "10px"
};

const cardDesc = {
  color: "#444",
  fontSize: "14px"
};

const date = {
  marginTop: "10px",
  color: "#777",
  fontSize: "13px"
};

export default Events;