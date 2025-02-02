import React, {useEffect, useState} from "react";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCalendarDays} from "@fortawesome/free-regular-svg-icons";

const API_URL = "http://localhost:5000/api/berita";

const ListBerita = () => {
    const [news, setNews] = useState([]);
    const [selectedNews, setSelectedNews] = useState(null);
    const [newsToDelete, setNewsToDelete] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const [formData, setFormData] = useState(
        {id: "", judul_berita: "", konten: "", tanggal_dibuat: "", image: ""}
    );

    useEffect(() => {
        fetchBerita();
    }, []);

    const fetchBerita = async () => {
        try {
            const res = await fetch(API_URL);
            const data = await res.json();

            // Mengurutkan data berdasarkan tanggal_dibuat, dari yang terbaru
            const sortedData = data.sort((a, b) => {
                return new Date(b.tanggal_dibuat) - new Date(a.tanggal_dibuat);
            });

            setNews(sortedData); // Menyimpan berita yang sudah diurutkan
        } catch (error) {
            console.error("Error fetching berita:", error);
        }
    };

    const handleTambah = () => {
        setSelectedNews(null);
        setFormData(
            {id: "", judul_berita: "", konten: "", tanggal_dibuat: "", image: ""}
        );
        setShowForm(true);
    };

    const handleEdit = (newsItem) => {
        setSelectedNews(newsItem);
        setFormData(
            {id: newsItem.id, judul_berita: newsItem.judul_berita, konten: newsItem.konten, tanggal_dibuat: newsItem.tanggal_dibuat, image: newsItem.image}
        );
        setShowForm(true);
    };

    const handleDelete = async () => {
        if (!newsToDelete) 
            return;
        
        try {
            await fetch(`${API_URL}/${newsToDelete.id}`, {method: "DELETE"});
            fetchBerita(); // Refresh daftar berita setelah penghapusan
            setShowConfirm(false);
            setNewsToDelete(null);
        } catch (error) {
            console.error("Error deleting berita:", error);
        }
    };

    const openConfirmDialog = (newsItem) => {
        setNewsToDelete(newsItem);
        setShowConfirm(true);
    };

    return (
        <div className="container mx-auto p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Daftar Berita</h1>
                <button
                    onClick={handleTambah}
                    className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600">
                    Tambah Data
                </button>
            </div>

            <div className="grid grid-cols-3 gap-6">
                {
                    news.map((item) => (
                        <div key={item.id} className="border rounded-lg shadow-lg p-4">
                            <img
                                src={item.image}
                                alt={item.judul_berita}
                                className="w-full h-48 object-cover"/>
                            <h2 className="text-xl font-semibold mt-2 line-clamp-2">{item.judul_berita}</h2>
                            <p className="text-sm font-medium mt-2 text-gray-400">
                                <span className="mr-2">
                                    <FontAwesomeIcon icon={faCalendarDays}/>
                                </span>
                                {
                                    new Date(item.tanggal_dibuat).toLocaleDateString("id-ID", {
                                        day: 'numeric',
                                        month: "long",
                                        year: "numeric"
                                    })
                                }
                            </p>
                            <div className="mt-6 flex gap-2">
                                <button
                                    onClick={() => handleEdit(item)}
                                    className="bg-blue-500 text-white px-4 py-2 rounded">
                                    Edit
                                </button>
                                <button
                                    onClick={() => openConfirmDialog(item)}
                                    className="bg-red-500 text-white px-4 py-2 rounded">
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))
                }
            </div>

            {
                showConfirm && (
                    <ConfirmDeleteModal
                        berita={newsToDelete}
                        onCancel={() => setShowConfirm(false)}
                        onConfirm={handleDelete}/>
                )
            }

            {
                showForm && (
                    <ModalForm
                        formData={formData}
                        setFormData={setFormData}
                        setShowForm={setShowForm}
                        isEditing={!!selectedNews}
                        fetchBerita={fetchBerita}/>
                )
            }
        </div>
    );
};

const ConfirmDeleteModal = ({berita, onCancel, onConfirm}) => (
    <div
        className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white p-6 rounded-md shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Konfirmasi Penghapusan</h2>
            <p>Apakah Anda yakin ingin menghapus berita "<strong>{
                        berita
                            ?.judul_berita
                    }</strong>"?</p>
            <div className="flex justify-end space-x-4 mt-4">
                <button onClick={onCancel} className="px-4 py-2 bg-gray-300 rounded-md">
                    Batal
                </button>
                <button onClick={onConfirm} className="bg-red-500 text-white px-4 py-2 rounded">
                    Hapus
                </button>
            </div>
        </div>
    </div>
);

const ModalForm = (
    {formData, setFormData, setShowForm, isEditing, fetchBerita}
) => {
    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleFileChange = (e) => {
        const file = e
            .target
            .files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setFormData({
                ...formData,
                image: reader.result
            });
        };
        reader.readAsDataURL(file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = formData.id
            ? `${API_URL}/${formData.id}`
            : API_URL;
        const method = formData.id
            ? "PUT"
            : "POST";

        try {
            await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });
            setShowForm(false);
            fetchBerita();
        } catch (error) {
            console.error("Error submitting berita:", error);
        }
    };

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-md shadow-lg w-96">
                <h2 className="text-xl font-bold mb-4">{
                        isEditing
                            ? "Edit Berita"
                            : "Tambah Berita Baru"
                    }</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block">Judul Berita</label>
                        <input
                            type="text"
                            name="judul_berita"
                            value={formData.judul_berita}
                            onChange={handleChange}
                            className="w-full p-2 border rounded mt-1"/>
                    </div>
                    <div className="mb-4">
                        <label className="block mt-2">Konten</label>
                        <textarea
                            name="konten"
                            value={formData.konten}
                            onChange={handleChange}
                            className="w-full p-2 border rounded mt-1"></textarea>
                    </div>
                    <div className="mb-4">
                        <label className="block mt-2">Gambar</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="w-full p-2 border rounded mt-1"/> {
                            formData.image && <img
                                    src={formData.image}
                                    alt="Preview"
                                    className="w-32 h-32 mt-2 object-cover"/>
                        }
                    </div>
                    <div className="mb-4">
                        <label className="block mt-2">Tanggal Dibuat</label>
                        <input
                            type="date"
                            name="tanggal_dibuat"
                            value={formData.tanggal_dibuat}
                            onChange={handleChange}
                            className="w-full p-2 border rounded mt-1"/>
                    </div>
                    <div className="flex justify-end space-x-4">
                        <button
                            type="button"
                            onClick={() => setShowForm(false)}
                            className="px-4 py-2 bg-gray-300 rounded-md">
                            Batal
                        </button>
                        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
                            {
                                isEditing
                                    ? "Simpan Perubahan"
                                    : "Tambah Berita"
                            }
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ListBerita;
