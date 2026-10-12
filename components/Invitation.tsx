"use client";

import { useCallback, useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";
import Cover from "./Cover";
import Details from "./Details";
import Petals from "./Petals";
import MusicToggle from "./MusicToggle";
import { wedding } from "@/lib/config";

export default function Invitation() {
  const [opened, setOpened] = useState(false);
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const open = useCallback(() => {
    setOpened(true);
    window.scrollTo(0, 0);
    // Must start inside the tap handler so mobile browsers allow audio.
    audioRef.current?.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
  }, []);

  const toggle = () => {
    const a = audioRef.current;
    if (!a) return;
    if (a.paused) a.play().then(() => setPlaying(true)).catch(() => {});
    else {
      a.pause();
      setPlaying(false);
    }
  };

  return (
    <>
      <audio ref={audioRef} src={wedding.music} loop preload="auto" />
      <AnimatePresence>{!opened && (
          <>
            <Petals />
            <Cover onOpen={open} />
          </>
        )}</AnimatePresence>
      {opened && (
        <>
          <MusicToggle playing={playing} onToggle={toggle} />
          <Details />
        </>
      )}
    </>
  );
}
