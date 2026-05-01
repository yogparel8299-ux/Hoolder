import { addProviderKey, deleteProviderKey } from "../../actions/provider-keys";
import { createClient } from "../../lib/supabase/server";
import { requireUser } from "../../lib/auth";

function maskKey(key: string) {
  if (!key || key.length < 10) return "••••••••";
  return `${key.slice(0, 6)}••••••••${key.slice(-4)}`;
}

export default async function SettingsPage() {
  const user = await requireUser();
  const supabase = await createClient();

  const { data: keys } = await supabase
    .from("provider_keys")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  return (
    <div className="container">
      <div className="page-header">
        <div>
          <div className="page-kicker">Settings</div>
          <h1>Bring your own AI keys.</h1>
          <p>
            Pro and enterprise users can connect their own AI provider keys so
            high usage does not burn Hoolder’s platform credits.
          </p>
        </div>
      </div>

      <div className="grid grid-2">
        <form action={addProviderKey} className="card grid">
          <h2>Add provider key</h2>

          <select className="select" name="provider_name" required>
            <option value="openai">OpenAI</option>
            <option value="anthropic">Anthropic</option>
            <option value="google">Google Gemini</option>
            <option value="groq">Groq</option>
            <option value="together">Together AI</option>
            <option value="openrouter">OpenRouter</option>
          </select>

          <input
            className="input"
            name="key_label"
            placeholder="Example: My OpenAI Key"
            required
          />

          <input
            className="input"
            name="api_key"
            placeholder="Paste API key"
            type="password"
            required
          />

          <button className="button" type="submit">
            Save key
          </button>
        </form>

        <div className="grid">
          {(keys || []).map((key) => (
            <div key={key.id} className="card">
              <span className="badge">{key.provider_name}</span>
              <h3 style={{ marginTop: 12 }}>{key.key_label}</h3>
              <p>{maskKey(key.api_key)}</p>

              <form action={deleteProviderKey}>
                <input type="hidden" name="key_id" value={key.id} />
                <button className="button" type="submit">
                  Delete key
                </button>
              </form>
            </div>
          ))}

          {!keys?.length ? (
            <div className="card">
              <h3>No provider keys yet</h3>
              <p>
                Add keys later when you want users to run tasks from their own
                provider account.
              </p>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
