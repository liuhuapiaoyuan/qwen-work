"use client";

import Link from "next/link";
import { ArrowUp } from "lucide-react";
import { useState } from "react";
import { useQwen } from "@/components/sites/qwenwork/store";

export function ChatPage({ sessionId }: { sessionId: string }) {
  const store = useQwen();
  const [text, setText] = useState("");
  const messages = store.messages[sessionId] ?? [];
  const task = store.tasks.find((item) => item.id === sessionId);
  const latest = [...messages].reverse().find((message) => message.role === "assistant");
  const artifact = store.artifacts.find((item) => item.id === latest?.artifactId);

  function send() {
    const title = text.trim();
    if (!title) return;
    store.continueTask(sessionId, title);
    setText("");
  }

  return (
    <div className="mx-auto grid min-h-full w-full max-w-[1080px] gap-6 px-6 py-8 lg:grid-cols-[minmax(0,1fr)_280px]">
      <div className="flex min-h-[70vh] flex-col">
        <Link href="/app" className="text-sm text-[#14141473]">新任务</Link>
        <h1 className="mt-2 text-xl font-semibold">{task?.title ?? "任务"}</h1>
        <div className="mt-6 flex-1 space-y-5">
          {messages.length === 0 ? <p className="text-sm text-[#14141473]">这个任务不存在或还没有内容。</p> : null}
          {messages.map((message) => (
            <article key={message.id} className={message.role === "user" ? "ml-auto max-w-[80%] rounded-2xl bg-[#1414140a] px-4 py-3 text-sm" : "max-w-[640px]"}>
              {message.role === "assistant" ? <img src="/sites/qwenwork/mascot.svg" alt="" className="mb-2 size-8" /> : null}
              <p className="text-sm leading-6">{message.content}</p>
            </article>
          ))}
        </div>
        <form
          className="sticky bottom-4 mt-8 flex items-end gap-2 rounded-[24px] bg-white p-3 shadow-[0_0_0_1px_rgba(20,20,20,0.15)]"
          onSubmit={(event) => {
            event.preventDefault();
            send();
          }}
        >
          <textarea value={text} onChange={(event) => setText(event.target.value)} aria-label="继续描述" placeholder="继续补充或修改这个任务" rows={2} className="flex-1 resize-none bg-transparent text-sm outline-none" />
          <button type="submit" aria-label="发送消息" disabled={!text.trim()} className="flex size-8 items-center justify-center rounded-full bg-[#141414] text-white disabled:bg-[#14141412] disabled:text-[#14141440]">
            <ArrowUp className="size-4" />
          </button>
        </form>
      </div>
      <aside className="h-fit rounded-3xl bg-[#1414140a] p-4">
        <h2 className="text-sm font-semibold">任务监控</h2>
        <p className="mt-3 text-xs text-[#14141473]">计划</p>
        <ol className="mt-2 space-y-2 text-sm">
          {(latest?.steps ?? ["等待任务"]).map((step) => (
            <li key={step} className="flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-[#2ccc6c]" />
              {step}
            </li>
          ))}
        </ol>
        <p className="mt-4 text-xs text-[#14141473]">产物</p>
        {artifact ? (
          <Link href="/app/artifacts" className="mt-2 block rounded-2xl bg-white px-3 py-3 text-sm">
            <span className="block text-xs text-[#14141473]">{artifact.kind}</span>
            {artifact.name}
          </Link>
        ) : (
          <p className="mt-2 text-sm text-[#14141473]">还没有产物</p>
        )}
        <p className="mt-4 text-xs text-[#14141473]">模型</p>
        <p className="mt-1 text-sm">{store.model}</p>
      </aside>
    </div>
  );
}
