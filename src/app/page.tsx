import type { Metadata } from "next";
import { MarketingHome } from "@/components/sites/qwenwork/marketing-home";

export const metadata: Metadata = {
  title: "千问办公（QwenWork）官网｜AI办公助手，专业人士都用千问办公",
  description: "养成你的 AI 办公新习惯，专业更进一步。",
};

export default function HomePage() {
  return <MarketingHome />;
}
