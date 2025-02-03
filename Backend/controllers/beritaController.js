const { Berita } = require("../models"); 

// Mendapatkan semua berita
exports.getAllBerita = async (req, res) => {
    try {
        const berita = await Berita.findAll();

        // Encode gambar ke base64 jika ada kolom gambar
        const beritaWithImages = berita.map((berita) => {
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

        res.status(200).json(beritaWithImages);
    } catch (err) {
        console.error("Error fetching data:", err);
        res.status(500).json({ message: "Failed to fetch data" });
    }
};

// Menambahkan berita baru
exports.addBerita = async (req, res) => {
    const { image, judul_berita, konten, tanggal_dibuat } = req.body;
    try {
        let imageBuffer = null;
        if (image) {
            if (!/^data:image\/(png|jpeg|jpg);base64,/.test(image)) {
                return res.status(400).json({ message: "Format gambar tidak valid" });
            }
            imageBuffer = Buffer.from(image.split(",")[1], "base64");
        }

        // Menambahkan berita ke database menggunakan model
        await Berita.create({
            image: imageBuffer,
            judul_berita,
            konten,
            tanggal_dibuat
        });

        res.status(201).json({ message: "Berita berhasil ditambahkan" });
    } catch (err) {
        console.error("Error adding berita:", err);
        res.status(500).json({ message: "Failed to add berita" });
    }
};

// Memperbarui berita
exports.updateBerita = async (req, res) => {
    const { id } = req.params;
    const { image, judul_berita, konten, tanggal_dibuat } = req.body;
    try {
        let imageBuffer = null;
        if (image) {
            if (!/^data:image\/(png|jpeg|jpg);base64,/.test(image)) {
                return res.status(400).json({ message: "Format gambar tidak valid" });
            }
            imageBuffer = Buffer.from(image.split(",")[1], "base64");
        }

        // Memperbarui berita menggunakan model
        await Berita.update(
            { image: imageBuffer, judul_berita, konten, tanggal_dibuat },
            { where: { id } }
        );

        res.status(200).json({ message: "Berita berhasil diperbarui" });
    } catch (err) {
        console.error("Error updating berita:", err);
        res.status(500).json({ message: "Failed to update berita" });
    }
};

// Menghapus berita
exports.deleteBerita = async (req, res) => {
    const { id } = req.params;
    try {
        // Menghapus berita menggunakan model
        const deleted = await Berita.destroy({ where: { id } });

        if (deleted) {
            res.status(200).json({ message: "Berita berhasil dihapus" });
        } else {
            res.status(404).json({ message: "Berita tidak ditemukan" });
        }
    } catch (err) {
        console.error("Error deleting berita:", err);
        res.status(500).json({ message: "Failed to delete berita" });
    }
};