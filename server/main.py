import json
from openai import OpenAI
import os
import time
from cartesia import Cartesia
# from cartesia.tts import OutputFormat_Raw, TtsRequestVoiceSpecifier_Id
from flask import Flask, request, jsonify, Response
from dotenv import load_dotenv
from flask_cors import CORS
import base64
import pyaudio

app = Flask(__name__)
CORS(app)

load_dotenv()

openai_api_key = os.getenv("OPENAI_API_KEY")
cartesia_api_key = os.getenv("CARTESIA_API_KEY")

# Check if the keys are successfully loaded
if not openai_api_key or not cartesia_api_key:
    print("Error: API keys are not set correctly in the .env file.")
    exit()

# Initialize OpenAI client
openai_client = OpenAI(api_key=openai_api_key, base_url= "https://nova-litellm-proxy.onrender.com")

# Initialize Cartesia client
cartesia_client = Cartesia(api_key=cartesia_api_key)

def generate_meditation_script(speed, emotion, mood):
    prompt = f"Generate a {speed} paced guided meditation with a {emotion} mood, in response to how the user is feeling or the user's problems, which is {mood}. Include relaxing phrases and meditation guidance, with a maximum word count of 300 words."
    
    response = openai_client.chat.completions.create(
        model="gpt-4",
        messages=[{"role": "user", "content": prompt}],
    )
    
    # Extract the response text
    meditation_script = response.choices[0].message.content
    return meditation_script


@app.route('/start-meditation', methods=['POST'])
def start_meditation():
    data = request.json
    speed = data.get("speed", "medium")
    emotion = data.get("emotion", "calm")
    mood = data.get("mood", "peaceful visualization")

    # Generate the meditation script
    meditation_script = generate_meditation_script(speed, emotion, mood)
    print("script generated")
    print(meditation_script)
    
    # Generate TTS audio with Cartesia
    def generate_audio():
        tts_response = cartesia_client.tts.bytes(
            model_id="sonic-english",
            transcript=meditation_script,
            voice_id="a0e99841-438c-4a64-b679-ae501e7d6091",  # Example voice ID
            output_format={"container": "wav", "encoding": "pcm_f32le", "sample_rate": 44100},
        )
        
        # Yield audio in chunks
        for chunk in tts_response:
            time.sleep(0.1)  # Simulate real-time streaming delay
            yield chunk

    return Response(generate_audio(), content_type="audio/wav")

if __name__ == "__main__":
    app.run(port=8000)