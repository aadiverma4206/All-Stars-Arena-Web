import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Safely resolve initial theme: 'dark' or 'light'
const getInitialTheme = () => {
  if (typeof window === 'undefined') return 'dark';
  try {
    const raw = localStorage.getItem('all_stars_arena_theme_preference');
    if (raw) {
      const parsed = JSON.parse(raw);
      const saved = parsed?.state?.theme;
      if (saved === 'light' || saved === 'dark') {
        return saved;
      }
    }
  } catch {
    // Fallback to media query or dark
  }

  // Default to system preference if light, otherwise default dark for arena sports aesthetic
  if (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
    return 'light';
  }
  return 'dark';
};

export const useThemeStore = create(
  persist(
    (set, get) => ({
      theme: getInitialTheme(),

      setTheme: (newTheme) => {
        const validated = newTheme === 'light' ? 'light' : 'dark';
        set({ theme: validated });
        get().applyTheme(validated);
      },

      toggleTheme: () => {
        const current = get().theme;
        const next = current === 'dark' ? 'light' : 'dark';
        set({ theme: next });
        get().applyTheme(next);
      },

      applyTheme: (overrideTheme) => {
        const activeTheme = overrideTheme || get().theme;
        const isDark = activeTheme === 'dark';

        if (typeof document !== 'undefined') {
          if (isDark) {
            document.documentElement.classList.add('dark');
          } else {
            document.documentElement.classList.remove('dark');
          }
        }
      },

      listenToSystemChanges: () => {
        if (typeof window === 'undefined' || !window.matchMedia) return;
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const handleChange = (e) => {
          // If no user preference is manually saved yet, follow system
          try {
            const raw = localStorage.getItem('all_stars_arena_theme_preference');
            if (!raw) {
              const next = e.matches ? 'dark' : 'light';
              get().setTheme(next);
            }
          } catch {
            // Ignore storage access errors
          }
        };
        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
      }
    }),
    {
      name: 'all_stars_arena_theme_preference',
      // Auto-migrate legacy 'system' value to 'dark' or 'light'
      migrate: (persistedState) => {
        if (!persistedState || persistedState.theme === 'system' || !persistedState.theme) {
          const fallback = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
          return {
            ...persistedState,
            theme: fallback
          };
        }
        return persistedState;
      }
    }
  )
);

export default useThemeStore;
