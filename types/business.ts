export type BusinessType = 'pension' | 'camping' | 'cafe'

export interface BusinessConfig {
  type: BusinessType
  name: string
  description: string
  colors: {
    primary: string
    secondary: string
    accent: string
  }
  features: BusinessFeatures
  settings: BusinessSettings
}

export interface BusinessFeatures {
  reservation: boolean
  gallery: boolean
  menu: boolean
  events: boolean
  reviews: boolean
  blog: boolean
  contact: boolean
}

export interface BusinessSettings {
  currency: string
  timezone: string
  language: 'ko' | 'en'
  theme: 'light' | 'dark' | 'auto'
  booking: BookingSettings
}

export interface BookingSettings {
  enabled: boolean
  advanceBookingDays: number
  minStayNights: number
  maxStayNights: number
  checkInTime: string
  checkOutTime: string
  cancellationPolicy: string
}

export interface Room {
  id: string
  name: string
  description: string
  capacity: number
  price: number
  images: string[]
  amenities: string[]
  available: boolean
}

export interface Reservation {
  id: string
  roomId: string
  customerName: string
  customerPhone: string
  customerEmail: string
  checkIn: Date
  checkOut: Date
  guests: number
  totalPrice: number
  status: 'pending' | 'confirmed' | 'cancelled'
  createdAt: Date
}