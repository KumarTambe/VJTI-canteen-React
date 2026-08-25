import { useContext, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MenuContext } from "../context/MenuContext";
import { AuthContext } from "../context/AuthContext";


function DishChat() {
    const navigate = useNavigate();
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
        <div className="min-h-screen text-white px-6 py-8 pb-28 page-fade-in flex flex-col">
            <div className="max-w-2xl mx-auto w-full flex flex-col flex-1">
                <button
                    onClick={() => navigate('/dashboard')}
                    className="text-slate-400 hover:text-indigo-300 transition mb-6 flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 rounded-sm w-fit"
                >
                    ← Back to Menu
                </button>

                <div className="surface-card p-6 mb-6">
                    <div className="flex items-start justify-between gap-3 mb-2">
                        <h1 className="text-2xl font-extrabold tracking-tight">
                            🍽️ {dish ? dish.name : 'Dish'}
                        </h1>
                        {dish && (
                            <span className="shrink-0 text-[11px] font-bold uppercase tracking-wider bg-indigo-500/20 text-indigo-300 px-2.5 py-1 rounded-full border border-indigo-500/30">
                                {dish.category}
                            </span>
                        )}
                    </div>
                    {dish && (
                        <div className="mb-1">
                            <span className="text-xl font-extrabold text-white">{dish.wait_time}</span>
                            <span className="text-xs text-slate-500 ml-1 uppercase tracking-wide">mins wait</span>
                        </div>
                    )}
                    <p className="text-slate-400">What do people think about this dish?</p>
                </div>

                <div className="surface-card p-6 mb-6 flex-1 min-h-64 max-h-125 overflow-y-auto flex flex-col gap-3">
                    {dishMessages.length === 0 ? (
                        <div className="text-center py-10 m-auto">
                            <div className="text-5xl mb-3">💭</div>
                            <p className="text-slate-500">No messages yet. Be the first to comment!</p>
                        </div>
                    ) : (
                        dishMessages.map(message => {
                            const isMine = isLoggedIn && message.user === user;
                            return (
                                <div key={message.id} className={`flex msg-slide-up ${isMine ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-[75%] rounded-2xl px-4 py-3 ${isMine ? 'bg-indigo-500/90 rounded-br-sm' : 'bg-slate-800 rounded-bl-sm border border-slate-700'}`}>
                                        <div className="flex items-baseline gap-2 mb-1">
                                            <span className={`font-semibold text-sm ${isMine ? 'text-white' : 'text-amber-400'}`}>{message.user}</span>
                                            <span className={`text-xs ${isMine ? 'text-indigo-100' : 'text-slate-500'}`}>
                                                {new Date(message.id).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </span>
                                        </div>
                                        <p className="text-white break-words">{message.text}</p>
                                    </div>
                                </div>
                            )
                        })
                    )}
                </div>

                {isLoggedIn ? (
                    <div className="sticky bottom-0 left-0 right-0 bg-slate-950/95 backdrop-blur-md pt-4 pb-2 flex gap-3">
                        <input
                            type="text"
                            placeholder="Share your thoughts..."
                            value={msg}
                            onChange={(e) => setMsg(e.target.value)}
                            onKeyDown={(e) => { if (e.key === 'Enter') handleSubmit() }}
                            className="flex-1 bg-slate-800 text-white px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-indigo-400 focus-visible:ring-2 focus-visible:ring-indigo-400 transition border border-slate-700"
                        />
                        <button
                            onClick={handleSubmit}
                            className="bg-amber-500 hover:bg-amber-600 text-white font-semibold px-6 py-3 rounded-lg transition btn-anim focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
                        >
                            Send
                        </button>
                    </div>
                ) : (
                    <p className="text-slate-500 text-center">Please login to join the discussion.</p>
                )}
            </div>
        </div>
    )
}

export default DishChat;
