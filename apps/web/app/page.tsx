import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#fbf9fa] text-[#1b1b1d]">
      {/* Top Navigation */}
      <header className="sticky top-0 z-50 flex h-16 w-full items-center justify-between border-b border-[#c5c6cc] bg-[#fbf9fa]/90 px-6 backdrop-blur-md md:px-12 xl:px-20">
        <div className="flex items-center gap-8">
          <Link
            href="/"
            className="text-2xl font-semibold tracking-tight text-[#0a1422]"
          >
            Hoolder
          </Link>

          <nav className="hidden items-center gap-6 md:flex">
            <a
              href="#features"
              className="border-b-2 border-[#0a1422] pb-1 text-xs font-semibold uppercase tracking-wider text-[#0a1422]"
            >
              Features
            </a>

            <a
              href="#analytics"
              className="text-xs font-semibold uppercase tracking-wider text-[#44474c] transition hover:text-[#0a1422]"
            >
              Analytics
            </a>

            <a
              href="#pricing"
              className="text-xs font-semibold uppercase tracking-wider text-[#44474c] transition hover:text-[#0a1422]"
            >
              Pricing
            </a>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/docs"
            className="rounded-lg bg-[#f6f3f4] px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#0a1422] transition hover:bg-[#e4e2e3]"
          >
            Docs
          </Link>

          <Link
            href="/signup"
            className="rounded-lg bg-[#0a1422] px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white transition active:scale-95"
          >
            Start Free
          </Link>

          <div className="ml-3 hidden items-center gap-3 md:flex">
            <span className="material-symbols-outlined cursor-pointer text-[#44474c]">
              notifications
            </span>

            <span className="material-symbols-outlined cursor-pointer text-[#44474c]">
              help
            </span>
          </div>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section className="mx-auto flex max-w-5xl flex-col items-center px-6 py-32 text-center md:px-12">
          <span className="mb-6 text-xs font-semibold uppercase tracking-[0.25em] text-[#1b6b4f]">
            ENTERPRISE AI OPERATING SYSTEM
          </span>

          <h1 className="mb-8 max-w-4xl text-5xl font-semibold leading-[1.05] tracking-[-0.04em] text-[#0a1422] md:text-7xl">
            Run your AI company from one operating system.
          </h1>

          <p className="mb-12 max-w-2xl text-lg leading-relaxed text-[#44474c] md:text-xl">
            Hoolder orchestrates agents, swarms, and human approvals in a
            unified infrastructure designed for enterprise AI operations.
          </p>

          <div className="flex flex-col gap-4 sm:flex-row">
            <Link
              href="/signup"
              className="rounded-full bg-[#0a1422] px-8 py-4 text-sm font-semibold text-white transition active:scale-95"
            >
              Start Free
            </Link>

            <Link
              href="/pricing"
              className="rounded-full bg-[#f0edee] px-8 py-4 text-sm font-semibold text-[#0a1422] transition hover:bg-[#e4e2e3]"
            >
              View Pricing
            </Link>
          </div>
        </section>

        {/* Product Preview */}
        <section className="px-6 pb-32 md:px-12 xl:px-20">
          <div className="mx-auto max-w-7xl overflow-hidden rounded-[28px] border border-[#c5c6cc] bg-[#f6f3f4] p-8 md:p-12">
            <div className="grid grid-cols-12 gap-6">
              {/* Sidebar Mock */}
              <div className="hidden rounded-2xl border border-[#c5c6cc] bg-white p-6 lg:col-span-3 lg:block">
                <div className="mb-8 flex items-center gap-3">
                  <div className="h-8 w-8 rounded bg-[#0a1422]" />
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#0a1422]">
                    Workspace
                  </span>
                </div>

                <div className="space-y-4">
                  <div className="h-3 w-3/4 rounded bg-[#e4e2e3]" />
                  <div className="h-3 w-1/2 rounded bg-[#e4e2e3]" />
                  <div className="h-3 w-2/3 rounded bg-[#e4e2e3]" />

                  <div className="pt-4">
                    <div className="h-8 w-full rounded-lg bg-[#a6f2cf]" />
                  </div>
                </div>
              </div>

              {/* Main Preview */}
              <div className="col-span-12 space-y-6 lg:col-span-9">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  {/* Agents */}
                  <div className="rounded-2xl border border-[#c5c6cc] bg-white p-6">
                    <div className="mb-4 flex items-start justify-between">
                      <span className="text-xs font-semibold uppercase tracking-wider text-[#44474c]">
                        ACTIVE AGENTS
                      </span>

                      <span className="material-symbols-outlined text-[#1b6b4f]">
                        memory
                      </span>
                    </div>

                    <div className="text-4xl font-bold text-[#0a1422]">
                      128
                    </div>

                    <div className="mt-2 text-xs text-[#1b6b4f]">
                      ↑ 12% vs last week
                    </div>
                  </div>

                  {/* Approvals */}
                  <div className="rounded-2xl border border-[#c5c6cc] bg-white p-6">
                    <div className="mb-4 flex items-start justify-between">
                      <span className="text-xs font-semibold uppercase tracking-wider text-[#44474c]">
                        APPROVAL QUEUE
                      </span>

                      <span className="material-symbols-outlined text-[#ba1a1a]">
                        priority_high
                      </span>
                    </div>

                    <div className="text-4xl font-bold text-[#0a1422]">
                      14
                    </div>

                    <div className="mt-2 text-xs text-[#44474c]">
                      3 urgent actions needed
                    </div>
                  </div>
                </div>

                {/* Swarm */}
                <div className="relative h-64 overflow-hidden rounded-2xl border border-[#c5c6cc] bg-white p-8">
                  <div className="absolute inset-0 flex items-center justify-center opacity-10">
                    <span className="material-symbols-outlined text-[200px]">
                      hub
                    </span>
                  </div>

                  <div className="relative z-10">
                    <h3 className="mb-2 text-2xl font-semibold text-[#0a1422]">
                      Swarm Topology
                    </h3>

                    <p className="text-sm text-[#44474c]">
                      Visualizing orchestration paths across multiple agent
                      clusters.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section
          id="features"
          className="border-y border-[#c5c6cc] bg-white px-6 py-32 md:px-12 xl:px-20"
        >
          <div className="mx-auto max-w-7xl">
            <div className="grid grid-cols-1 gap-16 md:grid-cols-3">
              {/* Feature 1 */}
              <div className="space-y-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#a6f2cf]">
                  <span className="material-symbols-outlined text-[#1b6b4f]">
                    admin_panel_settings
                  </span>
                </div>

                <h3 className="text-2xl font-semibold text-[#0a1422]">
                  Swarm Governance
                </h3>

                <p className="leading-relaxed text-[#44474c]">
                  Control multi-agent systems with permissions, orchestration,
                  and structured collaboration layers.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="space-y-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#1f2937]">
                  <span className="material-symbols-outlined text-white">
                    assignment_turned_in
                  </span>
                </div>

                <h3 className="text-2xl font-semibold text-[#0a1422]">
                  Task Management
                </h3>

                <p className="leading-relaxed text-[#44474c]">
                  Assign tasks, manage workflows, track approvals and automate
                  recurring operations.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="space-y-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#e4e2e3]">
                  <span className="material-symbols-outlined text-[#0a1422]">
                    person_check
                  </span>
                </div>

                <h3 className="text-2xl font-semibold text-[#0a1422]">
                  Human Oversight
                </h3>

                <p className="leading-relaxed text-[#44474c]">
                  Keep sensitive AI workflows under human approval and enterprise
                  review control.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="px-6 py-32 md:px-12 xl:px-20">
          <div className="mx-auto max-w-7xl">
            <div className="mb-20 text-center">
              <h2 className="text-4xl font-semibold tracking-[-0.03em] text-[#0a1422] md:text-6xl">
                Orchestration in three steps.
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {[
                {
                  number: "1",
                  title: "Configure Agents",
                  desc: "Define AI workers with skills, memory, prompts and enterprise data access."
                },
                {
                  number: "2",
                  title: "Execute Missions",
                  desc: "Launch swarms and recurring workflows across business operations."
                },
                {
                  number: "3",
                  title: "Analyze & Optimize",
                  desc: "Track usage, costs, approvals and orchestration performance."
                }
              ].map((step) => (
                <div
                  key={step.number}
                  className="relative rounded-3xl bg-[#f0edee] p-8"
                >
                  <span className="absolute right-6 top-4 text-6xl font-bold text-[#c5c6cc] opacity-40">
                    {step.number}
                  </span>

                  <h4 className="mb-4 text-xl font-bold text-[#0a1422]">
                    {step.title}
                  </h4>

                  <p className="text-sm leading-relaxed text-[#44474c]">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Marketplace */}
        <section className="bg-[#0a1422] px-6 py-32 text-white md:px-12 xl:px-20">
          <div className="mx-auto flex max-w-7xl flex-col gap-16 md:flex-row md:items-center">
            <div className="w-full md:w-1/2">
              <h2 className="mb-6 text-5xl font-semibold leading-tight tracking-[-0.03em]">
                Fuel your agents with premium data.
              </h2>

              <p className="mb-10 max-w-lg text-lg leading-relaxed text-[#bdc7d9]">
                The Hoolder Dataset Marketplace provides curated enterprise-grade
                datasets and AI-ready data feeds.
              </p>

              <Link
                href="/datasets"
                className="inline-flex rounded-full bg-white px-8 py-4 font-semibold text-[#0a1422] transition hover:bg-[#a6f2cf]"
              >
                Browse Marketplace
              </Link>
            </div>

            <div className="grid w-full grid-cols-2 gap-4 md:w-1/2">
              {[
                "FinData Pro",
                "LexisAI Core",
                "BioHelix",
                "LogiStream"
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-3xl border border-white/10 bg-[#1f2937] p-6"
                >
                  <span className="material-symbols-outlined mb-4 text-[#8bd6b4]">
                    database
                  </span>

                  <div className="font-bold">{item}</div>

                  <div className="text-sm text-[#bdc7d9]">
                    Marketplace dataset
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section
          id="pricing"
          className="px-6 py-32 md:px-12 xl:px-20"
        >
          <div className="mx-auto max-w-7xl">
            <div className="mb-16 text-center">
              <h2 className="text-4xl font-semibold tracking-[-0.03em] text-[#0a1422] md:text-6xl">
                Scalable architecture for every stage.
              </h2>
            </div>

            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2">
              {/* Startup */}
              <div className="rounded-[32px] border border-[#c5c6cc] bg-white p-12 transition hover:border-[#0a1422]">
                <div className="mb-4 text-xs font-semibold uppercase tracking-wider text-[#44474c]">
                  STARTUP
                </div>

                <div className="mb-6 text-5xl font-bold text-[#0a1422]">
                  ₹999
                  <span className="text-lg font-normal text-[#44474c]">
                    /mo
                  </span>
                </div>

                <ul className="mb-10 space-y-4">
                  {[
                    "10 Active Swarms",
                    "Unlimited Human Approvals",
                    "Marketplace Access"
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-3 text-[#44474c]"
                    >
                      <span className="material-symbols-outlined text-sm text-[#1b6b4f]">
                        check_circle
                      </span>

                      {item}
                    </li>
                  ))}
                </ul>

                <Link
                  href="/signup"
                  className="flex w-full items-center justify-center rounded-2xl border-2 border-[#0a1422] py-4 font-semibold text-[#0a1422] transition hover:bg-[#0a1422] hover:text-white"
                >
                  Get Started
                </Link>
              </div>

              {/* Enterprise */}
              <div className="rounded-[32px] border border-[#c5c6cc] bg-[#f0edee] p-12">
                <div className="mb-4 text-xs font-semibold uppercase tracking-wider text-[#1b6b4f]">
                  ENTERPRISE
                </div>

                <div className="mb-6 text-5xl font-bold text-[#0a1422]">
                  Custom
                </div>

                <ul className="mb-10 space-y-4">
                  {[
                    "Dedicated GPU Clusters",
                    "Private Deployment",
                    "24/7 AI Architecture Support"
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-3 text-[#44474c]"
                    >
                      <span className="material-symbols-outlined text-sm text-[#1b6b4f]">
                        check_circle
                      </span>

                      {item}
                    </li>
                  ))}
                </ul>

                <Link
                  href="/contact"
                  className="flex w-full items-center justify-center rounded-2xl bg-[#0a1422] py-4 font-semibold text-white transition hover:opacity-90"
                >
                  Contact Sales
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-[#f6f3f4] px-6 py-32 md:px-12 xl:px-20">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-12 text-center text-4xl font-semibold text-[#0a1422]">
              Frequently Asked Questions
            </h2>

            <div className="space-y-8">
              {[
                {
                  q: "How secure is company data?",
                  a: "All data is encrypted in transit and at rest with enterprise-grade infrastructure."
                },
                {
                  q: "Can I customize agent behavior?",
                  a: "Yes. Agents support prompts, memory, provider selection and structured orchestration."
                },
                {
                  q: "How does billing work?",
                  a: "Users can either use platform-managed AI billing or bring their own provider API keys."
                }
              ].map((faq) => (
                <div
                  key={faq.q}
                  className="border-b border-[#c5c6cc] pb-6"
                >
                  <h4 className="mb-2 text-lg font-bold text-[#0a1422]">
                    {faq.q}
                  </h4>

                  <p className="text-sm leading-relaxed text-[#44474c]">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#c5c6cc] bg-white px-6 py-20 md:px-12 xl:px-20">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <h2 className="mb-4 text-2xl font-bold text-[#0a1422]">
              Hoolder
            </h2>

            <p className="mb-6 max-w-sm leading-relaxed text-[#44474c]">
              Building infrastructure for autonomous enterprise intelligence.
            </p>
          </div>

          <div>
            <h5 className="mb-6 text-xs font-semibold uppercase tracking-wider text-[#0a1422]">
              Product
            </h5>

            <ul className="space-y-4 text-sm text-[#44474c]">
              <li>
                <Link href="/agents">Agents</Link>
              </li>

              <li>
                <Link href="/swarms">Swarms</Link>
              </li>

              <li>
                <Link href="/datasets">Marketplace</Link>
              </li>

              <li>
                <Link href="/usage">Usage</Link>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="mb-6 text-xs font-semibold uppercase tracking-wider text-[#0a1422]">
              Company
            </h5>

            <ul className="space-y-4 text-sm text-[#44474c]">
              <li>
                <Link href="/pricing">Pricing</Link>
              </li>

              <li>
                <Link href="/billing">Billing</Link>
              </li>

              <li>
                <Link href="/team">Team</Link>
              </li>

              <li>
                <Link href="/privacy">Privacy</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mx-auto mt-20 flex max-w-7xl flex-col items-center justify-between gap-4 border-t border-[#c5c6cc] pt-8 text-xs text-[#44474c] md:flex-row">
          <p>© 2026 Hoolder AI Operating System. All rights reserved.</p>

          <p>Designed for enterprise AI operations.</p>
        </div>
      </footer>
    </div>
  );
}
