const bcrypt = require("bcryptjs");
const jwt = require("../Middleware/authMiddleware");
const { Admin } = require("../models");  

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

    return res.json({ token, username: admin.username });
  } catch (err) {
    return res.status(500).json(
      { error: "Terjadi kesalahan pada server", details: err.message });
  }
};