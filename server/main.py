import asyncio
import websockets
import openai
import json
import base64
from cartesia import Cartesia

# OpenAI API Key
openai.api_key = "sk-sMfEd_docZTdSpTXYbkSZQ"

# Cartesia TTS API setup (example)
cartesia = Cartesia(api_key="657d6b4d-ce56-4f39-bad6-84996386137d")

async def handle_meditation_request(websocket, path):
    async for message in websocket:
        # Parse the incoming message
        params = json.loads(message)
        speed = params.get('speed')
        emotion = params.get('emotion')
        theme = params.get('theme')

        # Generate a guided meditation script using OpenAI
        meditation_prompt = f"Generate a {speed} paced guided meditation with a {emotion} emotion and a theme of {theme}."
        response = openai.Completion.create(
            model="gpt-4",  # Use GPT-4 for text generation
            prompt=meditation_prompt,
            max_tokens=500  # Adjust based on how long you want the meditation
        )

        meditation_text = response.choices[0].text.strip()

        # Convert the meditation text to speech using Cartesia (or another TTS service)
        audio_data = cartesia.tts.bytes(
            model_id="sonic-english",  # Example model
            transcript=meditation_text,
            voice_id="03496517-369a-4db1-8236-3d3ae459ddf7",  # Example voice ID
            output_format={
                "container": "wav",
                "encoding": "pcm_f32le",
                "sample_rate": 44100,
            }
        )

        # Send the audio as a base64 encoded string
        audio_base64 = base64.b64encode(audio_data).decode('utf-8')
        await websocket.send(audio_base64)

# Start the WebSocket server
async def main():
    server = await websockets.serve(handle_meditation_request, "localhost", 5000)
    await server.wait_closed()

if __name__ == "__main__":
    asyncio.run(main())
