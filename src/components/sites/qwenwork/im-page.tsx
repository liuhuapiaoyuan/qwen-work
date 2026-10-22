"use client";

import { useState } from "react";

const channels = [
  { id: "ding", name: "钉钉", desc: "连接钉钉机器人，随时处理办公任务", mark: "钉", tint: "#1677ff" },
  { id: "feishu", name: "飞书", desc: "连接飞书智能助手，高效完成任务", mark: "飞", tint: "#3370ff" },
];

export function ImPage() {
  const [open, setOpen] = useState<string | null>(null);
  const [saved, setSaved] = useState<string | null>(null);

  return (
    <div className="mx-auto w-full max-w-[760px] px-6 py-8">
      <h1 className="text-2xl font-semibold">IM 频道</h1>
      <p className="mt-1 text-sm text-[#141414a6]">将千问办公接入你常用的工作软件里，随时随地处理工作任务。</p>
      <div className="mt-6 space-y-3">
        {channels.map((item) => (
          <article key={item.id} className="flex items-center gap-3 rounded-3xl bg-white p-4 outline outline-1 outline-[#14141414]">
            <span className="flex size-11 items-center justify-center rounded-2xl text-white" style={{ background: item.tint }}>{item.mark}</span>
            <span className="min-w-0 flex-1">
              <span className="block font-medium">{item.name}</span>
              <span className="block text-sm text-[#14141473]">{item.desc}</span>
              {saved === item.id ? <span className="text-xs text-[#29a651]">配置已保存在本地演示中</span> : null}
            </span>
            <button type="button" className="shrink-0 rounded-xl bg-[#141414] px-4 py-2 text-sm text-white" onClick={() => setOpen(item.id)}>配置</button>
          </article>
        ))}
      </div>
      {open ? (
        <form
          className="mt-4 rounded-3xl bg-white p-4"
          onSubmit={(event) => {
            event.preventDefault();
            setSaved(open);
            setOpen(null);
          }}
        >
          <p className="text-sm font-medium">配置 {channels.find((item) => item.id === open)?.name}</p>
          <input required placeholder="机器人 Webhook 或应用标识" className="mt-3 h-11 w-full rounded-xl border border-[#1414141a] px-3 text-sm outline-none" />
          <button type="submit" className="mt-3 h-10 rounded-full bg-[#141414] px-4 text-sm text-white">保存</button>
        </form>
      ) : null}
    </div>
  );
}
