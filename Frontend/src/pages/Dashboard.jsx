import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { MenuContext } from "../context/MenuContext";
import AIRecommender from "../components/AIRecommender"
import { useNavigate } from "react-router-dom";

const categoryEmojis = {
    breakfast: '🍳',
    lunch: '🍛',
    dinner: '🍽️',
    snack: '🍟',
    snacks: '🍟',
    beverage: '🥤',
    beverages: '🥤',
    dessert: '🍰',
    desserts: '🍰',
}

function getCategoryEmoji(category) {
    return categoryEmojis[category?.toLowerCase()] || '🍴';
}

function DishCardSkeleton() {
    return (
        <div className="surface-card p-5">
            <div className="h-5 w-2/3 rounded skeleton-shimmer mb-3"></div>
            <div className="h-4 w-1/3 rounded skeleton-shimmer mb-4"></div>
            <div className="h-4 w-1/4 rounded skeleton-shimmer"></div>
        </div>
    )
}

function Dashboard() {
    const { user, setUser, isLoggedIn, setIsLoggedIn, isAdmin, setIsAdmin } = useContext(AuthContext)
    const { items, setItems } = useContext(MenuContext);

    const [searchTerm, setSearchTerm] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState('')
    const [loadingDishes, setLoadingDishes] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(searchTerm)
        }, 300)
        return () => clearTimeout(timer)
    }, [searchTerm])

    useEffect(() => {
        const timer = setTimeout(() => setLoadingDishes(false), 600)
        return () => clearTimeout(timer)
    }, [])

    // filter items acc. to the search term of user
    const filteredItems = items.filter((item) =>
        item.name.toLowerCase().includes(debouncedSearch.toLowerCase())
    )

    // get unique categories so that we can display items category wise
    const categories = [...new Set(items.map((item) => item.category))]

    const today = new Date().toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })

    return (
        <div className="min-h-screen text-white px-6 py-8 page-fade-in">
            <div className="max-w-5xl mx-auto">

                {/* hero / welcome banner */}
                <div className="relative overflow-hidden rounded-2xl mb-10 p-8 bg-gradient-to-br from-indigo-600/30 via-slate-900 to-amber-500/10 border border-slate-700">
                    <div className="absolute -top-16 -right-16 h-56 w-56 rounded-full bg-indigo-500/20 blur-3xl pointer-events-none"></div>
                    <div className="absolute -bottom-20 -left-10 h-48 w-48 rounded-full bg-amber-500/10 blur-3xl pointer-events-none"></div>
                    <div className="relative">
                        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-1">What's on the menu today 🍽️</h1>
                        <p className="text-slate-400 mb-6">{today}</p>

                        <div className="relative max-w-lg">
                            <svg xmlns="http://www.w3.org/2000/svg" className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 10a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            <input
                                type="text"
                                placeholder="Search dishes..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full bg-slate-800/80 text-white pl-11 pr-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-indigo-400 focus-visible:ring-2 focus-visible:ring-indigo-400 transition border border-slate-700"
                            />
                        </div>
                    </div>
                </div>

                {loadingDishes && items.length === 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
                        {Array.from({ length: 6 }).map((_, i) => (
                            <DishCardSkeleton key={i} />
                        ))}
                    </div>
                )}

                {categories
                    .filter(category => filteredItems.some(item => item.category === category))
                    .map((category, idx) => (
                        <div key={category} className="mb-10">
                            <h2 className={`text-sm font-bold uppercase tracking-widest text-indigo-300 mb-4 pl-3 border-l-4 ${idx % 2 === 0 ? 'border-indigo-400' : 'border-amber-400'} flex items-center gap-2`}>
                                <span>{getCategoryEmoji(category)}</span>
                                <span>{category}</span>
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                                {filteredItems
                                    .filter(item => item.category === category)
                                    .map(item => (
                                        <div
                                            key={item.id}
                                            className="surface-card p-5 flex flex-col justify-between transition-all duration-200 hover:border-indigo-400/50 hover:shadow-lg hover:shadow-indigo-500/10 hover:scale-[1.02]"
                                        >
                                            <div>
                                                <div className="flex items-start justify-between gap-2 mb-3">
                                                    <h3 className="text-lg font-semibold leading-snug">{item.name}</h3>
                                                    <span className="shrink-0 text-[11px] font-bold uppercase tracking-wider bg-indigo-500/20 text-indigo-300 px-2.5 py-1 rounded-full border border-indigo-500/30">
                                                        {category}
                                                    </span>
                                                </div>
                                                <div className="mb-4">
                                                    <span className="text-2xl font-extrabold text-white">{item.wait_time}</span>
                                                    <span className="text-xs text-slate-500 ml-1 uppercase tracking-wide">mins wait</span>
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => navigate(`/dish/${item.id}`)}
                                                className="w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold py-2.5 rounded-lg transition btn-anim focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
                                            >
                                                💬 Discuss
                                            </button>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    ))}
                {!loadingDishes && filteredItems.length === 0 && (
                    <div className="text-center mt-12">
                        <div className="text-6xl mb-4">🍽️</div>
                        <p className="text-slate-400 text-lg">
                            {searchTerm ? `No dishes found for "${searchTerm}"` : 'No dishes on the menu yet'}
                        </p>
                        <p className="text-slate-600 text-sm mt-1">Check back again soon!</p>
                    </div>
                )}

                <div className="my-10 border-t border-slate-800"></div>

                <div className="surface-card p-6 glow-pulse-border">
                    <h2 className="text-2xl font-bold text-amber-400 mb-4">🤖 AI Dish Recommender</h2>
                    <AIRecommender />
                </div>
            </div>
        </div>
    )
}

export default Dashboard;
