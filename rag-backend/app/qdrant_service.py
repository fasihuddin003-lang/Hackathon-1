from qdrant_client import QdrantClient
from qdrant_client.http import models
from fastembed import TextEmbedding

from .config import QDRANT_URL, QDRANT_API_KEY, COLLECTION_NAME, EMBEDDING_MODEL, EMBEDDING_DIM

client = QdrantClient(url=QDRANT_URL, api_key=QDRANT_API_KEY)
embedder = TextEmbedding(model_name=EMBEDDING_MODEL)


def ensure_collection():
    collections = client.get_collections().collections
    if any(c.name == COLLECTION_NAME for c in collections):
        client.delete_collection(collection_name=COLLECTION_NAME)
    client.create_collection(
        collection_name=COLLECTION_NAME,
        vectors_config=models.VectorParams(
            size=EMBEDDING_DIM,
            distance=models.Distance.COSINE,
        ),
    )


def get_embedding(text: str) -> list[float]:
    return list(embedder.embed(text))[0].tolist()


def search_similar(query: str, limit: int = 5) -> list[dict]:
    query_vector = get_embedding(query)
    results = client.query_points(
        collection_name=COLLECTION_NAME,
        query=query_vector,
        limit=limit,
    )
    return [{"score": r.score, "payload": r.payload} for r in results.points]


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
