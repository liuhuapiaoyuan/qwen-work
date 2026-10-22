"use client";

import { useState } from "react";
import { Calendar, Plus, Search } from "lucide-react";
import { scheduleTemplates } from "@/components/sites/qwenwork/data";
import { useQwen } from "@/components/sites/qwenwork/store";

export function SchedulesPage() {
  const store = useQwen();
  const [query, setQuery] = useState("");
  const [tab, setTab] = useState<"mine" | "log">("mine");
  const [index, setIndex] = useState(0);
  const [creating, setCreating] = useState(false);
  const [sort, setSort] = useState<"new" | "name">("new");
  const [sortOpen, setSortOpen] = useState(false);
  const [draft, setDraft] = useState({ title: "", desc: "", when: "每天 09:00–11:00" });
  const visible = scheduleTemplates.filter((item) => `${item.title}${item.desc}`.includes(query.trim()));
  const mine = [...store.schedules]
    .filter((item) => `${item.title}${item.desc}`.includes(query.trim()))
    .sort((a, b) => (sort === "name" ? a.title.localeCompare(b.title, "zh") : 0));

  return (
    <div className="mx-auto w-full max-w-[1080px] px-6 py-8">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold">定时任务</h1>
          <p className="mt-1 max-w-2xl text-sm text-[#141414a6]">按计划自动执行任务，也可随时手动触发。在任意对话中描述你想定期做的事，即可快速创建</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <label className="flex h-9 items-center gap-2 rounded-full bg-white px-3 text-sm outline outline-1 outline-[#14141414]">
            <Search className="size-4 text-[#14141473]" />
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="搜索定时任务..." aria-label="搜索定时任务" className="w-36 bg-transparent outline-none" />
          </label>
          <button type="button" className="h-9 rounded-full bg-white px-3 text-sm outline outline-1 outline-[#14141414]" onClick={() => setCreating(true)}>通过千问办公创建</button>
        </div>
      </div>
      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-[#1414140a] px-4 py-3 text-sm">
        <span className="min-w-0 flex-1">高峰时段内定时任务可能排队，订阅会员以解锁高峰时段内优先执行</span>
        <a href="/pricing" className="shrink-0 rounded-full bg-white px-3 py-1">订阅</a>
      </div>
      <div className="mt-8 flex items-center justify-between">
        <h2 className="text-base font-medium">推荐任务</h2>
        <div className="flex gap-2">
          <button type="button" aria-label="上一组推荐" className="size-8 rounded-full bg-white" onClick={() => setIndex((value) => (value + visible.length - 1) % Math.max(visible.length, 1))}>‹</button>
          <button type="button" aria-label="下一组推荐" className="size-8 rounded-full bg-white" onClick={() => setIndex((value) => (value + 1) % Math.max(visible.length, 1))}>›</button>
        </div>
      </div>
      <div className="mt-3 grid gap-3 md:grid-cols-3">
        {visible.slice(index).concat(visible.slice(0, index)).slice(0, 3).map((item) => (
          <button key={item.id} type="button" className="rounded-2xl bg-white p-4 text-left outline outline-1 outline-[#14141414]" onClick={() => store.addSchedule(item)}>
            <p className="font-medium">{item.title}</p>
            <p className="mt-2 line-clamp-2 text-sm text-[#14141473]">{item.desc}</p>
            <p className="mt-4 inline-flex rounded-full bg-[#1414140a] px-2 py-1 text-xs">{item.when}</p>
          </button>
        ))}
      </div>
      <div className="mt-8 flex items-center justify-between">
        <div className="flex gap-4 text-sm">
          <button type="button" className={tab === "mine" ? "font-semibold" : "text-[#14141473]"} onClick={() => setTab("mine")}>我的定时任务</button>
          <button type="button" className={tab === "log" ? "font-semibold" : "text-[#14141473]"} onClick={() => setTab("log")}>执行记录</button>
        </div>
        <div className="relative">
          <button type="button" className="rounded-full bg-white px-3 py-1 text-xs" onClick={() => setSortOpen((value) => !value)}>{sort === "name" ? "按名称" : "按创建时间倒序"}</button>
          {sortOpen ? (
            <div className="absolute right-0 top-8 z-10 w-40 rounded-2xl bg-white p-1 shadow-lg">
              <button type="button" className="block w-full rounded-xl px-3 py-2 text-left text-sm hover:bg-[#1414140a]" onClick={() => { setSort("new"); setSortOpen(false); }}>按创建时间倒序</button>
              <button type="button" className="block w-full rounded-xl px-3 py-2 text-left text-sm hover:bg-[#1414140a]" onClick={() => { setSort("name"); setSortOpen(false); }}>按名称</button>
            </div>
          ) : null}
        </div>
      </div>
      {tab === "log" ? (
        <p className="mt-6 text-sm text-[#14141473]">还没有执行记录。创建定时任务后，执行结果会显示在这里。</p>
      ) : mine.length === 0 ? (
        <div className="mt-4 flex min-h-64 flex-col items-center justify-center rounded-3xl border border-dashed border-[#14141426] text-center">
          <Calendar className="size-8 text-[#14141459]" />
          <p className="mt-3 font-medium">暂无定时任务</p>
          <p className="mt-1 text-sm text-[#14141473]">创建定时任务来自动化执行周期性 AI 代理工作</p>
          <button type="button" className="mt-4 inline-flex items-center gap-1 rounded-full bg-white px-3 py-1.5 text-sm outline outline-1 outline-[#14141426]" onClick={() => setCreating(true)}>
            <Plus className="size-4" /> 新建定时任务
          </button>
        </div>
      ) : (
        <ul className="mt-4 space-y-2">
          {mine.map((item) => (
            <li key={item.id} className="flex items-center justify-between rounded-2xl bg-white p-4">
              <span>
                <span className="block font-medium">{item.title}</span>
                <span className="text-xs text-[#14141473]">{item.when}</span>
              </span>
              <button type="button" className="text-sm text-[#d9150b]" onClick={() => store.removeSchedule(item.id)}>删除</button>
            </li>
          ))}
        </ul>
      )}
      {creating ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0003] p-4" onClick={() => setCreating(false)}>
          <form
            className="w-[min(440px,92vw)] rounded-3xl bg-white p-5"
            onClick={(event) => event.stopPropagation()}
            onSubmit={(event) => {
              event.preventDefault();
              if (!draft.title.trim()) return;
              store.addSchedule({ title: draft.title.trim(), desc: draft.desc.trim() || "按设定时间自动执行", when: draft.when });
              setDraft({ title: "", desc: "", when: "每天 09:00–11:00" });
              setCreating(false);
              setTab("mine");
            }}
          >
            <h2 className="text-lg font-semibold">新建定时任务</h2>
            <input required value={draft.title} onChange={(event) => setDraft({ ...draft, title: event.target.value })} placeholder="任务名称" className="mt-4 h-11 w-full rounded-xl border border-[#1414141a] px-3 text-sm outline-none" />
            <textarea value={draft.desc} onChange={(event) => setDraft({ ...draft, desc: event.target.value })} placeholder="要定期完成的事" className="mt-3 h-24 w-full rounded-xl border border-[#1414141a] p-3 text-sm outline-none" />
            <select value={draft.when} onChange={(event) => setDraft({ ...draft, when: event.target.value })} className="mt-3 h-11 w-full rounded-xl border border-[#1414141a] px-3 text-sm">
              <option>每天 08:00–10:00</option>
              <option>每天 09:00–11:00</option>
              <option>工作日 19:00–21:00</option>
            </select>
            <div className="mt-4 flex justify-end gap-2">
              <button type="button" className="rounded-full px-4 py-2 text-sm" onClick={() => setCreating(false)}>取消</button>
              <button type="submit" className="rounded-full bg-[#141414] px-4 py-2 text-sm text-white">创建</button>
            </div>
          </form>
        </div>
      ) : null}
    </div>
  );
}
