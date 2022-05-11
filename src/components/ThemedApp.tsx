import React, { createContext, useEffect, useState } from 'react';

import { applyDarkMode } from '@/common/darkMode';

/**
 * Had to to higher-order the appWithTranslation using this
 * function because changing the language would invalidate the
 * values in the DarkModeContext. Having it higher up in the
 * hierarchy fixes this problem.
 */

export const DarkModeContext = createContext({
  darkMode: false,
  setDarkMode: (_v: boolean) => {},
});

export function withDarkMode(WrappedComponent: any) {
  const ThemedApp = (props: any) => {
    const [darkMode, setDarkMode] = useState(false);

    function toggleDarkMode(d: boolean) {
      setDarkMode(d);
      applyDarkMode(d);
    }

    useEffect(() => {
      const matcher = window.matchMedia('(prefers-color-scheme: dark)');
      matcher.addEventListener('change', (e) => toggleDarkMode(e.matches));

      // Setup dark/light mode for the first time
      toggleDarkMode(matcher.matches);

      // Remove listener
      return () => {
        matcher.removeEventListener('change', () => {});
      };
    }, []);

    const darkModeHookValue = { darkMode, setDarkMode };
    return (
      <DarkModeContext.Provider value={darkModeHookValue}>
        <WrappedComponent {...props} />
      </DarkModeContext.Provider>
    );
  };
  return ThemedApp;
}
