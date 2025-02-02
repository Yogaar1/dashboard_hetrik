const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const tarifListrikRoutes = require("./routes/tarifListrikRoutes");
const tarifPPJRoutes = require("./routes/tarifPPJRoutes");
const beritaRoutes = require("./routes/beritaRoutes");
const db = require("./config/database");

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(bodyParser.json({limit: "10mb"}));
app.use(bodyParser.urlencoded({limit: "10mb", extended: true}));
app.use(cors());

// Cek koneksi database
db.getConnection((err) => {
    if (err) {
        console.error("Database connection failed:", err.message);
        process.exit(1);
    }
    console.log("Connected to the database");
});

// Rute API
app.use("/api/tarif-listrik", tarifListrikRoutes);
app.use("/api/tarif-ppj", tarifPPJRoutes);
app.use("/api/berita", beritaRoutes);

// Endpoint login
app.post('/login', (req, res) => {
    const {username, password} = req.body;

    // Query untuk mendapatkan data admin berdasarkan username
    const query = 'SELECT * FROM admin WHERE username = ?';

    db.query(query, [username], (err, results) => {
        if (err) {
            return res
                .status(500)
                .json({message: 'Server error'});
        }

        if (results.length === 0) {
            return res
                .status(401)
                .json({message: 'Invalid username or password'});
        }

        const user = results[0];

        // Membandingkan password yang dimasukkan dengan password yang ada di database
        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) {
                return res
                    .status(500)
                    .json({message: 'Error comparing password'});
            }

            if (!isMatch) {
                return res
                    .status(401)
                    .json({message: 'Invalid username or password'});
            }

            // Membuat JWT token
            const token = jwt.sign({
                id: user.id,
                username: user.username
            }, process.env.JWT_SECRET || 'your_jwt_secret', {expiresIn: '1h'});

            res
                .status(200)
                .json({
                    message: 'Login successful',
                    user: {
                        id: user.id,
                        username: user.username
                    },
                    token, // Kirimkan token untuk digunakan di frontend
                });
        });
    });
});

// Default route untuk menangani rute yang tidak ditemukan
app.use((req, res) => {
    res
        .status(404)
        .json({message: "Route not found"});
});

// Start server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
