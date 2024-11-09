import os
import subprocess
from cartesia import Cartesia
from openai import OpenAI
# from cartesia.tts import OutputFormat_Raw, TtsRequestVoiceSpecifier_Id
from flask import Flask, request, jsonify, Response
from dotenv import load_dotenv
from flask_cors import CORS


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

speed = "medium"
emotion = "joy"
mood = "anxious"
transcript = generate_meditation_script(speed, emotion, mood)
print(transcript)

if os.environ.get("CARTESIA_API_KEY") is None:
    raise ValueError("CARTESIA_API_KEY is not set")

client = Cartesia(api_key=os.environ.get("CARTESIA_API_KEY"))

data = client.tts.bytes(
    model_id="sonic-english",
    transcript= transcript,
    voice_id="03496517-369a-4db1-8236-3d3ae459ddf7",  # Barbershop Man
    # You can find the supported output_formats at https://docs.cartesia.ai/api-reference/tts/bytes
    output_format={
        "container": "wav",
        "encoding": "pcm_f32le",
        "sample_rate": 44100,
    },
)

with open("sonic.wav", "wb") as f:
    f.write(data)

# Play the file
subprocess.run(["ffplay", "-autoexit", "-nodisp", "sonic.wav"])