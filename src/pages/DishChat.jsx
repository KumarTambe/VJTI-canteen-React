import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { MenuContext } from "../context/MenuContext";
import { AuthContext } from "../context/AuthContext";

function DishChat() {
    const { id } = useParams();
    const { items, messages, setMessages } = useContext(MenuContext)
    const { user, isLoggedIn } = useContext(AuthContext)
    const [msg, setMsg] = useState('')

    const dish = items.find(item => item.id === Number(id))
    const dishMessages = messages.filter(message => message.dishId === Number(id))

    function handleSubmit() {
        if (!msg.trim()) return
        setMessages([...messages, { id: Date.now(), dishId: Number(id), user: user, text: msg }])
        setMsg('')
    }

    return (
        <div className="min-h-screen bg-gray-950 text-white px-6 py-8">
            <div className="max-w-2xl mx-auto">
                <h1 className="text-3xl font-bold text-orange-400 mb-2">
                    💬 {dish ? dish.name : 'Dish'} Discussion
                </h1>
                <p className="text-gray-400 mb-6">What do people think about this dish?</p>

                <div className="bg-gray-900 rounded-2xl p-6 mb-6 min-h-64 max-h-[500px] overflow-y-auto flex flex-col gap-3">
                    {dishMessages.length === 0 ? (
                        <p className="text-gray-500 text-center">No messages yet. Be the first to comment!</p>
                    ) : (
                        dishMessages.map(message => (
                            <div key={message.id} className="bg-gray-800 rounded-xl px-4 py-3">
                                <span className="text-orange-400 font-semibold">{message.user}</span>
                                <span className="text-gray-400 mx-2">·</span>
                                <span className="text-white">{message.text}</span>
                            </div>
                        ))
                    )}
                </div>

                {isLoggedIn ? (
                    <div className="flex gap-3">
                        <input
                            type="text"
                            placeholder="Share your thoughts..."
                            value={msg}
                            onChange={(e) => setMsg(e.target.value)}
                            onKeyDown={(e) => { if (e.key === 'Enter') handleSubmit() }}
                            className="flex-1 bg-gray-800 text-white px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-orange-400"
                        />
                        <button
                            onClick={handleSubmit}
                            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-lg transition"
                        >
                            Send
                        </button>
                    </div>
                ) : (
                    <p className="text-gray-500 text-center">Please login to join the discussion.</p>
                )}
            </div>
        </div>
    )
}

export default DishChat;