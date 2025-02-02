import React from "react";

import Logo from '../../assets/Logo.png';

import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faBoltLightning, faNewspaper, faSignOutAlt, faMoneyBill } from "@fortawesome/free-solid-svg-icons";

const Sidebar = () => {
  return (
        <div className="fixed top-0 left-0 h-screen bg-white shadow-md w-64 flex flex-col">
            {/* Logo */}
            <div className="p-4 flex flex-col items-center">
                <img src={Logo} alt="Hetrik Logo" className="w-40 h-auto" />
            </div>

            {/* Navigation */}
            <div className="mx-2 mt-6 flex flex-col space-y-4">
                <NavLink
                    to="/Dashboard"
                    className={({ isActive }) =>
                        `flex items-center space-x-3 py-2 px-4 rounded transition ${
                            isActive
                                ? "bg-blue-600 text-white"
                                : "text-gray-700 hover:bg-blue-100 hover:text-blue-600"
                        }`
                    }
                >
                    <FontAwesomeIcon icon={faHome} />
                    <span>Dashboard</span>
                </NavLink>
                <NavLink
                    to="/Kelola-TarifListrik"
                    className={({ isActive }) =>
                        `flex items-center space-x-3 py-2 px-4 rounded transition ${
                            isActive
                                ? "bg-blue-600 text-white"
                                : "text-gray-700 hover:bg-blue-100 hover:text-blue-600"
                        }`
                    }
                >
                    <FontAwesomeIcon icon={faBoltLightning} />
                    <span>Tarif Listrik</span>
                </NavLink>
                <NavLink
                    to="/Kelola-TarifPPJ"
                    className={({ isActive }) =>
                        `flex items-center space-x-3 py-2 px-4 rounded transition ${
                            isActive
                                ? "bg-blue-600 text-white"
                                : "text-gray-700 hover:bg-blue-100 hover:text-blue-600"
                        }`
                    }
                >
                    <FontAwesomeIcon icon={faMoneyBill} />
                    <span>Tarif PPJ</span>
                </NavLink>
                <NavLink
                    to="/Kelola-Berita"
                    className={({ isActive }) =>
                        `flex items-center space-x-3 py-2 px-4 rounded transition ${
                            isActive
                                ? "bg-blue-600 text-white"
                                : "text-gray-700 hover:bg-blue-100 hover:text-blue-600"
                        }`
                    }
                >
                    <FontAwesomeIcon icon={faNewspaper} />
                    <span>Berita</span>
                </NavLink>
            </div>

            {/* Logout */}
            <div className="mt-auto p-4">
                <NavLink
                    to="/logout"
                    className="flex items-center space-x-3 text-red-600 hover:bg-red-100 py-2 px-4 rounded transition"
                >
                    <FontAwesomeIcon icon={faSignOutAlt} />
                    <span>Keluar</span>
                </NavLink>
            </div>
        </div>
    );
};

export default Sidebar
