/**
 * CLINTON RESTAURANT — CONTINENTAL CUISINE
 * Cinematic Hero Slider Engine (Slider Revolution Inspired)
 * Features: Ken Burns Zoom, Progress Timer Bar, Touch Gestures, Pause on Hover, Smooth Layer Staggers
 */

class LuxuryHeroSlider {
  constructor(containerSelector, options = {}) {
    this.container = document.querySelector(containerSelector);
    if (!this.container) return;

    this.slides = this.container.querySelectorAll('.hero-slide');
    if (!this.slides.length) return;

    this.currentIndex = 0;
    this.totalSlides = this.slides.length;
    this.duration = options.duration || 6500; // ms
    this.timer = null;
    this.startTime = null;
    this.remainingTime = this.duration;
    this.isPaused = false;

    // Controls
    this.prevBtn = document.querySelector('.slider-arrow-prev');
    this.nextBtn = document.querySelector('.slider-arrow-next');
    this.indicatorDots = document.querySelectorAll('.slider-indicator-dot');
    this.timerFill = document.querySelector('.slider-timer-bar-fill');
    this.currentNumberEl = document.querySelector('.slider-current-num');
    this.totalNumberEl = document.querySelector('.slider-total-num');

    // Touch support
    this.touchStartX = 0;
    this.touchEndX = 0;

    this.init();
  }

  init() {
    if (this.totalNumberEl) {
      this.totalNumberEl.textContent = `0${this.totalSlides}`;
    }

    this.bindEvents();
    this.goToSlide(0);
  }

  bindEvents() {
    // Arrow buttons
    if (this.prevBtn) {
      this.prevBtn.addEventListener('click', () => {
        this.prevSlide();
        this.resetTimer();
      });
    }

    if (this.nextBtn) {
      this.nextBtn.addEventListener('click', () => {
        this.nextSlide();
        this.resetTimer();
      });
    }

    // Indicator dots
    this.indicatorDots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        if (this.currentIndex === index) return;
        this.goToSlide(index);
        this.resetTimer();
      });
    });

    // Pause on hover
    this.container.addEventListener('mouseenter', () => this.pause());
    this.container.addEventListener('mouseleave', () => this.resume());

    // Touch swipe support
    this.container.addEventListener('touchstart', (e) => {
      this.touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    this.container.addEventListener('touchend', (e) => {
      this.touchEndX = e.changedTouches[0].screenX;
      this.handleSwipe();
    }, { passive: true });

    // Keyboard navigation
    window.addEventListener('keydown', (e) => {
      if (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA') return;
      if (e.key === 'ArrowLeft') {
        this.prevSlide();
        this.resetTimer();
      } else if (e.key === 'ArrowRight') {
        this.nextSlide();
        this.resetTimer();
      }
    });
  }

  handleSwipe() {
    const swipeDistance = this.touchEndX - this.touchStartX;
    if (Math.abs(swipeDistance) > 45) {
      if (swipeDistance > 0) {
        this.prevSlide();
      } else {
        this.nextSlide();
      }
      this.resetTimer();
    }
  }

  goToSlide(index) {
    this.slides.forEach((slide, i) => {
      slide.classList.remove('is-active');
      // Reset background transform for re-triggering Ken Burns effect
      const bg = slide.querySelector('.hero-slide-bg');
      if (bg) {
        bg.style.transition = 'none';
        bg.style.transform = 'scale(1.03)';
      }
    });

    this.indicatorDots.forEach((dot, i) => {
      dot.classList.toggle('is-active', i === index);
    });

    this.currentIndex = index;
    const activeSlide = this.slides[this.currentIndex];
    activeSlide.classList.add('is-active');

    // Trigger smooth Ken Burns scale
    setTimeout(() => {
      const activeBg = activeSlide.querySelector('.hero-slide-bg');
      if (activeBg) {
        activeBg.style.transition = `transform ${this.duration + 1000}ms ease-out`;
        activeBg.style.transform = 'scale(1.14)';
      }
    }, 50);

    if (this.currentNumberEl) {
      this.currentNumberEl.textContent = `0${this.currentIndex + 1}`;
    }

    this.startProgressBar();
  }

  nextSlide() {
    const nextIndex = (this.currentIndex + 1) % this.totalSlides;
    this.goToSlide(nextIndex);
  }

  prevSlide() {
    const prevIndex = (this.currentIndex - 1 + this.totalSlides) % this.totalSlides;
    this.goToSlide(prevIndex);
  }

  startProgressBar() {
    if (this.timerFill) {
      this.timerFill.style.transition = 'none';
      this.timerFill.style.width = '0%';
      void this.timerFill.offsetWidth; // Force reflow
      this.timerFill.style.transition = `width ${this.duration}ms linear`;
      this.timerFill.style.width = '100%';
    }

    clearTimeout(this.timer);
    this.startTime = Date.now();
    this.remainingTime = this.duration;

    this.timer = setTimeout(() => {
      this.nextSlide();
    }, this.duration);
  }

  pause() {
    if (this.isPaused) return;
    this.isPaused = true;
    clearTimeout(this.timer);
    this.remainingTime -= Date.now() - this.startTime;

    if (this.timerFill) {
      const computedWidth = window.getComputedStyle(this.timerFill).width;
      this.timerFill.style.transition = 'none';
      this.timerFill.style.width = computedWidth;
    }
  }

  resume() {
    if (!this.isPaused) return;
    this.isPaused = false;

    if (this.timerFill) {
      this.timerFill.style.transition = `width ${Math.max(this.remainingTime, 200)}ms linear`;
      this.timerFill.style.width = '100%';
    }

    this.startTime = Date.now();
    this.timer = setTimeout(() => {
      this.nextSlide();
    }, Math.max(this.remainingTime, 200));
  }

  resetTimer() {
    clearTimeout(this.timer);
    this.startProgressBar();
  }
}

// Auto instantiate on load
document.addEventListener('DOMContentLoaded', () => {
  new LuxuryHeroSlider('.hero-slider-container');
});
