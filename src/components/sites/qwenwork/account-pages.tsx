"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type ReactNode } from "react";
import { DEMO_CODE } from "@/components/sites/qwenwork/data";
import { useQwen, type PlanName, type ThemeMode } from "@/components/sites/qwenwork/store";

const packs = [500, 2000, 5000];

export function SettingsPage() {
  const store = useQwen();
  const router = useRouter();
  const [themeOpen, setThemeOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [orgOpen, setOrgOpen] = useState(false);
  const [industryOpen, setIndustryOpen] = useState(false);
  const [guide, setGuide] = useState(false);

  return (
    <PageShell title="设置" back="/app">
      <Section title="帐户">
        <Row href="/app/profile" label="账号" value={store.name} />
        <MenuRow label="企业/团队" value="个人版" open={orgOpen} onToggle={() => setOrgOpen((value) => !value)} options={["个人版"]} onPick={() => setOrgOpen(false)} />
        <MenuRow label="行业版" value={store.industry} open={industryOpen} onToggle={() => setIndustryOpen((value) => !value)} options={["日常办公", "财务", "法务", "电商"]} onPick={(value) => { store.setIndustry(value); setIndustryOpen(false); }} />
      </Section>
      <Section title="通用">
        <MenuRow label="主题外观" value={store.theme} open={themeOpen} onToggle={() => setThemeOpen((value) => !value)} options={["亮色", "暗色", "自动"]} onPick={(value) => { store.setTheme(value as ThemeMode); setThemeOpen(false); }} />
        <MenuRow label="界面语言" value={store.language} open={langOpen} onToggle={() => setLangOpen((value) => !value)} options={["简体中文", "英语"]} onPick={(value) => { store.setLanguage(value as "简体中文" | "英语"); setLangOpen(false); }} />
      </Section>
      <Section title="获取帮助">
        <button type="button" className="flex h-12 w-full items-center px-4 text-left text-sm hover:bg-[#1414140a]" onClick={() => setGuide(true)}>新人指南</button>
      </Section>
      <button type="button" className="mt-4 flex h-12 w-full items-center rounded-2xl bg-[#1414140a] px-4 text-sm" onClick={() => { store.logout(); router.push("/signin"); }}>退出登录</button>
      {guide ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0003] p-4" onClick={() => setGuide(false)}>
          <div className="w-[min(440px,92vw)] rounded-3xl bg-white p-5" onClick={(event) => event.stopPropagation()}>
            <h2 className="text-lg font-semibold">新人指南</h2>
            <ol className="mt-3 space-y-2 text-sm leading-6 text-[#141414a6]">
              <li>1. 从新任务开始，用一句话描述你要的结果。</li>
              <li>2. 需要时补充文件、连接器或专家套件。</li>
              <li>3. 在对话里查看步骤，到产物空间收取文件。</li>
            </ol>
            <button type="button" className="mt-4 rounded-full bg-[#141414] px-4 py-2 text-sm text-white" onClick={() => setGuide(false)}>知道了</button>
          </div>
        </div>
      ) : null}
    </PageShell>
  );
}

export function ProfilePage() {
  const store = useQwen();
  const router = useRouter();
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(store.name);
  const [copied, setCopied] = useState(false);
  const [passwordOpen, setPasswordOpen] = useState(false);
  const [code, setCode] = useState("");
  const [nextPassword, setNextPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordSaved, setPasswordSaved] = useState(false);
  const [removeOpen, setRemoveOpen] = useState(false);

  function savePassword() {
    if (code !== DEMO_CODE) {
      setPasswordError("验证码错误，请重新输入");
      return;
    }
    if (nextPassword.length < 8) {
      setPasswordError("新密码至少 8 位");
      return;
    }
    if (nextPassword !== confirm) {
      setPasswordError("两次输入的密码不一致");
      return;
    }
    store.setPassword(nextPassword);
    setPasswordError("");
    setPasswordSaved(true);
    setPasswordOpen(false);
    setCode("");
    setNextPassword("");
    setConfirm("");
  }

  return (
    <PageShell title="账号" back="/app/settings">
      <div className="rounded-[20px] bg-[#1414140a] px-4">
        <div className="flex items-center gap-3 border-b border-[#14141414] py-4">
          <span className="flex size-10 items-center justify-center rounded-full bg-[#ece7ff] text-[#5b4dff]">{store.name.slice(0, 1)}</span>
          <span className="flex-1 font-medium">{store.name}</span>
          <button type="button" className="rounded-lg bg-white px-3 py-1 text-sm" onClick={() => { setDraft(store.name); setEditing(true); }}>编辑</button>
        </div>
        <Info label="手机号码" value={store.phoneMasked} />
        <div className="flex items-center justify-between gap-3 py-3 text-sm">
          <span className="shrink-0 text-[#14141473]">用户 ID</span>
          <span className="flex min-w-0 items-center gap-2">
            <span className="min-w-0 truncate">{store.userId}</span>
            <button type="button" aria-label="复制用户 ID" className="text-[#14141473]" onClick={() => { void navigator.clipboard.writeText(store.userId); setCopied(true); }}>{copied ? "已复制" : "复制"}</button>
          </span>
        </div>
      </div>

      <h2 className="mb-2 mt-6 text-sm font-medium">个人</h2>
      <div className="rounded-[20px] bg-[#1414140a] px-4 text-sm">
        <Info label="套餐" value={store.planName} />
        <div className="flex items-center justify-between gap-3 py-3">
          <span>
            <span className="block">阿里云账号</span>
            <span className="text-xs text-[#14141473]">千问办公的订阅服务由阿里云提供支持和管理。</span>
            <span className="mt-1 block">{store.aliyun}</span>
          </span>
          <button type="button" className="rounded-lg bg-white px-3 py-1" onClick={() => router.push("/pricing")}>更换</button>
        </div>
      </div>
      <button type="button" className="mt-3 rounded-lg bg-[#f2180c14] px-3 py-1.5 text-sm text-[#d9150b]" onClick={() => setRemoveOpen(true)}>删除个人账号</button>

      <h2 className="mb-2 mt-6 text-sm font-medium">登录与安全</h2>
      <div className="rounded-[20px] bg-[#1414140a] px-4 py-3 text-sm">
        <p>登录方式：手机验证码</p>
        <p className="mt-1 text-xs text-[#14141473]">线上网页版账号页没有单独的密码项。这里的修改密码只写本地演示，不会改真实千问办公账号。</p>
        <button type="button" className="mt-3 rounded-lg bg-white px-3 py-1.5" onClick={() => setPasswordOpen(true)}>修改密码</button>
        {passwordSaved || store.password ? <p className="mt-2 text-xs text-[#29a651]">本地演示密码已设置</p> : null}
      </div>

      <h2 className="mb-2 mt-6 text-sm font-medium">企业</h2>
      <p className="rounded-[20px] bg-[#1414140a] p-4 text-sm text-[#14141473]">企业版账号相关权限和权益由所属企业管理，如果你未曾加入任何企业可忽略此项。</p>

      {editing ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0003] p-4">
          <form className="w-[min(420px,92vw)] rounded-3xl bg-white p-5" onSubmit={(event) => { event.preventDefault(); store.setName(draft.trim() || store.name); setEditing(false); }}>
            <h2 className="text-lg font-semibold">编辑个人资料</h2>
            <p className="mt-1 text-sm text-[#14141473]">修改个人资料中的昵称</p>
            <label className="mt-4 block text-sm">
              昵称
              <input value={draft} maxLength={255} onChange={(event) => setDraft(event.target.value)} className="mt-2 h-11 w-full rounded-xl border border-[#1414141a] px-3 outline-none" />
            </label>
            <p className="mt-1 text-xs text-[#14141473]">最长 255 个字符</p>
            <div className="mt-4 flex justify-end gap-2">
              <button type="button" className="rounded-full px-4 py-2 text-sm" onClick={() => setEditing(false)}>取消</button>
              <button type="submit" disabled={draft.trim() === store.name || draft.trim().length === 0} className="rounded-full bg-[#141414] px-4 py-2 text-sm text-white disabled:bg-[#1414140f] disabled:text-[#14141459]">完成</button>
            </div>
          </form>
        </div>
      ) : null}

      {passwordOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0003] p-4">
          <form className="w-[min(420px,92vw)] rounded-3xl bg-white p-5" onSubmit={(event) => { event.preventDefault(); savePassword(); }}>
            <h2 className="text-lg font-semibold">修改密码</h2>
            <p className="mt-1 text-sm text-[#14141473]">先验证手机 {store.phoneMasked}。演示码 {DEMO_CODE}。</p>
            <label className="mt-4 block text-sm">验证码
              <input value={code} inputMode="numeric" onChange={(event) => setCode(event.target.value.replace(/\D/g, "").slice(0, 6))} className="mt-2 h-11 w-full rounded-xl border border-[#1414141a] px-3 outline-none" />
            </label>
            <label className="mt-3 block text-sm">新密码
              <input type="password" value={nextPassword} onChange={(event) => setNextPassword(event.target.value)} className="mt-2 h-11 w-full rounded-xl border border-[#1414141a] px-3 outline-none" />
            </label>
            <label className="mt-3 block text-sm">确认新密码
              <input type="password" value={confirm} onChange={(event) => setConfirm(event.target.value)} className="mt-2 h-11 w-full rounded-xl border border-[#1414141a] px-3 outline-none" />
            </label>
            {passwordError ? <p className="mt-2 text-xs text-[#d9150b]">{passwordError}</p> : null}
            <div className="mt-4 flex justify-end gap-2">
              <button type="button" className="rounded-full px-4 py-2 text-sm" onClick={() => setPasswordOpen(false)}>取消</button>
              <button type="submit" className="rounded-full bg-[#141414] px-4 py-2 text-sm text-white">保存</button>
            </div>
          </form>
        </div>
      ) : null}

      {removeOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0003] p-4">
          <div className="w-[min(420px,92vw)] rounded-3xl bg-white p-5">
            <h2 className="text-lg font-semibold">删除个人账号</h2>
            <p className="mt-2 text-sm text-[#14141473]">这只会退出本地演示，不会删除真实千问办公账号。</p>
            <div className="mt-4 flex justify-end gap-2">
              <button type="button" className="rounded-full px-4 py-2 text-sm" onClick={() => setRemoveOpen(false)}>取消</button>
              <button type="button" className="rounded-full bg-[#d9150b] px-4 py-2 text-sm text-white" onClick={() => { store.logout(); router.push("/signin"); }}>确认退出</button>
            </div>
          </div>
        </div>
      ) : null}
    </PageShell>
  );
}

export function CreditsPage() {
  const store = useQwen();
  const [open, setOpen] = useState(false);
  const [pack, setPack] = useState(2000);
  const [done, setDone] = useState("");
  const canRecharge = store.planName !== "个人免费版";

  return (
    <PageShell title="积分" back="/app">
      <div className="flex items-end justify-between">
        <div>
          <p className="text-sm font-medium">当前可用</p>
          <p className="text-[32px] font-semibold leading-10 tabular-nums">{store.credits.toLocaleString("zh-CN")}</p>
        </div>
        <button type="button" disabled={!canRecharge} className="h-10 rounded-full bg-[#141414] px-7 text-sm text-white disabled:bg-[#1414141a] disabled:text-[#14141459]" onClick={() => setOpen(true)}>充值</button>
      </div>
      {!canRecharge ? <p className="mt-2 text-xs text-[#14141473]">个人免费版的充值按钮在线上是禁用的。升级到标准版或高级版后，可以在这里做本地积分购买。</p> : null}
      <h2 className="mb-2 mt-6 text-sm font-medium">详情</h2>
      <div className="rounded-[20px] bg-[#1414140a] px-4 text-sm">
        <CreditRow title="每日刷新积分" desc="每天 00:00 刷新" value={store.dailyCredits} />
        <CreditRow title="月度积分" desc="订阅套餐内的积分，当月有效" value={store.monthlyCredits} />
        <CreditRow title="长期积分" desc="通过充值或活动获取" value={store.longtermCredits} />
      </div>
      <p className="px-1 pt-2 text-xs text-[#14141473]">积分按照以下顺序消耗：活动积分、每日积分、月度积分和充值积分。</p>
      <h2 className="mb-2 mt-6 text-sm font-medium">变更记录</h2>
      <div className="rounded-[20px] bg-[#1414140a] px-4">
        {store.ledger.map((item, index) => (
          <div key={item.id} className={`flex min-h-[69px] items-center justify-between ${index > 0 ? "border-t border-[#1414141a]" : ""}`}>
            <span>
              <span className="block text-[15px]">{item.title}</span>
              <span className="text-xs text-[#14141473]">{item.time}</span>
            </span>
            <span className="tabular-nums text-[#14141473]">+{item.amount.toLocaleString("zh-CN")}</span>
          </div>
        ))}
      </div>
      <Link href="/pricing" className="mt-4 inline-block text-sm text-[#29a651]">查看订阅套餐</Link>
      {done ? <p className="mt-2 text-sm text-[#29a651]">{done}</p> : null}

      {open ? (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-[#0003] p-4 sm:items-center" onClick={() => setOpen(false)}>
          <div className="w-[min(440px,92vw)] rounded-3xl bg-white p-5" onClick={(event) => event.stopPropagation()}>
            <h2 className="text-lg font-semibold">积分购买</h2>
            <p className="mt-1 text-sm text-[#14141473]">线上收银台由阿里云提供，免费版按钮禁用。这里选择补充额度后只记入本地长期积分，不发起真实支付。</p>
            <div className="mt-4 grid grid-cols-1 gap-2 min-[380px]:grid-cols-3">
              {packs.map((amount) => (
                <button key={amount} type="button" aria-pressed={pack === amount} className={`rounded-2xl border px-2 py-4 text-sm ${pack === amount ? "border-[#141414] bg-[#1414140a]" : "border-[#14141414]"}`} onClick={() => setPack(amount)}>
                  {amount.toLocaleString("zh-CN")} 积分
                </button>
              ))}
            </div>
            <button type="button" className="mt-4 h-11 w-full rounded-full bg-[#141414] text-sm text-white" onClick={() => { store.recharge(pack); setDone(`已补充 ${pack.toLocaleString("zh-CN")} 长期积分`); setOpen(false); }}>确认充值</button>
          </div>
        </div>
      ) : null}
    </PageShell>
  );
}

function PageShell({ title, back, children }: { title: string; back: string; children: ReactNode }) {
  return (
    <main className="mx-auto w-full max-w-[640px] px-6 py-6">
      <div className="mb-6 flex items-center">
        <Link href={back} aria-label="返回" className="flex size-11 items-center justify-center rounded-full hover:bg-[#1414140a]">‹</Link>
        <h1 className="flex-1 text-center text-[17px] font-semibold">{title}</h1>
        <span className="size-11" />
      </div>
      {children}
    </main>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mt-4">
      <h2 className="mb-2 px-4 text-sm text-[#14141473]">{title}</h2>
      <div className="overflow-hidden rounded-2xl bg-[#1414140a]">{children}</div>
    </section>
  );
}

function Row({ href, label, value }: { href: string; label: string; value: string }) {
  return (
    <Link href={href} className="flex h-12 items-center justify-between border-b border-white px-4 text-sm last:border-b-0">
      <span>{label}</span>
      <span className="text-[#14141473]">{value}</span>
    </Link>
  );
}

function MenuRow({
  label,
  value,
  open,
  onToggle,
  options,
  onPick,
}: {
  label: string;
  value: string;
  open: boolean;
  onToggle: () => void;
  options: string[];
  onPick: (value: string) => void;
}) {
  return (
    <div className="relative border-b border-white last:border-b-0">
      <button type="button" aria-expanded={open} className="flex h-12 w-full items-center justify-between px-4 text-sm" onClick={onToggle}>
        <span>{label}</span>
        <span className="text-[#14141473]">{value}</span>
      </button>
      {open ? (
        <div className="absolute right-3 top-11 z-10 min-w-36 rounded-2xl bg-white p-1 shadow-lg">
          {options.map((option) => (
            <button key={option} type="button" role="menuitemradio" aria-checked={option === value} className="block w-full rounded-xl px-3 py-2 text-left text-sm hover:bg-[#1414140a]" onClick={() => onPick(option)}>{option}</button>
          ))}
        </div>
      ) : null}
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between border-b border-[#14141414] py-3 text-sm last:border-b-0">
      <span className="text-[#14141473]">{label}</span>
      <span>{value}</span>
    </div>
  );
}

function CreditRow({ title, desc, value }: { title: string; desc: string; value: number }) {
  return (
    <div className="flex items-center justify-between border-b border-[#14141414] py-3 last:border-b-0">
      <span>
        <span className="block">{title}</span>
        <span className="text-xs text-[#14141473]">{desc}</span>
      </span>
      <span className="tabular-nums">{value.toLocaleString("zh-CN")}</span>
    </div>
  );
}

export function planFromLabel(label: string): PlanName {
  if (label.includes("高级")) return "个人高级版";
  if (label.includes("标准")) return "个人标准版";
  return "个人免费版";
}
