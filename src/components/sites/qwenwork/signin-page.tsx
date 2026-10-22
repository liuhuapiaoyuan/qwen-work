"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronDown, Mail } from "lucide-react";
import { useEffect, useState } from "react";
import { Mark } from "@/components/sites/qwenwork/brand";
import { DEMO_CODE, EXTERNAL } from "@/components/sites/qwenwork/data";
import { useQwen } from "@/components/sites/qwenwork/store";

type Mode = "phone" | "qr" | "sso";
type QrChannel = "alipay" | "ding";
type Lang = "zh" | "en";

const copy = {
  zh: {
    welcome: "欢迎使用 千问办公",
    tagline: "你的智能工作伙伴，描述需求，直接交付。",
    phone: "手机号登录",
    qr: "扫码登录",
    phonePh: "请输入手机号码",
    codePh: "请输入验证码",
    send: "获取验证码",
    login: "登录",
    hint: "未注册的手机号码将自动注册千问办公帐号并登录",
    sso: "使用单点登录 (SSO)",
    back: "使用手机号或扫码登录",
    mailTitle: "使用工作邮箱登录至千问办公",
    mailPh: "请输入你的邮箱",
    mailBtn: "使用邮箱登录",
    share: "我同意共享 “完成账号绑定及订阅管理所必需的账号信息” 给阿里云获取并使用。",
    agree: "我已阅读并同意：",
    lang: "简体中文",
    sent: `验证码已发送，演示码 ${DEMO_CODE}`,
    badCode: "验证码错误，请重新输入",
    needAgree: "请先阅读并勾选协议",
  },
  en: {
    welcome: "Welcome to Qwen Work",
    tagline: "Describe the work. Get the deliverable.",
    phone: "Phone",
    qr: "QR code",
    phonePh: "Phone number",
    codePh: "Verification code",
    send: "Send code",
    login: "Sign in",
    hint: "Unregistered numbers will create a Qwen Work account.",
    sso: "Single sign-on (SSO)",
    back: "Use phone or QR code",
    mailTitle: "Sign in with your work email",
    mailPh: "Work email",
    mailBtn: "Continue with email",
    share: "I agree to share the account information required for binding and subscription with Alibaba Cloud.",
    agree: "I have read and agree to the terms.",
    lang: "English",
    sent: `Code sent. Demo code ${DEMO_CODE}`,
    badCode: "Incorrect code",
    needAgree: "Please accept the agreements",
  },
};

export function SignInPage() {
  const router = useRouter();
  const { login } = useQwen();
  const [lang, setLang] = useState<Lang>("zh");
  const [langOpen, setLangOpen] = useState(false);
  const [mode, setMode] = useState<Mode>("phone");
  const [channel, setChannel] = useState<QrChannel>("alipay");
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [email, setEmail] = useState("");
  const [share, setShare] = useState(false);
  const [agree, setAgree] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [notice, setNotice] = useState("");
  const t = copy[lang];
  const phoneOk = /^1\d{10}$/.test(phone);
  const canLogin = phoneOk && code.length === 6 && share && agree;

  useEffect(() => {
    if (seconds <= 0) return;
    const timer = window.setTimeout(() => setSeconds((value) => value - 1), 1000);
    return () => window.clearTimeout(timer);
  }, [seconds]);

  function enter(name: string) {
    if (!share || !agree) {
      setNotice(t.needAgree);
      return;
    }
    login(name);
    router.push("/app");
  }

  function sendCode() {
    if (!phoneOk || seconds > 0) return;
    if (!share || !agree) {
      setNotice(t.needAgree);
      return;
    }
    setSeconds(60);
    setNotice(t.sent);
  }

  function submitPhone() {
    if (!canLogin) return;
    if (code !== DEMO_CODE) {
      setNotice(t.badCode);
      return;
    }
    enter(phone.slice(-4));
  }

  return (
    <div className="relative min-h-dvh overflow-y-auto bg-[#26372f] text-[#141414]">
      <img
        src="/sites/qwenwork/signin-bg.png"
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="relative z-10 flex min-h-dvh items-start justify-center px-3 py-4 sm:items-center sm:p-8">
        <section className="flex w-full max-w-[480px] flex-col overflow-hidden rounded-3xl border border-[#14141433] bg-[#fcfcfc] shadow-[0_16px_48px_-8px_rgba(0,0,0,0.28)] sm:min-h-[680px] sm:rounded-[36px]">
          <div className="flex items-start justify-between bg-[#fcfcfcd9] p-5 backdrop-blur sm:p-8">
            <Link href="/" aria-label="千问办公">
              <Mark className="h-10" />
            </Link>
            <div className="relative">
              <button
                type="button"
                aria-label="界面语言"
                aria-expanded={langOpen}
                className="inline-flex items-center gap-1 text-sm text-[#141414a6]"
                onClick={() => setLangOpen((value) => !value)}
              >
                {t.lang} <ChevronDown className="size-4" />
              </button>
              {langOpen ? (
                <div className="absolute right-0 top-8 z-10 w-36 rounded-2xl bg-white p-1 shadow-lg">
                  <button type="button" className="block w-full rounded-xl px-3 py-2 text-left text-sm hover:bg-[#1414140a]" onClick={() => { setLang("zh"); setLangOpen(false); }}>简体中文</button>
                  <button type="button" className="block w-full rounded-xl px-3 py-2 text-left text-sm hover:bg-[#1414140a]" onClick={() => { setLang("en"); setLangOpen(false); }}>English</button>
                </div>
              ) : null}
            </div>
          </div>
          <div className="flex flex-1 flex-col px-5 pb-6 sm:px-8 sm:pb-8">
            <h1 className="text-2xl font-semibold leading-8">{t.welcome}</h1>
            <p className="mt-1 text-base leading-6 text-[#141414a6]">{t.tagline}</p>

            {mode !== "sso" ? (
              <div className="mt-6 grid grid-cols-2 rounded-full bg-[#14141412] p-1 text-sm">
                <button type="button" role="tab" aria-selected={mode === "phone"} className={`h-9 rounded-full ${mode === "phone" ? "bg-white shadow-sm" : "text-[#141414a6]"}`} onClick={() => setMode("phone")}>{t.phone}</button>
                <button type="button" role="tab" aria-selected={mode === "qr"} className={`h-9 rounded-full ${mode === "qr" ? "bg-white shadow-sm" : "text-[#141414a6]"}`} onClick={() => setMode("qr")}>{t.qr}</button>
              </div>
            ) : null}

            {mode === "phone" ? (
              <form
                className="mt-5"
                onSubmit={(event) => {
                  event.preventDefault();
                  submitPhone();
                }}
              >
                <label className={`flex h-12 items-center overflow-hidden rounded-2xl border bg-white ${phone ? "border-[#2ccc6c]" : "border-[#1414141a]"}`}>
                  <span className="border-r border-[#14141414] px-3 text-sm text-[#141414a6]">+86</span>
                  <input
                    aria-label={t.phonePh}
                    inputMode="numeric"
                    placeholder={t.phonePh}
                    value={phone}
                    onChange={(event) => setPhone(event.target.value.replace(/\D/g, "").slice(0, 11))}
                    className="h-full flex-1 bg-transparent px-3 text-sm outline-none"
                  />
                </label>
                <div className="mt-3 flex h-12 overflow-hidden rounded-2xl border border-[#1414141a] bg-white">
                  <input
                    aria-label={t.codePh}
                    inputMode="numeric"
                    placeholder={t.codePh}
                    value={code}
                    onChange={(event) => setCode(event.target.value.replace(/\D/g, "").slice(0, 6))}
                    className="h-full flex-1 bg-transparent px-3 text-sm outline-none"
                  />
                  <button
                    type="button"
                    disabled={!phoneOk || seconds > 0}
                    onClick={sendCode}
                    className="border-l border-[#14141414] px-3 text-sm text-[#141414] disabled:text-[#14141440]"
                  >
                    {seconds > 0 ? `${seconds}s` : t.send}
                  </button>
                </div>
                <button
                  type="submit"
                  disabled={!canLogin}
                  className="mt-3 h-12 w-full rounded-2xl bg-[#141414] text-sm text-white disabled:bg-[#1414140f] disabled:text-[#14141459]"
                >
                  {t.login}
                </button>
                <p className="mt-3 text-center text-xs text-[#14141473]">{t.hint}</p>
              </form>
            ) : null}

            {mode === "qr" ? (
              <div className="mt-6 flex flex-1 flex-col items-center">
                <div className="flex gap-2 text-sm">
                  <button type="button" aria-pressed={channel === "alipay"} className={`rounded-full px-3 py-1 ${channel === "alipay" ? "bg-[#14141412]" : ""}`} onClick={() => setChannel("alipay")}>支付宝</button>
                  <button type="button" aria-pressed={channel === "ding"} className={`rounded-full px-3 py-1 ${channel === "ding" ? "bg-[#14141412]" : ""}`} onClick={() => setChannel("ding")}>手机钉钉</button>
                </div>
                <button
                  type="button"
                  aria-label={channel === "alipay" ? "支付宝二维码，点击完成演示登录" : "钉钉二维码，点击完成演示登录"}
                  onClick={() => enter("7165")}
                  className="mt-5 rounded-3xl border border-[#14141414] bg-white p-4"
                >
                  <QrMark label={channel === "alipay" ? "支" : "钉"} />
                </button>
                <p className="mt-3 text-center text-xs text-[#14141473]">本地演示不会连接真实扫码服务，点击二维码进入工作台。</p>
              </div>
            ) : null}

            {mode === "sso" ? (
              <form
                className="mt-6"
                onSubmit={(event) => {
                  event.preventDefault();
                  if (!email.includes("@")) {
                    setNotice(lang === "zh" ? "请输入有效邮箱" : "Enter a valid email");
                    return;
                  }
                  enter(email.split("@")[0] || "7165");
                }}
              >
                <h2 className="text-base font-semibold">{t.mailTitle}</h2>
                <label className="mt-4 flex h-12 items-center gap-2 rounded-2xl border border-[#1414141a] bg-white px-3">
                  <Mail className="size-4 text-[#14141473]" />
                  <input
                    type="email"
                    required
                    aria-label={t.mailPh}
                    placeholder={t.mailPh}
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    className="h-full flex-1 bg-transparent text-sm outline-none"
                  />
                </label>
                <button
                  type="submit"
                  disabled={!email.includes("@")}
                  className="mt-3 h-12 w-full rounded-2xl bg-[#141414] text-sm text-white disabled:bg-[#1414140f] disabled:text-[#14141459]"
                >
                  {t.mailBtn}
                </button>
              </form>
            ) : null}

            <button
              type="button"
              className="mx-auto mt-6 text-sm text-[#29a651]"
              onClick={() => setMode(mode === "sso" ? "phone" : "sso")}
            >
              {mode === "sso" ? t.back : t.sso}
            </button>

            {mode !== "qr" ? (
              <div className="mt-auto space-y-3 pt-6 text-xs leading-5 text-[#141414a6]">
                <label className="flex gap-2">
                  <input type="checkbox" checked={share} onChange={(event) => setShare(event.target.checked)} className="mt-0.5" />
                  <span>{t.share}</span>
                </label>
                <label className="flex gap-2">
                  <input type="checkbox" checked={agree} onChange={(event) => setAgree(event.target.checked)} className="mt-0.5" />
                  <span>
                    {t.agree}
                    {lang === "zh" ? (
                      <>
                        <a className="underline" href={EXTERNAL.terms}>千问办公服务协议</a>、
                        <a className="underline" href={EXTERNAL.privacy}>隐私政策</a>
                        {" "}和{" "}
                        <a className="underline" href={EXTERNAL.aliyunUser}>阿里云用户协议</a>、
                        <a className="underline" href={EXTERNAL.aliyunService}>服务协议</a>、
                        <a className="underline" href={EXTERNAL.aliyunPrivacy}>隐私政策</a>。
                      </>
                    ) : null}
                  </span>
                </label>
              </div>
            ) : null}
            {notice ? <p className="mt-3 text-center text-xs text-[#d9150b]">{notice}</p> : null}
          </div>
        </section>
      </div>
    </div>
  );
}

function QrMark({ label }: { label: string }) {
  return (
    <svg viewBox="0 0 120 120" className="size-44" role="img" aria-hidden="true">
      <rect width="120" height="120" fill="white" />
      <rect x="8" y="8" width="32" height="32" fill="none" stroke="#141414" strokeWidth="6" />
      <rect x="80" y="8" width="32" height="32" fill="none" stroke="#141414" strokeWidth="6" />
      <rect x="8" y="80" width="32" height="32" fill="none" stroke="#141414" strokeWidth="6" />
      <rect x="16" y="16" width="16" height="16" fill="#141414" />
      <rect x="88" y="16" width="16" height="16" fill="#141414" />
      <rect x="16" y="88" width="16" height="16" fill="#141414" />
      {Array.from({ length: 8 }).map((_, row) =>
        Array.from({ length: 8 }).map((__, col) =>
          (row * 3 + col) % 2 === 0 ? (
            <rect key={`${row}-${col}`} x={48 + col * 6} y={48 + row * 6} width="4" height="4" fill="#141414" />
          ) : null,
        ),
      )}
      <text x="60" y="66" textAnchor="middle" fontSize="18" fill="#141414">{label}</text>
    </svg>
  );
}
