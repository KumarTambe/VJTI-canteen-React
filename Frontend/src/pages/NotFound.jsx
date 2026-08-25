import { useNavigate } from 'react-router-dom'

function NotFound() {
    const navigate = useNavigate()

    return (
        <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center page-fade-in">
            <div className="text-center">
                <h1 className="text-8xl sm:text-9xl font-extrabold tracking-tight mb-4 bounce-in bg-gradient-to-r from-amber-400 to-indigo-400 bg-clip-text text-transparent">404</h1>
                <p className="text-slate-400 text-xl mb-8">Oops! This page doesn't exist. Looks like it went out of stock 🍽️</p>
                <button
                    onClick={() => navigate('/dashboard')}
                    className="bg-amber-500 hover:bg-amber-600 text-white font-semibold px-6 py-3 rounded-lg transition btn-anim focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
                >
                    Back to Menu
                </button>
            </div>
        </div>
    )
}

export default NotFound
