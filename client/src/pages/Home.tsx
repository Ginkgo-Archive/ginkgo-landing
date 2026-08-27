import { useMemo, useState } from "react";
import {
  ArrowRight,
  Bot,
  Check,
  ChevronRight,
  CreditCard,
  Database,
  Github,
  Instagram,
  Linkedin,
  Mail,
  Menu,
  MessageCircle,
  Network,
  Server,
  ShieldCheck,
  Terminal,
  Workflow,
  X,
} from "lucide-react";
import { siteConfig } from "@/config/site";

type ProjectType =
  | "Automação"
  | "Agente de IA"
  | "CRM"
  | "WhatsApp"
  | "n8n"
  | "Skills"
  | "VPS"
  | "Claude / Codex"
  | "Outro";

type Integration =
  | "CRM"
  | "ERP"
  | "WhatsApp"
  | "E-mail"
  | "Sistema próprio"
  | "Ainda não sei";

const navItems = [
  ["Soluções", "#solucoes"],
  ["Integrações", "#integracoes"],
  ["Skills", "#skills"],
  ["Projetos", "#projetos"],
  ["Infraestrutura", "#infraestrutura"],
  ["Contato", "#contato"],
] as const;

const services = [
  {
    icon: Workflow,
    eyebrow: "01 / AUTOMAÇÕES N8N",
    title: "Automação construída ao redor da sua operação.",
    text: "Mapeamos processos, removemos tarefas repetitivas e conectamos APIs, bancos, CRMs, WhatsApp, e-mail, documentos e sistemas internos.",
    items: ["APIs e webhooks", "Rotinas comerciais e operacionais", "ETL e sincronização", "Aprovações humanas", "Logs, retries e monitoramento"],
  },
  {
    icon: Bot,
    eyebrow: "02 / AGENTES DE IA",
    title: "Agentes com função, contexto, ferramentas e limites.",
    text: "Criamos agentes que atendem, pesquisam, qualificam, organizam e executam tarefas usando ferramentas reais, com rastreabilidade e intervenção humana quando necessário.",
    items: ["Atendimento multimodal", "CRM e operações internas", "Pesquisa e relatórios", "Claude Code / Codex / Gemini", "MCP, Skills e ferramentas"],
  },
  {
    icon: Server,
    eyebrow: "03 / INFRAESTRUTURA",
    title: "Da VPS vazia à operação em produção.",
    text: "Estruturamos ambientes para hospedar automações e agentes com persistência, segurança, observabilidade e previsibilidade operacional.",
    items: ["Linux e Docker", "Traefik / SSL / DNS", "PostgreSQL e Redis", "n8n, filas e serviços", "Backups e hardening"],
  },
];

const projects = [
  {
    name: "CALLIMA",
    label: "ATENDIMENTO MULTIMODAL",
    text: "Arquitetura para atendimento que entende texto, áudio, imagens, documentos e links antes de decidir a próxima ação.",
    flow: ["WhatsApp", "Normalização", "RAG / Contexto", "Agente", "Skills", "CRM / Ação", "Log"],
    tags: ["n8n", "WhatsApp", "RAG", "Supabase", "Redis", "LLM"],
  },
  {
    name: "DEV AGENT WORKSPACE",
    label: "CLAUDE / CODEX",
    text: "Ambientes configurados para agentes de desenvolvimento trabalharem com contexto do repositório, regras, ferramentas e validação.",
    flow: ["GitHub", "Claude / Codex", "Contexto", "Skills / MCP", "Testes", "Revisão", "Git"],
    tags: ["Claude Code", "Codex", "GitHub", "MCP", "Skills"],
  },
  {
    name: "AI AUTOMATION VPS",
    label: "INFRAESTRUTURA",
    text: "Stack organizada para executar automações e agentes com rede, persistência, logs e isolamento de serviços.",
    flow: ["DNS", "Traefik", "Docker", "n8n", "PostgreSQL", "Redis", "Agents"],
    tags: ["Linux", "Docker", "Traefik", "PostgreSQL", "Redis", "n8n"],
  },
  {
    name: "LEAD OPERATIONS",
    label: "COMERCIAL",
    text: "Automação comercial para pesquisar, qualificar, organizar e acompanhar oportunidades sem transformar o CRM em um cemitério de planilhas.",
    flow: ["Lead", "Pesquisa", "Enriquecimento", "Score", "Outreach", "CRM", "Follow-up"],
    tags: ["n8n", "CRM", "Enrichment", "E-mail", "AI"],
  },
];

const skillSets = [
  ["CRM", ["find_customer()", "update_lead()", "create_opportunity()", "log_interaction()"]],
  ["SUPORTE", ["search_docs()", "create_ticket()", "classify_issue()", "escalate()"]],
  ["COMERCIAL", ["research_lead()", "enrich()", "qualify()", "follow_up()"]],
  ["DEV", ["inspect_repository()", "run_tests()", "write_docs()", "open_pr()"]],
] as const;

const technologies = ["n8n", "OpenAI", "Claude", "Codex", "Gemini", "Supabase", "PostgreSQL", "Redis", "Docker", "Traefik", "GitHub", "Evolution API", "WhatsApp", "REST APIs"];

function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <a href="#top" className="flex items-center gap-3 group" aria-label="Ginkgo AI Systems">
      <img src="/brand/ginkgo-tree-gold.png" alt="" className={`${compact ? "h-8 w-8" : "h-10 w-10"} object-contain gold-glow`} />
      <div className="leading-none">
        <strong className="font-display text-sm tracking-[0.12em] text-white">GINKGO</strong>
        {!compact && <span className="block mt-1 font-mono text-[9px] tracking-[0.2em] text-white/40">AI SYSTEMS</span>}
      </div>
    </a>
  );
}

function Flow({ items }: { items: readonly string[] }) {
  return (
    <div className="flex flex-wrap items-center gap-2 font-mono text-[10px] text-white/55">
      {items.map((item, index) => (
        <div key={item} className="flex items-center gap-2">
          <span className="border border-white/10 bg-white/[0.025] px-2.5 py-1.5">{item}</span>
          {index < items.length - 1 && <ChevronRight size={12} className="text-signal/60" />}
        </div>
      ))}
    </div>
  );
}

function WhatsAppAssistant() {
  const [open, setOpen] = useState(false);
  const [type, setType] = useState<ProjectType | "">("");
  const [integration, setIntegration] = useState<Integration | "">("");
  const [goal, setGoal] = useState("");

  const types: ProjectType[] = ["Automação", "Agente de IA", "CRM", "WhatsApp", "n8n", "Skills", "VPS", "Claude / Codex", "Outro"];
  const integrations: Integration[] = ["CRM", "ERP", "WhatsApp", "E-mail", "Sistema próprio", "Ainda não sei"];

  const message = useMemo(() => {
    return `Olá, Ginkgo. Quero conversar sobre um projeto.\n\nTipo: ${type || "A definir"}\nIntegração: ${integration || "A definir"}\nObjetivo: ${goal || "Quero explicar durante o contato."}`;
  }, [type, integration, goal]);

  const send = () => {
    if (!siteConfig.whatsappNumber) {
      window.location.hash = "contato";
      setOpen(false);
      return;
    }
    const phone = siteConfig.whatsappNumber.replace(/\D/g, "");
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  };

  return (
    <>
      <button onClick={() => setOpen(v => !v)} className="fixed bottom-5 right-5 z-50 grid h-14 w-14 place-items-center rounded-full border border-signal/35 bg-[#101311] text-signal shadow-[0_12px_50px_rgba(0,0,0,.55)] transition hover:-translate-y-1 hover:border-signal" aria-label="Abrir assistente de projeto">
        {open ? <X size={20} /> : <MessageCircle size={22} />}
      </button>
      {open && (
        <section className="fixed bottom-24 right-4 z-50 w-[min(390px,calc(100vw-2rem))] border border-white/10 bg-[#0b0e0c] shadow-[0_30px_100px_rgba(0,0,0,.7)]">
          <header className="flex items-center gap-3 border-b border-white/10 p-4">
            <img src="/brand/ginkgo-leaf-gold.png" alt="" className="h-8 w-8 object-contain" />
            <div className="flex-1"><strong className="font-display text-sm">Project Assistant</strong><p className="mt-0.5 text-[11px] text-white/40">Qualifique seu projeto em menos de um minuto.</p></div>
            <button onClick={() => setOpen(false)} aria-label="Fechar"><X size={17} /></button>
          </header>
          <div className="max-h-[65vh] overflow-y-auto p-4 space-y-5">
            <div><p className="mb-2 text-xs font-medium text-white/70">1. O que você quer construir?</p><div className="flex flex-wrap gap-2">{types.map(v => <button key={v} onClick={() => setType(v)} className={`border px-2.5 py-1.5 text-[11px] ${type === v ? "border-signal bg-signal/10 text-signal" : "border-white/10 text-white/55 hover:border-white/25"}`}>{v}</button>)}</div></div>
            <div><p className="mb-2 text-xs font-medium text-white/70">2. Com o que precisamos integrar?</p><div className="flex flex-wrap gap-2">{integrations.map(v => <button key={v} onClick={() => setIntegration(v)} className={`border px-2.5 py-1.5 text-[11px] ${integration === v ? "border-cyan/60 bg-cyan/10 text-cyan" : "border-white/10 text-white/55 hover:border-white/25"}`}>{v}</button>)}</div></div>
            <div><label className="mb-2 block text-xs font-medium text-white/70" htmlFor="assistant-goal">3. Qual processo você quer automatizar?</label><textarea id="assistant-goal" value={goal} onChange={e => setGoal(e.target.value)} rows={3} placeholder="Ex.: receber leads, consultar o CRM e agendar reuniões automaticamente." className="w-full resize-none border border-white/10 bg-white/[0.025] p-3 text-sm text-white placeholder:text-white/25 focus:border-signal/60" /></div>
            <button onClick={send} className="flex w-full items-center justify-center gap-2 bg-signal px-4 py-3 text-sm font-semibold text-[#171307] transition hover:brightness-110"><MessageCircle size={16} />{siteConfig.whatsappNumber ? "Continuar no WhatsApp" : "Ir para contato"}</button>
          </div>
        </section>
      )}
    </>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [skill, setSkill] = useState(0);
  const [configType, setConfigType] = useState("Atendimento");
  const [configSystem, setConfigSystem] = useState("CRM");
  const [configGoal, setConfigGoal] = useState("");

  const submitConfigurator = async () => {
    const payload = { type: configType, system: configSystem, goal: configGoal };
    if (siteConfig.configuratorWebhookUrl) {
      try {
        await fetch(siteConfig.configuratorWebhookUrl, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(payload) });
      } catch {
        // Keep the fallback contact path available if the external workflow is unavailable.
      }
    }
    const text = `Olá, Ginkgo. Quero mapear uma automação.\n\nÁrea: ${configType}\nSistema: ${configSystem}\nObjetivo: ${configGoal || "Quero detalhar em uma conversa."}`;
    if (siteConfig.whatsappNumber) {
      window.open(`https://wa.me/${siteConfig.whatsappNumber.replace(/\D/g, "")}?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");
    } else {
      window.location.hash = "contato";
    }
  };

  return (
    <main id="top" className="min-h-screen overflow-x-hidden bg-ink text-white">
      <nav className="sticky top-0 z-40 border-b border-white/[0.07] bg-[#050507]/85 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 lg:px-8">
          <Logo compact />
          <div className="hidden items-center gap-7 lg:flex">{navItems.map(([label, href]) => <a key={href} href={href} className="text-xs text-white/45 transition hover:text-white">{label}</a>)}<a href="#reuniao" className="border border-signal/50 px-4 py-2 text-xs font-semibold text-signal transition hover:bg-signal hover:text-[#171307]">Falar sobre meu projeto</a></div>
          <button className="lg:hidden" onClick={() => setMenuOpen(v => !v)} aria-label="Abrir menu">{menuOpen ? <X /> : <Menu />}</button>
        </div>
        {menuOpen && <div className="border-t border-white/10 bg-[#080a09] px-5 py-5 lg:hidden">{navItems.map(([label, href]) => <a key={href} href={href} onClick={() => setMenuOpen(false)} className="block border-b border-white/[0.06] py-3 text-sm text-white/65">{label}</a>)}</div>}
      </nav>

      <section className="relative min-h-[82vh] border-b border-white/[0.07]">
        <div className="pointer-events-none absolute inset-0 opacity-40" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,.035) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.035) 1px,transparent 1px)", backgroundSize: "64px 64px", maskImage: "radial-gradient(circle at 70% 35%, black, transparent 70%)" }} />
        <div className="pointer-events-none absolute right-[-10%] top-[-20%] h-[700px] w-[700px] rounded-full bg-signal/[0.07] blur-[150px]" />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-5 py-24 lg:grid-cols-[1.05fr_.95fr] lg:px-8 lg:py-32">
          <div className="self-center">
            <p className="font-mono text-[10px] tracking-[0.22em] text-signal">AI AUTOMATION SYSTEMS</p>
            <h1 className="mt-6 max-w-4xl font-display text-[clamp(3rem,7vw,6.7rem)] font-semibold leading-[.91] tracking-[-.055em]">Automação sob medida.<br /><span className="text-white/48">Agentes que trabalham.</span><br /><span className="text-signal">Infraestrutura que escala.</span></h1>
            <p className="mt-8 max-w-2xl text-base leading-7 text-white/52 lg:text-lg">Projetamos automações, agentes de IA, integrações e infraestrutura para transformar processos manuais em sistemas inteligentes, conectados e operacionais — do primeiro webhook à produção.</p>
            <div className="mt-9 flex flex-wrap gap-3"><a href="#configurador" className="flex items-center gap-2 bg-signal px-5 py-3 text-sm font-semibold text-[#171307] hover:brightness-110">Mapear meu processo <ArrowRight size={16} /></a><a href="#reuniao" className="flex items-center gap-2 border border-white/15 px-5 py-3 text-sm text-white/75 hover:border-signal/50 hover:text-signal">Reservar reunião de projeto</a></div>
            <p className="mt-4 font-mono text-[10px] tracking-wider text-white/28">DIAGNÓSTICO INICIAL · ARQUITETURA · IMPLEMENTAÇÃO · SUPORTE</p>
          </div>
          <div className="relative flex min-h-[420px] items-center justify-center">
            <img src="/brand/ginkgo-tree-gold.png" alt="Árvore tecnológica Ginkgo" className="relative z-10 w-[min(520px,90%)] object-contain gold-glow" />
            <div className="absolute inset-x-4 bottom-4 z-20 border border-white/10 bg-[#080a09]/90 p-4 backdrop-blur">
              <div className="mb-3 flex items-center justify-between"><span className="font-mono text-[9px] tracking-[.18em] text-white/35">LIVE ARCHITECTURE</span><span className="flex items-center gap-2 text-[10px] text-cyan"><span className="h-1.5 w-1.5 rounded-full bg-cyan" />OPERATIONAL FLOW</span></div>
              <Flow items={["WhatsApp", "n8n", "AI Agent", "Skills", "CRM", "Human", "Action"]} />
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-white/[0.07] py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-5 lg:px-8"><p className="font-mono text-[10px] tracking-[.2em] text-white/35">THE OPERATING THESIS</p><div className="mt-6 grid gap-10 lg:grid-cols-2"><h2 className="font-display text-4xl font-semibold tracking-tight lg:text-6xl">Não automatizamos ferramentas.<br /><span className="text-signal">Automatizamos processos.</span></h2><div><p className="max-w-xl leading-7 text-white/50">Antes de escolher tecnologia, entendemos como sua operação funciona, onde existem gargalos, quais decisões podem ser delegadas e quais precisam continuar humanas.</p><div className="mt-7 space-y-3 text-sm">{[["Leads dispersos", "Atendimento e qualificação automática"], ["Tarefas repetitivas", "Workflows executáveis"], ["Ferramentas isoladas", "Operação integrada"]].map(([a,b]) => <div key={a} className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 border-t border-white/10 py-3"><span className="text-white/35">{a}</span><ArrowRight size={13} className="text-signal" /><span>{b}</span></div>)}</div></div></div></div>
      </section>

      <section id="solucoes" className="py-20 lg:py-28"><div className="mx-auto max-w-7xl px-5 lg:px-8"><div className="mb-12 max-w-3xl"><p className="font-mono text-[10px] tracking-[.2em] text-signal">WHAT WE BUILD</p><h2 className="mt-4 font-display text-4xl font-semibold lg:text-6xl">Um sistema completo, não um chatbot solto.</h2></div><div className="grid border-l border-t border-white/10 lg:grid-cols-3">{services.map(({icon: Icon, ...s}) => <article key={s.eyebrow} className="border-b border-r border-white/10 p-6 lg:p-8"><Icon className="text-signal" size={24} strokeWidth={1.5} /><p className="mt-8 font-mono text-[9px] tracking-[.18em] text-white/30">{s.eyebrow}</p><h3 className="mt-3 font-display text-2xl font-semibold">{s.title}</h3><p className="mt-4 text-sm leading-6 text-white/45">{s.text}</p><ul className="mt-7 space-y-2">{s.items.map(item => <li key={item} className="flex items-center gap-2 text-xs text-white/60"><Check size={13} className="text-cyan" />{item}</li>)}</ul></article>)}</div></div></section>

      <section id="integracoes" className="border-y border-white/[0.07] bg-white/[0.015] py-20 lg:py-28"><div className="mx-auto grid max-w-7xl gap-14 px-5 lg:grid-cols-[.8fr_1.2fr] lg:px-8"><div><p className="font-mono text-[10px] tracking-[.2em] text-cyan">INTEGRATION LAYER</p><h2 className="mt-4 font-display text-4xl font-semibold lg:text-5xl">Seu agente não deve viver isolado em um chat.</h2><p className="mt-5 leading-7 text-white/48">Integramos agentes aos sistemas que já fazem parte da empresa. O valor do agente cresce quando ele ganha acesso controlado às ferramentas certas.</p></div><div className="relative grid min-h-[420px] place-items-center border border-white/10 bg-[#080a09] p-7"><div className="absolute inset-0 opacity-40" style={{backgroundImage:"radial-gradient(circle,rgba(255,255,255,.1) 1px,transparent 1px)",backgroundSize:"26px 26px"}} /><div className="relative z-10 grid h-32 w-32 place-items-center rounded-full border border-signal/50 bg-signal/10 text-center"><Bot className="text-signal" /><span className="font-mono text-[9px] tracking-wider text-signal">GINKGO<br/>AI AGENT</span></div>{["CRM","ERP","WhatsApp","E-mail","GitHub","PostgreSQL","Calendar","REST API"].map((item,i) => { const pos=[[8,10],[72,7],[4,46],[75,44],[8,82],[73,80],[39,3],[41,86]][i]; return <div key={item} className="absolute z-10 border border-white/10 bg-[#101311] px-3 py-2 font-mono text-[10px] text-white/60" style={{left:`${pos[0]}%`,top:`${pos[1]}%`}}>{item}</div>})}</div></div></section>

      <section id="skills" className="py-20 lg:py-28"><div className="mx-auto max-w-7xl px-5 lg:px-8"><div className="grid gap-12 lg:grid-cols-2"><div><p className="font-mono text-[10px] tracking-[.2em] text-signal">AGENT SKILLS</p><h2 className="mt-4 font-display text-4xl font-semibold lg:text-6xl">Skills transformam agentes em especialistas.</h2><p className="mt-5 max-w-xl leading-7 text-white/48">Estruturamos conhecimento operacional em módulos reutilizáveis: contexto + Skill + ferramentas + política. Menos dependência de prompts gigantes; mais capacidade controlada.</p><div className="mt-8 flex flex-wrap gap-2">{skillSets.map(([name],i) => <button key={name} onClick={() => setSkill(i)} className={`border px-4 py-2 font-mono text-[10px] tracking-wider ${skill===i?"border-signal bg-signal/10 text-signal":"border-white/10 text-white/40"}`}>{name}</button>)}</div></div><div className="border border-white/10 bg-[#080a09] p-6 lg:p-8"><div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4"><div className="border border-white/10 p-4"><Bot size={20} className="text-white/50"/><p className="mt-3 font-mono text-[10px] text-white/40">GENERIC AGENT</p></div><span className="text-signal">+</span><div className="border border-signal/30 bg-signal/5 p-4"><Network size={20} className="text-signal"/><p className="mt-3 font-mono text-[10px] text-signal">{skillSets[skill][0]} SKILL</p></div></div><div className="my-5 flex justify-center"><ArrowRight className="rotate-90 text-white/25"/></div><div className="border border-cyan/25 bg-cyan/[0.04] p-5"><p className="font-mono text-[9px] tracking-[.18em] text-cyan">SPECIALIZED CAPABILITY</p><div className="mt-4 grid gap-2 sm:grid-cols-2">{skillSets[skill][1].map(fn => <code key={fn} className="border border-white/10 bg-black/20 px-3 py-2 text-[11px] text-white/65">{fn}</code>)}</div></div></div></div></div></section>

      <section id="projetos" className="border-y border-white/[0.07] bg-white/[0.015] py-20 lg:py-28"><div className="mx-auto max-w-7xl px-5 lg:px-8"><p className="font-mono text-[10px] tracking-[.2em] text-cyan">NATURAL PORTFOLIO</p><h2 className="mt-4 max-w-3xl font-display text-4xl font-semibold lg:text-6xl">Sistemas que já nascem ligados à operação.</h2><div className="mt-12 grid gap-px bg-white/10 lg:grid-cols-2">{projects.map(p => <article key={p.name} className="bg-[#080a09] p-6 lg:p-8"><div className="flex items-center justify-between gap-4"><div><p className="font-mono text-[9px] tracking-[.17em] text-white/28">{p.label}</p><h3 className="mt-2 font-display text-2xl font-semibold">{p.name}</h3></div><img src="/brand/ginkgo-tree-blue.png" alt="" className="h-11 w-11 object-contain opacity-60"/></div><p className="mt-5 max-w-xl text-sm leading-6 text-white/45">{p.text}</p><div className="mt-6"><Flow items={p.flow} /></div><div className="mt-6 flex flex-wrap gap-1.5">{p.tags.map(tag => <span key={tag} className="border border-white/10 px-2 py-1 font-mono text-[9px] text-white/35">{tag}</span>)}</div></article>)}</div></div></section>

      <section id="infraestrutura" className="py-20 lg:py-28"><div className="mx-auto grid max-w-7xl gap-14 px-5 lg:grid-cols-2 lg:px-8"><div><p className="font-mono text-[10px] tracking-[.2em] text-signal">INFRASTRUCTURE</p><h2 className="mt-4 font-display text-4xl font-semibold lg:text-6xl">Da VPS vazia à operação em produção.</h2><p className="mt-5 max-w-xl leading-7 text-white/48">Podemos assumir a infraestrutura que sustenta n8n, bancos, agentes e serviços auxiliares — incluindo deploy, rede, persistência, backups e suporte.</p><div className="mt-7 grid grid-cols-2 gap-2 text-xs text-white/55">{["VPS Linux","Docker / Compose","Traefik / SSL","PostgreSQL","Redis / filas","n8n","Observabilidade","Backups","Secrets","Hardening"].map(x => <div key={x} className="flex items-center gap-2 border-t border-white/10 py-2"><Check size={12} className="text-cyan"/>{x}</div>)}</div></div><div className="border border-white/10 bg-[#080a09] p-6"><p className="font-mono text-[9px] tracking-[.18em] text-white/30">REFERENCE TOPOLOGY</p><div className="mt-6 space-y-3 font-mono text-[11px]">{["Internet / DNS","Traefik · Reverse Proxy · SSL","Docker Network","n8n · Agent Service · APIs","PostgreSQL · Redis · Vector DB","Logs · Monitoring · Backups"].map((x,i) => <div key={x} className={`border p-3 ${i===2?"border-signal/40 bg-signal/[0.05]":"border-white/10"}`}><span className="mr-3 text-signal/60">0{i+1}</span>{x}</div>)}</div></div></div></section>

      <section className="border-y border-white/[0.07] bg-white/[0.015] py-20"><div className="mx-auto max-w-7xl px-5 lg:px-8"><div className="grid gap-10 lg:grid-cols-3"><div className="lg:col-span-1"><p className="font-mono text-[10px] tracking-[.2em] text-cyan">OPERATE & SUPPORT</p><h2 className="mt-4 font-display text-4xl font-semibold">Implementamos. Hospedamos. Mantemos.</h2></div><div className="border border-white/10 p-6"><p className="font-mono text-[9px] text-white/30">PROJECT SETUP</p><p className="mt-3 font-display text-2xl text-signal">{siteConfig.setupPrice}</p><p className="mt-4 text-sm leading-6 text-white/45">Arquitetura, desenvolvimento, integrações, testes, documentação, deploy e onboarding conforme escopo.</p></div><div className="border border-signal/25 bg-signal/[0.025] p-6"><p className="font-mono text-[9px] text-white/30">MONTHLY OPERATION</p><p className="mt-3 font-display text-2xl text-signal">{siteConfig.monthlyMaintenancePrice}</p><p className="mt-4 text-sm leading-6 text-white/45">Hospedagem, manutenção, monitoramento, backups e suporte técnico.</p><p className="mt-4 border-t border-white/10 pt-4 font-mono text-[9px] leading-5 text-white/30">USO / {siteConfig.includedUsageLimits}. APIs e serviços de terceiros podem ser cobrados separadamente conforme consumo e escopo.</p></div></div><div className="mt-10 flex items-start gap-4 border-t border-white/10 pt-8"><ShieldCheck className="mt-0.5 text-cyan"/><div><strong className="font-display text-lg">Você não fica sozinho depois do deploy.</strong><p className="mt-2 max-w-3xl text-sm leading-6 text-white/45">Automação em produção é software vivo. A Ginkgo acompanha a operação, corrige falhas, mantém infraestrutura e evolui o sistema de acordo com o plano contratado.</p></div></div></div></section>

      <section id="configurador" className="py-20 lg:py-28"><div className="mx-auto max-w-5xl px-5 lg:px-8"><div className="border border-white/10 bg-[#080a09] p-6 lg:p-10"><p className="font-mono text-[10px] tracking-[.2em] text-signal">AUTOMATION CONFIGURATOR</p><h2 className="mt-4 font-display text-3xl font-semibold lg:text-5xl">O que você gostaria de automatizar?</h2><div className="mt-8 grid gap-7 lg:grid-cols-2"><div><p className="mb-2 text-xs text-white/50">Área</p><div className="flex flex-wrap gap-2">{["Atendimento","WhatsApp","Vendas","Leads","CRM","E-mail","Documentos","Financeiro","Operações","Desenvolvimento"].map(x => <button key={x} onClick={()=>setConfigType(x)} className={`border px-3 py-2 text-xs ${configType===x?"border-signal text-signal bg-signal/10":"border-white/10 text-white/45"}`}>{x}</button>)}</div></div><div><p className="mb-2 text-xs text-white/50">Sistema principal</p><div className="flex flex-wrap gap-2">{["CRM","ERP","WhatsApp","Gmail","Outlook","Notion","Google Workspace","Sistema próprio","Ainda não sei"].map(x => <button key={x} onClick={()=>setConfigSystem(x)} className={`border px-3 py-2 text-xs ${configSystem===x?"border-cyan text-cyan bg-cyan/10":"border-white/10 text-white/45"}`}>{x}</button>)}</div></div></div><label htmlFor="config-goal" className="mt-7 block text-xs text-white/50">O que deveria acontecer automaticamente?</label><textarea id="config-goal" value={configGoal} onChange={e=>setConfigGoal(e.target.value)} rows={4} className="mt-2 w-full resize-none border border-white/10 bg-black/20 p-4 text-sm text-white placeholder:text-white/20 focus:border-signal/50" placeholder="Descreva o processo em linguagem simples. Ex.: quando um lead entrar pelo WhatsApp, quero consultar o CRM, qualificar e agendar uma reunião."/><button onClick={submitConfigurator} className="mt-5 flex items-center gap-2 bg-signal px-5 py-3 text-sm font-semibold text-[#171307] hover:brightness-110">Enviar para Ginkgo <ArrowRight size={16}/></button></div></div></section>

      <section id="reuniao" className="pb-24 lg:pb-32"><div className="mx-auto max-w-5xl px-5 lg:px-8"><div className="relative overflow-hidden border border-signal/40 bg-[#0b0e0c] p-7 lg:p-12"><div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-signal to-transparent"/><div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center"><div><div className="flex items-center gap-2 font-mono text-[10px] tracking-[.2em] text-signal"><CreditCard size={14}/> PROJECT SESSION</div><h2 className="mt-4 font-display text-4xl font-semibold lg:text-6xl">Já sabe o que quer construir?</h2><p className="mt-5 max-w-2xl leading-7 text-white/48">Vá direto para uma reunião técnica focada em arquitetura, viabilidade, escopo e próximos passos. O valor simbólico poderá ser abatido do projeto contratado.</p><div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-xs text-white/50">{["1:1","análise inicial","arquitetura","viabilidade","próximos passos"].map(x=><span key={x} className="flex items-center gap-1.5"><Check size={12} className="text-cyan"/>{x}</span>)}</div></div><div className="min-w-[240px] border border-white/10 bg-black/20 p-6"><p className="font-mono text-[9px] text-white/30">RESERVA</p><p className="mt-2 font-display text-2xl text-signal">{siteConfig.projectMeetingPrice}</p>{siteConfig.stripeProjectMeetingUrl ? <a href={siteConfig.stripeProjectMeetingUrl} target="_blank" rel="noreferrer" className="mt-5 flex items-center justify-center gap-2 bg-signal px-4 py-3 text-sm font-semibold text-[#171307]">Reservar via Stripe <ArrowRight size={15}/></a> : <div className="mt-5 border border-white/10 px-4 py-3 text-center text-xs text-white/35">Link Stripe aguardando configuração</div>}<p className="mt-3 text-[10px] leading-4 text-white/25">Pagamento seguro via Stripe quando configurado.</p></div></div></div></div></section>

      <section className="border-y border-white/[0.07] py-12"><div className="mx-auto max-w-7xl px-5 lg:px-8"><p className="mb-6 text-center font-mono text-[9px] tracking-[.18em] text-white/25">TECHNOLOGIES WE WORK WITH · NO PARTNERSHIP IMPLIED</p><div className="flex flex-wrap justify-center gap-x-7 gap-y-3">{technologies.map(x=><span key={x} className="font-mono text-[10px] text-white/35">{x}</span>)}</div></div></section>

      <section id="contato" className="py-20 lg:py-28"><div className="mx-auto max-w-7xl px-5 text-center lg:px-8"><p className="font-mono text-[10px] tracking-[.2em] text-signal">GINKGO AI SYSTEMS</p><h2 className="mx-auto mt-4 max-w-4xl font-display text-4xl font-semibold lg:text-6xl">Você conhece o processo.<br/><span className="text-signal">Nós construímos o sistema.</span></h2><p className="mx-auto mt-6 max-w-2xl leading-7 text-white/45">Mapeamos o que vale automatizar, o que deve continuar humano e como colocar agentes, integrações, Skills e infraestrutura em produção.</p><div className="mt-8 flex flex-wrap justify-center gap-3"><a href="#configurador" className="bg-signal px-5 py-3 text-sm font-semibold text-[#171307]">Mapear meu processo</a>{siteConfig.whatsappNumber && <a href={`https://wa.me/${siteConfig.whatsappNumber.replace(/\D/g,"")}`} target="_blank" rel="noreferrer" className="flex items-center gap-2 border border-white/15 px-5 py-3 text-sm"><MessageCircle size={16}/>WhatsApp</a>}{siteConfig.contactEmail && <a href={`mailto:${siteConfig.contactEmail}`} className="flex items-center gap-2 border border-white/15 px-5 py-3 text-sm"><Mail size={16}/>E-mail</a>}<a href="#reuniao" className="border border-signal/50 px-5 py-3 text-sm text-signal">Reunião de projeto</a></div></div></section>

      <footer className="border-t border-white/[0.07] py-10"><div className="mx-auto flex max-w-7xl flex-col gap-8 px-5 lg:flex-row lg:items-end lg:justify-between lg:px-8"><div><Logo/><p className="mt-4 text-xs text-white/30">{siteConfig.tagline}</p></div><div className="flex flex-wrap items-center gap-5">{siteConfig.github && <a href={siteConfig.github} target="_blank" rel="noreferrer" aria-label="GitHub"><Github size={17} className="text-white/40 hover:text-white"/></a>}{siteConfig.linkedin && <a href={siteConfig.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin size={17} className="text-white/40 hover:text-white"/></a>}{siteConfig.instagram && <a href={siteConfig.instagram} target="_blank" rel="noreferrer" aria-label="Instagram"><Instagram size={17} className="text-white/40 hover:text-white"/></a>}<span className="font-mono text-[9px] text-white/20">© {new Date().getFullYear()} GINKGO AI SYSTEMS</span></div></div></footer>

      <WhatsAppAssistant />
    </main>
  );
}
