/* ============================================
   SERENE SKIN AESTHETICS — App Logic
   ============================================ */

// --- Telegram Notification Configuration ---
// To receive form submissions in your Telegram channel or chat:
// 1. Create a bot using BotFather on Telegram and paste the token here.
// 2. Add your bot to the group/channel or start a chat with it, then paste your chat ID.
const TG_CONFIG = {
  botToken: '', // e.g. '123456789:ABCdef...'
  chatId: ''    // e.g. '987654321' or '@channel_username'
};


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
    // Services active for detail pages
    if (navTarget === 'services' && detailPages.includes(pageName)) {
      item.classList.add('active');
    }
  });
}

// Detail pages keep bottom nav visible
const detailPages = ['chistka', 'massage', 'laser', 'peeling', 'injections', 'ultrasound'];

function updateBottomNavVisibility(pageName) {
  const bottomNav = document.getElementById('bottom-nav');
  if (bottomNav) {
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
  initContactForm();

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

// --- Scroll To Services ---
function scrollToServices() {
  if (currentPage !== 'home') {
    navigateTo('home');
    setTimeout(() => {
      const section = document.getElementById('services-section');
      if (section) section.scrollIntoView({ behavior: 'smooth' });
    }, 450);
  } else {
    const section = document.getElementById('services-section');
    if (section) section.scrollIntoView({ behavior: 'smooth' });
  }
}

// --- Scroll To Contacts ---
function scrollToContacts() {
  if (currentPage !== 'home') {
    navigateTo('home');
    setTimeout(() => {
      const section = document.getElementById('contacts-section');
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
        // Trigger scroll animations for the newly visible section
        triggerAnimations(document.getElementById('page-home'));
      }
    }, 450);
  } else {
    const section = document.getElementById('contacts-section');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  }
}

// --- Contact Form Initialization & Telegram API Delivery ---
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const nameInput = document.getElementById('contact-name');
    const phoneInput = document.getElementById('contact-phone');
    const messageInput = document.getElementById('contact-message');
    const submitBtn = document.getElementById('contact-submit');
    const toast = document.getElementById('form-toast');
    const toastText = document.getElementById('toast-text');

    if (!nameInput || !phoneInput || !messageInput || !submitBtn || !toast || !toastText) return;

    const name = nameInput.value.trim();
    const phone = phoneInput.value.trim();
    const message = messageInput.value.trim();

    if (!name || !phone || !message) {
      showToast('Пожалуйста, заполните все поля', true);
      return;
    }

    // Set loading state
    const originalBtnHTML = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span class="spinner"></span> <span>Отправка...</span>';

    // Hide previous toast if any
    toast.classList.add('hidden');
    toast.className = 'toast-message hidden';

    // Construct message body
    const textMessage = `🔔 *Новая запись на сайте!*\n\n` +
                        `👤 *Имя:* ${name}\n` +
                        `📞 *Контакт:* ${phone}\n` +
                        `💬 *Сообщение:* ${message}`;

    try {
      if (TG_CONFIG.botToken && TG_CONFIG.chatId) {
        // Send request to Telegram API
        const url = `https://api.telegram.org/bot${TG_CONFIG.botToken}/sendMessage`;
        const response = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: TG_CONFIG.chatId,
            text: textMessage,
            parse_mode: 'Markdown'
          })
        });

        if (response.ok) {
          showToast('Сообщение успешно отправлено!', false);
          form.reset();
        } else {
          const errData = await response.json();
          console.error('Telegram API Error:', errData);
          showToast(`Ошибка отправки: ${errData.description || 'Неизвестная ошибка'}`, true);
        }
      } else {
        // Simulator / Demo mode when credentials are not filled
        console.warn(
          'Telegram configuration is empty. Running in Demo mode.\n' +
          'To receive actual messages, configure TG_CONFIG at the top of app.js with your Telegram bot credentials.'
        );
        
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        showToast('Сообщение отправлено! (Демо-режим: настройте Telegram в app.js)', false);
        form.reset();
      }
    } catch (error) {
      console.error('Network Error:', error);
      showToast('Ошибка сети. Проверьте подключение к интернету.', true);
    } finally {
      // Restore button state
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnHTML;
    }
  });

  function showToast(message, isError = false) {
    const toast = document.getElementById('form-toast');
    const toastText = document.getElementById('toast-text');
    if (!toast || !toastText) return;

    toastText.textContent = message;
    
    // Set classes based on status
    toast.className = 'toast-message';
    if (isError) {
      toast.classList.add('toast-error');
      // Set error icon
      toast.querySelector('.toast-icon').textContent = 'error';
    } else {
      // Set check icon
      toast.querySelector('.toast-icon').textContent = 'check_circle';
    }

    toast.classList.remove('hidden');

    // Automatically hide after 5 seconds
    if (window.toastTimeout) {
      clearTimeout(window.toastTimeout);
    }
    window.toastTimeout = setTimeout(() => {
      toast.classList.add('hidden');
    }, 5000);
  }
}

// --- Theme Toggle Logic ---
function initThemeToggle() {
  const themeBtn = document.getElementById('theme-toggle-btn');
  if (!themeBtn) return;
  
  // Check local storage for saved theme
  const savedTheme = localStorage.getItem('app-theme');
  if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
  } else {
    // Default to dark since this is COSMETIC Black project
    document.documentElement.setAttribute('data-theme', 'dark');
  }
  
  updateThemeIcon();

  themeBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('app-theme', newTheme);
    
    updateThemeIcon();
  });
}

function updateThemeIcon() {
  const themeBtn = document.getElementById('theme-toggle-btn');
  const currentTheme = document.documentElement.getAttribute('data-theme');
  if (themeBtn) {
    themeBtn.innerHTML = currentTheme === 'dark'
      ? '<span class="material-symbols-outlined">light_mode</span>'
      : '<span class="material-symbols-outlined">dark_mode</span>';
  }
}

// Call on init
document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
});

