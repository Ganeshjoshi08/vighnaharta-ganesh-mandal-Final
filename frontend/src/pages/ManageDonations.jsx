import { useEffect, useState } from "react";
import API from "../api/api";

const ManageDonations = () => {
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    fetchDonations();
  }, []);

  const fetchDonations = async () => {
    try {
      const res = await API.get("/admin/donations");
      setDonations(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const totalAmount = donations.reduce((sum, d) => sum + d.amount, 0);

  return (
    <div style={container}>
      <h1 style={title}>💰 Manage Donations</h1>

      <div style={stats}>
        Total Donations: ₹{totalAmount}
      </div>

      <div style={tableWrapper}>
        <table style={table}>
          <thead>
            <tr>
              <th style={th}>#</th>
              <th style={th}>User</th>
              <th style={th}>Email</th>
              <th style={th}>Amount</th>
              <th style={th}>Date</th>
            </tr>
          </thead>

          <tbody>
            {donations.length === 0 ? (
              <tr>
                <td colSpan="5" style={noData}>No donations found</td>
              </tr>
            ) : (
              donations.map((d, i) => (
                <tr key={d._id} style={row}>
                  <td style={td}>{i + 1}</td>
                  <td style={td}>{d.user?.name || d.name}</td>
                  <td style={td}>{d.user?.email || d.email}</td>
                  <td style={amount}>₹{d.amount}</td>
                  <td style={td}>
                    {new Date(d.createdAt).toLocaleDateString("en-IN")}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

/* ✅ WHITE ADMIN TABLE */

const container = {
  minHeight: "100vh",
  padding: "110px 30px 30px 30px",
  background: "#f9fafb"
};

const title = {
  color: "#111",
  marginBottom: "20px"
};

const stats = {
  marginBottom: "15px",
  fontWeight: "bold",
  color: "#333"
};

const tableWrapper = {
  background: "#ffffff",
  padding: "15px",
  borderRadius: "12px",
  border: "1px solid #eee",
  boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
  overflowX: "auto"
};

const table = {
  width: "100%",
  borderCollapse: "collapse"
};

const th = {
  padding: "12px",
  borderBottom: "2px solid #eee",
  color: "#ff7a00",
  textAlign: "left"
};

const td = {
  padding: "12px",
  borderBottom: "1px solid #eee",
  color: "#444"
};

const amount = {
  ...td,
  fontWeight: "bold",
  color: "#16a34a" // green for money
};

const row = {
  transition: "0.2s"
};

const noData = {
  textAlign: "center",
  padding: "20px",
  color: "#666"
};

export default ManageDonations;