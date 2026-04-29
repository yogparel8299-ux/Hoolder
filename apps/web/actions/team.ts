"use server";

import { createClient } from "../lib/supabase/server";

export async function inviteTeamMember(formData: FormData) {
  const supabase = await createClient();

  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) throw new Error("Not authenticated");

  const company_id = String(formData.get("company_id") || "");
  const email = String(formData.get("email") || "").trim().toLowerCase();
  const role = String(formData.get("role") || "member");

  if (!company_id || !email) {
    throw new Error("Missing fields");
  }

  const { error } = await supabase.from("team_invites").insert({
    company_id,
    invited_by: user.id,
    email,
    role,
    status: "pending"
  });

  if (error) throw error;
}

export async function cancelInvite(formData: FormData) {
  const supabase = await createClient();

  const invite_id = String(formData.get("invite_id") || "");

  if (!invite_id) {
    throw new Error("Missing invite id");
  }

  const { error } = await supabase
    .from("team_invites")
    .delete()
    .eq("id", invite_id);

  if (error) throw error;
}

export async function addTaskComment(formData: FormData) {
  const supabase = await createClient();

  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) throw new Error("Not authenticated");

  const task_id = String(formData.get("task_id") || "");
  const comment = String(formData.get("comment") || "").trim();

  if (!task_id || !comment) {
    throw new Error("Missing comment");
  }

  const { error } = await supabase.from("task_comments").insert({
    task_id,
    user_id: user.id,
    comment
  });

  if (error) throw error;
}
