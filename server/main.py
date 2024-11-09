import os
import subprocess
from cartesia import Cartesia

# Ensure the Cartesia API key is set
if os.environ.get("CARTESIA_API_KEY") is None:
    raise ValueError("CARTESIA_API_KEY is not set")

# Initialize Cartesia client with the API key
client = Cartesia(api_key=os.environ.get("CARTESIA_API_KEY"))

# Generate TTS audio data from Cartesia
data = client.tts.bytes(
    model_id="sonic-english",  # Model for TTS
    transcript="Hello, world! I'm generating audio on Cartesia.",  # Text to be spoken
    voice_id="a0e99841-438c-4a64-b679-ae501e7d6091",  # Specific voice (Barbershop Man)
    output_format={  # Output format for audio
        "container": "wav",  # Container format: wav
        "encoding": "pcm_f32le",  # Encoding format: pcm_f32le
        "sample_rate": 44100,  # Sample rate for audio
    },
)

# Save the generated audio to a file
with open("sonic.wav", "wb") as f:
    f.write(data)

# Play the audio file using ffplay (ensure ffmpeg is installed)
subprocess.run(["ffplay", "-autoexit", "-nodisp", "sonic.wav"])

