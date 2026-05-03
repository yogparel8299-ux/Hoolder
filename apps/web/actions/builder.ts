"use server";

import { createClient } from "../lib/supabase/server";

function pickAgentsFromPrompt(prompt: string) {
  const lower = prompt.toLowerCase();
  const agents = [];

  if (lower.includes("marketing")) {
    agents.push(
      { name: "Content Strategist", role: "Creates marketing content and campaign ideas" },
      { name: "Social Media Agent", role: "Creates short posts, hooks and captions" },
      { name: "Ad Copy Agent", role: "Writes ad copy and landing page text" }
    );
  }

  if (lower.includes("sales")) {
    agents.push(
      { name: "Lead Research Agent", role: "Finds and researches sales leads" },
      { name: "Outbound Agent", role: "Writes cold emails and outreach sequences" }
    );
  }

  if (lower.includes("finance")) {
    agents.push(
      { name: "Finance Analyst", role: "Analyzes costs, pricing and projections" }
    );
  }

  if (lower.includes("code") || lower.includes("software") || lower.includes("developer")) {
    agents.push(
      { name: "Software Agent", role: "Plans and writes technical implementation steps" }
    );
  }

  if (!agents.length) {
    agents.push(
      { name: "General Manager Agent", role: "Plans work and coordinates tasks" },
      { name: "Research Agent", role: "Researches information and prepares structured answers" },
      { name: "Execution Agent", role: "Turns plans into concrete outputs" }
    );
  }

  return agents;
}

export async function buildCompanyFromPrompt(formData: FormData) {
  const supabase = await createClient();

  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) throw new Error("Not authenticated");

  const prompt = String(formData.get("prompt") || "").trim();

  if (!prompt) throw new Error("Prompt required");

  await supabase.from("builder_requests").insert({
    user_id: user.id,
    prompt,
    status: "processing"
  });

  const companyName =
    prompt.length > 40 ? `${prompt.slice(0, 38)}...` : prompt || "AI Company";

  const { data: company, error: companyError } = await supabase
    .from("companies")
    .insert({
      name: companyName,
      slug: `company-${Date.now()}`,
      owner_id: user.id
    })
    .select()
    .single();

  if (companyError || !company) throw companyError;

  await supabase.from("company_members").insert({
    company_id: company.id,
    user_id: user.id,
    role: "owner"
  });

  const agents = pickAgentsFromPrompt(prompt);

  const createdAgents = [];

  for (const agent of agents) {
    const { data } = await supabase
      .from("agents")
      .insert({
        company_id: company.id,
        name: agent.name,
        role: agent.role,
        provider: "openai",
        model: "gpt-4o-mini",
        monthly_budget_usd: 25,
        description: `Created from builder prompt: ${prompt}`,
        system_prompt: `You are ${agent.name}. Your role: ${agent.role}.`
      })
      .select()
      .single();

    if (data) createdAgents.push(data);
  }

  const { data: swarm } = await supabase
    .from("swarms")
    .insert({
      company_id: company.id,
      name: "Main Operating Swarm",
      objective: prompt,
      topology: "mesh"
    })
    .select()
    .single();

  if (swarm) {
    for (const agent of createdAgents) {
      await supabase.from("swarm_members").insert({
        swarm_id: swarm.id,
        agent_id: agent.id,
        role: "member"
      });
    }
  }

  await supabase.from("tasks").insert({
    company_id: company.id,
    title: "Initial execution plan",
    description: `Create a practical execution plan for: ${prompt}`,
    priority: "high",
    created_by: user.id,
    requires_approval: true,
    status: "pending"
  });
}
