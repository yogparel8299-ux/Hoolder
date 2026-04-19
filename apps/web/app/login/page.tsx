"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabaseBrowser } from "@/lib/supabase/browser";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    const { error } = await supabaseBrowser.auth.signInWithPassword({ email, password });
    if (error) {
      setError(error.message);
      return;
    }

    router.push("/dashboard");
    router.refresh();
  }

  return (
    <div className="container">
      <div className="card" style={{ maxWidth: 480, marginTop: 60 }}>
        <h1>Login</h1>
        <form onSubmit={onSubmit} className="grid">
          <input className="input" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input className="input" placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          {error ? <p>{error}</p> : null}
          <button className="button" type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}
