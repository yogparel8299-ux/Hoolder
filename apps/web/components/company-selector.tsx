"use client";

export function CompanySelector({ companies }: { companies: { id: string; name: string }[] }) {
  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    document.cookie = `company_id=${e.target.value}; path=/`;
    window.location.reload();
  }

  if (!companies.length) return null;

  return (
    <select className="select" onChange={handleChange} defaultValue={companies[0].id}>
      {companies.map((company) => (
        <option key={company.id} value={company.id}>
          {company.name}
        </option>
      ))}
    </select>
  );
}
