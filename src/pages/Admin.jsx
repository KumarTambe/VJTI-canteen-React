import { useContext, useState } from "react";
import { MenuContext } from "../context/MenuContext";

function Admin() {

    const { items, setItems } = useContext(MenuContext);

    const [dishName, setDishName] = useState('');
    const [dishCategory, setDishCategory] = useState('');
    const [dishWaitTime, setDishWaitTime] = useState('');
    const [success, setSuccess] = useState(false);



    function handleAdd() {
        setItems([...items, { id: Date.now(), name: dishName, category: dishCategory, waitTime: dishWaitTime }])
        setDishName('')
        setDishCategory('')
        setDishWaitTime('')
        setSuccess(true);
        setTimeout(() => { setSuccess(false) }, 3000)
    }

    return (
        <div className="min-h-screen bg-gray-950 text-white px-6 py-8">
            <div className="max-w-lg mx-auto">
                <h1 className="text-3xl font-bold text-orange-400 mb-2">⚙️ Admin Panel</h1>
                <p className="text-gray-400 mb-8">Add new dishes to the menu</p>

                <div className="bg-gray-900 rounded-2xl p-6 flex flex-col gap-4">
                    <input
                        type="text"
                        placeholder="Dish name"
                        value={dishName}
                        onChange={(e) => setDishName(e.target.value)}
                        className="bg-gray-800 text-white px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-orange-400"
                    />
                    <input
                        type="text"
                        placeholder="Category (e.g. Breakfast, Snack)"
                        value={dishCategory}
                        onChange={(e) => setDishCategory(e.target.value)}
                        className="bg-gray-800 text-white px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-orange-400"
                    />
                    <input
                        type="text"
                        placeholder="Wait time (e.g. 5 min)"
                        value={dishWaitTime}
                        onChange={(e) => setDishWaitTime(e.target.value)}
                        className="bg-gray-800 text-white px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-orange-400"
                    />
                    <button
                        onClick={handleAdd}
                        className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-lg transition"
                    >
                        Add Dish
                    </button>
                    {success && (
                        <p className="text-green-400 text-center font-semibold">✅ Dish added successfully!</p>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Admin;