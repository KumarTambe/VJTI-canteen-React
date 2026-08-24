import db from '../db/db.js'

export async function getAllDishes(req, res) {
    const result = await db.query(`SELECT * FROM menu_items`);
    res.status(200).json(result.rows)
}

export async function addDish(req, res) {
    if (!req.body.name || !req.body.category || !req.body.wait_time) {
        return res.status(400).json({ message: "Incomplete info" })
    } else {
        const result = await db.query(`INSERT INTO menu_items(name,category,wait_time) VALUES($1,$2,$3)`, [req.body.name, req.body.category, req.body.wait_time])
        return res.status(201).json({ message: "Dish added successfully" })
    }
}

