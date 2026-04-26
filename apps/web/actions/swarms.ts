"use server";

import { createClient } from "../lib/supabase/server";

export async function createSwarm(formData: FormData) {
  const supabase = await createClient();

  const name = String(formData.get("name") || "");
  const company_id = String(formData.get("company_id") || "");
  const objective = String(formData.get("objective") || "");
  const topology = String(formData.get("topology") || "mesh");
  const leader_agent_id = String(formData.get("leader_agent_id") || "") || null;

  if (!name || !company_id) {
    throw new Error("Missing fields");
  }

  const { data, error } = await supabase
    .from("swarms")
    .insert({
      name,
      company_id,
      objective,
      topology,
      leader_agent_id
    })
    .select()
    .single();

  if (error) throw error;

  return data;
}

export async function addSwarmMember(formData: FormData) {
  const supabase = await createClient();

  const swarm_id = String(formData.get("swarm_id") || "");
  const agent_id = String(formData.get("agent_id") || "");
  const role = String(formData.get("role") || "member");

  if (!swarm_id || !agent_id) {
    throw new Error("Missing fields");
  }

  const { error } = await supabase.from("swarm_members").insert({
    swarm_id,
    agent_id,
    role
  });

  if (error) throw error;
}

export async function removeSwarmMember(formData: FormData) {
  const supabase = await createClient();

  const swarm_id = String(formData.get("swarm_id") || "");
  const agent_id = String(formData.get("agent_id") || "");

  if (!swarm_id || !agent_id) {
    throw new Error("Missing fields");
  }

  await supabase
    .from("swarm_members")
    .delete()
    .eq("swarm_id", swarm_id)
    .eq("agent_id", agent_id);
}
