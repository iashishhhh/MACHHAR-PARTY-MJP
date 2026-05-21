import React, { createContext, useContext } from 'react';
import { useSocialEngagement } from '../hooks/useSocialEngagement';

const SocialContext = createContext(null);

export function SocialProvider({ children }) {
  const value = useSocialEngagement();
  return <SocialContext.Provider value={value}>{children}</SocialContext.Provider>;
}

export function useSocial() {
  const ctx = useContext(SocialContext);
  if (!ctx) {
    throw new Error('useSocial must be used within SocialProvider');
  }
  return ctx;
}
