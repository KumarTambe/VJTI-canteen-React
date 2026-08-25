import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate, useLocation } from "react-router-dom";

function Navbar() {

    const { user, setUser, isLoggedIn, setIsLoggedIn, isAdmin, setIsAdmin } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const [mobileOpen, setMobileOpen] = useState(false);

    function handleLogOut() {
        localStorage.removeItem('token')
        setIsLoggedIn(false);
        setIsAdmin(false)
        setUser(null);
        navigate('/login')
        setMobileOpen(false)
    }

    function handleLogIn() {
        navigate('/login');
        setMobileOpen(false)
    }

    function navLinkClasses(path) {
        const isActive = location.pathname === path;
        return `relative pb-1 transition hover:text-indigo-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 rounded-sm ${isActive ? 'text-indigo-300' : 'text-slate-300'} after:content-[''] after:absolute after:left-0 after:-bottom-0.5 after:h-0.5 after:bg-amber-400 after:transition-all after:duration-300 ${isActive ? 'after:w-full' : 'after:w-0'}`;
    }

    return (
        <nav className="sticky top-0 z-50 bg-gradient-to-b from-slate-900/95 to-slate-900/80 backdrop-blur-md text-white px-6 py-4 flex items-center justify-between shadow-lg shadow-black/30 border-b border-indigo-500/20">
            <Link
                to='/dashboard'
                className="text-3xl font-extrabold text-amber-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 rounded-sm tracking-tight"
                style={{ textShadow: '0 0 12px rgba(245, 158, 11, 0.45)' }}
                onClick={() => setMobileOpen(false)}
            >
                🍽️&nbsp;&nbsp;VJTI Canteen
            </Link>

            {/* hamburger toggle - small screens only */}
            <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden p-2 rounded-lg text-white hover:text-indigo-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 btn-anim"
                aria-label="Toggle menu"
            >
                {mobileOpen ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                )}
            </button>

            <div className="hidden md:flex items-center gap-6">
                <Link to='/dashboard' className={navLinkClasses('/dashboard')}>Menu</Link>

                {isLoggedIn ? (
                    <>
                        <Link to='/chat' className={navLinkClasses('/chat')}>Chat</Link>
                        {isAdmin && (
                            <Link to='/admin' className={navLinkClasses('/admin')}>Admin</Link>
                        )}
                        <span className="text-indigo-300 font-semibold">{user}</span>
                        <button
                            onClick={handleLogOut}
                            className="bg-amber-500 hover:bg-amber-600 px-4 py-2 rounded-lg transition btn-anim focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <button
                            onClick={handleLogIn}
                            className="bg-amber-500 hover:bg-amber-600 px-4 py-2 rounded-lg transition btn-anim focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
                        >
                            Login
                        </button>
                        <button
                            onClick={() => navigate('/register')}
                            className="bg-indigo-500 hover:bg-indigo-600 px-4 py-2 rounded-lg transition btn-anim focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300"
                        >
                            Register
                        </button>
                    </>
                )}
            </div>

            {/* mobile dropdown menu */}
            {mobileOpen && (
                <div className="md:hidden absolute top-full left-0 right-0 bg-slate-900/95 backdrop-blur-md border-b border-indigo-500/20 flex flex-col gap-4 px-6 py-4 page-fade-in">
                    <Link to='/dashboard' className={navLinkClasses('/dashboard')} onClick={() => setMobileOpen(false)}>Menu</Link>

                    {isLoggedIn ? (
                        <>
                            <Link to='/chat' className={navLinkClasses('/chat')} onClick={() => setMobileOpen(false)}>Chat</Link>
                            {isAdmin && (
                                <Link to='/admin' className={navLinkClasses('/admin')} onClick={() => setMobileOpen(false)}>Admin</Link>
                            )}
                            <span className="text-indigo-300 font-semibold">{user}</span>
                            <button
                                onClick={handleLogOut}
                                className="bg-amber-500 hover:bg-amber-600 px-4 py-2 rounded-lg transition btn-anim focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <button
                                onClick={handleLogIn}
                                className="bg-amber-500 hover:bg-amber-600 px-4 py-2 rounded-lg transition btn-anim focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
                            >
                                Login
                            </button>
                            <button
                                onClick={() => { navigate('/register'); setMobileOpen(false) }}
                                className="bg-indigo-500 hover:bg-indigo-600 px-4 py-2 rounded-lg transition btn-anim focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300"
                            >
                                Register
                            </button>
                        </>
                    )}
                </div>
            )}
        </nav>
    )
}

export default Navbar;
