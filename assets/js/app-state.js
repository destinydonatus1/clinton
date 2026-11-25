/**
 * CLINTON RESTAURANT — Core WebApp Reactive State Engine
 * Michelin-Standard Gastronomic Store & Operations Data
 */

const ClintonStore = (() => {
  const STORAGE_KEYS = {
    CART: 'clinton_cart_v2',
    RESERVATIONS: 'clinton_reservations_v2',
    ORDERS: 'clinton_orders_v2',
    VIP: 'clinton_vip_v2',
    TABLES: 'clinton_tables_v2',
    USERS: 'clinton_users_v2',
    CURRENT_USER: 'clinton_current_user_v2'
  };

  // 1. Rich Haute Gastronomy Menu Catalog with Provenance & Pairings
  const DISHES = [
    {
      id: 'dish-1',
      name: 'Filet Mignon au Poivre',
      sub: 'Tenderloin de Bœuf Black Angus',
      category: 'mains',
      course: 'Deuxième Service (Plat Principal)',
      price: 68,
      desc: 'Center-cut Prime Black Angus beef, Madagascar green peppercorn cognac emulsion, charred broccolini, and potato gratin Dauphinois.',
      image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80',
      badge: "Chef's Signature",
      provenance: 'Prime Black Angus dry-aged for 45 days by Creekstone Farms; black truffles foraged in Dordogne, France.',
      allergens: ['Dairy (Butter)', 'Gluten (Gratin)'],
      pairing: '2016 Château Margaux Premier Grand Cru',
      pairingPrice: '$180 / bottle',
      calories: '720 kcal',
      prepTime: '22 mins'
    },
    {
      id: 'dish-2',
      name: 'Chilean Sea Bass Royale',
      sub: 'Bar du Chili aux Émulsions de Safran',
      category: 'mains',
      course: 'Deuxième Service (Plat Principal)',
      price: 64,
      desc: 'Wild-caught Chilean bass, saffron fennel emulsion, braised Romanesco, and Royal Oscietra caviar reduction.',
      image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=600&q=80',
      badge: 'Gluten-Free',
      provenance: 'MSC-certified Chilean sea bass from pristine sub-Antarctic waters; Iranian grade-1 saffron threads.',
      allergens: ['Fish', 'Caviar (Sturgeon)'],
      pairing: '2020 Domaine des Comtes Lafon Meursault Premier Cru',
      pairingPrice: '$145 / bottle',
      calories: '540 kcal',
      prepTime: '18 mins'
    },
    {
      id: 'dish-3',
      name: 'Carpaccio di Manzo',
      sub: 'Bœuf Wagyu & Truffes Blanches',
      category: 'starters',
      course: 'Premier Service (Hors d’Œuvre)',
      price: 28,
      desc: 'Thinly sliced Wagyu tenderloin, 36-month Parmigiano-Reggiano crisps, caperberries, wild baby arugula, and white truffle oil drizzle.',
      image: 'https://images.unsplash.com/photo-1541529086526-db283c563270?auto=format&fit=crop&w=600&q=80',
      badge: 'Organic Terroir',
      provenance: 'A5 Miyazaki Wagyu beef; Parmigiano-Reggiano Vacche Rosse aged 36 months in Reggio Emilia.',
      allergens: ['Dairy (Cheese)'],
      pairing: '2019 Barolo Serralunga d’Alba DOCG',
      pairingPrice: '$130 / bottle',
      calories: '380 kcal',
      prepTime: '10 mins'
    },
    {
      id: 'dish-4',
      name: "Soupe à l'Oignon Gratinée",
      sub: 'Consommé de Tradition Française',
      category: 'starters',
      course: 'Premier Service (Hors d’Œuvre)',
      price: 24,
      desc: 'Caramelized Cevennes sweet onions, rich beef consommé infused with thyme, toasted brioche, and aged Swiss Gruyère crust.',
      image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=600&q=80',
      badge: 'Classical French',
      provenance: 'Cevennes sweet onions caramelized for 14 hours; Gruyère AOP matured in Swiss alpine sandstone caves.',
      allergens: ['Gluten (Brioche)', 'Dairy (Gruyère)'],
      pairing: '2018 E. Guigal Côtes du Rhône Rouge',
      pairingPrice: '$75 / bottle',
      calories: '420 kcal',
      prepTime: '12 mins'
    },
    {
      id: 'dish-5',
      name: 'Risotto ai Funghi Porcini',
      sub: 'Carnaroli Acquerello & Truffes Noires',
      category: 'pastas',
      course: 'Deuxième Service (Pâtes & Risottos)',
      price: 42,
      desc: 'Acquerello Carnaroli rice, sautéed foraged chanterelles and porcini, black winter truffle carpaccio, and aged pecorino foam.',
      image: 'https://images.unsplash.com/photo-1621996346565-e3d5d6281724?auto=format&fit=crop&w=600&q=80',
      badge: 'Vegetarian',
      provenance: '7-year aged Carnaroli rice from Tenuta Colombara, Vercelli; foraged wild porcini from Tuscany.',
      allergens: ['Dairy (Pecorino, Butter)'],
      pairing: '2017 Biondi-Santi Brunello di Montalcino',
      pairingPrice: '$150 / bottle',
      calories: '610 kcal',
      prepTime: '20 mins'
    },
    {
      id: 'dish-6',
      name: "Ravioli d'Astice & Caviar",
      sub: 'Homard du Maine & Bisque de Cognac',
      category: 'pastas',
      course: 'Deuxième Service (Pâtes & Risottos)',
      price: 52,
      desc: 'Hand-pleated egg pasta filled with Maine lobster and mascarpone, finished in a cognac lobster bisque with chives and Siberian caviar.',
      image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=600&q=80',
      badge: "Chef's Signature",
      provenance: 'Wild live Maine lobster; Courvoisier XO cognac reduction; farmed Siberian Baerii sturgeon caviar.',
      allergens: ['Shellfish (Lobster)', 'Eggs', 'Gluten', 'Dairy'],
      pairing: '2021 William Fèvre Chablis Grand Cru Les Clos',
      pairingPrice: '$135 / bottle',
      calories: '580 kcal',
      prepTime: '16 mins'
    },
    {
      id: 'dish-7',
      name: "Canard Rôti à l'Orange",
      sub: 'Magret de Canard Croustillant',
      category: 'mains',
      course: 'Deuxième Service (Plat Principal)',
      price: 58,
      desc: 'Seared Moulard duck breast, Seville bitter orange gastrique, spiced carrot puree, glazed baby turnips, and crisp duck crackling.',
      image: 'https://images.unsplash.com/photo-1514944298352-78d120a13d09?auto=format&fit=crop&w=600&q=80',
      badge: 'Haute Cuisine',
      provenance: 'Free-range Moulard ducks raised ethically in Hudson Valley; organic Seville oranges from Andalusia.',
      allergens: ['None (Gluten-Free, Dairy-Free by request)'],
      pairing: '2018 Domaine Armand Rousseau Gevrey-Chambertin',
      pairingPrice: '$165 / bottle',
      calories: '690 kcal',
      prepTime: '24 mins'
    },
    {
      id: 'dish-8',
      name: 'Fondant au Chocolat Valrhona',
      sub: 'Chocolat Noir 70% & Gelato Bourbon',
      category: 'desserts',
      course: 'Grand Finale (Patisserie Royale)',
      price: 22,
      desc: 'Molten 70% dark Guanaja chocolate cake, Tahitian vanilla bean gelato, hazelnut praline crumble, and 24k gold leaf accent.',
      image: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=600&q=80',
      badge: 'Patisserie Royale',
      provenance: 'Grand Cru Guanaja 70% dark chocolate from Valrhona, Tain-l’Hermitage; organic Tahitian vanilla orchids.',
      allergens: ['Dairy', 'Eggs', 'Tree Nuts (Hazelnuts)'],
      pairing: 'Taylor Fladgate 20-Year-Old Tawny Port',
      pairingPrice: '$95 / bottle',
      calories: '490 kcal',
      prepTime: '14 mins'
    }
  ];

  // 2. Interactive Dining Tables Layout
  const DEFAULT_TABLES = [
    { id: 'T-M1', name: 'Table 01', zone: 'Grand Dining Salon', seats: 2, status: 'available', view: 'Center Chandelier Vantage', type: 'Intimate Leather Booth' },
    { id: 'T-M2', name: 'Table 02', zone: 'Grand Dining Salon', seats: 4, status: 'available', view: 'Grand Boulevard Window', type: 'Mahogany Round Table' },
    { id: 'T-M3', name: 'Table 03', zone: 'Grand Dining Salon', seats: 4, status: 'reserved', view: 'Fireplace Alcove', type: 'Velvet Banquet Seating' },
    { id: 'T-M4', name: 'Table 04', zone: 'Grand Dining Salon', seats: 6, status: 'available', view: 'Main Salon Focal Point', type: 'Celebratory Oval Banquet' },
    { id: 'T-V1', name: 'Vault Alcove 1', zone: 'The Sommelier Vault', seats: 2, status: 'available', view: '1982 Bordeaux Glass Cask', type: 'Private Cellar High-Top' },
    { id: 'T-V2', name: 'Vault Alcove 2', zone: 'The Sommelier Vault', seats: 4, status: 'available', view: 'Subterranean Oak Vault', type: 'Sommelier Tasting Table' },
    { id: 'T-V3', name: 'Vault Imperial Table', zone: 'The Sommelier Vault', seats: 8, status: 'available', view: 'Enclosed Grand Reserve Cellar', type: 'Imperial VIP Suite' },
    { id: 'T-C1', name: "Chef's Bar 01", zone: "Chef's Atelier", seats: 2, status: 'available', view: 'Direct Kitchen Pass Vantage', type: 'Front-Row Atelier Counter' },
    { id: 'T-C2', name: "Chef's Bar 02", zone: "Chef's Atelier", seats: 4, status: 'available', view: 'Open Flame Hearth View', type: 'Plating Station High-Top' },
    { id: 'T-R1', name: 'Veranda Terrace 1', zone: 'Candlelit Veranda', seats: 2, status: 'available', view: 'Botanical Garden & Skyline', type: 'Romantic Garden Table' },
    { id: 'T-R2', name: 'Veranda Terrace 2', zone: 'Candlelit Veranda', seats: 4, status: 'available', view: 'Glass Conservatory View', type: 'Terrace Pergola Table' }
  ];

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
        seating: 'The Sommelier Vault (Vault Alcove 1)',
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
        seating: 'Grand Dining Salon (Table 02)',
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
      const existing = cart.find(item => item.dishId === dishId);
      if (existing) {
        existing.qty += qty;
      } else {
        cart.push({
          dishId: dish.id,
          name: dish.name,
          course: dish.course,
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
      name: 'Lord & Lady Clinton',
      tier: 'Grand Cru Élite Member',
      points: 1850,
      code: 'VIP-CR-9921',
      memberSince: '2023',
      perks: [
        'Priority Cellar Reserve Booking within 1 Hour',
        'Complimentary 2012 Dom Pérignon Vintage on Arrival',
        'Direct Maître D’ Concierge Line & Table Choice',
        'Annual Invitation to White Truffle Degustation Gala'
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
    },

    // Users & Session Authentication Store
    getUsers: () => load(STORAGE_KEYS.USERS, [
      {
        id: 'usr-1',
        name: 'Lord Sterling',
        email: 'vip@clinton.com',
        password: 'password123',
        phone: '+1 (212) 555-8821',
        role: 'vip',
        tier: 'Grand Cru Élite Member',
        points: 1850,
        code: 'VIP-CR-9921',
        preferences: 'Allergy: Shellfish • Preferred Zone: The Sommelier Vault • Vintage: 2016 Margaux',
        memberSince: '2023'
      },
      {
        id: 'usr-2',
        name: "Maître D' Jean-Luc",
        email: 'staff@clinton.com',
        password: 'staff2026',
        phone: '+1 (212) 555-0198',
        role: 'staff',
        tier: 'Executive Service Brigade',
        points: 0,
        code: 'STAFF-CR-001',
        preferences: 'Head Maître D’ • Front of House Operations',
        memberSince: '2012'
      },
      {
        id: 'usr-3',
        name: 'Eleanor Vance',
        email: 'guest@example.com',
        password: 'password123',
        phone: '+1 (212) 555-3392',
        role: 'member',
        tier: 'Privé Club Member',
        points: 450,
        code: 'MBR-CR-4412',
        preferences: 'Prefers quiet window seating • Wine: Meursault',
        memberSince: '2024'
      }
    ]),
    getCurrentUser: () => load(STORAGE_KEYS.CURRENT_USER, null),
    login: (email, password) => {
      const users = window.ClintonStore.getUsers();
      const user = users.find(u => u.email.toLowerCase() === (email || '').trim().toLowerCase() && u.password === password);
      if (!user) {
        return { success: false, message: 'Invalid credentials. Please verify your email and password.' };
      }
      save(STORAGE_KEYS.CURRENT_USER, user);
      window.dispatchEvent(new CustomEvent('clinton:auth-changed', { detail: { user } }));
      return { success: true, user };
    },
    register: (userData) => {
      const users = window.ClintonStore.getUsers();
      if (users.some(u => u.email.toLowerCase() === (userData.email || '').trim().toLowerCase())) {
        return { success: false, message: 'An account with this email address already exists. Please sign in.' };
      }
      const newUser = {
        id: 'usr-' + Date.now(),
        name: userData.name?.trim() || 'Distinguished Guest',
        email: userData.email.trim(),
        password: userData.password,
        phone: userData.phone?.trim() || '',
        role: 'member',
        tier: 'Privé Club Member',
        points: 300, // Welcome dining points
        code: 'MBR-CR-' + Math.floor(1000 + Math.random() * 9000),
        preferences: userData.preferences?.trim() || 'Standard Continental Service',
        memberSince: new Date().getFullYear().toString()
      };
      users.push(newUser);
      save(STORAGE_KEYS.USERS, users);
      save(STORAGE_KEYS.CURRENT_USER, newUser);
      window.dispatchEvent(new CustomEvent('clinton:auth-changed', { detail: { user: newUser } }));
      return { success: true, user: newUser };
    },
    logout: () => {
      localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
      window.dispatchEvent(new CustomEvent('clinton:auth-changed', { detail: { user: null } }));
    }
  };
})();

window.ClintonStore = ClintonStore;
