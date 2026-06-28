import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { MenuContext } from "../context/MenuContext";
import AIRecommender from "../components/AIRecommender"

function Dashboard() {
    const { user, setUser, isLoggedIn, setIsLoggedIn, isAdmin, setIsAdmin } = useContext(AuthContext)
    const { items, setItems } = useContext(MenuContext);

    const [searchTerm, setSearchTerm] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState('')

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(searchTerm)
        }, 300)
        return () => clearTimeout(timer)
    }, [searchTerm])

    // filter items acc. to the search term of user
    const filteredItems = items.filter((item) =>
        item.name.toLowerCase().includes(debouncedSearch.toLowerCase())
    )

    // get unique categories so that we can display items category wise
    const categories = [...new Set(items.map((item) => item.category))]

    return (
        <>
            <h1>Dashboard</h1>
            <ul>
                {categories.filter(category => (filteredItems.some(item => item.category == category)
                ))
                    .map((category) => (
                        < div key={category} >
                            <h2>{category}</h2>
                            {
                                filteredItems
                                    .filter((item) => item.category == category)
                                    .map((item) => <li key={item.id}>{item.name}</li>)
                            }
                        </div>
                    )
                    )}

            </ul>
            <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />

            <AIRecommender />
        </>
    )
}

export default Dashboard;