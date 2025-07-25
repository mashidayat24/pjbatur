import React, { useState } from "react";
import Login from "./components/Login";
import TableView from "./components/TableView";
import AdminPanel from "./components/AdminPanel";
import Navbar from "./components/Navbar";
import "./index.css";

const csvFiles = [
  { label: "URBAN", value: "urban.csv" },
  { label: "PATROLI", value: "patroli.csv" },
  { label: "MANDORLINE", value: "mandorline.csv" },
  { label: "PEMADAMAN", value: "pemadaman.csv" },
];

function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [selectedFile, setSelectedFile] = useState("urban.csv");
  const [logoutVisible, setLogoutVisible] = useState(false);

  const handleLogin = () => {
    setIsAdmin(true);
    setLogoutVisible(true);
  };

  const handleLogout = () => {
    setIsAdmin(false);
    setLogoutVisible(false);
  };

  return (
    <div className="main-bg">
      <div className="header">
        <h1>PJ BATUR</h1>
        {!isAdmin && (
          <button className="login-btn" onClick={() => setIsAdmin(true)}>
            Login Admin
          </button>
        )}
        {logoutVisible && (
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        )}
      </div>
      <div className="subtitle">Kegiatan dan Monitoring Pekerjaan</div>
      <Navbar
        csvFiles={csvFiles}
        selectedFile={selectedFile}
        setSelectedFile={setSelectedFile}
      />
      {isAdmin ? (
        <AdminPanel
          selectedFile={selectedFile}
          onLogout={handleLogout}
        />
      ) : (
        <TableView selectedFile={selectedFile} />
      )}
      {!isAdmin && (
        <Login
          onLogin={handleLogin}
        />
      )}
    </div>
  );
}

export default App;
