from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from app.qdrant_service import ingest_document, search_similar

router = APIRouter()


class DocumentRequest(BaseModel):
    doc_id: str
    title: str
    content: str


class SearchRequest(BaseModel):
    query: str
    limit: int = 5


@router.post("/ingest")
async def ingest(req: DocumentRequest):
    try:
        ingest_document(req.doc_id, req.title, req.content)
        return {"status": "ok", "doc_id": req.doc_id}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/search")
async def search(req: SearchRequest):
    results = search_similar(req.query, req.limit)
    return {"results": results}
