import Link from "next/link";

const features = [
  {
    icon: "hub",
    title: "Swarm Governance",
    desc: "Deploy multi-agent swarms that work together through shared organizational context."
  },
  {
    icon: "assignment",
    title: "Task Management",
    desc: "Create, assign, track and review long-running AI tasks with clean operational control."
  },
  {
    icon: "verified_user",
    title: "Human Approvals",
    desc: "Approval gates keep sensitive AI outputs under human control before final use."
  }
];

const steps = [
  {
    title: "Configure Agents",
    desc: "Create AI workers with roles, prompts, budgets, skills and memory."
  },
  {
    title: "Execute Missions",
    desc: "Assign work to agents or swarms and track every run from one dashboard."
  },
  {
    title: "Analyze & Optimize",
    desc: "Monitor usage, costs, approvals, datasets and operational performance."
  }
];

const faqs = [
  {
    q: "Is data shared across swarms?",
    a: "By default, each swarm works inside its own workspace. Shared memory and data access can be controlled by the user."
  },
  {
    q: "How do approvals work?",
    a: "Tasks that require approval pause after output generation. A human reviews the result before it is accepted."
  },
  {
    q: "How does Hoolder control AI cost?",
    a: "Hoolder uses plan limits, usage tracking, blocked runs and BYOK support so AI usage does not become unlimited."
  }
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#fbf9fa] text-[#1b1b1d]">
      <header className="sticky top-0 z-50 flex items-center justify-between border-b border-[#e4e2e3] bg-white/90 px-6 py-4 backdrop-blur-md md:px-10">
        <div className="flex items-center gap-8">
          <Link href="/" className="text-2xl font-bold tracking-tight text-[#0a1422]">
            Hoolder
          </Link>

          <nav className="hidden gap-6 md:flex">
            <a href="#features" className="text-xs font-semibold uppercase tracking-wider text-[#44474c] hover:text-[#0a1422]">
              Features
            </a>
            <a href="#marketplace" className="text-xs font-semibold uppercase tracking-wider text-[#44474c] hover:text-[#0a1422]">
              Marketplace
            </a>
            <a href="#pricing" className="text-xs font-semibold uppercase tracking-wider text-[#44474c] hover:text-[#0a1422]">
              Pricing
            </a>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="rounded-lg px-5 py-2 text-xs font-semibold uppercase tracking-wider text-[#1b1b1d] hover:bg-[#f0edee]"
          >
            Sign In
          </Link>

          <Link
            href="/signup"
            className="rounded-lg bg-[#0a1422] px-5 py-2 text-xs font-semibold uppercase tracking-wider text-white transition active:scale-95"
          >
            Start Free
          </Link>
        </div>
      </header>

      <main className="w-full">
        <section className="mx-auto max-w-5xl px-6 pb-24 pt-28 text-center md:px-10 md:pt-32">
          <span className="mb-6 block text-xs font-semibold uppercase tracking-[0.2em] text-[#1b6b4f]">
            The Sovereign AI OS
          </span>

          <h1 className="mb-8 text-5xl font-semibold leading-[1.05] tracking-[-0.04em] text-[#0a1422] md:text-7xl">
            Run your AI company from one operating system.
          </h1>

          <p className="mx-auto mb-12 max-w-2xl text-lg leading-relaxed text-[#44474c] md:text-xl">
            Hoolder orchestrates agents, swarms, recurring tasks, approvals,
            datasets, billing and usage protection in one premium workspace.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 md:flex-row">
            <Link
              href="/signup"
              className="rounded-xl bg-[#0a1422] px-8 py-4 text-sm font-semibold uppercase tracking-wider text-white shadow-sm transition active:scale-95"
            >
              Start Free
            </Link>

            <Link
              href="/pricing"
              className="rounded-xl border border-[#c5c6cc] bg-[#f6f3f4] px-8 py-4 text-sm font-semibold uppercase tracking-wider text-[#0a1422] transition active:scale-95"
            >
              View Pricing
            </Link>
          </div>
        </section>

        <section className="px-6 pb-32 md:px-10">
          <div className="mx-auto max-w-7xl overflow-hidden rounded-[28px] border border-[#c5c6cc] bg-[#f6f3f4] p-6 md:p-8">
            <div className="grid grid-cols-12 gap-6">
              <div className="hidden rounded-xl border border-[#c5c6cc] bg-white p-4 lg:col-span-3 lg:block">
                <div className="mb-3 flex items-center gap-2 rounded-lg bg-[#f6f3f4] px-3 py-3">
                  <span className="material-symbols-outlined text-[#0a1422]">dashboard</span>
                  <span className="text-xs font-semibold uppercase tracking-wider">Dashboard</span>
                </div>

                <div className="mb-3 flex items-center gap-2 px-3 py-3 text-[#44474c]">
                  <span className="material-symbols-outlined">smart_toy</span>
                  <span className="text-xs font-semibold uppercase tracking-wider">Agents</span>
                </div>

                <div className="flex items-center gap-2 px-3 py-3 text-[#44474c]">
                  <span className="material-symbols-outlined">hub</span>
                  <span className="text-xs font-semibold uppercase tracking-wider">Swarms</span>
                </div>
              </div>

              <div className="col-span-12 space-y-6 lg:col-span-9">
                <div className="mb-4 flex items-end justify-between">
                  <div>
                    <h3 className="text-2xl font-semibold tracking-tight text-[#0a1422]">
                      Active Operations
                    </h3>
                    <p className="text-sm leading-relaxed text-[#44474c]">
                      4 autonomous swarms currently executing 12 tasks.
                    </p>
                  </div>

                  <span className="rounded-full bg-[#a6f2cf] px-3 py-1 text-[10px] font-bold uppercase tracking-tight text-[#247155]">
                    Healthy
                  </span>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="rounded-xl border border-[#c5c6cc] bg-white p-6">
                    <div className="mb-4 flex justify-between">
                      <span className="text-xs font-semibold uppercase tracking-wider text-[#1b6b4f]">
                        Agents
                      </span>
                      <span className="material-symbols-outlined text-[#44474c]">more_horiz</span>
                    </div>

                    <div className="space-y-3">
                      {["Logistics_AI_04", "Finance_Analyst"].map((agent, index) => (
                        <div
                          key={agent}
                          className="flex items-center justify-between rounded p-2 transition hover:bg-[#f6f3f4]"
                        >
                          <div className="flex items-center gap-2">
                            <div className="h-2 w-2 rounded-full bg-[#1b6b4f]" />
                            <span className="text-sm">{agent}</span>
                          </div>
                          <span className="text-[10px] uppercase tracking-wider text-[#44474c]">
                            {index === 0 ? "Active" : "Busy"}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-xl border border-[#c5c6cc] bg-white p-6">
                    <div className="mb-4 flex justify-between">
                      <span className="text-xs font-semibold uppercase tracking-wider text-[#0a1422]">
                        Approvals
                      </span>
                      <span className="material-symbols-outlined text-[#44474c]">verified_user</span>
                    </div>

                    <div className="flex h-24 items-center justify-center rounded-lg border-2 border-dashed border-[#c5c6cc]">
                      <span className="text-sm italic text-[#44474c]">
                        All tasks cleared
                      </span>
                    </div>
                  </div>
                </div>

                <div className="rounded-xl border border-[#c5c6cc] bg-white p-6">
                  <h4 className="mb-4 text-xs font-semibold uppercase tracking-wider">
                    Usage Analytics
                  </h4>

                  <div className="relative flex h-32 items-end gap-2 overflow-hidden rounded-lg bg-[#f6f3f4] px-4 pb-2">
                    {[35, 65, 50, 80, 72, 100].map((height, index) => (
                      <div
                        key={index}
                        className="w-full rounded-t-sm bg-[#1f2937]"
                        style={{ height: `${height}%` }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="bg-white px-6 py-32 md:px-10">
          <div className="mx-auto max-w-7xl">
            <div className="mb-20 text-center">
              <h2 className="mb-4 text-4xl font-semibold tracking-[-0.03em] text-[#0a1422] md:text-6xl">
                Infrastructure for intelligence.
              </h2>

              <p className="mx-auto max-w-xl text-[#44474c]">
                Native components that handle the complexity of distributed AI operations.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
              {features.map((feature) => (
                <div key={feature.title} className="space-y-4">
                  <span className="material-symbols-outlined text-4xl text-[#1b6b4f]">
                    {feature.icon}
                  </span>
                  <h4 className="text-2xl font-semibold tracking-tight text-[#0a1422]">
                    {feature.title}
                  </h4>
                  <p className="text-sm leading-relaxed text-[#44474c]">
                    {feature.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white px-6 py-32 md:px-10">
          <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-20 lg:grid-cols-2">
            <div className="overflow-hidden rounded-[28px] bg-[#f0edee] p-8 shadow-sm">
              <div className="rounded-2xl border border-[#c5c6cc] bg-white p-6">
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-[#1b6b4f]">
                      Mission Control
                    </p>
                    <h3 className="mt-2 text-2xl font-semibold text-[#0a1422]">
                      Weekly content swarm
                    </h3>
                  </div>
                  <span className="rounded-full bg-[#a6f2cf] px-3 py-1 text-xs font-semibold text-[#247155]">
                    Running
                  </span>
                </div>

                <div className="space-y-3">
                  {["Research market", "Write campaign", "Review output"].map((item) => (
                    <div
                      key={item}
                      className="flex items-center justify-between rounded-xl border border-[#e4e2e3] bg-[#fbf9fa] p-4"
                    >
                      <span className="text-sm font-medium text-[#0a1422]">{item}</span>
                      <span className="text-xs text-[#44474c]">Assigned</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <h2 className="mb-8 text-4xl font-semibold leading-tight tracking-[-0.03em] text-[#0a1422] md:text-6xl">
                Orchestration in three layers.
              </h2>

              <div className="space-y-12">
                {steps.map((step, index) => (
                  <div key={step.title} className="flex gap-6">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#0a1422] font-bold text-white">
                      {index + 1}
                    </span>

                    <div>
                      <h5 className="mb-2 text-2xl font-semibold text-[#0a1422]">
                        {step.title}
                      </h5>
                      <p className="leading-relaxed text-[#44474c]">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="marketplace" className="px-6 py-32 md:px-10">
          <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[28px] bg-[#0a1422] p-10 text-white md:p-12">
            <div className="relative z-10 max-w-2xl">
              <span className="mb-4 block text-xs font-semibold uppercase tracking-wider text-[#8690a1]">
                Marketplace
              </span>

              <h2 className="mb-6 text-4xl font-semibold tracking-[-0.03em] md:text-6xl">
                Fuel your agents with premium data.
              </h2>

              <p className="mb-12 text-lg leading-relaxed text-[#bdc7d9]">
                Browse datasets built for research, agents, automation and AI workflows.
                Sellers list for free. Hoolder earns only when datasets sell.
              </p>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {["Global Finance v4", "Retail Behavior"].map((dataset) => (
                  <div
                    key={dataset}
                    className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/10 p-4"
                  >
                    <span className="material-symbols-outlined text-[#a6f2cf]">storage</span>
                    <div>
                      <div className="font-bold">{dataset}</div>
                      <div className="text-xs text-[#bdc7d9]">
                        Marketplace dataset
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <Link
                href="/datasets"
                className="mt-12 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider transition hover:translate-x-1"
              >
                Explore Marketplace
                <span className="material-symbols-outlined">arrow_forward</span>
              </Link>
            </div>
          </div>
        </section>

        <section id="pricing" className="bg-white px-6 py-32 md:px-10">
          <div className="mx-auto mb-20 max-w-7xl text-center">
            <h2 className="mb-4 text-4xl font-semibold tracking-[-0.03em] text-[#0a1422] md:text-6xl">
              Scalable operating costs.
            </h2>
            <p className="text-[#44474c]">
              Billing that grows with your AI operations.
            </p>
          </div>

          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2">
            <div className="flex flex-col justify-between rounded-[28px] border border-[#c5c6cc] bg-white p-10">
              <div>
                <h4 className="mb-6 text-xs font-semibold uppercase tracking-wider text-[#44474c]">
                  Starter
                </h4>

                <div className="mb-8">
                  <span className="text-5xl font-bold text-[#0a1422]">₹999</span>
                  <span className="text-[#44474c]">/mo</span>
                </div>

                <ul className="mb-10 space-y-4">
                  {["10 agents", "5 swarms", "300 tasks/month"].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-sm">
                      <span className="material-symbols-outlined text-sm text-[#1b6b4f]">
                        check_circle
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <Link
                href="/billing"
                className="w-full rounded-xl bg-[#f0edee] py-4 text-center text-xs font-semibold uppercase tracking-wider text-[#0a1422] transition hover:bg-[#e4e2e3]"
              >
                Start for Free
              </Link>
            </div>

            <div className="relative flex flex-col justify-between overflow-hidden rounded-[28px] border-2 border-[#0a1422] bg-white p-10">
              <div className="absolute right-4 top-4 rounded-full bg-[#a6f2cf] px-3 py-1 text-[10px] font-bold text-[#247155]">
                POPULAR
              </div>

              <div>
                <h4 className="mb-6 text-xs font-semibold uppercase tracking-wider text-[#44474c]">
                  Pro
                </h4>

                <div className="mb-8">
                  <span className="text-5xl font-bold text-[#0a1422]">₹9,999</span>
                  <span className="text-[#44474c]">/mo</span>
                </div>

                <ul className="mb-10 space-y-4">
                  {["100 agents", "100 swarms", "BYOK support", "5% dataset fee"].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-sm">
                      <span className="material-symbols-outlined text-sm text-[#1b6b4f]">
                        check_circle
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <Link
                href="/billing"
                className="w-full rounded-xl bg-[#0a1422] py-4 text-center text-xs font-semibold uppercase tracking-wider text-white transition active:scale-95"
              >
                Upgrade Pro
              </Link>
            </div>
          </div>
        </section>

        <section className="border-t border-[#e4e2e3] px-6 py-32 md:px-10">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-12 text-center text-4xl font-semibold tracking-[-0.03em] text-[#0a1422] md:text-6xl">
              Frequently Asked
            </h2>

            <div className="space-y-6">
              {faqs.map((faq) => (
                <details key={faq.q} className="group border-b border-[#c5c6cc] pb-6">
                  <summary className="flex cursor-pointer list-none items-center justify-between text-2xl font-semibold text-[#0a1422]">
                    {faq.q}
                    <span className="material-symbols-outlined transition-transform group-open:rotate-180">
                      expand_more
                    </span>
                  </summary>

                  <p className="mt-4 leading-relaxed text-[#44474c]">
                    {faq.a}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-[#c5c6cc] bg-[#f6f3f4] px-6 py-20 md:px-10">
        <div className="mx-auto mb-16 grid max-w-7xl grid-cols-1 gap-12 md:grid-cols-4">
          <div>
            <span className="mb-6 block text-2xl font-bold text-[#0a1422]">
              Hoolder
            </span>
            <p className="text-sm leading-relaxed text-[#44474c]">
              The operating system for the AI-first economy.
            </p>
          </div>

          <div>
            <h6 className="mb-6 text-xs font-semibold uppercase tracking-wider text-[#0a1422]">
              Product
            </h6>
            <ul className="space-y-4 text-sm text-[#44474c]">
              <li><Link href="/agents">Agents</Link></li>
              <li><Link href="/swarms">Swarms</Link></li>
              <li><Link href="/datasets">Marketplace</Link></li>
              <li><Link href="/usage">Usage</Link></li>
            </ul>
          </div>

          <div>
            <h6 className="mb-6 text-xs font-semibold uppercase tracking-wider text-[#0a1422]">
              Platform
            </h6>
            <ul className="space-y-4 text-sm text-[#44474c]">
              <li><Link href="/pricing">Pricing</Link></li>
              <li><Link href="/billing">Billing</Link></li>
              <li><Link href="/team">Team</Link></li>
              <li><Link href="/settings">Settings</Link></li>
            </ul>
          </div>

          <div>
            <h6 className="mb-6 text-xs font-semibold uppercase tracking-wider text-[#0a1422]">
              Legal
            </h6>
            <ul className="space-y-4 text-sm text-[#44474c]">
              <li><Link href="/privacy">Privacy</Link></li>
              <li><Link href="/terms">Terms</Link></li>
              <li><Link href="/refund">Refund</Link></li>
              <li><Link href="/ai-policy">AI Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 border-t border-[#c5c6cc] pt-8 text-xs font-semibold uppercase tracking-wider text-[#44474c] md:flex-row">
          <span>© 2026 Hoolder. All rights reserved.</span>

          <div className="flex gap-8">
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/terms">Terms of Service</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
