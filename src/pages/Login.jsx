import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../context/AuthContext";

function Login() {
    const { user, setUser, isLoggedIn, setIsLoggedIn, isAdmin, setIsAdmin } = useContext(AuthContext);
    const [input, setInput] = useState('');
    const navigate = useNavigate();

    function handleLogIn() {
        if (!input.trim() || input.trim().length < 3) {
            alert('Please enter a valid username (min 3 characters)')
            return
        }
        setIsLoggedIn(true)
        setUser(input)
        if (input === 'admin') setIsAdmin(true)
        navigate('/dashboard')
    }



    return (
        <div className="min-h-screen bg-linear-to-br from-gray-950 via-gray-900 to-orange-950 flex items-center justify-center">
            <div className="bg-gray-900 p-8 rounded-2xl shadow-2xl w-full max-w-md">
                <h1 className="text-3xl font-bold text-orange-400 text-center mb-2">🍽️ VJTI Canteen</h1>
                <p className="text-gray-400 text-center mb-8">Sign in to continue</p>

                <input
                    onKeyDown={
                        (e) => {
                            if (e.key === 'Enter') handleLogIn();
                        }
                    }
                    type="text"
                    placeholder="Enter your username"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg mb-4 outline-none focus:ring-2 focus:ring-orange-400"
                />

                <button
                    onClick={handleLogIn}
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-lg transition"
                >
                    Login
                </button>

                <p className="text-gray-500 text-center text-sm mt-4">
                    Tip: Login as "admin" to access the admin panel
                </p>
            </div>
        </div>
    )
}

export default Login;