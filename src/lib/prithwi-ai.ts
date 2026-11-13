export interface ChatMessage {
  role: "user" | "model";
  parts: {
    text: string;
  }[];
}

interface ChatResponse {
  reply: string;
}

export async function askPrithwiAI(
  message: string,
  history: ChatMessage[]
): Promise<string> {
  const response = await fetch("/api/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message,
      history,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to communicate with Prithwi AI");
  }

  const data = (await response.json()) as ChatResponse;

  return data.reply;
}