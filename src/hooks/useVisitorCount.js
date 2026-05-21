import { useEffect, useState } from 'react';
import { ref, onValue, runTransaction } from 'firebase/database';
import { db } from '../firebase';

const VISITED_KEY = 'mjp_has_visited';

/**
 * Live Firebase visitorCount listener + first-visit increment.
 * Mount once (e.g. in App.jsx) and pass count to children.
 */
export function useVisitorCount() {
  const [count, setCount] = useState(() => {
    const cached = localStorage.getItem('mjp_total_visits');
    return cached != null ? Number(cached) || 0 : 0;
  });

  useEffect(() => {
    if (!db) {
      let visits = Number(localStorage.getItem('mjp_total_visits')) || 0;
      if (!localStorage.getItem(VISITED_KEY)) {
        visits += 1;
        localStorage.setItem('mjp_total_visits', String(visits));
        localStorage.setItem(VISITED_KEY, 'true');
      }
      setCount(visits);
      return;
    }

    const countRef = ref(db, 'visitorCount');

    if (!localStorage.getItem(VISITED_KEY)) {
      runTransaction(countRef, (currentCount) => (currentCount || 0) + 1).catch(
        (err) => console.error('Firebase transaction failed (check rules):', err)
      );
      localStorage.setItem(VISITED_KEY, 'true');
    }

    const unsubscribe = onValue(
      countRef,
      (snapshot) => {
        const data = snapshot.val();
        const next = typeof data === 'number' ? data : Number(data) || 0;
        setCount(next);
        localStorage.setItem('mjp_total_visits', String(next));
      },
      (error) => {
        console.error('Firebase read error (visitorCount):', error);
        const fallback = Number(localStorage.getItem('mjp_total_visits')) || 0;
        setCount(fallback);
      }
    );

    return () => unsubscribe();
  }, []);

  return count;
}
