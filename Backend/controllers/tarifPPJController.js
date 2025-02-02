const db = require('../config/database');

// Get all PPJ tariffs
const getAllTarifPPJ = async (req, res) => {
    try {
        const [results] = await db.query('SELECT * FROM tarif_ppj');
        res.json(results.map(item => ({ 
            ...item, 
            rate_ppj: parseFloat(item.rate_ppj).toFixed(2) 
        })));
    } catch (err) {
        console.error('Error fetching PPJ tariffs:', err);
        res.status(500).json({ message: 'Failed to fetch data' });
    }
};

// Add a new PPJ tariff
const addTarifPPJ = async (req, res) => {
    const { provinsi, wilayah, rate_ppj, tanggal_dibuat } = req.body;

    if (!provinsi || !wilayah || !rate_ppj || !tanggal_dibuat) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const [result] = await db.query(
            'INSERT INTO tarif_ppj (provinsi, wilayah, rate_ppj, tanggal_dibuat) VALUES (?, ?, ?, ?)',
            [provinsi, wilayah, parseFloat(rate_ppj), tanggal_dibuat]
        );
        res.status(201).json({ message: 'Data added successfully', id: result.insertId });
    } catch (err) {
        console.error('Error adding PPJ tariff:', err);
        res.status(500).json({ message: 'Failed to add data' });
    }
};

// Update a PPJ tariff
const updateTarifPPJ = async (req, res) => {
    const { id } = req.params;
    const { provinsi, wilayah, rate_ppj, tanggal_dibuat } = req.body;

    if (!provinsi || !wilayah || !rate_ppj || !tanggal_dibuat) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const [result] = await db.query(
            'UPDATE tarif_ppj SET provinsi = ?, wilayah = ?, rate_ppj = ?, tanggal_dibuat = ? WHERE id = ?',
            [provinsi, wilayah, parseFloat(rate_ppj), tanggal_dibuat, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Data not found' });
        }

        res.json({ message: 'Data updated successfully' });
    } catch (err) {
        console.error('Error updating PPJ tariff:', err);
        res.status(500).json({ message: 'Failed to update data' });
    }
};

// Delete a PPJ tariff
const deleteTarifPPJ = async (req, res) => {
    const { id } = req.params;

    try {
        const [result] = await db.query('DELETE FROM tarif_ppj WHERE id = ?', [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Data not found' });
        }

        res.json({ message: 'Data deleted successfully' });
    } catch (err) {
        console.error('Error deleting PPJ tariff:', err);
        res.status(500).json({ message: 'Failed to delete data' });
    }
};

module.exports = {
    getAllTarifPPJ,
    addTarifPPJ,
    updateTarifPPJ,
    deleteTarifPPJ,
};
