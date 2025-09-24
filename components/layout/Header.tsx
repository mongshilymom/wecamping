'use client'

import { useState } from 'react'
import { Menu, X, Globe } from 'lucide-react'
import { BusinessSwitcher } from '@/components/business/BusinessSwitcher'
import { ThemeToggle } from '@/components/ui/ThemeToggle'
import { useBusinessStore } from '@/stores/business-store'
import { useLanguageStore } from '@/stores/language-store'
import Link from 'next/link'

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { businessConfig } = useBusinessStore()
  const { language, setLanguage, t } = useLanguageStore()

  const toggleLanguage = () => {
    setLanguage(language === 'ko' ? 'en' : 'ko')
  }

  const navigation = [
    { name: t('nav.home'), href: '/' },
    { name: t('nav.rooms'), href: '/rooms' },
    { name: t('nav.reservation'), href: '/reservation' },
    { name: t('nav.gallery'), href: '/gallery' },
    { name: t('nav.contact'), href: '/contact' },
  ]

  return (
    <header className="bg-white dark:bg-gray-900 shadow-lg sticky top-0 z-50">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center space-x-2">
              <div 
                className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold"
                style={{ backgroundColor: businessConfig.colors.primary }}
              >
                {businessConfig.name.charAt(0)}
              </div>
              <span className="text-xl font-bold" style={{ color: businessConfig.colors.primary }}>
                {businessConfig.name}
              </span>
            </Link>
            <BusinessSwitcher />
          </div>

          <div className="hidden md:flex items-center space-x-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-700 dark:text-gray-300 hover:text-primary transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={toggleLanguage}
              className="flex items-center space-x-1 px-3 py-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <Globe className="h-4 w-4" />
              <span className="text-sm">{language.toUpperCase()}</span>
            </button>
            
            <ThemeToggle />
            
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 dark:border-gray-700">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block px-3 py-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}