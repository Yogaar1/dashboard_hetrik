import React from 'react';

import Sidebar from '../components/UI/Sidebar';
import Header from '../components/UI/Header';
import Tabel_TarifListrik from '../components/pages/Tarif Listrik/Tabel_TarifListrik'

const Tarif_Listrik = () => {
    return (
        <div className="flex h-screen bg-slate-50">
            <Sidebar/>
            <div className="flex-1 flex flex-col bg-slate-50 ml-64">
                {/* Menambahkan margin kiri */}
                <div className="p-6 mb-6">
                    <Tabel_TarifListrik/>
                </div>
            </div>
        </div>
    )
}

export default Tarif_Listrik