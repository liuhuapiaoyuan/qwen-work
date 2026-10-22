"use client";

import { useRouter } from "next/navigation";
import { ArrowUp, ChevronLeft, ChevronRight, Mic, Plus, Unplug } from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { guestPrompts, placeholders, promptGroups } from "@/components/sites/qwenwork/data";
import { useQwen } from "@/components/sites/qwenwork/store";

export function AgentHome() {
  const router = useRouter();
  const store = useQwen();
  const [text, setText] = useState("");
  const [hint, setHint] = useState(0);
  const [group, setGroup] = useState(0);
  const [linkOpen, setLinkOpen] = useState(false);
  const [modelOpen, setModelOpen] = useState(false);
  const [files, setFiles] = useState<string[]>([]);
  const [voiceOpen, setVoiceOpen] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const placeholder = placeholders[hint];
  const active = promptGroups[group];

  useEffect(() => {
    const timer = window.setInterval(() => setHint((value) => (value + 1) % placeholders.length), 3200);
    return () => window.clearInterval(timer);
  }, []);

  function send(value = text) {
    const title = value.trim();
    if (!title) return;
    if (!store.authed) {
      router.push("/signin");
      return;
    }
    const id = store.startTask(title);
    router.push(`/app/chat/${id}`);
  }

  return (
    <div className="flex min-h-full items-start justify-center px-4 py-8 sm:items-center sm:py-16">
      <div className="w-full max-w-[768px]">
        <img src="/sites/qwenwork/mascot.svg" alt="QwenWork" className="size-16" />
        <h1 className="mt-3 text-2xl font-semibold leading-8 tracking-tight">
          {greeting()}，{store.authed ? store.name : "朋友"}
        </h1>
        <h2 className="text-2xl font-semibold leading-8 tracking-tight">准备好创建点什么了吗？</h2>
        <form
          className="mt-6"
          onSubmit={(event) => {
            event.preventDefault();
            send();
          }}
        >
          <div className="min-h-[118px] overflow-hidden rounded-[24px] bg-white shadow-[0_0_0_1px_rgba(20,20,20,0.15),0_16px_48px_-8px_rgba(0,0,0,0.07)]">
            <div className="relative px-4 pb-0 pt-[14px]">
              {!text ? <span className="pointer-events-none absolute left-4 top-[14px] text-base text-[#14141459]">{placeholder} <kbd className="ml-1 rounded bg-[#1414140f] px-1 text-[11px]">TAB</kbd></span> : null}
              <textarea
                aria-label="描述你想完成的任务"
                value={text}
                rows={2}
                placeholder="描述你想完成的任务"
                onChange={(event) => setText(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Tab" && !text) {
                    event.preventDefault();
                    setText(placeholder);
                  }
                  if (event.key === "Enter" && !event.shiftKey) {
                    event.preventDefault();
                    send();
                  }
                }}
                className="relative z-10 block w-full resize-none bg-transparent text-base leading-6 text-[#141414] outline-none placeholder:text-transparent"
              />
            </div>
            <div className="flex items-center gap-1 px-3 pb-3">
              <IconButton label="添加文件等" onClick={() => fileRef.current?.click()}><Plus className="size-4" /></IconButton>
              <input ref={fileRef} type="file" className="hidden" onChange={(event) => { const file = event.target.files?.[0]; if (file) setFiles((items) => [...items, file.name]); event.target.value = ""; }} />
              <IconButton label="连接器" onClick={() => { setLinkOpen((value) => !value); setModelOpen(false); }}><Unplug className="size-4" /></IconButton>
              {store.authed ? (
                <button type="button" className="ml-auto rounded-full px-2 text-sm text-[#141414a6]" onClick={() => { setModelOpen((value) => !value); setLinkOpen(false); }}>
                  {store.model} ▾
                </button>
              ) : <span className="ml-auto" />}
              <IconButton label="语音输入（Right Ctrl）" onClick={() => setVoiceOpen(true)}><Mic className="size-4" /></IconButton>
              <button type="submit" aria-label="发送消息" disabled={!text.trim()} className="flex size-8 items-center justify-center rounded-full bg-[#14141412] text-[#14141426] disabled:cursor-default enabled:bg-[#141414] enabled:text-white">
                <ArrowUp className="size-4" />
              </button>
            </div>
          </div>
          {files.length ? <p className="mt-2 text-xs text-[#14141473]">已添加：{files.join("、")}（仅保存在这次演示里）</p> : null}
          {linkOpen ? (
            <div className="mt-2 w-56 rounded-2xl border border-[#14141414] bg-white p-1 text-sm shadow-lg">
              {["钉钉", "飞书", "企业微信"].map((name) => (
                <button key={name} type="button" className="block w-full rounded-xl px-3 py-2 text-left hover:bg-[#1414140a]" onClick={() => { setText((value) => `${value}${value ? " " : ""}使用${name}连接器`); setLinkOpen(false); }}>{name}</button>
              ))}
            </div>
          ) : null}
          {modelOpen ? (
            <div className="mt-2 ml-auto w-40 rounded-2xl border border-[#14141414] bg-white p-1 text-sm shadow-lg">
              {(["标准", "前沿模型"] as const).map((item) => (
                <button key={item} type="button" className="block w-full rounded-xl px-3 py-2 text-left hover:bg-[#1414140a]" onClick={() => { store.setModel(item); setModelOpen(false); }}>{item}</button>
              ))}
            </div>
          ) : null}
        </form>

        {store.authed ? (
          <div className="mt-4">
            <div className="flex items-center gap-2">
              <button type="button" aria-label="查看前面的标签" className="flex size-8 items-center justify-center rounded-full bg-[#1414140a]" onClick={() => setGroup((value) => (value + promptGroups.length - 1) % promptGroups.length)}><ChevronLeft className="size-4" /></button>
              <div className="flex gap-2 overflow-x-auto">
                {promptGroups.map((item, index) => (
                  <button key={item.id} type="button" role="tab" aria-selected={group === index} onClick={() => setGroup(index)} className={`shrink-0 rounded-full px-3 py-1.5 text-sm ${group === index ? "bg-[#14141412]" : "bg-white"}`}>
                    {item.label}
                  </button>
                ))}
              </div>
              <button type="button" aria-label="查看更多标签" className="flex size-8 items-center justify-center rounded-full bg-[#1414140a]" onClick={() => setGroup((value) => (value + 1) % promptGroups.length)}><ChevronRight className="size-4" /></button>
            </div>
            <div className="mt-3">
              {active.items.length === 0 ? <p className="px-[18px] py-3 text-sm text-[#14141473]">这个分类暂时没有推荐，直接描述任务即可。</p> : active.items.map((item) => (
                <button key={item.title + item.body} type="button" className="flex h-9 w-full items-center gap-3 rounded-xl px-[18px] text-left text-[13px] text-[#141414a6] hover:bg-[#1414140a]" onClick={() => setText(`${item.title}：${item.body}`)}>
                  <span className="shrink-0 font-medium text-[#141414]">{item.title}</span>
                  <span className="min-w-0 truncate">{item.body}</span>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="mt-3">
            {guestPrompts.map((item) => (
              <button key={item} type="button" className="flex h-9 w-full items-center rounded-xl px-[18px] text-left text-[13px] text-[#141414a6] hover:bg-[#1414140a]" onClick={() => setText(item)}>
                {item}
              </button>
            ))}
          </div>
        )}
        {voiceOpen ? (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0003] p-4" onClick={() => setVoiceOpen(false)}>
            <div className="w-[min(420px,92vw)] rounded-3xl bg-white p-5" onClick={(event) => event.stopPropagation()}>
              <h2 className="text-lg font-semibold">语音输入</h2>
              <p className="mt-2 text-sm text-[#14141473]">浏览器演示没有接入麦克风。确认后会把当前提示写进输入框。</p>
              <div className="mt-4 flex justify-end gap-2">
                <button type="button" className="rounded-full px-4 py-2 text-sm" onClick={() => setVoiceOpen(false)}>取消</button>
                <button type="button" className="rounded-full bg-[#141414] px-4 py-2 text-sm text-white" onClick={() => { setText((value) => value || placeholder); setVoiceOpen(false); }}>填入提示</button>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

function IconButton({ label, onClick, children }: { label: string; onClick: () => void; children: ReactNode }) {
  return (
    <button type="button" aria-label={label} onClick={onClick} className="flex size-8 items-center justify-center rounded-full border border-[#1414141a] text-[#141414a6]">
      {children}
    </button>
  );
}

function greeting() {
  const hour = new Date().getHours();
  if (hour < 11) return "上午好";
  if (hour < 14) return "中午好";
  if (hour < 18) return "下午好";
  return "晚上好";
}
