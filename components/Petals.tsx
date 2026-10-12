"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

type Petal = { id: number; x: number; size: number; dur: number; delay: number; drift: number; hue: string };

const hues = ["#f0b3c1", "#f7d2da", "#e89fb1", "#fbe3e8"];

export default function Petals({ count = 14 }: { count?: number }) {
  const [petals, setPetals] = useState<Petal[]>([]);

  useEffect(() => {
    setPetals(
      Array.from({ length: count }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        size: 10 + Math.random() * 14,
        dur: 9 + Math.random() * 9,
        delay: -Math.random() * 16,
        drift: (Math.random() - 0.5) * 140,
        hue: hues[i % hues.length],
      })),
    );
  }, [count]);

  return (
    <div aria-hidden style={{ position: "fixed", inset: 0, pointerEvents: "none", overflow: "hidden", zIndex: 25 }}>
      {petals.map((p) => (
        <motion.span
          key={p.id}
          initial={{ y: "-8vh", x: 0, rotate: 0, opacity: 0 }}
          animate={{
            y: "108vh",
            x: [0, p.drift, -p.drift / 2, p.drift / 3],
            rotate: [0, 160, 320, 540],
            opacity: [0, 0.85, 0.85, 0],
          }}
          transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, ease: "linear" }}
          style={{
            position: "absolute",
            left: `${p.x}%`,
            width: p.size * 0.65,
            height: p.size,
            background: p.hue,
            borderRadius: "70% 0 70% 0",
          }}
        />
      ))}
    </div>
  );
}
