import { useState } from "react";
import {
  Bot,
  Loader2,
  Send,
  Sparkles,
  X,
} from "lucide-react";

import {
  askPrithwiAI,
  type ChatMessage,
} from "../lib/prithwi-ai";

interface Message {
  id: number;
  role: "user" | "model";
  text: string;
}

const suggestions = [
  "Tell me about Prithwi",
  "What is Mentis?",
  "What is Prithwi learning?",
  "What technologies does he use?",
];

export default function PrithwiAI() {
  const [open, setOpen] = useState(false);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: "model",
      text: "Hey! I'm Prithwi's AI persona. Ask me about his projects, skills, or learning journey.",
    },
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  async function sendMessage(text?: string) {
    const message = (text ?? input).trim();

    if (!message || loading) return;

    const userMessage: Message = {
      id: Date.now(),
      role: "user",
      text: message,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const history: ChatMessage[] = messages.map((message) => ({
        role: message.role,
        parts: [{ text: message.text }],
      }));

      const reply = await askPrithwiAI(message, history);

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          role: "model",
          text: reply,
        },
      ]);
    } catch (error) {
      console.error(error);

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          role: "model",
          text: "Something went wrong. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* Trigger */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="
            fixed bottom-6 right-6 z-50
            flex items-center gap-2
            border border-zinc-700
            bg-zinc-950
            px-4 py-3
            text-sm text-white
            shadow-2xl
            transition
            hover:border-zinc-500
          "
        >
          <Sparkles size={16} />
          Talk to Prithwi AI
        </button>
      )}

      {/* Chat panel */}
      {open && (
        <div
          className="
            fixed bottom-6 right-6 z-50
            flex h-[600px] w-[380px]
            flex-col
            border border-zinc-800
            bg-zinc-950
            text-white
            shadow-2xl
          "
        >
          {/* Header */}
          <div
            className="
              flex items-center justify-between
              border-b border-zinc-800
              px-4 py-4
            "
          >
            <div className="flex items-center gap-3">
              <div
                className="
                  flex h-9 w-9
                  items-center justify-center
                  border border-zinc-700
                  bg-zinc-900
                "
              >
                <Bot size={18} />
              </div>

              <div>
                <p className="text-sm font-medium">
                  Prithwi AI
                </p>

                <p className="text-xs text-zinc-500">
                  Personal AI persona
                </p>
              </div>
            </div>

            <button
              onClick={() => setOpen(false)}
              className="text-zinc-500 transition hover:text-white"
            >
              <X size={18} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 space-y-4 overflow-y-auto p-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.role === "user"
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                <div
                  className={`
                    max-w-[85%]
                    px-3 py-2
                    text-sm leading-6
                    ${
                      message.role === "user"
                        ? "bg-white text-black"
                        : "border border-zinc-800 bg-zinc-900 text-zinc-300"
                    }
                  `}
                >
                  {message.text}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex items-center gap-2 text-xs text-zinc-500">
                <Loader2
                  size={14}
                  className="animate-spin"
                />
                Thinking...
              </div>
            )}
          </div>

          {/* Suggestions */}
          {messages.length === 1 && (
            <div className="flex gap-2 overflow-x-auto px-4 pb-3">
              {suggestions.map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => sendMessage(suggestion)}
                  className="
                    shrink-0
                    border border-zinc-800
                    px-3 py-2
                    text-xs text-zinc-400
                    transition
                    hover:border-zinc-600
                    hover:text-white
                  "
                >
                  {suggestion}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <form
            onSubmit={(event) => {
              event.preventDefault();
              sendMessage();
            }}
            className="
              flex items-center gap-2
              border-t border-zinc-800
              p-3
            "
          >
            <input
              value={input}
              onChange={(event) =>
                setInput(event.target.value)
              }
              placeholder="Ask something..."
              className="
                min-w-0 flex-1
                bg-transparent
                text-sm text-white
                outline-none
                placeholder:text-zinc-600
              "
            />

            <button
              type="submit"
              disabled={!input.trim() || loading}
              className="
                flex h-9 w-9
                shrink-0
                items-center justify-center
                bg-white
                text-black
                transition
                hover:bg-zinc-200
                disabled:cursor-not-allowed
                disabled:opacity-30
              "
            >
              <Send size={15} />
            </button>
          </form>
        </div>
      )}
    </>
  );
}