/**
 * CLINTON RESTAURANT — CONTINENTAL CUISINE
 * Interactive Menu Filtering & Culinary Showcase
 */

document.addEventListener('DOMContentLoaded', () => {
  initMenuTabs();
});

function initMenuTabs() {
  const tabButtons = document.querySelectorAll('.menu-tab-btn');
  const menuCards = document.querySelectorAll('.menu-card');

  if (!tabButtons.length || !menuCards.length) return;

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Toggle button states
      tabButtons.forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');

      const filterCategory = btn.getAttribute('data-category');

      // Filter cards with smooth fade
      menuCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');

        if (filterCategory === 'all' || cardCategory === filterCategory) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 20);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 250);
        }
      });
    });
  });
}
