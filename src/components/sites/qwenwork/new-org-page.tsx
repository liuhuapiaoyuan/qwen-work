"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { SiteFooter, SiteHeader } from "@/components/sites/qwenwork/site-frame";
import { useQwen } from "@/components/sites/qwenwork/store";

export function NewOrgPage() {
  const router = useRouter();
  const { login } = useQwen();
  const [org, setOrg] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [done, setDone] = useState(false);

  return (
    <div className="min-h-screen bg-[#f4f6f1] text-[#141414]">
      <SiteHeader />
      <main className="mx-auto max-w-[560px] px-5 py-16">
        <p className="text-sm text-[#14141473]">企业注册</p>
        <h1 className="mt-2 text-4xl font-semibold">创建组织</h1>
        <p className="mt-3 text-sm leading-6 text-[#141414a6]">填写企业信息。此页只在本地保存演示组织，不会向千问办公提交真实申请。</p>
        {done ? (
          <div className="mt-8 rounded-3xl bg-white p-6">
            <p className="text-lg font-medium">申请已记录</p>
            <p className="mt-2 text-sm text-[#141414a6]">{org} 的管理员 {name} 可以进入网页端继续体验。</p>
            <button type="button" className="mt-6 h-11 rounded-full bg-[#141414] px-5 text-white" onClick={() => { login(name); router.push("/app"); }}>
              进入工作台
            </button>
          </div>
        ) : (
          <form
            className="mt-8 space-y-4 rounded-3xl bg-white p-6"
            onSubmit={(event) => {
              event.preventDefault();
              setDone(true);
            }}
          >
            <Field label="企业名称" value={org} onChange={setOrg} />
            <Field label="管理员姓名" value={name} onChange={setName} />
            <Field label="手机号码" value={phone} onChange={(value) => setPhone(value.replace(/\D/g, "").slice(0, 11))} />
            <button type="submit" disabled={!org || !name || phone.length !== 11} className="h-12 w-full rounded-2xl bg-[#141414] text-white disabled:bg-[#1414140f] disabled:text-[#14141459]">
              提交
            </button>
          </form>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}

function Field({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return (
    <label className="block text-sm">
      <span className="mb-2 block font-medium">{label}</span>
      <input
        required
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-12 w-full rounded-xl border border-[#1414141a] px-3 outline-none focus:border-[#141414]"
      />
    </label>
  );
}
