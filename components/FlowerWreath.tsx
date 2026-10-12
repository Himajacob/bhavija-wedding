"use client";

import { motion } from "framer-motion";

const TAU = Math.PI * 2;
const BRANCH = "#8b765b";
const LEAF = "#a9b88f";

/** Wavy circular strand of "bark". */
function strand(r: number, amp: number, waves: number, phase: number) {
  const steps = 160;
  let d = "";
  for (let i = 0; i <= steps; i++) {
    const t = (i / steps) * TAU;
    const rr = r + amp * Math.sin(waves * t + phase);
    const x = 120 + rr * Math.cos(t);
    const y = 120 + rr * Math.sin(t);
    d += `${i === 0 ? "M" : "L"}${x.toFixed(2)} ${y.toFixed(2)} `;
  }
  return d + "Z";
}

const LEAF_D = "M0 0 C 4 -3, 5 -9, 0 -14 C -5 -9, -4 -3, 0 0 Z";

function Leaf({ x, y, rot, delay }: { x: number; y: number; rot: number; delay: number }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot})`}>
      <motion.path
        d={LEAF_D}
        fill={LEAF}
        stroke="#8fa072"
        strokeWidth="0.4"
        style={{ transformOrigin: "0px 0px" }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: [0, 1.1, 1], opacity: 1, rotate: [0, 7, -7, 0] }}
        transition={{
          scale: { delay, duration: 0.9 },
          opacity: { delay, duration: 0.5 },
          rotate: { delay: delay + 1, duration: 5 + (delay % 2), repeat: Infinity, ease: "easeInOut" },
        }}
      />
    </g>
  );
}

function Blossom({ x, y, size, rot, delay }: { x: number; y: number; size: number; rot: number; delay: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${size}) rotate(${rot})`}>
      <motion.g
        style={{ transformOrigin: "0px 0px" }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: [0, 1.2, 1, 1.1, 1], opacity: 1 }}
        transition={{
          scale: { delay, duration: 4.5, times: [0, 0.18, 0.4, 0.7, 1], repeat: Infinity },
          opacity: { delay, duration: 0.5 },
        }}
      >
        {[0, 72, 144, 216, 288].map((a) => (
          <circle key={a} cx="0" cy="-6" r="5.4" fill="#fff" stroke="#d9d0bb" strokeWidth="0.45" transform={`rotate(${a})`} />
        ))}
        <circle r="2.8" fill="#f2cf74" />
        {[0, 60, 120, 180, 240, 300].map((a) => (
          <circle key={a} cx="0" cy="-1.9" r="0.5" fill="#c99a2e" transform={`rotate(${a})`} />
        ))}
      </motion.g>
    </g>
  );
}

const TWIGS = 20;
const BIG = 7;

/** Round wreath of bare branches, leaves and white blossoms. Draws in, blooms, sways and slowly turns. */
export default function FlowerWreath() {
  const R = 104;
  const twigs = Array.from({ length: TWIGS }, (_, i) => {
    const t = (i / TWIGS) * TAU;
    const rr = R + 3 * Math.sin(5 * t);
    const bx = 120 + rr * Math.cos(t);
    const by = 120 + rr * Math.sin(t);
    const out = i % 2 === 0 ? 1 : -1;
    const angle = (t * 180) / Math.PI + 90 - out * 38; // follows the strand, angled in/out
    const len = 15 + (i % 3) * 3;
    return { i, bx, by, angle, len, delay: 0.9 + i * 0.08, flower: i % 3 === 1 };
  });

  return (
    <motion.svg
      viewBox="0 0 240 240"
      aria-hidden
      animate={{ rotate: 360 }}
      transition={{ duration: 200, repeat: Infinity, ease: "linear" }}
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", overflow: "visible" }}
    >
      {/* main branches */}
      <motion.path
        d={strand(R, 3, 5, 0)} fill="none" stroke={BRANCH} strokeWidth="1.8" strokeLinecap="round"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2.4, ease: "easeInOut" }}
      />
      <motion.path
        d={strand(R - 3, 2.5, 4, 1.4)} fill="none" stroke="#b09d80" strokeWidth="1" strokeLinecap="round"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2.8, ease: "easeInOut", delay: 0.2 }}
      />

      {/* twigs with leaves and tip blossoms */}
      {twigs.map((w) => (
        <g key={w.i} transform={`translate(${w.bx} ${w.by}) rotate(${w.angle})`}>
          <motion.path
            d={`M0 0 Q ${w.len * 0.5} -3 ${w.len} -1`} fill="none" stroke={BRANCH} strokeWidth="1" strokeLinecap="round"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: w.delay - 0.3, duration: 0.8 }}
          />
          <Leaf x={w.len * 0.45} y={-2.2} rot={-65} delay={w.delay + 0.2} />
          <Leaf x={w.len * 0.7} y={-1.6} rot={60} delay={w.delay + 0.4} />
          <Leaf x={w.len} y={-1} rot={0} delay={w.delay + 0.5} />
          {w.flower && <Blossom x={w.len} y={-1} size={0.62} rot={w.i * 23} delay={w.delay + 0.6} />}
        </g>
      ))}

      {/* large blossoms sitting on the main branch */}
      {Array.from({ length: BIG }, (_, i) => {
        const t = ((i + 0.5) / BIG) * TAU;
        const rr = R + 3 * Math.sin(5 * t);
        return (
          <Blossom
            key={i}
            x={120 + rr * Math.cos(t)} y={120 + rr * Math.sin(t)}
            size={i % 2 === 0 ? 1.15 : 0.9} rot={i * 31} delay={1.6 + i * 0.18}
          />
        );
      })}
    </motion.svg>
  );
}
