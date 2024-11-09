from openai import OpenAI

def example_chat(model_name: str, stream: bool = True):
    """ 
    Examples of chat completions from the proxy
    """
    client = OpenAI(
        api_key= "sk-sMfEd_docZTdSpTXYbkSZQ", # set this!!!
        # base_url=PROXY_ENDPOINT # and this!!!
    )

    response = client.chat.completions.create(
        model=model_name,
        messages = [
            {
                "role": "user",
                "content": "Who are you?"
            }
        ],
        stream=stream
    )

    for chunk in response:
        print(chunk)

if __name__ == "__main__":
    example_chat("anthropic/claude-3-5-sonnet-20241022", stream=True)
    example_chat("anthropic/claude-3-5-sonnet-20241022", stream=False)
    example_chat("openai/gpt-4o", stream=True)
    example_chat("openai/gpt-4o", stream=False)
    example_chat("gpt-4o-mini", stream=True)
    example_chat("gpt-4o-mini", stream=False)
    example_chat("gemini/gemini-1.5-pro", stream=True)
    example_chat("gemini/gemini-1.5-pro", stream=False)
