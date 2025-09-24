// 자동 테마 전환 스크립트
(function() {
  'use strict';
  
  // 시스템 다크모드 감지 및 자동 전환
  function initTheme() {
    const savedTheme = localStorage.getItem('business-store');
    let theme = 'auto';
    
    if (savedTheme) {
      try {
        const parsed = JSON.parse(savedTheme);
        theme = parsed.state?.theme || 'auto';
      } catch (e) {
        console.warn('테마 설정 파싱 실패:', e);
      }
    }
    
    applyTheme(theme);
    
    // 시스템 테마 변경 감지
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', () => {
      if (theme === 'auto') {
        applyTheme('auto');
      }
    });
  }
  
  function applyTheme(theme) {
    const html = document.documentElement;
    
    if (theme === 'dark') {
      html.classList.add('dark');
    } else if (theme === 'light') {
      html.classList.remove('dark');
    } else if (theme === 'auto') {
      const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      html.classList.toggle('dark', isDark);
    }
  }
  
  // 비즈니스 색상 적용
  function applyBusinessColors() {
    const saved = localStorage.getItem('business-store');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        const businessType = parsed.state?.currentBusinessType || 'pension';
        
        const colors = {
          pension: { primary: '#8B7355', secondary: '#fbf8f0', accent: '#6B5B47' },
          camping: { primary: '#2D5016', secondary: '#E8F5E8', accent: '#4A7C59' },
          cafe: { primary: '#8B4513', secondary: '#FFF8DC', accent: '#CD853F' }
        };
        
        const businessColors = colors[businessType];
        if (businessColors) {
          const root = document.documentElement;
          root.style.setProperty('--color-primary', businessColors.primary);
          root.style.setProperty('--color-secondary', businessColors.secondary);
          root.style.setProperty('--color-accent', businessColors.accent);
        }
      } catch (e) {
        console.warn('비즈니스 색상 적용 실패:', e);
      }
    }
  }
  
  // 페이지 로드 시 실행
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      initTheme();
      applyBusinessColors();
    });
  } else {
    initTheme();
    applyBusinessColors();
  }
  
  // 부드러운 스크롤 효과
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  }
  
  // 이미지 레이지 로딩
  function initLazyLoading() {
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            observer.unobserve(img);
          }
        });
      });
      
      document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
      });
    }
  }
  
  // 페이지 완전 로드 후 실행
  window.addEventListener('load', () => {
    initSmoothScroll();
    initLazyLoading();
  });
  
})();