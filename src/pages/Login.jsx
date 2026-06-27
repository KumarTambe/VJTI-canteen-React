import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../context/AuthContext";

function Login() {
    const { user, setUser, isLoggedIn, setIsLoggedIn, isAdmin, setIsAdmin } = useContext(AuthContext);
    const [input, setInput] = useState('');
    const navigate = useNavigate();

    function handleLogIn() {
        setIsLoggedIn(true);
        setUser(input);
        navigate('/dashboard');
    }

    return (
        <>
            <h1>Login page</h1>
            <input
                type="text"
                onChange={(e) => setInput(e.target.value)}
            />
            <button onClick={handleLogIn}>Login</button>
        </>
    )
}

export default Login;