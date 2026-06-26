# Spec: Physical AI & Humanoid Robotics Textbook

## Overview
Create an AI-native textbook for teaching Physical AI & Humanoid Robotics using Docusaurus, with integrated RAG chatbot, authentication, personalization, and bilingual support.

## User Stories
- As a student, I want to read textbook chapters so that I can learn Physical AI & Humanoid Robotics.
- As a student, I want to ask questions about the content so that I can get instant answers via the RAG chatbot.
- As a student, I want to sign up with my background information so that content can be personalized.
- As a student, I want to translate chapters to Urdu so that I can learn in my native language.
- As an instructor, I want to deploy the book to GitHub Pages so that it's publicly accessible.

## Functional Requirements
1. Book content covering 4 modules and 13 weeks of Physical AI curriculum
2. RAG chatbot using OpenAI + Qdrant + Neon DB for Q&A
3. User authentication with background survey (software/hardware/robotics experience)
4. Per-chapter personalization button using AI
5. Urdu/English bilingual toggle per chapter
6. GitHub Pages deployment via GitHub Actions
7. Spec-Kit Plus integration for spec-driven development

## Tech Stack
- Frontend: Docusaurus 3, TypeScript, React 19
- RAG Backend: FastAPI, Qdrant Cloud, Neon Serverless Postgres, OpenAI
- Auth: Better-Auth with SQLite
- Deployment: GitHub Pages + GitHub Actions
