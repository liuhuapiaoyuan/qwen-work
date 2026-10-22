"use client";

import { useState } from "react";
import { SiteFooter, SiteHeader } from "@/components/sites/qwenwork/site-frame";
import { DOWNLOADS, EXTERNAL } from "@/components/sites/qwenwork/data";

const platforms = [
  { id: "mac", label: "macOS", hint: "14 或更高版本" },
  { id: "win", label: "Windows", hint: "当前设备" },
  { id: "harmony", label: "HarmonyOS", hint: "6.1+" },
  { id: "linux", label: "Linux", hint: "Debian 系" },
] as const;

type PlatformId = (typeof platforms)[number]["id"];

export function DownloadPage() {
  const [platform, setPlatform] = useState<PlatformId>("win");

  return (
    <div className="min-h-screen bg-[#f4f6f1] text-[#141414]">
      <SiteHeader active="download" />
      <main className="mx-auto max-w-[880px] px-5 py-16">
        <p className="text-xs tracking-[0.18em] text-[#14141473]">QWENWORK / CLIENT</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">千问办公客户端</h1>
        <p className="mt-4 max-w-xl text-[#141414a6]">本地运行，随时唤起。选择适合你的版本，开始新的 AI 办公方式。</p>
        <p className="mt-6 text-sm text-[#14141473]">支持平台 · macOS 14+ · Windows 10+ · HarmonyOS 6.1+ · Linux Debian 系</p>
        <div role="tablist" aria-label="客户端平台" className="mt-8 grid grid-cols-2 gap-2 md:grid-cols-4">
          {platforms.map((item) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={platform === item.id}
              onClick={() => setPlatform(item.id)}
              className={`rounded-2xl px-3 py-3 text-left ${platform === item.id ? "bg-[#141414] text-white" : "bg-white"}`}
            >
              <span className="block text-sm font-medium">{item.label}</span>
              <span className={`text-xs ${platform === item.id ? "text-white/70" : "text-[#14141473]"}`}>{item.hint}</span>
            </button>
          ))}
        </div>
        <div className="mt-6 space-y-3">
          {platform === "mac" ? (
            <>
              <DownloadRow title="Apple 芯片版" meta="适用于 M 系列芯片 · macOS 14+ · DMG" href={DOWNLOADS.macArm} />
              <DownloadRow title="Intel 芯片版" meta="适用于 Intel Core 处理器 · macOS 14+ · DMG" href={DOWNLOADS.macIntel} />
            </>
          ) : null}
          {platform === "win" ? (
            <DownloadRow title="Windows 版" meta="适用于 Windows 10 及更高版本 · 仅支持 64 位 · EXE" href={DOWNLOADS.windows} recommended />
          ) : null}
          {platform === "harmony" || platform === "linux" ? (
            <DownloadRow
              title={platform === "harmony" ? "HarmonyOS 版" : "Linux 版"}
              meta="安装包与安装步骤以官方下载页和安装指南为准。"
              href="https://qwenwork.cn/download"
            />
          ) : null}
        </div>
        <nav aria-label="千问办公客户端安装指南" className="mt-8 flex flex-wrap gap-4 text-sm">
          <a className="underline" href={EXTERNAL.docs}>macOS 安装指南</a>
          <a className="underline" href={EXTERNAL.docs}>Windows 安装指南</a>
          <a className="underline" href={EXTERNAL.docs}>HarmonyOS 安装指南</a>
          <a className="underline" href={EXTERNAL.docs}>Linux 安装指南</a>
        </nav>
      </main>
      <SiteFooter />
    </div>
  );
}

function DownloadRow({
  title,
  meta,
  href,
  recommended,
}: {
  title: string;
  meta: string;
  href: string;
  recommended?: boolean;
}) {
  return (
    <a href={href} className="flex items-center justify-between gap-4 rounded-3xl bg-white p-5">
      <span>
        <span className="block text-lg font-medium">{title}</span>
        <span className="mt-1 block text-sm text-[#14141473]">{meta}</span>
      </span>
      <span className="shrink-0 rounded-full bg-[#141414] px-4 py-2 text-sm text-white">
        {recommended ? "推荐下载" : "下载"}
      </span>
    </a>
  );
}
