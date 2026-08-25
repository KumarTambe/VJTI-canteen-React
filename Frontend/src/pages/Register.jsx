import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";
import { useState } from "react";

function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const navigate = useNavigate();

    async function handleRegister() {
        if (!email.trim() || email.trim().length < 10 && email.trim()) {
            alert('Please enter a valid email')
            return
        }
        const url = "http://localhost:3000/api/auth/register"
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password })
            })
            if (!response.ok) {
                console.log("An error occured")
                return
            } else {
                const data = await response.json();
                localStorage.setItem('token', data.token)
                navigate('/login')
            }
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className="min-h-screen bg-linear-to-br from-gray-950 via-gray-900 to-orange-950 flex items-center justify-center">
            <div className="bg-gray-900 p-8 rounded-2xl shadow-2xl w-full max-w-md">
                <h1 className="text-3xl font-bold text-orange-400 text-center mb-2">🍽️ VJTI Canteen</h1>
                <p className="text-gray-400 text-center mb-8">Create your account</p>

                <input
                    autoFocus
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg mb-4 outline-none focus:ring-2 focus:ring-orange-400"
                />
                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg mb-4 outline-none focus:ring-2 focus:ring-orange-400"
                />
                <input
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg mb-4 outline-none focus:ring-2 focus:ring-orange-400"
                />

                <button
                    onClick={handleRegister}
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-lg transition"
                >
                    Register
                </button>

                <p className="text-gray-500 text-center text-sm mt-4">
                    Already have an account? <span onClick={() => navigate('/login')} className="text-orange-400 cursor-pointer">Login</span>
                </p>
            </div>
        </div>
    )
}

export default Register