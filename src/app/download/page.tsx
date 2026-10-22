import type { Metadata } from "next";
import { DownloadPage } from "@/components/sites/qwenwork/download-page";

export const metadata: Metadata = {
  title: "千问办公官方下载｜Windows/MacOS/HarmonyOS/Linux客户端",
};

export default function Page() {
  return <DownloadPage />;
}
