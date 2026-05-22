/* ============================================
   SERENE SKIN AESTHETICS — App Logic
   ============================================ */

// --- Navigation State ---
const navigationHistory = ['home'];
let currentPage = 'home';

// --- Page Navigation ---
function navigateTo(pageName, isPopState = false) {
  if (pageName === currentPage) return;

  const currentScreen = document.querySelector('.screen.active');
  const targetScreen = document.getElementById('page-' + pageName);

  if (!targetScreen) return;

  // Push to history
  if (!isPopState) {
    navigationHistory.push(pageName);
    history.pushState({ page: pageName }, '', '#' + pageName);
  }

  // Animate transition
  animateTransition(currentScreen, targetScreen, isPopState ? 'back' : 'forward');

  currentPage = pageName;
  updateNav(pageName);
  updateBottomNavVisibility(pageName);
}

function goBack() {
  if (navigationHistory.length <= 1) {
    navigateTo('home');
    return;
  }
  
  // Just tell the browser to go back.
  // The popstate event will handle the actual transition.
  history.back();
}

function animateTransition(fromScreen, toScreen, direction) {
  // Reset scroll on target
  toScreen.scrollTop = 0;

  if (direction === 'forward') {
    // Target starts on the right, slides in
    toScreen.style.transform = 'translateX(100%)';
    toScreen.style.opacity = '0';
    toScreen.classList.add('active');

    // Current slides out to the left
    requestAnimationFrame(() => {
      fromScreen.style.transform = 'translateX(-30%)';
      fromScreen.style.opacity = '0';
      toScreen.style.transform = 'translateX(0)';
      toScreen.style.opacity = '1';
    });

    // Cleanup after transition
    setTimeout(() => {
      fromScreen.classList.remove('active');
      fromScreen.style.transform = '';
      fromScreen.style.opacity = '';
      toScreen.style.transform = '';
      toScreen.style.opacity = '';
      triggerAnimations(toScreen);
    }, 420);

  } else {
    // Back: Target starts on the left, slides in
    toScreen.style.transform = 'translateX(-30%)';
    toScreen.style.opacity = '0';
    toScreen.classList.add('active');

    requestAnimationFrame(() => {
      fromScreen.style.transform = 'translateX(100%)';
      fromScreen.style.opacity = '0';
      toScreen.style.transform = 'translateX(0)';
      toScreen.style.opacity = '1';
    });

    setTimeout(() => {
      fromScreen.classList.remove('active');
      fromScreen.style.transform = '';
      fromScreen.style.opacity = '';
      toScreen.style.transform = '';
      toScreen.style.opacity = '';
      triggerAnimations(toScreen);
    }, 420);
  }
}

// --- Bottom Nav ---
function updateNav(pageName) {
  const navItems = document.querySelectorAll('.nav-item');
  navItems.forEach(item => {
    item.classList.remove('active');
    const navTarget = item.getAttribute('data-nav');
    if (navTarget === pageName) {
      item.classList.add('active');
    }
    // "more" tab maps to about
    if (navTarget === 'more' && pageName === 'about') {
      item.classList.add('active');
    }
    // Home active for home page
    if (navTarget === 'home' && pageName === 'home') {
      item.classList.add('active');
    }
  });
}

// Detail pages hide bottom nav and show booking bar properly
const detailPages = ['chistka', 'massage', 'laser', 'peeling', 'injections', 'ultrasound'];

function updateBottomNavVisibility(pageName) {
  const bottomNav = document.getElementById('bottom-nav');
  if (detailPages.includes(pageName)) {
    bottomNav.classList.add('hidden');
  } else {
    bottomNav.classList.remove('hidden');
  }
}

// --- Scroll-triggered Animations (IntersectionObserver) ---
let scrollObserver = null;

function initIntersectionObserver() {
  scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        scrollObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -20px 0px'
  });
}

function triggerAnimations(container) {
  if (!scrollObserver) initIntersectionObserver();
  const elements = container.querySelectorAll('.animate-on-scroll');
  elements.forEach((el) => {
    el.classList.remove('visible');
    scrollObserver.observe(el);
  });
}

// --- Scroll Effects for detail pages ---
function initScrollEffects() {
  // Laser page: show title in header on scroll
  const laserPage = document.getElementById('page-laser');
  if (laserPage) {
    laserPage.addEventListener('scroll', () => {
      const title = document.getElementById('laser-header-title');
      if (title) {
        title.style.opacity = laserPage.scrollTop > 250 ? '1' : '0';
      }
    });
  }
}

// --- Bell notification animation ---
function initBellAnimation() {
  const bell = document.getElementById('bell-btn');
  if (bell) {
    bell.addEventListener('click', () => {
      bell.style.transform = 'rotate(15deg)';
      setTimeout(() => { bell.style.transform = 'rotate(-15deg)'; }, 100);
      setTimeout(() => { bell.style.transform = 'rotate(10deg)'; }, 200);
      setTimeout(() => { bell.style.transform = 'rotate(-5deg)'; }, 300);
      setTimeout(() => { bell.style.transform = 'rotate(0)'; }, 400);
    });
  }
}

// --- Haptic-like feedback on tap ---
function initTapFeedback() {
  document.querySelectorAll('.service-card, .service-list-item, .home-grid__services, .home-grid__about, .home-grid__contacts, .hero-banner').forEach(el => {
    el.addEventListener('touchstart', () => {
      el.style.transform = 'scale(0.97)';
    }, { passive: true });
    el.addEventListener('touchend', () => {
      setTimeout(() => { el.style.transform = ''; }, 150);
    }, { passive: true });
  });
}

// --- Initialize ---
document.addEventListener('DOMContentLoaded', () => {
  // Trigger initial animations on home page
  const homePage = document.getElementById('page-home');
  if (homePage) {
    setTimeout(() => triggerAnimations(homePage), 200);
  }

  initScrollEffects();
  initBellAnimation();
  initTapFeedback();

  // Initialize history state
  if (!history.state) {
    history.replaceState({ page: 'home' }, '', '#home');
  }

  // Handle browser back button (and swipe back)
  window.addEventListener('popstate', (event) => {
    if (navigationHistory.length > 1) {
      navigationHistory.pop();
    }
    
    const targetPage = (event.state && event.state.page) ? event.state.page : 'home';
    
    const currentScreen = document.querySelector('.screen.active');
    const targetScreen = document.getElementById('page-' + targetPage);
    
    if (!targetScreen || targetPage === currentPage) return;

    animateTransition(currentScreen, targetScreen, 'back');
    
    currentPage = targetPage;
    updateNav(targetPage);
    updateBottomNavVisibility(targetPage);
  });
});

// --- Service Worker (optional, for PWA feel) ---
// You could register a service worker here for offline support
