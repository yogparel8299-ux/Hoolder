"use server";

import { createClient } from "../lib/supabase/server";

export async function createDataset(formData: FormData) {
  const supabase = await createClient();

  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) throw new Error("Not authenticated");

  const company_id = String(formData.get("company_id") || "") || null;
  const title = String(formData.get("title") || "").trim();
  const description = String(formData.get("description") || "").trim();
  const category = String(formData.get("category") || "general").trim();
  const price_inr = Number(formData.get("price_inr") || 0);
  const license_type = String(formData.get("license_type") || "standard");
  const sample_text = String(formData.get("sample_text") || "").trim();
  const file_url = String(formData.get("file_url") || "").trim();
  const storage_path = String(formData.get("storage_path") || "").trim();
  const file_name = String(formData.get("file_name") || "").trim();
  const file_size_bytes = Number(formData.get("file_size_bytes") || 0);

  if (!title || !description || !category) {
    throw new Error("Missing required fields");
  }

  const { data, error } = await supabase
    .from("datasets")
    .insert({
      seller_id: user.id,
      company_id,
      title,
      description,
      category,
      price_inr,
      license_type,
      sample_text: sample_text || null,
      file_url: file_url || null,
      storage_path: storage_path || null,
      file_name: file_name || null,
      file_size_bytes: file_size_bytes || null,
      status: "active"
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function createDatasetOrder(formData: FormData) {
  const supabase = await createClient();

  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) throw new Error("Not authenticated");

  const dataset_id = String(formData.get("dataset_id") || "");
  const amount_inr = Number(formData.get("amount_inr") || 0);

  if (!dataset_id || amount_inr < 0) {
    throw new Error("Invalid dataset order");
  }

  const platform_fee_inr = Math.round(amount_inr * 0.15);
  const seller_earning_inr = amount_inr - platform_fee_inr;

  const { data, error } = await supabase
    .from("dataset_orders")
    .insert({
      dataset_id,
      buyer_id: user.id,
      amount_inr,
      platform_fee_inr,
      seller_earning_inr,
      payment_status: amount_inr === 0 ? "paid" : "demo_paid",
      access_granted: true,
      paid_at: new Date().toISOString()
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}
