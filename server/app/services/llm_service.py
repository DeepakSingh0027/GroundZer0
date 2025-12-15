import os
import json
from pathlib import Path
from dotenv import load_dotenv
from azure.ai.inference import ChatCompletionsClient
from azure.ai.inference.models import SystemMessage, UserMessage
from azure.core.credentials import AzureKeyCredential

from app.services.summary_store import SummaryStore

# Load .env file
env_path = Path(__file__).parent.parent.parent / '.env'
load_dotenv(dotenv_path=env_path)

endpoint = "https://models.github.ai/inference"
token = os.getenv("GITHUB_TOKEN")
model = os.getenv("MODEL_NAME", "gpt-4o-mini")

_client = None

def get_client():
    global _client
    if _client is None:
        if not token or token == "":
            raise ValueError("GITHUB_TOKEN is not set. Please set it in the .env file.")
        _client = ChatCompletionsClient(
            endpoint=endpoint,
            credential=AzureKeyCredential(token)
        )
    return _client

async def ask_llm(query: str):
    try:
        client = get_client()
        _summary = SummaryStore.get_summary()
        response = client.complete(
            messages=[
                SystemMessage(f"""
You are a helpful assistant. Provide accurate and concise answers.
Include reasoning. Format your response exactly as JSON:

{{
    "answer": "your answer here",
    "summary": "a brief summary of this answer and previous summary, max 75 words (include topics names of previous summary must)"
}}

Previous summary: {_summary}
"""),
                UserMessage(query)
            ],
            model=model,
            temperature=0.1,
            top_p=0.95,
        )

        content = response.choices[0].message.content.strip()

        # Parse response as JSON
        try:
            data = json.loads(content)
            answer = data.get("answer", "")
            summary = data.get("summary", "")
        except json.JSONDecodeError:
            # If model fails to return valid JSON
            answer = content
            summary = _summary

        # Update global summary from main.py
        print(summary)
        SummaryStore.set_summary(summary)

        # Return only the answer to frontend (summary stays on server)
        return {"answer": answer}

    except Exception as e:
        error_msg = str(e)
        if "401" in error_msg or "Unauthorized" in error_msg:
            return {"answer": "Error: Invalid or expired GitHub token."}
        elif "404" in error_msg or "Not Found" in error_msg or "unknown_model" in error_msg.lower():
            return {"answer": f"Error: Model '{model}' not found."}
        elif "403" in error_msg or "Forbidden" in error_msg:
            return {"answer": "Error: Access forbidden. Check token permissions."}
        else:
            return {"answer": f"Error: {error_msg}"}
