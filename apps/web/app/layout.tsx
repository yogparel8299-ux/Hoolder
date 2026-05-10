import Link from "next/link";
export const dynamic = "force-static";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#fafafa] text-[#1c1c1e]">
      {/* Sticky Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-[#e5e5ea]">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-10">
            <Link href="/" className="text-xl font-semibold tracking-tight text-[#1c1c1e]">
              Hoolder
            </Link>
            <div className="hidden md:flex items-center gap-8">
              <Link href="#features" className="text-sm text-[#636366] hover:text-[#1c1c1e] transition-colors">
                Features
              </Link>
              <Link href="#marketplace" className="text-sm text-[#636366] hover:text-[#1c1c1e] transition-colors">
                Marketplace
              </Link>
              <Link href="#pricing" className="text-sm text-[#636366] hover:text-[#1c1c1e] transition-colors">
                Pricing
              </Link>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/signin" className="text-sm text-[#636366] hover:text-[#1c1c1e] transition-colors">
              Sign In
            </Link>
            <Link
              href="/signup"
              className="text-sm font-medium bg-[#1c1c1e] text-white px-5 py-2.5 rounded-full hover:bg-[#2c2c2e] transition-colors"
            >
              Start Free
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-24 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-semibold tracking-tight leading-[1.1] text-[#1c1c1e] mb-8">
            Run your AI company<br />from one operating system.
          </h1>
          <p className="text-lg md:text-xl text-[#636366] leading-relaxed max-w-3xl mx-auto mb-12">
            Hoolder helps teams create AI agents, manage swarms, schedule recurring tasks, review outputs, sell datasets, control usage, and manage billing from one premium workspace.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link
              href="/signup"
              className="text-base font-medium bg-[#1c1c1e] text-white px-8 py-3.5 rounded-full hover:bg-[#2c2c2e] transition-colors"
            >
              Start Free
            </Link>
            <Link
              href="/pricing"
              className="text-base font-medium text-[#1c1c1e] bg-[#f2f2f7] px-8 py-3.5 rounded-full hover:bg-[#e5e5ea] transition-colors"
            >
              View Pricing
            </Link>
          </div>
        </div>
      </section>

      {/* Product Preview */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-3xl border border-[#e5e5ea] shadow-sm overflow-hidden">
            {/* Dashboard Header */}
            <div className="flex items-center gap-2 px-5 py-3 border-b border-[#e5e5ea] bg-[#fafafa]">
              <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
              <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
              <div className="w-3 h-3 rounded-full bg-[#28c840]" />
              <span className="ml-4 text-xs text-[#8e8e93] font-medium">Hoolder Dashboard</span>
            </div>
            <div className="flex">
              {/* Sidebar */}
              <div className="w-56 border-r border-[#e5e5ea] p-5 hidden md:block">
                <div className="text-sm font-semibold text-[#1c1c1e] mb-6">Workspace</div>
                <div className="space-y-1">
                  {["Dashboard", "Agents", "Swarms", "Tasks", "Approvals", "Datasets", "Usage", "Billing"].map((item, i) => (
                    <div
                      key={item}
                      className={`text-sm px-3 py-2 rounded-lg cursor-default ${
                        i === 0 ? "bg-[#f2f2f7] text-[#1c1c1e] font-medium" : "text-[#8e8e93]"
                      }`}
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
              {/* Main Content */}
              <div className="flex-1 p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-lg font-semibold text-[#1c1c1e]">Overview</h2>
                    <p className="text-sm text-[#8e8e93]">Your AI company at a glance</p>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-[#e8f5e9] rounded-full">
                    <div className="w-2 h-2 rounded-full bg-[#34c759]" />
                    <span className="text-xs font-medium text-[#2e7d32]">Healthy</span>
                  </div>
                </div>
                {/* Stats Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  {[
                    { label: "Active Agents", value: "12", color: "bg-[#f2f2f7]" },
                    { label: "Swarms", value: "3", color: "bg-[#f2f2f7]" },
                    { label: "Tasks Today", value: "47", color: "bg-[#f2f2f7]" },
                    { label: "Pending Approvals", value: "5", color: "bg-[#fff3e0]" },
                  ].map((stat) => (
                    <div key={stat.label} className={`${stat.color} rounded-2xl p-4`}>
                      <div className="text-2xl font-semibold text-[#1c1c1e]">{stat.value}</div>
                      <div className="text-xs text-[#8e8e93] mt-1">{stat.label}</div>
                    </div>
                  ))}
                </div>
                {/* Two Column Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {/* Approval Queue */}
                  <div className="bg-[#fafafa] rounded-2xl p-4 border border-[#e5e5ea]">
                    <div className="text-sm font-semibold text-[#1c1c1e] mb-3">Approval Queue</div>
                    <div className="space-y-2">
                      {[
                        { title: "Agent: Content Review", status: "Pending" },
                        { title: "Agent: Data Export", status: "Pending" },
                        { title: "Agent: Email Draft", status: "Approved" },
                      ].map((item) => (
                        <div key={item.title} className="flex items-center justify-between bg-white rounded-xl px-3 py-2.5 border border-[#e5e5ea]">
                          <span className="text-sm text-[#1c1c1e]">{item.title}</span>
                          <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                            item.status === "Approved" ? "bg-[#e8f5e9] text-[#2e7d32]" : "bg-[#fff3e0] text-[#ef6c00]"
                          }`}>
                            {item.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                  {/* Usage Analytics */}
                  <div className="bg-[#fafafa] rounded-2xl p-4 border border-[#e5e5ea]">
                    <div className="text-sm font-semibold text-[#1c1c1e] mb-3">Usage Analytics</div>
                    <div className="flex items-end gap-2 h-24">
                      {[40, 65, 45, 80, 55, 70, 90, 60, 75, 50, 85, 95].map((h, i) => (
                        <div key={i} className="flex-1 bg-[#34c759] rounded-t" style={{ height: `${h}%`, opacity: 0.7 + (i * 0.025) }} />
                      ))}
                    </div>
                    <div className="flex justify-between mt-2">
                      {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map((m) => (
                        <span key={m} className="text-[10px] text-[#8e8e93]">{m}</span>
                      ))}
                    </div>
                  </div>
                </div>
                {/* Swarm Topology */}
                <div className="mt-4 bg-[#fafafa] rounded-2xl p-4 border border-[#e5e5ea]">
                  <div className="text-sm font-semibold text-[#1c1c1e] mb-3">Swarm Topology</div>
                  <div className="flex items-center justify-center gap-6 py-4">
                    <div className="w-14 h-14 rounded-2xl bg-white border border-[#e5e5ea] flex items-center justify-center shadow-sm">
                      <span className="text-xs font-medium text-[#1c1c1e]">Lead</span>
                    </div>
                    <div className="flex gap-3">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="w-12 h-12 rounded-xl bg-white border border-[#e5e5ea] flex items-center justify-center shadow-sm">
                          <span className="text-[10px] text-[#8e8e93]">A{i}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-[#1c1c1e] mb-4">
              Everything you need to run AI at scale.
            </h2>
            <p className="text-lg text-[#636366] max-w-2xl mx-auto">
              A complete toolkit for building, deploying, and managing intelligent systems.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                title: "AI Agents",
                desc: "Create specialized agents with custom instructions, knowledge bases, and tool access. Each agent operates with clear purpose and guardrails.",
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="3" /><path d="M12 2v4" /><path d="M12 18v4" /><path d="M4.93 4.93l2.83 2.83" /><path d="M16.24 16.24l2.83 2.83" /><path d="M2 12h4" /><path d="M18 12h4" /><path d="M4.93 19.07l2.83-2.83" /><path d="M16.24 7.76l2.83-2.83" />
                  </svg>
                ),
              },
              {
                title: "Swarms",
                desc: "Orchestrate multiple agents to collaborate on complex workflows. Define hierarchies, handoffs, and parallel execution patterns.",
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                ),
              },
              {
                title: "Recurring Tasks",
                desc: "Schedule agents to run on intervals, cron expressions, or event triggers. Automate reports, monitoring, and data processing without manual intervention.",
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
                  </svg>
                ),
              },
              {
                title: "Human Approvals",
                desc: "Insert review checkpoints before critical actions. Route outputs to the right people with context, comments, and one-click approvals.",
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
                  </svg>
                ),
              },
              {
                title: "Dataset Marketplace",
                desc: "List, discover, and purchase curated datasets. Every transaction is protected with verified downloads and transparent pricing.",
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" /><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
                  </svg>
                ),
              },
              {
                title: "Usage Protection",
                desc: "Hard limits on every plan prevent runaway costs. Track consumption in real time, set alerts, and bring your own API keys when you need more.",
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                ),
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="bg-white rounded-3xl p-8 border border-[#e5e5ea] hover:border-[#d1d1d6] transition-colors"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#f2f2f7] flex items-center justify-center text-[#1c1c1e] mb-5">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-[#1c1c1e] mb-3">{feature.title}</h3>
                <p className="text-[#636366] leading-relaxed text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-[#1c1c1e] mb-4">
              How it works
            </h2>
            <p className="text-lg text-[#636366]">
              From setup to scale in five simple steps.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {[
              { step: "1", title: "Create company workspace", desc: "Set up your team, invite members, and configure billing." },
              { step: "2", title: "Add agents", desc: "Build AI agents with instructions, tools, and knowledge." },
              { step: "3", title: "Assign tasks", desc: "Schedule one-time or recurring tasks for your agents." },
              { step: "4", title: "Review outputs", desc: "Check agent work, add comments, and approve or reject." },
              { step: "5", title: "Scale with swarms and datasets", desc: "Connect agents into swarms and list datasets for sale." },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-12 h-12 rounded-full bg-[#1c1c1e] text-white flex items-center justify-center text-lg font-semibold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-base font-semibold text-[#1c1c1e] mb-2">{item.title}</h3>
                <p className="text-sm text-[#8e8e93] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dataset Marketplace Preview */}
      <section id="marketplace" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-[#1c1c1e] mb-4">
              Dataset Marketplace
            </h2>
            <p className="text-lg text-[#636366] max-w-2xl mx-auto mb-8">
              Users list datasets for free. Buyers purchase datasets. Hoolder takes a fee only when a dataset sells. Downloads are protected.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                title: "Global Finance Dataset",
                desc: "Comprehensive financial data across 50+ markets with real-time updates and historical trends.",
                records: "2.4M records",
                price: "₹4,999",
              },
              {
                title: "Sales Leads Dataset",
                desc: "Verified B2B leads with contact info, company size, and intent signals for outbound teams.",
                records: "850K records",
                price: "₹2,499",
              },
              {
                title: "Customer Support Dataset",
                desc: "Curated support tickets, resolutions, and sentiment labels for training support agents.",
                records: "1.1M records",
                price: "₹1,999",
              },
            ].map((dataset) => (
              <div
                key={dataset.title}
                className="bg-white rounded-3xl p-7 border border-[#e5e5ea] hover:border-[#d1d1d6] transition-colors"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#f2f2f7] flex items-center justify-center">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#1c1c1e]">
                      <ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" /><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
                    </svg>
                  </div>
                  <span className="text-sm font-semibold text-[#1c1c1e]">{dataset.price}</span>
                </div>
                <h3 className="text-lg font-semibold text-[#1c1c1e] mb-2">{dataset.title}</h3>
                <p className="text-sm text-[#636366] leading-relaxed mb-4">{dataset.desc}</p>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#34c759]" />
                  <span className="text-xs text-[#8e8e93]">{dataset.records}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section id="pricing" className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-[#1c1c1e] mb-4">
              Simple, transparent pricing
            </h2>
            <p className="text-lg text-[#636366]">
              Start free. Upgrade when you are ready.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                name: "Free",
                price: "₹0",
                features: ["3 agents", "1 swarm", "25 tasks/month", "15% dataset fee"],
                badge: null,
              },
              {
                name: "Starter",
                price: "₹999",
                period: "/month",
                features: ["10 agents", "5 swarms", "300 tasks/month", "12% dataset fee"],
                badge: "Best for founders",
              },
              {
                name: "Growth",
                price: "₹2,999",
                period: "/month",
                features: ["30 agents", "20 swarms", "1,500 tasks/month", "10% dataset fee"],
                badge: null,
              },
              {
                name: "Pro",
                price: "₹9,999",
                period: "/month",
                features: ["100 agents", "100 swarms", "10,000 tasks/month", "BYOK support", "5% dataset fee"],
                badge: null,
              },
            ].map((plan) => (
              <div
                key={plan.name}
                className={`rounded-3xl p-7 border ${
                  plan.badge ? "border-[#1c1c1e] bg-[#fafafa]" : "border-[#e5e5ea] bg-white"
                }`}
              >
                {plan.badge && (
                  <div className="inline-block text-xs font-medium bg-[#1c1c1e] text-white px-3 py-1 rounded-full mb-4">
                    {plan.badge}
                  </div>
                )}
                <h3 className="text-lg font-semibold text-[#1c1c1e] mb-1">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-3xl font-semibold text-[#1c1c1e]">{plan.price}</span>
                  {plan.period && <span className="text-sm text-[#8e8e93]">{plan.period}</span>}
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm text-[#636366]">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#34c759] mt-0.5 shrink-0">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/signup"
                  className={`block text-center text-sm font-medium py-3 rounded-full transition-colors ${
                    plan.badge
                      ? "bg-[#1c1c1e] text-white hover:bg-[#2c2c2e]"
                      : "bg-[#f2f2f7] text-[#1c1c1e] hover:bg-[#e5e5ea]"
                  }`}
                >
                  {plan.name === "Free" ? "Get Started" : "Start Free Trial"}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Usage Protection */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="w-16 h-16 rounded-3xl bg-[#f2f2f7] flex items-center justify-center mx-auto mb-8">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#1c1c1e]">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
          </div>
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-[#1c1c1e] mb-6">
            Usage protection, built in.
          </h2>
          <p className="text-lg text-[#636366] leading-relaxed max-w-2xl mx-auto mb-4">
            Hoolder never sells unlimited AI. Every plan has hard usage limits. You always know exactly what you are paying for, and you never wake up to surprise bills.
          </p>
          <p className="text-lg text-[#636366] leading-relaxed max-w-2xl mx-auto">
            Heavy users can bring their own API key. We call it BYOK. Connect your own provider and run beyond plan limits without changing your workflow.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-[#1c1c1e] text-center mb-16">
            Frequently asked questions
          </h2>
          <div className="space-y-4">
            {[
              {
                q: "What is Hoolder?",
                a: "Hoolder is an operating system for AI companies. It brings agents, swarms, tasks, approvals, datasets, usage control, and billing into one unified workspace.",
              },
              {
                q: "Can I create my own AI agents?",
                a: "Yes. You can build agents with custom instructions, connect them to tools and knowledge bases, and deploy them immediately. No code is required for most use cases.",
              },
              {
                q: "Can agents work together?",
                a: "Yes. Hoolder Swarms let you connect multiple agents into collaborative workflows. You define the topology, handoff rules, and execution order.",
              },
              {
                q: "How does dataset selling work?",
                a: "You list a dataset on the marketplace for free. When a buyer purchases it, Hoolder takes a small percentage fee. Downloads are protected and verified.",
              },
              {
                q: "How does Hoolder prevent unlimited AI cost?",
                a: "Every plan has hard limits on agents, swarms, and tasks. We do not offer unlimited usage. If you hit a limit, you upgrade or bring your own API key.",
              },
              {
                q: "Can users bring their own API key?",
                a: "Yes. Pro plans support BYOK. Connect your own OpenAI, Anthropic, or other provider keys and run beyond plan limits while keeping the same Hoolder experience.",
              },
              {
                q: "Does Hoolder support approvals?",
                a: "Yes. You can insert human approval checkpoints at any step in a workflow. Outputs are routed to reviewers with full context before any action is taken.",
              },
            ].map((faq) => (
              <div key={faq.q} className="bg-[#fafafa] rounded-2xl p-6 border border-[#e5e5ea]">
                <h3 className="text-base font-semibold text-[#1c1c1e] mb-2">{faq.q}</h3>
                <p className="text-sm text-[#636366] leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-6 border-t border-[#e5e5ea]">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-16">
            <div>
              <div className="text-xl font-semibold tracking-tight text-[#1c1c1e] mb-6">Hoolder</div>
              <p className="text-sm text-[#8e8e93] leading-relaxed">
                The operating system for AI companies.
              </p>
            </div>
            <div>
              <div className="text-sm font-semibold text-[#1c1c1e] mb-4">Product</div>
              <ul className="space-y-3">
                {["Agents", "Tasks", "Schedules", "Datasets"].map((item) => (
                  <li key={item}>
                    <Link href={`/${item.toLowerCase()}`} className="text-sm text-[#636366] hover:text-[#1c1c1e] transition-colors">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="text-sm font-semibold text-[#1c1c1e] mb-4">Company</div>
              <ul className="space-y-3">
                {["Pricing", "Billing", "Team", "Usage"].map((item) => (
                  <li key={item}>
                    <Link href={`/${item.toLowerCase()}`} className="text-sm text-[#636366] hover:text-[#1c1c1e] transition-colors">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="text-sm font-semibold text-[#1c1c1e] mb-4">Legal</div>
              <ul className="space-y-3">
                {["Privacy", "Terms", "Refund", "AI Policy"].map((item) => (
                  <li key={item}>
                    <Link href={`/${item.toLowerCase().replace(" ", "-")}`} className="text-sm text-[#636366] hover:text-[#1c1c1e] transition-colors">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-[#e5e5ea] flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-[#8e8e93]">© 2026 Hoolder. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <Link href="/privacy" className="text-sm text-[#8e8e93] hover:text-[#1c1c1e] transition-colors">
                Privacy
              </Link>
              <Link href="/terms" className="text-sm text-[#8e8e93] hover:text-[#1c1c1e] transition-colors">
                Terms
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
