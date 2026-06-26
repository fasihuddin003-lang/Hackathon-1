from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from app.chat_service import get_chat_response
from app.database import SessionLocal
from app.models import ChatHistory

router = APIRouter()


class ChatRequest(BaseModel):
    question: str
    session_id: str | None = None
    user_id: int | None = None


class ChatResponse(BaseModel):
    answer: str
    session_id: str


@router.post("/")
async def chat(req: ChatRequest):
    if not req.question.strip():
        raise HTTPException(status_code=400, detail="Question cannot be empty")

    session_id = req.session_id or f"session_{abs(hash(req.question))}"

    answer = get_chat_response(req.question, session_id)

    if req.user_id:
        db = SessionLocal()
        try:
            db.add(ChatHistory(user_id=req.user_id, session_id=session_id, role="user", content=req.question))
            db.add(ChatHistory(user_id=req.user_id, session_id=session_id, role="assistant", content=answer))
            db.commit()
        finally:
            db.close()

    return ChatResponse(answer=answer, session_id=session_id)


@router.get("/history/{user_id}")
async def get_history(user_id: int):
    db = SessionLocal()
    try:
        history = (
            db.query(ChatHistory)
            .filter(ChatHistory.user_id == user_id)
            .order_by(ChatHistory.created_at)
            .all()
        )
        return [
            {"role": h.role, "content": h.content, "session_id": h.session_id}
            for h in history
        ]
    finally:
        db.close()
