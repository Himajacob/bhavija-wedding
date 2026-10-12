"use client";

import { motion, type Variants } from "framer-motion";
import Countdown from "./Countdown";
import { wedding } from "@/lib/config";

const GOLD = "#b09566";
const INK = "#3b3428";
const MUTED = "#8a7f6c";
const display = "var(--font-display), Georgia, serif";

const reveal: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
};

const label = {
  textTransform: "uppercase" as const,
  letterSpacing: "0.3em",
  fontSize: "0.68rem",
  color: GOLD,
};

function Section({ children, bg }: { children: React.ReactNode; bg?: string }) {
  return (
    <section style={{ background: bg }}>
      <motion.div
        variants={reveal}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-8% 0px" }}
        style={{ padding: "3.5rem 1.5rem", textAlign: "center", maxWidth: 480, margin: "0 auto" }}
      >
        {children}
      </motion.div>
    </section>
  );
}

const Flourish = () => (
  <svg width="180" height="14" viewBox="0 0 180 14" fill="none" stroke="#cdbb95" strokeWidth="1.3" style={{ display: "block", margin: "0 auto 1.1rem" }} aria-hidden>
    <path d="M4 7 Q 15 -1 26 7 T 48 7 T 70 7 T 92 7 T 114 7 T 136 7 T 158 7 T 176 7" />
    <path d="M4 9 Q 15 3 26 9 T 48 9 T 70 9 T 92 9 T 114 9 T 136 9 T 158 9 T 176 9" opacity="0.6" />
  </svg>
);

const Title = ({ children }: { children: React.ReactNode }) => (
  <>
    <Flourish />
    <h2 style={{ fontFamily: display, fontWeight: 400, fontSize: "1.9rem", color: INK, marginBottom: "2rem" }}>{children}</h2>
  </>
);

const Laurel = ({ side }: { side: "left" | "right" }) => (
  <svg
    viewBox="0 0 80 200"
    aria-hidden
    style={{
      position: "absolute", bottom: 0, [side]: 0, width: 80, height: 200, opacity: 0.35,
      transform: side === "right" ? "scaleX(-1)" : undefined, pointerEvents: "none",
    }}
  >
    {Array.from({ length: 9 }, (_, i) => (
      <ellipse key={i} cx={10 + i * 2.5} cy={190 - i * 20} rx="16" ry="5" fill="#e6dcc6" transform={`rotate(${-20 - i * 3} ${10 + i * 2.5} ${190 - i * 20})`} />
    ))}
  </svg>
);

const Heart = ({ size }: { size: number }) => (
  <svg width={size} height={size * 0.9} viewBox="0 0 24 22" fill="currentColor" aria-hidden>
    <path d="M12 21 2.5 11.5A5.7 5.7 0 0 1 12 4.6a5.7 5.7 0 0 1 9.5 6.9L12 21z" />
  </svg>
);

const SCALLOPS = 36;

/** Scalloped beige ring with tiny pearls, like a lace-edged frame; pearls shimmer in a slow wave. */
function PetalRing() {
  return (
    <motion.svg
      viewBox="0 0 240 240"
      aria-hidden
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.2, delay: 0.3 }}
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
    >
      <circle cx="120" cy="120" r="104" fill="none" stroke="#e4dcc8" strokeWidth="14" />
      {Array.from({ length: SCALLOPS }, (_, i) => {
        const a = (i / SCALLOPS) * Math.PI * 2;
        return <circle key={i} cx={120 + Math.cos(a) * 110} cy={120 + Math.sin(a) * 110} r="8.5" fill="#e4dcc8" />;
      })}
      {Array.from({ length: SCALLOPS }, (_, i) => {
        const a = ((i + 0.5) / SCALLOPS) * Math.PI * 2;
        return (
          <motion.circle
            key={i}
            cx={120 + Math.cos(a) * 112} cy={120 + Math.sin(a) * 112} r="1.8" fill="#fffdf6"
            animate={{ opacity: [0.35, 1, 0.35] }}
            transition={{ duration: 3, delay: i * 0.08, repeat: Infinity, ease: "easeInOut" }}
          />
        );
      })}
      <circle cx="120" cy="120" r="97" fill="none" stroke="#d6cbb0" strokeWidth="1" opacity="0.7" />
    </motion.svg>
  );
}

function Family({ title, names }: { title: string; names: readonly string[] }) {
  return (
    <div style={{ border: "1px solid rgba(176,149,102,0.25)", background: "rgba(176,149,102,0.07)", padding: "1.6rem 1rem", marginBottom: "1.2rem" }}>
      <p style={{ ...label, fontSize: "0.62rem", marginBottom: "1rem" }}>{title}</p>
      {names.map((n) => (
        <p key={n} style={{ fontSize: "1rem", color: INK, lineHeight: 2.1 }}>{n}</p>
      ))}
    </div>
  );
}

export default function Details() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2 }}
      style={{ fontFamily: "var(--font-body), Georgia, serif", background: "#faf7ef", color: INK }}
    >
      {/* Hero */}
      <section
        style={{
          position: "relative", minHeight: "100svh", display: "flex", flexDirection: "column", alignItems: "center",
          justifyContent: "center", textAlign: "center", padding: "3rem 1.5rem 4rem", overflow: "hidden",
        }}
      >
        <Laurel side="left" />
        <Laurel side="right" />
        <motion.p
          style={{ ...label, color: "#c4a56f", fontSize: "0.62rem", letterSpacing: "0.35em" }}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 1.2 }}
        >
          {wedding.heroTagline}
        </motion.p>

        <div style={{ position: "relative", width: "min(66vw, 250px)", aspectRatio: "1", margin: "2rem 0 1.6rem" }}>
          <PetalRing />
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5, duration: 1.2 }}
            style={{ position: "absolute", inset: "10%", borderRadius: "50%", overflow: "hidden" }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={wedding.photo}
              alt={`${wedding.bride} & ${wedding.groom}`}
              style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "50% 30%", display: "block" }}
            />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9, duration: 1 }}
          style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem", color: GOLD }}
        >
          <h1 style={{ fontFamily: "var(--font-cover), cursive", fontWeight: 400, fontSize: "3.2rem", lineHeight: 1.1, color: INK }}>{wedding.bride}</h1>
          <Heart size={18} />
          <h1 style={{ fontFamily: "var(--font-cover), cursive", fontWeight: 400, fontSize: "3.2rem", lineHeight: 1.1, color: INK }}>{wedding.groom}</h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4, duration: 1 }}
          style={{ maxWidth: 300, margin: "2rem auto 1.8rem", fontSize: "1.05rem", lineHeight: 1.7, color: "#6f6657" }}
        >
          {wedding.heroMessage}
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6, duration: 1 }}
          style={{ ...label, fontSize: "0.72rem", marginBottom: "1.4rem" }}
        >
          {wedding.dateLabel}
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8, duration: 1 }}
          style={{ fontSize: "0.8rem", letterSpacing: "0.12em", color: "#a39a86" }}
        >
          {wedding.heroSignoff}
        </motion.p>
      </section>

      {/* Save the date */}
      <Section bg="#f3ece0">
        <Title>Save the Date</Title>
        <div style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", alignItems: "center" }}>
          <p style={{ ...label, fontSize: "0.6rem", letterSpacing: "0.2em", color: "#a39a86" }}>{wedding.weekday}</p>
          <div style={{ padding: "0.8rem 1.6rem", borderLeft: "1px solid rgba(176,149,102,0.3)", borderRight: "1px solid rgba(176,149,102,0.3)" }}>
            <div style={{ fontFamily: display, fontSize: "3.4rem", lineHeight: 1, color: GOLD }}>{wedding.day}</div>
            <div style={{ fontSize: "0.72rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "#2f3b52", marginTop: "0.5rem" }}>
              {wedding.month}
            </div>
          </div>
          <p style={{ ...label, fontSize: "0.6rem", letterSpacing: "0.2em", color: "#a39a86" }}>{wedding.year}</p>
        </div>
        <p style={{ ...label, fontSize: "0.7rem", letterSpacing: "0.25em", marginTop: "2.2rem" }}>At {wedding.time}</p>
      </Section>

      {/* Countdown */}
      <Section>
        <Title>Counting Down</Title>
        <Countdown dateISO={wedding.dateISO} />
      </Section>

      {/* Events */}
      <Section bg="#f3ece0">
        <Title>Our Wedding Events</Title>
        {wedding.events.map((e) => (
          <div
            key={`${e.title}-${e.when}`}
            style={{
              border: "1px solid rgba(176,149,102,0.25)", background: "rgba(176,149,102,0.07)",
              padding: "1.8rem 1.2rem", marginBottom: "1.2rem",
            }}
          >
            <p style={{ ...label, fontSize: "0.6rem", letterSpacing: "0.25em" }}>{e.weekday}</p>
            <h3 style={{ fontFamily: display, fontWeight: 400, fontSize: "1.45rem", letterSpacing: "0.12em", textTransform: "uppercase", margin: "0.8rem 0 0.7rem" }}>
              {e.title}
            </h3>
            <p style={{ fontSize: "0.9rem", color: MUTED }}>{e.when}</p>
            <p style={{ fontSize: "0.95rem", marginTop: "0.7rem" }}>{e.venue}</p>
            {e.note && (
              <p style={{ fontSize: "0.75rem", fontStyle: "italic", color: MUTED, marginTop: "0.6rem", lineHeight: 1.5 }}>{e.note}</p>
            )}
            <a
              href={e.mapUrl}
              target="_blank"
              rel="noreferrer"
              style={{ ...label, fontSize: "0.65rem", letterSpacing: "0.2em", display: "inline-flex", alignItems: "center", gap: 6, marginTop: "1.1rem" }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
                <path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z" />
                <circle cx="12" cy="9.5" r="2.5" />
              </svg>
              View Location
            </a>
          </div>
        ))}
      </Section>

      {/* Blessings */}
      <Section>
        <Title>With Blessings From</Title>
        <Family title="Bride's Family" names={wedding.brideFamily} />
        <Family title="Groom's Family" names={wedding.groomFamily} />
      </Section>

      {/* Footer */}
      <Section>
        <div
          style={{
            width: 64, height: 64, borderRadius: "50%", border: "1px solid rgba(176,149,102,0.35)", margin: "1rem auto 1.8rem",
            display: "flex", alignItems: "center", justifyContent: "center", gap: 6, color: GOLD, fontSize: "0.8rem",
          }}
        >
          {wedding.bride[0]}
          <Heart size={10} />
          {wedding.groom[0]}
        </div>
        <p style={{ color: MUTED, fontSize: "0.95rem" }}>{wedding.closing}</p>
        <p style={{ fontFamily: "var(--font-cover), cursive", fontSize: "1.8rem", marginTop: "1.2rem" }}>
          {wedding.bride} &amp; {wedding.groom}
        </p>
        <div style={{ height: "3rem" }} />
      </Section>
    </motion.div>
  );
}
