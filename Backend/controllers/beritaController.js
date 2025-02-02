const db = require('../config/database');

// Mendapatkan semua berita
const getAllBerita = async (req, res) => {
    try {
        const [results] = await db.query("SELECT * FROM berita");

        // Encode gambar ke base64 jika ada kolom gambar
        const berita = results.map((berita) => {
            if (berita.image) {
                try {
                    berita.image = `data:image/jpeg;base64,${Buffer
                        .from(berita.image)
                        .toString("base64")}`;
                } catch (conversionError) {
                    console.error("Error converting image to base64:", conversionError.message);
                    berita.image = null;
                }
            }
            return berita;
        });

        res
            .status(200)
            .json(berita);
    } catch (err) {
        console.error("Error fetching data:", err);
        res
            .status(500)
            .json({message: "Failed to fetch data"});
    }
};

// Menambahkan berita baru
const addBerita = async (req, res) => {
    const {image, judul_berita, konten, tanggal_dibuat} = req.body;
    try {
        let imageBuffer = null;
        if (image) {
            if (!/^data:image\/(png|jpeg|jpg);base64,/.test(image)) {
                return res
                    .status(400)
                    .json({message: "Format gambar tidak valid"});
            }
            imageBuffer = Buffer.from(image.split(",")[1], "base64");
        }

        await db.query(
            "INSERT INTO berita (image, judul_berita, konten, tanggal_dibuat) VALUES (?, ?, ?, ?)",
            [imageBuffer, judul_berita, konten, tanggal_dibuat ]
        );

        res
            .status(201)
            .json({message: "Berita berhasil ditambahkan"});
    } catch (err) {
        console.error("Error adding berita:", err);
        res
            .status(500)
            .json({message: "Failed to add berita"});
    }
};

// Memperbarui berita
const updateBerita = async (req, res) => {
    const {id} = req.params;
    const {image, judul_berita, konten, tanggal_dibuat} = req.body;
    try {
        let imageBuffer = null;
        if (image) {
            if (!/^data:image\/(png|jpeg|jpg);base64,/.test(image)) {
                return res
                    .status(400)
                    .json({message: "Format gambar tidak valid"});
            }
            imageBuffer = Buffer.from(image.split(",")[1], "base64");
        }

        await db.query(
            "UPDATE berita SET image = ?, judul_berita = ?, konten = ?, tanggal_dibuat = ? WHERE id = ?",
            [imageBuffer, judul_berita, konten, tanggal_dibuat, id]
        );

        res
            .status(200)
            .json({message: "Berita berhasil diperbarui"});
    } catch (err) {
        console.error("Error updating berita:", err);
        res
            .status(500)
            .json({message: "Failed to update berita"});
    }
};

// Menghapus berita
const deleteBerita = async (req, res) => {
    const {id} = req.params;
    try {
        await db.query("DELETE FROM berita WHERE id = ?", [id]);
        res
            .status(200)
            .json({message: "Berita berhasil dihapus"});
    } catch (err) {
        console.error("Error deleting berita:", err);
        res
            .status(500)
            .json({message: "Failed to delete berita"});
    }
};

module.exports = {
    getAllBerita,
    addBerita,
    updateBerita,
    deleteBerita
};
