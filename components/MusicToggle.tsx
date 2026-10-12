"use client";

import { motion } from "framer-motion";

export default function MusicToggle({ playing, onToggle }: { playing: boolean; onToggle: () => void }) {
  return (
    <motion.button
      onClick={onToggle}
      aria-label={playing ? "Mute music" : "Play music"}
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      whileTap={{ scale: 0.9 }}
      style={{
        position: "fixed", bottom: "max(1rem, env(safe-area-inset-bottom))", right: "1rem", zIndex: 30,
        width: 46, height: 46, borderRadius: "50%", background: "rgba(250,247,239,0.92)",
        backdropFilter: "blur(8px)", border: "1px solid rgba(176,149,102,0.55)", color: "#a88a55",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}
    >
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 5 6 9H2v6h4l5 4V5z" />
        {playing ? (
          <>
            <path d="M15.5 8.5a5 5 0 0 1 0 7" />
            <path d="M18.5 5.5a9 9 0 0 1 0 13" />
          </>
        ) : (
          <>
            <path d="m16 9 5 6" />
            <path d="m21 9-5 6" />
          </>
        )}
      </svg>
    </motion.button>
  );
}
