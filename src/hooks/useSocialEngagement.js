import { useCallback, useState } from 'react';

const LS_COMMENTS = 'mjp_user_comments';
const LS_LIKED = 'mjp_user_liked';

function loadLocalComments() {
  try {
    const raw = localStorage.getItem(LS_COMMENTS);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveLocalComments(list) {
  localStorage.setItem(LS_COMMENTS, JSON.stringify(list));
}

function normalizeComment(entry) {
  return {
    id: entry.id || `local-${entry.createdAt || Date.now()}`,
    quote: String(entry.quote || '').trim(),
    author: entry.author?.trim() || 'Anonymous Citizen',
    role: entry.role || 'Citizen',
    rating: entry.rating ?? 5,
    ratingType: entry.ratingType || '🦟',
    createdAt: entry.createdAt || Date.now(),
    isUser: true,
  };
}

export function useSocialEngagement() {
  const [comments, setComments] = useState(() =>
    loadLocalComments()
      .map(normalizeComment)
      .filter((c) => c.quote)
      .sort((a, b) => b.createdAt - a.createdAt)
  );

  const [hasLiked, setHasLiked] = useState(
    () => localStorage.getItem(LS_LIKED) === 'true'
  );

  const addComment = useCallback((author, quote) => {
    const trimmedQuote = String(quote || '').trim();
    if (!trimmedQuote) {
      return { ok: false, error: 'Please write your comment before posting.' };
    }

    const newComment = normalizeComment({
      id: `local-${Date.now()}`,
      quote: trimmedQuote,
      author: String(author || '').trim() || 'Anonymous Citizen',
      role: 'Citizen',
      rating: 5,
      ratingType: '🦟',
      createdAt: Date.now(),
      isUser: true,
    });

    setComments((prev) => {
      const next = [newComment, ...prev];
      saveLocalComments(next);
      return next;
    });

    return { ok: true };
  }, []);

  const deleteComment = useCallback((id) => {
    setComments((prev) => {
      const next = prev.filter((c) => c.id !== id);
      saveLocalComments(next);
      return next;
    });
    return { ok: true };
  }, []);

  const clearAllComments = useCallback(() => {
    setComments([]);
    saveLocalComments([]);
    return { ok: true };
  }, []);

  const toggleLike = useCallback(() => {
    const willLike = !hasLiked;
    setHasLiked(willLike);
    localStorage.setItem(LS_LIKED, String(willLike));
    return { ok: true, liked: willLike };
  }, [hasLiked]);

  const shareOnWhatsApp = useCallback(() => {
    const url = typeof window !== 'undefined' ? window.location.href : '';
    const text = [
      '🦟🚨 *MACHHAR JANTA PARTY — OFFICIAL SITE*',
      '',
      '⚠️ *Warning:* Opens at 2 AM automatically in your brain.',
      '',
      '✅ Live mosquito bite counter',
      '✅ Join the party (blood group mandatory 😂)',
      '✅ Citizen testimonials — *real suffering*',
      '✅ Party anthem — *ears will buzz*',
      '',
      '🩸 Slogan: *"Khoon sabka piyenge."*',
      '',
      '👇 *Tap link NOW — before tonight\'s squadron arrives:*',
      url,
      '',
      'Forward to 3 friends who "love" ceiling fan Speed 3 🦟🔥',
    ].join('\n');
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
  }, []);

  return {
    comments,
    hasLiked,
    addComment,
    deleteComment,
    clearAllComments,
    toggleLike,
    shareOnWhatsApp,
  };
}
