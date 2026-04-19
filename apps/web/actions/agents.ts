"use server";

import { createClient } from "../lib/supabase/server";

export async function createAgent(formData: FormData) {
  const supabase = await createClient();

  const company_id = String(formData.get("company_id") || "");
  const name = String(formData.get("name") || "").trim();
  const role = String(formData.get("role") || "").trim();
  const description = String(formData.get("description") || "").trim();
  const provider = String(formData.get("provider") || "openai");
  const model = String(formData.get("model") || "gpt-4o-mini");
  const system_prompt = String(formData.get("system_prompt") || "").trim();
  const monthly_budget_usd = Number(formData.get("monthly_budget_usd") || 0);

  if (!company_id || !name || !role) {
    throw new Error("Missing required fields");
  }

  const { data, error } = await supabase
    .from("agents")
    .insert({
      company_id,
      name,
      role,
      description: description || null,
      provider,
      model,
      system_prompt: system_prompt || null,
      monthly_budget_usd
    })
    .select()
    .single();

  if (error) throw error;

  return data;
}
