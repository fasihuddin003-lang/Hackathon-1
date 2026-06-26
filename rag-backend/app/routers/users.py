from fastapi import APIRouter
from pydantic import BaseModel

from app.database import SessionLocal
from app.models import User

router = APIRouter()


class UserCreate(BaseModel):
    email: str
    name: str
    background: dict | None = None


@router.post("/")
async def create_user(req: UserCreate):
    db = SessionLocal()
    try:
        user = User(email=req.email, name=req.name, background=req.background)
        db.add(user)
        db.commit()
        db.refresh(user)
        return {"id": user.id, "email": user.email, "name": user.name}
    finally:
        db.close()


@router.get("/{user_id}")
async def get_user(user_id: int):
    db = SessionLocal()
    try:
        user = db.query(User).filter(User.id == user_id).first()
        if not user:
            return {"error": "User not found"}
        return {"id": user.id, "email": user.email, "name": user.name, "background": user.background}
    finally:
        db.close()
