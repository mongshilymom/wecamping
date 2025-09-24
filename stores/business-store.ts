import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { BusinessType, BusinessConfig } from '@/types/business'
import { getBusinessConfig } from '@/lib/business-config'

interface BusinessStore {
  currentBusinessType: BusinessType
  businessConfig: BusinessConfig
  theme: 'light' | 'dark' | 'auto'
  language: 'ko' | 'en'
  
  setBusinessType: (type: BusinessType) => void
  setTheme: (theme: 'light' | 'dark' | 'auto') => void
  setLanguage: (language: 'ko' | 'en') => void
  initializeBusiness: () => void
}

export const useBusinessStore = create<BusinessStore>()(
  persist(
    (set, get) => ({
      currentBusinessType: 'pension',
      businessConfig: getBusinessConfig('pension'),
      theme: 'auto',
      language: 'ko',
      
      setBusinessType: (type: BusinessType) => {
        const config = getBusinessConfig(type)
        set({ 
          currentBusinessType: type, 
          businessConfig: config 
        })
        
        // Apply theme colors to CSS variables
        const root = document.documentElement
        root.style.setProperty('--color-primary', config.colors.primary)
        root.style.setProperty('--color-secondary', config.colors.secondary)
        root.style.setProperty('--color-accent', config.colors.accent)
      },
      
      setTheme: (theme: 'light' | 'dark' | 'auto') => {
        set({ theme })
        
        if (theme === 'auto') {
          const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches
          document.documentElement.classList.toggle('dark', isDark)
        } else {
          document.documentElement.classList.toggle('dark', theme === 'dark')
        }
      },
      
      setLanguage: (language: 'ko' | 'en') => {
        set({ language })
      },
      
      initializeBusiness: () => {
        const { currentBusinessType, theme } = get()
        const config = getBusinessConfig(currentBusinessType)
        
        // Apply initial theme
        if (theme === 'auto') {
          const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches
          document.documentElement.classList.toggle('dark', isDark)
        } else {
          document.documentElement.classList.toggle('dark', theme === 'dark')
        }
        
        // Apply business colors
        const root = document.documentElement
        root.style.setProperty('--color-primary', config.colors.primary)
        root.style.setProperty('--color-secondary', config.colors.secondary)
        root.style.setProperty('--color-accent', config.colors.accent)
      },
    }),
    {
      name: 'business-store',
    }
  )
)