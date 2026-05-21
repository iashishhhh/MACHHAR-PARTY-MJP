import React, { createContext, useContext } from 'react';
import { useFakeVisitorCount } from '../hooks/useFakeVisitorCount';

const FakeVisitorContext = createContext(0);

export function FakeVisitorProvider({ children }) {
  const count = useFakeVisitorCount();
  return (
    <FakeVisitorContext.Provider value={count}>{children}</FakeVisitorContext.Provider>
  );
}

export function useFakeVisitor() {
  return useContext(FakeVisitorContext);
}
