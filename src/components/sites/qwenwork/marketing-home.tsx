"use client";

import Link from "next/link";
import { useState } from "react";
import { Download, Globe } from "lucide-react";
import { SiteFooter, SiteHeader } from "@/components/sites/qwenwork/site-frame";
import { capabilities, certifications, professions } from "@/components/sites/qwenwork/data";

export function MarketingHome() {
  const [cap, setCap] = useState(0);
  const [scene, setScene] = useState(0);
  const [expert, setExpert] = useState(0);
  const current = capabilities[cap];
  const sceneIndex = Math.min(scene, current.states.length - 1);

  return (
    <div className="min-h-screen bg-[#f4f6f1] text-[#141414]">
      <SiteHeader active="home" />
      <main>
        <section className="relative overflow-hidden px-5 pb-16 pt-16 md:pt-20">
          <div className="mx-auto max-w-[1100px] text-center">
            <div className="pointer-events-none absolute left-[8%] top-28 hidden w-36 rotate-[-8deg] rounded-sm border border-dashed border-[#b7e7c8] bg-[#e7f8ee] p-4 md:block">
              <p className="text-left text-[10px] text-[#14141473]">QwenWork</p>
              <img src="/sites/qwenwork/mark.svg" alt="" className="mx-auto my-3 h-14" />
              <p className="text-right text-xs">100分</p>
            </div>
            <div className="pointer-events-none absolute right-[8%] top-32 hidden w-36 rotate-[8deg] rounded-2xl border border-[#14141414] bg-[linear-gradient(#14141412_1px,transparent_1px),linear-gradient(90deg,#14141412_1px,transparent_1px)] bg-[size:14px_14px] p-6 md:block">
              <img src="/sites/qwenwork/mark.svg" alt="" className="mx-auto h-16 opacity-80" />
            </div>
            <h1 className="text-4xl font-semibold leading-tight tracking-tight sm:text-5xl md:text-7xl">
              专业人士
              <br />
              都用<span className="text-[#2ccc6c]">千问办公</span>
            </h1>
            <p className="mt-5 text-base text-[#141414a6] md:text-lg">养成你的 AI 办公新习惯，专业更进一步。</p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link href="/download" className="inline-flex h-12 items-center gap-2 rounded-full bg-[#141414] px-5 text-white">
                <Download className="size-4" /> 下载桌面端
              </Link>
              <Link href="/app" className="inline-flex h-12 items-center gap-2 rounded-full bg-white px-5 shadow-[0_0_0_1px_#1414141a]">
                <Globe className="size-4" /> 使用网页端
              </Link>
            </div>
          </div>
          <div className="mx-auto mt-14 grid max-w-[1100px] items-end gap-4 md:grid-cols-[180px_1fr_160px]">
            <aside className="rounded-3xl bg-white p-5 shadow-[0_10px_40px_#1414140d]">
              <img src="/sites/qwenwork/mark.svg" alt="" className="h-8" />
              <p className="mt-6 text-sm text-[#14141473]">工作流程</p>
              <p className="mt-1 text-2xl font-semibold leading-tight">从任务到交付</p>
              <p className="mt-6 text-4xl font-semibold">25</p>
              <p className="text-sm text-[#14141473]">项能力</p>
            </aside>
            <div className="overflow-hidden rounded-[28px] border border-[#14141414] bg-white shadow-[0_20px_60px_#14141414]">
              <div className="flex h-10 items-center justify-between border-b border-[#1414140f] px-4 text-xs text-[#14141473]">
                <span>千问办公</span>
                <span>+ 2,000</span>
              </div>
              <div className="grid min-h-[280px] grid-cols-1 sm:grid-cols-[140px_1fr]">
                <div className="hidden bg-[#f6f6f6] p-3 text-xs sm:block">
                  <p className="rounded-lg bg-[#14141412] px-2 py-1.5">新任务</p>
                  <p className="px-2 py-1.5 text-[#141414a6]">扩展</p>
                  <p className="px-2 py-1 text-[#14141473]">专家套件</p>
                  <p className="px-2 py-1 text-[#14141473]">技能</p>
                  <p className="px-2 py-1 text-[#14141473]">连接器</p>
                </div>
                <div className="p-6">
                  <img src="/sites/qwenwork/mascot.svg" alt="" className="size-12" />
                  <p className="mt-3 text-lg font-semibold sm:text-xl">上午好，千问办公</p>
                  <p className="text-lg font-semibold sm:text-xl">有什么需要我搞定的？</p>
                  <div className="mt-4 rounded-2xl border border-[#14141414] p-3 text-sm text-[#14141473]">
                    总结昨天的工作内容列出待办，同时把今天的日程罗列下来。
                  </div>
                </div>
              </div>
            </div>
            <aside className="rounded-3xl bg-[#2ccc6c] p-5 text-[#08321a]">
              <p className="text-sm">文件交付</p>
              <p className="mt-2 text-2xl font-semibold leading-tight">产物随时可编辑</p>
            </aside>
          </div>
        </section>

        <section className="bg-[#111311] px-5 py-20 text-white">
          <div className="mx-auto max-w-[1100px]">
            <p className="text-xs tracking-[0.2em] text-white/50">SIX CORE CAPABILITIES</p>
            <h2 className="mt-3 max-w-xl text-4xl font-semibold tracking-tight">六大核心能力，解锁你的工作新方式</h2>
            <p className="mt-3 text-sm text-white/60">自由组合、随手搭配。左右切换查看每种能力的工作状态。</p>
            <div className="mt-8 flex gap-3 overflow-x-auto pb-2">
              {capabilities.map((item, index) => (
                <button
                  key={item.title}
                  type="button"
                  onClick={() => {
                    setCap(index);
                    setScene(0);
                  }}
                  className={`min-w-[220px] rounded-2xl p-4 text-left ${index === cap ? "bg-white text-[#141414]" : "bg-white/10 text-white"}`}
                >
                  <p className="text-lg font-semibold">{item.title}</p>
                  <p className={`mt-1 text-sm ${index === cap ? "text-[#141414a6]" : "text-white/70"}`}>{item.accent}</p>
                </button>
              ))}
            </div>
            <div className="mt-6 rounded-3xl bg-white p-6 text-[#141414]">
              <p className="max-w-3xl text-sm leading-6 text-[#141414a6]">{current.body}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {current.states.map((label, index) => (
                  <button
                    key={label}
                    type="button"
                    aria-pressed={sceneIndex === index}
                    onClick={() => setScene(index)}
                    className={`rounded-full px-3 py-1.5 text-sm ${sceneIndex === index ? "bg-[#141414] text-white" : "bg-[#1414140a]"}`}
                  >
                    {label}
                  </button>
                ))}
              </div>
              <p className="mt-5 text-lg font-medium">当前查看：{current.states[sceneIndex]}</p>
            </div>
          </div>
        </section>

        <section className="px-5 py-20">
          <div className="mx-auto max-w-[1100px]">
            <p className="text-xs tracking-[0.2em] text-[#14141473]">FOR EVERY PROFESSION</p>
            <h2 className="mt-3 text-4xl font-semibold">每个专家，各有一套</h2>
            <div className="mt-8 flex gap-2 overflow-x-auto">
              {professions.map((item, index) => (
                <button
                  key={item.role}
                  type="button"
                  onClick={() => setExpert(index)}
                  className={`shrink-0 rounded-full px-4 py-2 text-sm ${expert === index ? "bg-[#141414] text-white" : "bg-white"}`}
                >
                  {item.role}
                </button>
              ))}
            </div>
            <article className="mt-6 rounded-[28px] bg-white p-8">
              <p className="text-xs tracking-[0.16em] text-[#14141473]">EXPERT WORKFLOW</p>
              <p className="mt-4 max-w-3xl text-2xl leading-snug">{professions[expert].quote}</p>
              <p className="mt-6 font-medium">{professions[expert].role} 专属技能套件</p>
            </article>
          </div>
        </section>

        <section className="px-5 pb-20">
          <div className="mx-auto grid max-w-[1100px] gap-6 rounded-[32px] bg-[#111311] p-8 text-white md:grid-cols-2">
            <div>
              <p className="text-xs tracking-[0.2em] text-white/50">SECURITY BY DESIGN</p>
              <h2 className="mt-3 text-4xl font-semibold">安全合规</h2>
              <p className="mt-4 text-white/70">创造安全、可靠、可信、可用的智能 AI 环境。</p>
              <div className="mt-6 grid grid-cols-2 gap-3 text-sm">
                <p className="rounded-2xl bg-white/10 p-4">组织边界<br /><span className="text-white/60">身份、权限、空间分级</span></p>
                <p className="rounded-2xl bg-white/10 p-4">数据路径<br /><span className="text-white/60">传输、存储、调用可追踪</span></p>
              </div>
            </div>
            <div>
              <p className="text-xs tracking-[0.2em] text-white/50">COMPLIANCE STATUS</p>
              <h3 className="mt-3 text-2xl font-semibold">千问办公 安全合规资质</h3>
              <ul className="mt-4 space-y-2 text-sm text-white/80">
                {certifications.map((item, index) => (
                  <li key={item}>{String(index + 1).padStart(2, "0")} {item}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="px-5 pb-20 text-center">
          <p className="text-xs tracking-[0.2em] text-[#14141473]">START YOUR NEW WAY OF WORKING</p>
          <h2 className="mt-3 text-4xl font-semibold">你的 AI 办公新体验，就此开始。</h2>
          <div className="mt-6 flex justify-center gap-3">
            <Link href="/download" className="rounded-full bg-[#141414] px-5 py-3 text-white">下载桌面端</Link>
            <Link href="/app" className="rounded-full bg-white px-5 py-3">使用网页端</Link>
          </div>
          <nav aria-label="帮助中心热门入口" className="mt-8 flex flex-wrap justify-center gap-4 text-sm text-[#141414a6]">
            <a href="https://docs.qwenwork.cn/">01 快速开始</a>
            <a href="https://docs.qwenwork.cn/">02 企业 IM 内使用</a>
            <Link href="/app/market/skills">03 技能与专家套件</Link>
            <Link href="/app">04 在线使用</Link>
          </nav>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
