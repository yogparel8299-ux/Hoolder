"use server";

import { createClient } from "../lib/supabase/server";

export async function addProviderKey(formData: FormData) {
  const supabase = await createClient();

  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) throw new Error("Not authenticated");

  const provider_name = String(formData.get("provider_name") || "").trim();
  const key_label = String(formData.get("key_label") || "").trim();
  const api_key = String(formData.get("api_key") || "").trim();

  if (!provider_name || !key_label || !api_key) {
    throw new Error("Missing fields");
  }

  const { error } = await supabase.from("provider_keys").insert({
    user_id: user.id,
    provider_name,
    key_label,
    api_key,
    is_active: true
  });

  if (error) throw error;
}

export async function deleteProviderKey(formData: FormData) {
  const supabase = await createClient();

  const key_id = String(formData.get("key_id") || "");

  if (!key_id) throw new Error("Missing key id");

  const { error } = await supabase
    .from("provider_keys")
    .delete()
    .eq("id", key_id);

  if (error) throw error;
}
