import Link from "next/link";

export const dynamic = "force-static";

const features = [
  {
    title: "AI Agents",
    description:
      "Create and manage specialized AI agents for research, coding, sales, finance and operations."
  },
  {
    title: "Swarms",
    description:
      "Coordinate multiple agents together to complete complex workflows and business objectives."
  },
  {
    title: "Recurring Tasks",
    description:
      "Schedule daily, weekly and monthly AI automations that run continuously."
  },
  {
    title: "Human Approvals",
    description:
      "Review outputs before execution with structured approval queues and audit history."
  },
  {
    title: "Dataset Marketplace",
    description:
      "Buy and sell datasets with protected downloads and marketplace monetization."
  },
  {
    title: "Usage Protection",
    description:
      "Prevent runaway AI costs using hard usage limits, quotas and BYOK support."
  }
];

const pricing = [
  {
    name: "Free",
    price: "₹0",
    features: [
      "3 agents",
      "1 swarm",
      "25 tasks/month",
      "15% dataset fee"
    ]
  },
  {
    name: "Starter",
    price: "₹999/mo",
    badge: "Best for founders",
    features: [
      "10 agents",
      "5 swarms",
      "300 tasks/month",
      "12% dataset fee"
    ]
  },
  {
    name: "Growth",
    price: "₹2,999/mo",
    features: [
      "30 agents",
      "20 swarms",
      "1,500 tasks/month",
      "10% dataset fee"
    ]
  },
  {
    name: "Pro",
    price: "₹9,999/mo",
    features: [
      "100 agents",
      "100 swarms",
      "10,000 tasks/month",
      "BYOK support",
      "5% dataset fee"
    ]
  }
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#fafafa] text-[#1c1c1e]">
      <header className="sticky top-0 z-50 backdrop-blur-md bg-[#fafafa]/90 border-b border-[#e5e5ea]">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#1c1c1e] rounded-lg flex items-center justify-center">
              <span className="text-white text-sm font-semibold">H</span>
            </div>

            <span className="font-semibold text-lg tracking-tight">
              Hoolder
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm text-[#636366]">
            <a href="#features">Features</a>
            <a href="#pricing">Pricing</a>
            <a href="#faq">FAQ</a>
          </nav>

          <div className="flex items-center gap-3">
            <Link href="/login" className="text-sm text-[#636366]">
              Sign In
            </Link>

            <Link href="/signup" className="btn-primary text-sm">
              Start Free
            </Link>
          </div>
        </div>
      </header>

      <section className="max-w-7xl mx-auto px-6 pt-24 pb-20">
        <div className="max-w-4xl">
          <div className="badge badge-green mb-6">
            AI Company Operating System
          </div>

          <h1 className="text-5xl md:text-7xl font-semibold tracking-tight leading-[1.05]">
            Run your AI company from one operating system.
          </h1>

          <p className="mt-8 text-xl text-[#636366] max-w-3xl leading-relaxed">
            Hoolder helps teams create AI agents, manage swarms,
            schedule recurring tasks, review outputs, sell datasets,
            control usage and manage billing from one premium workspace.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <Link href="/signup" className="btn-primary text-lg">
              Start Free
            </Link>

            <Link href="/pricing" className="btn-secondary text-lg">
              View Pricing
            </Link>
          </div>
        </div>

        <div className="mt-24 card overflow-hidden">
          <div className="grid md:grid-cols-[240px_1fr] min-h-[560px]">
            <div className="border-r border-[#e5e5ea] bg-[#f5f5f7] p-5">
              <div className="space-y-2">
                {[
                  "Dashboard",
                  "Agents",
                  "Tasks",
                  "Schedules",
                  "Approvals",
                  "Datasets",
                  "Billing"
                ].map((item, index) => (
                  <div
                    key={item}
                    className={`px-4 py-3 rounded-xl text-sm font-medium ${
                      index === 0
                        ? "bg-white border border-[#e5e5ea]"
                        : "text-[#636366]"
                    }`}
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="p-8">
              <div className="grid md:grid-cols-3 gap-4">
                <div className="card">
                  <div className="text-sm text-[#8e8e93]">Active Agents</div>
                  <div className="text-3xl font-semibold mt-2">12</div>
                </div>

                <div className="card">
                  <div className="text-sm text-[#8e8e93]">Pending Tasks</div>
                  <div className="text-3xl font-semibold mt-2">48</div>
                </div>

                <div className="card">
                  <div className="text-sm text-[#8e8e93]">Monthly Usage</div>
                  <div className="text-3xl font-semibold mt-2">68%</div>
                </div>
              </div>

              <div className="mt-8 card">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">
                    Swarm Topology
                  </h3>

                  <div className="badge badge-green">
                    Healthy
                  </div>
                </div>

                <div className="mt-8 grid grid-cols-3 gap-6">
                  <div className="card text-center">
                    Research Agent
                  </div>

                  <div className="card text-center">
                    Coding Agent
                  </div>

                  <div className="card text-center">
                    Sales Agent
                  </div>
                </div>
              </div>

              <div className="mt-8 card">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">
                    Approval Queue
                  </h3>

                  <div className="text-sm text-[#636366]">
                    5 pending reviews
                  </div>
                </div>

                <div className="mt-6 space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between border border-[#e5e5ea] rounded-2xl p-4"
                    >
                      <div>
                        <div className="font-medium">
                          AI Generated Financial Report
                        </div>

                        <div className="text-sm text-[#8e8e93] mt-1">
                          Requires human approval before publishing
                        </div>
                      </div>

                      <button className="btn-secondary text-sm">
                        Review
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="features"
        className="max-w-7xl mx-auto px-6 py-24"
      >
        <div className="max-w-2xl">
          <div className="badge badge-gray mb-6">
            Platform Features
          </div>

          <h2 className="text-4xl font-semibold tracking-tight">
            Everything needed to run an AI company.
          </h2>
        </div>

        <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <div key={feature.title} className="card">
              <h3 className="text-xl font-semibold">
                {feature.title}
              </h3>

              <p className="mt-4 text-[#636366] leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section
        id="pricing"
        className="max-w-7xl mx-auto px-6 py-24"
      >
        <div className="max-w-2xl">
          <div className="badge badge-gray mb-6">
            Pricing
          </div>

          <h2 className="text-4xl font-semibold tracking-tight">
            Built for profitable AI businesses.
          </h2>

          <p className="mt-6 text-xl text-[#636366]">
            Hoolder protects infrastructure costs with usage limits
            and scalable plans.
          </p>
        </div>

        <div className="mt-16 grid lg:grid-cols-4 gap-6">
          {pricing.map((plan) => (
            <div key={plan.name} className="card relative">
              {plan.badge && (
                <div className="absolute top-5 right-5 badge badge-green">
                  {plan.badge}
                </div>
              )}

              <h3 className="text-xl font-semibold">
                {plan.name}
              </h3>

              <div className="mt-4 text-4xl font-semibold">
                {plan.price}
              </div>

              <ul className="mt-8 space-y-3">
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    className="text-[#636366]"
                  >
                    {feature}
                  </li>
                ))}
              </ul>

              <button className="btn-primary w-full mt-10">
                Get Started
              </button>
            </div>
          ))}
        </div>
      </section>

      <section
        id="faq"
        className="max-w-5xl mx-auto px-6 py-24"
      >
        <div className="badge badge-gray mb-6">
          FAQ
        </div>

        <h2 className="text-4xl font-semibold tracking-tight">
          Common questions
        </h2>

        <div className="mt-16 space-y-6">
          {[
            {
              q: "Can I create my own AI agents?",
              a: "Yes. Users can create specialized agents for research, sales, coding, support and operations."
            },
            {
              q: "Can agents work together?",
              a: "Yes. Swarms allow multiple agents to collaborate on tasks and workflows."
            },
            {
              q: "Does Hoolder support approvals?",
              a: "Yes. Human approval queues prevent unsafe or unverified outputs from executing automatically."
            },
            {
              q: "Can users bring their own API key?",
              a: "Yes. Higher plans support BYOK for OpenAI, Anthropic, Gemini and other providers."
            }
          ].map((faq) => (
            <div key={faq.q} className="card">
              <h3 className="text-lg font-semibold">
                {faq.q}
              </h3>

              <p className="mt-4 text-[#636366] leading-relaxed">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t border-[#e5e5ea] mt-24">
        <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <div className="font-semibold text-lg">
              Hoolder
            </div>

            <div className="text-sm text-[#8e8e93] mt-2">
              © 2026 Hoolder. All rights reserved.
            </div>
          </div>

          <div className="flex items-center gap-6 text-sm text-[#636366]">
            <Link href="/pricing">Pricing</Link>
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
            <Link href="/refund">Refund</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
