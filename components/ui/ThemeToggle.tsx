'use client'

import { Sun, Moon, Monitor } from 'lucide-react'
import { useBusinessStore } from '@/stores/business-store'
import { useEffect } from 'react'

export function ThemeToggle() {
  const { theme, setTheme } = useBusinessStore()

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    
    const handleChange = () => {
      if (theme === 'auto') {
        document.documentElement.classList.toggle('dark', mediaQuery.matches)
      }
    }

    handleChange()
    mediaQuery.addEventListener('change', handleChange)
    
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [theme])

  const themes = [
    { value: 'light', icon: Sun, label: '라이트' },
    { value: 'dark', icon: Moon, label: '다크' },
    { value: 'auto', icon: Monitor, label: '자동' },
  ] as const

  return (
    <div className="flex items-center space-x-2 p-1 bg-gray-100 dark:bg-gray-700 rounded-lg">
      {themes.map(({ value, icon: Icon, label }) => (
        <button
          key={value}
          onClick={() => setTheme(value)}
          className={`p-2 rounded-md transition-colors ${
            theme === value
              ? 'bg-white dark:bg-gray-600 shadow-sm'
              : 'hover:bg-white/50 dark:hover:bg-gray-600/50'
          }`}
          title={label}
        >
          <Icon className="h-4 w-4" />
        </button>
      ))}
    </div>
  )
}