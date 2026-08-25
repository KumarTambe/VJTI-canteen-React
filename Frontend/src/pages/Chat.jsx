import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

function Chat() {
    const [savedMessages, setSavedMessages] = useState([
        { id: 1, user: "XYZ", text: "Hello World" }
    ])
    const { user, setUser } = useContext(AuthContext)
    const [msg, setMsg] = useState('');

    function handleSubmit() {
        setSavedMessages([...savedMessages, { id: Date.now(), user: user, text: msg }])
        setMsg('');
    }

    return (
        <div className="min-h-screen text-white px-6 py-8 pb-28 page-fade-in">
            <div className="max-w-2xl mx-auto">
                <h1 className="text-3xl font-extrabold tracking-tight text-amber-400 mb-6 flex items-center gap-2">
                    💬 General Discussion
                </h1>

                <div className="surface-card p-6 mb-6 min-h-96 max-h-150 overflow-y-auto flex flex-col gap-3">
                    {savedMessages.length === 0 ? (
                        <div className="text-center py-10">
                            <div className="text-5xl mb-3">💭</div>
                            <p className="text-slate-500">No messages yet. Be the first to comment!</p>
                        </div>
                    ) : (
                        savedMessages.map((message) => {
                            const isMine = message.user === user;
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

                <div className="sticky bottom-0 left-0 right-0 bg-slate-950/95 backdrop-blur-md pt-4 pb-2 flex gap-3">
                    <input
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') handleSubmit()
                        }}
                        type="text"
                        placeholder="Type a message..."
                        value={msg}
                        onChange={(e) => setMsg(e.target.value)}
                        className="flex-1 bg-slate-800 text-white px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-indigo-400 focus-visible:ring-2 focus-visible:ring-indigo-400 transition border border-slate-700"
                    />
                    <button
                        onClick={handleSubmit}
                        className="bg-amber-500 hover:bg-amber-600 text-white font-semibold px-6 py-3 rounded-lg transition btn-anim focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Chat;
