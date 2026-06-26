# Physical AI & Humanoid Robotics Textbook

An AI-native textbook for teaching Physical AI & Humanoid Robotics, built with Docusaurus.

## Features
- **Interactive Textbook** - 4 modules, 13 weeks of content
- **RAG Chatbot** - Ask questions about the content (OpenAI + Qdrant)
- **Authentication** - Sign up with background survey (Better-Auth)
- **Personalization** - AI-powered content adaptation per chapter
- **Bilingual** - English/Urdu toggle for every chapter
- **GitHub Pages** - Auto-deploy via GitHub Actions

## Tech Stack
- **Frontend**: Docusaurus 3, TypeScript, React 19
- **RAG Backend**: FastAPI, OpenAI, Qdrant, Neon PostgreSQL
- **Auth**: Better-Auth, SQLite
- **Deployment**: GitHub Pages + GitHub Actions

## Quick Start

```bash
# Install dependencies
npm install

# Start dev server
npm start

# Build for production
npm run build
```

## RAG Backend

```bash
cd rag-backend
pip install -r requirements.txt
# Set up .env with API keys
uvicorn app.main:app --reload
```

## Auth Server

```bash
cd auth-server
npm install
npx tsx server.ts
```

## Project Structure

```
├── docs/                    # Book content (14 chapters)
├── src/
│   ├── components/          # React components
│   ├── pages/              # Custom pages
│   └── theme/              # Docusaurus theme overrides
├── rag-backend/            # FastAPI RAG chatbot
├── auth-server/            # Better-Auth server
├── .specify/              # Spec-Kit Plus config
└── .claude/               # Claude Code subagents
```
