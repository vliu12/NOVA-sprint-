from cartesia import Cartesia

# Initialize the Cartesia client with the API key
api_key = "657d6b4d-ce56-4f39-bad6-84996386137d"  # Replace with your actual API key
client = Cartesia(api_key=api_key)

# Function to list voices
def list_voices():
    try:
        # Fetch all voices
        voices = client.voices.list()  # This will return a list of available voices
        for voice in voices:
            print(f"ID: {voice['id']}, Name: {voice['name']}, Language: {voice['language']}")
    except Exception as e:
        print(f"Error: {e}")

# Call the function to list voices
list_voices()
