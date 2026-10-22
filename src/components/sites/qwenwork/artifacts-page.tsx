"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { Search } from "lucide-react";
import { useQwen, type Artifact } from "@/components/sites/qwenwork/store";

const filters = ["全部", "收藏", "图片", "网页", "应用", "文档", "表格", "PPT", "视频", "代码", "其他"] as const;

export function ArtifactsPage() {
  const { artifacts, addArtifact, toggleStar } = useQwen();
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<(typeof filters)[number]>("全部");
  const [layout, setLayout] = useState<"grid" | "list">("grid");
  const [storageOpen, setStorageOpen] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const list = artifacts.filter((item) => {
    if (filter === "收藏") return Boolean(item.starred) && item.name.includes(query.trim());
    const kindOk = filter === "全部" ? true : item.kind === filter;
    return kindOk && item.name.includes(query.trim());
  });

  return (
    <div className="mx-auto w-full max-w-[1080px] px-6 py-8">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold">产物空间</h1>
          <p className="mt-1 text-sm text-[#141414a6]">集中展示与管理你的创作成果。</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <label className="flex h-9 items-center gap-2 rounded-full bg-white px-3 text-sm outline outline-1 outline-[#14141414]">
            <Search className="size-4 text-[#14141473]" />
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="产物名搜索" aria-label="产物名搜索" className="w-32 bg-transparent outline-none" />
          </label>
          <button type="button" className="rounded-full bg-white px-3 py-2 text-sm outline outline-1 outline-[#14141414]" onClick={() => setStorageOpen(true)}>云端存储</button>
          <button type="button" className="rounded-full bg-white px-3 py-2 text-sm outline outline-1 outline-[#14141414]" onClick={() => fileRef.current?.click()}>上传</button>
          <input
            ref={fileRef}
            type="file"
            className="hidden"
            onChange={(event) => {
              const file = event.target.files?.[0];
              if (file) addArtifact(file.name, kindFromName(file.name));
              event.target.value = "";
            }}
          />
          <Link href="/app" className="rounded-full bg-[#141414] px-3 py-2 text-sm text-white">通过对话创建</Link>
        </div>
      </div>
      <div className="mt-5 flex items-center gap-2 overflow-x-auto">
        {filters.map((item) => (
          <button key={item} type="button" onClick={() => setFilter(item)} className={`shrink-0 rounded-full px-3 py-1.5 text-sm ${filter === item ? "bg-[#14141412]" : "bg-white"}`}>{item}</button>
        ))}
        <button type="button" className="ml-auto text-sm" onClick={() => setLayout(layout === "grid" ? "list" : "grid")}>{layout === "grid" ? "列表" : "宫格"}</button>
      </div>
      {list.length === 0 ? (
        <div className="flex min-h-[420px] flex-col items-center justify-center text-center">
          <span className="flex size-12 items-center justify-center rounded-full bg-[#e7f6ec] text-xl text-[#29a651]">合</span>
          <p className="mt-4 font-medium">{filter === "收藏" ? "还没有收藏" : "当前无产物"}</p>
          <p className="mt-1 text-sm text-[#14141473]">你上传的、AI 生成的资料将显示在这里</p>
          <Link href="/app" className="mt-4 rounded-full bg-[#141414] px-4 py-2 text-sm text-white">通过对话创建</Link>
        </div>
      ) : (
        <div className={layout === "grid" ? "mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3" : "mt-6 space-y-2"}>
          {list.map((item) => (
            <div key={item.id} className="rounded-2xl bg-white p-4 outline outline-1 outline-[#14141414]">
              <span className="flex items-center justify-between text-xs text-[#14141473]">
                {item.kind}
                <button type="button" className={item.starred ? "text-[#29a651]" : ""} onClick={() => toggleStar(item.id)}>{item.starred ? "已收藏" : "收藏"}</button>
              </span>
              <Link href={item.taskId === "upload" ? "/app" : `/app/chat/${item.taskId}`} className="mt-2 block font-medium">{item.name}</Link>
            </div>
          ))}
        </div>
      )}
      {storageOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0003] p-4" onClick={() => setStorageOpen(false)}>
          <div className="w-[min(420px,92vw)] rounded-3xl bg-white p-5" onClick={(event) => event.stopPropagation()}>
            <h2 className="text-lg font-semibold">云端存储</h2>
            <p className="mt-2 text-sm leading-6 text-[#14141473]">免费版 1GB，标准版 10GB，高级版 100GB。当前列表只保存在这次浏览器会话里。</p>
            <button type="button" className="mt-4 rounded-full bg-[#141414] px-4 py-2 text-sm text-white" onClick={() => setStorageOpen(false)}>知道了</button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function kindFromName(name: string): Artifact["kind"] {
  const ext = name.split(".").pop()?.toLowerCase() ?? "";
  if (["png", "jpg", "jpeg", "gif", "webp"].includes(ext)) return "图片";
  if (["xls", "xlsx", "csv"].includes(ext)) return "表格";
  if (["ppt", "pptx"].includes(ext)) return "PPT";
  if (["html", "htm"].includes(ext)) return "网页";
  if (["mp4", "mov", "webm"].includes(ext)) return "视频";
  if (["js", "ts", "tsx", "py", "json"].includes(ext)) return "代码";
  if (["doc", "docx", "pdf", "md", "txt"].includes(ext)) return "文档";
  return "其他";
}
