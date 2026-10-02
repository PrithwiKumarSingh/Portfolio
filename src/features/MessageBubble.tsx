import { motion } from "framer-motion";
import type { ChatMessage } from "./types";

export default function MessageBubble({ message }: { message: ChatMessage }) {
  const isUser = message.role === "user";
  const style = isUser
    ? "ml-auto rounded-br-md bg-fg text-bg"
    : message.isError
      ? "rounded-bl-md border border-red-500/40 bg-red-500/10 text-red-500"
      : "rounded-bl-md border border-line bg-card text-fg";

  return (
    <motion.div initial={{ opacity: 0, y: 8, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.2 }}
      className={`max-w-[85%] whitespace-pre-wrap break-words rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${style}`}>
      {message.content}
    </motion.div>
  );
}
