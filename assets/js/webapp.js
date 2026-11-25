/**
 * CLINTON RESTAURANT — Web Application Suite Controller (Michelin-Tier Polish)
 * Features: Dish Quick-View Provenance, Course-Organized Cart, Architectural Floor Plan,
 * Sommelier AI Engine, Self-Service Bookings, Privé VIP Pass, and Maître D' Dashboard.
 */

document.addEventListener('DOMContentLoaded', () => {
  initPwaSupport();
  injectWebAppDock();
  injectWebAppModals();
  initCartController();
  initFloorPlanController();
  initSommelierConcierge();
  initMyBookingsController();
  initVipController();
  initMaitreDController();
  initDishDetailModal();
  wireMenuInteractions();
});

/**
 * 0. High-End Audio Feedback via Web Audio API (Zero External Files)
 */
function playLuxuryChime(type = 'chime') {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    if (type === 'chime') {
      osc.frequency.setValueAtTime(880, ctx.currentTime); // A5
      osc.frequency.exponentialRampToValueAtTime(1760, ctx.currentTime + 0.15); // A6
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.6);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.6);
    } else if (type === 'success') {
      osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
      osc.frequency.setValueAtTime(659.25, ctx.currentTime + 0.1); // E5
      osc.frequency.setValueAtTime(783.99, ctx.currentTime + 0.2); // G5
      gain.gain.setValueAtTime(0.07, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.8);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.8);
    }
  } catch (e) {
    // Gracefully ignore audio autoplay restrictions
  }
}

/**
 * 1. PWA Service Worker Registration & Install Prompt
 */
let deferredPrompt = null;
function initPwaSupport() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js')
      .then(reg => console.log('Clinton PWA Service Worker Registered', reg.scope))
      .catch(err => console.log('Service Worker Failed', err));
  }

  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    const installBtns = document.querySelectorAll('#pwaInstallBtn');
    installBtns.forEach(btn => {
      btn.style.display = 'inline-flex';
      btn.addEventListener('click', () => {
        if (deferredPrompt) {
          deferredPrompt.prompt();
          deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
              window.showToast?.('Clinton Privé App Installed to Home Screen!');
            }
            deferredPrompt = null;
            btn.style.display = 'none';
          });
        }
      });
    });
  });
}

/**
 * 2. Floating Luxury App Action Dock
 */
function injectWebAppDock() {
  if (document.querySelector('.app-floating-dock')) return;

  const dock = document.createElement('div');
  dock.className = 'app-floating-dock';
  dock.setAttribute('role', 'toolbar');
  dock.setAttribute('aria-label', 'Clinton WebApp Quick Access');
  dock.innerHTML = `
    <button class="dock-btn is-highlight" id="dockCartBtn" aria-label="Dining Cart">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
      <span>Tasting Cart</span>
      <span class="dock-badge cart-badge-count" style="display: none;">0</span>
    </button>
    <div class="dock-divider"></div>
    <button class="dock-btn" id="dockFloorBtn" aria-label="Restaurant Floor Plan">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg>
      <span>Floor Plan</span>
    </button>
    <button class="dock-btn" id="dockSommelierBtn" aria-label="Sommelier Concierge">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M8 21h8M12 17v4M7 4h10l-2 9a4 4 0 0 1-8 0L5 4z"></path></svg>
      <span>Sommelier</span>
    </button>
    <button class="dock-btn" id="dockBookingsBtn" aria-label="My Bookings">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
      <span>My Bookings</span>
    </button>
    <button class="dock-btn" id="dockVipBtn" aria-label="Privé VIP">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
      <span>Privé VIP</span>
    </button>
    <div class="dock-divider"></div>
    <button class="dock-btn" id="dockMaitreDBtn" title="Maître D' Dashboard" aria-label="Staff Portal">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><polyline points="17 11 19 13 23 9"></polyline></svg>
      <span>Maître D'</span>
    </button>
  `;
  document.body.appendChild(dock);

  updateCartBadge();
  window.addEventListener('clinton:cart-updated', updateCartBadge);
}

function updateCartBadge() {
  const cart = window.ClintonStore?.getCart() || [];
  const count = cart.reduce((sum, item) => sum + item.qty, 0);
  const badges = document.querySelectorAll('.cart-badge-count');
  badges.forEach(badge => {
    if (count > 0) {
      badge.textContent = count;
      badge.style.display = 'flex';
    } else {
      badge.style.display = 'none';
    }
  });
}

/**
 * 3. Inject Full WebApp Modals & Side-Drawers
 */
function injectWebAppModals() {
  if (document.getElementById('cartDrawer')) return;

  const modalsHtml = `
    <!-- A. SLIDE-OUT ORDER CART DRAWER -->
    <div class="cart-drawer-overlay" id="cartOverlay"></div>
    <aside class="cart-drawer" id="cartDrawer" role="dialog" aria-label="Gastronomy Cart">
      <div class="cart-header">
        <div class="cart-title-wrap">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
          <h3 class="cart-title">Degustation Order</h3>
        </div>
        <button class="drawer-close" id="closeCartBtn" aria-label="Close cart">&times;</button>
      </div>

      <div class="cart-body" id="cartItemsList">
        <!-- Rendered via JS -->
      </div>

      <div class="cart-footer">
        <div class="cart-total-row">
          <span>Subtotal</span>
          <span id="cartSubtotal">$0</span>
        </div>
        <div class="cart-total-row">
          <span>Sommelier & Brigade Gratuity (20%)</span>
          <span id="cartTip">$0</span>
        </div>
        <div class="cart-total-row grand-total">
          <span>Grand Total</span>
          <span id="cartTotal">$0</span>
        </div>
        <button class="btn btn-gold btn-lg" style="width: 100%; margin-top: 1.25rem;" id="checkoutBtn">
          Transmit Order to Kitchen Brigade
        </button>
      </div>
    </aside>

    <!-- B. DISH DETAIL QUICK-VIEW MODAL -->
    <div class="modal-overlay" id="dishDetailModal" role="dialog" aria-hidden="true">
      <div class="modal-content" style="max-width: 820px;">
        <button class="modal-close-btn" data-close="dishDetailModal">&times;</button>
        <div class="dish-detail-layout" id="dishDetailBody">
          <!-- Rendered via JS -->
        </div>
      </div>
    </div>

    <!-- C. INTERACTIVE ARCHITECTURAL FLOOR PLAN MODAL -->
    <div class="modal-overlay" id="floorPlanModal" role="dialog" aria-hidden="true">
      <div class="modal-content" style="max-width: 900px;">
        <button class="modal-close-btn" data-close="floorPlanModal">&times;</button>
        <div style="text-align: center; margin-bottom: 1.5rem;">
          <div class="section-eyebrow">Architectural Blueprint</div>
          <h3 style="font-size: 2.2rem; margin-bottom: 0.5rem;">Select Your Table</h3>
          <p style="color: var(--color-cream-muted); font-size: 0.95rem;">
            Click on any dining alcove below to review its vantage, capacity, and assign it to your reservation.
          </p>
        </div>

        <div class="floor-plan-container">
          <div class="floor-plan-blueprint-bg"></div>
          <div class="floor-zones-legend">
            <span class="legend-chip"><span class="legend-dot available"></span> Available</span>
            <span class="legend-chip"><span class="legend-dot selected"></span> Selected</span>
            <span class="legend-chip"><span class="legend-dot reserved"></span> Occupied</span>
          </div>
          <div class="floor-zones-wrapper" id="floorPlanGrid">
            <!-- Populated via JS -->
          </div>
        </div>

        <div style="margin-top: 1.8rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem; border-top: 1px solid rgba(232, 185, 27, 0.2); padding-top: 1.25rem;">
          <div>
            <span style="color: var(--color-cream-dim); font-size: 0.82rem; text-transform: uppercase; letter-spacing: 0.1em; display: block;">Selected Dining Location:</span>
            <strong id="activeSelectedTableText" style="color: var(--color-mustard-gold); font-size: 1.15rem; font-family: var(--font-serif-accent);">Table 01 (Grand Dining Salon)</strong>
          </div>
          <button class="btn btn-gold btn-sm" id="confirmTableSelectionBtn">
            Assign Table & Open Booking &rarr;
          </button>
        </div>
      </div>
    </div>

    <!-- D. SOMMELIER CONCIERGE MODAL -->
    <div class="modal-overlay" id="sommelierModal" role="dialog" aria-hidden="true">
      <div class="modal-content" style="max-width: 740px;">
        <button class="modal-close-btn" data-close="sommelierModal">&times;</button>
        <div style="text-align: center; margin-bottom: 2rem;">
          <div class="section-eyebrow">Grand Sommelier Pairing</div>
          <h3 style="font-size: 2.2rem; margin-bottom: 0.5rem;">Cellar Pairing Concierge</h3>
          <p style="color: var(--color-cream-muted); font-size: 0.95rem;">
            Pair your Continental dish with rare vintages from our 2,800-bottle subterranean vault.
          </p>
        </div>

        <div class="sommelier-wizard">
          <div class="form-group" style="text-align: left;">
            <label class="form-label">Select Your Continental Entrée</label>
            <select class="form-control" id="sommelierEntreeSelect">
              <option value="Filet Mignon au Poivre">Filet Mignon au Poivre (Prime Black Angus & Truffles)</option>
              <option value="Chilean Sea Bass Royale">Chilean Sea Bass Royale (Saffron Velouté & Oscietra Caviar)</option>
              <option value="Canard Rôti à l'Orange">Canard Rôti à l'Orange (Crisp Moulard Duck & Figs)</option>
              <option value="Risotto ai Funghi Porcini">Risotto ai Funghi Porcini (Tuscan Porcini & Winter Truffle)</option>
              <option value="Ravioli d'Astice & Caviar">Ravioli d'Astice (Maine Lobster & Cognac Bisque)</option>
              <option value="Fondant au Chocolat Valrhona">Fondant au Chocolat Valrhona (70% Guanaja Molten)</option>
            </select>
          </div>

          <button class="btn btn-gold btn-sm" style="margin-top: 1rem;" id="matchWineBtn">
            Calculate Sommelier Pairing
          </button>

          <div id="pairingResultWrap"></div>
        </div>
      </div>
    </div>

    <!-- E. MY BOOKINGS SELF-SERVICE PORTAL -->
    <div class="modal-overlay" id="myBookingsModal" role="dialog" aria-hidden="true">
      <div class="modal-content" style="max-width: 760px;">
        <button class="modal-close-btn" data-close="myBookingsModal">&times;</button>
        <div style="text-align: center; margin-bottom: 2rem;">
          <div class="section-eyebrow">Guest Concierge Desk</div>
          <h3 style="font-size: 2.2rem; margin-bottom: 0.5rem;">My Table Reservations</h3>
          <p style="color: var(--color-cream-muted); font-size: 0.95rem;">
            Verify your table assignment, download digital passes, or adjust your dining details.
          </p>
        </div>

        <div style="display: flex; gap: 0.75rem; margin-bottom: 1.5rem;">
          <input type="text" class="form-control" id="bookingSearchInput" placeholder="Enter Booking Reference (e.g. CR-882941) or Guest Name...">
          <button class="btn btn-outline-gold btn-sm" id="bookingSearchBtn">Search</button>
        </div>

        <div id="bookingsListContainer" style="display: flex; flex-direction: column; gap: 1rem;">
          <!-- Rendered via JS -->
        </div>
      </div>
    </div>

    <!-- F. PRIVÉ VIP CLUB MODAL -->
    <div class="modal-overlay" id="vipModal" role="dialog" aria-hidden="true">
      <div class="modal-content" style="max-width: 640px;">
        <button class="modal-close-btn" data-close="vipModal">&times;</button>
        <div class="vip-pass-card">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1.25rem;">
            <div>
              <div class="vip-chip-metal"></div>
              <span class="badge badge-gold">PRIVÉ CLUB ÉLITE</span>
            </div>
            <div style="text-align: right;">
              <span style="font-family: var(--font-serif-accent); font-weight: 700; color: var(--color-mustard-gold); font-size: 1.4rem;">CR</span>
              <span style="display: block; font-size: 0.72rem; color: var(--color-cream-dim); letter-spacing: 0.15em;">CLINTON RESTAURANT</span>
            </div>
          </div>

          <h3 style="font-size: 1.9rem; margin-bottom: 0.25rem;" id="vipGuestName">Lord & Lady Clinton</h3>
          <p style="font-family: var(--font-serif-accent); color: var(--color-mustard-gold); font-size: 1.15rem; margin-bottom: 1.5rem;" id="vipTierName">
            Grand Cru Élite Member
          </p>

          <div style="background: rgba(0,0,0,0.5); border: 1px solid rgba(232, 185, 27, 0.25); border-radius: var(--radius-xs); padding: 1.1rem 1.4rem; display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.75rem;">
            <div>
              <span style="color: var(--color-cream-dim); font-size: 0.8rem; text-transform: uppercase;">Dining Credits & Points</span>
              <strong style="color: var(--color-pure-white); font-size: 1.45rem; display: block;" id="vipPoints">1,850 pts</strong>
            </div>
            <div style="text-align: right;">
              <span style="color: var(--color-cream-dim); font-size: 0.8rem; text-transform: uppercase;">Digital Pass Code</span>
              <span style="color: var(--color-mustard-gold); font-family: monospace; font-size: 1.05rem; font-weight: 700;" id="vipPassCode">VIP-CR-9921</span>
            </div>
          </div>

          <div style="border-top: 1px solid rgba(232, 185, 27, 0.22); padding-top: 1.25rem;">
            <span style="color: var(--color-cream-dim); font-size: 0.82rem; text-transform: uppercase; display: block; margin-bottom: 0.65rem;">Active Privileges:</span>
            <ul style="font-size: 0.92rem; color: var(--color-warm-cream); display: flex; flex-direction: column; gap: 0.45rem;" id="vipPerksList">
              <li>&bull; Priority Cellar Reserve Booking within 1 Hour</li>
              <li>&bull; Complimentary 2012 Dom Pérignon Vintage on Arrival</li>
              <li>&bull; Direct Maître D' Concierge Line & Table Choice</li>
              <li>&bull; Annual Invitation to White Truffle Degustation Gala</li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <!-- G. MAÎTRE D' OPERATIONS DASHBOARD MODAL -->
    <div class="modal-overlay" id="maitreDModal" role="dialog" aria-hidden="true">
      <div class="modal-content" style="max-width: 960px;">
        <button class="modal-close-btn" data-close="maitreDModal">&times;</button>
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.8rem; border-bottom: 1px solid rgba(232, 185, 27, 0.25); padding-bottom: 1.25rem;">
          <div>
            <div class="section-eyebrow">Front of House Operations</div>
            <h3 style="font-size: 2rem; margin: 0;">Maître D' Live Service Dashboard</h3>
          </div>
          <span class="badge badge-gold">LIVE DINNER SERVICE</span>
        </div>

        <div class="dashboard-metrics-grid">
          <div class="metric-stat-card">
            <div class="metric-stat-num" id="statCovers">24</div>
            <div class="metric-stat-label">Covers Confirmed</div>
          </div>
          <div class="metric-stat-card">
            <div class="metric-stat-num" id="statTablesActive">8 / 11</div>
            <div class="metric-stat-label">Tables Assigned</div>
          </div>
          <div class="metric-stat-card">
            <div class="metric-stat-num" id="statPendingOrders">4</div>
            <div class="metric-stat-label">Active Kitchen Tickets</div>
          </div>
          <div class="metric-stat-card">
            <div class="metric-stat-num" id="statCellarOccupancy">94%</div>
            <div class="metric-stat-label">Vault Capacity</div>
          </div>
        </div>

        <h4 style="font-size: 1.2rem; color: var(--color-pure-white); margin-bottom: 1rem;">Tonight's Guest Manifest & Table Seating</h4>
        <div style="max-height: 320px; overflow-y: auto;">
          <table class="live-bookings-table">
            <thead>
              <tr>
                <th>Booking Ref</th>
                <th>Guest</th>
                <th>Party</th>
                <th>Service Time</th>
                <th>Assigned Table</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody id="maitreDBookingsBody">
              <!-- Rendered via JS -->
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', modalsHtml);

  // Close handlers
  document.querySelectorAll('[data-close]').forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-close');
      const target = document.getElementById(targetId);
      if (target) target.classList.remove('is-active');
      document.body.style.overflow = '';
    });
  });
}

/**
 * 4. Course-Organized Tasting Cart Controller
 */
function initCartController() {
  const dockBtn = document.getElementById('dockCartBtn');
  const drawer = document.getElementById('cartDrawer');
  const overlay = document.getElementById('cartOverlay');
  const closeBtn = document.getElementById('closeCartBtn');
  const checkoutBtn = document.getElementById('checkoutBtn');

  function openCart() {
    renderCart();
    drawer.classList.add('is-active');
    overlay.classList.add('is-active');
    document.body.style.overflow = 'hidden';
  }

  function closeCart() {
    drawer.classList.remove('is-active');
    overlay.classList.remove('is-active');
    document.body.style.overflow = '';
  }

  if (dockBtn) dockBtn.addEventListener('click', openCart);
  if (closeBtn) closeBtn.addEventListener('click', closeCart);
  if (overlay) overlay.addEventListener('click', closeCart);

  function renderCart() {
    const list = document.getElementById('cartItemsList');
    const subtotalEl = document.getElementById('cartSubtotal');
    const tipEl = document.getElementById('cartTip');
    const totalEl = document.getElementById('cartTotal');
    const cart = window.ClintonStore?.getCart() || [];

    if (!list) return;

    if (cart.length === 0) {
      list.innerHTML = `
        <div style="text-align: center; margin: auto 0; padding: 2.5rem 1rem;">
          <svg style="width: 60px; height: 60px; margin: 0 auto 1.25rem auto; color: rgba(232, 185, 27, 0.4);" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
          </svg>
          <h4 style="font-size: 1.25rem; color: var(--color-pure-white); margin-bottom: 0.5rem;">Your Tasting Order is Empty</h4>
          <p style="color: var(--color-cream-muted); font-size: 0.92rem;">
            Explore our signature repertoire or consult the Sommelier Concierge to curate your multi-course degustation.
          </p>
        </div>
      `;
      if (subtotalEl) subtotalEl.textContent = '$0';
      if (tipEl) tipEl.textContent = '$0';
      if (totalEl) totalEl.textContent = '$0';
      if (checkoutBtn) checkoutBtn.disabled = true;
      return;
    }

    if (checkoutBtn) checkoutBtn.disabled = false;

    // Group items by course
    const groups = {};
    let subtotal = 0;
    cart.forEach(item => {
      const course = item.course || 'Haute Cuisine Course';
      if (!groups[course]) groups[course] = [];
      groups[course].push(item);
      subtotal += item.price * item.qty;
    });

    list.innerHTML = Object.keys(groups).map(course => `
      <div class="cart-course-group">
        <div class="cart-course-label">${course}</div>
        <div style="display: flex; flex-direction: column; gap: 0.85rem;">
          ${groups[course].map(item => `
            <div class="cart-item">
              <img src="${item.image}" alt="${item.name}" class="cart-item-img">
              <div class="cart-item-info">
                <h4 class="cart-item-name">${item.name}</h4>
                <span class="cart-item-price">$${item.price} each</span>
                ${item.pairing ? `<span class="cart-item-pairing">🍷 ${item.pairing}</span>` : ''}
                <div class="cart-qty-ctrl">
                  <button class="qty-btn" onclick="window.ClintonStore.updateCartQty('${item.dishId}', -1); window.playLuxuryChime('chime');">&minus;</button>
                  <span class="qty-val">${item.qty}</span>
                  <button class="qty-btn" onclick="window.ClintonStore.updateCartQty('${item.dishId}', 1); window.playLuxuryChime('chime');">&plus;</button>
                  <span style="margin-left: auto; font-family: var(--font-serif-accent); font-weight: 700; color: var(--color-pure-white); font-size: 1.05rem;">
                    $${item.price * item.qty}
                  </span>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `).join('');

    const tip = Math.round(subtotal * 0.20);
    const grandTotal = subtotal + tip;

    if (subtotalEl) subtotalEl.textContent = `$${subtotal}`;
    if (tipEl) tipEl.textContent = `$${tip}`;
    if (totalEl) totalEl.textContent = `$${grandTotal}`;
  }

  window.addEventListener('clinton:cart-updated', () => {
    if (drawer.classList.contains('is-active')) {
      renderCart();
    }
  });

  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
      const cart = window.ClintonStore?.getCart() || [];
      if (cart.length === 0) return;

      const orderRef = 'ORD-CR-' + Math.floor(1000 + Math.random() * 9000);
      window.ClintonStore.addOrder({
        id: orderRef,
        items: cart,
        total: document.getElementById('cartTotal')?.textContent || '$0',
        createdAt: new Date().toLocaleTimeString(),
        status: 'In Kitchen Preparation'
      });

      window.ClintonStore.clearCart();
      closeCart();
      window.playLuxuryChime('success');

      if (window.showToast) {
        window.showToast(`Order ${orderRef} transmitted to Executive Chef Vance! Preparation underway.`);
      }
    });
  }
}

/**
 * 5. Architectural Floor Plan Controller
 */
let activeSelectedTable = null;
function initFloorPlanController() {
  const dockBtn = document.getElementById('dockFloorBtn');
  const modal = document.getElementById('floorPlanModal');
  const grid = document.getElementById('floorPlanGrid');
  const activeLabel = document.getElementById('activeSelectedTableText');
  const confirmBtn = document.getElementById('confirmTableSelectionBtn');

  if (dockBtn && modal) {
    dockBtn.addEventListener('click', () => {
      renderFloorPlan();
      modal.classList.add('is-active');
      document.body.style.overflow = 'hidden';
    });
  }

  function renderFloorPlan() {
    const tables = window.ClintonStore?.getTables() || [];
    if (!grid) return;

    grid.innerHTML = tables.map(t => {
      const isReserved = t.status === 'reserved';
      const isSelected = activeSelectedTable && activeSelectedTable.id === t.id;
      return `
        <div class="table-node-card ${isReserved ? 'is-reserved' : ''} ${isSelected ? 'is-selected' : ''}" 
             data-table-id="${t.id}" onclick="window.selectFloorTable('${t.id}')">
          <svg class="table-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
            <circle cx="12" cy="12" r="3"></circle>
          </svg>
          <div class="table-node-title">${t.name}</div>
          <div class="table-node-meta">${t.seats} Seats &bull; ${t.zone}</div>
          <div style="font-size: 0.72rem; color: var(--color-cream-muted); margin-top: 0.35rem; font-style: italic;">
            ${t.view}
          </div>
          <span class="table-status-pill" style="color: ${isReserved ? '#EF4444' : (isSelected ? '#E8B91B' : '#4ADE80')}">
            ${isReserved ? 'Occupied' : (isSelected ? 'Selected' : 'Available')}
          </span>
        </div>
      `;
    }).join('');
  }

  window.selectFloorTable = (tableId) => {
    const tables = window.ClintonStore?.getTables() || [];
    const t = tables.find(item => item.id === tableId);
    if (!t || t.status === 'reserved') {
      window.showToast?.('Table is currently occupied for service.', 'error');
      return;
    }
    activeSelectedTable = t;
    if (activeLabel) activeLabel.textContent = `${t.name} (${t.zone} &bull; ${t.seats} Seats)`;
    window.playLuxuryChime('chime');
    renderFloorPlan();
  };

  if (confirmBtn) {
    confirmBtn.addEventListener('click', () => {
      if (!activeSelectedTable) {
        window.showToast?.('Please select an available table from the blueprint.', 'error');
        return;
      }
      modal.classList.remove('is-active');
      document.body.style.overflow = '';
      
      // Auto-populate table selection into reservation form
      const seatingInputs = document.querySelectorAll('input[name="seating_area"]');
      seatingInputs.forEach(input => input.value = `${activeSelectedTable.zone} (${activeSelectedTable.name})`);

      const openModalBtn = document.querySelector('[data-open-modal="reservation"]');
      if (openModalBtn) openModalBtn.click();

      window.showToast?.(`${activeSelectedTable.name} assigned to your reservation!`);
    });
  }
}

/**
 * 6. Sommelier Concierge AI Engine
 */
function initSommelierConcierge() {
  const dockBtn = document.getElementById('dockSommelierBtn');
  const modal = document.getElementById('sommelierModal');
  const matchBtn = document.getElementById('matchWineBtn');
  const resultWrap = document.getElementById('pairingResultWrap');

  if (dockBtn && modal) {
    dockBtn.addEventListener('click', () => {
      modal.classList.add('is-active');
      document.body.style.overflow = 'hidden';
    });
  }

  const PAIRINGS_KNOWLEDGE = {
    'Filet Mignon au Poivre': {
      wine: '2016 Château Margaux Premier Grand Cru Classé',
      region: 'Margaux, Bordeaux, France',
      notes: 'Deep ruby robes with velvety blackberry, cedarwood, and refined tannins that slice effortlessly through the peppery cognac reduction.',
      price: '$180 per bottle',
      temp: 'Served at 17°C'
    },
    'Chilean Sea Bass Royale': {
      wine: '2020 Domaine des Comtes Lafon Meursault Premier Cru',
      region: 'Burgundy, France',
      notes: 'Luminous golden hue with aromas of toasted hazelnut, ripe Meyer lemon, and flinty minerality that elevates the saffron fennel emulsion.',
      price: '$145 per bottle',
      temp: 'Served at 11°C'
    },
    'Canard Rôti à l\'Orange': {
      wine: '2018 Domaine Armand Rousseau Gevrey-Chambertin',
      region: 'Côte de Nuits, Burgundy, France',
      notes: 'Silky red cherry, orange blossom, and subtle forest floor notes that accentuate the caramel tones of the Seville orange gastrique.',
      price: '$165 per bottle',
      temp: 'Served at 16°C'
    },
    'Risotto ai Funghi Porcini': {
      wine: '2017 Biondi-Santi Brunello di Montalcino Tenuta Greppo',
      region: 'Tuscany, Italy',
      notes: 'Noble leather, dried violets, and earthy porcini undertones creating an exquisite harmonic resonance with black winter truffles.',
      price: '$150 per bottle',
      temp: 'Served at 18°C'
    },
    'Ravioli d\'Astice & Caviar': {
      wine: '2021 William Fèvre Chablis Grand Cru Les Clos',
      region: 'Chablis, Burgundy, France',
      notes: 'Chiseled limestone salinity, white peach, and crystalline acidity balancing the decadent cognac lobster bisque.',
      price: '$135 per bottle',
      temp: 'Served at 10°C'
    },
    'Fondant au Chocolat Valrhona': {
      wine: 'Taylor Fladgate 20-Year-Old Tawny Port',
      region: 'Douro Valley, Portugal',
      notes: 'Opulent fig, roasted walnut, and caramel spices providing a luxurious counterpoint to the bittersweet molten Guanaja chocolate.',
      price: '$95 per bottle',
      temp: 'Served at 14°C'
    }
  };

  if (matchBtn) {
    matchBtn.addEventListener('click', () => {
      const entree = document.getElementById('sommelierEntreeSelect')?.value;
      const pairing = PAIRINGS_KNOWLEDGE[entree] || PAIRINGS_KNOWLEDGE['Filet Mignon au Poivre'];

      window.playLuxuryChime('chime');

      if (resultWrap) {
        resultWrap.innerHTML = `
          <div class="pairing-result-box">
            <div style="font-size: 3.2rem;">🍷</div>
            <div>
              <span class="pairing-wine-badge">Head Sommelier Selection</span>
              <h4 style="font-size: 1.35rem; color: var(--color-pure-white); margin-bottom: 0.25rem;">${pairing.wine}</h4>
              <p style="font-size: 0.88rem; color: var(--color-mustard-gold); margin-bottom: 0.75rem;">${pairing.region} &bull; ${pairing.temp}</p>
              <p style="font-size: 0.95rem; color: var(--color-cream-muted); line-height: 1.6; margin-bottom: 1.25rem;">
                ${pairing.notes}
              </p>
              <button class="btn btn-gold btn-sm" onclick="window.showToast('Vintage ${escapeJs(pairing.wine)} added to your order!'); window.playLuxuryChime('success');">
                Add Vintage to Order (${pairing.price})
              </button>
            </div>
          </div>
        `;
      }
    });
  }
}

/**
 * 7. My Bookings Self-Service Portal Controller
 */
function initMyBookingsController() {
  const dockBtn = document.getElementById('dockBookingsBtn');
  const modal = document.getElementById('myBookingsModal');
  const container = document.getElementById('bookingsListContainer');
  const searchInput = document.getElementById('bookingSearchInput');
  const searchBtn = document.getElementById('bookingSearchBtn');

  if (dockBtn && modal) {
    dockBtn.addEventListener('click', () => {
      renderBookings();
      modal.classList.add('is-active');
      document.body.style.overflow = 'hidden';
    });
  }

  function renderBookings(query = '') {
    if (!container) return;
    const list = window.ClintonStore?.getReservations() || [];
    const filtered = query.trim()
      ? list.filter(r => r.id.toLowerCase().includes(query.toLowerCase()) || r.name.toLowerCase().includes(query.toLowerCase()))
      : list;

    if (filtered.length === 0) {
      container.innerHTML = `
        <div style="text-align: center; padding: 2.5rem 1rem; color: var(--color-cream-dim);">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="margin: 0 auto 1rem auto; opacity: 0.4;"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line></svg>
          <p>No dining reservations found matching "${query}".</p>
        </div>
      `;
      return;
    }

    container.innerHTML = filtered.map(r => `
      <div style="background: var(--color-charcoal-surface); border: 1px solid rgba(232, 185, 27, 0.25); border-radius: var(--radius-xs); padding: 1.5rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
        <div>
          <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.35rem;">
            <span style="font-family: var(--font-serif-accent); font-weight: 700; color: var(--color-mustard-gold); font-size: 1.1rem;">${r.id}</span>
            <span class="badge ${r.status === 'Cancelled' ? 'badge-olive' : 'badge-gold'}">${r.status}</span>
          </div>
          <h4 style="font-size: 1.2rem; color: var(--color-pure-white); margin-bottom: 0.35rem;">${r.name} &bull; ${r.guests}</h4>
          <p style="font-size: 0.9rem; color: var(--color-cream-muted); margin: 0;">
            📅 ${r.date} at ${r.time} &bull; 🏛️ ${r.seating || 'Grand Dining Salon'}
          </p>
        </div>
        <div style="display: flex; gap: 0.75rem;">
          <button class="btn btn-outline-gold btn-sm" onclick="window.downloadCalendarPass('${r.id}', '${r.date}', '${r.time}')">
            Add to iCal
          </button>
          ${r.status !== 'Cancelled' ? `
            <button class="btn btn-sm" style="border: 1px solid #EF4444; color: #EF4444; background: transparent;" onclick="window.cancelUserBooking('${r.id}')">
              Cancel
            </button>
          ` : ''}
        </div>
      </div>
    `).join('');
  }

  if (searchBtn && searchInput) {
    searchBtn.addEventListener('click', () => renderBookings(searchInput.value));
    searchInput.addEventListener('keyup', (e) => {
      if (e.key === 'Enter') renderBookings(searchInput.value);
    });
  }

  window.cancelUserBooking = (id) => {
    if (confirm(`Are you certain you wish to cancel reservation ${id}?`)) {
      window.ClintonStore.cancelReservation(id);
      renderBookings(searchInput?.value || '');
      window.showToast?.(`Reservation ${id} has been cancelled.`);
    }
  };

  window.downloadCalendarPass = (ref, date, time) => {
    const icsContent = `BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//Clinton Restaurant//Dining Reservation//EN\nBEGIN:VEVENT\nSUMMARY:Dining Reservation at Clinton Restaurant\nDESCRIPTION:Booking Reference: ${ref}\\nContinental Haute Cuisine\nLOCATION:742 Grand Boulevard, Manhattan, NY\nDTSTART:${date.replace(/-/g, '')}T${time.replace(':', '')}00\nEND:VEVENT\nEND:VCALENDAR`;
    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `Clinton-Reservation-${ref}.ics`;
    link.click();
    window.showToast?.('Calendar pass (.ics) downloaded!');
  };
}

/**
 * 8. Privé VIP Club Controller
 */
function initVipController() {
  const dockBtn = document.getElementById('dockVipBtn');
  const modal = document.getElementById('vipModal');

  if (dockBtn && modal) {
    dockBtn.addEventListener('click', () => {
      const vip = window.ClintonStore?.getVip();
      if (vip) {
        document.getElementById('vipGuestName').textContent = vip.name;
        document.getElementById('vipTierName').textContent = vip.tier;
        document.getElementById('vipPoints').textContent = `${vip.points} pts`;
        document.getElementById('vipPassCode').textContent = vip.code;
      }
      modal.classList.add('is-active');
      document.body.style.overflow = 'hidden';
      window.playLuxuryChime('chime');
    });
  }
}

/**
 * 9. Maître D' Staff Dashboard Controller
 */
function initMaitreDController() {
  const dockBtn = document.getElementById('dockMaitreDBtn');
  const modal = document.getElementById('maitreDModal');
  const tbody = document.getElementById('maitreDBookingsBody');

  if (dockBtn && modal) {
    dockBtn.addEventListener('click', () => {
      renderMaitreD();
      modal.classList.add('is-active');
      document.body.style.overflow = 'hidden';
    });
  }

  function renderMaitreD() {
    const list = window.ClintonStore?.getReservations() || [];
    if (!tbody) return;

    tbody.innerHTML = list.map(r => `
      <tr>
        <td style="font-family: monospace; font-weight: 700; color: var(--color-mustard-gold);">${r.id}</td>
        <td><strong>${r.name}</strong></td>
        <td>${r.guests}</td>
        <td>${r.time}</td>
        <td>${r.seating}</td>
        <td><span class="badge ${r.status === 'Cancelled' ? 'badge-olive' : 'badge-gold'}">${r.status}</span></td>
        <td>
          ${r.status === 'Confirmed' ? `
            <button class="btn btn-gold btn-sm" style="padding: 0.35rem 0.75rem; font-size: 0.75rem;" onclick="window.seatGuest('${r.id}')">
              Seat Guest
            </button>
          ` : '<span style="color: var(--color-cream-dim); font-size: 0.85rem;">Seated</span>'}
        </td>
      </tr>
    `).join('');
  }

  window.seatGuest = (id) => {
    const list = window.ClintonStore.getReservations();
    const item = list.find(r => r.id === id);
    if (item) {
      item.status = 'Seated';
      localStorage.setItem('clinton_reservations_v2', JSON.stringify(list));
      renderMaitreD();
      window.playLuxuryChime('success');
      window.showToast?.(`Guest ${item.name} has been seated.`);
    }
  };
}

/**
 * 10. Dish Detail Quick-View Modal
 */
function initDishDetailModal() {
  window.openDishDetail = (dishId) => {
    const dish = window.ClintonStore?.getDishById(dishId);
    if (!dish) return;

    const modal = document.getElementById('dishDetailModal');
    const body = document.getElementById('dishDetailBody');
    if (!modal || !body) return;

    body.innerHTML = `
      <div>
        <img src="${dish.image}" alt="${dish.name}" class="dish-detail-img">
      </div>
      <div>
        <span class="badge badge-gold" style="margin-bottom: 0.6rem;">${dish.course}</span>
        <h3 style="font-size: 2rem; color: var(--color-pure-white); margin-bottom: 0.2rem;">${dish.name}</h3>
        <p style="font-family: var(--font-serif-accent); color: var(--color-mustard-gold); font-size: 0.95rem; margin-bottom: 0.75rem;">${dish.sub}</p>
        <p style="font-size: 1.05rem; color: var(--color-warm-cream); line-height: 1.7; margin-bottom: 1.25rem;">
          ${dish.desc}
        </p>

        <div class="dish-provenance-box">
          <strong style="color: var(--color-mustard-gold); display: block; margin-bottom: 0.35rem; font-family: var(--font-serif-accent); letter-spacing: 0.08em; text-transform: uppercase;">Terroir & Provenance:</strong>
          ${dish.provenance}
        </div>

        <div style="display: flex; gap: 1.5rem; margin: 1.25rem 0; font-size: 0.88rem; color: var(--color-cream-dim);">
          <span>🔥 ${dish.calories}</span>
          <span>⏱️ ${dish.prepTime}</span>
          <span>🍷 ${dish.pairing}</span>
        </div>

        <div style="display: flex; gap: 1rem; align-items: center; margin-top: 1.5rem;">
          <span style="font-family: var(--font-serif-accent); font-size: 1.8rem; font-weight: 700; color: var(--color-mustard-gold);">$${dish.price}</span>
          <button class="btn btn-gold btn-lg" style="flex: 1;" onclick="window.ClintonStore.addToCart('${dish.id}', 1); window.playLuxuryChime('chime'); window.showToast('${escapeJs(dish.name)} added to your degustation order!'); document.getElementById('dishDetailModal').classList.remove('is-active');">
            Add to Tasting Order
          </button>
        </div>
      </div>
    `;

    modal.classList.add('is-active');
    document.body.style.overflow = 'hidden';
  };
}

/**
 * 11. Wire Interactive Clicks on Menu Cards
 */
function wireMenuInteractions() {
  const cards = document.querySelectorAll('.menu-card');
  cards.forEach((card, idx) => {
    const dishId = `dish-${(idx % 8) + 1}`;
    
    // Make image clickable for quick-view
    const img = card.querySelector('.menu-card-img');
    if (img) {
      img.style.cursor = 'pointer';
      img.title = 'Click for dish provenance & details';
      img.addEventListener('click', () => window.openDishDetail(dishId));
    }

    // Make title clickable
    const title = card.querySelector('.menu-card-title');
    if (title) {
      title.style.cursor = 'pointer';
      title.title = 'Click for dish provenance & details';
      title.addEventListener('click', () => window.openDishDetail(dishId));
    }

    // Add quick order button if not present
    const footer = card.querySelector('.menu-card-footer');
    if (footer && !card.querySelector('.menu-order-btn')) {
      const orderBtn = document.createElement('button');
      orderBtn.className = 'btn btn-outline-gold btn-sm menu-order-btn';
      orderBtn.style.padding = '0.4rem 0.85rem';
      orderBtn.style.fontSize = '0.78rem';
      orderBtn.textContent = '+ Order';
      
      orderBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        window.ClintonStore.addToCart(dishId, 1);
        window.playLuxuryChime('chime');
        window.showToast?.(`Added to your dining cart!`);
      });

      footer.appendChild(orderBtn);
    }
  });
}

function escapeJs(str) {
  return (str || '').replace(/'/g, "\\'");
}

// Global hook
window.playLuxuryChime = playLuxuryChime;
