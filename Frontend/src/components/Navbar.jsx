import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {

    const { user, setUser, isLoggedIn, setIsLoggedIn, isAdmin, setIsAdmin } = useContext(AuthContext);
    const navigate = useNavigate();

    function handleLogOut() {
        setIsLoggedIn(false);
        setIsAdmin(false)
        setUser(null);
        navigate('/login')
    }

    function handleLogIn() {
        navigate('/login');
    }

    return (
        <nav className="bg-gray-900 text-white px-6 py-4 flex items-center justify-between shadow-lg">
            <Link to='/dashboard' className="text-3xl font-bold text-orange-400">🍽️&nbsp;&nbsp;VJTI Canteen</Link>

            <div className="flex items-center gap-6">
                <Link to='/dashboard' className="hover:text-orange-400 transition">Menu</Link>

                {isLoggedIn ? (
                    <>
                        <Link to='/chat' className="hover:text-orange-400 transition">Chat</Link>
                        {isAdmin && (
                            <Link to='/admin' className="hover:text-orange-400 transition">Admin</Link>
                        )}
                        <span className="text-orange-400 font-semibold">{user}</span>
                        <button
                            onClick={handleLogOut}
                            className="bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-lg transition"
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <button
                        onClick={handleLogIn}
                        className="bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-lg transition"
                    >
                        Login
                    </button>
                )}
            </div>
        </nav>
    )
}

export default Navbar;