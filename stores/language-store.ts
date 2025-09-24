import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type Language = 'ko' | 'en'

interface LanguageStore {
  language: Language
  setLanguage: (language: Language) => void
  t: (key: string) => string
}

const translations = {
  ko: {
    'nav.home': '홈',
    'nav.rooms': '객실',
    'nav.reservation': '예약',
    'nav.gallery': '갤러리',
    'nav.contact': '연락처',
    'nav.admin': '관리자',
    'reservation.title': '예약하기',
    'reservation.name': '이름',
    'reservation.namePlaceholder': '성함을 입력해주세요',
    'reservation.phone': '전화번호',
    'reservation.phonePlaceholder': '010-0000-0000',
    'reservation.email': '이메일',
    'reservation.emailPlaceholder': 'example@email.com',
    'reservation.checkIn': '체크인',
    'reservation.checkOut': '체크아웃',
    'reservation.guests': '인원',
    'reservation.people': '명',
    'reservation.submit': '예약하기',
    'reservation.submitting': '예약 중...',
    'business.pension': '펜션',
    'business.camping': '캠핑장',
    'business.cafe': '카페',
    'admin.dashboard': '관리자 대시보드',
    'admin.reservations': '예약 관리',
    'admin.rooms': '객실 관리',
    'admin.settings': '설정',
  },
  en: {
    'nav.home': 'Home',
    'nav.rooms': 'Rooms',
    'nav.reservation': 'Reservation',
    'nav.gallery': 'Gallery',
    'nav.contact': 'Contact',
    'nav.admin': 'Admin',
    'reservation.title': 'Make Reservation',
    'reservation.name': 'Name',
    'reservation.namePlaceholder': 'Enter your name',
    'reservation.phone': 'Phone',
    'reservation.phonePlaceholder': '010-0000-0000',
    'reservation.email': 'Email',
    'reservation.emailPlaceholder': 'example@email.com',
    'reservation.checkIn': 'Check-in',
    'reservation.checkOut': 'Check-out',
    'reservation.guests': 'Guests',
    'reservation.people': ' people',
    'reservation.submit': 'Book Now',
    'reservation.submitting': 'Booking...',
    'business.pension': 'Pension',
    'business.camping': 'Camping',
    'business.cafe': 'Cafe',
    'admin.dashboard': 'Admin Dashboard',
    'admin.reservations': 'Reservations',
    'admin.rooms': 'Room Management',
    'admin.settings': 'Settings',
  },
}

export const useLanguageStore = create<LanguageStore>()(
  persist(
    (set, get) => ({
      language: 'ko',
      
      setLanguage: (language: Language) => {
        set({ language })
      },
      
      t: (key: string) => {
        const { language } = get()
        return translations[language][key as keyof typeof translations.ko] || key
      },
    }),
    {
      name: 'language-store',
    }
  )
)