import type { Metadata } from "next";
import { SignInPage } from "@/components/sites/qwenwork/signin-page";

export const metadata: Metadata = {
  title: "千问办公",
};

export default function Page() {
  return <SignInPage />;
}
