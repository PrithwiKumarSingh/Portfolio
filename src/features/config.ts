/** Gemini's OpenAI-compatible endpoint. Change MODEL freely. */
export const CHAT_CONFIG = {
  endpoint: "https://generativelanguage.googleapis.com/v1beta/openai/chat/completions",
  model: "gemini-3.5-flash",
  apiKey: import.meta.env.VITE_GEMINI_API_KEY as string | undefined,
  temperature: 0.7,
  maxHistory: 12, // only the last N messages are sent, to keep requests small
  maxInputChars: 500, // basic guard against huge prompts
  cooldownMs: 1500, // minimum gap between sends, to avoid accidental spam
} as const;
