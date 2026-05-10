import Link from 'next/link'
export const dynamic = "force-static";
export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Sticky Nav */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-[#e5e5ea]">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#1c1c1e] rounded-lg flex items-center justify-center">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="white" />
                <path
                  d="M2 17L12 22L22 17"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2 12L12 17L22 12"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <span className="font-semibold text-lg tracking-tight">
              Hoolder
            </span>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#636366]">
            <Link
              href="#features"
              className="hover:text-[#1c1c1e] transition-colors"
            >
              Features
            </Link>
            <Link
              href="#how-it-works"
              className="hover:text-[#1c1c1e] transition-colors"
            >
              How it works
            </Link>
            <Link
              href="/pricing"
              className="hover:text-[#1c1c1e] transition-colors"
            >
              Pricing
            </Link>
            <Link
              href="/datasets"
              className="hover:text-[#1c1c1e] transition-colors"
            >
              Datasets
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link
              href="/login"
              className="text-sm font-medium text-[#1c1c1e] hover:text-[#636366] transition-colors"
            >
              Log in
            </Link>
            <Link href="/signup" className="btn-primary text-sm">
              Start Free
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="pt-32 pb-20 px-6 text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#f2f2f7] text-sm font-medium text-[#636366] mb-8">
            <span className="w-2 h-2 rounded-full bg-[#34c759]"></span>
            Hoolder 2.0 is now available
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-[#1c1c1e] mb-6 leading-tight">
            Run your AI company from one operating system.
          </h1>
          <p className="text-xl text-[#636366] mb-10 max-w-2xl mx-auto leading-relaxed">
            Create workspaces, deploy agents, organize swarms, and manage tasks,
            schedules, and billing—all in a beautifully structured,
            Apple-inspired interface.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/signup"
              className="btn-primary text-lg w-full sm:w-auto"
            >
              Start Free
              <svg
                className="w-5 h-5 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                ></path>
              </svg>
            </Link>
            <Link
              href="/pricing"
              className="btn-secondary text-lg w-full sm:w-auto"
            >
              View Pricing
            </Link>
          </div>
        </section>

        {/* Product Preview */}
        <section className="px-6 pb-32 max-w-6xl mx-auto">
          <div className="rounded-2xl border border-[#e5e5ea] bg-white shadow-2xl overflow-hidden">
            <div className="h-12 bg-[#f5f5f7] border-b border-[#e5e5ea] flex items-center px-4 gap-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-[#ff3b30]"></div>
                <div className="w-3 h-3 rounded-full bg-[#ffcc00]"></div>
                <div className="w-3 h-3 rounded-full bg-[#34c759]"></div>
              </div>
            </div>
            <div className="p-8 bg-[#fafafa] flex gap-6">
              <div className="w-48 hidden md:flex flex-col gap-2">
                <div className="h-8 bg-[#e5e5ea] rounded-lg w-full mb-4"></div>
                <div className="h-8 bg-white rounded-lg w-full border border-[#e5e5ea]"></div>
                <div className="h-8 bg-[#e5e5ea] rounded-lg w-3/4"></div>
                <div className="h-8 bg-[#e5e5ea] rounded-lg w-5/6"></div>
              </div>
              <div className="flex-1 flex flex-col gap-6">
                <div className="flex gap-4">
                  <div className="flex-1 h-32 bg-white rounded-xl border border-[#e5e5ea] p-4">
                    <div className="h-4 bg-[#f2f2f7] rounded w-1/3 mb-4"></div>
                    <div className="h-8 bg-[#34c759]/20 rounded w-1/2"></div>
                  </div>
                  <div className="flex-1 h-32 bg-white rounded-xl border border-[#e5e5ea] p-4">
                    <div className="h-4 bg-[#f2f2f7] rounded w-1/3 mb-4"></div>
                    <div className="h-8 bg-[#e5e5ea] rounded w-1/2"></div>
                  </div>
                  <div className="flex-1 h-32 bg-white rounded-xl border border-[#e5e5ea] p-4">
                    <div className="h-4 bg-[#f2f2f7] rounded w-1/3 mb-4"></div>
                    <div className="h-8 bg-[#e5e5ea] rounded w-1/2"></div>
                  </div>
                </div>
                <div className="h-64 bg-white rounded-xl border border-[#e5e5ea]"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section
          id="features"
          className="py-32 bg-white border-y border-[#e5e5ea]"
        >
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-20">
              <h2 className="text-4xl font-bold tracking-tight text-[#1c1c1e] mb-4">
                Everything you need to scale AI.
              </h2>
              <p className="text-xl text-[#636366] max-w-2xl mx-auto">
                Powerful primitives designed for enterprise workflows.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="card">
                <div className="w-12 h-12 bg-[#f2f2f7] rounded-xl flex items-center justify-center mb-6">
                  <svg
                    className="w-6 h-6 text-[#1c1c1e]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                    ></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">
                  Workspaces & Companies
                </h3>
                <p className="text-[#636366] leading-relaxed">
                  Isolate data, agents, and billing across different departments
                  or client projects seamlessly.
                </p>
              </div>
              <div className="card">
                <div className="w-12 h-12 bg-[#f2f2f7] rounded-xl flex items-center justify-center mb-6">
                  <svg
                    className="w-6 h-6 text-[#1c1c1e]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    ></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">Agents & Swarms</h3>
                <p className="text-[#636366] leading-relaxed">
                  Deploy specialized agents and group them into swarms to tackle
                  complex, multi-step objectives.
                </p>
              </div>
              <div className="card">
                <div className="w-12 h-12 bg-[#f2f2f7] rounded-xl flex items-center justify-center mb-6">
                  <svg
                    className="w-6 h-6 text-[#1c1c1e]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">
                  Approvals & Safety
                </h3>
                <p className="text-[#636366] leading-relaxed">
                  Keep humans in the loop. Require explicit approval before
                  agents execute high-stakes actions.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Usage Protection */}
        <section className="py-32 bg-[#fafafa]">
          <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-16">
            <div className="flex-1">
              <h2 className="text-4xl font-bold tracking-tight text-[#1c1c1e] mb-6">
                Never worry about runaway costs.
              </h2>
              <p className="text-xl text-[#636366] mb-8 leading-relaxed">
                Hoolder automatically blocks excessive usage. Set hard limits on
                tokens, tasks, and budgets per agent or workspace. Sleep
                peacefully knowing your AI won't drain your bank account.
              </p>
              <ul className="space-y-4">
                <li className="flex items-center gap-3 text-[#1c1c1e] font-medium">
                  <svg
                    className="w-5 h-5 text-[#34c759]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                  Automatic limit blocking
                </li>
                <li className="flex items-center gap-3 text-[#1c1c1e] font-medium">
                  <svg
                    className="w-5 h-5 text-[#34c759]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                  Real-time cost estimation
                </li>
                <li className="flex items-center gap-3 text-[#1c1c1e] font-medium">
                  <svg
                    className="w-5 h-5 text-[#34c759]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                  Bring your own keys (BYOK)
                </li>
              </ul>
            </div>
            <div className="flex-1 w-full">
              <div className="card">
                <div className="flex justify-between items-center mb-6">
                  <h4 className="font-semibold">Monthly Budget</h4>
                  <span className="text-[#8e8e93] text-sm">68% used</span>
                </div>
                <div className="w-full bg-[#f2f2f7] rounded-full h-3 mb-2">
                  <div
                    className="bg-[#34c759] h-3 rounded-full"
                    style={{
                      width: '68%',
                    }}
                  ></div>
                </div>
                <div className="flex justify-between text-sm text-[#636366] mt-4">
                  <span>$42.80 spent</span>
                  <span>$100.00 limit</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Dataset Marketplace Preview */}
        <section className="py-32 bg-white border-y border-[#e5e5ea]">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h2 className="text-4xl font-bold tracking-tight text-[#1c1c1e] mb-6">
              Monetize your data.
            </h2>
            <p className="text-xl text-[#636366] mb-12 max-w-2xl mx-auto">
              Buy high-quality datasets to train your agents, or sell your
              proprietary data on the Hoolder Marketplace.
            </p>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto text-left">
              <div className="card flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <span className="badge badge-gray">Finance</span>
                    <span className="font-semibold text-lg">₹4,999</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">
                    Q3 Earnings Call Transcripts
                  </h3>
                  <p className="text-[#636366] text-sm mb-6">
                    Cleaned, structured transcripts from top 500 S&P companies.
                  </p>
                </div>
                <button className="btn-secondary w-full">View Dataset</button>
              </div>
              <div className="card flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <span className="badge badge-gray">Support</span>
                    <span className="font-semibold text-lg">₹2,499</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">
                    SaaS Customer Support Logs
                  </h3>
                  <p className="text-[#636366] text-sm mb-6">
                    10k+ anonymized support tickets with resolution steps.
                  </p>
                </div>
                <button className="btn-secondary w-full">View Dataset</button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#fafafa] border-t border-[#e5e5ea] py-12">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-6 h-6 bg-[#1c1c1e] rounded flex items-center justify-center">
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="white" />
                  <path
                    d="M2 17L12 22L22 17"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M2 12L12 17L22 12"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <span className="font-semibold tracking-tight">Hoolder</span>
            </div>
            <p className="text-sm text-[#636366]">
              The operating system for AI companies.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-3 text-sm text-[#636366]">
              <li>
                <Link href="/pricing" className="hover:text-[#1c1c1e]">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/datasets" className="hover:text-[#1c1c1e]">
                  Datasets
                </Link>
              </li>
              <li>
                <Link href="/builder" className="hover:text-[#1c1c1e]">
                  Builder
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-3 text-sm text-[#636366]">
              <li>
                <Link href="/privacy" className="hover:text-[#1c1c1e]">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-[#1c1c1e]">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/refund" className="hover:text-[#1c1c1e]">
                  Refund Policy
                </Link>
              </li>
              <li>
                <Link href="/ai-policy" className="hover:text-[#1c1c1e]">
                  AI Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-[#e5e5ea] text-sm text-[#8e8e93] flex justify-between items-center">
          <p>© 2026 Hoolder Inc. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
