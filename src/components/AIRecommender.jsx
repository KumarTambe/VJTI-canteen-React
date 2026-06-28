import { useContext, useState } from "react";
import { MenuContext } from "../context/MenuContext";

function AIRecommender() {

    const { items, setItems } = useContext(MenuContext)
    const [mood, setMood] = useState('');
    const [loading, setLoading] = useState(false);
    const [recommendation, setRecommendation] = useState('')

    async function handleSubmit() {
        setLoading(true)
        try {
            const response = await fetch(
                `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${import.meta.env.VITE_GEMINI_API_KEY}`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        contents: [{
                            parts: [{
                                text: `Here are the available dishes: ${items.map((item) => item.name).join(', ')}. The user is in the mood for: ${mood}. Recommend 1-2 dishes and explain why.`
                            }]
                        }]
                    })
                }
            )
            const data = await response.json()
            const result = data.candidates[0].content.parts[0].text
            setRecommendation(result)
        } catch (error) {
            setRecommendation('Sorry, could not get recommendation. Try again.')
        }
        setLoading(false)
    }

    return (
        <>
            <h1>AI recommendation !</h1>
            {loading && <p>Getting reccommendation...</p>}
            {recommendation && <p>{recommendation}</p>}
            <input
                type="text"
                value={mood}
                onChange={(e) => setMood(e.target.value)}
            />
            <button onClick={handleSubmit}>Submit</button>
        </>
    )
}

export default AIRecommender;