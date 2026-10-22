"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState, type ReactNode } from "react";
import { SiteFooter, SiteHeader } from "@/components/sites/qwenwork/site-frame";
import { EXTERNAL, personalFaqs } from "@/components/sites/qwenwork/data";
import { useQwen, type PlanName } from "@/components/sites/qwenwork/store";

type Audience = "personal" | "enterprise";
type Billing = "month" | "sub" | "year";

const personal = {
  month: { plus: 98, pro: 198, note: "按月价格" },
  sub: { plus: 78, pro: 158, note: "连续包月价格", wasPlus: 98, wasPro: 198 },
  year: { plus: 68.6, pro: 138.6, note: "年付折合月费（标价 7 折）", wasPlus: 98, wasPro: 198 },
};

export function PricingPage() {
  const store = useQwen();
  const router = useRouter();
  const [audience, setAudience] = useState<Audience>("personal");
  const [billing, setBilling] = useState<Billing>("sub");
  const [faq, setFaq] = useState(0);
  const price = personal[billing];
  function subscribe(planName: PlanName) {
    store.subscribe(planName);
    router.push("/app/credits");
  }

  const compare = useMemo(
    () => [
      ["新用户赠送（90天有效）", "2,000", "2,000", "2,000"],
      ["每月基础积分", "—", "2,000", "4,000"],
      ["每日登录赠送", "100 积分/天", "200 积分/天", "300 积分/天"],
      ["排队并行任务", "10个", "无上限", "无上限"],
      ["产物存储云盘", "1GB", "10GB", "100GB"],
      ["可发布网页", "5", "10", "50"],
      ["访问密码与数据库存储", "—", "支持", "支持"],
    ],
    [],
  );

  return (
    <div className="min-h-screen bg-[#f4f6f1] text-[#141414]">
      <SiteHeader active="pricing" />
      <main className="mx-auto max-w-[1100px] px-5 py-16">
        <h1 className="text-balance text-center text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">千问办公定价服务</h1>
        <p className="mt-4 text-center text-[#141414a6]">根据您的实际使用场景及用量，选择适合您的工作方案</p>
        <div className="mx-auto mt-8 flex w-fit rounded-full bg-[#eceee9] p-1">
          <Toggle pressed={audience === "personal"} onClick={() => setAudience("personal")}>个人版</Toggle>
          <Toggle pressed={audience === "enterprise"} onClick={() => setAudience("enterprise")}>企业版</Toggle>
        </div>
        <div className="mx-auto mt-4 flex w-fit items-center gap-2 rounded-full bg-[#eceee9] p-1 text-sm">
          <Toggle pressed={billing === "month"} onClick={() => setBilling("month")}>月付</Toggle>
          {audience === "personal" ? (
            <Toggle pressed={billing === "sub"} onClick={() => setBilling("sub")}>
              连续包月 <span className="ml-1 rounded-full bg-[#2ccc6c] px-1.5 text-xs text-[#08321a]">8折</span>
            </Toggle>
          ) : null}
          <Toggle pressed={billing === "year"} onClick={() => setBilling("year")}>
            年付 <span className="ml-1 text-[#29a651]">7折</span>
          </Toggle>
        </div>

        {audience === "personal" ? (
          <>
            <div className="mt-8 flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-[#e7f6ec] px-4 py-3 text-sm">
              <span className="min-w-0">每日登录权益 · 每日登录可领，当日有效</span>
              <span className="min-w-0">免费版 100 积分 · 标准版 200 积分 · 高级版 300 积分</span>
            </div>
            <div className="mt-6 grid gap-4 lg:grid-cols-3">
              <PlanCard kicker="01 / FREE" badge="限时权益" title="免费版" desc="适合初次体验千问办公的个人用户。" price="0" unit="元" note="免费使用" cta="免费使用" href="/signin" tone="plain" items={["首次注册赠送 2,000 积分，90 天有效", "每日登录赠送 100 积分/天", "产物存储 1GB", "可发布网页 5 个", "排队并行任务 10 个"]} />
              <PlanCard kicker="02 / PLUS" badge="订阅优惠" title="个人标准版" desc="适合稳定、高频完成办公任务的专业人士。" price={String(price.plus)} unit="元/月" note={price.note} was={"wasPlus" in price ? price.wasPlus : undefined} cta="立即订阅" onAction={() => subscribe("个人标准版")} tone="mint" items={["基础积分 2,000 积分/月", "每日登录赠送 200 积分/天", "产物存储 10GB", "可发布网页 10 个", "支持访问密码、数据库存储", "排队并行任务无上限", "积分包充值"]} />
              <PlanCard kicker="03 / PRO" badge="高频工作" title="个人高级版" desc="适合高强度、多任务并行与规模化交付。" price={String(price.pro)} unit="元/月" note={price.note} was={"wasPro" in price ? price.wasPro : undefined} cta="立即订阅" onAction={() => subscribe("个人高级版")} tone="green" items={["基础积分 4,000 积分/月", "每日登录赠送 300 积分/天", "产物存储 100GB", "可发布网页 50 个", "支持访问密码、数据库存储", "排队并行任务无上限", "积分包充值"]} />
            </div>
            <section className="mt-16">
              <p className="text-xs tracking-[0.16em] text-[#14141473]">SUBSCRIPTION PLAN FUNCTION COMPARISON</p>
              <h2 className="mt-2 text-3xl font-semibold">订阅计划功能对比</h2>
              <div className="mt-6 overflow-x-auto rounded-3xl bg-white">
                <table className="w-full min-w-[680px] text-left text-sm">
                  <thead>
                    <tr className="border-b border-[#14141414]">
                      <th className="px-4 py-3 font-medium">订阅计划</th>
                      <th className="px-4 py-3 font-medium">免费版</th>
                      <th className="px-4 py-3 font-medium">个人标准版</th>
                      <th className="px-4 py-3 font-medium">个人高级版</th>
                    </tr>
                  </thead>
                  <tbody>
                    {compare.map((row) => (
                      <tr key={row[0]} className="border-b border-[#1414140d]">
                        {row.map((cell, index) => (
                          <td key={`${row[0]}-${index}`} className="px-4 py-3">{cell}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </>
        ) : (
          <div className="mt-8 grid gap-4 lg:grid-cols-2">
            <PlanCard kicker="01 / STANDARD" badge="企业标准版" title="企业标准版" desc="为企业团队提供统一账号、成员管理与协作办公能力。" price={billing === "year" ? "咨询" : "198"} unit={billing === "year" ? "" : "元/月/席"} note={billing === "year" ? "年付方案请咨询销售" : "按月付费，官网统一定价"} cta="立即咨询" href="/new-org" tone="plain" items={["套餐积分 2,000 积分/月", "并行任务不限", "席位分配、限额管理", "可发布网页 50 个", "产物存储 100GB", "技能、专家套件、连接器"]} />
            <PlanCard kicker="02 / PREMIUM" badge="企业旗舰版" title="企业旗舰版" desc="在企业标准版能力之上，支持更严格的网络与部署要求。" price={billing === "year" ? "咨询" : "298"} unit={billing === "year" ? "" : "元/月/席"} note={billing === "year" ? "50 席起购，年付请咨询" : "50 席起购，按月付费"} cta="立即咨询" href="/new-org" tone="green" items={["套餐积分 2,000 积分/月", "模型/限额策略组", "组织架构同步、单点登录", "可信网络、可信设备、Hooks 规则", "专属市场、自定义市场接入", "VPC 网络部署"]} />
          </div>
        )}

        <section className="mt-16">
          <p className="text-xs tracking-[0.16em] text-[#14141473]">QUESTION AND ANSWER</p>
          <h2 className="mt-2 text-3xl font-semibold">Q&A</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-[280px_1fr]">
            <nav aria-label="常见问题列表" className="space-y-2">
              {personalFaqs.map((item, index) => (
                <button
                  key={item.q}
                  type="button"
                  aria-pressed={faq === index}
                  onClick={() => setFaq(index)}
                  className={`block w-full rounded-2xl px-4 py-3 text-left text-sm ${faq === index ? "bg-[#141414] text-white" : "bg-white"}`}
                >
                  {String(index + 1).padStart(2, "0")} {item.q}
                </button>
              ))}
            </nav>
            <article className="rounded-3xl bg-white p-6">
              <h3 className="text-xl font-semibold">{personalFaqs[faq].q}</h3>
              <p className="mt-3 leading-7 text-[#141414a6]">
                {personalFaqs[faq].a}{" "}
                <a className="underline" href={EXTERNAL.docs}>帮助中心</a>
              </p>
            </article>
          </div>
        </section>

        <section className="mt-16 rounded-[32px] bg-white p-8 text-center">
          <p className="text-xs tracking-[0.16em] text-[#14141473]">READY TO START</p>
          <h2 className="mt-2 text-3xl font-semibold">还在犹豫选哪个方案？</h2>
          <div className="mt-6 flex justify-center gap-3">
            <Link href="/signin" className="rounded-full bg-[#141414] px-5 py-3 text-white">免费试用</Link>
            <Link href="/new-org" className="rounded-full bg-[#f4f6f1] px-5 py-3">立即咨询</Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

function Toggle({
  pressed,
  onClick,
  children,
}: {
  pressed: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      onClick={onClick}
      className={`rounded-full px-4 py-2 text-sm ${pressed ? "bg-[#141414] text-white" : ""}`}
    >
      {children}
    </button>
  );
}

function PlanCard({
  kicker,
  badge,
  title,
  desc,
  price,
  unit,
  note,
  was,
  cta,
  href,
  onAction,
  tone,
  items,
}: {
  kicker: string;
  badge: string;
  title: string;
  desc: string;
  price: string;
  unit: string;
  note: string;
  was?: number;
  cta: string;
  href?: string;
  onAction?: () => void;
  tone: "plain" | "mint" | "green";
  items: string[];
}) {
  const skin =
    tone === "green"
      ? "bg-[#3ad67a] text-[#08321a]"
      : tone === "mint"
        ? "bg-[#e7f6ec]"
        : "bg-[#f7f7f5]";
  return (
    <article className={`flex flex-col rounded-[28px] p-6 ${skin}`}>
      <div className="flex items-center justify-between text-xs">
        <span>{kicker}</span>
        <span className="rounded-full bg-white/70 px-2 py-1">{badge}</span>
      </div>
      <h3 className="mt-6 text-3xl font-semibold">{title}</h3>
      <p className="mt-2 text-sm opacity-70">{desc}</p>
      <p className="mt-8 text-xs opacity-70">{note}</p>
      {was ? <p className="text-sm line-through opacity-50">{was}元/月</p> : null}
      <p className="mt-1 text-5xl font-semibold">
        {price} <span className="text-base font-normal">{unit}</span>
      </p>
      <ul className="mt-6 flex-1 space-y-2 text-sm">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      {onAction ? (
        <button type="button" onClick={onAction} className="mt-6 inline-flex h-11 items-center justify-center rounded-full bg-[#141414] text-white">
          {cta}
        </button>
      ) : (
        <Link href={href ?? "/signin"} className="mt-6 inline-flex h-11 items-center justify-center rounded-full bg-[#141414] text-white">
          {cta}
        </Link>
      )}
    </article>
  );
}
