import React, {useState} from 'react';
import axios from 'axios';

const login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                'http://localhost:5000/login',
                {username, password}
            );
            setMessage(response.data.message);
        } catch (error) {
            setMessage(
                error.response
                    ?.data
                        ?.message || 'Login failed'
            );
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-96">
                <h1 className="text-2xl font-bold mb-4 text-center">Login</h1>
                <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Username</label>
                        <input
                            type="text"
                            className="w-full p-2 border border-gray-300 rounded-lg mt-1"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}/>
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            className="w-full p-2 border border-gray-300 rounded-lg mt-1"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                    <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-lg">
                        Login
                    </button>
                </form>
                {message && <div className="mt-4 text-center text-red-500">{message}</div>}
            </div>
        </div>
    );
}

export default login
