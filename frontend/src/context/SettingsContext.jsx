import React, { createContext, useContext, useState, useEffect } from "react";
import API, { BACKEND_URL } from "../api/api";

const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState(null);
  const [hero, setHero] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchSettings = async () => {
    try {
      const [settingsRes, heroRes] = await Promise.all([
        API.get("/settings"),
        API.get("/hero")
      ]);
      if (settingsRes.data && settingsRes.data.success) {
        setSettings(settingsRes.data.data);
      }
      if (heroRes.data && heroRes.data.success) {
        setHero(heroRes.data.data);
      }
    } catch (err) {
      console.error("❌ Failed to fetch CMS website settings:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();

    const handleUpdate = () => {
      fetchSettings();
    };
    window.addEventListener("settingsUpdated", handleUpdate);
    return () => {
      window.removeEventListener("settingsUpdated", handleUpdate);
    };
  }, []);

  // Update document favicon dynamically when settings fetch is successful
  useEffect(() => {
    let link = document.querySelector("link[rel~='icon']");
    if (!link) {
      link = document.createElement("link");
      link.rel = "icon";
      document.getElementsByTagName("head")[0].appendChild(link);
    }
    if (settings && settings.faviconUrl) {
      link.href = `${BACKEND_URL}${settings.faviconUrl}`;
    } else {
      link.href = "/favicon.png";
    }
  }, [settings]);

  return (
    <SettingsContext.Provider value={{ settings, hero, refreshSettings: fetchSettings, loading }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => useContext(SettingsContext);
