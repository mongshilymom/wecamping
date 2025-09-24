import { BusinessConfig, BusinessType } from '@/types/business'

export const businessConfigs: Record<BusinessType, BusinessConfig> = {
  pension: {
    type: 'pension',
    name: '펜션',
    description: '자연 속 힐링 펜션',
    colors: {
      primary: '#8B7355',
      secondary: '#fbf8f0',
      accent: '#6B5B47',
    },
    features: {
      reservation: true,
      gallery: true,
      menu: false,
      events: true,
      reviews: true,
      blog: true,
      contact: true,
    },
    settings: {
      currency: 'KRW',
      timezone: 'Asia/Seoul',
      language: 'ko',
      theme: 'auto',
      booking: {
        enabled: true,
        advanceBookingDays: 180,
        minStayNights: 1,
        maxStayNights: 7,
        checkInTime: '15:00',
        checkOutTime: '11:00',
        cancellationPolicy: '취소 정책에 따라 환불됩니다.',
      },
    },
  },
  camping: {
    type: 'camping',
    name: '캠핑장',
    description: '자연과 함께하는 캠핑 체험',
    colors: {
      primary: '#2D5016',
      secondary: '#E8F5E8',
      accent: '#4A7C59',
    },
    features: {
      reservation: true,
      gallery: true,
      menu: false,
      events: true,
      reviews: true,
      blog: true,
      contact: true,
    },
    settings: {
      currency: 'KRW',
      timezone: 'Asia/Seoul',
      language: 'ko',
      theme: 'auto',
      booking: {
        enabled: true,
        advanceBookingDays: 90,
        minStayNights: 1,
        maxStayNights: 5,
        checkInTime: '14:00',
        checkOutTime: '12:00',
        cancellationPolicy: '취소 정책에 따라 환불됩니다.',
      },
    },
  },
  cafe: {
    type: 'cafe',
    name: '카페',
    description: '특별한 커피와 디저트',
    colors: {
      primary: '#8B4513',
      secondary: '#FFF8DC',
      accent: '#CD853F',
    },
    features: {
      reservation: true,
      gallery: true,
      menu: true,
      events: true,
      reviews: true,
      blog: true,
      contact: true,
    },
    settings: {
      currency: 'KRW',
      timezone: 'Asia/Seoul',
      language: 'ko',
      theme: 'auto',
      booking: {
        enabled: true,
        advanceBookingDays: 30,
        minStayNights: 0,
        maxStayNights: 1,
        checkInTime: '09:00',
        checkOutTime: '22:00',
        cancellationPolicy: '당일 취소 불가',
      },
    },
  },
}

export const getBusinessConfig = (type: BusinessType): BusinessConfig => {
  return businessConfigs[type]
}

export const getAvailableBusinessTypes = (): BusinessType[] => {
  return Object.keys(businessConfigs) as BusinessType[]
}