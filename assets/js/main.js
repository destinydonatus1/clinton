/**
 * CLINTON RESTAURANT — CONTINENTAL CUISINE
 * Main Application Logic & Global Interactive Behaviors
 */

document.addEventListener('DOMContentLoaded', () => {
  initStickyHeader();
  initMobileNavigation();
  initFaqAccordions();
  initNewsletterForm();
  initGlobalReservationModal();
  initScrollAnimations();
  highlightActiveNavLink();
});

/**
 * 1. Sticky Glassmorphic Header with Scroll Detect
 */
function initStickyHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 40) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/**
 * 2. Mobile Drawer Navigation
 */
function initMobileNavigation() {
  const toggleBtn = document.querySelector('.mobile-nav-toggle');
  const drawer = document.querySelector('.mobile-drawer');
  const backdrop = document.querySelector('.drawer-backdrop');
  const closeBtn = document.querySelector('.drawer-close');

  if (!toggleBtn || !drawer) return;

  function openDrawer() {
    drawer.classList.add('is-open');
    if (backdrop) backdrop.classList.add('is-open');
    toggleBtn.classList.add('is-active');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    drawer.classList.remove('is-open');
    if (backdrop) backdrop.classList.remove('is-open');
    toggleBtn.classList.remove('is-active');
    document.body.style.overflow = '';
  }

  toggleBtn.addEventListener('click', () => {
    if (drawer.classList.contains('is-open')) {
      closeDrawer();
    } else {
      openDrawer();
    }
  });

  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  if (backdrop) backdrop.addEventListener('click', closeDrawer);

  // Close when clicking on any mobile nav link
  const drawerLinks = drawer.querySelectorAll('a');
  drawerLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  // Close on Escape key
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('is-open')) {
      closeDrawer();
    }
  });
}

/**
 * 3. Highlight Current Route in Navigation
 */
function highlightActiveNavLink() {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link, .drawer-nav-link');

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    } else if (href !== currentPath) {
      // Avoid false positives
      if (link.getAttribute('href') !== currentPath) {
        link.classList.remove('active');
      }
    }
  });
}

/**
 * 4. FAQ Accordion Panels
 */
function initFaqAccordions() {
  const faqItems = document.querySelectorAll('.faq-item');
  if (!faqItems.length) return;

  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    if (!questionBtn) return;

    questionBtn.addEventListener('click', () => {
      const isActive = item.classList.contains('is-active');
      
      // Close sibling items
      faqItems.forEach(otherItem => {
        otherItem.classList.remove('is-active');
      });

      // Toggle clicked item
      if (!isActive) {
        item.classList.add('is-active');
      }
    });
  });
}

/**
 * 5. Toast Notifications Helper
 */
function showToast(message, type = 'success') {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  
  const iconSvg = type === 'success' 
    ? `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#E8B91B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>`
    : `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#E8B91B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>`;

  toast.innerHTML = `
    ${iconSvg}
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

/**
 * 6. Newsletter Subscription
 */
function initNewsletterForm() {
  const forms = document.querySelectorAll('.footer-newsletter-form');
  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = form.querySelector('.footer-newsletter-input');
      if (input && input.value.trim()) {
        showToast(`Thank you! You are now subscribed to Clinton's Privé Gastronomy Digest.`);
        input.value = '';
      } else {
        showToast(`Please enter a valid email address.`, 'error');
      }
    });
  });
}

/**
 * 7. Global Modal Table Reservation Trigger
 */
function initGlobalReservationModal() {
  const modal = document.getElementById('reservationModal');
  if (!modal) return;

  const openTriggers = document.querySelectorAll('[data-open-modal="reservation"]');
  const closeBtn = modal.querySelector('.modal-close-btn');

  function openModal() {
    modal.classList.add('is-active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('is-active');
    document.body.style.overflow = '';
  }

  openTriggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      // If we are already on contact.html, smooth scroll to the reservation card instead of modal
      const isContactPage = window.location.pathname.includes('contact.html');
      const reservationCard = document.getElementById('bookingCard');
      if (isContactPage && reservationCard) {
        e.preventDefault();
        reservationCard.scrollIntoView({ behavior: 'smooth' });
        reservationCard.style.outline = '2px solid var(--color-mustard-gold)';
        setTimeout(() => reservationCard.style.outline = 'none', 1800);
        return;
      }

      e.preventDefault();
      openModal();
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('is-active')) {
      closeModal();
    }
  });
}

/**
 * 8. Scroll Reveal Animations
 */
function initScrollAnimations() {
  const elements = document.querySelectorAll('.fade-on-scroll');
  if (!elements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  elements.forEach(el => observer.observe(el));
}

// Make showToast available globally
window.showToast = showToast;
