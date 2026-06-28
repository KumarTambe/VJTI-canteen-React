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
        <>
            <h1> Chat page</h1>
            <ul>
                {savedMessages.map((message) => (
                    <li key={message.id}>
                        <strong>{message.user}</strong>{message.text}
                    </li>
                ))}
            </ul>
            <input
                type="text"
                value={msg}
                onChange={(e) => setMsg(e.target.value)}
            />
            <button onClick={handleSubmit}>Submit</button>
        </>
    )
}

export default Chat;
