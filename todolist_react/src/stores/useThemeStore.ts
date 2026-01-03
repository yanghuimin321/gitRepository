import { create } from 'zustand'
import * as func from './function'

interface ThemeState {
  theme: string
  selectTheme: (string) => void
}

export const useThemeStore = create<ThemeState>((set) => ({
  theme: func.theme_local.get().theme || 'blue',
  selectTheme: (newTheme) => {
    set({ theme: newTheme })
    func.theme_local.set({ theme: newTheme })
  }
}))
