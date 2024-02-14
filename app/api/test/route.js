import Anthropic from "@anthropic-ai/sdk";
import { NextResponse } from "next/server";

export const runtime = "edge";

export const GET = async () => {
  const anthropic = new Anthropic();

  const stream = await anthropic.messages.create({
    max_tokens: 1024,
    messages: [{ role: "user", content: "can you tell me a story" }],
    model: "claude-2.1",
    stream: true,
  });
  for await (const messageStreamEvent of stream) {
    console.log(messageStreamEvent.type);
  }

  return NextResponse.json({ ok: true });
};
