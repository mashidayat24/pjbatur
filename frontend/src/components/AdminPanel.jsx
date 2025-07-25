import React, { useState, useEffect } from "react";

function AdminPanel({ selectedFile }) {
  const [data, setData] = useState([]);
  const [editIdx, setEditIdx] = useState(-1);
  const [form, setForm] = useState({});
  const [newRow, setNewRow] = useState({});
  const [reload, setReload] = useState(false);

  useEffect(() => {
    fetch(`/api/csv/${selectedFile}`)
      .then((res) => res.json())
      .then((dt) => {
        setData(dt);
        setForm({});
        setEditIdx(-1);
        setNewRow({});
      });
  }, [selectedFile, reload]);

  const handleEdit = (idx) => {
    setEditIdx(idx);
    setForm(data[idx]);
  };

  const handleSave = async (idx) => {
    await fetch(`/api/csv/${selectedFile}/edit/${idx}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setEditIdx(-1);
    setReload(!reload);
  };

  const handleDelete = async (idx) => {
    await fetch(`/api/csv/${selectedFile}/delete/${idx}`, {
      method: "POST",
    });
    setReload(!reload);
  };

  const handleAdd = async () => {
    await fetch(`/api/csv/${selectedFile}/add`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newRow),
    });
    setNewRow({});
    setReload(!reload);
  };

  return (
    <div className="table-container">
      <table className="main-table">
        <thead>
          <tr>
            {data[0] && Object.keys(data[0]).map((key) => (
              <th key={key}>{key}</th>
            ))}
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr key={idx}>
              {editIdx === idx ? (
                Object.keys(row).map((key, k) => (
                  <td key={k}>
                    <input
                      value={form[key] || ""}
                      onChange={(e) =>
                        setForm({ ...form, [key]: e.target.value })
                      }
                    />
                  </td>
                ))
              ) : (
                Object.values(row).map((val, k) => <td key={k}>{val}</td>)
              )}
              <td>
                {editIdx === idx ? (
                  <>
                    <button onClick={() => handleSave(idx)}>Simpan</button>
                    <button onClick={() => setEditIdx(-1)}>Batal</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => handleEdit(idx)}>Edit</button>
                    <button onClick={() => handleDelete(idx)}>Hapus</button>
                  </>
                )}
              </td>
            </tr>
          ))}
          {data[0] && (
            <tr>
              {Object.keys(data[0]).map((key, k) => (
                <td key={k}>
                  <input
                    value={newRow[key] || ""}
                    onChange={(e) =>
                      setNewRow({ ...newRow, [key]: e.target.value })
                    }
                  />
                </td>
              ))}
              <td>
                <button onClick={handleAdd}>Tambah</button>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default AdminPanel;