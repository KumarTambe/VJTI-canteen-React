import { createContext, useState } from "react";

export const MenuContext = createContext();

export function MenuProvider({ children }) {
    const [items, setItems] = useState([
        { id: 1, name: "Idli", category: "Breakfast", waitTime: "10 sec" },
        { id: 2, name: "Dosa", category: "Breakfast", waitTime: "5 min" },
        { id: 3, name: "Vadapav", category: "Snack", waitTime: "10 sec" },
        { id: 4, name: "Noodles", category: "Heavy food", waitTime: "10 min" },
    ])

    return (
        <MenuContext.Provider value={{ items, setItems }}>
            {children}
        </MenuContext.Provider>
    )
}
