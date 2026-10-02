import { CHAT_CONFIG } from "./config";
import { SYSTEM_PROMPT } from "./persona";
import type { ChatMessage } from "./types";

/** Sends the conversation to the OpenAI-compatible endpoint and returns the reply text. */
export async function requestReply(history: ChatMessage[], signal?: AbortSignal): Promise<string> {
  if (!CHAT_CONFIG.apiKey) throw new Error("Missing VITE_GEMINI_API_KEY in your .env file.");

  const messages = [
    { role: "system", content: SYSTEM_PROMPT },
    ...history.slice(-CHAT_CONFIG.maxHistory).filter((m) => !m.isError).map(({ role, content }) => ({ role, content })),
  ];

  const res = await fetch(CHAT_CONFIG.endpoint, {
    method: "POST",
    signal,
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${CHAT_CONFIG.apiKey}` },
    body: JSON.stringify({ model: CHAT_CONFIG.model, messages, temperature: CHAT_CONFIG.temperature }),
  });

  if (!res.ok) {
    if (res.status === 429) throw new Error("Too many requests right now. Please try again in a minute.");
    throw new Error(`Request failed (${res.status}). Please try again.`);
  }

  const data = await res.json();
  const text: string | undefined = data?.choices?.[0]?.message?.content;
  if (!text) throw new Error("The model returned an empty reply.");
  return text.trim();
}
