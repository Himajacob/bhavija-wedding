"use client";

import { useEffect, useState } from "react";

function parts(target: number, now: number) {
  const diff = Math.max(0, target - now);
  return [
    ["Days", Math.floor(diff / 864e5)],
    ["Hours", Math.floor(diff / 36e5) % 24],
    ["Minutes", Math.floor(diff / 6e4) % 60],
    ["Seconds", Math.floor(diff / 1e3) % 60],
  ] as const;
}

export default function Countdown({ dateISO }: { dateISO: string }) {
  const target = new Date(dateISO).getTime();
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    setNow(Date.now());
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);

  const items = parts(target, now ?? target);
  return (
    <div style={{ display: "flex", justifyContent: "center", gap: "0.6rem" }}>
      {items.map(([label, value]) => (
        <div
          key={label}
          style={{
            width: 66, height: 66, borderRadius: "50%", border: "1px solid rgba(176,149,102,0.4)",
            background: "rgba(176,149,102,0.08)", display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center", gap: 2,
          }}
        >
          <div style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", color: "#a88a55", fontVariantNumeric: "tabular-nums" }}>
            {String(value).padStart(2, "0")}
          </div>
          <div style={{ fontSize: "0.5rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--muted)" }}>
            {label}
          </div>
        </div>
      ))}
    </div>
  );
}
