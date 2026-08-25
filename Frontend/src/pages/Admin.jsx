import { useContext, useState, useEffect } from "react";
import { MenuContext } from "../context/MenuContext";

function Admin() {

    const { items, setItems } = useContext(MenuContext);

    const [dishName, setDishName] = useState('');
    const [dishCategory, setDishCategory] = useState('');
    const [dishWaitTime, setDishWaitTime] = useState('');
    const [success, setSuccess] = useState(false);
    const [topDishes, setTopDishes] = useState([])

    const categoryCount = new Set(items.map(item => item.category)).size

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/api/analytics/top-dishes`)
            .then(res => res.json())
            .then(data => setTopDishes(data))
            .catch(err => console.log(err))
    }, [])

    async function handleAdd() {
        if (!dishName.trim() || !dishCategory || !dishWaitTime) {
            alert('Please fill all the fields')
            return
        }
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/dishes/addDish`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({ name: dishName, category: dishCategory, wait_time: Number(dishWaitTime) })
            })
            if (response.ok) {
                const newDish = await response.json()
                setItems([...items, newDish])
                setDishName('')
                setDishCategory('')
                setDishWaitTime('')
                setSuccess(true)
                setTimeout(() => setSuccess(false), 3000)
            } else {
                alert('Failed to add dish')
            }
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className="min-h-screen text-white px-6 py-8 page-fade-in">
            <div className="max-w-2xl mx-auto">
                <h1 className="text-3xl font-extrabold tracking-tight text-amber-400 mb-2 flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    Admin Panel
                </h1>
                <p className="text-slate-400 mb-8">Add new dishes to the menu</p>

                <div className="grid grid-cols-2 gap-5 mb-8">
                    <div className="surface-card p-5">
                        <p className="text-xs font-bold uppercase tracking-widest text-indigo-300 mb-2">Total Dishes</p>
                        <p className="text-3xl font-extrabold">{items.length}</p>
                    </div>
                    <div className="surface-card p-5">
                        <p className="text-xs font-bold uppercase tracking-widest text-indigo-300 mb-2">Categories</p>
                        <p className="text-3xl font-extrabold">{categoryCount}</p>
                    </div>
                </div>

                <div className="surface-card p-6 flex flex-col gap-4 mb-10">
                    <div className="relative">
                        <svg xmlns="http://www.w3.org/2000/svg" className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 3l1.664 12.31A2 2 0 006.65 17h10.7a2 2 0 001.986-1.69L21 3M3 3h18M3 3l3 8h12l3-8M9 13v6m6-6v6" />
                        </svg>
                        <input
                            type="text"
                            placeholder="Dish name"
                            value={dishName}
                            onChange={(e) => setDishName(e.target.value)}
                            className="w-full bg-slate-800/80 text-white pl-11 pr-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-indigo-400 focus-visible:ring-2 focus-visible:ring-indigo-400 transition border border-slate-700"
                        />
                    </div>
                    <div className="relative">
                        <svg xmlns="http://www.w3.org/2000/svg" className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-5.586 5.586a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 9V4a1 1 0 011-1z" />
                        </svg>
                        <input
                            type="text"
                            placeholder="Category (e.g. Breakfast, Snack)"
                            value={dishCategory}
                            onChange={(e) => setDishCategory(e.target.value)}
                            className="w-full bg-slate-800/80 text-white pl-11 pr-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-indigo-400 focus-visible:ring-2 focus-visible:ring-indigo-400 transition border border-slate-700"
                        />
                    </div>
                    <div className="relative">
                        <svg xmlns="http://www.w3.org/2000/svg" className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <input
                            type="text"
                            placeholder="Wait time (e.g. 5 min)"
                            value={dishWaitTime}
                            onChange={(e) => setDishWaitTime(e.target.value)}
                            className="w-full bg-slate-800/80 text-white pl-11 pr-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-indigo-400 focus-visible:ring-2 focus-visible:ring-indigo-400 transition border border-slate-700"
                        />
                    </div>
                    <button
                        onClick={handleAdd}
                        className="w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold py-3 rounded-lg transition btn-anim focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
                    >
                        Add Dish
                    </button>
                </div>

                {items.length > 0 && (
                    <div>
                        <h2 className="text-sm font-bold uppercase tracking-widest text-indigo-300 mb-3">Existing Dishes</h2>
                        <div className="surface-card overflow-hidden overflow-x-auto">
                            <table className="w-full text-left text-sm">
                                <thead>
                                    <tr className="border-b border-slate-700 text-slate-500 uppercase tracking-wider text-xs">
                                        <th className="px-4 py-3">Name</th>
                                        <th className="px-4 py-3">Category</th>
                                        <th className="px-4 py-3">Wait Time</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {items.map(item => (
                                        <tr key={item.id} className="border-b border-slate-800 last:border-none hover:bg-slate-800/60 transition">
                                            <td className="px-4 py-3 font-semibold">{item.name}</td>
                                            <td className="px-4 py-3 text-slate-300">{item.category}</td>
                                            <td className="px-4 py-3 text-slate-300">{item.wait_time ?? item.waitTime}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>

            {topDishes.length > 0 && (
                <div className="mt-8">
                    <h2 className="text-sm font-bold uppercase tracking-widest text-indigo-300 mb-3">🔥 Top Dishes by Activity</h2>
                    <div className="surface-card overflow-hidden">
                        <table className="w-full text-left text-sm">
                            <thead>
                                <tr className="border-b border-slate-700 text-slate-500 uppercase tracking-wider text-xs">
                                    <th className="px-4 py-3">Rank</th>
                                    <th className="px-4 py-3">Dish</th>
                                    <th className="px-4 py-3">Messages</th>
                                </tr>
                            </thead>
                            <tbody>
                                {topDishes.map((dish, index) => (
                                    <tr key={dish.id} className="border-b border-slate-800 last:border-none hover:bg-slate-800/60 transition">
                                        <td className="px-4 py-3 text-amber-400 font-bold">#{index + 1}</td>
                                        <td className="px-4 py-3 font-semibold">{dish.name}</td>
                                        <td className="px-4 py-3 text-slate-300">{dish.message_count}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {success && (
                <div className="fixed top-20 right-6 bg-emerald-600 text-white px-5 py-3 rounded-lg shadow-lg flex items-center gap-2 toast-in z-50">
                    <span>✅</span>
                    <span className="font-semibold">Dish added successfully!</span>
                </div>
            )}
        </div>
    )
}

export default Admin;
