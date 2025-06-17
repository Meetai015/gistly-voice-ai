# Gistly Voice AI

This repository contains a minimal voice AI application consisting of a Next.js frontend and a FastAPI backend.

## Frontend
The `frontend` directory holds a TypeScript based Next.js project. Tailwind CSS is configured for styling and the project is ready for integrating the [shadcn/ui](https://ui.shadcn.com) component library.

```bash
cd frontend
npm install
npm run dev
```

Run tests:
```bash
npm test
```

Husky is used for pre-commit hooks. Install hooks with:
```bash
npm run prepare
```

## Backend
The `backend` directory contains a small FastAPI app with a sample route.

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

Run backend tests and install hooks:
```bash
pytest
pre-commit install
```

## Research
See `docs/voice-ai-research.md` for high level guidance on building an enterprise ready voice assistant.
