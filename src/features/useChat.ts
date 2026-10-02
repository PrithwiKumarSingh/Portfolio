import { useCallback, useRef, useState } from "react";
import { requestReply } from "./api";
import { CHAT_CONFIG } from "./config";
import { BOT_GREETING } from "./persona";
import type { ChatMessage } from "./types";

const uid = () => crypto.randomUUID();
const greeting: ChatMessage = { id: "greeting", role: "assistant", content: BOT_GREETING };

/** All chat state + sending logic. UI components stay dumb. */
export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([greeting]);
  const [loading, setLoading] = useState(false);
  const lastSent = useRef(0);

  const send = useCallback(async (raw: string) => {
    const text = raw.trim().slice(0, CHAT_CONFIG.maxInputChars);
    if (!text || loading || Date.now() - lastSent.current < CHAT_CONFIG.cooldownMs) return;
    lastSent.current = Date.now();

    const next = [...messages, { id: uid(), role: "user" as const, content: text }];
    setMessages(next);
    setLoading(true);

    try {
      const reply = await requestReply(next);
      setMessages((m) => [...m, { id: uid(), role: "assistant", content: reply }]);
    } catch (e) {
      const content = e instanceof Error ? e.message : "Something went wrong.";
      setMessages((m) => [...m, { id: uid(), role: "assistant", content, isError: true }]);
    } finally {
      setLoading(false);
    }
  }, [messages, loading]);

  const reset = useCallback(() => setMessages([greeting]), []);
  return { messages, loading, send, reset };
}
