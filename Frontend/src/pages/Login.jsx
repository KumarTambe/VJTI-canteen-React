import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Login() {
    const { isLoggedIn, setIsLoggedIn, isAdmin, setIsAdmin } = useContext(AuthContext);
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [invalidShake, setInvalidShake] = useState(false)
    const navigate = useNavigate();

    function triggerShake() {
        setInvalidShake(true)
        setTimeout(() => setInvalidShake(false), 500)
    }

    async function handleLogIn() {
        if (!email.trim() || email.trim().length < 10 && email.trim()) {
            alert('Please enter a valid email')
            triggerShake()
            return
        }
        const url = `${import.meta.env.VITE_API_URL}/api/auth/login`
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            })
            if (!response.ok) {
                console.log("An error occured")
                triggerShake()
            } else {
                const data = await response.json()
                localStorage.setItem('token', data.token)
                setIsLoggedIn(true);
                navigate('/dashboard')
                if (data.role === 'admin') setIsAdmin(true)
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="relative min-h-screen overflow-hidden bg-slate-950 flex items-center justify-center page-fade-in">
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 h-96 w-96 rounded-full bg-indigo-500/20 blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-0 right-1/4 h-72 w-72 rounded-full bg-violet-500/15 blur-3xl pointer-events-none"></div>

            <div className={`relative bg-slate-900/60 backdrop-blur-xl border border-slate-700/80 p-8 rounded-2xl shadow-2xl shadow-black/40 w-full max-w-md float-card ${invalidShake ? 'shake-invalid' : ''}`}>
                <h1 className="text-3xl font-extrabold tracking-tight text-amber-400 text-center mb-2">🍽️ VJTI Canteen</h1>
                <p className="text-slate-400 text-center mb-8">Sign in to continue</p>

                <div className="relative mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <input
                        autoFocus
                        onKeyDown={
                            (e) => {
                                if (e.key === 'Enter') handleLogIn();
                            }
                        }
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-slate-800/80 text-white pl-11 pr-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-indigo-400 focus-visible:ring-2 focus-visible:ring-indigo-400 transition border border-slate-700"
                    />
                </div>
                <div className="relative mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    <input
                        onKeyDown={
                            (e) => {
                                if (e.key === 'Enter') handleLogIn();
                            }
                        }
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full bg-slate-800/80 text-white pl-11 pr-11 py-3 rounded-lg outline-none focus:ring-2 focus:ring-indigo-400 focus-visible:ring-2 focus-visible:ring-indigo-400 transition border border-slate-700"
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-indigo-300 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 rounded-sm"
                    >
                        {showPassword ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                        )}
                    </button>
                </div>

                <button
                    onClick={handleLogIn}
                    className="w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold py-3 rounded-lg transition btn-anim focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
                >
                    Login
                </button>

                <p className="text-slate-500 text-center text-sm mt-4">
                    Don't have an account?{' '}
                    <span onClick={() => navigate('/register')} className="text-indigo-300 cursor-pointer hover:text-indigo-200 transition">Register</span>
                </p>

                <p className="text-slate-500 text-center text-sm mt-4">
                    Tip: Login as "admin" to access the admin panel
                </p>
            </div>
        </div>
    )
}

export default Login;
