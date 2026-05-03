"use server";

import { createClient } from "../lib/supabase/server";

export async function addAgentSkill(formData: FormData) {
  const supabase = await createClient();

  const agent_id = String(formData.get("agent_id") || "");
  const skill_name = String(formData.get("skill_name") || "").trim();
  const skill_type = String(formData.get("skill_type") || "general");

  if (!agent_id || !skill_name) {
    throw new Error("Missing skill fields");
  }

  const { error } = await supabase.from("agent_skills").insert({
    agent_id,
    skill_name,
    skill_type,
    skill_config: {},
    is_active: true
  });

  if (error) throw error;
}

export async function deleteAgentSkill(formData: FormData) {
  const supabase = await createClient();

  const skill_id = String(formData.get("skill_id") || "");

  if (!skill_id) {
    throw new Error("Missing skill id");
  }

  const { error } = await supabase
    .from("agent_skills")
    .delete()
    .eq("id", skill_id);

  if (error) throw error;
}
