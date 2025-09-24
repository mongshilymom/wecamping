'use client'

import { Building2, TreePine, Coffee } from 'lucide-react'
import { useBusinessStore } from '@/stores/business-store'
import { BusinessType } from '@/types/business'
import { motion } from 'framer-motion'

const businessIcons = {
  pension: Building2,
  camping: TreePine,
  cafe: Coffee,
}

const businessLabels = {
  pension: '펜션',
  camping: '캠핑장',
  cafe: '카페',
}

export function BusinessSwitcher() {
  const { currentBusinessType, setBusinessType } = useBusinessStore()
  
  const businesses: BusinessType[] = ['pension', 'camping', 'cafe']

  return (
    <div className="flex items-center space-x-1 p-1 bg-gray-100 dark:bg-gray-700 rounded-lg">
      {businesses.map((business) => {
        const Icon = businessIcons[business]
        const isActive = currentBusinessType === business
        
        return (
          <motion.button
            key={business}
            onClick={() => setBusinessType(business)}
            className={`relative px-4 py-2 rounded-md transition-colors ${
              isActive
                ? 'text-white shadow-sm'
                : 'text-gray-600 dark:text-gray-300 hover:bg-white/50 dark:hover:bg-gray-600/50'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              backgroundColor: isActive ? 'var(--color-primary)' : 'transparent'
            }}
          >
            <div className="flex items-center space-x-2">
              <Icon className="h-4 w-4" />
              <span className="text-sm font-medium">{businessLabels[business]}</span>
            </div>
          </motion.button>
        )
      })}
    </div>
  )
}