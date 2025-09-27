import Image from 'next/image'

const gallerySections = [
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

const footerColumns = [
  {
    title: 'CONTACT',
    lines: ['전화 063 123 3578', '이메일 stay@staycamping.com', '전라북도 부안군 변산면 산외리 123'],
  },
  {
    title: 'POLICY',
    lines: ['이용약관', '개인정보처리방침', '@staycamping'],
  },
  {
    title: 'STAY CAMPING',
    lines: ['상호 스테이캠핑', 'Business number 123-456-123456', '2024 Stay Camping All Rights Reserved', 'Designed by LETYOU'],
  },
]

export default function HomePage() {
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
          {gallerySections.map((section) => (
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
      </main>

      <footer className="mt-auto border-t border-[#ded2bd] bg-[#f1e8d7]" id="reservation">
        <div className="mx-auto flex max-w-5xl flex-col gap-8 px-6 py-12 text-xs uppercase tracking-[0.35em] text-[#4c453c] md:flex-row md:justify-between md:px-8">
          {footerColumns.map((column) => (
            <div key={column.title} className="space-y-2 text-center md:text-left">
              <p className="font-medium text-[#1f1b16]">{column.title}</p>
              {column.lines.map((line) => (
                <p key={line} className="tracking-[0.25em]">{line}</p>
              ))}
            </div>
          ))}
        </div>
        <div className="border-t border-[#d9ceb7] bg-[#e6dcc9]">
          <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4 text-[11px] uppercase tracking-[0.45em] text-[#4c453c] md:px-8">
            <span>Overview</span>
            <span>Reservation</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
