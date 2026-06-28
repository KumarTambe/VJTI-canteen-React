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
        <div className="min-h-screen bg-gray-950 text-white px-6 py-8">
            <div className="max-w-2xl mx-auto">
                <h1 className="text-3xl font-bold text-orange-400 mb-6">💬 Discussion Board</h1>

                <div className="bg-gray-900 rounded-2xl p-6 mb-6 min-h-64 max-h-96 overflow-y-auto flex flex-col gap-3">
                    {savedMessages.map((message) => (
                        <div key={message.id} className="bg-gray-800 rounded-xl px-4 py-3">
                            <span className="text-orange-400 font-semibold">{message.user}</span>
                            <span className="text-gray-400 mx-2">·</span>
                            <span className="text-white">{message.text}</span>
                        </div>
                    ))}
                </div>

                <div className="flex gap-3">
                    <input
                        type="text"
                        placeholder="Type a message..."
                        value={msg}
                        onChange={(e) => setMsg(e.target.value)}
                        className="flex-1 bg-gray-800 text-white px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-orange-400"
                    />
                    <button
                        onClick={handleSubmit}
                        className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-lg transition"
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Chat;
