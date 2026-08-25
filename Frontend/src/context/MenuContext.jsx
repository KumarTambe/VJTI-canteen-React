import { createContext, useEffect, useState } from "react";

export const MenuContext = createContext();

export function MenuProvider({ children }) {
    const [items, setItems] = useState([])

    useEffect(() => {
        const url = `${import.meta.env.VITE_API_URL}/api/dishes/getAllDishes`
        async function fetchData() {
            const response = await fetch(url, {
                method: "GET",
            })
            if (!response.ok) {
                console.log("An error occured")
                return
            } else {
                const data = await response.json();
                setItems(data);
            }
        }
        fetchData();
    }, [])


    return (
        <MenuContext.Provider value={{ items, setItems }}>
            {children}
        </MenuContext.Provider >
    )
}
