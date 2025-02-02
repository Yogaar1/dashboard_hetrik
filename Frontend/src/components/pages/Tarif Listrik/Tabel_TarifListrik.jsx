import React, {useEffect, useState} from "react";
import axios from "axios";

const API_URL = "http://localhost:5000/api/tarif-listrik"; // URL API untuk melakukan request data tarif listrik.

const Tabel_TarifListrik = () => {
    const [data, setData] = useState([]); //State untuk menyimpan data tarif listrik.
    const [loading, setLoading] = useState(true); //State untuk mengatur proses loading saat memuat data.
    const [error, setError] = useState(null); //State untuk menangani pesan eror.
    const [showForm, setShowForm] = useState(false); //State untuk mengatur form input data baru.
    const [newData, setNewData] = useState(
        {jenis_daya: "", nilai_daya: "", tarif_listrik: "", tanggal_dibuat: ""}
    ); // State untuk menyimpan data baru atau data yang diedit.
    const [editData, setEditData] = useState(null); // State untuk menyimpan data yang sedang diedit.

    //Fungsi untuk mengambil data tarif listrik dari API dan mengatur urutannya.
    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await axios.get(API_URL);
            setData(response.data); // Menggunakan data asli tanpa pemrosesan tambahan
            setError(null);
        } catch (err) {
            setError("Gagal memuat data. Silakan coba lagi nanti.");
        } finally {
            setLoading(false);
        }
    };

    // useEffect untuk memuat data saat pertama kali dirender.
    useEffect(() => {
        fetchData();
    }, []);

    //Fungsi untuk mereset form input data baru.
    const resetForm = () => {
        setNewData(
            {jenis_daya: "", nilai_daya: "", tarif_listrik: "", tanggal_dibuat: ""}
        );
        setShowForm(false);
        setEditData(null);
        setError(null);

    };

    //Fungsi untuk menangani penyimpanan data atau memperbarui data tarif listrik.
    const handleSaveData = async () => {
        if (!newData.jenis_daya || !newData.nilai_daya || !newData.tarif_listrik) {
            alert("Harap isi semua field!");
            return;
        }

        try {
            if (editData) {
                await axios.put(`${API_URL}/${editData.id}`, newData);
            } else {
                await axios.post(API_URL, newData);
            }

            resetForm();
            fetchData(); // Ambil data terbaru setelah menyimpan
        } catch (err) {
            setError("Gagal menyimpan data. Silakan coba lagi nanti.");
        }
    };

    //Fungsi untuk menangani proses hapus data berdasarkan ID.
    const handleDelete = async (id) => {
        try {
            await axios.delete(`${API_URL}/${id}`);
            setData(data.filter((item) => item.id !== id));
        } catch (error) {
            console.error("Error deleting data:", error);
        }
    };

    // Render loading atau pesan error.
    if (loading) 
        return <p className="text-center">Loading...</p>;
    if (error) 
        return <p className="text-center text-red-500">{error}</p>;
    
    return (
        <div className="w-full mx-auto bg-white rounded-lg shadow-md p-6 relative">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-xl font-semibold">Data Tarif Adjustment Listrik</h1>
                <button
                    onClick={() => setShowForm(true)}
                    className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600">
                    Tambah Data
                </button>
            </div>

            <table className="min-w-full table-auto border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="px-4 py-2 text-center">ID</th>
                        <th className="px-4 py-2 text-center">Jenis Daya</th>
                        <th className="px-4 py-2 text-center">Nilai Daya</th>
                        <th className="px-4 py-2 text-center">Tarif Listrik</th>
                        <th className="px-4 py-2 text-center">Tanggal Dibuat</th>
                        <th className="px-4 py-2 text-center">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.length > 0
                            ? data.map((item, index) => (
                                <tr key={item.id} className="hover:bg-gray-100">
                                    <td className="px-4 py-2 text-center">{index + 1}</td>
                                    <td className="px-4 py-2">{item.jenis_daya}</td>
                                    <td className="px-4 py-2 text-center">
                                        {Number(item.nilai_daya).toLocaleString()}
                                    </td>
                                    <td className="px-4 py-2">
                                        Rp.{Number(item.tarif_listrik).toLocaleString()}
                                    </td>
                                    <td className="px-4 py-2 text-center">
                                        {
                                            new Date(item.tanggal_dibuat).toLocaleDateString("id-ID", {
                                                day: "numeric",
                                                month: "long",
                                                year: "numeric"
                                            })
                                        }
                                    </td>
                                    <td className="px-4 py-2 text-center">
                                        <button
                                            onClick={() => {
                                                setShowForm(true);
                                                setEditData(item);
                                                setNewData(
                                                    {jenis_daya: item.jenis_daya, nilai_daya: item.nilai_daya, tarif_listrik: item.tarif_listrik, tanggal_dibuat: item.tanggal_dibuat}
                                                );
                                            }}
                                            className="text-blue-500 px-4 py-2 rounded-md mr-2">
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(item.id)}
                                            className="text-red-500 px-4 py-2 rounded-md">
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                            : (
                                <tr>
                                    <td colSpan="6" className="text-center py-4">
                                        Tidak ada data yang cocok dengan pencarian Anda.
                                    </td>
                                </tr>
                            )
                    }
                </tbody>
            </table>

            {
                showForm && (
                    <ModalForm
                        newData={newData}
                        setNewData={setNewData}
                        handleSaveData={handleSaveData}
                        resetForm={resetForm}
                        editData={editData}/>
                )
            }
        </div>
    );
};

const ModalForm = ({newData, setNewData, handleSaveData, resetForm, editData}) => (
    <div
        className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white p-6 rounded-md shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">
                {
                    editData
                        ? "Edit Data Tarif Listrik"
                        : "Tambah Data Tarif Listrik"
                }
            </h2>
            <form>
                <div className="mb-4">
                    <label className="block text-gray-700">Jenis Daya</label>
                    <input
                        type="text"
                        name="jenis_daya"
                        value={newData.jenis_daya || ""}
                        placeholder="Masukkan jenis daya"
                        onChange={(e) => setNewData({
                            ...newData,
                            jenis_daya: e.target.value
                        })}
                        className="w-full border border-gray-300 px-4 py-2 rounded-md"/>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Nilai Daya</label>
                    <input
                        type="number"
                        name="nilai_daya"
                        value={newData.nilai_daya || ""}
                        placeholder="Masukkan nilai daya listrik"
                        onChange={(e) => setNewData({
                            ...newData,
                            nilai_daya: e.target.value
                        })}
                        className="w-full border border-gray-300 px-4 py-2 rounded-md"/>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Tarif Listrik</label>
                    <input
                        type="number"
                        name="tarif_listrik"
                        value={newData.tarif_listrik || ""}
                        placeholder="Masukkan tarif listrik"
                        onChange={(e) => setNewData({
                            ...newData,
                            tarif_listrik: e.target.value
                        })}
                        className="w-full border border-gray-300 px-4 py-2 rounded-md"/>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Tanggal Dibuat</label>
                    <input
                        type="date"
                        name="tanggal_dibuat"
                        value={newData.tanggal_dibuat || ""}
                        onChange={(e) => setNewData({
                            ...newData,
                            tanggal_dibuat: e.target.value
                        })}
                        className="w-full border border-gray-300 px-4 py-2 rounded-md"/>
                </div>
                <div className="flex justify-end space-x-4">
                    <button
                        type="button"
                        onClick={resetForm}
                        className="px-4 py-2 bg-gray-300 rounded-md">
                        Batal
                    </button>
                    <button
                        type="button"
                        onClick={handleSaveData}
                        className="px-4 py-2 bg-blue-500 text-white rounded-md">
                        Simpan
                    </button>
                </div>
            </form>
        </div>
    </div>
);

export default Tabel_TarifListrik;
