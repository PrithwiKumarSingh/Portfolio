# Persona chat (frontend only)

1. Copy `src/features/persona-chat/` into your project's `src/features/`.
2. Add `VITE_GEMINI_API_KEY` to `.env` (see `.env.example`). Add `src/vite-env.d.ts` only if you don't have one.
3. Put your prompt in `persona.ts`.
4. In `App.tsx`: `import { ChatWidget } from "./features/persona-chat";` and render `<ChatWidget />` once.
