const db = require('../config/database');

// Get all electricity tariffs
const getAllTarifListrik = async (req, res) => {
    try {
        const [results] = await db.query('SELECT * FROM tarif_dasar_listrik');
        res.json(results.map(item => ({
            ...item,
             tarif_listrik: parseFloat(item.tarif_listrik).toFixed(2),
        })));
    } catch (err) {
        console.error('Error fetching data:', err);
        res.status(500).json({ message: 'Failed to fetch data' });
    }
};

// Add new electricity tariff
const addTarifListrik = async (req, res) => {
    const { jenis_daya, nilai_daya, tarif_listrik, tanggal_dibuat } = req.body;

    if (!jenis_daya || !nilai_daya || !tarif_listrik || !tanggal_dibuat) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    try {
        const [result] = await db.query(
            'INSERT INTO tarif_dasar_listrik (jenis_daya, nilai_daya, tarif_listrik, tanggal_dibuat) VALUES (?, ?, ?, ?)',
            [jenis_daya, nilai_daya, tarif_listrik, tanggal_dibuat]
        );
        res.status(201).json({ message: 'Data successfully added.', id: result.insertId });
    } catch (err) {
        console.error('Error adding data:', err);
        res.status(500).json({ message: 'Failed to add data.' });
    }
};

// Update electricity tariff
const updateTarifListrik = async (req, res) => {
    const { id } = req.params;
    const { jenis_daya, nilai_daya, tarif_listrik, tanggal_dibuat } = req.body;

    if (!jenis_daya || !nilai_daya || !tarif_listrik || !tanggal_dibuat) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    try {
        const [result] = await db.query(
            'UPDATE tarif_dasar_listrik SET jenis_daya = ?, nilai_daya = ?, tarif_listrik = ?, tanggal_dibuat = ? WHERE id = ?',
            [jenis_daya, nilai_daya, tarif_listrik, tanggal_dibuat, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Data not found.' });
        }

        res.json({ message: 'Data successfully updated.' });
    } catch (err) {
        console.error('Error updating data:', err);
        res.status(500).json({ message: 'Failed to update data.' });
    }
};

// Delete electricity tariff
const deleteTarifListrik = async (req, res) => {
    const { id } = req.params;

    try {
        const [result] = await db.query('DELETE FROM tarif_dasar_listrik WHERE id = ?', [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Data not found.' });
        }

        res.json({ message: 'Data successfully deleted.' });
    } catch (err) {
        console.error('Error deleting data:', err);
        res.status(500).json({ message: 'Failed to delete data.' });
    }
};

module.exports = {
    getAllTarifListrik,
    addTarifListrik,
    updateTarifListrik,
    deleteTarifListrik,
};