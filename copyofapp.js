import React, { useState, useRef } from "react";
import './App.css';


function App() {
    const [speed, setSpeed] = useState("medium");
    const [emotion, setEmotion] = useState("calm");
    const [mood, setMood] = useState("Anxious");
    const audioRef = useRef(null);

    const startMeditation = async () => {
        try {
            const params = { speed, emotion, mood };

            const response = await fetch("http://localhost:8000/generate-audio", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(params),
            });

            if (!response.ok) {
                throw new Error("Failed to start meditation");
            }

            // Stream the audio as a blob
            const audioBlob = await response.blob();
            const audioURL = URL.createObjectURL(audioBlob);

            // Set the audio source and play
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
            <h1>Meditite</h1>

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
                    <option value="upbeat">Upbeat</option>
                    <option value="optimistic">Optimistic</option>
                    <option value="encouraging">Encouraging</option>
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
