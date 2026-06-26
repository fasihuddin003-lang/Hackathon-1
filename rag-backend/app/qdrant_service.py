from qdrant_client import QdrantClient
from qdrant_client.http import models
from openai import OpenAI

from .config import QDRANT_URL, QDRANT_API_KEY, COLLECTION_NAME, EMBEDDING_MODEL, OPENAI_API_KEY

client = QdrantClient(url=QDRANT_URL, api_key=QDRANT_API_KEY)
openai_client = OpenAI(api_key=OPENAI_API_KEY)


def ensure_collection():
    collections = client.get_collections().collections
    if not any(c.name == COLLECTION_NAME for c in collections):
        client.create_collection(
            collection_name=COLLECTION_NAME,
            vectors_config=models.VectorParams(
                size=1536,
                distance=models.Distance.COSINE,
            ),
        )


def get_embedding(text: str) -> list[float]:
    resp = openai_client.embeddings.create(
        model=EMBEDDING_MODEL,
        input=text,
    )
    return resp.data[0].embedding


def search_similar(query: str, limit: int = 5) -> list[dict]:
    query_vector = get_embedding(query)
    results = client.search(
        collection_name=COLLECTION_NAME,
        query_vector=query_vector,
        limit=limit,
    )
    return [{"score": r.score, "payload": r.payload} for r in results]


def ingest_document(doc_id: str, title: str, content: str, metadata: dict | None = None):
    vector = get_embedding(content)
    client.upsert(
        collection_name=COLLECTION_NAME,
        points=[
            models.PointStruct(
                id=doc_id,
                vector=vector,
                payload={"title": title, "content": content, **(metadata or {})},
            )
        ],
    )
