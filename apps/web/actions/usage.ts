"use server";

import { createClient } from "../lib/supabase/server";

export async function ensureUserPlan() {
  const supabase = await createClient();

  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) throw new Error("Not authenticated");

  const { data: existing } = await supabase
    .from("user_plans")
    .select("*")
    .eq("user_id", user.id)
    .maybeSingle();

  if (existing) return existing;

  const { data, error } = await supabase
    .from("user_plans")
    .insert({
      user_id: user.id,
      plan_name: "free",
      status: "active"
    })
    .select()
    .single();

  if (error) throw error;

  return data;
}
