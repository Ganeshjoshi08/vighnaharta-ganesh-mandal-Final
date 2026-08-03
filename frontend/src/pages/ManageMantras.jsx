import React, { useEffect, useState } from "react";
import API from "../api/api";
import { Link } from "react-router-dom";

const ManageMantras = () => {
  const [mantras, setMantras] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [editId, setEditId] = useState(null);

  // Form states
  const [mantraNameMr, setMantraNameMr] = useState("");
  const [mantraNameEn, setMantraNameEn] = useState("");
  const [mantraTextMr, setMantraTextMr] = useState("");
  const [mantraTextEn, setMantraTextEn] = useState("");
  const [displayOrder, setDisplayOrder] = useState(0);
  const [isActive, setIsActive] = useState(true);
  const [audioFile, setAudioFile] = useState(null);

  useEffect(() => {
    fetchMantras();
  }, []);

  const fetchMantras = async () => {
    setLoading(true);
    try {
      const res = await API.get("/mantras");
      setMantras(res.data.data || []);
    } catch (err) {
      console.error(err);
      alert("Failed to load mantras from database");
    } finally {
      setLoading(false);
    }
  };

  const handleCancelEdit = () => {
    setEditId(null);
    setMantraNameMr("");
    setMantraNameEn("");
    setMantraTextMr("");
    setMantraTextEn("");
    setDisplayOrder(0);
    setIsActive(true);
    setAudioFile(null);
    // Reset file input element manually
    const fileInput = document.getElementById("audio-file-input");
    if (fileInput) fileInput.value = "";
  };

  const handleEditClick = (mantra) => {
    setEditId(mantra._id);
    setMantraNameMr(mantra.mantraNameMr);
    setMantraNameEn(mantra.mantraNameEn);
    setMantraTextMr(mantra.mantraTextMr);
    setMantraTextEn(mantra.mantraTextEn);
    setDisplayOrder(mantra.displayOrder || 0);
    setIsActive(mantra.isActive);
    setAudioFile(null);
    
    // Scroll to the top/form smoothly
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!mantraNameMr.trim()) return alert("Mantra Name Marathi is required ❌");
    if (!mantraNameEn.trim()) return alert("Mantra Name English is required ❌");
    if (!mantraTextMr.trim()) return alert("Marathi Mantra Text is required ❌");
    if (!mantraTextEn.trim()) return alert("English Mantra Text is required ❌");

    // File validation
    if (audioFile) {
      const ext = audioFile.name.substring(audioFile.name.lastIndexOf(".")).toLowerCase();
      if (ext !== ".mp3" && ext !== ".wav") {
        return alert("Only MP3 and WAV files are allowed for audio upload ❌");
      }
    }

    const formData = new FormData();
    formData.append("mantraNameMr", mantraNameMr);
    formData.append("mantraNameEn", mantraNameEn);
    formData.append("mantraTextMr", mantraTextMr);
    formData.append("mantraTextEn", mantraTextEn);
    formData.append("displayOrder", displayOrder);
    formData.append("isActive", isActive);
    if (audioFile) {
      formData.append("audio", audioFile);
    }

    const token = localStorage.getItem("token");
    setLoading(true);

    try {
      if (editId) {
        // Update request
        const res = await API.put(`/mantras/${id = editId}`, formData, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        alert(res.data.msg || "✅ Mantra updated successfully!");
      } else {
        // Create request
        const res = await API.post("/mantras", formData, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        alert(res.data.msg || "✅ Mantra added successfully!");
      }

      handleCancelEdit();
      fetchMantras();

    } catch (err) {
      console.error(err);
      alert(err.response?.data?.msg || "Action failed ❌");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this mantra completely? This cannot be undone.")) return;

    const token = localStorage.getItem("token");
    setLoading(true);

    try {
      const res = await API.delete(`/mantras/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      alert(res.data.msg || "🗑️ Mantra deleted successfully");
      fetchMantras();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.msg || "Failed to delete mantra ❌");
    } finally {
      setLoading(false);
    }
  };

  const handleToggleActive = async (mantra) => {
    const token = localStorage.getItem("token");
    try {
      await API.put(`/mantras/${mantra._id}`, { isActive: !mantra.isActive }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      fetchMantras();
    } catch (err) {
      console.error(err);
      alert("Failed to update status");
    }
  };

  // Filter mantras by search term
  const filteredMantras = mantras.filter((mantra) => {
    const term = search.toLowerCase();
    return (
      mantra.mantraNameMr.toLowerCase().includes(term) ||
      mantra.mantraNameEn.toLowerCase().includes(term) ||
      mantra.mantraTextMr.toLowerCase().includes(term) ||
      mantra.mantraTextEn.toLowerCase().includes(term)
    );
  });

  return (
    <div style={container}>
      {/* Back link */}
      <div style={{ marginBottom: "20px" }}>
        <Link to="/admin" style={{ color: "#ff7a00", textDecoration: "none", fontWeight: "bold" }}>
          ← Back to Dashboard
        </Link>
      </div>

      <h1 style={titleStyle}>🕉️ Mantra Management System</h1>

      {/* ADD / EDIT FORM */}
      <form onSubmit={handleSubmit} style={form}>
        <h2 style={{ ...sectionHeading, color: "#8f4e00" }}>
          {editId ? "✏️ Edit Mantra Details" : "✨ Add New Mantra"}
        </h2>

        <div style={formGrid}>
          {/* Marathi Inputs */}
          <div style={formColumn}>
            <h3 style={sectionHeading}>मराठी विभाग (Marathi Section)</h3>
            <label style={label}>Mantra Name (Marathi) *</label>
            <input
              type="text"
              placeholder="उदा. सुखकर्ता दुःखहर्ता आरती"
              value={mantraNameMr}
              onChange={(e) => setMantraNameMr(e.target.value)}
              style={input}
              required
            />
            <label style={label}>Mantra Lyrics/Text (Marathi) *</label>
            <textarea
              placeholder="Enter multiline Marathi lyrics here..."
              value={mantraTextMr}
              onChange={(e) => setMantraTextMr(e.target.value)}
              style={textarea}
              rows={8}
              required
            />
          </div>

          {/* English Inputs */}
          <div style={formColumn}>
            <h3 style={sectionHeading}>English Section</h3>
            <label style={label}>Mantra Name (English) *</label>
            <input
              type="text"
              placeholder="e.g. Sukhakarta Dukhaharta Aarti"
              value={mantraNameEn}
              onChange={(e) => setMantraNameEn(e.target.value)}
              style={input}
              required
            />
            <label style={label}>Mantra Lyrics/Text (English) *</label>
            <textarea
              placeholder="Enter multiline English translation/lyrics here..."
              value={mantraTextEn}
              onChange={(e) => setMantraTextEn(e.target.value)}
              style={textarea}
              rows={8}
              required
            />
          </div>
        </div>

        {/* Configuration settings */}
        <div style={bottomControls}>
          <div style={controlGroup}>
            <label style={label}>Display Order:</label>
            <input
              type="number"
              placeholder="Order"
              value={displayOrder}
              onChange={(e) => setDisplayOrder(Number(e.target.value) || 0)}
              style={orderInputForm}
            />
          </div>

          <div style={{ ...controlGroup, flexDirection: "row", alignItems: "center", gap: "10px", marginTop: "20px" }}>
            <input
              type="checkbox"
              id="isActiveToggle"
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
              style={{ width: "18px", height: "18px", cursor: "pointer" }}
            />
            <label htmlFor="isActiveToggle" style={{ ...label, cursor: "pointer", fontSize: "14px" }}>
              Active on Website
            </label>
          </div>

          <div style={controlGroup}>
            <label style={label}>Audio File Upload (Optional - .mp3, .wav):</label>
            <input
              type="file"
              id="audio-file-input"
              accept=".mp3,.wav"
              onChange={(e) => setAudioFile(e.target.files[0])}
              style={fileInput}
            />
          </div>

          <div style={{ display: "flex", gap: "10px", marginLeft: "auto", alignSelf: "flex-end" }}>
            {editId && (
              <button type="button" onClick={handleCancelEdit} style={cancelBtn}>
                Cancel
              </button>
            )}
            <button type="submit" disabled={loading} style={btn}>
              {loading ? "Please wait..." : editId ? "Update Mantra" : "Save Mantra"}
            </button>
          </div>
        </div>
      </form>

      {/* MANTRAS SEARCH & DATABASE TABLE */}
      <div style={form}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", flexWrap: "wrap", gap: "10px" }}>
          <h2 style={{ ...sectionHeading, margin: 0, border: "none" }}>📚 Stored Mantras Database</h2>
          
          {/* Search bar */}
          <input
            type="text"
            placeholder="🔍 Search mantras by name or lyrics..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ ...input, width: "300px", margin: 0 }}
          />
        </div>

        {/* Table view */}
        <div style={{ overflowX: "auto" }}>
          <table style={tableStyle}>
            <thead>
              <tr style={tableHeaderRow}>
                <th style={thStyle}>Order</th>
                <th style={thStyle}>Mantra Name (Marathi)</th>
                <th style={thStyle}>Mantra Name (English)</th>
                <th style={thStyle}>Audio File</th>
                <th style={thStyle}>Status</th>
                <th style={thStyle}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredMantras.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ textAlign: "center", padding: "20px", color: "#666" }}>
                    No mantras found matching your search.
                  </td>
                </tr>
              ) : (
                filteredMantras.map((mantra) => (
                  <tr key={mantra._id} style={tableRow}>
                    <td style={tdStyle}>{mantra.displayOrder || 0}</td>
                    <td style={{ ...tdStyle, fontWeight: "bold", color: "#6d3a00" }}>{mantra.mantraNameMr}</td>
                    <td style={tdStyle}>{mantra.mantraNameEn}</td>
                    <td style={tdStyle}>
                      {mantra.audioFile ? (
                        <span style={audioBadge}>🎵 Audio Loaded</span>
                      ) : (
                        <span style={noAudioBadge}>No Audio</span>
                      )}
                    </td>
                    <td style={tdStyle}>
                      <button
                        onClick={() => handleToggleActive(mantra)}
                        style={mantra.isActive ? activeToggleBtn : inactiveToggleBtn}
                      >
                        {mantra.isActive ? "Active" : "Inactive"}
                      </button>
                    </td>
                    <td style={tdStyle}>
                      <div style={{ display: "flex", gap: "8px" }}>
                        <button onClick={() => handleEditClick(mantra)} style={editBtn}>
                          Edit
                        </button>
                        <button onClick={() => handleDelete(mantra._id)} style={deleteBtn}>
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

/* ✅ PREMIUM DESIGN STYLING */

const container = {
  padding: "110px 30px 30px 30px",
  minHeight: "100vh",
  background: "#f9fafb",
  fontFamily: "'Outfit', 'Inter', sans-serif"
};

const titleStyle = {
  color: "#111",
  textAlign: "center",
  marginBottom: "30px",
  fontWeight: "bold",
  fontSize: "2rem"
};

const form = {
  background: "#ffffff",
  padding: "25px",
  borderRadius: "16px",
  border: "1px solid #eee",
  boxShadow: "0 6px 20px rgba(0,0,0,0.05)",
  maxWidth: "1000px",
  margin: "0 auto 30px auto",
  display: "flex",
  flexDirection: "column",
  gap: "20px"
};

const formGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
  gap: "25px"
};

const formColumn = {
  display: "flex",
  flexDirection: "column",
  gap: "12px"
};

const sectionHeading = {
  fontSize: "1.1rem",
  fontWeight: "bold",
  color: "#ff7a00",
  marginBottom: "5px",
  borderBottom: "2px solid #fff5eb",
  paddingBottom: "8px"
};

const input = {
  padding: "10px 14px",
  borderRadius: "8px",
  border: "1px solid #ddd",
  outline: "none",
  fontSize: "14px",
  fontFamily: "inherit"
};

const textarea = {
  padding: "10px 14px",
  borderRadius: "8px",
  border: "1px solid #ddd",
  outline: "none",
  fontSize: "14px",
  resize: "vertical",
  lineHeight: "1.5",
  fontFamily: "inherit"
};

const bottomControls = {
  display: "flex",
  gap: "25px",
  flexWrap: "wrap",
  alignItems: "center",
  borderTop: "1px solid #eee",
  paddingTop: "20px"
};

const controlGroup = {
  display: "flex",
  flexDirection: "column",
  gap: "6px"
};

const label = {
  fontSize: "12px",
  fontWeight: "bold",
  color: "#666"
};

const orderInputForm = {
  width: "100px",
  padding: "10px",
  borderRadius: "8px",
  border: "1px solid #ddd",
  outline: "none"
};

const fileInput = {
  fontSize: "14px"
};

const btn = {
  background: "linear-gradient(135deg,#ff7a00,#ff3c00)",
  color: "#fff",
  padding: "12px 24px",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "600"
};

const cancelBtn = {
  background: "#f3f4f6",
  color: "#374151",
  padding: "12px 24px",
  border: "1px solid #d1d5db",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "600"
};

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  marginTop: "10px",
  fontSize: "14px"
};

const tableHeaderRow = {
  borderBottom: "2px solid #ff7a00",
  background: "#fff9f5"
};

const thStyle = {
  padding: "12px 16px",
  textAlign: "left",
  color: "#8f4e00",
  fontWeight: "bold"
};

const tableRow = {
  borderBottom: "1px solid #eee",
  transition: "0.2s",
  ":hover": {
    background: "#fafafa"
  }
};

const tdStyle = {
  padding: "12px 16px",
  color: "#333"
};

const audioBadge = {
  background: "#e8f5e9",
  color: "#2e7d32",
  padding: "4px 8px",
  borderRadius: "4px",
  fontSize: "11px",
  fontWeight: "bold"
};

const noAudioBadge = {
  background: "#fafafa",
  color: "#888",
  padding: "4px 8px",
  borderRadius: "4px",
  fontSize: "11px",
  border: "1px dashed #ccc"
};

const activeToggleBtn = {
  background: "#e8f5e9",
  color: "#2e7d32",
  border: "1px solid #c8e6c9",
  padding: "4px 10px",
  borderRadius: "6px",
  cursor: "pointer",
  fontSize: "12px",
  fontWeight: "bold"
};

const inactiveToggleBtn = {
  background: "#ffebee",
  color: "#c62828",
  border: "1px solid #ffcdd2",
  padding: "4px 10px",
  borderRadius: "6px",
  cursor: "pointer",
  fontSize: "12px",
  fontWeight: "bold"
};

const editBtn = {
  background: "#3b82f6",
  color: "#fff",
  border: "none",
  padding: "6px 12px",
  borderRadius: "6px",
  cursor: "pointer",
  fontSize: "12px",
  fontWeight: "600"
};

const deleteBtn = {
  background: "#ef4444",
  color: "#fff",
  border: "none",
  padding: "6px 12px",
  borderRadius: "6px",
  cursor: "pointer",
  fontSize: "12px",
  fontWeight: "600"
};

export default ManageMantras;
