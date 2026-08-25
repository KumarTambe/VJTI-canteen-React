import { createContext, useEffect, useState } from "react";

export const MenuContext = createContext();

export function MenuProvider({ children }) {

    const [messages, setMessages] = useState([])
    const [items, setItems] = useState([])

    useEffect(() => {
        const url = "http://localhost:3000/api/dishes/getAllDishes"
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
        <MenuContext.Provider value={{ items, setItems, messages, setMessages }}>
            {children}
        </MenuContext.Provider >
    )
}
