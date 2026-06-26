from fastapi import FastAPI
from .routers import chat, documents, users

app = FastAPI(
    title="Physical AI Textbook - RAG Chatbot",
    description="RAG-powered chatbot for the Physical AI & Humanoid Robotics textbook",
    version="1.0.0",
)

app.include_router(chat.router, prefix="/api/chat", tags=["chat"])
app.include_router(documents.router, prefix="/api/documents", tags=["documents"])
app.include_router(users.router, prefix="/api/users", tags=["users"])


@app.get("/health")
async def health():
    return {"status": "ok"}
