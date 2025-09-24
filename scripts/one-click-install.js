#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')

console.log('🚀 Kmong 펜션/캠핑/카페 템플릿 설치를 시작합니다...')

async function installTemplate() {
  try {
    console.log('1/5 📦 의존성 설치 중...')
    execSync('npm install', { stdio: 'inherit' })
    
    console.log('2/5 🗃️ 데이터베이스 설정 중...')
    if (!fs.existsSync('.env.local')) {
      fs.writeFileSync('.env.local', `
DATABASE_URL="file:./dev.db"
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"
`)
    }
    
    console.log('3/5 🗄️ Prisma 설정 중...')
    execSync('npx prisma generate', { stdio: 'inherit' })
    execSync('npx prisma db push', { stdio: 'inherit' })
    
    console.log('4/5 🎨 테마 설정 중...')
    execSync('npx tailwindcss build -o styles/globals.css', { stdio: 'inherit' })
    
    console.log('5/5 ✨ 최종 설정 중...')
    
    const setupConfig = {
      installed: true,
      installDate: new Date().toISOString(),
      version: '1.0.0',
      businessType: 'pension'
    }
    
    fs.writeFileSync('setup.json', JSON.stringify(setupConfig, null, 2))
    
    console.log('✅ 설치가 완료되었습니다!')
    console.log('🎉 이제 "npm run dev"로 개발 서버를 시작하세요!')
    console.log('📱 관리자 페이지: http://localhost:3000/admin')
    console.log('🌐 메인 페이지: http://localhost:3000')
    
  } catch (error) {
    console.error('❌ 설치 중 오류가 발생했습니다:', error.message)
    process.exit(1)
  }
}

installTemplate()