# Project Constitution

## Core Principles

1. **AI-Native Development**: Leverage AI coding agents (Claude Code) for spec-driven development
2. **Quality First**: All code must be type-safe, tested, and follow Docusaurus best practices
3. **User-Centric Design**: Content must be accessible, bilingual (English/Urdu), and personalized
4. **Documentation as Code**: Specifications, architecture decisions, and prompt history are first-class artifacts
5. **Incremental Delivery**: Build features iteratively with continuous validation

## Development Governance

- All features start with a spec in `.specify/specs/`
- Tech stack: Docusaurus 3, TypeScript, React 19, FastAPI, OpenAI, Qdrant, Neon DB
- Deployment: GitHub Pages with GitHub Actions
- Testing: TypeScript type checking (`tsc`) and build validation (`docusaurus build`)
