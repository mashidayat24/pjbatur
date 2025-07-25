const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const csv = require("csvtojson");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const DATA_DIR = path.join(__dirname, "data");

function getCsvPath(filename) {
  return path.join(DATA_DIR, filename);
}

// Serve CSV as JSON
app.get("/api/csv/:filename", async (req, res) => {
  const filePath = getCsvPath(req.params.filename);
  if (!fs.existsSync(filePath)) return res.json([]);
  const data = await csv().fromFile(filePath);
  res.json(data);
});

// Edit row
app.post("/api/csv/:filename/edit/:idx", async (req, res) => {
  const filePath = getCsvPath(req.params.filename);
  const data = await csv().fromFile(filePath);
  const idx = parseInt(req.params.idx);
  data[idx] = req.body;
  const header = Object.keys(data[0]).join(",");
  const rows = data.map((row) => Object.values(row).map(v => `"${v.replace(/"/g,'""')}"`).join(","));
  fs.writeFileSync(filePath, header + "\n" + rows.join("\n"));
  res.json({ ok: true });
});

// Delete row
app.post("/api/csv/:filename/delete/:idx", async (req, res) => {
  const filePath = getCsvPath(req.params.filename);
  const data = await csv().fromFile(filePath);
  const idx = parseInt(req.params.idx);
  data.splice(idx, 1);
  if (!data[0]) return fs.writeFileSync(filePath, "");
  const header = Object.keys(data[0]).join(",");
  const rows = data.map((row) => Object.values(row).map(v => `"${v.replace(/"/g,'""')}"`).join(","));
  fs.writeFileSync(filePath, header + "\n" + rows.join("\n"));
  res.json({ ok: true });
});

// Add row
app.post("/api/csv/:filename/add", async (req, res) => {
  const filePath = getCsvPath(req.params.filename);
  let data = [];
  if (fs.existsSync(filePath)) {
    data = await csv().fromFile(filePath);
  }
  data.push(req.body);
  const header = Object.keys(data[0]).join(",");
  const rows = data.map((row) => Object.values(row).map(v => `"${v.replace(/"/g,'""')}"`).join(","));
  fs.writeFileSync(filePath, header + "\n" + rows.join("\n"));
  res.json({ ok: true });
});

// Serve Frontend (if build)
app.use(express.static(path.join(__dirname, "../frontend/dist")));

const PORT = 3000;
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
