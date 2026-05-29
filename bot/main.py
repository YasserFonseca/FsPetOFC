import os
import time
from collections import defaultdict

from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from pydantic import BaseModel, field_validator

from brain import get_reply, stream_reply

app = FastAPI(title="FS PET Bot API")

ALLOWED_ORIGIN = os.getenv("ALLOWED_ORIGIN", "http://localhost:3000")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[ALLOWED_ORIGIN],
    allow_methods=["POST", "GET"],
    allow_headers=["Content-Type"],
)

_rate_store: dict[str, list[float]] = defaultdict(list)
_RATE_LIMIT = 10
_RATE_WINDOW = 60


def _check_rate_limit(ip: str) -> None:
    now = time.time()
    cutoff = now - _RATE_WINDOW
    _rate_store[ip] = [t for t in _rate_store[ip] if t > cutoff]
    if len(_rate_store[ip]) >= _RATE_LIMIT:
        raise HTTPException(
            status_code=429,
            detail="Muitas requisições. Tente novamente em alguns minutos.",
        )
    _rate_store[ip].append(now)


class HistoryEntry(BaseModel):
    role: str  # "user" | "assistant"
    content: str


class ChatRequest(BaseModel):
    message: str
    history: list[HistoryEntry] = []

    @field_validator("message")
    @classmethod
    def _max_length(cls, v: str) -> str:
        if len(v) > 500:
            raise ValueError("message too long")
        return v


class ChatResponse(BaseModel):
    reply: str


@app.post("/chat", response_model=ChatResponse)
async def chat(req: ChatRequest, request: Request) -> ChatResponse:
    if not req.message.strip():
        raise HTTPException(status_code=400, detail="message is empty")

    _check_rate_limit(request.client.host)

    history = [h.model_dump() for h in req.history]
    reply = get_reply(req.message, history)
    return ChatResponse(reply=reply)


@app.post("/chat/stream")
async def chat_stream(req: ChatRequest, request: Request) -> StreamingResponse:
    if not req.message.strip():
        raise HTTPException(status_code=400, detail="message is empty")

    _check_rate_limit(request.client.host)

    history = [h.model_dump() for h in req.history]

    def generate():
        for chunk in stream_reply(req.message, history):
            yield chunk

    return StreamingResponse(generate(), media_type="text/plain; charset=utf-8")


@app.get("/health")
async def health() -> dict:
    return {"status": "ok"}
