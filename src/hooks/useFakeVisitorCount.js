import { useEffect, useState } from 'react';

const STORAGE_KEY = 'mjp_fake_visitor_count';
const TICK_MS = 30_000;
const MIN_START = 14_001;

function readStoredCount() {
  const saved = sessionStorage.getItem(STORAGE_KEY);
  if (saved != null) {
    const n = parseInt(saved, 10);
    if (!Number.isNaN(n) && n > 14_000) return n;
  }
  const initial = 14_000 + Math.floor(Math.random() * 1200) + 1;
  sessionStorage.setItem(STORAGE_KEY, String(initial));
  return initial;
}

/** Fake public visitor count: starts above 14k, +1–3 every 30s. */
export function useFakeVisitorCount() {
  const [count, setCount] = useState(readStoredCount);

  useEffect(() => {
    const id = setInterval(() => {
      setCount((prev) => {
        const next = prev + Math.floor(Math.random() * 3) + 1;
        sessionStorage.setItem(STORAGE_KEY, String(next));
        return next;
      });
    }, TICK_MS);
    return () => clearInterval(id);
  }, []);

  return count;
}
