import React from 'react'

import Sidebar from '../components/UI/Sidebar';
import ListBerita from '../components/pages/Berita/ListBerita';

const berita = () => {
    return (
        <div className="flex h-screen">
            <Sidebar/>
            <div className="flex-1 flex flex-col ml-64">
                <div className="p-6">
                    <div className="mb-6">
                        <ListBerita/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default berita