"use client";

import { useParams } from "next/navigation";
import { ChatPage } from "@/components/sites/qwenwork/chat-page";

export default function Page() {
  const params = useParams<{ sessionId: string }>();
  return <ChatPage sessionId={params.sessionId} />;
}
