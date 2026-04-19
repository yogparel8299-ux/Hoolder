"use server";

import { createClient } from "../lib/supabase/server";

export async function createGoal(formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  const company_id = String(formData.get("company_id") || "");
  const title = String(formData.get("title") || "").trim();
  const description = String(formData.get("description") || "").trim();
  const priority = String(formData.get("priority") || "medium");

  if (!company_id || !title) throw new Error("Missing fields");

  const { data, error } = await supabase
    .from("goals")
    .insert({
      company_id,
      title,
      description: description || null,
      priority,
      created_by: user.id
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}
