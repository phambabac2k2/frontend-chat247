import {create} from 'zustand';
import {persist} from 'zustand/middleware';
import type {ThemeState} from '@/types/store';

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
        isDarkMode: false,
        toggleDarkMode: () => {
            const newValue = !get().isDarkMode;
            set({isDarkMode: newValue});
            if(newValue){
                document.documentElement.classList.add('dark');
            } else {
                document.documentElement.classList.remove('dark');
            }
        },
        setTheme: (isDark: boolean) => {
            if(isDark){
                document.documentElement.classList.add('dark');
            } else {
                document.documentElement.classList.remove('dark');
            }
            set({isDarkMode: isDark});
        },
      }),
    {name: 'theme-storage'}
    )
);