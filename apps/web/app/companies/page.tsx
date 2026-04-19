import { createCompany } from "@/actions/companies";
import { createClient } from "@/lib/supabase/server";
import { requireUser } from "@/lib/auth";

export default async function CompaniesPage() {
  await requireUser();
  const supabase = await createClient();
  const { data: companies } = await supabase.from("companies").select("*").order("created_at", { ascending: false });

  return (
    <div className="container">
      <h1>Companies</h1>
      <div className="grid grid-2">
        <form action={createCompany} className="card grid">
          <h3>Create company</h3>
          <input className="input" name="name" placeholder="Company name" />
          <textarea className="textarea" name="mission" placeholder="Mission" />
          <button className="button" type="submit">Create</button>
        </form>
        <div className="grid">
          {(companies || []).map((company) => (
            <div key={company.id} className="card">
              <h3>{company.name}</h3>
              <p>{company.mission || "No mission set"}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
