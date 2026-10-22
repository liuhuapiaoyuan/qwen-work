"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Blocks,
  ChevronDown,
  Clock3,
  Download,
  FolderOpen,
  MessageSquare,
  PanelLeft,
  Plus,
  Search,
  Settings,
  SquarePen,
} from "lucide-react";
import { useEffect, useMemo, useState, type ReactNode } from "react";
import { Wordmark } from "@/components/sites/qwenwork/brand";
import { DOWNLOADS, EXTERNAL } from "@/components/sites/qwenwork/data";
import { useQwen } from "@/components/sites/qwenwork/store";

const links = [
  { href: "/app/market/expert-kits", label: "专家套件" },
  { href: "/app/market/skills", label: "技能" },
  { href: "/app/market/connectors", label: "连接器" },
];

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const store = useQwen();
  const [collapsed, setCollapsed] = useState(false);
  const [extensions, setExtensions] = useState(true);
  const [recentOpen, setRecentOpen] = useState(true);
  const [search, setSearch] = useState(false);
  const [query, setQuery] = useState("");
  const [account, setAccount] = useState(false);
  const [feedback, setFeedback] = useState(false);
  const [about, setAbout] = useState(false);
  const [note, setNote] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeDrawer = () => setMobileOpen(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const apply = () => {
      const dark = store.theme === "暗色" || (store.theme === "自动" && media.matches);
      document.documentElement.dataset.theme = dark ? "dark" : "light";
    };
    apply();
    media.addEventListener("change", apply);
    return () => media.removeEventListener("change", apply);
  }, [store.theme]);

  const results = useMemo(() => {
    const pages = [
      { href: "/app", label: "新任务" },
      ...links,
      { href: "/app/schedules", label: "定时任务" },
      { href: "/app/artifacts", label: "产物空间" },
      { href: "/app/im-channels", label: "IM 频道" },
      { href: "/app/settings", label: "设置" },
      { href: "/app/profile", label: "个人中心" },
      { href: "/app/credits", label: "积分" },
      ...store.tasks.map((task) => ({ href: `/app/chat/${task.id}`, label: task.title })),
    ];
    const q = query.trim();
    return q ? pages.filter((item) => item.label.includes(q)) : pages;
  }, [query, store.tasks]);

  return (
    <div className="qwen-surface flex h-dvh overflow-hidden bg-[#fcfcfc] text-[#141414]">
      {mobileOpen ? (
        <button type="button" aria-label="关闭边栏" className="fixed inset-0 z-30 bg-black/30 min-[640px]:hidden" onClick={() => setMobileOpen(false)} />
      ) : null}
      {!collapsed || mobileOpen ? (
        <aside className={`flex h-full w-60 shrink-0 flex-col border-r border-[#1414141a] bg-[#f6f6f6] max-[639px]:fixed max-[639px]:inset-y-0 max-[639px]:z-40 max-[639px]:shadow-2xl ${mobileOpen ? "max-[639px]:flex" : "max-[639px]:hidden"}`}>
          <div className="flex items-center justify-between px-2 py-2">
            <Link href="/app" aria-label="千问办公首页" className="px-1" onClick={closeDrawer}>
              <Wordmark imageClassName="h-[18px]" />
            </Link>
            <div className="flex items-center">
              {store.authed ? (
                <button type="button" aria-label="搜索" className="flex size-8 items-center justify-center rounded-lg hover:bg-[#14141412]" onClick={() => setSearch(true)}>
                  <Search className="size-4" />
                </button>
              ) : null}
              <button
                type="button"
                aria-label="关闭边栏"
                className="flex size-8 items-center justify-center rounded-lg hover:bg-[#14141412]"
                onClick={() => {
                  if (window.matchMedia("(max-width: 639px)").matches) setMobileOpen(false);
                  else setCollapsed(true);
                }}
              >
                <PanelLeft className="size-4" />
              </button>
            </div>
          </div>
          <nav className="px-2">
            <NavItem href="/app" current={pathname === "/app"} icon={<SquarePen className="size-4" />} label="新任务" hint="Ctrl+K" onClick={closeDrawer} />
            <button type="button" aria-expanded={extensions} className="mt-1 flex h-8 w-full items-center gap-2 rounded-[10px] px-1.5 text-left text-[13px] hover:bg-[#1414140a]" onClick={() => setExtensions((value) => !value)}>
              <Blocks className="size-4" /> 扩展
            </button>
            {extensions ? (
              <div className="ml-4">
                {links.map((item) => (
                  <NavItem key={item.href} href={item.href} current={pathname === item.href} label={item.label} nested onClick={closeDrawer} />
                ))}
              </div>
            ) : null}
            <NavItem href="/app/schedules" current={pathname === "/app/schedules"} icon={<Clock3 className="size-4" />} label="定时任务" onClick={closeDrawer} />
            <NavItem href="/app/artifacts" current={pathname === "/app/artifacts"} icon={<FolderOpen className="size-4" />} label="产物空间" onClick={closeDrawer} />
            <NavItem href="/app/im-channels" current={pathname === "/app/im-channels"} icon={<MessageSquare className="size-4" />} label="IM 频道" onClick={closeDrawer} />
          </nav>
          {store.authed ? (
            <div className="mt-4 px-3">
              <button type="button" className="flex items-center gap-1 text-xs text-[#14141473]" aria-expanded={recentOpen} onClick={() => setRecentOpen((value) => !value)}>
                <ChevronDown className={`size-3 ${recentOpen ? "" : "-rotate-90"}`} /> 最近任务
              </button>
              {recentOpen ? (
                <div className="mt-2 space-y-1">
                  {store.tasks.length === 0 ? <p className="px-1 text-xs text-[#14141459]">还未创建过任务</p> : store.tasks.slice(0, 8).map((task) => (
                    <Link key={task.id} href={`/app/chat/${task.id}`} className="block truncate rounded-lg px-2 py-1.5 text-[13px] text-[#141414a6] hover:bg-[#1414140a]" onClick={closeDrawer}>
                      {task.title}
                    </Link>
                  ))}
                </div>
              ) : null}
            </div>
          ) : null}
          <div className="mt-auto space-y-1 p-2">
            <a href={EXTERNAL.docs} className="flex h-8 items-center justify-between rounded-[10px] px-1.5 text-[13px] text-[#141414a6] hover:bg-[#1414140a]">
              帮助文档 <span aria-hidden>↗</span>
            </a>
            <button type="button" className="flex h-8 w-full items-center justify-between rounded-[10px] px-1.5 text-[13px] text-[#141414a6] hover:bg-[#1414140a]" onClick={() => setAbout(true)}>
              关于我们 <span aria-hidden>↗</span>
            </button>
            {store.authed ? (
              <button
                type="button"
                className="flex w-full items-center gap-2 rounded-2xl px-1.5 py-2 text-left hover:bg-[#1414140a]"
                aria-label={`${store.name}，当前套餐 ${store.planName}，当前行业版 ${store.industry}，打开账户菜单`}
                onClick={() => setAccount((value) => !value)}
              >
                <span className="flex size-8 items-center justify-center rounded-full bg-[#ece7ff] text-sm text-[#5b4dff]">{store.name.slice(0, 1)}</span>
                <span className="min-w-0">
                  <span className="block truncate text-sm">{store.name}</span>
                  <span className="block truncate text-[11px] text-[#14141473]">{store.plan}</span>
                </span>
                <Link href="/app/settings" aria-label="设置" className="ml-auto rounded-lg p-1 text-[#14141473]" onClick={(event) => { event.stopPropagation(); closeDrawer(); }}>
                  <Settings className="size-4" />
                </Link>
              </button>
            ) : null}
          </div>
        </aside>
      ) : null}

      <div className="relative flex min-w-0 flex-1 flex-col overflow-hidden bg-[#fcfcfc]">
        <div className="flex h-12 shrink-0 items-center gap-1 px-3">
          <button
            type="button"
            aria-label="打开边栏"
            className={`size-8 items-center justify-center rounded-lg hover:bg-[#1414140a] ${collapsed ? "flex" : "hidden max-[639px]:flex"}`}
            onClick={() => {
              if (window.matchMedia("(max-width: 639px)").matches) setMobileOpen(true);
              else setCollapsed(false);
            }}
          >
            <PanelLeft className="size-4" />
          </button>
          <div className="ml-auto flex min-w-0 items-center gap-1">
            <a href={DOWNLOADS.desktopChannel} className="hidden h-8 items-center gap-1 rounded-full px-2 text-sm text-[#141414a6] hover:bg-[#1414140a] sm:inline-flex">
              <Download className="size-4" /> 下载桌面版
            </a>
            {store.authed ? (
              <>
                <button type="button" className="inline-flex h-8 items-center rounded-full px-2 text-sm text-[#141414a6] hover:bg-[#1414140a]" onClick={() => setFeedback(true)}>
                  <span className="sm:hidden">反馈</span>
                  <span className="hidden sm:inline">问题反馈</span>
                </button>
                <Link href="/app/credits" className="inline-flex h-8 items-center gap-1 rounded-full px-2 text-sm hover:bg-[#1414140a]">
                  <span className="text-[#29a651]">●</span> {store.credits.toLocaleString("zh-CN")}
                </Link>
              </>
            ) : (
              <Link href="/signin" className="inline-flex h-8 items-center rounded-[10px] bg-[#141414] px-3 text-sm text-white">登录</Link>
            )}
          </div>
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto">
          {store.authed && !store.welcomeSeen && pathname === "/app" ? (
            <div className="px-3 pt-3 sm:hidden">
              <WelcomeNote onClose={store.dismissWelcome} />
            </div>
          ) : null}
          {children}
        </div>
      </div>

      {store.authed && !store.welcomeSeen && pathname === "/app" ? (
        <div className="fixed right-4 top-16 z-30 hidden w-72 sm:block">
          <WelcomeNote onClose={store.dismissWelcome} />
        </div>
      ) : null}

      {search ? (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-[#0003] px-3 pt-16 sm:pt-24" onClick={() => setSearch(false)}>
          <div className="w-[min(560px,92vw)] rounded-3xl bg-white p-4" onClick={(event) => event.stopPropagation()}>
            <input autoFocus value={query} onChange={(event) => setQuery(event.target.value)} placeholder="搜索任务和页面" className="h-11 w-full rounded-xl bg-[#1414140a] px-3 outline-none" />
            <div className="mt-3 max-h-80 overflow-auto">
              {results.map((item) => (
                <button key={item.href + item.label} type="button" className="block w-full rounded-xl px-3 py-2 text-left text-sm hover:bg-[#1414140a]" onClick={() => { setSearch(false); closeDrawer(); router.push(item.href); }}>
                  {item.label}
                </button>
              ))}
              {results.length === 0 ? <p className="px-3 py-6 text-sm text-[#14141473]">没有匹配结果</p> : null}
            </div>
          </div>
        </div>
      ) : null}

      {account ? (
        <div className="fixed bottom-4 left-3 z-50 w-[min(16rem,calc(100vw-1.5rem))] rounded-2xl border border-[#14141414] bg-white p-3 shadow-xl sm:left-4">
          <p className="text-sm font-medium">{store.name}</p>
          <p className="text-xs text-[#14141473]">{store.plan}</p>
          <Link href="/app/profile" className="mt-3 block rounded-xl bg-[#1414140a] py-2 text-center text-sm" onClick={() => { setAccount(false); closeDrawer(); }}>个人中心</Link>
          <Link href="/app/credits" className="mt-2 block rounded-xl bg-[#1414140a] py-2 text-center text-sm" onClick={() => { setAccount(false); closeDrawer(); }}>积分</Link>
          <button type="button" className="mt-2 w-full rounded-xl bg-[#1414140a] py-2 text-sm" onClick={() => { store.logout(); setAccount(false); router.push("/signin"); }}>退出登录</button>
          <button type="button" className="mt-2 w-full text-xs text-[#14141473]" onClick={() => setAccount(false)}>关闭</button>
        </div>
      ) : null}

      {feedback ? (
        <Modal title="问题反馈" onClose={() => setFeedback(false)}>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              setNote("");
              setFeedback(false);
            }}
          >
            <textarea required value={note} onChange={(event) => setNote(event.target.value)} placeholder="描述你遇到的问题" className="h-28 w-full rounded-xl border border-[#1414141a] p-3 text-sm outline-none" />
            <button className="mt-3 h-10 rounded-full bg-[#141414] px-4 text-sm text-white" type="submit">提交</button>
          </form>
        </Modal>
      ) : null}

      {about ? (
        <Modal title="关于我们" onClose={() => setAbout(false)}>
          <p className="text-sm leading-6 text-[#141414a6]">千问办公是阿里巴巴推出的一站式 AI 办公平台。描述需求，直接交付文档、表格、演示文稿和网页。</p>
          <Link href="/" className="mt-4 inline-block text-sm text-[#29a651]" onClick={() => setAbout(false)}>返回官网</Link>
        </Modal>
      ) : null}
    </div>
  );
}

function WelcomeNote({ onClose }: { onClose: () => void }) {
  return (
    <div className="rounded-2xl bg-[#3ad67a] p-4 text-[#08321a] shadow-lg">
      <p className="font-semibold">新人积分已到账！</p>
      <p className="mt-1 text-sm">恭喜你获得新用户福利 2,000 积分和每日登录福利 100 积分，明天起每日登录可再领 100 积分。</p>
      <button type="button" className="mt-3 rounded-lg bg-[#141414] px-3 py-1.5 text-sm text-white" onClick={onClose}>我知道了</button>
    </div>
  );
}

function NavItem({
  href,
  label,
  current,
  icon,
  hint,
  nested,
  onClick,
}: {
  href: string;
  label: string;
  current: boolean;
  icon?: ReactNode;
  hint?: string;
  nested?: boolean;
  onClick?: () => void;
}) {
  return (
    <Link href={href} aria-current={current ? "page" : undefined} onClick={onClick} className={`mt-0.5 flex h-8 items-center gap-2 rounded-[10px] px-1.5 text-[13px] ${current ? "bg-[#14141412]" : "hover:bg-[#1414140a]"} ${nested ? "text-[#141414]" : ""}`}>
      {icon}
      <span className="flex-1">{label}</span>
      {hint ? <span className="text-[11px] text-[#14141459]">{hint}</span> : null}
    </Link>
  );
}

function Modal({ title, onClose, children }: { title: string; onClose: () => void; children: ReactNode }) {
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center overflow-y-auto bg-[#0003] p-4 sm:items-center" onClick={onClose}>
      <div className="w-[min(440px,92vw)] rounded-3xl bg-white p-5" onClick={(event) => event.stopPropagation()}>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button type="button" onClick={onClose} aria-label="关闭"><Plus className="size-4 rotate-45" /></button>
        </div>
        {children}
      </div>
    </div>
  );
}
