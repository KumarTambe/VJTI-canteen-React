import { useNavigate } from 'react-router-dom'

function NotFound() {
    const navigate = useNavigate()

    return (
        <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
            <div className="text-center">
                <h1 className="text-8xl font-bold text-orange-400 mb-4">404</h1>
                <p className="text-gray-400 text-xl mb-8">Looks like this page went out of stock 🍽️</p>
                <button
                    onClick={() => navigate('/dashboard')}
                    className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-lg transition"
                >
                    Back to Menu
                </button>
            </div>
        </div>
    )
}

export default NotFound