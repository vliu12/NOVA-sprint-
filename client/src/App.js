import React, { useState, useRef } from "react";

function App() {
    const [speed, setSpeed] = useState("medium");
    const [emotion, setEmotion] = useState("calm");
    const [theme, setTheme] = useState("peaceful visualization");
    const audioRef = useRef(new Audio());
    const wsRef = useRef(null);

    const startMeditation = () => {
        // Initialize WebSocket connection
        wsRef.current = new WebSocket("ws://localhost:8000/ws/meditation");

        wsRef.current.onopen = () => {
            // Send parameters to the backend
            const params = JSON.stringify({ speed, emotion, theme });
            wsRef.current.send(params);
        };

        wsRef.current.onmessage = (event) => {
            // Assuming the backend sends audio chunks as base64
            const audioBlob = new Blob([event.data], { type: "audio/wav" });
            const audioURL = URL.createObjectURL(audioBlob);
            audioRef.current.src = audioURL;
            audioRef.current.play();
        };

        wsRef.current.onclose = () => console.log("Connection closed.");
        wsRef.current.onerror = (error) => console.error("WebSocket error:", error);
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
                Theme:
                <input
                    type="text"
                    value={theme}
                    onChange={(e) => setTheme(e.target.value)}
                    placeholder="e.g., peaceful visualization"
                />
            </label>

            <button onClick={startMeditation}>Start Meditation</button>
        </div>
    );
}

export default App;

