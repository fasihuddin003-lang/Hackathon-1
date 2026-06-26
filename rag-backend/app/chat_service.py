from openai import OpenAI

from .config import OPENAI_API_KEY, CHAT_MODEL
from .qdrant_service import search_similar

client = OpenAI(api_key=OPENAI_API_KEY)

SYSTEM_PROMPT = """You are a helpful tutor for the Physical AI & Humanoid Robotics textbook.
Answer questions based ONLY on the provided context from the textbook.
If the context doesn't contain the answer, say you don't know.
Keep answers concise and educational."""


def get_chat_response(question: str, session_id: str | None = None) -> str:
    similar_docs = search_similar(question)

    context = "\n\n".join(
        f"From '{doc['payload'].get('title', 'Unknown')}':\n{doc['payload'].get('content', '')}"
        for doc in similar_docs
    )

    messages = [
        {"role": "system", "content": SYSTEM_PROMPT},
        {"role": "user", "content": f"Context:\n{context}\n\nQuestion: {question}"},
    ]

    resp = client.chat.completions.create(
        model=CHAT_MODEL,
        messages=messages,
        temperature=0.3,
    )

    return resp.choices[0].message.content
