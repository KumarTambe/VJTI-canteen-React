import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { MenuContext } from "../context/MenuContext";
import AIRecommender from "../components/AIRecommender"
import { useNavigate } from "react-router-dom";

function Dashboard() {
    const { user, setUser, isLoggedIn, setIsLoggedIn, isAdmin, setIsAdmin } = useContext(AuthContext)
    const { items, setItems } = useContext(MenuContext);

    const [searchTerm, setSearchTerm] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState('')

    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(searchTerm)
        }, 300)
        return () => clearTimeout(timer)
    }, [searchTerm])

    // filter items acc. to the search term of user
    const filteredItems = items.filter((item) =>
        item.name.toLowerCase().includes(debouncedSearch.toLowerCase())
    )

    // get unique categories so that we can display items category wise
    const categories = [...new Set(items.map((item) => item.category))]

    return (
        <div className="min-h-screen bg-gray-950 text-white px-6 py-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold text-orange-400 mb-6">Today's Menu</h1>

                <input
                    type="text"
                    placeholder="Search dishes..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg mb-8 outline-none focus:ring-2 focus:ring-orange-400"
                />

                {categories
                    .filter(category => filteredItems.some(item => item.category === category))
                    .map(category => (
                        <div key={category} className="mb-8">
                            <h2 className="text-xl font-semibold text-orange-300 mb-3 border-b border-gray-700 pb-2">
                                {category}
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {filteredItems
                                    .filter(item => item.category === category)
                                    .map(item => (
                                        <div key={item.id} className="bg-gray-800 rounded-xl p-4 hover:bg-gray-700 transition">
                                            <h3 className="text-lg font-semibold">{item.name}</h3>
                                            <p className="text-gray-400 text-sm mt-1">⏱ {item.waitTime}</p>
                                            <button
                                                onClick={() => navigate(`/dish/${item.id}`)}
                                                className="mt-3 text-sm text-orange-400 hover:text-orange-300 transition"
                                            >
                                                💬 Discuss
                                            </button>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    ))}

                <div className="mt-12 bg-gray-900 rounded-2xl p-6">
                    <h2 className="text-2xl font-bold text-orange-400 mb-4">🤖 AI Dish Recommender</h2>
                    <AIRecommender />
                </div>
            </div>
        </div>
    )
}

export default Dashboard;