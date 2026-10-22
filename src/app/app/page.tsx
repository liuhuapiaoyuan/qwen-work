import type { Metadata } from "next";
import { AgentHome } from "@/components/sites/qwenwork/agent-home";

export const metadata: Metadata = { title: "千问办公" };

export default function Page() {
  return <AgentHome />;
}
