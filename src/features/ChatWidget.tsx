import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { CHAT_CONFIG } from "./config";
import MessageBubble from "./MessageBubble";
import { BOT_NAME, SUGGESTIONS } from "./persona";
import TypingDots from "./TypingDots";
import { useChat } from "./useChat";


export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const { messages, loading, send, reset } = useChat();
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, loading, open]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const submit = (text: string) => { send(text); setInput(""); };
  const showSuggestions = messages.length === 1;

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3">
      <AnimatePresence>
        {open && (
          <motion.section role="dialog" aria-label={BOT_NAME}
            initial={{ opacity: 0, y: 20, scale: 0.92 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20, scale: 0.92 }}
            transition={{ type: "spring", stiffness: 260, damping: 24 }} style={{ transformOrigin: "bottom right" }}
            className="flex h-[min(560px,calc(100vh-7rem))] w-[calc(100vw-2.5rem)] flex-col overflow-hidden rounded-2xl border border-line bg-bg shadow-2xl sm:w-96">
            <header className="flex items-center justify-between border-b border-line bg-card px-4 py-3">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-60" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
                </span>
                <h2 className="text-sm font-semibold">{BOT_NAME}</h2>
              </div>
              <div className="flex gap-1 text-muted">
                <button onClick={reset} aria-label="Clear chat" className="rounded-md px-2 py-1 text-xs hover:bg-line/50 hover:text-fg">Clear</button>
                <button onClick={() => setOpen(false)} aria-label="Close chat" className="rounded-md px-2 py-1 text-sm hover:bg-line/50 hover:text-fg">✕</button>
              </div>
            </header>

            <div className="flex-1 space-y-3 overflow-y-auto p-4">
              {messages.map((m) => <MessageBubble key={m.id} message={m} />)}
              {loading && <TypingDots />}
              {showSuggestions && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {SUGGESTIONS.map((s) => (
                    <motion.button key={s} whileHover={{ y: -2 }} whileTap={{ scale: 0.96 }} onClick={() => submit(s)}
                      className="rounded-full border border-line bg-card px-3 py-1.5 text-xs text-muted hover:text-fg">{s}</motion.button>
                  ))}
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            <div className="flex items-center gap-2 border-t border-line bg-card p-3">
              <input value={input} maxLength={CHAT_CONFIG.maxInputChars} onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && submit(input)} placeholder="Type a message…"
                className="min-w-0 flex-1 rounded-lg border border-line bg-bg px-3 py-2 text-sm outline-none focus:border-muted" />
              <motion.button whileTap={{ scale: 0.92 }} onClick={() => submit(input)} disabled={!input.trim() || loading} aria-label="Send"
                className="rounded-lg bg-fg px-3 py-2 text-sm font-medium text-bg disabled:opacity-40">Send</motion.button>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      <motion.button onClick={() => setOpen((o) => !o)} aria-label={open ? "Close chat" : "Open chat"}
        whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.92 }} initial={{ scale: 0 }} animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 18, delay: 1 }}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-900 text-white shadow-xl">
        <AnimatePresence mode="wait" initial={false}>
          <motion.span key={open ? "x" : "chat"} initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
            {open ? (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>
            ) : (
              <img className="rounded-full object-cover" src="https://res.cloudinary.com/o5mjgvg6/image/upload/v1791109609/Neon_AI_Coder_Avatar.png"/>
            )}
          </motion.span>
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
