'use client'

import { useEffect } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { useBusinessStore } from '@/stores/business-store'

const queryClient = new QueryClient()

export function Providers({ children }: { children: React.ReactNode }) {
  const initializeBusiness = useBusinessStore(state => state.initializeBusiness)
  
  useEffect(() => {
    initializeBusiness()
  }, [initializeBusiness])

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}