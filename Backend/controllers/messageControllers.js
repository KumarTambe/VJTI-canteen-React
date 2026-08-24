import db from '../db/db.js'

export async function getAllMessages(req, res) {
    const dish = req.params.dishId
    const result = await db.query(`SELECT * FROM messages WHERE dish_id = $1`, [dish]);
    res.status(200).json(result.rows);
}

export async function sendMessage(req, res) {
    const dish = req.params.dishId
    const user = req.user.id
    const text = req.body.text
    if (!dish || !user || !text) {
        return res.status(400).json({ message: "Bad request" })
    } else {
        const result = await db.query(`INSERT INTO messages(dish_id,user_id,text) VALUES($1,$2,$3)`, [dish, user, text])
        return res.status(201).json({ message: "Message added successfully" })
    }
}