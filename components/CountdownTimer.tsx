"use client";

import { useEffect, useState } from "react";

function getRemaining(endsAt: string) {
  const diff = new Date(endsAt).getTime() - Date.now();

  const clamped = Math.max(0, diff);

  return {
    hours: Math.floor(clamped / (1000 * 60 * 60)),
    minutes: Math.floor((clamped / (1000 * 60)) % 60),
    seconds: Math.floor((clamped / 1000) % 60),
    done: clamped <= 0,
  };
}

function pad(n: number) {
  return n.toString().padStart(2, "0");
}

export default function CountdownTimer({ endsAt }: { endsAt: string }) {
  const [mounted, setMounted] = useState(false);

  const [remaining, setRemaining] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
    done: false,
  });

  useEffect(() => {
    setMounted(true);

    const update = () => {
      setRemaining(getRemaining(endsAt));
    };

    update();

    const interval = setInterval(update, 1000);

    return () => clearInterval(interval);
  }, [endsAt]);

  if (!mounted) {
    return (
      <div className="flex items-center gap-1 font-mono text-xs font-bold text-white">
        <span className="rounded bg-black/30 px-1.5 py-0.5">--</span>
        <span>:</span>
        <span className="rounded bg-black/30 px-1.5 py-0.5">--</span>
        <span>:</span>
        <span className="rounded bg-black/30 px-1.5 py-0.5">--</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-1 font-mono text-xs font-bold text-white">
      <span className="rounded bg-black/30 px-1.5 py-0.5">
        {pad(remaining.hours)}
      </span>
      <span>:</span>
      <span className="rounded bg-black/30 px-1.5 py-0.5">
        {pad(remaining.minutes)}
      </span>
      <span>:</span>
      <span className="rounded bg-black/30 px-1.5 py-0.5">
        {pad(remaining.seconds)}
      </span>
    </div>
  );
}