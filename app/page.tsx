'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Star, MapPin, Phone, Mail } from 'lucide-react'
import { useBusinessStore } from '@/stores/business-store'
import { useLanguageStore } from '@/stores/language-store'

export default function HomePage() {
  const { businessConfig, initializeBusiness } = useBusinessStore()
  const { t } = useLanguageStore()

  useEffect(() => {
    initializeBusiness()
  }, [initializeBusiness])

  const businessContent = {
    pension: {
      hero: {
        title: '자연 속 힐링 펜션',
        subtitle: '편안한 휴식과 아름다운 자연을 만나보세요',
        image: '/images/pension-hero.jpg'
      },
      features: [
        { icon: '🏔️', title: '산림 전망', description: '아름다운 산림 뷰를 감상하세요' },
        { icon: '🛏️', title: '편안한 객실', description: '깨끗하고 안전한 숙박 시설' },
        { icon: '🍽️', title: '바베큐 시설', description: '가족과 함께 즐기는 바베큐' },
      ]
    },
    camping: {
      hero: {
        title: '자연과 함께하는 캠핑',
        subtitle: '별빛 아래에서 특별한 추억을 만들어보세요',
        image: '/images/camping-hero.jpg'
      },
      features: [
        { icon: '⛺', title: '텐트 사이트', description: '넓고 평평한 캠핑 사이트' },
        { icon: '🔥', title: '캠프파이어', description: '따뜻한 모닥불과 함께' },
        { icon: '🚿', title: '샤워 시설', description: '깨끗한 샤워 및 화장실' },
      ]
    },
    cafe: {
      hero: {
        title: '특별한 커피 경험',
        subtitle: '신선한 원두와 수제 디저트를 즐겨보세요',
        image: '/images/cafe-hero.jpg'
      },
      features: [
        { icon: '☕', title: '스페셜티 커피', description: '엄선된 원두로 내린 커피' },
        { icon: '🍰', title: '수제 디저트', description: '매일 새로 만드는 디저트' },
        { icon: '📚', title: '독서 공간', description: '조용하고 편안한 분위기' },
      ]
    }
  }

  const content = businessContent[businessConfig.type]

  return (
    <div className="min-h-screen">
      <section 
        className="relative h-screen flex items-center justify-center bg-cover bg-center"
        style={{ backgroundColor: businessConfig.colors.secondary }}
      >
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative z-10 text-center text-white px-4">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold mb-6"
          >
            {content.hero.title}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl mb-8"
          >
            {content.hero.subtitle}
          </motion.p>
          <motion.button
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="px-8 py-3 text-lg font-semibold rounded-lg transition-colors"
            style={{ 
              backgroundColor: businessConfig.colors.primary,
              color: 'white'
            }}
          >
            {t('reservation.title')}
          </motion.button>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="container mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold text-center mb-12"
            style={{ color: businessConfig.colors.primary }}
          >
            특별한 서비스
          </motion.h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {content.features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center p-6 rounded-lg bg-white dark:bg-gray-800 shadow-lg"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4" style={{ backgroundColor: businessConfig.colors.secondary }}>
        <div className="container mx-auto text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold mb-8"
            style={{ color: businessConfig.colors.primary }}
          >
            고객 후기
          </motion.h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((review) => (
              <motion.div
                key={review}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: review * 0.1 }}
                className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
              >
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  "정말 좋은 시간을 보냈습니다. 친절한 서비스와 깨끗한 시설이 인상적이었어요."
                </p>
                <p className="font-semibold">김고객 님</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6" style={{ color: businessConfig.colors.primary }}>
                연락처 정보
              </h2>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5" style={{ color: businessConfig.colors.primary }} />
                  <span>서울시 강남구 테헤란로 123</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5" style={{ color: businessConfig.colors.primary }} />
                  <span>02-1234-5678</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5" style={{ color: businessConfig.colors.primary }} />
                  <span>info@example.com</span>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-200 dark:bg-gray-700 rounded-lg h-64 flex items-center justify-center">
              <span className="text-gray-500">지도 영역</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}