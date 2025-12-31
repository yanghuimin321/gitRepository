import { ref } from 'vue'
import { defineStore } from 'pinia'
import * as func from '@/stores/function'

export const useThemeStore = defineStore('theme', () => {
  const theme = ref(func.theme_local.get().theme || 'blue')

  function selectTheme(param) {
    theme.value = param
  }

  return { theme, selectTheme }
})
