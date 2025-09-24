'use client'

import { useState } from 'react'
import { Calendar, Users, Settings, BarChart3, Eye } from 'lucide-react'
import { useBusinessStore } from '@/stores/business-store'
import { useLanguageStore } from '@/stores/language-store'
import { motion } from 'framer-motion'

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const { businessConfig } = useBusinessStore()
  const { t } = useLanguageStore()

  const tabs = [
    { id: 'dashboard', name: t('admin.dashboard'), icon: BarChart3 },
    { id: 'reservations', name: t('admin.reservations'), icon: Calendar },
    { id: 'rooms', name: t('admin.rooms'), icon: Users },
    { id: 'settings', name: t('admin.settings'), icon: Settings },
  ]

  const mockReservations = [
    { id: '1', customer: '김철수', room: '디럭스룸', checkIn: '2024-08-10', checkOut: '2024-08-12', status: 'confirmed' },
    { id: '2', customer: '이영희', room: '스탠다드룸', checkIn: '2024-08-15', checkOut: '2024-08-16', status: 'pending' },
    { id: '3', customer: '박민수', room: '패밀리룸', checkIn: '2024-08-20', checkOut: '2024-08-22', status: 'confirmed' },
  ]

  const stats = [
    { title: '이번 달 예약', value: '24', icon: Calendar, color: businessConfig.colors.primary },
    { title: '총 매출', value: '₩2,400,000', icon: BarChart3, color: businessConfig.colors.accent },
    { title: '객실 수', value: '8', icon: Users, color: businessConfig.colors.primary },
    { title: '평점', value: '4.8', icon: Eye, color: businessConfig.colors.accent },
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2" style={{ color: businessConfig.colors.primary }}>
            {businessConfig.name} 관리자
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {businessConfig.description} 관리 시스템
          </p>
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  activeTab === tab.id
                    ? 'text-white shadow-md'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
                style={{
                  backgroundColor: activeTab === tab.id ? businessConfig.colors.primary : undefined
                }}
              >
                <Icon className="h-4 w-4" />
                <span>{tab.name}</span>
              </button>
            )
          })}
        </div>

        {activeTab === 'dashboard' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {stats.map((stat, index) => {
                const Icon = stat.icon
                return (
                  <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{stat.title}</p>
                        <p className="text-2xl font-bold">{stat.value}</p>
                      </div>
                      <Icon className="h-8 w-8" style={{ color: stat.color }} />
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-4">최근 예약</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b dark:border-gray-700">
                      <th className="text-left py-2">고객명</th>
                      <th className="text-left py-2">객실</th>
                      <th className="text-left py-2">체크인</th>
                      <th className="text-left py-2">체크아웃</th>
                      <th className="text-left py-2">상태</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockReservations.map((reservation) => (
                      <tr key={reservation.id} className="border-b dark:border-gray-700">
                        <td className="py-2">{reservation.customer}</td>
                        <td className="py-2">{reservation.room}</td>
                        <td className="py-2">{reservation.checkIn}</td>
                        <td className="py-2">{reservation.checkOut}</td>
                        <td className="py-2">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            reservation.status === 'confirmed' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {reservation.status === 'confirmed' ? '확정' : '대기'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'reservations' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6"
          >
            <h3 className="text-xl font-semibold mb-4">예약 관리</h3>
            <div className="space-y-4">
              {mockReservations.map((reservation) => (
                <div key={reservation.id} className="border dark:border-gray-700 rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-semibold">{reservation.customer}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {reservation.room} | {reservation.checkIn} ~ {reservation.checkOut}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <button className="px-3 py-1 bg-green-500 text-white rounded text-sm">
                        승인
                      </button>
                      <button className="px-3 py-1 bg-red-500 text-white rounded text-sm">
                        취소
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === 'settings' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6"
          >
            <h3 className="text-xl font-semibold mb-4">비즈니스 설정</h3>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">비즈니스 이름</label>
                <input
                  type="text"
                  value={businessConfig.name}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-opacity-50"
                  style={{ focusRingColor: businessConfig.colors.primary }}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">설명</label>
                <textarea
                  value={businessConfig.description}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-opacity-50"
                  rows={3}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">체크인 시간</label>
                <input
                  type="time"
                  value={businessConfig.settings.booking.checkInTime}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-opacity-50"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">체크아웃 시간</label>
                <input
                  type="time"
                  value={businessConfig.settings.booking.checkOutTime}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-opacity-50"
                />
              </div>
              
              <button
                className="w-full py-2 px-4 text-white rounded-lg font-medium transition-colors"
                style={{ backgroundColor: businessConfig.colors.primary }}
              >
                설정 저장
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}