/** @type {import('next').NextConfig} */
const nextConfig = {  
  images: {
    domains: ['localhost', 'wepension.imweb.me'],
  },
  i18n: {
    locales: ['ko', 'en'],
    defaultLocale: 'ko',
  },
}

module.exports = nextConfig