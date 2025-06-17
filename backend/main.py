from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class Transcript(BaseModel):
    text: str

@app.get("/")
async def root():
    return {"message": "Voice AI backend"}

@app.post("/transcribe")
async def transcribe_audio(data: Transcript):
    # Placeholder for voice recognition logic
    return {"transcript": data.text}
