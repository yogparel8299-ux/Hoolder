"use server";

import { createClient } from "../lib/supabase/server";
import { slugify } from "../../../packages/shared/src/utils";

export async function createCompany(formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  const name = String(formData.get("name") || "").trim();
  const mission = String(formData.get("mission") || "").trim();
  if (!name) throw new Error("Company name is required");

  const slug = slugify(name);

  const { data: company, error } = await supabase
    .from("companies")
    .insert({ owner_id: user.id, name, slug, mission: mission || null })
    .select()
    .single();

  if (error) throw error;

  const { error: memberError } = await supabase.from("company_members").insert({
    company_id: company.id,
    user_id: user.id,
    role: "owner"
  });

  if (memberError) throw memberError;

  return company;
}
