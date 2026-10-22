import type { Metadata } from "next";
import { PricingPage } from "@/components/sites/qwenwork/pricing-page";

export const metadata: Metadata = {
  title: "千问办公价格与企业服务｜个人版、企业版套餐及收费说明",
};

export default function Page() {
  return <PricingPage />;
}
