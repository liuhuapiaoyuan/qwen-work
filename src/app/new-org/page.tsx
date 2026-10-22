import type { Metadata } from "next";
import { NewOrgPage } from "@/components/sites/qwenwork/new-org-page";

export const metadata: Metadata = {
  title: "企业注册｜千问办公",
};

export default function Page() {
  return <NewOrgPage />;
}
