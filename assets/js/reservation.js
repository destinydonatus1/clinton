/**
 * CLINTON RESTAURANT — CONTINENTAL CUISINE
 * Interactive Table Reservation & Dining Experience Booking Engine
 */

document.addEventListener('DOMContentLoaded', () => {
  initReservationForms();
});

function initReservationForms() {
  const forms = document.querySelectorAll('.reservation-form');
  if (!forms.length) return;

  forms.forEach(form => {
    // 1. Set default min date to today
    const dateInput = form.querySelector('input[type="date"]');
    if (dateInput) {
      const today = new Date().toISOString().split('T')[0];
      dateInput.min = today;
      if (!dateInput.value) {
        // Default to today or tomorrow
        dateInput.value = today;
      }
    }

    // 2. Interactive Time Slot Buttons
    const timeSlotBtns = form.querySelectorAll('.time-slot-btn');
    const hiddenTimeInput = form.querySelector('input[name="dining_time"]');

    timeSlotBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        timeSlotBtns.forEach(b => b.classList.remove('is-selected'));
        btn.classList.add('is-selected');
        if (hiddenTimeInput) {
          hiddenTimeInput.value = btn.getAttribute('data-time') || btn.textContent.trim();
        }
      });
    });

    // 3. Interactive Seating Cards
    const seatingCards = form.querySelectorAll('.seating-card');
    const hiddenSeatingInput = form.querySelector('input[name="seating_area"]');

    seatingCards.forEach(card => {
      card.addEventListener('click', () => {
        seatingCards.forEach(c => c.classList.remove('is-selected'));
        card.classList.add('is-selected');
        if (hiddenSeatingInput) {
          hiddenSeatingInput.value = card.getAttribute('data-seating') || card.querySelector('.seating-card-title').textContent.trim();
        }
      });
    });

    // 4. Form Submission & Confirmation Generation
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      // Collect data
      const guests = form.querySelector('[name="guests"]')?.value || '2 Guests';
      const date = form.querySelector('[name="date"]')?.value || new Date().toISOString().split('T')[0];
      const time = hiddenTimeInput?.value || form.querySelector('.time-slot-btn.is-selected')?.textContent.trim() || '19:30';
      const seating = hiddenSeatingInput?.value || form.querySelector('.seating-card.is-selected .seating-card-title')?.textContent.trim() || 'Grand Dining Salon';
      const name = form.querySelector('[name="name"]')?.value || 'Distinguished Guest';
      const email = form.querySelector('[name="email"]')?.value || '';
      const phone = form.querySelector('[name="phone"]')?.value || '';
      const occasion = form.querySelector('[name="occasion"]')?.value || 'Culinary Experience';
      const notes = form.querySelector('[name="notes"]')?.value || 'Standard Continental Service';

      // Validation check
      if (!email || !phone || !name) {
        if (window.showToast) {
          window.showToast('Please complete all contact fields to secure your reservation.', 'error');
        }
        return;
      }

      // Generate Reference Code
      const refCode = 'CR-' + Math.floor(100000 + Math.random() * 900000);

      // Save into WebApp Central Persistent Store
      if (window.ClintonStore) {
        window.ClintonStore.addReservation({
          id: refCode,
          name: name,
          email: email,
          phone: phone,
          date: date,
          time: time,
          guests: guests,
          seating: seating,
          occasion: occasion,
          notes: notes,
          status: 'Confirmed',
          createdAt: new Date().toISOString()
        });
      }

      // Render Confirmation View
      const parentContainer = form.closest('.reservation-card-box') || form.closest('.modal-content');
      if (parentContainer) {
        parentContainer.innerHTML = `
          <div style="text-align: center; padding: 2.5rem 1rem;">
            <div style="width: 72px; height: 72px; margin: 0 auto 1.5rem auto; border-radius: 50%; background: rgba(232, 185, 27, 0.15); border: 1px solid var(--color-mustard-gold); display: flex; align-items: center; justify-content: center; color: var(--color-mustard-gold);">
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
            </div>
            
            <div class="section-eyebrow" style="margin-bottom: 0.5rem;">Reservation Confirmed</div>
            <h3 style="font-family: var(--font-serif-display); font-size: 2rem; color: var(--color-pure-white); margin-bottom: 1rem;">We Await Your Arrival, ${escapeHtml(name)}</h3>
            <p style="color: var(--color-cream-muted); max-width: 520px; margin: 0 auto 2rem auto; font-size: 1.05rem;">
              Your table at <strong>Clinton Restaurant</strong> has been reserved. A formal confirmation dispatch with sommelier notes has been forwarded to <strong>${escapeHtml(email)}</strong>.
            </p>

            <div style="background-color: var(--color-charcoal-deep); border: 1px dashed var(--color-mustard-gold); border-radius: var(--radius-sm); padding: 1.8rem; max-width: 480px; margin: 0 auto 2.5rem auto; text-align: left;">
              <div style="display: flex; justify-content: space-between; border-bottom: 1px solid rgba(232, 185, 27, 0.2); padding-bottom: 0.8rem; margin-bottom: 0.8rem;">
                <span style="color: var(--color-cream-dim); font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.1em;">Booking Reference</span>
                <span style="color: var(--color-mustard-gold); font-family: var(--font-serif-accent); font-weight: 700; font-size: 1.1rem;">${refCode}</span>
              </div>
              <div style="display: flex; justify-content: space-between; margin-bottom: 0.6rem; font-size: 0.95rem;">
                <span style="color: var(--color-cream-dim);">Date & Time:</span>
                <span style="color: var(--color-pure-white); font-weight: 500;">${date} at ${time}</span>
              </div>
              <div style="display: flex; justify-content: space-between; margin-bottom: 0.6rem; font-size: 0.95rem;">
                <span style="color: var(--color-cream-dim);">Party Size:</span>
                <span style="color: var(--color-pure-white); font-weight: 500;">${guests}</span>
              </div>
              <div style="display: flex; justify-content: space-between; margin-bottom: 0.6rem; font-size: 0.95rem;">
                <span style="color: var(--color-cream-dim);">Dining Ambience:</span>
                <span style="color: var(--color-mustard-gold); font-weight: 500;">${seating}</span>
              </div>
              <div style="display: flex; justify-content: space-between; font-size: 0.95rem;">
                <span style="color: var(--color-cream-dim);">Special Occasion:</span>
                <span style="color: var(--color-pure-white);">${occasion}</span>
              </div>
            </div>

            <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
              <button onclick="window.print()" class="btn btn-outline-gold btn-sm">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></svg>
                Print Voucher
              </button>
              <button onclick="window.location.reload()" class="btn btn-gold btn-sm">
                Reserve Another Table
              </button>
            </div>
          </div>
        `;
      }

      if (window.showToast) {
        window.showToast(`Reservation ${refCode} confirmed! We look forward to hosting you.`);
      }
      if (window.playLuxuryChime) {
        window.playLuxuryChime('success');
      }
    });
  });
}

function escapeHtml(string) {
  const div = document.createElement('div');
  div.innerText = string;
  return div.innerHTML;
}
