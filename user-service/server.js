require("dotenv").config(); 

const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 4000;

const sequelize = require("./database"); // koneksi database
const User = require("./models/User");

app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("API User Service Running");
});

// GET all users
app.get("/users", async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET user by ID
app.get("/users/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ error: "User tidak ditemukan" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST create user
app.post("/users", async (req, res) => {
  const { name, email, role } = req.body;
  const errors = {};

  if (!name) errors.name = "Name wajib diisi";
  if (!email) errors.email = "Email wajib diisi";
  if (!role) errors.role = "Role wajib diisi";

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ errors });
  }

  try {
    const newUser = await User.create({ name, email, role });
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🔹 Fungsi untuk menunggu database siap
const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

async function connectDB(retries = 5) {
  for (let i = 0; i < retries; i++) {
    try {
      await sequelize.authenticate();
      console.log("Database connected");
      await sequelize.sync(); // buat table jika belum ada
      console.log("Tables synced");
      return;
    } catch (err) {
      console.log(`Database connection failed. Retry ${i + 1}/${retries} in 5s...`);
      await wait(5000);
    }
  }
  throw new Error("Unable to connect to database after multiple retries");
}

// 🔹 Jalankan server setelah DB siap
(async () => {
  try {
    await connectDB();
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (err) {
    console.error(err);
  }
})();
