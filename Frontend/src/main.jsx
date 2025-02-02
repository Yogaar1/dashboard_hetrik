import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import './index.css';

import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Tarif_PPJ from './pages/Tarif_PPJ';
import Tarif_Listrik from './pages/Tarif_Listrik';
import Berita from './pages/berita';

const router = createBrowserRouter([
    {
        path: "/",
        element: <Login/>
    }, {
        path: "/Dashboard",
        element: <Dashboard/>
    }, {
        path: "/Kelola-TarifListrik",
        element: <Tarif_Listrik/>
    }, {
        path: "/Kelola-TarifPPJ",
        element: <Tarif_PPJ/>
    }, {
        path: "/Kelola-Berita",
        element: <Berita/>
    }
])

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <RouterProvider router={router}/>
    </StrictMode>,
)