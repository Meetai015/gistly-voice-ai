import os
import sys
import pytest
from httpx import AsyncClient, ASGITransport

sys.path.append(os.path.dirname(os.path.dirname(__file__)))
from main import app

transport = ASGITransport(app=app)

@pytest.mark.asyncio
async def test_root():
    async with AsyncClient(transport=transport, base_url="http://test") as ac:
        response = await ac.get("/")
    assert response.status_code == 200
    assert response.json() == {"message": "Voice AI backend"}

@pytest.mark.asyncio
async def test_transcribe():
    async with AsyncClient(transport=transport, base_url="http://test") as ac:
        response = await ac.post("/transcribe", json={"text": "hello"})
    assert response.status_code == 200
    assert response.json() == {"transcript": "hello"}
