import { useContext, useState } from "react";
import { MenuContext } from "../context/MenuContext";

function AIRecommender() {

    const { items, setItems } = useContext(MenuContext)
    const [mood, setMood] = useState('');
    const [loading, setLoading] = useState(false);
    const [recommendation, setRecommendation] = useState('')
    const [feedback, setFeedback] = useState(null)

    function handleFeedback(value) {
        setFeedback(value);
        localStorage.setItem('feedback', JSON.stringify({
            mood: mood,
            recommendation: recommendation,
            helpful: value == 'helpful'
        }))
    }

    async function handleSubmit() {
        setLoading(true)
        try {
            const response = await fetch(
                `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${import.meta.env.VITE_GEMINI_API_KEY}`,
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
            setMood('')
            setLoading(false)
        } catch (error) {
            setRecommendation('Sorry, could not get recommendation. Try again.')
        }
        setLoading(false)
    }

    return (
        <div>
            <p className="text-gray-400 mb-4">Tell us what you're in the mood for and we'll suggest the perfect dish!</p>

            <div className="flex gap-3 mb-4">
                <input
                    type="text"
                    placeholder="e.g. something spicy and filling..."
                    value={mood}
                    onChange={(e) => setMood(e.target.value)}
                    className="flex-1 bg-gray-800 text-white px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-orange-400"
                />
                <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white font-semibold px-6 py-3 rounded-lg transition"
                >
                    {loading ? '...' : 'Ask AI'}
                </button>
            </div>

            {loading && (
                <p className="text-gray-400 animate-pulse">Getting recommendation...</p>
            )}

            {recommendation && (
                <div className="bg-gray-700 rounded-xl p-4 mt-2">
                    <p className="text-white leading-relaxed">{recommendation}</p>

                    {!feedback ? (
                        <div className="flex gap-3 mt-4">
                            <button
                                onClick={() => handleFeedback('helpful')}
                                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition"
                            >
                                👍 Helpful
                            </button>
                            <button
                                onClick={() => handleFeedback('not-helpful')}
                                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition"
                            >
                                👎 Not Helpful
                            </button>
                        </div>
                    ) : (
                        <p className="text-gray-400 mt-4 text-sm">
                            Thanks for the feedback! {feedback === 'helpful' ? '😊' : '🙏'}
                        </p>
                    )}
                </div>
            )}
        </div>
    )
}

export default AIRecommender;