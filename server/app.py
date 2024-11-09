import os
import subprocess
from cartesia import Cartesia

if os.environ.get("CARTESIA_API_KEY") is None:
    raise ValueError("CARTESIA_API_KEY is not set")

client = Cartesia(api_key=os.environ.get("CARTESIA_API_KEY"))

data = client.tts.bytes(
    model_id="sonic-english",
    transcript="Hello, world! I'm generating audio on Cartesia.",
    voice_id="a0e99841-438c-4a64-b679-ae501e7d6091",  # Barbershop Man
    # You can find the supported `output_format`s at https://docs.cartesia.ai/api-reference/tts/bytes
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
