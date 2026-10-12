"use client";

import { motion } from "framer-motion";
import FlowerWreath from "./FlowerWreath";
import { wedding } from "@/lib/config";

const fade = (delay: number) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 1, ease: [0.22, 1, 0.36, 1] as const },
});

export default function Cover({ onOpen }: { onOpen: () => void }) {
  return (
    <motion.main
      onClick={onOpen}
      role="button"
      tabIndex={0}
      aria-label="Tap to open the invitation"
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && onOpen()}
      exit={{ opacity: 0, scale: 1.08, filter: "blur(10px)" }}
      transition={{ duration: 0.9, ease: "easeInOut" }}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 20,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "2rem 1.5rem",
        cursor: "pointer",
        background: "radial-gradient(ellipse at 50% 40%, #fbf8f1 0%, #f5eee0 60%, #ece1cc 100%)",
      }}
    >
      <motion.p className="caps" style={{ color: "var(--muted)", maxWidth: 300, lineHeight: 1.9 }} {...fade(0.2)}>
        {wedding.tagline}
      </motion.p>

      <div style={{ position: "relative", width: "min(82vw, 320px)", aspectRatio: "1", margin: "0.4rem 0" }}>
        <FlowerWreath />
        <div
          style={{
            position: "absolute", inset: 0, display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center", gap: "0.2rem",
          }}
        >
          <motion.h1 style={{ fontFamily: "var(--font-cover), cursive", fontWeight: 400, fontSize: "clamp(2.4rem, 10.5vw, 3.4rem)", lineHeight: 1.1 }} {...fade(0.7)}>
            {wedding.bride}
          </motion.h1>
          <motion.svg width="48" height="12" viewBox="0 0 48 12" {...fade(1)}>
            <path d="M2 6 Q 8 -2 14 6 T 26 6 T 38 6 T 46 6" fill="none" stroke="#b09566" strokeWidth="1" />
          </motion.svg>
          <motion.h1 style={{ fontFamily: "var(--font-cover), cursive", fontWeight: 400, fontSize: "clamp(2.4rem, 10.5vw, 3.4rem)", lineHeight: 1.1 }} {...fade(1.3)}>
            {wedding.groom}
          </motion.h1>
        </div>
      </div>

      <motion.p
        className="caps"
        style={{ color: "#8f7442", fontSize: "clamp(0.85rem, 3.6vw, 1.05rem)", fontWeight: 600, marginTop: "2.2rem", fontVariantNumeric: "lining-nums" }}
        {...fade(1.7)}
      >
        {wedding.dateLabel}
      </motion.p>

      <motion.div style={{ marginTop: "4.5rem" }} {...fade(2.1)}>
        <motion.div
          animate={{ opacity: [0.55, 1, 0.55], y: [0, -3, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          style={{ display: "inline-block", paddingBottom: 8, borderBottom: "1px solid var(--ink)" }}
        >
          <span className="caps" style={{ letterSpacing: "0.4em", padding: "0 1.5rem", display: "inline-block" }}>
            Tap to open
          </span>
        </motion.div>
        <p className="caps" style={{ color: "#b7ad99", marginTop: "2.2rem", fontSize: "0.62rem", letterSpacing: "0.25em" }}>
         |
        </p>
      </motion.div>
    </motion.main>
  );
}
