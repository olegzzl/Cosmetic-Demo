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
  if (pageName === currentPage) {
    if (pageName === 'home') {
      const homeScreen = document.getElementById('page-home');
      if (homeScreen) {
        homeScreen.scrollTo({ top: 0, behavior: 'smooth' });
      }
      updateNav('home');
    }
    return;
  }

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
  updateGlobalHeaderVisibility(pageName);
  
  if (pageName === 'home') {
    setTimeout(updatePortfolioCarousel, 450);
  }
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
  
  // Home page scrollspy to update active tab based on scroll position
  if (homePage) {
    homePage.addEventListener('scroll', () => {
      if (currentPage !== 'home') return;
      
      const servicesSection = document.getElementById('services-section');
      const contactsSection = document.getElementById('contacts-section');
      if (!servicesSection || !contactsSection) return;
      
      const scrollTop = homePage.scrollTop;
      const servicesTop = servicesSection.offsetTop - 150;
      const contactsTop = contactsSection.offsetTop - 200;
      
      const isAtBottom = homePage.scrollHeight - scrollTop - homePage.clientHeight <= 30;
      
      if (isAtBottom || scrollTop >= contactsTop) {
        updateNav('appointment');
      } else if (scrollTop >= servicesTop) {
        updateNav('services');
      } else {
        updateNav('home');
      }
    });
  }
  initBellAnimation();
  initTapFeedback();
  initContactForm();
  initCalendar();

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
    updateGlobalHeaderVisibility(targetPage);
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
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
        updateNav('services');
      }
    }, 450);
  } else {
    const section = document.getElementById('services-section');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      updateNav('services');
    }
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
        updateNav('appointment');
      }
    }, 450);
  } else {
    const section = document.getElementById('contacts-section');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      updateNav('appointment');
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

// --- Calendar Screen Logic ---
function initCalendar() {
  const form = document.getElementById('calendar-booking-form');
  const monthYearLabel = document.getElementById('calendar-month-year');
  const prevMonthBtn = document.getElementById('prev-month-btn');
  const nextMonthBtn = document.getElementById('next-month-btn');
  const calendarDaysContainer = document.getElementById('calendar-days');
  const timeSlotsContainer = document.getElementById('calendar-time-slots');
  const bookingSummary = document.getElementById('booking-summary');
  const summaryDateTime = document.getElementById('summary-date-time');
  const calendarToast = document.getElementById('calendar-toast');
  const calendarToastText = document.getElementById('calendar-toast-text');
  const submitBtn = document.getElementById('calendar-submit');

  if (!form || !monthYearLabel || !prevMonthBtn || !nextMonthBtn || !calendarDaysContainer || !timeSlotsContainer || !bookingSummary || !summaryDateTime || !calendarToast || !submitBtn) return;

  const monthsRu = [
    "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
    "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"
  ];

  const monthsGenitiveRu = [
    "января", "февраля", "марта", "апреля", "мая", "июня",
    "июля", "августа", "сентября", "октября", "ноября", "декабря"
  ];

  const timeSlots = ["09:00", "10:30", "12:00", "13:30", "15:00", "16:30", "18:00", "19:30"];

  let calendarDate = new Date(); // Represents displayed month/year
  let selectedDate = null;
  let selectedTime = null;

  function renderCalendar() {
    const year = calendarDate.getFullYear();
    const month = calendarDate.getMonth();

    // Set month/year header text
    monthYearLabel.textContent = `${monthsRu[month]} ${year}`;

    // Clear previous days
    calendarDaysContainer.innerHTML = '';

    // Day of the week offsets (Monday-based in Russia)
    const firstDayIndex = new Date(year, month, 1).getDay();
    const firstDayOffset = firstDayIndex === 0 ? 6 : firstDayIndex - 1;

    // Total days in the month
    const totalDays = new Date(year, month + 1, 0).getDate();

    // Create empty cells for week offset
    for (let i = 0; i < firstDayOffset; i++) {
      const emptyDiv = document.createElement('div');
      emptyDiv.className = 'calendar-day inactive';
      calendarDaysContainer.appendChild(emptyDiv);
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Create calendar days
    for (let day = 1; day <= totalDays; day++) {
      const dayDate = new Date(year, month, day);
      const dayDiv = document.createElement('div');
      dayDiv.className = 'calendar-day';
      dayDiv.textContent = day;

      if (dayDate < today) {
        dayDiv.classList.add('inactive');
      } else {
        // Check if selected
        if (selectedDate && dayDate.getTime() === selectedDate.getTime()) {
          dayDiv.classList.add('selected');
        }
        
        // Check if today
        if (dayDate.getTime() === today.getTime()) {
          dayDiv.classList.add('today');
        }

        dayDiv.addEventListener('click', () => {
          selectedDate = dayDate;
          selectedTime = null; // Reset time when date changes
          
          // Re-render to update selected styling
          renderCalendar();
          renderTimeSlots();
          updateSummary();
        });
      }

      calendarDaysContainer.appendChild(dayDiv);
    }
  }

  function renderTimeSlots() {
    timeSlotsContainer.innerHTML = '';

    if (!selectedDate) {
      const placeholder = document.createElement('p');
      placeholder.className = 'time-slots-placeholder';
      placeholder.textContent = 'Пожалуйста, выберите дату на календаре';
      placeholder.style.gridColumn = '1 / -1';
      placeholder.style.textAlign = 'center';
      placeholder.style.fontSize = '13px';
      placeholder.style.opacity = '0.6';
      timeSlotsContainer.appendChild(placeholder);
      return;
    }

    timeSlots.forEach(slot => {
      const slotDiv = document.createElement('div');
      slotDiv.className = 'time-slot';
      slotDiv.textContent = slot;

      if (selectedTime === slot) {
        slotDiv.classList.add('selected');
      }

      slotDiv.addEventListener('click', () => {
        selectedTime = slot;
        
        // Re-render slots to update active class
        renderTimeSlots();
        updateSummary();
      });

      timeSlotsContainer.appendChild(slotDiv);
    });
  }

  function updateSummary() {
    if (selectedDate && selectedTime) {
      const day = selectedDate.getDate();
      const monthIndex = selectedDate.getMonth();
      summaryDateTime.textContent = `${day} ${monthsGenitiveRu[monthIndex]} в ${selectedTime}`;
      bookingSummary.classList.remove('hidden');
    } else {
      bookingSummary.classList.add('hidden');
    }
  }

  // Month navigation click events
  prevMonthBtn.addEventListener('click', () => {
    calendarDate.setMonth(calendarDate.getMonth() - 1);
    renderCalendar();
  });

  nextMonthBtn.addEventListener('click', () => {
    calendarDate.setMonth(calendarDate.getMonth() + 1);
    renderCalendar();
  });

  // Handle form submission
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (!selectedDate || !selectedTime) {
      showCalendarToast('Выберите дату и доступное время на календаре', true);
      return;
    }

    const serviceSelect = document.getElementById('calendar-service');
    const nameInput = document.getElementById('calendar-name');
    const phoneInput = document.getElementById('calendar-phone');

    if (!serviceSelect || !nameInput || !phoneInput) return;

    const service = serviceSelect.value;
    const name = nameInput.value.trim();
    const phone = phoneInput.value.trim();

    if (!service || !name || !phone) {
      showCalendarToast('Пожалуйста, заполните все поля формы', true);
      return;
    }

    // Set loading state
    const originalBtnHTML = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span class="spinner"></span> <span>Бронирование...</span>';

    // Format final date text
    const formattedDate = `${selectedDate.getDate()} ${monthsGenitiveRu[selectedDate.getMonth()]} ${selectedDate.getFullYear()}`;

    // Construct Telegram message body
    const textMessage = `📅 *Новая бронь через Календарь!*\n\n` +
                        `👤 *Имя:* ${name}\n` +
                        `📞 *Телефон:* ${phone}\n` +
                        `💆‍♀️ *Услуга:* ${service}\n` +
                        `📅 *Дата:* ${formattedDate}\n` +
                        `⏰ *Время:* ${selectedTime}`;

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
          showCalendarToast('Вы успешно записаны!', false);
          form.reset();
          selectedDate = null;
          selectedTime = null;
          renderCalendar();
          renderTimeSlots();
          updateSummary();
        } else {
          const errData = await response.json();
          console.error('Telegram API Error (Calendar):', errData);
          showCalendarToast(`Ошибка отправки: ${errData.description || 'Неизвестная ошибка'}`, true);
        }
      } else {
        // Simulator / Demo mode when credentials are not filled
        console.warn(
          'Telegram configuration is empty. Running calendar in Demo mode.\n' +
          'To receive actual booking notifications, configure TG_CONFIG at the top of app.js.'
        );
        
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        showCalendarToast('Вы успешно записаны! (Демо-режим: настройте Telegram в app.js)', false);
        form.reset();
        selectedDate = null;
        selectedTime = null;
        renderCalendar();
        renderTimeSlots();
        updateSummary();
      }
    } catch (error) {
      console.error('Network Error (Calendar):', error);
      showCalendarToast('Ошибка сети. Проверьте подключение к интернету.', true);
    } finally {
      // Restore button state
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnHTML;
    }
  });

  function showCalendarToast(message, isError = false) {
    if (!calendarToast || !calendarToastText) return;

    calendarToastText.textContent = message;
    
    // Set classes based on status
    calendarToast.className = 'toast-message';
    if (isError) {
      calendarToast.classList.add('toast-error');
      calendarToast.querySelector('.toast-icon').textContent = 'error';
    } else {
      calendarToast.querySelector('.toast-icon').textContent = 'check_circle';
    }

    calendarToast.classList.remove('hidden');

    if (window.calendarToastTimeout) {
      clearTimeout(window.calendarToastTimeout);
    }
    window.calendarToastTimeout = setTimeout(() => {
      calendarToast.classList.add('hidden');
    }, 5000);
  }

  // Initial render calls
  renderCalendar();
  renderTimeSlots();
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
    // Default to light
    document.documentElement.setAttribute('data-theme', 'light');
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
  updateGlobalHeaderVisibility('home');
  initPortfolioCarousel();
});

// --- Drawer Sidebar & Global Header Helpers ---
function updateGlobalHeaderVisibility(pageName) {
  const globalHeader = document.getElementById('global-header');
  if (globalHeader) {
    if (pageName === 'home') {
      globalHeader.classList.remove('hidden');
    } else {
      globalHeader.classList.add('hidden');
    }
  }
}

function openDrawer() {
  const drawer = document.getElementById('drawer-menu');
  if (drawer) {
    drawer.classList.add('active');
  }
}

// Close drawer
function closeDrawer() {
  const drawer = document.getElementById('drawer-menu');
  if (drawer) {
    drawer.classList.remove('active');
  }
}

// --- Portfolio Horizontal Carousel (Homepage) Helpers ---
function initPortfolioCarousel() {
  const carousel = document.getElementById('portfolio-carousel');
  if (!carousel) return;

  carousel.addEventListener('scroll', updatePortfolioCarousel);
  window.addEventListener('resize', updatePortfolioCarousel);
  
  // Size slides and animate them on start
  updatePortfolioCarousel();
}

function updatePortfolioCarousel() {
  const carousel = document.getElementById('portfolio-carousel');
  if (!carousel) return;
  const slides = carousel.querySelectorAll('.portfolio-slide');
  const carouselRect = carousel.getBoundingClientRect();
  const carouselCenter = carouselRect.left + carouselRect.width / 2;

  slides.forEach(slide => {
    const rect = slide.getBoundingClientRect();
    const slideCenter = rect.left + rect.width / 2;
    const distanceFromCenter = slideCenter - carouselCenter;
    const absDistance = Math.abs(distanceFromCenter);

    // Normalized distance from center (clamped at 1)
    const maxDistance = rect.width;
    const normalized = Math.min(absDistance / maxDistance, 1);

    // Scale from 1.0 down to 0.93
    const scale = 1 - (normalized * 0.07);
    // Opacity from 1.0 down to 0.72
    const opacity = 1 - (normalized * 0.28);
    // 3D rotation based on direction and distance from center
    const rotateY = -distanceFromCenter / rect.width * 12; // Max 12 degrees tilt

    slide.style.transform = `scale(${scale}) rotateY(${Math.min(Math.max(rotateY, -12), 12)}deg)`;
    slide.style.opacity = opacity;
  });
}


