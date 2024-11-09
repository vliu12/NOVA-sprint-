import React, { useState, useRef } from "react";

function App() {
    const [speed, setSpeed] = useState("medium");
    const [emotion, setEmotion] = useState("calm");
    const [mood, setMood] = useState("Anxious");
    const audioRef = useRef(null);

    const startMeditation = async () => {
        try {
            const params = { speed, emotion, mood };
    
            const response = await fetch("http://localhost:8000/start-meditation", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(params),
            });
    
            if (!response.ok) {
                throw new Error("Failed to start meditation");
            }
    
            // Stream audio data
            const reader = response.body.getReader();
            const chunks = [];
    
            // Read the response stream
            while (true) {
                const { done, value } = await reader.read();
                if (done) break;
                chunks.push(value);
            }
    
            // Combine all chunks into a single blob and play
            const audioBlob = new Blob(chunks, { type: "audio/wav" });
            const audioURL = URL.createObjectURL(audioBlob);
    
            if (audioRef.current) {
                audioRef.current.src = audioURL;
                audioRef.current.play();
            }
        } catch (error) {
            console.error("Error starting meditation:", error);
        }
    };
    

    return (
        <div className="App">
            <h1>Guided Meditation App</h1>

            <label>
                Speed:
                <select value={speed} onChange={(e) => setSpeed(e.target.value)}>
                    <option value="slow">Slow</option>
                    <option value="medium">Medium</option>
                    <option value="fast">Fast</option>
                </select>
            </label>

            <label>
                Emotion:
                <select value={emotion} onChange={(e) => setEmotion(e.target.value)}>
                    <option value="calm">Calm</option>
                    <option value="joy">Joy</option>
                    <option value="sadness">Sadness</option>
                </select>
            </label>

            <label>
                How are you feeling today?:
                <input
                    type="text"
                    value={mood}
                    onChange={(e) => setMood(e.target.value)}
                    placeholder="How are you feeling today?"
                />
            </label>

            <button onClick={startMeditation}>Start Meditation</button>

            {/* Audio element to play the meditation audio */}
            <audio ref={audioRef} controls hidden />
        </div>
    );
}

export default App;
