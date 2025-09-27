'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { CalendarDays, Users, Phone, Mail } from 'lucide-react'
import { useBusinessStore } from '@/stores/business-store'
import { useLanguageStore } from '@/stores/language-store'

const reservationSchema = z.object({
  customerName: z.string().min(2, '이름을 입력해주세요'),
  customerPhone: z.string().min(10, '전화번호를 입력해주세요'),
  customerEmail: z.string().email('이메일 형식이 올바르지 않습니다'),
  checkIn: z.string().min(1, '체크인 날짜를 선택해주세요'),
  checkOut: z.string().min(1, '체크아웃 날짜를 선택해주세요'),
  guests: z.number().min(1, '인원을 선택해주세요'),
  roomId: z.string().min(1, '객실을 선택해주세요'),
})

type ReservationFormData = z.infer<typeof reservationSchema>

interface ReservationFormProps {
  onSubmit: (data: ReservationFormData) => void
  loading?: boolean
}

export function ReservationForm({ onSubmit, loading }: ReservationFormProps) {
  const { businessConfig } = useBusinessStore()
  const { t } = useLanguageStore()
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ReservationFormData>({
    resolver: zodResolver(reservationSchema),
  })

  return (
    <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6 text-center" style={{ color: businessConfig.colors.primary }}>
        {t('reservation.title')}
      </h2>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">
            {t('reservation.name')}
          </label>
          <div className="relative">
            <input
              {...register('customerName')}
              type="text"
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-opacity-50"
              placeholder={t('reservation.namePlaceholder')}
            />
            <Users className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          </div>
          {errors.customerName && (
            <p className="text-red-500 text-sm mt-1">{errors.customerName.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            {t('reservation.phone')}
          </label>
          <div className="relative">
            <input
              {...register('customerPhone')}
              type="tel"
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-opacity-50"
              placeholder={t('reservation.phonePlaceholder')}
            />
            <Phone className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          </div>
          {errors.customerPhone && (
            <p className="text-red-500 text-sm mt-1">{errors.customerPhone.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            {t('reservation.email')}
          </label>
          <div className="relative">
            <input
              {...register('customerEmail')}
              type="email"
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-opacity-50"
              placeholder={t('reservation.emailPlaceholder')}
            />
            <Mail className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          </div>
          {errors.customerEmail && (
            <p className="text-red-500 text-sm mt-1">{errors.customerEmail.message}</p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              {t('reservation.checkIn')}
            </label>
            <div className="relative">
              <input
                {...register('checkIn')}
                type="date"
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-opacity-50"
              />
              <CalendarDays className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            </div>
            {errors.checkIn && (
              <p className="text-red-500 text-sm mt-1">{errors.checkIn.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              {t('reservation.checkOut')}
            </label>
            <div className="relative">
              <input
                {...register('checkOut')}
                type="date"
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-opacity-50"
              />
              <CalendarDays className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            </div>
            {errors.checkOut && (
              <p className="text-red-500 text-sm mt-1">{errors.checkOut.message}</p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            {t('reservation.guests')}
          </label>
          <select
            {...register('guests', { valueAsNumber: true })}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-opacity-50"
          >
            {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
              <option key={num} value={num}>{num}{t('reservation.people')}</option>
            ))}
          </select>
          {errors.guests && (
            <p className="text-red-500 text-sm mt-1">{errors.guests.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 px-4 rounded-lg text-white font-medium transition-colors disabled:opacity-50"
          style={{ backgroundColor: businessConfig.colors.primary }}
        >
          {loading ? t('reservation.submitting') : t('reservation.submit')}
        </button>
      </form>
    </div>
  )
}