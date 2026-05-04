import Link from "next/link";
import { createDatasetOrder } from "../../actions/datasets";
import { createClient } from "../../lib/supabase/server";
import { requireUser } from "../../lib/auth";

export default async function DatasetsPage() {
  const user = await requireUser();
  const supabase = await createClient();

  const { data: datasets } = await supabase
    .from("datasets")
    .select("*")
    .order("created_at", { ascending: false });

  const { data: orders } = await supabase
    .from("dataset_orders")
    .select("dataset_id,payment_status,access_granted")
    .eq("buyer_id", user.id)
    .eq("access_granted", true);

  const ownedDatasetIds = new Set((orders || []).map((o) => o.dataset_id));

  return (
    <div className="container">
      <div className="page-header">
        <div>
          <div className="page-kicker">Marketplace</div>
          <h1>Buy and sell datasets for AI agents.</h1>
          <p>
            Listing is free. Hoolder takes a cut only when a dataset is sold.
            Downloads are protected and buyer-only.
          </p>
        </div>

        <Link className="button" href="/datasets/sell">
          Sell dataset
        </Link>
      </div>

      <div className="grid grid-3">
        {(datasets || []).map((dataset) => {
          const canDownload = dataset.seller_id === user.id || ownedDatasetIds.has(dataset.id);

          return (
            <div key={dataset.id} className="card">
              <span className="badge">{dataset.category}</span>
              <h2 style={{ marginTop: 14 }}>{dataset.title}</h2>
              <p>{dataset.description}</p>

              <div style={{ marginTop: 14 }}>
                <p>License: {dataset.license_type}</p>
                <p>File: {dataset.file_name || "No uploaded file"}</p>
                <h2>₹{Number(dataset.price_inr).toFixed(0)}</h2>
              </div>

              {dataset.sample_text ? (
                <pre style={{ marginTop: 14 }}>{dataset.sample_text}</pre>
              ) : null}

              <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 16 }}>
                {!canDownload ? (
                  <form action={createDatasetOrder}>
                    <input type="hidden" name="dataset_id" value={dataset.id} />
                    <input type="hidden" name="amount_inr" value={dataset.price_inr} />
                    <button className="button" type="submit">
                      Buy dataset
                    </button>
                  </form>
                ) : null}

                {canDownload ? (
                  <Link
                    className="button"
                    href={`/api/datasets/download?dataset_id=${dataset.id}`}
                  >
                    Download
                  </Link>
                ) : null}
              </div>
            </div>
          );
        })}

        {!datasets?.length ? (
          <div className="card">
            <h3>No datasets yet</h3>
            <p>List the first dataset and start building marketplace supply.</p>
            <Link className="button" href="/datasets/sell">
              Sell first dataset
            </Link>
          </div>
        ) : null}
      </div>
    </div>
  );
}
