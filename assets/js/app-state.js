/**
 * CLINTON RESTAURANT — Core WebApp Reactive State Engine
 * Manages Cart, Persistent Bookings, Interactive Floor Plan, VIP Club, and Orders.
 */

const ClintonStore = (() => {
  const STORAGE_KEYS = {
    CART: 'clinton_cart_v1',
    RESERVATIONS: 'clinton_reservations_v1',
    ORDERS: 'clinton_orders_v1',
    VIP: 'clinton_vip_v1',
    TABLES: 'clinton_tables_v1'
  };

  // 1. Rich Menu Catalog
  const DISHES = [
    {
      id: 'dish-1',
      name: 'Filet Mignon au Poivre',
      sub: 'Tenderloin de Bœuf Black Angus',
      category: 'mains',
      price: 68,
      desc: 'Center-cut Prime Black Angus beef, Madagascar green peppercorn cognac emulsion, charred broccolini, and potato gratin Dauphinois.',
      image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=400&q=80',
      badge: "Chef's Signature",
      pairing: '2016 Château Margaux',
      calories: '720 kcal',
      prepTime: '22 mins'
    },
    {
      id: 'dish-2',
      name: 'Chilean Sea Bass Royale',
      sub: 'Bar du Chili aux Émulsions de Safran',
      category: 'mains',
      price: 64,
      desc: 'Wild-caught Chilean bass, saffron fennel emulsion, braised Romanesco, and Oscietra caviar reduction.',
      image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=400&q=80',
      badge: 'Gluten-Free',
      pairing: '2020 Meursault Premier Cru',
      calories: '540 kcal',
      prepTime: '18 mins'
    },
    {
      id: 'dish-3',
      name: 'Carpaccio di Manzo',
      sub: 'Bœuf Wagyu & Truffes Blanches',
      category: 'starters',
      price: 28,
      desc: 'Thinly sliced Wagyu tenderloin, 36-month Parmigiano-Reggiano crisps, caperberries, wild baby arugula, and white truffle oil drizzle.',
      image: 'https://images.unsplash.com/photo-1541529086526-db283c563270?auto=format&fit=crop&w=400&q=80',
      badge: 'Organic Terroir',
      pairing: '2019 Barolo Serralunga',
      calories: '380 kcal',
      prepTime: '10 mins'
    },
    {
      id: 'dish-4',
      name: "Soupe à l'Oignon Gratinée",
      sub: 'Consommé de Tradition Française',
      category: 'starters',
      price: 24,
      desc: 'Caramelized Cevennes sweet onions, rich beef consommé infused with thyme, toasted brioche, and aged Swiss Gruyère crust.',
      image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=400&q=80',
      badge: 'Classical French',
      pairing: '2018 Côtes du Rhône',
      calories: '420 kcal',
      prepTime: '12 mins'
    },
    {
      id: 'dish-5',
      name: 'Risotto ai Funghi Porcini',
      sub: 'Carnaroli Acquerello & Truffes Noires',
      category: 'pastas',
      price: 42,
      desc: 'Acquerello Carnaroli rice, sautéed foraged chanterelles and porcini, black winter truffle carpaccio, and aged pecorino foam.',
      image: 'https://images.unsplash.com/photo-1621996346565-e3d5d6281724?auto=format&fit=crop&w=400&q=80',
      badge: 'Vegetarian',
      pairing: '2017 Brunello di Montalcino',
      calories: '610 kcal',
      prepTime: '20 mins'
    },
    {
      id: 'dish-6',
      name: "Ravioli d'Astice & Caviar",
      sub: 'Homard du Maine & Bisque de Cognac',
      category: 'pastas',
      price: 52,
      desc: 'Hand-pleated egg pasta filled with Maine lobster and mascarpone, finished in a cognac lobster bisque with chives and Siberian caviar.',
      image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=400&q=80',
      badge: "Chef's Signature",
      pairing: '2021 Chablis Premier Cru',
      calories: '580 kcal',
      prepTime: '16 mins'
    },
    {
      id: 'dish-7',
      name: "Canard Rôti à l'Orange",
      sub: 'Magret de Canard Croustillant',
      category: 'mains',
      price: 58,
      desc: 'Seared Moulard duck breast, Seville bitter orange gastrique, spiced carrot puree, glazed baby turnips, and crisp duck crackling.',
      image: 'https://images.unsplash.com/photo-1514944298352-78d120a13d09?auto=format&fit=crop&w=400&q=80',
      badge: 'Haute Cuisine',
      pairing: '2018 Gevrey-Chambertin',
      calories: '690 kcal',
      prepTime: '24 mins'
    },
    {
      id: 'dish-8',
      name: 'Fondant au Chocolat Valrhona',
      sub: 'Chocolat Noir 70% & Gelato Bourbon',
      category: 'desserts',
      price: 22,
      desc: 'Molten 70% dark Guanaja chocolate cake, Tahitian vanilla bean gelato, hazelnut praline crumble, and 24k gold leaf accent.',
      image: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=400&q=80',
      badge: 'Patisserie Royale',
      pairing: '20-Year Tawny Port',
      calories: '490 kcal',
      prepTime: '14 mins'
    }
  ];

  // 2. Interactive Dining Tables Layout
  const DEFAULT_TABLES = [
    { id: 'T-M1', name: 'Table 01', zone: 'Grand Dining Salon', seats: 2, status: 'available', coords: 'x: 20%, y: 25%' },
    { id: 'T-M2', name: 'Table 02', zone: 'Grand Dining Salon', seats: 4, status: 'available', coords: 'x: 45%, y: 25%' },
    { id: 'T-M3', name: 'Table 03', zone: 'Grand Dining Salon', seats: 4, status: 'reserved', coords: 'x: 70%, y: 25%' },
    { id: 'T-M4', name: 'Table 04', zone: 'Grand Dining Salon', seats: 6, status: 'available', coords: 'x: 45%, y: 50%' },
    { id: 'T-V1', name: 'Vault Alcove 1', zone: 'The Sommelier Vault', seats: 2, status: 'available', coords: 'x: 18%, y: 75%' },
    { id: 'T-V2', name: 'Vault Alcove 2', zone: 'The Sommelier Vault', seats: 4, status: 'available', coords: 'x: 42%, y: 75%' },
    { id: 'T-V3', name: 'Vault Cellar Table', zone: 'The Sommelier Vault', seats: 8, status: 'available', coords: 'x: 72%, y: 75%' },
    { id: 'T-C1', name: "Chef's Bar 01", zone: "Chef's Atelier", seats: 2, status: 'available', coords: 'x: 85%, y: 35%' },
    { id: 'T-C2', name: "Chef's Bar 02", zone: "Chef's Atelier", seats: 4, status: 'available', coords: 'x: 85%, y: 55%' },
    { id: 'T-R1', name: 'Veranda Terrace 1', zone: 'Candlelit Veranda', seats: 2, status: 'available', coords: 'x: 15%, y: 40%' },
    { id: 'T-R2', name: 'Veranda Terrace 2', zone: 'Candlelit Veranda', seats: 2, status: 'available', coords: 'x: 15%, y: 58%' }
  ];

  // Helper storage methods
  function load(key, defaultVal) {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : defaultVal;
    } catch (e) {
      return defaultVal;
    }
  }

  function save(key, val) {
    try {
      localStorage.setItem(key, JSON.stringify(val));
    } catch (e) {
      console.warn('Storage save failed', e);
    }
  }

  // Initial Sample Reservations for rich WebApp demo
  function getInitialReservations() {
    return [
      {
        id: 'CR-882941',
        name: 'Lord Sterling',
        email: 'sterling@luxury.co.uk',
        phone: '+1 (212) 555-8821',
        date: new Date().toISOString().split('T')[0],
        time: '19:30',
        guests: '2 Guests',
        seating: 'The Sommelier Vault',
        tableId: 'T-V1',
        occasion: 'Anniversary Celebration',
        notes: 'Pre-chill 2016 Margaux, celebratory candle',
        status: 'Confirmed',
        createdAt: new Date().toISOString()
      },
      {
        id: 'CR-741902',
        name: 'Eleanor Vance',
        email: 'vance.e@vancecorp.com',
        phone: '+1 (212) 555-3392',
        date: new Date().toISOString().split('T')[0],
        time: '20:00',
        guests: '4 Guests',
        seating: 'Grand Dining Salon',
        tableId: 'T-M2',
        occasion: 'Corporate Executive Dinner',
        notes: 'Quiet table requested for business briefing',
        status: 'Confirmed',
        createdAt: new Date().toISOString()
      }
    ];
  }

  return {
    getDishes: () => DISHES,
    getDishById: (id) => DISHES.find(d => d.id === id),

    // Cart Store
    getCart: () => load(STORAGE_KEYS.CART, []),
    addToCart: (dishId, qty = 1, options = {}) => {
      const dish = DISHES.find(d => d.id === dishId);
      if (!dish) return;
      const cart = load(STORAGE_KEYS.CART, []);
      const existing = cart.find(item => item.dishId === dishId && item.options === (options.notes || ''));
      if (existing) {
        existing.qty += qty;
      } else {
        cart.push({
          dishId: dish.id,
          name: dish.name,
          price: dish.price,
          qty: qty,
          pairing: dish.pairing,
          image: dish.image,
          options: options.notes || '',
          temp: options.temp || ''
        });
      }
      save(STORAGE_KEYS.CART, cart);
      window.dispatchEvent(new CustomEvent('clinton:cart-updated', { detail: { cart } }));
      return cart;
    },
    updateCartQty: (dishId, delta) => {
      let cart = load(STORAGE_KEYS.CART, []);
      const item = cart.find(i => i.dishId === dishId);
      if (item) {
        item.qty += delta;
        if (item.qty <= 0) {
          cart = cart.filter(i => i.dishId !== dishId);
        }
      }
      save(STORAGE_KEYS.CART, cart);
      window.dispatchEvent(new CustomEvent('clinton:cart-updated', { detail: { cart } }));
      return cart;
    },
    clearCart: () => {
      save(STORAGE_KEYS.CART, []);
      window.dispatchEvent(new CustomEvent('clinton:cart-updated', { detail: { cart: [] } }));
    },

    // Reservations Store
    getReservations: () => load(STORAGE_KEYS.RESERVATIONS, getInitialReservations()),
    addReservation: (booking) => {
      const list = load(STORAGE_KEYS.RESERVATIONS, getInitialReservations());
      list.unshift(booking);
      save(STORAGE_KEYS.RESERVATIONS, list);
      window.dispatchEvent(new CustomEvent('clinton:reservations-updated', { detail: { reservations: list } }));
      return booking;
    },
    cancelReservation: (id) => {
      const list = load(STORAGE_KEYS.RESERVATIONS, getInitialReservations());
      const item = list.find(r => r.id === id);
      if (item) {
        item.status = 'Cancelled';
        save(STORAGE_KEYS.RESERVATIONS, list);
        window.dispatchEvent(new CustomEvent('clinton:reservations-updated', { detail: { reservations: list } }));
      }
      return list;
    },

    // Tables Store
    getTables: () => load(STORAGE_KEYS.TABLES, DEFAULT_TABLES),
    setTableStatus: (tableId, status) => {
      const tables = load(STORAGE_KEYS.TABLES, DEFAULT_TABLES);
      const t = tables.find(item => item.id === tableId);
      if (t) {
        t.status = status;
        save(STORAGE_KEYS.TABLES, tables);
        window.dispatchEvent(new CustomEvent('clinton:tables-updated', { detail: { tables } }));
      }
    },

    // VIP Member Store
    getVip: () => load(STORAGE_KEYS.VIP, {
      name: 'Distinguished Guest',
      tier: 'Grand Cru Member',
      tierNumber: 3,
      points: 1450,
      code: 'VIP-CR-8829',
      memberSince: '2024',
      perks: [
        'Priority Cellar Reserve Booking',
        'Complimentary Vintage Champagne Upon Arrival',
        'Direct Maître D’ Concierge Line',
        'Seasonal White Truffle Private Tastings'
      ]
    }),

    // Orders Store
    getOrders: () => load(STORAGE_KEYS.ORDERS, []),
    addOrder: (order) => {
      const orders = load(STORAGE_KEYS.ORDERS, []);
      orders.unshift(order);
      save(STORAGE_KEYS.ORDERS, orders);
      window.dispatchEvent(new CustomEvent('clinton:orders-updated', { detail: { orders } }));
      return order;
    }
  };
})();

// Attach to global window
window.ClintonStore = ClintonStore;
