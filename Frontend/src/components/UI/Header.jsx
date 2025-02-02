import React from 'react';

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowUpRightFromSquare} from "@fortawesome/free-solid-svg-icons";

const Header = () => {
    const getInitials = (name) => {
        if (!name) 
            return "A"; // Default inisial jika nama tidak ada
        const initials = name
            .split(" ") // Pisahkan nama berdasarkan spasi
            .map((word) => word[0]) // Ambil huruf pertama dari setiap kata
            .join(""); // Gabungkan huruf-huruf tersebut
        return initials.toUpperCase(); // Ubah ke huruf besar
    };

    return (
        <nav className="flex justify-between items-center px-6 py-4">
            {/* Left Section */}
            <div className="text-xl font-bold text-gray-800">
                Dashboard Hetrik
            </div>

            {/* Right Section */}
            <div className="flex items-center space-x-4">
                {/* Link to View Website */}
                <a
                    href="/view-website"
                    className="text-blue-600 text-sm font-semibold flex items-center space-x-2 hover:underline">
                    <FontAwesomeIcon
                        icon={faArrowUpRightFromSquare}
                        className="w-4 h-4 text-current"/>
                    <span>View Website</span>
                </a>

                <div className="relative group">
                    <div className="flex items-center space-x-2 cursor-pointer">
                        <div
                            className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-gray-100 font-bold">
                            {getInitials(adminName || "Admin")}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Header