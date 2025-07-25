import React from "react";
import "./Navbar.css";

function Navbar({ csvFiles, selectedFile, setSelectedFile }) {
  return (
    <div className="navbar">
      {csvFiles.map((file, idx) => (
        <button
          key={file.value}
          className={`nav-item ${selectedFile === file.value ? "active" : ""}`}
          onClick={() => setSelectedFile(file.value)}
        >
          {file.label}
        </button>
      ))}
    </div>
  );
}

export default Navbar;
