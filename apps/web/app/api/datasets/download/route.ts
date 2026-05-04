import { NextRequest, NextResponse } from "next/server";
import { createClient } from "../../../../lib/supabase/server";

export async function GET(request: NextRequest) {
  const supabase = await createClient();

  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const datasetId = request.nextUrl.searchParams.get("dataset_id");

  if (!datasetId) {
    return NextResponse.json({ error: "Missing dataset id" }, { status: 400 });
  }

  const { data: dataset } = await supabase
    .from("datasets")
    .select("*")
    .eq("id", datasetId)
    .single();

  if (!dataset) {
    return NextResponse.json({ error: "Dataset not found" }, { status: 404 });
  }

  const isSeller = dataset.seller_id === user.id;

  const { data: order } = await supabase
    .from("dataset_orders")
    .select("*")
    .eq("dataset_id", datasetId)
    .eq("buyer_id", user.id)
    .in("payment_status", ["paid", "demo_paid"])
    .eq("access_granted", true)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (!isSeller && !order) {
    return NextResponse.json(
      { error: "You must buy this dataset before downloading." },
      { status: 403 }
    );
  }

  if (dataset.storage_path) {
    const { data, error } = await supabase.storage
      .from("datasets")
      .createSignedUrl(dataset.storage_path, 60 * 10);

    if (error || !data?.signedUrl) {
      return NextResponse.json({ error: "Could not create signed URL" }, { status: 500 });
    }

    return NextResponse.redirect(data.signedUrl);
  }

  if (dataset.file_url) {
    return NextResponse.redirect(dataset.file_url);
  }

  return NextResponse.json(
    { error: "No file attached to this dataset." },
    { status: 404 }
  );
}
