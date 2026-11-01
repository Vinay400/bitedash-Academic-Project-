/**
 * BiteDash Food Delivery System
 * Core Application Logic & Dynamic Interactivity
 * HTML5, CSS3, Bootstrap 5, JavaScript (ES6)
 */

document.addEventListener('DOMContentLoaded', () => {

  // ==========================================
  // 1. DATASETS (Restaurants & Menu Items)
  // ==========================================

  const restaurantsData = [
    {
      id: 1,
      name: "The Italian Crust",
      cuisine: "Italian & Wood-Fired Pizza",
      rating: 4.8,
      reviews: 420,
      deliveryTime: "20-25 mins",
      minOrder: "$15",
      image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&auto=format&fit=crop&q=80",
      featuredTag: "Popular"
    },
    {
      id: 2,
      name: "Spice Symphony",
      cuisine: "Authentic North & South Indian",
      rating: 4.9,
      reviews: 650,
      deliveryTime: "25-35 mins",
      minOrder: "$12",
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&auto=format&fit=crop&q=80",
      featuredTag: "Chef's Choice"
    },
    {
      id: 3,
      name: "Burger Haven & Co.",
      cuisine: "American Gourmet Burgers & Shakes",
      rating: 4.7,
      reviews: 510,
      deliveryTime: "15-20 mins",
      minOrder: "$10",
      image: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=600&auto=format&fit=crop&q=80",
      featuredTag: "Fastest"
    },
    {
      id: 4,
      name: "Tokyo Treats Sushi Bar",
      cuisine: "Japanese Sushi & Ramen",
      rating: 4.9,
      reviews: 380,
      deliveryTime: "30-40 mins",
      minOrder: "$20",
      image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=600&auto=format&fit=crop&q=80",
      featuredTag: "Top Rated"
    },
    {
      id: 5,
      name: "Green Garden Bistro",
      cuisine: "Healthy Organic Bowls & Smoothies",
      rating: 4.6,
      reviews: 290,
      deliveryTime: "20-30 mins",
      minOrder: "$12",
      image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&auto=format&fit=crop&q=80",
      featuredTag: "Healthy Pick"
    },
    {
      id: 6,
      name: "Taco Fiesta Loca",
      cuisine: "Mexican Tacos, Burritos & Quesadillas",
      rating: 4.7,
      reviews: 340,
      deliveryTime: "20-25 mins",
      minOrder: "$10",
      image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=600&auto=format&fit=crop&q=80",
      featuredTag: "Trending"
    }
  ];

  const foodItemsData = [
    {
      id: 101,
      title: "Truffle Mushroom Artisan Pizza",
      category: "veg",
      cuisine: "Italian",
      price: 18.99,
      rating: 4.9,
      calories: "780 kcal",
      prepTime: "20 mins",
      image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&auto=format&fit=crop&q=80",
      description: "Crispy hand-tossed sourdough base topped with wild porcini mushrooms, creamy fior di latte mozzarella, black truffle oil, and fresh basil.",
      ingredients: ["Sourdough crust", "Wild Porcini Mushrooms", "Mozzarella", "White Truffle Glaze", "Fresh Thyme"],
      nutrition: { carbs: "65g", protein: "22g", fat: "26g" },
      allergens: "Gluten, Dairy"
    },
    {
      id: 102,
      title: "Royal Chicken Dum Biryani",
      category: "non-veg",
      cuisine: "Indian",
      price: 16.50,
      rating: 4.9,
      calories: "850 kcal",
      prepTime: "25 mins",
      image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=600&auto=format&fit=crop&q=80",
      description: "Fragrant long-grain aged basmati rice slow-cooked with tender spiced chicken leg pieces, saffron milk, and aromatic whole spices.",
      ingredients: ["Basmati Rice", "Tender Chicken", "Saffron", "Caramelized Onions", "Clarified Butter (Ghee)"],
      nutrition: { carbs: "82g", protein: "38g", fat: "24g" },
      allergens: "Dairy"
    },
    {
      id: 103,
      title: "Smoky BBQ Angus Burger",
      category: "non-veg",
      cuisine: "American",
      price: 14.99,
      rating: 4.8,
      calories: "720 kcal",
      prepTime: "15 mins",
      image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&auto=format&fit=crop&q=80",
      description: "Juicy flame-grilled 100% Angus beef patty with melted sharp cheddar, crispy caramelized bacon, smoky hickory BBQ glaze in a brioche bun.",
      ingredients: ["Angus Beef Patty", "Brioche Bun", "Sharp Cheddar", "Crisp Lettuce", "Hickory BBQ Glaze"],
      nutrition: { carbs: "48g", protein: "42g", fat: "35g" },
      allergens: "Gluten, Dairy"
    },
    {
      id: 104,
      title: "Paneer Butter Masala & Naan",
      category: "veg",
      cuisine: "Indian",
      price: 13.99,
      rating: 4.8,
      calories: "680 kcal",
      prepTime: "20 mins",
      image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=600&auto=format&fit=crop&q=80",
      description: "Cubes of tender cottage cheese simmered in a velvet tomato cashew gravy infused with fenugreek and butter, served with garlic naan.",
      ingredients: ["Fresh Paneer", "San Marzano Tomatoes", "Cashew Paste", "Butter", "Kasuri Methi"],
      nutrition: { carbs: "52g", protein: "24g", fat: "30g" },
      allergens: "Dairy, Tree Nuts"
    },
    {
      id: 105,
      title: "Signature Salmon Dragon Roll",
      category: "non-veg",
      cuisine: "Japanese",
      price: 19.50,
      rating: 4.9,
      calories: "520 kcal",
      prepTime: "25 mins",
      image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=600&auto=format&fit=crop&q=80",
      description: "Fresh Atlantic salmon, tempura shrimp, ripe avocado, cucumber rolled inside toasted nori, topped with spicy mayo and tobiko roe.",
      ingredients: ["Atlantic Salmon", "Tempura Prawn", "Avocado", "Japanese Rice", "Spicy Mayo & Unagi Sauce"],
      nutrition: { carbs: "45g", protein: "28g", fat: "16g" },
      allergens: "Fish, Shellfish, Soy"
    },
    {
      id: 106,
      title: "Avocado Quinoa Power Bowl",
      category: "veg",
      cuisine: "Healthy",
      price: 12.50,
      rating: 4.7,
      calories: "460 kcal",
      prepTime: "15 mins",
      image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&auto=format&fit=crop&q=80",
      description: "Organic tricolor quinoa, Hass avocado slices, roasted chickpeas, massaged kale, edamame, and zesty lemon tahini dressing.",
      ingredients: ["Organic Quinoa", "Hass Avocado", "Spiced Chickpeas", "Edamame", "Tahini Citrus Dressing"],
      nutrition: { carbs: "54g", protein: "18g", fat: "14g" },
      allergens: "Sesame"
    },
    {
      id: 107,
      title: "Crispy Birria Beef Tacos (3 pcs)",
      category: "non-veg",
      cuisine: "Mexican",
      price: 15.25,
      rating: 4.9,
      calories: "690 kcal",
      prepTime: "20 mins",
      image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=600&auto=format&fit=crop&q=80",
      description: "Slow-braised shredded beef brisket packed in dipped corn tortillas griddled crisp with Oaxaca cheese, served with rich consommé dip.",
      ingredients: ["Braised Beef", "Corn Tortillas", "Oaxaca Cheese", "Cilantro & Onion", "Beef Consommé"],
      nutrition: { carbs: "42g", protein: "40g", fat: "29g" },
      allergens: "Dairy"
    },
    {
      id: 108,
      title: "Classic Margherita Basilico",
      category: "veg",
      cuisine: "Italian",
      price: 13.50,
      rating: 4.6,
      calories: "620 kcal",
      prepTime: "18 mins",
      image: "https://images.unsplash.com/photo-1604382355076-af4b0eb60143?w=600&auto=format&fit=crop&q=80",
      description: "The timeless Neapolitan classic with crushed San Marzano tomato sauce, fresh buffalo mozzarella slices, sweet Italian basil, and extra virgin olive oil.",
      ingredients: ["Italian Flour Crust", "San Marzano Sauce", "Fresh Mozzarella", "Organic Basil", "Cold Pressed Olive Oil"],
      nutrition: { carbs: "62g", protein: "19g", fat: "18g" },
      allergens: "Gluten, Dairy"
    },
    {
      id: 109,
      title: "Spicy Miso Tonkotsu Ramen",
      category: "non-veg",
      cuisine: "Japanese",
      price: 16.99,
      rating: 4.8,
      calories: "740 kcal",
      prepTime: "20 mins",
      image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=600&auto=format&fit=crop&q=80",
      description: "Rich 16-hour pork broth with artisan wavy ramen noodles, slow-braised chashu pork belly slices, marinated soft-boiled ajitsuke egg, nori, and scallions.",
      ingredients: ["Pork Broth", "Chashu Pork", "Ramen Noodles", "Seasoned Ajitama Egg", "Spicy Rayu Chili Oil"],
      nutrition: { carbs: "68g", protein: "36g", fat: "28g" },
      allergens: "Gluten, Egg, Soy"
    },
    {
      id: 110,
      title: "Loaded Mediterranean Falafel Wrap",
      category: "veg",
      cuisine: "Healthy",
      price: 9.99,
      rating: 4.7,
      calories: "510 kcal",
      prepTime: "12 mins",
      image: "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=600&auto=format&fit=crop&q=80",
      description: "Golden crispy herbed chickpea falafels wrapped in warm lavash with pickled turnips, tomatoes, cucumber salad, and garlic herb yogurt.",
      ingredients: ["Chickpea Falafel", "Warm Flatbread", "Hummus", "Tahini Garlic Sauce", "Pickled Turnips"],
      nutrition: { carbs: "58g", protein: "16g", fat: "12g" },
      allergens: "Gluten, Sesame"
    },
    {
      id: 111,
      title: "Fiesta Loaded Nachos Supreme",
      category: "veg",
      cuisine: "Mexican",
      price: 11.50,
      rating: 4.6,
      calories: "640 kcal",
      prepTime: "15 mins",
      image: "https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?w=600&auto=format&fit=crop&q=80",
      description: "Crisp stone-ground corn tortilla chips piled high with warm queso cheese dip, black beans, pico de gallo, pickled jalapeños, and guacamole.",
      ingredients: ["Corn Tortilla Chips", "Warm Queso Blanco", "Black Beans", "Fresh Guacamole", "Pico de Gallo"],
      nutrition: { carbs: "65g", protein: "14g", fat: "26g" },
      allergens: "Dairy"
    },
    {
      id: 112,
      title: "Crispy Golden Garlic Fries",
      category: "veg",
      cuisine: "American",
      price: 6.50,
      rating: 4.5,
      calories: "380 kcal",
      prepTime: "10 mins",
      image: "https://images.unsplash.com/photo-1576107232684-1279f3908594?w=600&auto=format&fit=crop&q=80",
      description: "Double-fried crispy Idaho potato batons tossed in roasted minced garlic, rosemary sea salt, and grated parmesan cheese.",
      ingredients: ["Idaho Russet Potatoes", "Roasted Garlic Confit", "Fresh Rosemary", "Parmesan Cheese"],
      nutrition: { carbs: "44g", protein: "6g", fat: "15g" },
      allergens: "Dairy"
    }
  ];

  // ==========================================
  // 2. STATE MANAGEMENT
  // ==========================================

  let currentFilters = {
    search: '',
    diet: 'all',
    cuisine: 'all',
    maxPrice: 35,
    sort: 'popular'
  };

  // Cart state persisted to localStorage
  let cart = JSON.parse(localStorage.getItem('bitedash_cart')) || [];
  let appliedCoupon = null; // { code: 'FIRST50', discountRate: 0.5 }

  // Bootstrap Modals & Offcanvas instances
  const itemModalElement = document.getElementById('itemDetailsModal');
  const itemDetailsModal = new bootstrap.Modal(itemModalElement);
  const checkoutModal = new bootstrap.Modal(document.getElementById('checkoutModal'));
  const orderConfirmationModal = bootstrap.Modal.getOrCreateInstance(document.getElementById('orderConfirmationModal'));
  const liveToast = new bootstrap.Toast(document.getElementById('liveToast'), { delay: 3500 });

  // DOM Elements
  const restaurantsContainer = document.getElementById('restaurantsContainer');
  const foodItemsContainer = document.getElementById('foodItemsContainer');
  const resultsCount = document.getElementById('resultsCount');
  const noResultsState = document.getElementById('noResultsState');
  const navSearchInput = document.getElementById('navSearchInput');
  const priceRange = document.getElementById('priceRange');
  const priceRangeValue = document.getElementById('priceRangeValue');
  const cuisineSelect = document.getElementById('cuisineSelect');
  const sortSelect = document.getElementById('sortSelect');
  const resetFiltersBtn = document.getElementById('resetFiltersBtn');

  // Cart DOM elements
  const cartItemsList = document.getElementById('cartItemsList');
  const emptyCartView = document.getElementById('emptyCartView');
  const cartSummarySection = document.getElementById('cartSummarySection');
  const cartSubtotal = document.getElementById('cartSubtotal');
  const cartDiscount = document.getElementById('cartDiscount');
  const discountRow = document.getElementById('discountRow');
  const cartDeliveryFee = document.getElementById('cartDeliveryFee');
  const cartTax = document.getElementById('cartTax');
  const cartGrandTotal = document.getElementById('cartGrandTotal');
  const modalFinalPayable = document.getElementById('modalFinalPayable');
  const badgeCounts = document.querySelectorAll('.cart-badge-count');
  const cartTotalPriceBadges = document.querySelectorAll('.cart-total-price');

  // Keep the sticky mobile navigation usable after selecting an anchor.
  const navbarCollapseElement = document.getElementById('navbarContent');
  const navbarCollapse = navbarCollapseElement ? bootstrap.Collapse.getOrCreateInstance(navbarCollapseElement, { toggle: false }) : null;
  const navigationLinks = document.querySelectorAll('#navbarContent .nav-link');
  const setActiveNavigation = targetId => {
    navigationLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === targetId));
  };
  document.querySelectorAll('#navbarContent .nav-link, .navbar-brand').forEach(link => {
    link.addEventListener('click', event => {
      const targetId = link.getAttribute('href');
      if (targetId?.startsWith('#')) {
        const target = document.querySelector(targetId);
        if (target) {
          event.preventDefault();
          setActiveNavigation(targetId);
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          history.replaceState(null, '', targetId);
        }
      }
      if (window.matchMedia('(max-width: 991.98px)').matches) navbarCollapse?.hide();
    });
  });
  setActiveNavigation(window.location.hash || '#home');

  // Browser-backed account store. Replace these adapters with API calls when a backend is connected.
  const usersKey = 'bitedash_users';
  const sessionKey = 'bitedash_session';
  const ordersKey = 'bitedash_orders';
  const tokenKey = 'bitedash_token';
  const apiBase = window.location.protocol === 'file:' ? 'http://localhost:4173/api' : '/api';
  let authToken = localStorage.getItem(tokenKey);
  const apiRequest = async (endpoint, options = {}) => {
    try {
      const response = await fetch(`${apiBase}${endpoint}`, {
        ...options,
        headers: { 'Content-Type': 'application/json', ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}), ...(options.headers || {}) }
      });
      const payload = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(payload.error || `Request failed (${response.status})`);
      return payload;
    } catch (error) {
      if (error instanceof TypeError) {
        throw new Error(`Cannot connect to BiteDash API at ${apiBase}. Start the server with "npm start".`);
      }
      throw error;
    }
  };
  const readStore = (key, fallback) => {
    try { return JSON.parse(localStorage.getItem(key)) || fallback; } catch (error) { return fallback; }
  };
  let users = readStore(usersKey, []);
  let currentUser = readStore(sessionKey, null);
  let orders = readStore(ordersKey, []);
  const authModal = bootstrap.Modal.getOrCreateInstance(document.getElementById('authModal'));
  const accountLabel = document.getElementById('accountLabel');
  const accountTrigger = document.getElementById('accountTrigger');
  const authForms = document.getElementById('authForms');
  const accountPanel = document.getElementById('accountPanel');
  const authFeedback = document.getElementById('authFeedback');
  const adminTrigger = document.getElementById('adminTrigger');
  const adminModal = bootstrap.Modal.getOrCreateInstance(document.getElementById('adminModal'));
  const setAuthFeedback = (message, type = 'danger') => {
    authFeedback.className = `small mb-0 mt-3 text-center text-${type}`;
    authFeedback.textContent = message;
  };
  const saveAccountState = () => {
    localStorage.setItem(usersKey, JSON.stringify(users));
    localStorage.setItem(ordersKey, JSON.stringify(orders));
    if (currentUser) localStorage.setItem(sessionKey, JSON.stringify(currentUser));
    else localStorage.removeItem(sessionKey);
  };
  const renderAccount = () => {
    if (currentUser) {
      accountLabel.textContent = currentUser.name.split(' ')[0];
      adminTrigger?.classList.toggle('d-none', currentUser.role !== 'admin');
      accountTrigger.dataset.bsTarget = '#authModal';
      authForms.classList.add('d-none');
      accountPanel.classList.remove('d-none');
      document.getElementById('authModalLabel').textContent = 'Your account';
      document.getElementById('accountName').textContent = currentUser.name;
      document.getElementById('accountEmail').textContent = currentUser.email;
      document.getElementById('accountAvatar').textContent = currentUser.name.charAt(0).toUpperCase();
      const userOrders = orders.filter(order => order.email === currentUser.email);
      document.getElementById('orderCount').textContent = `${userOrders.length} order${userOrders.length === 1 ? '' : 's'}`;
      document.getElementById('orderHistory').innerHTML = userOrders.length
        ? userOrders.slice(-3).reverse().map(order => `<div class="order-history-item d-flex justify-content-between align-items-center mb-2"><div><strong>#${order.id}</strong><br><span class="text-muted">${order.date} · ${order.items} item${order.items === 1 ? '' : 's'}</span></div><span class="fw-bold text-primary">$${order.total}</span></div>`).join('')
        : '<div class="text-muted bg-light rounded-3 p-3 text-center">Your orders will appear here after checkout.</div>';
    } else {
      accountLabel.textContent = 'Sign in';
      adminTrigger?.classList.add('d-none');
      authForms.classList.remove('d-none');
      accountPanel.classList.add('d-none');
      document.getElementById('authModalLabel').textContent = 'Welcome back';
    }
  };

  const adminFeedback = (message, type = 'danger') => {
    const element = document.getElementById('adminFeedback');
    if (element) {
      element.className = `small mb-3 text-${type}`;
      element.textContent = message;
    }
  };
  const loadAdminDashboard = async () => {
    if (currentUser?.role !== 'admin') return;
    try {
      const [restaurantResult, orderResult] = await Promise.all([
        apiRequest('/admin/restaurants'),
        apiRequest('/admin/orders')
      ]);
      const restaurants = restaurantResult.restaurants;
      const orders = orderResult.orders;
      document.getElementById('adminOrderCount').textContent = orders.length;
      document.getElementById('adminActiveCount').textContent = orders.filter(order => !['DELIVERED', 'CANCELLED'].includes(order.status)).length;
      document.getElementById('adminRestaurantCount').textContent = restaurants.length;
      document.getElementById('adminRevenue').textContent = `$${orders.reduce((sum, order) => sum + Number(order.total), 0).toFixed(2)}`;
      document.getElementById('adminOrdersBody').innerHTML = orders.length ? orders.map(order => `
        <tr>
          <td><strong>#${order.id}</strong><br><span class="text-muted">${new Date(order.created_at).toLocaleString()}</span></td>
          <td>${order.customer_name}<br><span class="text-muted">${order.customer_email}</span></td>
          <td>${order.address}, ${order.city} ${order.postal_code}</td>
          <td class="fw-bold">$${Number(order.total).toFixed(2)}</td>
          <td><select class="form-select form-select-sm status-select" data-order-status="${order.id}">
            ${['PLACED', 'PREPARING', 'OUT_FOR_DELIVERY', 'DELIVERED', 'CANCELLED'].map(status => `<option value="${status}" ${status === order.status ? 'selected' : ''}>${status.replaceAll('_', ' ')}</option>`).join('')}
          </select></td>
        </tr>`).join('') : '<tr><td colspan="5" class="text-center text-muted py-4">No orders yet.</td></tr>';
      document.getElementById('adminRestaurantsList').innerHTML = restaurants.map(restaurant => `
        <div class="col-md-6"><div class="border rounded-3 p-3 d-flex justify-content-between align-items-center">
          <div><strong>${restaurant.name}</strong><small class="text-muted d-block">${restaurant.cuisine} · ${restaurant.delivery_time}</small></div>
          <button class="btn btn-sm btn-outline-danger rounded-pill" data-delete-restaurant="${restaurant.id}" type="button"><i class="bi bi-trash3 me-1"></i>Delete</button>
        </div></div>`).join('');
      adminFeedback('');
    } catch (error) { adminFeedback(error.message); }
  };
  adminModal._element.addEventListener('shown.bs.modal', loadAdminDashboard);
  document.querySelectorAll('[data-admin-tab]').forEach(tab => tab.addEventListener('click', () => {
    const restaurantsTab = tab.dataset.adminTab === 'restaurants';
    document.querySelectorAll('[data-admin-tab]').forEach(item => item.classList.toggle('active', item === tab));
    document.getElementById('adminShipmentsPanel').classList.toggle('d-none', restaurantsTab);
    document.getElementById('adminRestaurantsPanel').classList.toggle('d-none', !restaurantsTab);
  }));
  document.getElementById('adminOrdersBody')?.addEventListener('change', async event => {
    const orderId = event.target.dataset.orderStatus;
    if (!orderId) return;
    try {
      await apiRequest(`/admin/orders/${orderId}/status`, { method: 'PATCH', body: JSON.stringify({ status: event.target.value }) });
      adminFeedback(`Shipment ${orderId} updated.`, 'success');
      await loadAdminDashboard();
    } catch (error) { adminFeedback(error.message); }
  });
  document.getElementById('adminRestaurantsList')?.addEventListener('click', async event => {
    const button = event.target.closest('[data-delete-restaurant]');
    if (!button || !confirm('Delete this restaurant and its menu items?')) return;
    try {
      await apiRequest(`/admin/restaurants/${button.dataset.deleteRestaurant}`, { method: 'DELETE' });
      await loadAdminDashboard();
      showToast('Restaurant deleted.', 'success');
    } catch (error) { adminFeedback(error.message); }
  });
  document.getElementById('restaurantForm')?.addEventListener('submit', async event => {
    event.preventDefault();
    const value = id => document.getElementById(id).value.trim();
    try {
      await apiRequest('/admin/restaurants', {
        method: 'POST',
        body: JSON.stringify({
          name: value('restaurantName'), cuisine: value('restaurantCuisine'), image: value('restaurantImage'),
          deliveryTime: value('restaurantDelivery'), minOrder: value('restaurantMinOrder'), featuredTag: value('restaurantTag')
        })
      });
      event.target.reset();
      await loadAdminDashboard();
      showToast('Restaurant added successfully.', 'success');
    } catch (error) { adminFeedback(error.message); }
  });
  document.querySelectorAll('[data-auth-tab]').forEach(tab => tab.addEventListener('click', () => {
    const isLogin = tab.dataset.authTab === 'login';
    document.querySelectorAll('[data-auth-tab]').forEach(item => item.classList.toggle('active', item === tab));
    document.getElementById('loginForm').classList.toggle('d-none', !isLogin);
    document.getElementById('signupForm').classList.toggle('d-none', isLogin);
    setAuthFeedback('');
  }));
  document.getElementById('signupForm')?.addEventListener('submit', async event => {
    event.preventDefault();
    const name = document.getElementById('signupName').value.trim();
    const email = document.getElementById('signupEmail').value.trim().toLowerCase();
    const password = document.getElementById('signupPassword').value;
    try {
      const result = await apiRequest('/auth/signup', { method: 'POST', body: JSON.stringify({ name, email, password }) });
      currentUser = result.user;
      authToken = result.token;
      localStorage.setItem(tokenKey, authToken);
      saveAccountState();
      renderAccount();
      setAuthFeedback('Account created successfully.', 'success');
      showToast(`Welcome to BiteDash, <strong>${name.split(' ')[0]}</strong>!`, 'success');
    } catch (error) { setAuthFeedback(error.message); }
  });
  document.getElementById('loginForm')?.addEventListener('submit', async event => {
    event.preventDefault();
    const email = document.getElementById('loginEmail').value.trim().toLowerCase();
    const password = document.getElementById('loginPassword').value;
    try {
      const result = await apiRequest('/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) });
      currentUser = result.user;
      authToken = result.token;
      localStorage.setItem(tokenKey, authToken);
      saveAccountState();
      renderAccount();
      setAuthFeedback('Signed in successfully.', 'success');
      showToast(`Welcome back, <strong>${result.user.name.split(' ')[0]}</strong>!`, 'success');
    } catch (error) { setAuthFeedback(error.message); }
  });
  document.getElementById('signOutBtn')?.addEventListener('click', () => {
    currentUser = null;
    authToken = null;
    localStorage.removeItem(tokenKey);
    saveAccountState();
    renderAccount();
    authModal.hide();
    showToast('You have been signed out.', 'info');
  });
  accountTrigger?.addEventListener('click', () => renderAccount());
  document.getElementById('checkoutBtn')?.addEventListener('click', event => {
    if (!currentUser) {
      event.preventDefault();
      event.stopImmediatePropagation();
      authModal.show();
      setAuthFeedback('Sign in or create an account before checkout.', 'warning');
    }
  });

  // ==========================================
  // 3. RENDER FUNCTIONS
  // ==========================================

  // Render Restaurants
  function renderRestaurants() {
    if (!restaurantsContainer) return;
    restaurantsContainer.innerHTML = restaurantsData.map(rest => `
      <div class="col-12 col-md-6 col-lg-4">
        <div class="card restaurant-card h-100 shadow-sm">
          <div class="restaurant-img-wrapper">
            <img src="${rest.image}" alt="${rest.name}" loading="lazy">
            <span class="badge bg-warning text-dark position-absolute top-0 start-0 m-3 px-2 py-1 fw-bold small">
              ${rest.featuredTag}
            </span>
            <span class="time-badge">
              <i class="bi bi-clock-fill text-primary me-1"></i>${rest.deliveryTime}
            </span>
          </div>
          <div class="card-body p-3 d-flex flex-column">
            <div class="d-flex justify-content-between align-items-start mb-1">
              <h5 class="card-title fw-bold mb-0">${rest.name}</h5>
              <span class="badge bg-success-subtle text-success fw-bold">
                <i class="bi bi-star-fill text-warning me-1"></i>${rest.rating}
              </span>
            </div>
            <p class="text-muted small mb-3">${rest.cuisine}</p>
            <div class="mt-auto d-flex justify-content-between align-items-center pt-2 border-top">
              <span class="small text-secondary">Min: <strong>${rest.minOrder}</strong></span>
              <button class="btn btn-sm btn-outline-primary rounded-pill px-3 filter-restaurant-btn" data-cuisine="${rest.cuisine.split(' ')[0]}">
                View Dishes <i class="bi bi-arrow-right-short"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    `).join('');

    // Attach click listeners to "View Dishes" inside restaurant cards
    document.querySelectorAll('.filter-restaurant-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const targetCuisine = e.currentTarget.getAttribute('data-cuisine');
        if (cuisineSelect) {
          // Find matching option
          for (let option of cuisineSelect.options) {
            if (option.value.toLowerCase().includes(targetCuisine.toLowerCase())) {
              cuisineSelect.value = option.value;
              currentFilters.cuisine = option.value;
              break;
            }
          }
        }
        filterAndRenderMenu();
        const menuElem = document.getElementById('menu');
        if (menuElem) menuElem.scrollIntoView({ behavior: 'smooth' });
      });
    });
  }

  // Render Filtered Menu Items
  function filterAndRenderMenu() {
    let items = [...foodItemsData];

    // Filter by Search text
    if (currentFilters.search.trim()) {
      const q = currentFilters.search.toLowerCase();
      items = items.filter(item => 
        item.title.toLowerCase().includes(q) || 
        item.description.toLowerCase().includes(q) ||
        item.cuisine.toLowerCase().includes(q)
      );
    }

    // Filter by Dietary preference (all, veg, non-veg)
    if (currentFilters.diet !== 'all') {
      items = items.filter(item => item.category === currentFilters.diet);
    }

    // Filter by Cuisine
    if (currentFilters.cuisine !== 'all') {
      items = items.filter(item => item.cuisine.toLowerCase() === currentFilters.cuisine.toLowerCase());
    }

    // Filter by Max Price
    items = items.filter(item => item.price <= currentFilters.maxPrice);

    // Sorting
    if (currentFilters.sort === 'price-asc') {
      items.sort((a, b) => a.price - b.price);
    } else if (currentFilters.sort === 'price-desc') {
      items.sort((a, b) => b.price - a.price);
    } else if (currentFilters.sort === 'rating') {
      items.sort((a, b) => b.rating - a.rating);
    }

    // Update count display
    if (resultsCount) {
      resultsCount.textContent = `Showing ${items.length} of ${foodItemsData.length} delicious items`;
    }

    // Check empty state
    if (items.length === 0) {
      foodItemsContainer.innerHTML = '';
      noResultsState.classList.remove('d-none');
      return;
    } else {
      noResultsState.classList.add('d-none');
    }

    // Render cards
    foodItemsContainer.innerHTML = items.map(dish => {
      const isVeg = dish.category === 'veg';
      const cartItem = cart.find(item => item.id === dish.id);
      const quantity = cartItem?.quantity || 0;
      const cartAction = quantity > 0
        ? `<div class="qty-control menu-qty-control" aria-label="Quantity for ${dish.title}">
             <button type="button" onclick="updateCartQty(${dish.id}, -1)" aria-label="Decrease ${dish.title} quantity">−</button>
             <span class="qty-value">${quantity}</span>
             <button type="button" onclick="updateCartQty(${dish.id}, 1)" aria-label="Increase ${dish.title} quantity">+</button>
           </div>`
        : `<button class="btn btn-sm btn-primary rounded-pill px-3 fw-bold add-to-cart-btn" onclick="addToCart(${dish.id})" title="Add to Cart">
             <i class="bi bi-plus-lg me-1"></i>Add
           </button>`;
      return `
        <div class="col-12 col-sm-6 col-lg-4 col-xl-3">
          <div class="card food-card h-100 shadow-sm position-relative">
            <div class="food-img-wrapper cursor-pointer" onclick="openDetailsModal(${dish.id})">
              <img src="${dish.image}" alt="${dish.title}" loading="lazy">
              <span class="cuisine-tag">${dish.cuisine}</span>
              <span class="rating-tag"><i class="bi bi-star-fill text-warning me-1"></i>${dish.rating}</span>
            </div>
            
            <div class="card-body p-3 d-flex flex-column">
              <div class="d-flex align-items-center justify-content-between mb-2">
                <span class="diet-badge ${isVeg ? 'veg' : 'non-veg'}" title="${isVeg ? 'Vegetarian' : 'Non-Vegetarian'}"></span>
                <span class="badge bg-light text-muted small border">${dish.calories}</span>
              </div>
              
              <h6 class="card-title fw-bold mb-1 text-truncate cursor-pointer hover-primary" onclick="openDetailsModal(${dish.id})">
                ${dish.title}
              </h6>
              
              <p class="text-secondary small line-clamp-2 mb-3" style="display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; height: 38px;">
                ${dish.description}
              </p>

              <div class="mt-auto d-flex align-items-center justify-content-between pt-2 border-top">
                <span class="fs-5 fw-extrabold text-primary">$${dish.price.toFixed(2)}</span>
                <div class="d-flex gap-1">
                  <button class="btn btn-sm btn-outline-secondary rounded-circle" onclick="openDetailsModal(${dish.id})" title="View Details" style="width: 34px; height: 34px; padding: 0;">
                    <i class="bi bi-eye"></i>
                  </button>
                  ${cartAction}
                </div>
              </div>
            </div>
          </div>
        </div>
      `;
    }).join('');
  }

  // ==========================================
  // 4. MODAL POPUP FOR DISH DETAILS
  // ==========================================

  window.openDetailsModal = function(dishId) {
    const dish = foodItemsData.find(item => item.id === dishId);
    if (!dish) return;

    const modalBody = document.getElementById('itemDetailsModalBody');
    const isVeg = dish.category === 'veg';

    modalBody.innerHTML = `
      <div class="position-relative">
        <img src="${dish.image}" alt="${dish.title}" class="modal-body-img">
        <div class="position-absolute bottom-0 start-0 p-3 text-white w-100" style="background: linear-gradient(transparent, rgba(0,0,0,0.85));">
          <div class="d-flex align-items-center gap-2 mb-1">
            <span class="diet-badge ${isVeg ? 'veg' : 'non-veg'} bg-white"></span>
            <span class="badge bg-warning text-dark fw-bold">${dish.cuisine}</span>
            <span class="badge bg-dark bg-opacity-75"><i class="bi bi-clock me-1"></i>${dish.prepTime}</span>
          </div>
          <h4 class="fw-bold mb-0">${dish.title}</h4>
        </div>
      </div>

      <div class="p-4">
        <div class="d-flex justify-content-between align-items-center mb-3">
          <span class="fs-3 fw-extrabold text-primary">$${dish.price.toFixed(2)}</span>
          <div class="d-flex align-items-center gap-1 bg-success-subtle text-success px-3 py-1 rounded-pill fw-bold">
            <i class="bi bi-star-fill text-warning"></i>
            <span>${dish.rating} / 5.0</span>
          </div>
        </div>

        <h6 class="fw-bold mb-1">Description</h6>
        <p class="text-secondary small mb-3">${dish.description}</p>

        <h6 class="fw-bold mb-1">Fresh Ingredients</h6>
        <div class="d-flex flex-wrap gap-1 mb-3">
          ${dish.ingredients.map(ing => `<span class="badge bg-light text-dark border px-2 py-1">${ing}</span>`).join('')}
        </div>

        <h6 class="fw-bold mb-2">Nutritional Information (Approx.)</h6>
        <div class="row g-2 text-center mb-3">
          <div class="col-3">
            <div class="nutrition-pill">
              <small class="text-muted d-block">Calories</small>
              <strong class="text-dark">${dish.calories}</strong>
            </div>
          </div>
          <div class="col-3">
            <div class="nutrition-pill">
              <small class="text-muted d-block">Protein</small>
              <strong class="text-dark">${dish.nutrition.protein}</strong>
            </div>
          </div>
          <div class="col-3">
            <div class="nutrition-pill">
              <small class="text-muted d-block">Carbs</small>
              <strong class="text-dark">${dish.nutrition.carbs}</strong>
            </div>
          </div>
          <div class="col-3">
            <div class="nutrition-pill">
              <small class="text-muted d-block">Fat</small>
              <strong class="text-dark">${dish.nutrition.fat}</strong>
            </div>
          </div>
        </div>

        <div class="alert alert-warning py-2 px-3 small rounded-3 mb-4 d-flex align-items-center gap-2">
          <i class="bi bi-exclamation-triangle-fill fs-5 text-warning"></i>
          <div><strong>Allergen Notice:</strong> Contains ${dish.allergens}.</div>
        </div>

        <div class="d-flex gap-2">
          <button class="btn btn-primary btn-lg flex-grow-1 rounded-pill fw-bold" onclick="addToCart(${dish.id}); itemDetailsModal.hide();">
            <i class="bi bi-bag-plus me-2"></i>Add to Cart - $${dish.price.toFixed(2)}
          </button>
        </div>
      </div>
    `;

    itemDetailsModal.show();
  };

  // ==========================================
  // 5. DYNAMIC CART SYSTEM
  // ==========================================

  // Add Item to Cart
  window.addToCart = function(dishId, qty = 1) {
    const dish = foodItemsData.find(item => item.id === dishId);
    if (!dish) return;

    const existingIndex = cart.findIndex(c => c.id === dishId);
    if (existingIndex > -1) {
      cart[existingIndex].quantity += qty;
    } else {
      cart.push({
        id: dish.id,
        title: dish.title,
        price: dish.price,
        image: dish.image,
        category: dish.category,
        quantity: qty
      });
    }

    saveCart();
    renderCart();
    filterAndRenderMenu();
    showToast(`Added <strong>${dish.title}</strong> to cart!`, 'success');
  };

  // Change Quantity (+1 or -1)
  window.updateCartQty = function(dishId, delta) {
    const index = cart.findIndex(c => c.id === dishId);
    if (index === -1) return;

    cart[index].quantity += delta;
    if (cart[index].quantity <= 0) {
      const removedItem = cart[index].title;
      cart.splice(index, 1);
      showToast(`Removed <strong>${removedItem}</strong> from cart.`, 'danger');
    }
    saveCart();
    renderCart();
    filterAndRenderMenu();
  };

  // Remove Item Completely
  window.removeFromCart = function(dishId) {
    const index = cart.findIndex(c => c.id === dishId);
    if (index > -1) {
      const title = cart[index].title;
      cart.splice(index, 1);
      saveCart();
      renderCart();
      filterAndRenderMenu();
      showToast(`Removed <strong>${title}</strong> from cart.`, 'danger');
    }
  };

  // Clear Entire Cart
  document.getElementById('clearCartBtn')?.addEventListener('click', () => {
    if (cart.length === 0) return;
    if (confirm("Are you sure you want to empty your cart?")) {
      cart = [];
      appliedCoupon = null;
      saveCart();
      renderCart();
      filterAndRenderMenu();
      showToast("Cart has been cleared.", "warning");
    }
  });

  // Save Cart to LocalStorage
  function saveCart() {
    localStorage.setItem('bitedash_cart', JSON.stringify(cart));
  }

  // Render Cart Offcanvas & Calculations
  function renderCart() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    badgeCounts.forEach(b => b.textContent = totalItems);

    if (cart.length === 0) {
      cartItemsList.innerHTML = '';
      emptyCartView.classList.remove('d-none');
      cartSummarySection.classList.add('d-none');
      cartTotalPriceBadges.forEach(b => b.textContent = '$0.00');
      return;
    }

    emptyCartView.classList.add('d-none');
    cartSummarySection.classList.remove('d-none');

    // Render items list
    cartItemsList.innerHTML = cart.map(item => `
      <div class="cart-item d-flex align-items-center gap-3">
        <img src="${item.image}" alt="${item.title}" class="cart-item-img">
        <div class="flex-grow-1 overflow-hidden">
          <h6 class="fw-bold mb-1 text-truncate">${item.title}</h6>
          <span class="text-primary fw-bold small">$${(item.price * item.quantity).toFixed(2)}</span>
          <span class="text-muted small">($${item.price.toFixed(2)} each)</span>
        </div>
        <div class="d-flex align-items-center gap-2">
          <div class="qty-control">
            <button type="button" onclick="updateCartQty(${item.id}, -1)">−</button>
            <span class="qty-value">${item.quantity}</span>
            <button type="button" onclick="updateCartQty(${item.id}, 1)">+</button>
          </div>
          <button class="btn btn-link text-danger p-0 ms-1" onclick="removeFromCart(${item.id})" title="Remove item">
            <i class="bi bi-trash3"></i>
          </button>
        </div>
      </div>
    `).join('');

    // Calculations
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    let deliveryFee = subtotal >= 25 ? 0.00 : 2.99;
    let discount = 0;

    if (appliedCoupon) {
      if (appliedCoupon.code === 'FIRST50') {
        discount = Math.min(subtotal * 0.5, 15.00); // 50% off up to $15
      } else if (appliedCoupon.code === 'FREEDEL') {
        discount = deliveryFee;
        deliveryFee = 0;
      } else if (appliedCoupon.code === 'SAVE10') {
        discount = subtotal * 0.10;
      } else if (appliedCoupon.code === 'FEAST20') {
        discount = subtotal * 0.20;
      } else if (appliedCoupon.code === 'GREENLIFE') {
        discount = subtotal * 0.15;
      }
    }

    const taxableAmount = Math.max(0, subtotal - discount);
    const tax = taxableAmount * 0.05; // 5% tax
    const grandTotal = Math.max(0, taxableAmount + deliveryFee + tax);

    // Update DOM
    cartSubtotal.textContent = `$${subtotal.toFixed(2)}`;
    cartTax.textContent = `$${tax.toFixed(2)}`;
    cartDeliveryFee.textContent = deliveryFee === 0 ? 'FREE' : `$${deliveryFee.toFixed(2)}`;
    cartGrandTotal.textContent = `$${grandTotal.toFixed(2)}`;
    if (modalFinalPayable) modalFinalPayable.textContent = `$${grandTotal.toFixed(2)}`;
    cartTotalPriceBadges.forEach(b => b.textContent = `$${grandTotal.toFixed(2)}`);

    if (discount > 0) {
      discountRow.classList.remove('d-none');
      cartDiscount.textContent = `-$${discount.toFixed(2)}`;
    } else {
      discountRow.classList.add('d-none');
    }
  }

  // Promo Code Application
  const applyPromoBtn = document.getElementById('applyPromoBtn');
  const promoInput = document.getElementById('promoInput');
  const promoFeedback = document.getElementById('promoFeedback');

  applyPromoBtn?.addEventListener('click', () => {
    const code = promoInput.value.trim().toUpperCase();
    if (!code) {
      promoFeedback.innerHTML = `<span class="text-danger">Please enter a promo code.</span>`;
      return;
    }

    const validCoupons = ['FIRST50', 'FREEDEL', 'SAVE10', 'FEAST20', 'GREENLIFE'];
    if (validCoupons.includes(code)) {
      appliedCoupon = { code: code };
      promoFeedback.innerHTML = `<span class="text-success"><i class="bi bi-check-circle me-1"></i>Coupon <strong>${code}</strong> applied!</span>`;
      renderCart();
      showToast(`Coupon <strong>${code}</strong> applied successfully!`, 'success');
    } else {
      promoFeedback.innerHTML = `<span class="text-danger"><i class="bi bi-x-circle me-1"></i>Invalid promo code. Try <strong>FIRST50</strong> or <strong>FREEDEL</strong>.</span>`;
    }
  });

  // ==========================================
  // 6. CHECKOUT FORM SUBMISSION
  // ==========================================

  const checkoutForm = document.getElementById('checkoutForm');
  checkoutForm?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const address = document.getElementById('deliveryAddress').value.trim();
    if (!address) {
      alert("Please provide a delivery address.");
      return;
    }
    if (!currentUser || !authToken) {
      checkoutModal.hide();
      authModal.show();
      setAuthFeedback('Your session expired. Please sign in again.', 'warning');
      return;
    }

    const city = checkoutForm.querySelector('input[type="text"]')?.value.trim() || 'Metro City';
    const postalCode = checkoutForm.querySelectorAll('input[type="text"]')[1]?.value.trim() || '';
    const paymentMethod = document.getElementById('payCOD').checked ? 'cod' : document.getElementById('payDemo').checked ? 'demo' : 'razorpay';
    let razorpayPayment = null;
    if (paymentMethod === 'razorpay') {
      try {
        const paymentOrder = await apiRequest('/payments/razorpay/order', {
          method: 'POST',
          body: JSON.stringify({ items: cart.map(item => ({ id: item.id, quantity: item.quantity })) })
        });
        if (!window.Razorpay) throw new Error('Razorpay Checkout could not be loaded. Check your internet connection.');
        await new Promise((resolve, reject) => {
          const checkout = new window.Razorpay({
            key: paymentOrder.keyId,
            amount: Math.round(paymentOrder.amount * 100),
            currency: paymentOrder.currency,
            name: 'BiteDash',
            description: 'Food delivery order',
            order_id: paymentOrder.order.id,
            prefill: { name: currentUser.name, email: currentUser.email },
            theme: { color: '#ff4757' },
            handler: async response => {
              try {
                const verification = await apiRequest('/payments/razorpay/verify', {
                  method: 'POST',
                  body: JSON.stringify({
                    razorpayOrderId: response.razorpay_order_id,
                    razorpayPaymentId: response.razorpay_payment_id,
                    razorpaySignature: response.razorpay_signature
                  })
                });
                razorpayPayment = {
                  verified: verification.verified,
                  orderId: response.razorpay_order_id,
                  paymentId: response.razorpay_payment_id,
                  signature: response.razorpay_signature
                };
                resolve();
              } catch (error) { reject(error); }
            },
            modal: { ondismiss: () => reject(new Error('Razorpay payment was cancelled.')) }
          });
          checkout.open();
        });
      } catch (error) {
        showToast(error.message, 'danger');
        return;
      }
    }
    let order;
    try {
      const result = await apiRequest('/orders', {
        method: 'POST',
        body: JSON.stringify({
          address,
          city,
          postalCode,
          paymentMethod,
          payment: razorpayPayment,
          items: cart.map(item => ({ id: item.id, quantity: item.quantity }))
        })
      });
      order = result.order;
    } catch (error) {
      showToast(error.message, 'danger');
      return;
    }

    const orderId = order.id;
    const orderTotal = Number(order.total).toFixed(2);
    orders.push({
      id: orderId,
      email: currentUser?.email,
      items: cart.reduce((sum, item) => sum + item.quantity, 0),
      total: orderTotal,
      date: new Date().toLocaleDateString()
    });
    saveAccountState();
    checkoutModal.hide();

    // Close offcanvas
    const offcanvasEl = document.getElementById('cartOffcanvas');
    const bsOffcanvas = bootstrap.Offcanvas.getInstance(offcanvasEl);
    if (bsOffcanvas) bsOffcanvas.hide();

    // Reset Cart
    cart = [];
    appliedCoupon = null;
    saveCart();
    renderCart();

    // Show the full confirmation experience instead of a browser alert.
    showToast(`🎉 Order <strong>#${orderId}</strong> placed successfully! ETA: 25 mins.`, 'success');
    renderAccount();
    document.getElementById('confirmationOrderId').textContent = orderId;
    document.getElementById('confirmationTotal').textContent = `$${orderTotal}`;
    document.getElementById('confirmationAddress').textContent = address;
    document.getElementById('confirmationCity').textContent = `${city} ${postalCode}`;
    document.getElementById('confirmationPayment').textContent = paymentMethod === 'cod'
      ? 'Cash on delivery'
      : paymentMethod === 'demo' ? 'Demo payment (test)' : 'Razorpay (test)';
    orderConfirmationModal.show();
  });

  document.getElementById('viewOrdersBtn')?.addEventListener('click', () => {
    renderAccount();
    accountTrigger?.click();
  });

  // ==========================================
  // 7. EVENT LISTENERS FOR FILTERS
  // ==========================================

  // Nav Search
  navSearchInput?.addEventListener('input', (e) => {
    currentFilters.search = e.target.value;
    filterAndRenderMenu();
  });

  // Dietary Radio Group
  document.querySelectorAll('input[name="dietRadio"]').forEach(radio => {
    radio.addEventListener('change', (e) => {
      currentFilters.diet = e.target.value;
      filterAndRenderMenu();
    });
  });

  // Cuisine Select
  cuisineSelect?.addEventListener('change', (e) => {
    currentFilters.cuisine = e.target.value;
    filterAndRenderMenu();
  });

  // Price Slider
  priceRange?.addEventListener('input', (e) => {
    currentFilters.maxPrice = parseFloat(e.target.value);
    priceRangeValue.textContent = `$${currentFilters.maxPrice}`;
    filterAndRenderMenu();
  });

  // Sort Select
  sortSelect?.addEventListener('change', (e) => {
    currentFilters.sort = e.target.value;
    filterAndRenderMenu();
  });

  // Reset Filters Button
  resetFiltersBtn?.addEventListener('click', () => {
    currentFilters = {
      search: '',
      diet: 'all',
      cuisine: 'all',
      maxPrice: 35,
      sort: 'popular'
    };
    if (navSearchInput) navSearchInput.value = '';
    const dietAll = document.getElementById('dietAll');
    if (dietAll) dietAll.checked = true;
    if (cuisineSelect) cuisineSelect.value = 'all';
    if (priceRange) priceRange.value = 35;
    if (priceRangeValue) priceRangeValue.textContent = '$35';
    if (sortSelect) sortSelect.value = 'popular';
    filterAndRenderMenu();
    showToast("Filters reset to default view.", "info");
  });

  // Quick Action Buttons inside Carousel
  document.querySelectorAll('.filter-quick-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const cuisine = e.currentTarget.getAttribute('data-filter-cuisine');
      const diet = e.currentTarget.getAttribute('data-filter-diet');

      if (cuisine && cuisineSelect) {
        cuisineSelect.value = cuisine;
        currentFilters.cuisine = cuisine;
      }
      if (diet) {
        const targetRadio = document.getElementById(diet === 'veg' ? 'dietVeg' : 'dietNonVeg');
        if (targetRadio) {
          targetRadio.checked = true;
          currentFilters.diet = diet;
        }
      }
      filterAndRenderMenu();
      const menuSection = document.getElementById('menu');
      if (menuSection) menuSection.scrollIntoView({ behavior: 'smooth' });
    });
  });

  // ==========================================
  // 8. CONTACT FORM WITH BOOTSTRAP VALIDATION
  // ==========================================

  const contactForm = document.getElementById('contactForm');
  contactForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!contactForm.checkValidity()) {
      contactForm.classList.add('was-validated');
      return;
    }

    const name = document.getElementById('contactName').value;
    contactForm.classList.remove('was-validated');
    contactForm.reset();

    showToast(`Thank you ${name}! Your message was delivered. We'll reply soon.`, 'success');
  });

  // Newsletter Form
  const newsletterForm = document.getElementById('newsletterForm');
  newsletterForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    newsletterForm.reset();
    showToast("Subscribed! Check your inbox for exclusive promo codes.", "success");
  });

  // ==========================================
  // 9. HELPER: TOAST NOTIFICATION
  // ==========================================

  function showToast(message, type = 'success') {
    const toastElem = document.getElementById('liveToast');
    const toastBody = document.getElementById('toastMessage');
    const toastIcon = document.getElementById('toastIcon');

    if (!toastElem || !toastBody) return;

    toastBody.innerHTML = message;
    if (type === 'success') {
      toastIcon.className = 'bi bi-check-circle-fill text-success fs-5';
    } else if (type === 'danger') {
      toastIcon.className = 'bi bi-exclamation-octagon-fill text-danger fs-5';
    } else if (type === 'warning') {
      toastIcon.className = 'bi bi-exclamation-triangle-fill text-warning fs-5';
    } else {
      toastIcon.className = 'bi bi-info-circle-fill text-info fs-5';
    }

    liveToast.show();
  }

  // ==========================================
  // 10. INITIALIZATION
  // ==========================================
  renderRestaurants();
  filterAndRenderMenu();
  renderCart();
});
