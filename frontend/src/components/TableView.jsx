import React, { useEffect, useState } from "react";

function TableView({ selectedFile }) {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch(`/api/csv/${selectedFile}`)
      .then((res) => res.json())
      .then((dt) => setData(dt));
  }, [selectedFile]);

  if (!data.length) return <div className="table-container">Tidak ada data.</div>;

  return (
    <div className="table-container">
      <table className="main-table">
        <thead>
          <tr>
            {Object.keys(data[0]).map((key) => (
              <th key={key}>{key}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr key={idx}>
              {Object.values(row).map((val, j) => (
                <td key={j}>{val}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TableView;