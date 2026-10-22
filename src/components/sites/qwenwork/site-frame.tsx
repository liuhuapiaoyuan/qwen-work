"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, ChevronDown, Menu, X } from "lucide-react";
import { Wordmark } from "@/components/sites/qwenwork/brand";
import { EXTERNAL } from "@/components/sites/qwenwork/data";

const docs = [
  { label: "帮助中心", href: EXTERNAL.docs },
  { label: "更新日志", href: EXTERNAL.releaseNotes },
];

const events = [
  { label: "AI创造者计划", href: EXTERNAL.creator },
  { label: "千问办公大使", href: EXTERNAL.ambassador },
  { label: "AI生产力大赛", href: EXTERNAL.contest },
];

export function SiteHeader({ active }: { active?: "home" | "pricing" | "download" }) {
  const [open, setOpen] = useState<"docs" | "events" | null>(null);
  const [mobile, setMobile] = useState(false);
  const [banner, setBanner] = useState(true);

  return (
    <div className="sticky top-0 z-40">
      {banner ? (
        <div className="flex items-center justify-center gap-3 bg-[#d9f5e4] px-4 py-2 text-sm text-[#143022]">
          <img src="/sites/qwenwork/mascot.svg" alt="" className="size-6" />
          <Link href="/app" className="hover:underline">
            千问办公，注册就送 2000 积分
          </Link>
          <Link href="/signin" className="font-medium">
            立即注册 →
          </Link>
          <button
            type="button"
            aria-label="关闭活动公告"
            className="absolute right-4 text-[#143022]/70"
            onClick={() => setBanner(false)}
          >
            <X className="size-4" />
          </button>
        </div>
      ) : null}
      <header className="border-b border-[#14141414] bg-[#f6f7f4]/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-[1200px] items-center gap-6 px-5">
          <Link href="/" aria-label="千问办公官网首页" className="shrink-0">
            <Wordmark />
          </Link>
          <nav aria-label="官网导航" className="hidden flex-1 items-center justify-center gap-6 text-sm text-[#141414] md:flex">
            <NavLink href="/" current={active === "home"}>首页</NavLink>
            <NavLink href="/pricing" current={active === "pricing"}>价格与企业服务</NavLink>
            <NavLink href="/download" current={active === "download"}>下载</NavLink>
            <a href={EXTERNAL.learn} className="hover:opacity-70">学习社区</a>
            <MenuButton
              label="文档"
              open={open === "docs"}
              onToggle={() => setOpen(open === "docs" ? null : "docs")}
              items={docs}
            />
            <MenuButton
              label="活动"
              open={open === "events"}
              onToggle={() => setOpen(open === "events" ? null : "events")}
              items={events}
            />
          </nav>
          <div className="ml-auto hidden items-center gap-3 md:flex">
            <Link href="/new-org" className="text-sm">企业注册</Link>
            <Link
              href="/app"
              className="inline-flex h-10 items-center gap-1 rounded-full bg-[#141414] px-4 text-sm text-white"
            >
              开始探索 <ArrowRight className="size-4" />
            </Link>
          </div>
          <button
            type="button"
            className="ml-auto inline-flex size-10 items-center justify-center rounded-full border border-[#1414141a] md:hidden"
            aria-label="打开菜单"
            onClick={() => setMobile(true)}
          >
            <Menu className="size-5" />
          </button>
        </div>
      </header>
      {mobile ? (
        <div className="fixed inset-0 z-50 bg-[#f6f7f4] p-5 md:hidden">
          <div className="flex items-center justify-between">
            <Wordmark />
            <button type="button" aria-label="关闭菜单" onClick={() => setMobile(false)}>
              <X />
            </button>
          </div>
          <div className="mt-8 flex flex-col gap-4 text-lg">
            <Link href="/" onClick={() => setMobile(false)}>首页</Link>
            <Link href="/pricing" onClick={() => setMobile(false)}>价格与企业服务</Link>
            <Link href="/download" onClick={() => setMobile(false)}>下载</Link>
            <a href={EXTERNAL.learn}>学习社区</a>
            <Link href="/signin" onClick={() => setMobile(false)}>登录</Link>
            <Link href="/app" onClick={() => setMobile(false)}>使用网页端</Link>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function NavLink({
  href,
  current,
  children,
}: {
  href: string;
  current?: boolean;
  children: string;
}) {
  return (
    <Link href={href} aria-current={current ? "page" : undefined} className="relative py-2 hover:opacity-70">
      {children}
      {current ? <span className="absolute inset-x-0 -bottom-[22px] h-0.5 bg-[#141414]" /> : null}
    </Link>
  );
}

function MenuButton({
  label,
  open,
  onToggle,
  items,
}: {
  label: string;
  open: boolean;
  onToggle: () => void;
  items: { label: string; href: string }[];
}) {
  return (
    <div className="relative">
      <button type="button" className="inline-flex items-center gap-1" aria-expanded={open} onClick={onToggle}>
        {label} <ChevronDown className="size-3.5" />
      </button>
      {open ? (
        <div className="absolute left-0 top-8 z-20 min-w-40 rounded-2xl border border-[#14141414] bg-white p-2 shadow-lg">
          {items.map((item) => (
            <a key={item.href} href={item.href} className="block rounded-xl px-3 py-2 text-sm hover:bg-[#1414140a]">
              {item.label}
            </a>
          ))}
        </div>
      ) : null}
    </div>
  );
}

export function SiteFooter() {
  return (
    <footer className="bg-[#f3f4f0] text-[#141414]">
      <div className="mx-auto grid max-w-[1200px] gap-10 px-5 py-14 md:grid-cols-[1.2fr_1fr_1fr_1fr]">
        <div>
          <Wordmark />
          <p className="mt-6 text-2xl font-semibold tracking-tight">开启你的 AI办公新方式</p>
          <p className="mt-2 text-sm text-[#141414a6]">超 5500 万企业用户在用千问办公</p>
        </div>
        <FooterCol title="产品" links={[
          ["千问办公客户端", "/download"],
          ["千问办公网页版", "/app"],
        ]} />
        <FooterCol title="帮助" links={[
          ["帮助中心", EXTERNAL.docs],
          ["快速开始", EXTERNAL.docs],
          ["安全与合规", EXTERNAL.docs],
        ]} />
        <FooterCol title="开始使用" links={[
          ["下载客户端", "/download"],
          ["在线使用", "/app"],
          ["千问AI平台", ""],
        ]} />
      </div>
      <div className="mx-auto flex max-w-[1200px] flex-wrap gap-x-4 gap-y-2 px-5 pb-8 text-xs text-[#141414a6]">
        <span>© 2026 千问办公</span>
        <a href={EXTERNAL.privacy}>隐私政策</a>
        <a href={EXTERNAL.terms}>服务协议</a>
        <a href={EXTERNAL.aliyunUser}>法律声明</a>
        <a href={EXTERNAL.icp}>浙ICP备18037475号-57</a>
        <a href={EXTERNAL.police}>浙公网安备33011002020302号</a>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: [string, string][] }) {
  return (
    <div>
      <p className="text-sm text-[#14141473]">{title}</p>
      <ul className="mt-3 space-y-2 text-sm">
        {links.map(([label, href]) => (
          <li key={label}>
            {href.startsWith("/") ? (
              <Link href={href}>{label}</Link>
            ) : href ? (
              <a href={href}>{label}</a>
            ) : (
              <span>{label}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
