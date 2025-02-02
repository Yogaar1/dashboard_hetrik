const db = require("../config/database");
const bcrypt = require("bcryptjs");
const jwt = require("../Middleware/authMiddleware");

exports.Login = (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Username dan password wajib diisi" });
  }

  const sql = "SELECT * FROM admin WHERE username = ?";
  db.query(sql, [username], (err, results) => {
    if (err) return res.status(500).json({ error: "Database error", details: err.message });

    if (results.length === 0) {
      return res.status(401).json({ message: "Username tidak ditemukan" });
    }

    const admin = results[0];

    bcrypt.compare(password, admin.password, (err, isMatch) => {
      if (err) return res.status(500).json({ error: "Error saat memproses password" });
      if (!isMatch) return res.status(401).json({ message: "Password salah" });

      const token = jwt.sign({ id: admin.id }, process.env.JWT_SECRET, { expiresIn: "1h" });

      res.json({ token, username: admin.username });
    });
  });
};
