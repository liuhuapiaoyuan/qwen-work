"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type Task = {
  id: string;
  title: string;
  createdAt: number;
  status: "running" | "done";
};

export type Artifact = {
  id: string;
  name: string;
  kind: "文档" | "表格" | "PPT" | "网页" | "图片" | "代码" | "视频" | "应用" | "其他";
  taskId: string;
  starred?: boolean;
};

export type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
  steps?: string[];
  artifactId?: string;
};

export type ScheduleItem = {
  id: string;
  title: string;
  desc: string;
  when: string;
};

export type ThemeMode = "亮色" | "暗色" | "自动";
export type PlanName = "个人免费版" | "个人标准版" | "个人高级版";
export type LedgerItem = { id: string; title: string; time: string; amount: number };

type State = {
  authed: boolean;
  name: string;
  planName: PlanName;
  industry: string;
  phoneMasked: string;
  userId: string;
  aliyun: string;
  theme: ThemeMode;
  language: "简体中文" | "英语";
  password: string;
  dailyCredits: number;
  monthlyCredits: number;
  longtermCredits: number;
  ledger: LedgerItem[];
  tasks: Task[];
  messages: Record<string, ChatMessage[]>;
  artifacts: Artifact[];
  schedules: ScheduleItem[];
  kits: string[];
  skills: string[];
  customSkills: { id: string; title: string; category: string }[];
  connectors: string[];
  model: "标准" | "前沿模型";
  welcomeSeen: boolean;
};

const defaultState: State = {
  authed: true,
  name: "7165",
  planName: "个人免费版",
  industry: "日常办公",
  phoneMasked: "186****7165",
  userId: "8a00750a-edc8-4640-9da2-6eefa2efb21e",
  aliyun: "guohl********.com",
  theme: "亮色",
  language: "简体中文",
  password: "",
  dailyCredits: 100,
  monthlyCredits: 0,
  longtermCredits: 2000,
  ledger: [
    { id: "welcome", title: "欢迎奖励", time: "2026-10-22 17:39", amount: 2000 },
    { id: "daily", title: "每日奖励", time: "2026-10-22 00:00", amount: 100 },
  ],
  tasks: [],
  messages: {},
  artifacts: [],
  schedules: [],
  kits: [],
  skills: [],
  customSkills: [],
  connectors: [],
  model: "标准",
  welcomeSeen: false,
};

type Store = State & {
  plan: string;
  credits: number;
  login: (name: string) => void;
  logout: () => void;
  setModel: (model: State["model"]) => void;
  setTheme: (theme: ThemeMode) => void;
  setLanguage: (language: State["language"]) => void;
  setIndustry: (industry: string) => void;
  setName: (name: string) => void;
  setPassword: (password: string) => void;
  subscribe: (planName: PlanName) => void;
  recharge: (amount: number) => void;
  dismissWelcome: () => void;
  toggleKit: (id: string) => void;
  toggleSkill: (id: string) => void;
  toggleConnector: (id: string) => void;
  addCustomSkill: (title: string, category: string) => void;
  addArtifact: (name: string, kind: Artifact["kind"]) => void;
  toggleStar: (id: string) => void;
  addSchedule: (item: Omit<ScheduleItem, "id">) => void;
  removeSchedule: (id: string) => void;
  startTask: (title: string) => string;
  finishTask: (id: string) => void;
  continueTask: (sessionId: string, title: string) => void;
};

const Ctx = createContext<Store | null>(null);

export function QwenProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<State>(defaultState);

  const commit = useCallback((next: State) => {
    setState(next);
  }, []);

  const api = useMemo<Store>(() => {
    return {
      ...state,
      plan: `${state.planName} · ${state.industry}`,
      credits: state.dailyCredits + state.monthlyCredits + state.longtermCredits,
      login: (name) =>
        commit({
          ...state,
          authed: true,
          name: name || "7165",
          welcomeSeen: false,
        }),
      logout: () => commit({ ...defaultState, authed: false, welcomeSeen: true }),
      setModel: (model) => commit({ ...state, model }),
      setTheme: (theme) => commit({ ...state, theme }),
      setLanguage: (language) => commit({ ...state, language }),
      setIndustry: (industry) => commit({ ...state, industry }),
      setName: (name) => commit({ ...state, name: name.slice(0, 255) }),
      setPassword: (password) => commit({ ...state, password }),
      subscribe: (planName) =>
        commit({
          ...state,
          planName,
          dailyCredits: planName === "个人高级版" ? 300 : planName === "个人标准版" ? 200 : 100,
          monthlyCredits: planName === "个人高级版" ? 4000 : planName === "个人标准版" ? 2000 : 0,
        }),
      recharge: (amount) =>
        commit({
          ...state,
          longtermCredits: state.longtermCredits + amount,
          ledger: [
            {
              id: `recharge-${Date.now()}`,
              title: "积分充值",
              time: new Date().toLocaleString("zh-CN", { hour12: false }).replace(/\//g, "-"),
              amount,
            },
            ...state.ledger,
          ],
        }),
      dismissWelcome: () => commit({ ...state, welcomeSeen: true }),
      toggleKit: (id) =>
        commit({
          ...state,
          kits: state.kits.includes(id)
            ? state.kits.filter((item) => item !== id)
            : [...state.kits, id],
        }),
      toggleSkill: (id) =>
        commit({
          ...state,
          skills: state.skills.includes(id)
            ? state.skills.filter((item) => item !== id)
            : [...state.skills, id],
        }),
      toggleConnector: (id) =>
        commit({
          ...state,
          connectors: state.connectors.includes(id)
            ? state.connectors.filter((item) => item !== id)
            : [...state.connectors, id],
        }),
      addCustomSkill: (title, category) =>
        commit({
          ...state,
          customSkills: [
            { id: `local-${Date.now()}`, title, category },
            ...state.customSkills,
          ],
        }),
      addArtifact: (name, kind) =>
        commit({
          ...state,
          artifacts: [
            { id: `file-${Date.now()}`, name, kind, taskId: "upload", starred: false },
            ...state.artifacts,
          ],
        }),
      toggleStar: (id) =>
        commit({
          ...state,
          artifacts: state.artifacts.map((item) =>
            item.id === id ? { ...item, starred: !item.starred } : item,
          ),
        }),
      addSchedule: (item) =>
        commit({
          ...state,
          schedules: [{ ...item, id: `sch-${Date.now()}` }, ...state.schedules],
        }),
      removeSchedule: (id) =>
        commit({
          ...state,
          schedules: state.schedules.filter((item) => item.id !== id),
        }),
      startTask: (title) => {
        const id = `task-${Date.now()}`;
        const artifact = artifactFor(title, id);
        const user: ChatMessage = {
          id: `${id}-u`,
          role: "user",
          content: title,
        };
        const assistant: ChatMessage = {
          id: `${id}-a`,
          role: "assistant",
          content: replyFor(title),
          steps: ["理解需求", "拆解步骤", `交付${artifact.kind}`],
          artifactId: artifact.id,
        };
        commit({
          ...state,
          tasks: [{ id, title, createdAt: Date.now(), status: "done" }, ...state.tasks],
          messages: { ...state.messages, [id]: [user, assistant] },
          artifacts: [artifact, ...state.artifacts],
        });
        return id;
      },
      finishTask: (id) =>
        commit({
          ...state,
          tasks: state.tasks.map((task) =>
            task.id === id ? { ...task, status: "done" } : task,
          ),
        }),
      continueTask: (sessionId, title) => {
        const artifact = artifactFor(title, `${sessionId}-${Date.now()}`);
        const next: ChatMessage[] = [
          ...(state.messages[sessionId] ?? []),
          { id: `${artifact.id}-u`, role: "user", content: title },
          {
            id: `${artifact.id}-a`,
            role: "assistant",
            content: replyFor(title),
            steps: ["理解补充要求", "沿用当前上下文", `更新${artifact.kind}`],
            artifactId: artifact.id,
          },
        ];
        commit({
          ...state,
          messages: { ...state.messages, [sessionId]: next },
          artifacts: [artifact, ...state.artifacts],
          tasks: state.tasks.map((task) =>
            task.id === sessionId ? { ...task, title } : task,
          ),
        });
      },
    };
  }, [commit, state]);

  return <Ctx.Provider value={api}>{children}</Ctx.Provider>;
}

export function useQwen() {
  const value = useContext(Ctx);
  if (!value) throw new Error("useQwen 必须在 QwenProvider 内使用");
  return value;
}

function artifactFor(title: string, taskId: string): Artifact {
  if (/表|数据|excel/i.test(title)) {
    return { id: `${taskId}-file`, name: "分析表格.xlsx", kind: "表格", taskId };
  }
  if (/ppt|演示|幻灯/i.test(title)) {
    return { id: `${taskId}-file`, name: "汇报演示.pptx", kind: "PPT", taskId };
  }
  if (/网页|页面/.test(title)) {
    return { id: `${taskId}-file`, name: "交付页面.html", kind: "网页", taskId };
  }
  return { id: `${taskId}-file`, name: "交付文档.docx", kind: "文档", taskId };
}

function replyFor(title: string) {
  return `已根据「${title}」完成一版可编辑交付。下面是结论摘要，完整文件在产物空间，也可以继续在这个任务里修改。`;
}
