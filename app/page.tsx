'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'

type SortOrder = 'latest' | 'oldest'

type GalleryItem = {
  id: string
  title: string
  description: string
  src: string
  categories: string[]
  date: string
}

const showcaseSections = [
  {
    label: 'STAY',
    src: '/images/main.jpg',
    alt: '글램핑 텐트들이 모여 있는 메인 공간 전경',
  },
  {
    label: 'AIRSTREAM',
    src: '/images/airstream.jpg',
    alt: '에어스트림 트레일러 앞에서 휴식을 취하는 사람들',
  },
  {
    label: 'CAMPING',
    src: '/images/camping.jpg',
    alt: '사막 하늘 아래 줄지어 있는 캠핑 텐트들',
  },
  {
    label: 'CAFE',
    src: '/images/cafe.jpg',
    alt: '우드톤 인테리어의 감성 카페 전경',
  },
]

const galleryItems: GalleryItem[] = [
  {
    id: 'main-sunrise',
    title: 'Sunrise Retreat',
    description: '새벽 햇살이 비추는 글램핑 존',
    src: '/images/main.jpg',
    categories: ['Stay', 'Nature'],
    date: '2024-07-04',
  },
  {
    id: 'central-lounge',
    title: 'Central Lounge',
    description: '캠프 중앙 라운지의 따뜻한 불빛',
    src: '/images/StayCamping.png',
    categories: ['Stay', 'Design'],
    date: '2024-07-12',
  },
  {
    id: 'airstream-evening',
    title: 'Airstream Evening',
    description: '노을을 바라보며 즐기는 에어스트림 휴식',
    src: '/images/airstream.jpg',
    categories: ['Airstream', 'Experience'],
    date: '2024-07-19',
  },
  {
    id: 'campfire-nights',
    title: 'Campfire Nights',
    description: '은하수 아래에서 즐기는 모닥불',
    src: '/images/camping.jpg',
    categories: ['Camping', 'Night'],
    date: '2024-08-02',
  },
  {
    id: 'cafe-morning',
    title: 'Morning Cafe',
    description: '우드톤 인테리어 속 감성 카페',
    src: '/images/cafe.jpg',
    categories: ['Cafe', 'Indoor'],
    date: '2024-08-09',
  },
  {
    id: 'camper-lifestyle',
    title: 'Camper Lifestyle',
    description: '캠퍼 앞에서 즐기는 아침 식사',
    src: '/images/camper2.jpg',
    categories: ['Airstream', 'People'],
    date: '2024-08-15',
  },
  {
    id: 'campfire-moment',
    title: 'Campfire Moment',
    description: '모닥불 주변의 따뜻한 순간',
    src: '/images/fire.jpg',
    categories: ['Camping', 'Experience'],
    date: '2024-08-22',
  },
  {
    id: 'beach-front',
    title: 'Beach Front',
    description: '바다를 배경으로 한 카라반 캠핑',
    src: '/images/beach-sea-coast-outdoor-sand-ocean-846961-pxhere.com.jpg',
    categories: ['Outdoor', 'Nature'],
    date: '2024-09-01',
  },
  {
    id: 'signature-coffee',
    title: 'Signature Coffee',
    description: '바리스타의 시그니처 커피 한 잔',
    src: '/images/pexels-chevanon-312418.jpg',
    categories: ['Cafe', 'Experience'],
    date: '2024-09-08',
  },
]

const categoryFilters = [
  '전체',
  ...Array.from(new Set(galleryItems.flatMap((item) => item.categories))),
] as const

const formatDate = (dateString: string) =>
  new Date(dateString).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState<(typeof categoryFilters)[number]>('전체')
  const [sortOrder, setSortOrder] = useState<SortOrder>('latest')
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const sortedItems = useMemo(() => {
    const filtered =
      selectedCategory === '전체'
        ? galleryItems
        : galleryItems.filter((item) => item.categories.includes(selectedCategory))

    return [...filtered].sort((a, b) => {
      const first = new Date(a.date).getTime()
      const second = new Date(b.date).getTime()

      return sortOrder === 'latest' ? second - first : first - second
    })
  }, [selectedCategory, sortOrder])

  const openModal = (index: number) => setActiveIndex(index)
  const closeModal = () => setActiveIndex(null)

  const showPrev = useCallback(() => {
    setActiveIndex((prev) => {
      if (prev === null || sortedItems.length === 0) return prev
      return (prev - 1 + sortedItems.length) % sortedItems.length
    })
  }, [sortedItems.length])

  const showNext = useCallback(() => {
    setActiveIndex((prev) => {
      if (prev === null || sortedItems.length === 0) return prev
      return (prev + 1) % sortedItems.length
    })
  }, [sortedItems.length])

  useEffect(() => {
    if (activeIndex === null) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeModal()
      }
      if (event.key === 'ArrowLeft') {
        showPrev()
      }
      if (event.key === 'ArrowRight') {
        showNext()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [activeIndex, showNext, showPrev])

  useEffect(() => {
    if (activeIndex !== null && activeIndex >= sortedItems.length) {
      setActiveIndex(sortedItems.length ? 0 : null)
    }
  }, [activeIndex, sortedItems.length])

  const activeItem = activeIndex !== null ? sortedItems[activeIndex] : null

  return (
    <div className="flex min-h-screen flex-col bg-[#f6f1e1]">
      <header className="flex items-center justify-between px-6 py-6 uppercase tracking-[0.35em] text-xs text-[#4c453c] md:px-12">
        <div className="flex items-center gap-4">
          <span className="flex flex-col gap-1" aria-hidden>
            <span className="block h-[2px] w-6 bg-[#4c453c]" />
            <span className="block h-[2px] w-6 bg-[#4c453c]" />
            <span className="block h-[2px] w-6 bg-[#4c453c]" />
          </span>
        </div>
        <a
          href="#reservation"
          className="rounded-full border border-[#4c453c] px-4 py-2 text-[11px] tracking-[0.45em] transition-colors hover:bg-[#4c453c] hover:text-[#f6f1e1]"
        >
          Reservation
        </a>
      </header>

      <main className="flex-1">
        <section className="px-6 text-center md:px-12">
          <h1 className="uppercase tracking-[0.45em] text-[#1f1b16]">
            <span className="block text-[clamp(3rem,10vw,8rem)] leading-none">Stay</span>
            <span className="block text-[clamp(3rem,10vw,8rem)] leading-none">Camping</span>
          </h1>
        </section>

        <section className="mx-auto mt-20 flex max-w-4xl flex-col gap-16 px-6 pb-24 md:px-0">
          {showcaseSections.map((section) => (
            <article key={section.label} className="text-center">
              <div className="overflow-hidden rounded-[3rem] border border-[#e0d6c3] shadow-[0_25px_45px_rgba(91,84,74,0.05)]">
                <Image
                  src={section.src}
                  alt={section.alt}
                  width={1600}
                  height={960}
                  className="h-auto w-full object-cover"
                  priority={section.label === 'STAY'}
                />
              </div>
              <p className="mt-4 uppercase tracking-[0.45em] text-xs text-[#4c453c]">{section.label}</p>
            </article>
          ))}
        </section>

        <section className="border-t border-[#ded2bd] bg-[#f1e8d7] py-16">
          <div className="mx-auto flex max-w-5xl flex-col gap-10 px-6 md:px-8">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <h2 className="text-left text-2xl uppercase tracking-[0.35em] text-[#1f1b16] md:text-3xl">
                Gallery Overview
              </h2>
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-6">
                <div className="flex flex-wrap gap-2">
                  {categoryFilters.map((category) => {
                    const isActive = selectedCategory === category
                    return (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`rounded-full border px-4 py-2 text-[11px] uppercase tracking-[0.35em] transition-colors ${
                          isActive
                            ? 'border-transparent bg-[#1f1b16] text-[#f6f1e1]'
                            : 'border-[#4c453c]/30 text-[#4c453c] hover:border-[#4c453c]'
                        }`}
                        type="button"
                      >
                        {category}
                      </button>
                    )
                  })}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] uppercase tracking-[0.35em] text-[#4c453c]">Sort</span>
                  <div className="flex rounded-full border border-[#4c453c]/40 p-1">
                    {(
                      [
                        { value: 'latest', label: '최신순' },
                        { value: 'oldest', label: '오래된순' },
                      ] as { value: SortOrder; label: string }[]
                    ).map((option) => {
                      const isActive = sortOrder === option.value
                      return (
                        <button
                          key={option.value}
                          onClick={() => setSortOrder(option.value)}
                          className={`rounded-full px-4 py-1 text-[11px] uppercase tracking-[0.35em] transition-colors ${
                            isActive
                              ? 'bg-[#1f1b16] text-[#f6f1e1]'
                              : 'text-[#4c453c] hover:text-[#1f1b16]'
                          }`}
                          type="button"
                        >
                          {option.label}
                        </button>
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>

            {sortedItems.length === 0 ? (
              <p className="rounded-3xl border border-dashed border-[#d4c7af] px-6 py-16 text-center text-sm uppercase tracking-[0.45em] text-[#4c453c]">
                카테고리에 해당하는 이미지가 없습니다
              </p>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {sortedItems.map((item, index) => (
                  <button
                    key={item.id}
                    onClick={() => openModal(index)}
                    className="group overflow-hidden rounded-[2rem] border border-[#ded2bd] bg-[#f6f1e1] text-left transition-transform hover:-translate-y-1"
                    type="button"
                  >
                    <div className="relative overflow-hidden">
                      <Image
                        src={item.src}
                        alt={item.description}
                        width={800}
                        height={600}
                        className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <span className="absolute left-4 top-4 rounded-full bg-black/60 px-3 py-1 text-[10px] uppercase tracking-[0.35em] text-white">
                        {formatDate(item.date)}
                      </span>
                    </div>
                    <div className="space-y-2 px-5 py-4">
                      <p className="text-sm uppercase tracking-[0.35em] text-[#4c453c]">
                        {item.categories.join(' · ')}
                      </p>
                      <h3 className="text-lg font-semibold text-[#1f1b16]">{item.title}</h3>
                      <p className="text-sm text-[#5b544a]">{item.description}</p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      <footer className="mt-auto border-t border-[#ded2bd] bg-[#f1e8d7]" id="reservation">
        <div className="mx-auto flex max-w-5xl flex-col gap-8 px-6 py-12 text-xs uppercase tracking-[0.35em] text-[#4c453c] md:flex-row md:justify-between md:px-8">
          <div className="space-y-2 text-center md:text-left">
            <p className="font-medium text-[#1f1b16]">CONTACT</p>
            <p className="tracking-[0.25em]">전화 063 123 3578</p>
            <p className="tracking-[0.25em]">이메일 stay@staycamping.com</p>
            <p className="tracking-[0.25em]">전라북도 부안군 변산면 산외리 123</p>
          </div>
          <div className="space-y-2 text-center md:text-left">
            <p className="font-medium text-[#1f1b16]">POLICY</p>
            <p className="tracking-[0.25em]">이용약관</p>
            <p className="tracking-[0.25em]">개인정보처리방침</p>
            <p className="tracking-[0.25em]">@staycamping</p>
          </div>
          <div className="space-y-2 text-center md:text-left">
            <p className="font-medium text-[#1f1b16]">STAY CAMPING</p>
            <p className="tracking-[0.25em]">상호 스테이캠핑</p>
            <p className="tracking-[0.25em]">Business number 123-456-123456</p>
            <p className="tracking-[0.25em]">2024 Stay Camping All Rights Reserved</p>
            <p className="tracking-[0.25em]">Designed by LETYOU</p>
          </div>
        </div>
        <div className="border-t border-[#d9ceb7] bg-[#e6dcc9]">
          <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4 text-[11px] uppercase tracking-[0.45em] text-[#4c453c] md:px-8">
            <span>Overview</span>
            <span>Reservation</span>
          </div>
        </div>
      </footer>

      {activeItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4"
          onClick={closeModal}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="relative w-full max-w-4xl rounded-[2rem] bg-[#f6f1e1] p-4 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className="absolute right-4 top-4 rounded-full border border-[#4c453c]/40 p-2 text-[#4c453c] transition-colors hover:bg-[#4c453c] hover:text-[#f6f1e1]"
              type="button"
              aria-label="닫기"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="relative overflow-hidden rounded-[1.5rem]">
              <Image
                src={activeItem.src}
                alt={activeItem.description}
                width={1600}
                height={1066}
                className="h-auto w-full object-cover"
              />
            </div>

            <div className="mt-4 flex flex-col gap-2 px-2 pb-2 text-[#1f1b16]">
              <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.35em] text-[#4c453c]">
                <span>{formatDate(activeItem.date)}</span>
                <span className="hidden text-[#d1c2a5] md:block">•</span>
                <span>{activeItem.categories.join(' · ')}</span>
              </div>
              <h3 className="text-2xl font-semibold">{activeItem.title}</h3>
              <p className="text-sm text-[#5b544a]">{activeItem.description}</p>
            </div>

            {sortedItems.length > 1 && (
              <div className="mt-4 flex items-center justify-between">
                <button
                  onClick={showPrev}
                  className="flex items-center gap-2 rounded-full border border-[#4c453c]/40 px-4 py-2 text-sm uppercase tracking-[0.35em] text-[#4c453c] transition-colors hover:bg-[#4c453c] hover:text-[#f6f1e1]"
                  type="button"
                  aria-label="이전 이미지"
                >
                  <ChevronLeft className="h-4 w-4" /> Prev
                </button>
                <button
                  onClick={showNext}
                  className="flex items-center gap-2 rounded-full border border-[#4c453c]/40 px-4 py-2 text-sm uppercase tracking-[0.35em] text-[#4c453c] transition-colors hover:bg-[#4c453c] hover:text-[#f6f1e1]"
                  type="button"
                  aria-label="다음 이미지"
                >
                  Next <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
