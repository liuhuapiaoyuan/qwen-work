import type { ReactNode } from "react";
import { AppShell } from "@/components/sites/qwenwork/shell";

export default function AppLayout({ children }: { children: ReactNode }) {
  return <AppShell>{children}</AppShell>;
}
