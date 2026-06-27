import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {

    const { user, setUser, isLoggedIn, setIsLoggedIn, isAdmin, setIsAdmin } = useContext(AuthContext);
    const navigate = useNavigate();

    function handleLogOut() {
        setIsLoggedIn(false);
        setUser(null);
    }

    function handleLogIn() {
        navigate('/login');
    }

    return (
        <>
            <h1>VJTI canteen</h1>
            <Link to='/dashboard'>Dashboard</Link>
            {
                isLoggedIn ?
                    <>
                        <h1>{user}</h1>
                        <button onClick={handleLogOut}>Log out</button>
                        <Link to='/chat'>Go to chat</Link>
                    </>
                    :
                    <>
                        <button onClick={handleLogIn}>Log in</button>
                    </>
            }
        </>
    )
}

export default Navbar;