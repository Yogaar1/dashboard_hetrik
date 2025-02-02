import React, {useEffect, useState} from "react";
import axios from "axios";

const API_URL = "http://localhost:5000/api/tarif-ppj"; // URL API untuk melakukan request data tarif PPJ.

const TabelTarifPPJ = () => {
    const [tarifData, setTarifData] = useState([]); //State untuk menyimpan data tarif PPJ.
    const [loading, setLoading] = useState(true); //State untuk mengatur proses loading saat memuat data.
    const [error, setError] = useState(null); //State untuk menangani pesan eror.
    const [filteredData, setFilteredData] = useState([]);
    const [search, setSearch] = useState("");
    const [showForm, setShowForm] = useState(false);
    const [newData, setNewData] = useState(
        {provinsi: "", wilayah: "", rate_ppj: "", tanggal_dibuat: ""}
    );
    const [editData, setEditData] = useState(null);

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await axios.get(API_URL);
            const sortedData = response
                .data
                .sort((a, b) => a.provinsi.localeCompare(b.provinsi));
            setTarifData(sortedData);
            setFilteredData(sortedData);
            setError(null);
        } catch (err) {
            setError("Gagal memuat data. Silakan coba lagi nanti.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleSearch = (e) => {
        const query = e
            .target
            .value
            .toLowerCase();
        setSearch(query);
        const filtered = tarifData.filter(
            (item) => item.wilayah.toLowerCase().includes(query)
        );
        setFilteredData(filtered);
    }

    const resetForm = () => {
        setNewData({provinsi: "", wilayah: "", rate_ppj: "", tanggal_dibuat: ""});
        setEditData(null);
        setShowForm(false);
        setError(null);
    };

    const handleSaveData = async () => {
        if (!newData.provinsi || !newData.wilayah || !newData.rate_ppj) {
            setError("Semua field wajib diisi.");
            return;
        }

        const desimalRate = parseFloat(newData.rate_ppj) / 100;
        if (isNaN(desimalRate)) {
            setError("Rate PPJ harus berupa angka.");
            return;
        }

        try {
            if (editData) {
                await axios.put(`${API_URL}/${editData.id}`, {
                    ...newData,
                    rate_ppj: desimalRate
                });
            } else {
                await axios.post(API_URL, {
                    ...newData,
                    rate_ppj: desimalRate
                });
            }
            fetchData();
            resetForm();
        } catch (err) {
            setError("Gagal menyimpan data. Silakan coba lagi nanti.");
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${API_URL}/${id}`);
            fetchData();
        } catch (err) {
            setError("Gagal menghapus data. Silakan coba lagi nanti.");
        }
    };

    if (loading) 
        return <p className="text-center">Loading...</p>;
    if (error) 
        return <p className="text-center text-red-500">{error}</p>;
    
    return (
        <div className="w-full mx-auto bg-white rounded-lg shadow-md p-6 relative">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-xl font-semibold">Data Tarif PPJ</h1>
                <div className="flex items-center">
                    <input
                        type="text"
                        placeholder="Cari wilayah..."
                        value={search}
                        onChange={handleSearch}
                        className="border border-gray-300 px-4 py-2 rounded-md mr-6"/>
                    <button
                        onClick={() => setShowForm(true)}
                        className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600">
                        Tambah Data
                    </button>
                </div>
            </div>

            <table className="min-w-full table-auto border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="px-4 py-2 text-center">ID</th>
                        <th className="px-4 py-2 text-center">Provinsi</th>
                        <th className="px-4 py-2 text-center">Wilayah</th>
                        <th className="px-4 py-2 text-center">Rate PPJ</th>
                        <th className="px-4 py-2 text-center">Tanggal Dibuat</th>
                        <th className="px-4 py-2 text-center">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        filteredData.length > 0
                            ? (filteredData.map((item, index) => (
                                <tr key={item.id} className="hover:bg-gray-100">
                                    <td className="px-4 py-2 text-center">{index + 1}</td>
                                    <td className="px-4 py-2">{item.provinsi}</td>
                                    <td className="px-4 py-2">{item.wilayah}</td>
                                    <td className="px-4 py-2 text-center">
                                        {
                                            item
                                                ?.rate_ppj !== undefined && item
                                                    ?.rate_ppj !== null
                                                        ? `${ (item.rate_ppj * 100).toFixed(1)}%`
                                                        : '-'
                                        }
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
                                                setNewData({
                                                    provinsi: item.provinsi,
                                                    wilayah: item.wilayah,
                                                    rate_ppj: (item.rate_ppj * 100).toFixed(1),
                                                    tanggal_dibuat: item.tanggal_dibuat
                                                });
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
                            )))
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
                        ? "Edit Data Tarif PPJ"
                        : "Tambah Data Tarif PPJ"
                }
            </h2>
            <form>
                <div className="mb-4">
                    <label className="block text-gray-700">Provinsi</label>
                    <input
                        type="text"
                        value={newData.provinsi}
                        placeholder="Masukkan nama provinsi"
                        onChange={(e) => setNewData({
                            ...newData,
                            provinsi: e.target.value
                        })}
                        className="w-full border border-gray-300 px-4 py-2 rounded-md"/>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Wilayah</label>
                    <input
                        type="text"
                        value={newData.wilayah}
                        placeholder="Masukkan wilayah"
                        onChange={(e) => setNewData({
                            ...newData,
                            wilayah: e.target.value
                        })}
                        className="w-full border border-gray-300 px-4 py-2 rounded-md"/>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Rate PPJ (%)</label>
                    <input
                        type="number"
                        step="0.01"
                        value={newData.rate_ppj}
                        placeholder="Masukkan rate PPJ dalam %"
                        onChange={(e) => setNewData({
                            ...newData,
                            rate_ppj: e.target.value
                        })}
                        className="w-full border border-gray-300 px-4 py-2 rounded-md"/>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Tanggal Dibuat</label>
                    <input
                        type="date"
                        value={newData.tanggal_dibuat}
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

export default TabelTarifPPJ;
