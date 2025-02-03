const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const { Admin } = require("../models");  

exports.Register = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      console.log('Field kosong ditemukan');
      return res.status(400).send({ message: 'Semua field harus diisi.' });
    }
    
    const existingUser = await Admin.findOne({ where: { username } });
    if (existingUser) {
      console.log(`username sudah terdaftar: ${username}`);
      return res.status(400).send({ message: 'username sudah terdaftar. Silakan gunakan username lain.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = await Admin.create({
      username,
      password: hashedPassword,
    });

    res.status(201).send({ message: 'Admin berhasil terdaftar', newAdmin });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.Login = async (req, res) => {
  const { username, password } = req.body;

  // Validasi input
  if (!username || !password) {
    return res.status(400).json({ message: "Username dan password wajib diisi" });
  }

  try {
    const admin = await Admin.findOne({ where: { username } });

    if (!admin) {
      return res.status(401).json({ message: "Username tidak ditemukan" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Password salah" });
    }

    //JWT token
    const token = jwt.sign({ id: admin.id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    return res.json({ username: admin.username, token });
  } catch (err) {
    return res.status(500).json(
      { error: "Terjadi kesalahan pada server", details: err.message });
  }
};