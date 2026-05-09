from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from pydantic import BaseModel

from brain import get_reply, stream_reply

app = FastAPI(title="FS PET Bot API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


class HistoryEntry(BaseModel):
    role: str  # "user" | "assistant"
    content: str


class ChatRequest(BaseModel):
    message: str
    history: list[HistoryEntry] = []


class ChatResponse(BaseModel):
    reply: str


@app.post("/chat", response_model=ChatResponse)
async def chat(req: ChatRequest) -> ChatResponse:
    if not req.message.strip():
        raise HTTPException(status_code=400, detail="message is empty")

    history = [h.model_dump() for h in req.history]
    reply = get_reply(req.message, history)
    return ChatResponse(reply=reply)


@app.post("/chat/stream")
async def chat_stream(req: ChatRequest) -> StreamingResponse:
    if not req.message.strip():
        raise HTTPException(status_code=400, detail="message is empty")

    history = [h.model_dump() for h in req.history]

    def generate():
        for chunk in stream_reply(req.message, history):
            yield chunk

    return StreamingResponse(generate(), media_type="text/plain; charset=utf-8")


@app.get("/health")
async def health() -> dict:
    return {"status": "ok"}
