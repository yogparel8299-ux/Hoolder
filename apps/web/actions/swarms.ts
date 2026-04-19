"use server";

import { createClient } from "../lib/supabase/server";

export async function createSwarm(formData: FormData) {
  const supabase = await createClient();

  const company_id = String(formData.get("company_id") || "");
  const name = String(formData.get("name") || "").trim();
  const objective = String(formData.get("objective") || "").trim();
  const topology = String(formData.get("topology") || "hierarchy");
  const leader_agent_id = String(formData.get("leader_agent_id") || "");

  if (!company_id || !name) throw new Error("Missing fields");

  const { data, error } = await supabase
    .from("swarms")
    .insert({
      company_id,
      name,
      objective: objective || null,
      topology,
      leader_agent_id: leader_agent_id || null
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}
