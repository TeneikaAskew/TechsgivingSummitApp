
import React, { createContext, useContext } from 'react';
import type { Screen } from './App';

interface NavigationContextType {
  activeScreen: Screen;
  setActiveScreen: (screen: Screen) => void;
}

export const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export const useNavigation = (): NavigationContextType => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
};
