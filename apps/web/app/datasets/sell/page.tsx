import { createDataset } from "../../../actions/datasets";
import { createClient } from "../../../lib/supabase/server";
import { requireUser } from "../../../lib/auth";

export default async function SellDatasetPage() {
  await requireUser();
  const supabase = await createClient();

  const { data: companies } = await supabase.from("companies").select("id,name");

  return (
    <div className="container">
      <div className="page-header">
        <div>
          <div className="page-kicker">Sell Dataset</div>
          <h1>List a dataset for agents and builders.</h1>
          <p>
            Add useful datasets that companies can buy for research, agents,
            automation and AI workflows.
          </p>
        </div>
      </div>

      <form action={createDataset} className="card grid" style={{ maxWidth: 760 }}>
        <select className="select" name="company_id">
          <option value="">Personal listing</option>
          {(companies || []).map((company) => (
            <option key={company.id} value={company.id}>
              {company.name}
            </option>
          ))}
        </select>

        <input className="input" name="title" placeholder="Dataset title" required />

        <textarea
          className="textarea"
          name="description"
          placeholder="Explain what this dataset contains and who it helps"
          required
        />

        <select className="select" name="category">
          <option value="marketing">Marketing</option>
          <option value="sales">Sales</option>
          <option value="finance">Finance</option>
          <option value="coding">Coding</option>
          <option value="research">Research</option>
          <option value="customer-support">Customer Support</option>
          <option value="general">General</option>
        </select>

        <input className="input" name="price_inr" type="number" placeholder="Price in INR" required />

        <select className="select" name="license_type">
          <option value="standard">Standard commercial license</option>
          <option value="personal">Personal use only</option>
          <option value="enterprise">Enterprise license</option>
        </select>

        <textarea
          className="textarea"
          name="sample_text"
          placeholder="Paste a small safe sample preview"
        />

        <input className="input" name="file_url" placeholder="Dataset file URL for now" />

        <button className="button" type="submit">
          Publish dataset
        </button>
      </form>
    </div>
  );
}
