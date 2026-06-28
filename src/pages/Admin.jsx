import { useContext, useState } from "react";
import { MenuContext } from "../context/MenuContext";

function Admin() {

    const { items, setItems } = useContext(MenuContext);
    const [dishName, setDishName] = useState('');
    const [dishCategory, setDishCategory] = useState('');
    const [dishWaitTime, setDishWaitTime] = useState(0);

    function handleAdd() {
        setItems([...items, { id: Date.now(), name: dishName, category: dishCategory, waitTime: dishWaitTime }])
    }

    return (
        <>
            <h1>Admin Page</h1>
            <p> Enter dish name :</p>
            <input
                type="text"
                value={dishName}
                onChange={(e) => setDishName(e.target.value)}
            />
            <p> Enter dish category :</p>
            <input
                type="text"
                value={dishCategory}
                onChange={(e) => setDishCategory(e.target.value)}
            />
            <p> Enter dish wait time :</p>
            <input
                type="text"
                value={dishWaitTime}
                onChange={(e) => setDishWaitTime(e.target.value)}
            />
            <button onClick={handleAdd}>Add dish</button>
        </>
    )
}

export default Admin;