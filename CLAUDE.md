# Physical AI & Humanoid Robotics Textbook

## Project Structure
- `/docs/` - Book content (MDX files for each chapter)
- `/src/components/` - React components (ChatBot, AuthForm, ChapterControls)
- `/rag-backend/` - FastAPI backend for RAG chatbot
- `/auth-server/` - Better-Auth authentication server
- `.specify/` - Spec-Kit Plus configuration

## Available Commands
- `npm run start` - Start dev server
- `npm run build` - Build for production
- `npm run typecheck` - Run TypeScript type checking
- `npm run serve` - Serve production build locally

## Tech Stack
- Docusaurus 3 (TypeScript) - Website framework
- FastAPI + OpenAI + Qdrant - RAG chatbot backend
- Better-Auth - Authentication
- GitHub Pages - Deployment

## Conventions
- Use TypeScript for all source files
- Components go in `src/components/`
- Book content in `docs/` as MD/MDX
- Backend code in `rag-backend/` (Python)
- Run `npm run typecheck` before committing

## Subagents
### Textbook Content Writer
Use this subagent to create or edit textbook chapters.
Prompt: "You are a textbook content writer for Physical AI & Humanoid Robotics. Write clear, educational content suitable for university students."

### RAG Backend Developer
Use this subagent to work on the FastAPI chatbot backend.
Prompt: "You are a backend developer specializing in RAG systems. Implement FastAPI endpoints, Qdrant vector search, and OpenAI integration."

### UI Component Developer
Use this subagent to create/update React components.
Prompt: "You are a React/TypeScript UI developer. Create accessible, responsive components for Docusaurus."
