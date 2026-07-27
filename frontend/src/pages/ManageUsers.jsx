import { useEffect, useState } from "react";
import API from "../api/api";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await API.get("/admin/users");
      setUsers(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={container}>
      <h1 style={title}>👤 Manage Users</h1>

      {/* 📊 COUNT */}
      <div style={stats}>
        Total Users: {users.length}
      </div>

      {/* 📋 USERS TABLE */}
      <div style={tableWrapper}>
        <table style={table}>
          <thead>
            <tr>
              <th style={th}>#</th>
              <th style={th}>Name</th>
              <th style={th}>Email</th>
              <th style={th}>Role</th>
              <th style={th}>Joined</th>
            </tr>
          </thead>

          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan="5" style={noData}>
                  No users found
                </td>
              </tr>
            ) : (
              users.map((u, i) => (
                <tr key={u._id} style={row}>
                  <td style={td}>{i + 1}</td>
                  <td style={td}>{u.name}</td>
                  <td style={td}>{u.email}</td>
                  <td style={role}>
                    {u.isAdmin ? "Admin 👑" : "User"}
                  </td>
                  <td style={td}>
                    {new Date(u.createdAt).toLocaleDateString("en-IN")}
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
  marginBottom: "20px",
  color: "#111"
};

const stats = {
  marginBottom: "15px",
  fontSize: "16px",
  fontWeight: "bold",
  color: "#333"
};

const tableWrapper = {
  overflowX: "auto",
  background: "#ffffff",
  borderRadius: "12px",
  padding: "15px",
  border: "1px solid #eee",
  boxShadow: "0 4px 12px rgba(0,0,0,0.06)"
};

const table = {
  width: "100%",
  borderCollapse: "collapse"
};

const th = {
  padding: "12px",
  textAlign: "left",
  borderBottom: "2px solid #eee",
  color: "#ff7a00"
};

const td = {
  padding: "12px",
  borderBottom: "1px solid #eee",
  color: "#444"
};

const role = {
  ...td,
  fontWeight: "600"
};

const row = {
  transition: "0.2s"
};

const noData = {
  textAlign: "center",
  padding: "20px",
  color: "#666"
};

export default ManageUsers;