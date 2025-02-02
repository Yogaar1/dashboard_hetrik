import React from 'react';

import Sidebar from '../components/UI/Sidebar';
import Tabel_TarifPPJ from '../components/pages/Tarif PPJ/Tabel_TarifPPJ'

const Tarif_PPJ = () => {
    return (
        <div className="flex h-screen bg-slate-50">
            <Sidebar/>
            <div className="flex-1 flex flex-col bg-slate-50 ml-64">
                {/* Menambahkan margin kiri */}
                <div className="p-6">
                    <div className="mb-6">
                        <Tabel_TarifPPJ/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Tarif_PPJ