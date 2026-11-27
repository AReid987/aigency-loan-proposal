"use client";

import { useState, useRef, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";

function LoginInner() {
  const router = useRouter();
  const params = useSearchParams();
  const from = params.get("from") || "/";
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (loading) return;
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (res.ok && data.ok) {
        router.replace(from.startsWith("/") ? from : "/");
        router.refresh();
      } else {
        setError(data.error || "Incorrect password.");
        setLoading(false);
        inputRef.current?.select();
      }
    } catch {
      setError("Something went wrong. Try again.");
      setLoading(false);
    }
  }

  return (
    <main
      style={{
        minHeight: "100dvh",
        display: "grid",
        placeItems: "center",
        padding: 24,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* ambient violet glow */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          width: 620,
          height: 620,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(142,108,228,0.16) 0%, rgba(142,108,228,0) 70%)",
          top: "-10%",
          left: "50%",
          transform: "translateX(-50%)",
          pointerEvents: "none",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        style={{ width: "100%", maxWidth: 420, position: "relative" }}
      >
        <div style={{ marginBottom: 28 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
            <div style={{ display: "flex", gap: 2 }}>
              <span style={{ width: 10, height: 10, borderRadius: 3, background: "var(--violet)" }} />
              <span style={{ width: 10, height: 10, borderRadius: 3, background: "var(--amber)" }} />
            </div>
            <span style={{ fontWeight: 700, letterSpacing: "0.16em", fontSize: 14 }}>AIGENCY</span>
          </div>
          <h1
            style={{
              fontSize: 30,
              fontWeight: 600,
              letterSpacing: "-0.02em",
              margin: "10px 0 6px",
              lineHeight: 1.1,
            }}
          >
            Private <span className="serif-i" style={{ color: "var(--violet-soft)" }}>proposal</span>
          </h1>
          <p style={{ color: "var(--ink-soft)", margin: 0, fontSize: 15 }}>
            Enter the password you were given to view this document.
          </p>
        </div>

        <form onSubmit={submit} style={{ display: "grid", gap: 10 }}>
          <label htmlFor="pw" className="eyebrow" style={{ letterSpacing: "0.14em" }}>
            Password
          </label>
          <input
            id="pw"
            ref={inputRef}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoFocus
            autoComplete="current-password"
            placeholder="••••••••••••"
            style={{
              width: "100%",
              background: "var(--surface)",
              border: `1px solid ${error ? "rgba(232,120,90,0.6)" : "var(--line-strong)"}`,
              color: "var(--ink)",
              borderRadius: 12,
              padding: "14px 16px",
              fontSize: 16,
              fontFamily: "var(--font-mono)",
              outline: "none",
              transition: "border-color 0.2s",
            }}
          />
          {error && (
            <motion.p
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ color: "#e8785a", fontSize: 13, margin: "2px 0 0" }}
            >
              {error}
            </motion.p>
          )}

          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: loading ? 1 : 1.015 }}
            whileTap={{ scale: 0.985 }}
            style={{
              marginTop: 8,
              width: "100%",
              background: "var(--violet)",
              color: "#fff",
              border: "none",
              borderRadius: 999,
              padding: "14px 16px",
              fontSize: 15,
              fontWeight: 600,
              cursor: loading ? "default" : "pointer",
              opacity: loading ? 0.75 : 1,
              boxShadow: "0 0 0 1px rgba(167,139,250,0.4), 0 8px 30px -8px rgba(142,108,228,0.6)",
            }}
          >
            {loading ? "Checking…" : "View proposal"}
          </motion.button>
        </form>

        <p
          className="mono"
          style={{
            marginTop: 26,
            fontSize: 11,
            color: "var(--ink-faint)",
            letterSpacing: "0.04em",
          }}
        >
          Protected document · Aigency
        </p>
      </motion.div>
    </main>
  );
}
export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginInner />
    </Suspense>
  );
}
