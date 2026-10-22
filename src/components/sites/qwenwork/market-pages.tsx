"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
import { Plus, Search } from "lucide-react";
import { useQwen } from "@/components/sites/qwenwork/store";

type Kit = {
  id: string;
  title: string;
  author: string;
  desc: string;
  skills: number;
  connections: number;
  version: string;
  installs: number;
};

type Skill = {
  id: string;
  title: string;
  author: string;
  desc: string;
  installs: number;
  category: string;
};

type Connector = {
  id: string;
  name: string;
  desc: string;
  category: string;
};

const pageSize = 24;

export function ExpertKitsPage() {
  const store = useQwen();
  const catalog = useCatalog<Kit>("/sites/qwenwork/catalog/kits.json");
  const [tab, setTab] = useState<"market" | "mine">("market");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(0);
  const [opened, setOpened] = useState<Kit | null>(null);
  const list = useMemo(() => {
    const source = catalog ?? [];
    const scoped = tab === "mine" ? source.filter((item) => store.kits.includes(item.id)) : source;
    const q = query.trim();
    return scoped.filter((item) => `${item.title}${item.desc}${item.author}`.includes(q));
  }, [catalog, query, store.kits, tab]);

  return (
    <MarketFrame title="专家套件" subtitle="面向不同角色/行业的工具套件" search={query} onSearch={(value) => { setQuery(value); setPage(0); }} placeholder="搜索专家套件">
      <Tabs left="市场" right={`已安装 ${store.kits.length}`} tab={tab} onChange={(value) => { setTab(value); setPage(0); }} />
      {catalog ? <CatalogGrid items={list.slice(page * pageSize, page * pageSize + pageSize)} empty="没有匹配的专家套件" render={(item) => (
        <article key={item.id} className="min-h-[140px] rounded-2xl bg-white p-3 outline outline-1 -outline-offset-1 outline-[#14141414]">
          <div className="flex items-start justify-between gap-2">
            <button type="button" className="text-left" aria-label={`查看专家套件：${item.title}`} onClick={() => setOpened(item)}>
              <span className="block text-sm font-medium">{item.title}</span>
              <span className="text-xs text-[#14141473]">{item.author}</span>
            </button>
            <InstallButton installed={store.kits.includes(item.id)} label={item.title} onClick={() => store.toggleKit(item.id)} />
          </div>
          <p className="mt-2 line-clamp-2 text-xs leading-5 text-[#141414a6]">{item.desc}</p>
          <p className="mt-3 text-xs text-[#14141473]">{item.skills} 个技能 · {item.connections} 个数据连接 <span className="float-right">{item.version}</span></p>
        </article>
      )} /> : <Empty text="正在加载专家套件…" />}
      <Pager page={page} total={list.length} onPage={setPage} />
      {opened ? (
        <Detail title={opened.title} body={`${opened.author} · ${opened.desc}`} onClose={() => setOpened(null)}>
          <button type="button" className="rounded-full bg-[#141414] px-4 py-2 text-sm text-white" onClick={() => store.toggleKit(opened.id)}>
            {store.kits.includes(opened.id) ? "卸载" : "安装"}
          </button>
        </Detail>
      ) : null}
    </MarketFrame>
  );
}

export function SkillsPage() {
  const store = useQwen();
  const catalog = useCatalog<Skill>("/sites/qwenwork/catalog/skills.json");
  const [tab, setTab] = useState<"market" | "mine">("market");
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("全部");
  const [page, setPage] = useState(0);
  const [showAll, setShowAll] = useState(false);
  const [opened, setOpened] = useState<Skill | null>(null);
  const [adding, setAdding] = useState(false);
  const [draft, setDraft] = useState("");
  const categories = useMemo(() => {
    const names = new Set((catalog ?? []).map((item) => item.category));
    return ["全部", ...names];
  }, [catalog]);
  const custom: Skill[] = store.customSkills.map((item) => ({
    id: item.id,
    title: item.title,
    author: "本地",
    desc: "本地添加的技能，只保存在这次演示里。",
    installs: 0,
    category: item.category,
  }));
  const list = useMemo(() => {
    const source = [...custom, ...(catalog ?? [])];
    const scoped = tab === "mine" ? source.filter((item) => store.skills.includes(item.id) || item.author === "本地") : source;
    const q = query.trim();
    return scoped.filter((item) => (category === "全部" || item.category === category) && `${item.title}${item.desc}${item.author}`.includes(q));
  }, [catalog, category, custom, query, store.skills, tab]);
  const featured = !showAll && tab === "market" && !query.trim() && category === "全部";
  const visible = featured ? list.slice(0, 12) : list.slice(page * pageSize, page * pageSize + pageSize);

  return (
    <MarketFrame title="技能" subtitle="安装与管理技能，在对话中扩展千问办公的能力。" search={query} onSearch={(value) => { setQuery(value); setPage(0); }} placeholder="搜索技能" action="添加" onAction={() => setAdding(true)}>
      <Tabs left="市场" right={`我的 ${store.skills.length + store.customSkills.length}`} tab={tab} onChange={(value) => { setTab(value); setPage(0); }} />
      <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
        {categories.map((item) => (
          <button key={item} type="button" onClick={() => { setCategory(item); setPage(0); setShowAll(true); }} className={`shrink-0 rounded-full px-3 py-1.5 text-sm ${category === item ? "bg-[#14141412]" : "bg-white"}`}>{item}</button>
        ))}
      </div>
      <div className="mt-4 flex items-center justify-between text-sm">
        <span className="text-[#14141473]">{featured ? "官方精选" : `共 ${list.length.toLocaleString("zh-CN")} 个技能`}</span>
        <button type="button" className="text-[#141414a6]" onClick={() => { setShowAll((value) => !value); setPage(0); }}>
          {featured ? `查看全部 (${(catalog?.length ?? 0).toLocaleString("zh-CN")}) ›` : "返回精选"}
        </button>
      </div>
      {catalog ? <CatalogGrid items={visible} empty="没有匹配的技能" render={(item) => (
        <article key={item.id} className="rounded-2xl bg-white p-3 outline outline-1 -outline-offset-1 outline-[#14141414]">
          <div className="flex items-start justify-between">
            <button type="button" className="text-left" onClick={() => setOpened(item)}>
              <span className="block text-sm font-medium">{item.title}</span>
              <span className="text-xs text-[#14141473]">{item.author}</span>
            </button>
            <InstallButton installed={store.skills.includes(item.id)} label={item.title} onClick={() => store.toggleSkill(item.id)} />
          </div>
          <p className="mt-2 line-clamp-2 text-xs leading-5 text-[#141414a6]">{item.desc}</p>
          <p className="mt-3 text-xs text-[#14141473]">↓ {item.installs.toLocaleString("zh-CN")}</p>
        </article>
      )} /> : <Empty text="正在加载技能…" />}
      {featured ? null : <Pager page={page} total={list.length} onPage={setPage} />}
      {opened ? (
        <Detail title={opened.title} body={`${opened.author} · ${opened.category} · ${opened.desc}`} onClose={() => setOpened(null)}>
          <button type="button" className="rounded-full bg-[#141414] px-4 py-2 text-sm text-white" onClick={() => store.toggleSkill(opened.id)}>
            {store.skills.includes(opened.id) ? "卸载" : "安装"}
          </button>
        </Detail>
      ) : null}
      {adding ? (
        <Detail title="添加技能" body="填写名称后加入「我的」。这是本地演示，不会上传到千问办公市场。" onClose={() => setAdding(false)}>
          <form className="flex gap-2" onSubmit={(event) => { event.preventDefault(); if (!draft.trim()) return; store.addCustomSkill(draft.trim(), category === "全部" ? "其他" : category); setDraft(""); setAdding(false); setTab("mine"); }}>
            <input value={draft} onChange={(event) => setDraft(event.target.value)} placeholder="技能名称" className="h-10 flex-1 rounded-xl border border-[#1414141a] px-3 text-sm outline-none" />
            <button type="submit" className="rounded-full bg-[#141414] px-4 text-sm text-white">添加</button>
          </form>
        </Detail>
      ) : null}
    </MarketFrame>
  );
}

export function ConnectorsPage() {
  const store = useQwen();
  const catalog = useCatalog<Connector>("/sites/qwenwork/catalog/connectors.json");
  const [tab, setTab] = useState<"market" | "mine">("market");
  const [query, setQuery] = useState("");
  const [opened, setOpened] = useState<Connector | null>(null);
  const groups = useMemo(() => {
    const q = query.trim();
    const scoped = (catalog ?? []).filter((item) => {
      const installed = store.connectors.includes(item.id);
      return (tab === "mine" ? installed : true) && `${item.name}${item.desc}${item.category}`.includes(q);
    });
    const map = new Map<string, Connector[]>();
    for (const item of scoped) {
      const list = map.get(item.category) ?? [];
      list.push(item);
      map.set(item.category, list);
    }
    return [...map.entries()];
  }, [catalog, query, store.connectors, tab]);

  return (
    <MarketFrame title="连接器" subtitle="连接外部应用、日历与服务，让你的工作流更顺畅，获得更高效、更愉悦的开发体验。" search={query} onSearch={setQuery} placeholder="搜索连接器">
      <Tabs left="市场" right={`已安装 ${store.connectors.length}`} tab={tab} onChange={setTab} />
      {catalog ? (
        <div className="mt-5 space-y-6">
          {groups.map(([title, items]) => (
            <section key={title}>
              <h2 className="text-sm text-[#14141473]">{title}</h2>
              <div className="mt-3 grid gap-3 md:grid-cols-2">
                {items.map((item) => (
                  <article key={item.id} className="flex items-center gap-3 rounded-2xl bg-white p-3 outline outline-1 -outline-offset-1 outline-[#14141414]">
                    <button type="button" className="flex min-w-0 flex-1 items-center gap-3 text-left" onClick={() => setOpened(item)}>
                      <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#141414] text-sm text-white">{item.name.slice(0, 1)}</span>
                      <span className="min-w-0">
                        <span className="block text-sm font-medium">{item.name}</span>
                        <span className="block truncate text-xs text-[#14141473]">{item.desc}</span>
                      </span>
                    </button>
                    <InstallButton installed={store.connectors.includes(item.id)} label={item.name} onClick={() => store.toggleConnector(item.id)} disconnect />
                  </article>
                ))}
              </div>
            </section>
          ))}
          {groups.length === 0 ? <Empty text="没有匹配的连接器" /> : null}
        </div>
      ) : <Empty text="正在加载连接器…" />}
      {opened ? (
        <Detail title={opened.name} body={`${opened.category} · ${opened.desc}`} onClose={() => setOpened(null)}>
          <button type="button" className="rounded-full bg-[#141414] px-4 py-2 text-sm text-white" onClick={() => store.toggleConnector(opened.id)}>
            {store.connectors.includes(opened.id) ? "断开" : "安装"}
          </button>
        </Detail>
      ) : null}
    </MarketFrame>
  );
}

function useCatalog<T>(url: string) {
  const [data, setData] = useState<T[] | null>(null);
  useEffect(() => {
    let cancel = false;
    fetch(url)
      .then((response) => {
        if (!response.ok) throw new Error(`加载失败 ${response.status}`);
        return response.json() as Promise<T[]>;
      })
      .then((items) => {
        if (!cancel) setData(items);
      })
      .catch((error: unknown) => {
        console.error("加载市场数据失败", error);
      });
    return () => {
      cancel = true;
    };
  }, [url]);
  return data;
}

function CatalogGrid<T extends { id: string }>({
  items,
  empty,
  render,
}: {
  items: T[];
  empty: string;
  render: (item: T) => ReactNode;
}) {
  if (items.length === 0) return <Empty text={empty} />;
  return <div className="mt-3 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">{items.map(render)}</div>;
}

function Pager({ page, total, onPage }: { page: number; total: number; onPage: (page: number) => void }) {
  const pages = Math.max(1, Math.ceil(total / pageSize));
  if (pages <= 1) return null;
  return (
    <div className="mt-4 flex items-center justify-center gap-3 text-sm">
      <button type="button" disabled={page === 0} className="rounded-full bg-white px-3 py-1 disabled:text-[#14141440]" onClick={() => onPage(page - 1)}>上一页</button>
      <span>{page + 1} / {pages}</span>
      <button type="button" disabled={page + 1 >= pages} className="rounded-full bg-white px-3 py-1 disabled:text-[#14141440]" onClick={() => onPage(page + 1)}>下一页</button>
    </div>
  );
}

function InstallButton({ installed, label, onClick, disconnect }: { installed: boolean; label: string; onClick: () => void; disconnect?: boolean }) {
  return (
    <button type="button" aria-label={`${installed ? (disconnect ? "断开" : "卸载") : "安装"} ${label}`} className="flex size-7 items-center justify-center rounded-full border border-[#1414141a]" onClick={onClick}>
      <Plus className={`size-4 ${installed ? "rotate-45" : ""}`} />
    </button>
  );
}

function MarketFrame({
  title,
  subtitle,
  search,
  onSearch,
  placeholder,
  action,
  onAction,
  children,
}: {
  title: string;
  subtitle: string;
  search: string;
  onSearch: (value: string) => void;
  placeholder: string;
  action?: string;
  onAction?: () => void;
  children: ReactNode;
}) {
  return (
    <div className="mx-auto w-full max-w-[1080px] px-6 py-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold leading-8">{title}</h1>
          <p className="mt-1 max-w-xl text-sm text-[#141414a6]">{subtitle}</p>
        </div>
        <label className="flex h-9 items-center gap-2 rounded-full bg-white px-3 text-sm outline outline-1 outline-[#14141414]">
          <Search className="size-4 text-[#14141473]" />
          <input value={search} onChange={(event) => onSearch(event.target.value)} placeholder={placeholder} aria-label={placeholder} className="w-40 bg-transparent outline-none" />
        </label>
      </div>
      {action && onAction ? (
        <button type="button" className="mt-4 rounded-full bg-[#141414] px-3 py-1.5 text-sm text-white" onClick={onAction}>{action}</button>
      ) : null}
      <div className="mt-6">{children}</div>
    </div>
  );
}

function Tabs({
  left,
  right,
  tab,
  onChange,
}: {
  left: string;
  right: string;
  tab: "market" | "mine";
  onChange: (tab: "market" | "mine") => void;
}) {
  return (
    <div className="flex gap-4 text-sm">
      <button type="button" className={tab === "market" ? "font-semibold" : "text-[#14141473]"} onClick={() => onChange("market")}>{left}</button>
      <button type="button" className={tab === "mine" ? "font-semibold" : "text-[#14141473]"} onClick={() => onChange("mine")}>{right}</button>
    </div>
  );
}

function Empty({ text }: { text: string }) {
  return <p className="py-16 text-center text-sm text-[#14141473]">{text}</p>;
}

function Detail({ title, body, onClose, children }: { title: string; body: string; onClose: () => void; children?: ReactNode }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0003] p-4" onClick={onClose}>
      <div className="w-[min(520px,92vw)] rounded-3xl bg-white p-6" onClick={(event) => event.stopPropagation()}>
        <h2 className="text-xl font-semibold">{title}</h2>
        <p className="mt-3 text-sm leading-6 text-[#141414a6]">{body}</p>
        <div className="mt-5 flex items-center gap-3">
          {children}
          <button type="button" className="text-sm" onClick={onClose}>关闭</button>
        </div>
      </div>
    </div>
  );
}
