import os
import requests

# Ensure the Cartesia API key is set
api_key = os.environ.get("CARTESIA_API_KEY")
if not api_key:
    raise ValueError("CARTESIA_API_KEY environment variable is not set.")

# URL to list voices
url = "https://api.cartesia.ai/voices/"

# Headers for authentication and versioning
headers = {
    "X-API-Key": api_key,
    "Cartesia-Version": "2024-06-10",  # Make sure to use the correct version if needed
}

# Make the GET request to fetch the list of voices
response = requests.get(url, headers=headers)

# Check if the response is successful
if response.status_code == 200:
    voices_data = response.json()
    
    # Directly iterate over the list of voices since the response is a list
    for voice in voices_data:
        print(f"Voice ID: {voice['id']}, Name: {voice['name']}, Language: {voice['language']}")
else:
    print(f"Error: {response.status_code}, {response.text}")
    

