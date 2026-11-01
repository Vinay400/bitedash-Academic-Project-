# BiteDash - Claude Project Context

Use this file as the source-of-truth context for generating an academic or technical report about the BiteDash food-delivery system. The complete relevant source code is included below.

## Project Summary
BiteDash is a full-stack food-delivery application with customer authentication, restaurant and menu browsing, filtering, cart management, checkout, demo payment, optional Razorpay Test Mode, order confirmation, order history, and a role-protected admin dashboard.

## Technology Stack
- Frontend: HTML5, CSS3, Bootstrap 5.3, Bootstrap Icons, Vanilla JavaScript
- Backend: Node.js and Express.js
- Database: SQLite using better-sqlite3
- Authentication: bcrypt password hashing and JWT bearer tokens
- Payments: Demo Payment and optional Razorpay Test Mode
- Security: Helmet, CORS, server-side authorization and validation

## Folder Structure
```text
food-delivery-system/
|-- index.html
|-- server.js
|-- package.json
|-- .gitignore
|-- README.md
|-- bitedash.db (generated runtime database; do not include credentials)
|-- css/
|   `-- style.css
`-- js/
    `-- script.js
```

## Database Schema
- users: customer/admin accounts, bcrypt password hashes, role
- restaurants: restaurant profile and delivery metadata
- menu_items: menu catalog linked to restaurants
- orders: customer order, address, payment, totals, shipment status
- order_items: items and quantities belonging to orders

## Roles and Workflows
- Customer: sign up/login -> browse menu -> add quantities -> checkout -> demo/Razorpay/COD payment -> confirmation -> order history.
- Admin: login with admin role -> view dashboard -> add/delete restaurants -> view all orders -> update shipment status.
- Shipment statuses: PLACED, PREPARING, OUT_FOR_DELIVERY, DELIVERED, CANCELLED.

## Report Generation Instructions
When generating a report from this context, preserve the supplied report template exactly. Use formal academic language. Do not invent features, measurements, screenshots, test results, or technologies. If required information is absent, use [TO BE PROVIDED]. Explain the architecture, modules, authentication, database, payment, order lifecycle, admin workflow, testing, limitations, and future enhancements based only on the source code below.

## Source: README.md

`$lang
# CO1: Food Delivery System (BiteDash)

A fully responsive, interactive web application for an online food delivery service engineered with **HTML5, CSS3, Bootstrap 5.3, and modern Vanilla JavaScript (ES6)**.

## ðŸš€ Key Features & Implementation of Tasks

1. **Responsive Homepage using Bootstrap Grid System**:
   - Built on Bootstrap 5's responsive 12-column grid system (`container`, `row`, `col-12`, `col-md-6`, `col-lg-4`, `col-xl-3`).
   - Seamlessly responsive on mobile (<576px), tablet (768px), laptop (992px), and desktop (1200px+).

2. **Dedicated Sections**:
   - **Navbar**: Sticky navigation with brand logo, quick navigation links (`#home`, `#offers`, `#restaurants`, `#menu`, `#contact`), embedded real-time search bar, and cart trigger with dynamic count badge.
   - **Offers**: Interactive Bootstrap Carousel (`#offersCarousel`) featuring 3 slide promotions with promo codes (`FIRST50`, `FEAST20`, `GREENLIFE`) and direct filter triggers.
   - **Restaurants**: Partner kitchen cards showcasing rating badges, delivery times, price indicators, and "View Dishes" filter action.
   - **Menu**: Comprehensive catalog of gourmet dishes with high-res food photography, dietary badges (Pure Veg / Non-Veg), cuisine labels, ratings, and price tags.
   - **Cart**: Interactive Bootstrap Offcanvas drawer with full order breakdown, quantity adjustments, item removal, discount calculations, and checkout modal.
   - **Contact**: Reach-out cards + contact form featuring Bootstrap form validation (`needs-validation`).

3. **Bootstrap Components Used**:
   - **Cards**: Restaurant cards and food dish cards with hover animations.
   - **Carousel**: Full-width auto-playing offers banner with custom indicators and controls.
   - **Modals**:
     - `#itemDetailsModal`: Detailed nutritional breakdown, ingredients, description, allergens, and quick add.
     - `#checkoutModal`: Delivery address, payment selection (Card/UPI, COD), and order summary.
   - **Offcanvas**: `#cartOffcanvas` slide-in cart drawer.
   - **Toasts**: Floating bottom-right live toast notifications for item add/remove and actions.
   - **Badges, Buttons, Button Groups**: Clean Bootstrap UI components.

4. **JavaScript Filtering & Interactivity**:
   - **Dietary Filter**: Toggle between "All Dishes", "Pure Veg", and "Non-Veg".
   - **Cuisine Filter**: Filter by Italian, Indian, American, Japanese, Mexican, and Healthy.
   - **Price Slider**: Real-time slider filtering dishes up to $35.
   - **Search Filter**: Real-time search by dish title, cuisine, or description.
   - **Sorting**: By Popularity, Price (Low to High), Price (High to Low), and Rating.
   - **Reset Filters**: One-click restore to default view.

5. **Dynamic Cart UI**:
   - Add items from card or modal.
   - Increment/decrement quantities with real-time recalculation of subtotal, 5% tax, delivery fee ($2.99 or FREE over $25), coupon discount, and grand total.
   - Remove individual items or clear entire cart.
   - Cart data is persisted in browser `localStorage`.
   - Checkout simulation with generated Order ID and address confirmation.

## ðŸ“ File Structure
```
food-delivery-system/
â”œâ”€â”€ index.html       # Semantic HTML5 markup with Bootstrap 5 components
â”œâ”€â”€ css/
â”‚   â””â”€â”€ style.css    # Custom styles, transitions, badges, and responsive tweaks
â”œâ”€â”€ js/
â”‚   â””â”€â”€ script.js    # Data arrays, filter engine, modal rendering, cart logic
â””â”€â”€ README.md        # Documentation and task mapping
```

## ðŸ–¥ï¸ How to Run
Run the full-stack application from this folder:
```bash
npm install
npm start
```
Then open `http://localhost:4173`. The server hosts the frontend and API together.

Important: do not open `index.html` with a double-click for the backend version. Open
`http://localhost:4173` after starting the server so the frontend and API use the same origin.

### Port already in use

If `npm start` reports `EADDRINUSE`, another process is already listening on port `4173`.
If it is the existing BiteDash process, simply open `http://localhost:4173` and do not start a second copy.
To use a different port:

```powershell
$env:PORT=4174
npm start
```

The startup script now prints this guidance instead of an unhandled stack trace.

## ðŸ‘¤ Account, Orders & Data Layer

The app now includes a complete client-side product flow:

- Sign up and sign in with form validation.
- Persistent session state and cart state.
- Account profile with recent order history.
- Checkout protection requiring authentication.
- Delivery address and payment method selection.
- Order creation with order ID, date, item count, and total.

The backend is an Express + SQLite API in `server.js`. It stores users, restaurants, menu items, orders, and order items in `bitedash.db`, hashes passwords with bcrypt, and uses signed JWT sessions. The browser only keeps the JWT and cart UI state; passwords are never stored in browser storage. Set `JWT_SECRET` to a strong secret in production.

Available API routes include `POST /api/auth/signup`, `POST /api/auth/login`, `GET /api/auth/me`, `GET /api/restaurants`, `GET /api/menu`, `POST /api/orders`, and `GET /api/orders`.

### Razorpay Test Mode

The online checkout uses Razorpay Test Mode and USD amounts. Create test keys in the Razorpay Dashboard,
then start the server with:

```powershell
$env:RAZORPAY_KEY_ID="rzp_test_your_key_id"
$env:RAZORPAY_KEY_SECRET="your_test_key_secret"
$env:RAZORPAY_CURRENCY="USD"
npm start
```

The server creates the Razorpay order and verifies the returned signature before creating the BiteDash order.
Never put `RAZORPAY_KEY_SECRET` in frontend code or commit it to the repository. Razorpay may require
international payments to be enabled for non-INR currencies; use `INR` if USD is unavailable for your test account.

For classroom demonstrations without a Razorpay account or keys, select **Demo Payment** during checkout.
It creates a real database order with `payment_status = demo_paid`, but does not charge money.

### Admin Dashboard

The server creates a demo administrator on first startup:

```text
Email: admin@bitedash.local
Password: Admin@123
```

Sign in with this account to access the **Admin** dashboard. Admin users can add or delete restaurants,
view all orders, and update shipment states (`PLACED`, `PREPARING`, `OUT_FOR_DELIVERY`, `DELIVERED`, or
`CANCELLED`). Override the demo credentials with `ADMIN_EMAIL` and `ADMIN_PASSWORD` before starting the server.
```

## Source: package.json

`$lang
{
  "name": "bitedash",
  "version": "1.0.0",
  "private": true,
  "description": "BiteDash food delivery platform",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "node --watch server.js"
  },
  "dependencies": {
    "bcryptjs": "^2.4.3",
    "better-sqlite3": "^11.7.0",
    "cors": "^2.8.5",
    "express": "^4.21.2",
    "helmet": "^8.0.0",
    "jsonwebtoken": "^9.0.2",
    "razorpay": "^2.9.4"
  }
}
```

## Source: server.js

`$lang
const path = require('path');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const Razorpay = require('razorpay');
const Database = require('better-sqlite3');

const app = express();
const port = Number(process.env.PORT || 4173);
const jwtSecret = process.env.JWT_SECRET || 'bitedash-local-development-secret';
const razorpayKeyId = process.env.RAZORPAY_KEY_ID;
const razorpayKeySecret = process.env.RAZORPAY_KEY_SECRET;
const razorpayCurrency = process.env.RAZORPAY_CURRENCY || 'USD';
const razorpay = razorpayKeyId && razorpayKeySecret
  ? new Razorpay({ key_id: razorpayKeyId, key_secret: razorpayKeySecret })
  : null;
const db = new Database(path.join(__dirname, 'bitedash.db'));

app.use(helmet({ contentSecurityPolicy: false }));
app.use(cors());
app.use(express.json({ limit: '100kb' }));
app.use(express.static(__dirname));

db.pragma('foreign_keys = ON');
function addColumnIfMissing(table, column, definition) {
  try { db.exec(`ALTER TABLE ${table} ADD COLUMN ${column} ${definition}`); } catch (error) {
    if (!String(error.message).includes('duplicate column name')) throw error;
  }
}
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE COLLATE NOCASE,
    password_hash TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'customer',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  );
  CREATE TABLE IF NOT EXISTS restaurants (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    cuisine TEXT NOT NULL,
    rating REAL NOT NULL,
    delivery_time TEXT NOT NULL,
    min_order TEXT NOT NULL,
    image TEXT NOT NULL,
    featured_tag TEXT NOT NULL
  );
  CREATE TABLE IF NOT EXISTS menu_items (
    id INTEGER PRIMARY KEY,
    restaurant_id INTEGER NOT NULL,
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    cuisine TEXT NOT NULL,
    price REAL NOT NULL CHECK (price >= 0),
    rating REAL NOT NULL,
    image TEXT NOT NULL,
    description TEXT NOT NULL,
    FOREIGN KEY (restaurant_id) REFERENCES restaurants(id)
  );
  CREATE TABLE IF NOT EXISTS orders (
    id TEXT PRIMARY KEY,
    user_id INTEGER NOT NULL,
    address TEXT NOT NULL,
    city TEXT NOT NULL,
    postal_code TEXT NOT NULL,
    payment_method TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'PLACED',
    subtotal REAL NOT NULL,
    delivery_fee REAL NOT NULL,
    tax REAL NOT NULL,
    discount REAL NOT NULL DEFAULT 0,
    total REAL NOT NULL,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
  );
  CREATE TABLE IF NOT EXISTS order_items (
    order_id TEXT NOT NULL,
    menu_item_id INTEGER NOT NULL,
    title TEXT NOT NULL,
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    unit_price REAL NOT NULL,
    PRIMARY KEY (order_id, menu_item_id),
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
  );
`);
addColumnIfMissing('orders', 'payment_status', "TEXT NOT NULL DEFAULT 'pending'");
addColumnIfMissing('orders', 'razorpay_order_id', 'TEXT');
addColumnIfMissing('orders', 'razorpay_payment_id', 'TEXT');
addColumnIfMissing('orders', 'razorpay_signature', 'TEXT');
addColumnIfMissing('users', 'role', "TEXT NOT NULL DEFAULT 'customer'");
const adminEmail = (process.env.ADMIN_EMAIL || 'admin@bitedash.local').toLowerCase();
const adminPassword = process.env.ADMIN_PASSWORD || 'Admin@123';
const admin = db.prepare('SELECT id FROM users WHERE email = ?').get(adminEmail);
if (!admin) {
  db.prepare('INSERT INTO users (name, email, password_hash, role) VALUES (?, ?, ?, ?)')
    .run('BiteDash Admin', adminEmail, bcrypt.hashSync(adminPassword, 12), 'admin');
}

const seedRestaurant = db.prepare(`INSERT OR IGNORE INTO restaurants
  (id, name, cuisine, rating, delivery_time, min_order, image, featured_tag)
  VALUES (@id, @name, @cuisine, @rating, @deliveryTime, @minOrder, @image, @featuredTag)`);
const restaurants = [
  [1, 'The Italian Crust', 'Italian & Wood-Fired Pizza', 4.8, '20-25 mins', '$15', 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&auto=format&fit=crop&q=80', 'Popular'],
  [2, 'Spice Symphony', 'Authentic North & South Indian', 4.9, '25-35 mins', '$12', 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&auto=format&fit=crop&q=80', "Chef's Choice"],
  [3, 'Burger Haven & Co.', 'American Gourmet Burgers & Shakes', 4.7, '15-20 mins', '$10', 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=600&auto=format&fit=crop&q=80', 'Fastest']
];
for (const [id, name, cuisine, rating, deliveryTime, minOrder, image, featuredTag] of restaurants) {
  seedRestaurant.run({ id, name, cuisine, rating, deliveryTime, minOrder, image, featuredTag });
}
const seedMenuItem = db.prepare(`INSERT OR IGNORE INTO menu_items
  (id, restaurant_id, title, category, cuisine, price, rating, image, description)
  VALUES (@id, @restaurantId, @title, @category, @cuisine, @price, @rating, @image, @description)`);
[
  [101, 1, 'Truffle Mushroom Artisan Pizza', 'veg', 'Italian', 18.99, 4.9, 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&auto=format&fit=crop&q=80', 'Hand-tossed sourdough pizza with wild mushrooms, mozzarella, truffle oil, and basil.'],
  [102, 2, 'Royal Chicken Dum Biryani', 'non-veg', 'Indian', 16.50, 4.9, 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=600&auto=format&fit=crop&q=80', 'Fragrant basmati rice slow-cooked with tender chicken, saffron, and whole spices.'],
  [103, 3, 'Smoky BBQ Angus Burger', 'non-veg', 'American', 14.99, 4.8, 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&auto=format&fit=crop&q=80', 'Flame-grilled Angus beef, cheddar, bacon, and smoky BBQ glaze in a brioche bun.'],
  [104, 2, 'Paneer Butter Masala & Naan', 'veg', 'Indian', 13.99, 4.8, 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=600&auto=format&fit=crop&q=80', 'Tender paneer in a velvet tomato-cashew gravy with garlic naan.'],
  [105, 1, 'Classic Margherita Basilico', 'veg', 'Italian', 13.50, 4.6, 'https://images.unsplash.com/photo-1604382355076-af4b0eb60143?w=600&auto=format&fit=crop&q=80', 'San Marzano tomato, buffalo mozzarella, basil, and extra virgin olive oil.'],
  [106, 1, 'Crispy Golden Garlic Fries', 'veg', 'American', 6.50, 4.5, 'https://images.unsplash.com/photo-1576107232684-1279f3908594?w=600&auto=format&fit=crop&q=80', 'Crispy Idaho potatoes tossed in roasted garlic, rosemary, and parmesan.']
].forEach(([id, restaurantId, title, category, cuisine, price, rating, image, description]) =>
  seedMenuItem.run({ id, restaurantId, title, category, cuisine, price, rating, image, description }));

function authRequired(req, res, next) {
  const token = req.headers.authorization?.replace(/^Bearer\s+/i, '');
  if (!token) return res.status(401).json({ error: 'Authentication required' });
  try {
    req.user = jwt.verify(token, jwtSecret);
    return next();
  } catch {
    return res.status(401).json({ error: 'Invalid or expired session' });
  }
}
function adminRequired(req, res, next) {
  const user = db.prepare('SELECT id, role FROM users WHERE id = ?').get(req.user.id);
  if (!user || user.role !== 'admin') return res.status(403).json({ error: 'Admin access required' });
  return next();
}

function publicUser(user) {
  return { id: user.id, name: user.name, email: user.email, role: user.role || 'customer' };
}

app.get('/api/health', (req, res) => res.json({ ok: true, service: 'bitedash-api' }));

app.post('/api/auth/signup', async (req, res) => {
  const { name, email, password } = req.body || {};
  if (!name?.trim() || !email?.trim() || typeof password !== 'string' || password.length < 6) {
    return res.status(400).json({ error: 'Name, valid email, and a 6-character password are required' });
  }
  try {
    const passwordHash = await bcrypt.hash(password, 12);
    const result = db.prepare('INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)')
      .run(name.trim(), email.trim().toLowerCase(), passwordHash);
    const user = db.prepare('SELECT id, name, email, role FROM users WHERE id = ?').get(result.lastInsertRowid);
    const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, jwtSecret, { expiresIn: '7d' });
    return res.status(201).json({ user, token });
  } catch (error) {
    if (error.code === 'SQLITE_CONSTRAINT_UNIQUE') return res.status(409).json({ error: 'An account already exists for this email' });
    return res.status(500).json({ error: 'Unable to create account' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body || {};
  const user = db.prepare('SELECT * FROM users WHERE email = ?').get(String(email || '').trim().toLowerCase());
  if (!user || !(await bcrypt.compare(String(password || ''), user.password_hash))) {
    return res.status(401).json({ error: 'Email or password is incorrect' });
  }
  const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, jwtSecret, { expiresIn: '7d' });
  return res.json({ user: publicUser(user), token });
});

app.get('/api/auth/me', authRequired, (req, res) => {
  const user = db.prepare('SELECT id, name, email, role FROM users WHERE id = ?').get(req.user.id);
  return user ? res.json({ user }) : res.status(404).json({ error: 'User not found' });
});

app.get('/api/restaurants', (req, res) => res.json(db.prepare('SELECT * FROM restaurants ORDER BY rating DESC').all()));
app.get('/api/menu', (req, res) => res.json(db.prepare('SELECT * FROM menu_items ORDER BY rating DESC, title').all()));

app.post('/api/payments/razorpay/order', authRequired, async (req, res) => {
  if (!razorpay) return res.status(503).json({ error: 'Razorpay test keys are not configured on the server' });
  const items = Array.isArray(req.body?.items) ? req.body.items : [];
  const getItem = db.prepare('SELECT id, price FROM menu_items WHERE id = ?');
  const subtotal = items.reduce((sum, item) => {
    const menuItem = getItem.get(Number(item.id));
    const quantity = Number(item.quantity);
    return menuItem && Number.isInteger(quantity) && quantity > 0 && quantity <= 50 ? sum + menuItem.price * quantity : sum;
  }, 0);
  if (!subtotal || items.length === 0) return res.status(400).json({ error: 'Cart cannot be empty' });
  const deliveryFee = subtotal >= 25 ? 0 : 2.99;
  const total = subtotal + deliveryFee + subtotal * 0.05;
  try {
    const paymentOrder = await razorpay.orders.create({
      amount: Math.round(total * 100),
      currency: razorpayCurrency,
      receipt: `bitedash_${Date.now()}`,
      notes: { user_id: String(req.user.id) }
    });
    return res.status(201).json({ keyId: razorpayKeyId, order: paymentOrder, amount: total, currency: razorpayCurrency });
  } catch (error) {
    return res.status(502).json({ error: 'Unable to create Razorpay test order' });
  }
});

app.post('/api/payments/razorpay/verify', authRequired, (req, res) => {
  const { razorpayOrderId, razorpayPaymentId, razorpaySignature } = req.body || {};
  if (!razorpayKeySecret || !razorpayOrderId || !razorpayPaymentId || !razorpaySignature) {
    return res.status(400).json({ error: 'Incomplete Razorpay payment details' });
  }
  const expectedSignature = crypto.createHmac('sha256', razorpayKeySecret)
    .update(`${razorpayOrderId}|${razorpayPaymentId}`)
    .digest('hex');
  if (expectedSignature !== razorpaySignature) return res.status(400).json({ error: 'Razorpay payment verification failed' });
  return res.json({ verified: true });
});

const createOrder = db.transaction((userId, body) => {
  const items = Array.isArray(body.items) ? body.items : [];
  if (!items.length) throw Object.assign(new Error('Cart cannot be empty'), { status: 400 });
  const getItem = db.prepare('SELECT id, title, price FROM menu_items WHERE id = ?');
  const resolved = items.map(item => {
    const menuItem = getItem.get(Number(item.id));
    const quantity = Number(item.quantity);
    if (!menuItem || !Number.isInteger(quantity) || quantity < 1 || quantity > 50) throw Object.assign(new Error('Invalid order item'), { status: 400 });
    return { ...menuItem, quantity };
  });
  const subtotal = resolved.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = subtotal >= 25 ? 0 : 2.99;
  const discount = Math.max(0, Number(body.discount) || 0);
  const tax = Math.max(0, subtotal - discount) * 0.05;
  const total = Math.max(0, subtotal - discount + deliveryFee + tax);
  const id = `BD-${Math.floor(100000 + Math.random() * 900000)}`;
  db.prepare(`INSERT INTO orders (id, user_id, address, city, postal_code, payment_method, subtotal, delivery_fee, tax, discount, total)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`).run(id, userId, body.address.trim(), body.city.trim(), body.postalCode.trim(), body.paymentMethod, subtotal, deliveryFee, tax, discount, total);
  const addItem = db.prepare('INSERT INTO order_items (order_id, menu_item_id, title, quantity, unit_price) VALUES (?, ?, ?, ?, ?)');
  resolved.forEach(item => addItem.run(id, item.id, item.title, item.quantity, item.price));
  return db.prepare('SELECT * FROM orders WHERE id = ?').get(id);
});

app.post('/api/orders', authRequired, (req, res) => {
  const { address, city, postalCode, paymentMethod, payment } = req.body || {};
  if (!address?.trim() || !city?.trim() || !postalCode?.trim() || !['razorpay', 'cod', 'demo'].includes(paymentMethod)) {
    return res.status(400).json({ error: 'Complete delivery and payment details are required' });
  }
  if (paymentMethod === 'razorpay' && !payment?.verified) return res.status(400).json({ error: 'Verified Razorpay payment is required' });
  try {
    const order = createOrder(req.user.id, req.body);
    db.prepare(`UPDATE orders SET payment_status = ?, razorpay_order_id = ?, razorpay_payment_id = ?, razorpay_signature = ? WHERE id = ?`)
      .run(paymentMethod === 'razorpay' ? 'paid' : paymentMethod === 'demo' ? 'demo_paid' : 'pending', payment?.orderId || null, payment?.paymentId || null, payment?.signature || null, order.id);
    return res.status(201).json({ order: db.prepare('SELECT * FROM orders WHERE id = ?').get(order.id) });
  }
  catch (error) { return res.status(error.status || 500).json({ error: error.status ? error.message : 'Unable to place order' }); }
});

app.get('/api/orders', authRequired, (req, res) => {
  const orders = db.prepare('SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC').all(req.user.id);
  return res.json({ orders });
});

app.get('/api/admin/restaurants', authRequired, adminRequired, (req, res) => {
  return res.json({ restaurants: db.prepare('SELECT * FROM restaurants ORDER BY id DESC').all() });
});

app.post('/api/admin/restaurants', authRequired, adminRequired, (req, res) => {
  const { name, cuisine, deliveryTime, minOrder, image, featuredTag } = req.body || {};
  if (![name, cuisine, deliveryTime, minOrder, image, featuredTag].every(value => typeof value === 'string' && value.trim())) {
    return res.status(400).json({ error: 'All restaurant fields are required' });
  }
  const id = (db.prepare('SELECT COALESCE(MAX(id), 0) + 1 AS nextId FROM restaurants').get()).nextId;
  const restaurant = { id, name: name.trim(), cuisine: cuisine.trim(), rating: 5, deliveryTime: deliveryTime.trim(), minOrder: minOrder.trim(), image: image.trim(), featuredTag: featuredTag.trim() };
  db.prepare(`INSERT INTO restaurants (id, name, cuisine, rating, delivery_time, min_order, image, featured_tag)
    VALUES (@id, @name, @cuisine, @rating, @deliveryTime, @minOrder, @image, @featuredTag)`).run(restaurant);
  return res.status(201).json({ restaurant: db.prepare('SELECT * FROM restaurants WHERE id = ?').get(id) });
});

app.delete('/api/admin/restaurants/:id', authRequired, adminRequired, (req, res) => {
  const id = Number(req.params.id);
  const restaurant = db.prepare('SELECT id FROM restaurants WHERE id = ?').get(id);
  if (!restaurant) return res.status(404).json({ error: 'Restaurant not found' });
  const remove = db.transaction(() => {
    db.prepare('DELETE FROM menu_items WHERE restaurant_id = ?').run(id);
    db.prepare('DELETE FROM restaurants WHERE id = ?').run(id);
  });
  remove();
  return res.json({ deleted: true });
});

app.get('/api/admin/orders', authRequired, adminRequired, (req, res) => {
  const orders = db.prepare(`SELECT orders.*, users.name AS customer_name, users.email AS customer_email
    FROM orders JOIN users ON users.id = orders.user_id ORDER BY orders.created_at DESC`).all();
  return res.json({ orders });
});

app.patch('/api/admin/orders/:id/status', authRequired, adminRequired, (req, res) => {
  const allowed = ['PLACED', 'PREPARING', 'OUT_FOR_DELIVERY', 'DELIVERED', 'CANCELLED'];
  const status = String(req.body?.status || '').toUpperCase();
  if (!allowed.includes(status)) return res.status(400).json({ error: 'Invalid shipment status' });
  const result = db.prepare('UPDATE orders SET status = ? WHERE id = ?').run(status, req.params.id);
  if (!result.changes) return res.status(404).json({ error: 'Order not found' });
  return res.json({ order: db.prepare('SELECT * FROM orders WHERE id = ?').get(req.params.id) });
});

app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));
const server = app.listen(port, () => console.log(`BiteDash running at http://localhost:${port}`));
server.on('error', error => {
  if (error.code === 'EADDRINUSE') {
    console.error(`Port ${port} is already in use. The BiteDash server may already be running.`);
    console.error(`Use http://localhost:${port}, or start another instance with: $env:PORT=4174; npm start`);
    process.exitCode = 1;
    return;
  }
  console.error('Unable to start BiteDash:', error);
  process.exitCode = 1;
});
```

## Source: index.html

`$lang
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>BiteDash | Delicious Food Delivered Fast</title>
  
  <!-- Google Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  
  <!-- Bootstrap 5.3.3 CSS -->
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
  <!-- Bootstrap Icons -->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
  
  <!-- Custom CSS -->
  <link rel="stylesheet" href="css/style.css">
</head>
<body>

  <!-- ================= TOP NOTIFICATION BAR ================= -->
  <div class="top-banner py-1 px-3 text-center text-white small">
    <span>ðŸš€ Free delivery on orders above $25! Use coupon <strong>FREEDEL</strong> at checkout.</span>
  </div>

  <!-- ================= NAVBAR ================= -->
  <nav id="mainNavbar" class="navbar navbar-expand-lg navbar-light bg-white sticky-top shadow-sm py-2">
    <div class="container">
      <a class="navbar-brand d-flex align-items-center gap-2 fw-bold text-primary" href="#home">
        <span class="brand-icon d-flex align-items-center justify-content-center">
          <i class="bi bi-fire"></i>
        </span>
        <span class="brand-text">Bite<span class="text-warning">Dash</span></span>
      </a>

      <!-- Mobile Search & Cart Toggle -->
      <div class="d-flex align-items-center gap-2 d-lg-none">
        <button class="btn btn-outline-primary btn-sm position-relative" type="button" data-bs-toggle="offcanvas" data-bs-target="#cartOffcanvas" aria-controls="cartOffcanvas">
          <i class="bi bi-cart3 fs-5"></i>
          <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger cart-badge-count">0</span>
        </button>
        <button class="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent" aria-controls="navbarContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
      </div>

      <!-- Nav Links & Search -->
      <div class="collapse navbar-collapse" id="navbarContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-3">
          <li class="nav-item">
            <a class="nav-link active" href="#home"><i class="bi bi-house-door me-1"></i>Home</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#offers"><i class="bi bi-tag me-1"></i>Offers</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#restaurants"><i class="bi bi-shop me-1"></i>Restaurants</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#menu"><i class="bi bi-grid me-1"></i>Menu</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#contact"><i class="bi bi-envelope me-1"></i>Contact</a>
          </li>
        </ul>

        <!-- Search Bar in Nav -->
        <div class="nav-search-box d-flex align-items-center me-lg-3 my-2 my-lg-0 position-relative flex-grow-1" style="max-width: 320px;">
          <i class="bi bi-search position-absolute ms-3 text-muted"></i>
          <input id="navSearchInput" class="form-control form-control-sm ps-5 rounded-pill" type="search" placeholder="Search dishes, cuisines..." aria-label="Search">
        </div>

        <!-- Desktop Cart Button -->
        <div class="d-none d-lg-flex align-items-center gap-3">
          <button id="accountTrigger" class="btn btn-light rounded-pill px-3 d-flex align-items-center gap-2" type="button" data-bs-toggle="modal" data-bs-target="#authModal">
            <i class="bi bi-person-circle"></i><span id="accountLabel">Sign in</span>
          </button>
          <button id="adminTrigger" class="btn btn-dark rounded-pill px-3 d-none" type="button" data-bs-toggle="modal" data-bs-target="#adminModal">
            <i class="bi bi-speedometer2 me-1"></i>Admin
          </button>
          <button class="btn btn-primary d-flex align-items-center gap-2 rounded-pill px-3 py-2 position-relative" type="button" data-bs-toggle="offcanvas" data-bs-target="#cartOffcanvas" aria-controls="cartOffcanvas">
            <i class="bi bi-cart3"></i>
            <span class="fw-semibold">My Cart</span>
            <span class="badge bg-danger rounded-pill cart-badge-count ms-1">0</span>
            <span class="badge bg-white text-primary rounded-pill cart-total-price ms-1">$0.00</span>
          </button>
        </div>

      </div>
    </div>
  </nav>

  <!-- ================= ADMIN DASHBOARD ================= -->
  <div class="modal fade" id="adminModal" tabindex="-1" aria-labelledby="adminModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-xl modal-dialog-centered">
      <div class="modal-content border-0 rounded-4 shadow-lg overflow-hidden">
        <div class="modal-header admin-header text-white">
          <div><span class="small text-uppercase opacity-75">Operations center</span><h4 class="modal-title fw-bold" id="adminModalLabel">BiteDash Admin Dashboard</h4></div>
          <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body p-3 p-md-4">
          <div id="adminFeedback" class="small mb-3"></div>
          <div class="row g-3 mb-4">
            <div class="col-6 col-lg-3"><div class="admin-stat"><small>Total orders</small><strong id="adminOrderCount">0</strong></div></div>
            <div class="col-6 col-lg-3"><div class="admin-stat"><small>Active shipments</small><strong id="adminActiveCount">0</strong></div></div>
            <div class="col-6 col-lg-3"><div class="admin-stat"><small>Restaurants</small><strong id="adminRestaurantCount">0</strong></div></div>
            <div class="col-6 col-lg-3"><div class="admin-stat"><small>Revenue</small><strong id="adminRevenue">$0.00</strong></div></div>
          </div>
          <ul class="nav nav-tabs mb-3" role="tablist">
            <li class="nav-item"><button class="nav-link active" data-admin-tab="shipments" type="button">Shipments</button></li>
            <li class="nav-item"><button class="nav-link" data-admin-tab="restaurants" type="button">Restaurants</button></li>
          </ul>
          <section id="adminShipmentsPanel">
            <div class="table-responsive"><table class="table align-middle small"><thead><tr><th>Order</th><th>Customer</th><th>Address</th><th>Total</th><th>Status</th></tr></thead><tbody id="adminOrdersBody"></tbody></table></div>
          </section>
          <section id="adminRestaurantsPanel" class="d-none">
            <form id="restaurantForm" class="row g-2 mb-3">
              <div class="col-md-4"><input id="restaurantName" class="form-control form-control-sm" placeholder="Restaurant name" required></div>
              <div class="col-md-4"><input id="restaurantCuisine" class="form-control form-control-sm" placeholder="Cuisine" required></div>
              <div class="col-md-4"><input id="restaurantImage" class="form-control form-control-sm" placeholder="Image URL" required></div>
              <div class="col-md-4"><input id="restaurantDelivery" class="form-control form-control-sm" placeholder="20-30 mins" required></div>
              <div class="col-md-4"><input id="restaurantMinOrder" class="form-control form-control-sm" placeholder="$10 minimum" required></div>
              <div class="col-md-4"><input id="restaurantTag" class="form-control form-control-sm" placeholder="Featured tag" required></div>
              <div class="col-12"><button class="btn btn-primary btn-sm rounded-pill px-3" type="submit"><i class="bi bi-plus-lg me-1"></i>Add restaurant</button></div>
            </form>
            <div id="adminRestaurantsList" class="row g-2"></div>
          </section>
        </div>
      </div>
    </div>
  </div>

  <!-- ================= AUTHENTICATION ================= -->
  <div class="modal fade" id="authModal" tabindex="-1" aria-labelledby="authModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content border-0 rounded-4 shadow-lg overflow-hidden">
        <div class="modal-header border-0 pb-0">
          <div>
            <span class="text-primary fw-bold text-uppercase small">Your BiteDash account</span>
            <h4 class="modal-title fw-extrabold mt-1" id="authModalLabel">Welcome back</h4>
          </div>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body p-4">
          <div id="authForms">
            <div class="auth-tabs nav nav-pills nav-fill bg-light rounded-pill p-1 mb-4">
              <button class="nav-link active rounded-pill" data-auth-tab="login" type="button">Sign in</button>
              <button class="nav-link rounded-pill" data-auth-tab="signup" type="button">Create account</button>
            </div>
            <form id="loginForm" class="auth-form">
              <div class="mb-3"><label class="form-label small fw-semibold">Email</label><input id="loginEmail" type="email" class="form-control" placeholder="you@example.com" required></div>
              <div class="mb-3"><label class="form-label small fw-semibold">Password</label><input id="loginPassword" type="password" class="form-control" minlength="6" placeholder="At least 6 characters" required></div>
              <button class="btn btn-primary w-100 rounded-pill fw-bold" type="submit">Sign in <i class="bi bi-arrow-right ms-1"></i></button>
            </form>
            <form id="signupForm" class="auth-form d-none">
              <div class="mb-3"><label class="form-label small fw-semibold">Full name</label><input id="signupName" type="text" class="form-control" placeholder="Alex Morgan" required></div>
              <div class="mb-3"><label class="form-label small fw-semibold">Email</label><input id="signupEmail" type="email" class="form-control" placeholder="you@example.com" required></div>
              <div class="mb-3"><label class="form-label small fw-semibold">Password</label><input id="signupPassword" type="password" class="form-control" minlength="6" placeholder="At least 6 characters" required></div>
              <button class="btn btn-primary w-100 rounded-pill fw-bold" type="submit">Create account <i class="bi bi-person-plus ms-1"></i></button>
            </form>
            <p id="authFeedback" class="small mb-0 mt-3 text-center"></p>
          </div>
          <div id="accountPanel" class="d-none">
            <div class="account-hero rounded-4 p-3 mb-3 d-flex align-items-center gap-3">
              <div id="accountAvatar" class="account-avatar">A</div>
              <div><h5 id="accountName" class="fw-bold mb-0"></h5><small id="accountEmail" class="text-muted"></small></div>
            </div>
            <div class="d-flex justify-content-between align-items-center mb-2"><h6 class="fw-bold mb-0">Recent orders</h6><span class="badge bg-primary-subtle text-primary" id="orderCount">0 orders</span></div>
            <div id="orderHistory" class="small mb-3"></div>
            <button id="signOutBtn" class="btn btn-outline-danger w-100 rounded-pill" type="button"><i class="bi bi-box-arrow-right me-1"></i>Sign out</button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- ================= HERO & OFFERS CAROUSEL ================= -->
  <div id="home" class="nav-anchor" aria-hidden="true"></div>
  <section id="offers" class="offers-section py-4 bg-light">
    <div class="container">
      <div id="offersCarousel" class="carousel slide carousel-fade rounded-4 shadow overflow-hidden" data-bs-ride="carousel" data-bs-interval="4500">
        <!-- Indicators -->
        <div class="carousel-indicators">
          <button type="button" data-bs-target="#offersCarousel" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#offersCarousel" data-bs-slide-to="1" aria-label="Slide 2"></button>
          <button type="button" data-bs-target="#offersCarousel" data-bs-slide-to="2" aria-label="Slide 3"></button>
        </div>

        <!-- Carousel Items -->
        <div class="carousel-inner">
          <!-- Slide 1 -->
          <div class="carousel-item active hero-slide slide-1">
            <div class="hero-overlay d-flex align-items-center">
              <div class="container px-4 px-md-5">
                <div class="row align-items-center">
                  <div class="col-lg-7 text-white">
                    <span class="badge bg-warning text-dark px-3 py-2 rounded-pill fw-bold mb-3 fs-6">
                      <i class="bi bi-lightning-charge-fill me-1"></i> Mega Welcome Deal
                    </span>
                    <h1 class="display-5 fw-extrabold mb-3">Craving Something Special? Get <span class="text-warning">50% OFF</span></h1>
                    <p class="lead mb-4 opacity-90">Enjoy handcrafted artisan pizzas, sizzling burgers, and regional delicacies delivered piping hot in 30 mins.</p>
                    <div class="d-flex flex-wrap gap-2 align-items-center">
                      <a href="#menu" class="btn btn-warning btn-lg rounded-pill px-4 fw-bold text-dark shadow-sm">
                        Order Now <i class="bi bi-arrow-right ms-1"></i>
                      </a>
                      <span class="coupon-tag bg-dark bg-opacity-50 text-white border border-light border-opacity-25 rounded-pill px-3 py-2 small">
                        Code: <strong>FIRST50</strong>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Slide 2 -->
          <div class="carousel-item hero-slide slide-2">
            <div class="hero-overlay d-flex align-items-center">
              <div class="container px-4 px-md-5">
                <div class="row align-items-center">
                  <div class="col-lg-7 text-white">
                    <span class="badge bg-danger px-3 py-2 rounded-pill fw-bold mb-3 fs-6">
                      <i class="bi bi-fire me-1"></i> Weekend Feast Special
                    </span>
                    <h1 class="display-5 fw-extrabold mb-3">Family Combos & Biryani Feasts at <span class="text-danger-emphasis bg-warning px-2 rounded">Flat $19.99</span></h1>
                    <p class="lead mb-4 opacity-90">Authentic recipes prepared by master chefs using premium farm-fresh ingredients.</p>
                    <div class="d-flex flex-wrap gap-2 align-items-center">
                      <button class="btn btn-danger btn-lg rounded-pill px-4 fw-bold filter-quick-btn" data-filter-cuisine="Indian">
                        Explore Biryanis <i class="bi bi-arrow-right ms-1"></i>
                      </button>
                      <span class="coupon-tag bg-dark bg-opacity-50 text-white border border-light border-opacity-25 rounded-pill px-3 py-2 small">
                        Code: <strong>FEAST20</strong>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Slide 3 -->
          <div class="carousel-item hero-slide slide-3">
            <div class="hero-overlay d-flex align-items-center">
              <div class="container px-4 px-md-5">
                <div class="row align-items-center">
                  <div class="col-lg-7 text-white">
                    <span class="badge bg-success px-3 py-2 rounded-pill fw-bold mb-3 fs-6">
                      <i class="bi bi-heart-pulse-fill me-1"></i> Fresh & Healthy Choices
                    </span>
                    <h1 class="display-5 fw-extrabold mb-3">Guilt-Free Organic Bowls & <span class="text-success-emphasis bg-light px-2 rounded">100% Vegan Treats</span></h1>
                    <p class="lead mb-4 opacity-90">Nutritious salads, protein power bowls, and smoothie jars tailored for your healthy lifestyle.</p>
                    <div class="d-flex flex-wrap gap-2 align-items-center">
                      <button class="btn btn-success btn-lg rounded-pill px-4 fw-bold filter-quick-btn" data-filter-diet="veg">
                        Browse Veg Menu <i class="bi bi-arrow-right ms-1"></i>
                      </button>
                      <span class="coupon-tag bg-dark bg-opacity-50 text-white border border-light border-opacity-25 rounded-pill px-3 py-2 small">
                        Code: <strong>GREENLIFE</strong>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Controls -->
        <button class="carousel-control-prev" type="button" data-bs-target="#offersCarousel" data-bs-slide="prev">
          <span class="carousel-control-prev-icon p-3 bg-dark bg-opacity-50 rounded-circle" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#offersCarousel" data-bs-slide="next">
          <span class="carousel-control-next-icon p-3 bg-dark bg-opacity-50 rounded-circle" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  </section>

  <!-- ================= VALUE PROPOSITION / FEATURES ================= -->
  <section class="py-4 bg-white border-bottom">
    <div class="container">
      <div class="row g-4 text-center">
        <div class="col-6 col-md-3">
          <div class="feature-item p-3">
            <div class="feature-icon text-primary mb-2 fs-2"><i class="bi bi-speedometer2"></i></div>
            <h6 class="fw-bold mb-1">Superfast Delivery</h6>
            <p class="text-muted small mb-0">Under 30 minutes to your door</p>
          </div>
        </div>
        <div class="col-6 col-md-3">
          <div class="feature-item p-3">
            <div class="feature-icon text-success mb-2 fs-2"><i class="bi bi-shield-check"></i></div>
            <h6 class="fw-bold mb-1">100% Hygienic Food</h6>
            <p class="text-muted small mb-0">Certified safety standards</p>
          </div>
        </div>
        <div class="col-6 col-md-3">
          <div class="feature-item p-3">
            <div class="feature-icon text-warning mb-2 fs-2"><i class="bi bi-award"></i></div>
            <h6 class="fw-bold mb-1">Top-Rated Chefs</h6>
            <p class="text-muted small mb-0">50+ Partner kitchens</p>
          </div>
        </div>
        <div class="col-6 col-md-3">
          <div class="feature-item p-3">
            <div class="feature-icon text-danger mb-2 fs-2"><i class="bi bi-geo-alt"></i></div>
            <h6 class="fw-bold mb-1">Live Order Tracking</h6>
            <p class="text-muted small mb-0">Real-time GPS updates</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ================= FEATURED RESTAURANTS ================= -->
  <section id="restaurants" class="py-5 bg-light">
    <div class="container">
      <div class="d-flex justify-content-between align-items-end mb-4 flex-wrap gap-2">
        <div>
          <span class="text-primary fw-bold text-uppercase small tracking-wide">Handpicked Partners</span>
          <h2 class="fw-extrabold mb-0">Popular Restaurants Near You</h2>
        </div>
        <p class="text-muted mb-0 small">Explore cuisines from authentic kitchen specialists</p>
      </div>

      <div class="row g-4" id="restaurantsContainer">
        <!-- Rendered dynamically by script.js -->
      </div>
    </div>
  </section>

  <!-- ================= MENU SECTION WITH DYNAMIC FILTERS ================= -->
  <section id="menu" class="py-5 bg-white">
    <div class="container">
      <!-- Section Header -->
      <div class="text-center max-w-700 mx-auto mb-4">
        <span class="text-primary fw-bold text-uppercase small tracking-wide">Our Delicious Menu</span>
        <h2 class="fw-extrabold">Explore & Order Your Favorite Food</h2>
        <p class="text-muted">Filtered freshly to your taste. Veg, non-veg, budget-friendly, and all global cuisines.</p>
      </div>

      <!-- FILTER CONTROLS BAR -->
      <div class="filter-card p-3 p-md-4 rounded-4 shadow-sm mb-4 bg-light border">
        <div class="row g-3 align-items-center">
          
          <!-- Dietary Type Tabs (All / Veg / Non-Veg) -->
          <div class="col-12 col-md-6 col-lg-4">
            <label class="form-label small fw-bold text-muted mb-1">Dietary Preference:</label>
            <div class="btn-group w-100" role="group" aria-label="Dietary filter">
              <input type="radio" class="btn-check" name="dietRadio" id="dietAll" value="all" checked autocomplete="off">
              <label class="btn btn-outline-primary fw-semibold btn-sm" for="dietAll">All Dishes</label>

              <input type="radio" class="btn-check" name="dietRadio" id="dietVeg" value="veg" autocomplete="off">
              <label class="btn btn-outline-success fw-semibold btn-sm" for="dietVeg">
                <i class="bi bi-circle-fill text-success small me-1"></i>Pure Veg
              </label>

              <input type="radio" class="btn-check" name="dietRadio" id="dietNonVeg" value="non-veg" autocomplete="off">
              <label class="btn btn-outline-danger fw-semibold btn-sm" for="dietNonVeg">
                <i class="bi bi-circle-fill text-danger small me-1"></i>Non-Veg
              </label>
            </div>
          </div>

          <!-- Cuisine Dropdown -->
          <div class="col-6 col-md-3 col-lg-3">
            <label for="cuisineSelect" class="form-label small fw-bold text-muted mb-1">Cuisine:</label>
            <select id="cuisineSelect" class="form-select form-select-sm fw-semibold">
              <option value="all" selected>All Cuisines</option>
              <option value="Italian">Italian ðŸ•</option>
              <option value="Indian">Indian ðŸ›</option>
              <option value="American">American ðŸ”</option>
              <option value="Japanese">Japanese ðŸ£</option>
              <option value="Mexican">Mexican ðŸŒ®</option>
              <option value="Healthy">Healthy Bowls ðŸ¥—</option>
            </select>
          </div>

          <!-- Max Price Slider -->
          <div class="col-6 col-md-3 col-lg-3">
            <div class="d-flex justify-content-between align-items-center mb-1">
              <label for="priceRange" class="form-label small fw-bold text-muted mb-0">Max Price:</label>
              <span id="priceRangeValue" class="badge bg-primary rounded-pill">$35</span>
            </div>
            <input type="range" class="form-range" min="5" max="35" step="1" value="35" id="priceRange">
          </div>

          <!-- Sort Dropdown -->
          <div class="col-12 col-md-12 col-lg-2">
            <label for="sortSelect" class="form-label small fw-bold text-muted mb-1">Sort By:</label>
            <select id="sortSelect" class="form-select form-select-sm">
              <option value="popular" selected>Popularity</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>

        </div>

        <!-- Filter tags summary & Clear button -->
        <div class="d-flex justify-content-between align-items-center mt-3 pt-2 border-top flex-wrap gap-2">
          <div class="small text-muted" id="resultsCount">
            Showing all items
          </div>
          <button id="resetFiltersBtn" class="btn btn-sm btn-link text-decoration-none text-danger p-0">
            <i class="bi bi-arrow-counterclockwise me-1"></i>Reset all filters
          </button>
        </div>
      </div>

      <!-- FOOD ITEMS GRID -->
      <div class="row g-4" id="foodItemsContainer">
        <!-- Rendered dynamically by script.js -->
      </div>

      <!-- No items found state -->
      <div id="noResultsState" class="text-center py-5 d-none">
        <div class="display-1 text-muted"><i class="bi bi-search"></i></div>
        <h4 class="fw-bold mt-3">No matching dishes found</h4>
        <p class="text-muted">Try adjusting your filters, selecting a different cuisine, or raising the price range.</p>
        <button class="btn btn-primary rounded-pill px-4" onclick="document.getElementById('resetFiltersBtn').click()">Reset Filters</button>
      </div>
    </div>
  </section>

  <!-- ================= TESTIMONIALS / REVIEWS ================= -->
  <section class="py-5 bg-light border-top">
    <div class="container">
      <div class="text-center mb-5">
        <span class="text-primary fw-bold text-uppercase small tracking-wide">Testimonials</span>
        <h2 class="fw-extrabold">Loved by 10,000+ Foodies</h2>
      </div>
      <div class="row g-4">
        <div class="col-12 col-md-4">
          <div class="card h-100 border-0 shadow-sm rounded-4 p-4">
            <div class="text-warning mb-3">
              <i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i>
            </div>
            <p class="card-text text-secondary mb-3">"The food arrived sizzling hot in under 25 minutes! The Truffle Burger and Biryani are absolutely world class. Highly recommended!"</p>
            <div class="d-flex align-items-center gap-3 mt-auto">
              <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" alt="Sarah J." class="rounded-circle" width="45" height="45" style="object-fit: cover;">
              <div>
                <h6 class="fw-bold mb-0">Sarah Jenkins</h6>
                <small class="text-muted">Verified Foodie</small>
              </div>
            </div>
          </div>
        </div>
        <div class="col-12 col-md-4">
          <div class="card h-100 border-0 shadow-sm rounded-4 p-4">
            <div class="text-warning mb-3">
              <i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i>
            </div>
            <p class="card-text text-secondary mb-3">"Clean interface, quick cart updates, and the veg filter helps me find healthy options instantly without reading every single ingredient."</p>
            <div class="d-flex align-items-center gap-3 mt-auto">
              <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80" alt="Michael R." class="rounded-circle" width="45" height="45" style="object-fit: cover;">
              <div>
                <h6 class="fw-bold mb-0">Michael Ray</h6>
                <small class="text-muted">Fitness Coach</small>
              </div>
            </div>
          </div>
        </div>
        <div class="col-12 col-md-4">
          <div class="card h-100 border-0 shadow-sm rounded-4 p-4">
            <div class="text-warning mb-3">
              <i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-half"></i>
            </div>
            <p class="card-text text-secondary mb-3">"The coupon deals saved me $15 on our family dinner! Packaging was completely spill-proof and eco-friendly. Five stars from me."</p>
            <div class="d-flex align-items-center gap-3 mt-auto">
              <img src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80" alt="Elena Vasquez" class="rounded-circle" width="45" height="45" style="object-fit: cover;">
              <div>
                <h6 class="fw-bold mb-0">Elena Vasquez</h6>
                <small class="text-muted">Software Engineer</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ================= CONTACT SECTION ================= -->
  <section id="contact" class="py-5 bg-white">
    <div class="container">
      <div class="row g-4 align-items-center">
        <!-- Contact Info Cards -->
        <div class="col-lg-5">
          <span class="text-primary fw-bold text-uppercase small tracking-wide">Get in Touch</span>
          <h2 class="fw-extrabold mb-3">We'd Love to Hear From You</h2>
          <p class="text-muted mb-4">Have questions about an order, restaurant partnership, or dietary recommendations? Our customer delight team is available 24/7.</p>

          <div class="d-flex flex-column gap-3">
            <div class="d-flex align-items-center gap-3 p-3 bg-light rounded-4">
              <div class="bg-primary text-white rounded-circle p-3 d-flex align-items-center justify-content-center" style="width: 50px; height: 50px;">
                <i class="bi bi-geo-alt fs-5"></i>
              </div>
              <div>
                <h6 class="fw-bold mb-0">Central Headquarters</h6>
                <small class="text-muted">452 Tech Gourmet Plaza, Silicon Bay, CA</small>
              </div>
            </div>

            <div class="d-flex align-items-center gap-3 p-3 bg-light rounded-4">
              <div class="bg-success text-white rounded-circle p-3 d-flex align-items-center justify-content-center" style="width: 50px; height: 50px;">
                <i class="bi bi-telephone fs-5"></i>
              </div>
              <div>
                <h6 class="fw-bold mb-0">Direct Helpline</h6>
                <small class="text-muted">+1 (800) 555-BITE (2483)</small>
              </div>
            </div>

            <div class="d-flex align-items-center gap-3 p-3 bg-light rounded-4">
              <div class="bg-warning text-dark rounded-circle p-3 d-flex align-items-center justify-content-center" style="width: 50px; height: 50px;">
                <i class="bi bi-envelope fs-5"></i>
              </div>
              <div>
                <h6 class="fw-bold mb-0">Email Support</h6>
                <small class="text-muted">support@bitedash.delivery</small>
              </div>
            </div>
          </div>
        </div>

        <!-- Contact Form with Bootstrap Validation -->
        <div class="col-lg-7">
          <div class="card border-0 shadow-lg rounded-4 p-4 p-md-5">
            <h4 class="fw-bold mb-1">Send us a Message</h4>
            <p class="text-muted small mb-4">Fill out the form below and we'll reply within 30 minutes.</p>

            <form id="contactForm" class="needs-validation" novalidate>
              <div class="row g-3">
                <div class="col-md-6">
                  <label for="contactName" class="form-label fw-semibold small">Your Name <span class="text-danger">*</span></label>
                  <input type="text" class="form-control" id="contactName" placeholder="John Doe" required>
                  <div class="invalid-feedback">Please enter your name.</div>
                </div>

                <div class="col-md-6">
                  <label for="contactEmail" class="form-label fw-semibold small">Email Address <span class="text-danger">*</span></label>
                  <input type="email" class="form-control" id="contactEmail" placeholder="name@example.com" required>
                  <div class="invalid-feedback">Please enter a valid email address.</div>
                </div>

                <div class="col-md-6">
                  <label for="contactPhone" class="form-label fw-semibold small">Phone Number</label>
                  <input type="tel" class="form-control" id="contactPhone" placeholder="(555) 000-0000">
                </div>

                <div class="col-md-6">
                  <label for="contactSubject" class="form-label fw-semibold small">Inquiry Type <span class="text-danger">*</span></label>
                  <select class="form-select" id="contactSubject" required>
                    <option value="" disabled selected>Choose a topic...</option>
                    <option value="order">Order Tracking & Issues</option>
                    <option value="restaurant">Partner as Restaurant</option>
                    <option value="feedback">General Feedback & Praise</option>
                    <option value="rider">Become a Delivery Hero</option>
                  </select>
                  <div class="invalid-feedback">Please select an inquiry topic.</div>
                </div>

                <div class="col-12">
                  <label for="contactMessage" class="form-label fw-semibold small">Message <span class="text-danger">*</span></label>
                  <textarea class="form-control" id="contactMessage" rows="4" placeholder="How can we help you today?" required></textarea>
                  <div class="invalid-feedback">Please enter your message (at least 10 characters).</div>
                </div>

                <div class="col-12">
                  <div class="form-check">
                    <input class="form-check-input" type="checkbox" id="contactConsent" required>
                    <label class="form-check-label small text-muted" for="contactConsent">
                      I agree to receive order notifications and status updates via email/SMS.
                    </label>
                    <div class="invalid-feedback">You must check this box before submitting.</div>
                  </div>
                </div>

                <div class="col-12">
                  <button class="btn btn-primary btn-lg w-100 rounded-pill fw-bold" type="submit">
                    <i class="bi bi-send me-2"></i>Send Message
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ================= FOOTER ================= -->
  <footer class="bg-dark text-white pt-5 pb-4">
    <div class="container">
      <div class="row g-4 pb-4 border-bottom border-secondary">
        <div class="col-12 col-md-4">
          <div class="d-flex align-items-center gap-2 mb-3">
            <span class="brand-icon bg-primary text-white d-flex align-items-center justify-content-center rounded-circle" style="width: 36px; height: 36px;">
              <i class="bi bi-fire"></i>
            </span>
            <span class="fs-4 fw-bold">Bite<span class="text-warning">Dash</span></span>
          </div>
          <p class="text-secondary small pe-md-4">
            Delivering culinary delight from top restaurants right to your doorstep. Fresh, hygienic, and fast guaranteed every single order.
          </p>
          <div class="d-flex gap-3 text-secondary fs-5">
            <a href="#" class="text-secondary hover-primary"><i class="bi bi-facebook"></i></a>
            <a href="#" class="text-secondary hover-primary"><i class="bi bi-twitter-x"></i></a>
            <a href="#" class="text-secondary hover-primary"><i class="bi bi-instagram"></i></a>
            <a href="#" class="text-secondary hover-primary"><i class="bi bi-youtube"></i></a>
          </div>
        </div>

        <div class="col-6 col-md-2">
          <h6 class="fw-bold mb-3 text-uppercase small text-light">Company</h6>
          <ul class="list-unstyled small text-secondary d-flex flex-column gap-2">
            <li><a href="#home" class="text-secondary text-decoration-none hover-white">About Us</a></li>
            <li><a href="#restaurants" class="text-secondary text-decoration-none hover-white">Our Kitchens</a></li>
            <li><a href="#" class="text-secondary text-decoration-none hover-white">Careers</a></li>
            <li><a href="#" class="text-secondary text-decoration-none hover-white">Press & Media</a></li>
          </ul>
        </div>

        <div class="col-6 col-md-2">
          <h6 class="fw-bold mb-3 text-uppercase small text-light">Support</h6>
          <ul class="list-unstyled small text-secondary d-flex flex-column gap-2">
            <li><a href="#contact" class="text-secondary text-decoration-none hover-white">Help Center</a></li>
            <li><a href="#contact" class="text-secondary text-decoration-none hover-white">Refund Policy</a></li>
            <li><a href="#" class="text-secondary text-decoration-none hover-white">Terms of Service</a></li>
            <li><a href="#" class="text-secondary text-decoration-none hover-white">Privacy Policy</a></li>
          </ul>
        </div>

        <div class="col-12 col-md-4">
          <h6 class="fw-bold mb-3 text-uppercase small text-light">Stay Updated</h6>
          <p class="text-secondary small">Subscribe to our newsletter for secret coupons and chef specials.</p>
          <form id="newsletterForm" class="d-flex gap-2">
            <input type="email" class="form-control form-control-sm rounded-pill" placeholder="Enter your email" required>
            <button class="btn btn-warning btn-sm rounded-pill px-3 fw-bold text-dark" type="submit">Join</button>
          </form>
        </div>
      </div>

      <div class="d-flex justify-content-between align-items-center pt-3 flex-wrap gap-2 text-secondary small">
        <span>&copy; 2026 BiteDash Technologies Inc. All rights reserved.</span>
        <span>Crafted with <i class="bi bi-heart-fill text-danger"></i> using Bootstrap 5 & JavaScript</span>
      </div>
    </div>
  </footer>

  <!-- ================= FOOD ITEM DETAILS MODAL (Bootstrap Component) ================= -->
  <div class="modal fade" id="itemDetailsModal" tabindex="-1" aria-labelledby="itemDetailsModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg">
      <div class="modal-content border-0 rounded-4 overflow-hidden shadow-lg">
        <div class="modal-header border-0 pb-0 position-relative">
          <button type="button" class="btn-close position-absolute top-0 end-0 m-3 bg-white rounded-circle p-2 shadow-sm" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body p-0" id="itemDetailsModalBody">
          <!-- Dynamic contents injected by JavaScript -->
        </div>
      </div>
    </div>
  </div>

  <!-- ================= DYNAMIC CART OFFCANVAS (Bootstrap Component) ================= -->
  <div class="offcanvas offcanvas-end rounded-start-4 shadow-lg border-0" tabindex="-1" id="cartOffcanvas" aria-labelledby="cartOffcanvasLabel" style="width: 420px; max-width: 90vw;">
    <div class="offcanvas-header bg-light border-bottom">
      <div class="d-flex align-items-center gap-2">
        <i class="bi bi-basket2-fill text-primary fs-4"></i>
        <h5 class="offcanvas-title fw-bold" id="cartOffcanvasLabel">Your Order Cart</h5>
        <span class="badge bg-primary rounded-pill cart-badge-count">0</span>
      </div>
      <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    </div>

    <div class="offcanvas-body d-flex flex-column p-3">
      <!-- Cart items container -->
      <div id="cartItemsList" class="flex-grow-1 overflow-auto pe-1">
        <!-- Rendered by script.js -->
      </div>

      <!-- Empty cart alert -->
      <div id="emptyCartView" class="text-center my-auto py-5 d-none">
        <div class="text-muted display-3 mb-3"><i class="bi bi-cart-x"></i></div>
        <h5 class="fw-bold">Your cart is empty!</h5>
        <p class="text-muted small">Explore our delicious menu items and add your favorites to checkout.</p>
        <button class="btn btn-outline-primary btn-sm rounded-pill px-4" data-bs-dismiss="offcanvas" onclick="location.href='#menu'">
          Browse Menu
        </button>
      </div>

      <!-- Cart Bottom Calculations & Actions -->
      <div id="cartSummarySection" class="border-top pt-3 mt-auto bg-white">
        <!-- Promo Code Input -->
        <div class="input-group input-group-sm mb-3">
          <input type="text" id="promoInput" class="form-control" placeholder="Promo code (e.g. FIRST50)">
          <button class="btn btn-outline-secondary" type="button" id="applyPromoBtn">Apply</button>
        </div>
        <div id="promoFeedback" class="small mb-2"></div>

        <!-- Bill breakdown -->
        <div class="bill-breakdown small text-secondary mb-3">
          <div class="d-flex justify-content-between mb-1">
            <span>Item Subtotal:</span>
            <span class="fw-semibold text-dark" id="cartSubtotal">$0.00</span>
          </div>
          <div class="d-flex justify-content-between mb-1 text-success d-none" id="discountRow">
            <span>Coupon Discount:</span>
            <span class="fw-semibold" id="cartDiscount">-$0.00</span>
          </div>
          <div class="d-flex justify-content-between mb-1">
            <span>Delivery Fee:</span>
            <span class="fw-semibold text-dark" id="cartDeliveryFee">$2.99</span>
          </div>
          <div class="d-flex justify-content-between mb-2">
            <span>Taxes & Service (5%):</span>
            <span class="fw-semibold text-dark" id="cartTax">$0.00</span>
          </div>
          <div class="d-flex justify-content-between border-top pt-2 fs-6 fw-bold text-dark">
            <span>Grand Total:</span>
            <span class="text-primary fs-5" id="cartGrandTotal">$0.00</span>
          </div>
        </div>

        <div class="d-grid gap-2">
          <button id="checkoutBtn" class="btn btn-primary py-2 rounded-pill fw-bold shadow-sm" data-bs-toggle="modal" data-bs-target="#checkoutModal">
            Proceed to Checkout <i class="bi bi-arrow-right ms-1"></i>
          </button>
          <button id="clearCartBtn" class="btn btn-outline-danger btn-sm rounded-pill">
            <i class="bi bi-trash me-1"></i>Clear Cart
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- ================= CHECKOUT MODAL ================= -->
  <div class="modal fade" id="checkoutModal" tabindex="-1" aria-labelledby="checkoutModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content rounded-4 border-0 shadow-lg">
        <div class="modal-header bg-primary text-white">
          <h5 class="modal-title fw-bold" id="checkoutModalLabel"><i class="bi bi-bag-check me-2"></i>Confirm Your Order</h5>
          <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body p-4">
          <form id="checkoutForm">
            <h6 class="fw-bold mb-3">Delivery Information</h6>
            <div class="mb-3">
              <label class="form-label small fw-semibold">Delivery Address <span class="text-danger">*</span></label>
              <textarea class="form-control form-control-sm" id="deliveryAddress" rows="2" placeholder="Street, Flat/Apartment number, Landmark" required></textarea>
            </div>
            <div class="row g-2 mb-3">
              <div class="col-6">
                <label class="form-label small fw-semibold">City</label>
                <input type="text" class="form-control form-control-sm" value="Metro City" required>
              </div>
              <div class="col-6">
                <label class="form-label small fw-semibold">Zip / Postal</label>
                <input type="text" class="form-control form-control-sm" placeholder="90001" required>
              </div>
            </div>

            <h6 class="fw-bold mb-2">Payment Method</h6>
            <div class="d-flex flex-column gap-2 mb-4">
              <div class="form-check p-2 border rounded-3">
                <input class="form-check-input ms-1" type="radio" name="paymentOption" id="payOnline" checked>
                <label class="form-check-label ms-2 small fw-semibold d-flex justify-content-between align-items-center" for="payOnline">
                  <span><i class="bi bi-credit-card me-2 text-primary"></i>Razorpay Test Checkout</span>
                  <span class="badge bg-warning-subtle text-warning-emphasis">Demo</span>
                </label>
              </div>
              <div class="form-check p-2 border rounded-3">
                <input class="form-check-input ms-1" type="radio" name="paymentOption" id="payCOD">
                <label class="form-check-label ms-2 small fw-semibold d-flex justify-content-between align-items-center" for="payCOD">
                  <span><i class="bi bi-cash-coin me-2 text-success"></i>Cash on Delivery (COD)</span>
                </label>
              </div>
              <div class="form-check p-2 border border-warning-subtle rounded-3 bg-warning-subtle">
                <input class="form-check-input ms-1" type="radio" name="paymentOption" id="payDemo">
                <label class="form-check-label ms-2 small fw-semibold d-flex justify-content-between align-items-center" for="payDemo">
                  <span><i class="bi bi-play-circle me-2 text-warning-emphasis"></i>Demo Payment</span>
                  <span class="badge bg-warning text-dark">No keys</span>
                </label>
              </div>
            </div>

            <div class="bg-light p-3 rounded-3 mb-3">
              <div class="d-flex justify-content-between small fw-bold">
                <span>Amount Payable:</span>
                <span class="text-primary fs-6" id="modalFinalPayable">$0.00</span>
              </div>
            </div>

            <button type="submit" class="btn btn-success w-100 py-2 rounded-pill fw-bold">
              <i class="bi bi-lock-fill me-1"></i>Pay & Place Order
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>

  <!-- ================= ORDER CONFIRMATION ================= -->
  <div class="modal fade" id="orderConfirmationModal" tabindex="-1" aria-labelledby="orderConfirmationTitle" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg">
      <div class="modal-content border-0 rounded-4 shadow-lg overflow-hidden">
        <div class="confirmation-header text-white text-center p-4 p-md-5">
          <div class="confirmation-check mx-auto mb-3"><i class="bi bi-check-lg"></i></div>
          <span class="text-uppercase small fw-bold opacity-75">Order confirmed</span>
          <h2 id="orderConfirmationTitle" class="fw-extrabold mb-2">Your food is on its way!</h2>
          <p class="mb-0 opacity-90">Thanks for ordering with BiteDash. We have sent the details to your account.</p>
        </div>
        <div class="modal-body p-4 p-md-5">
          <div class="row g-4">
            <div class="col-md-7">
              <div class="d-flex justify-content-between align-items-center mb-3">
                <h5 class="fw-bold mb-0">Delivery progress</h5>
                <span class="badge rounded-pill bg-success-subtle text-success">Order placed</span>
              </div>
              <div class="order-timeline">
                <div class="timeline-step active"><span class="timeline-icon"><i class="bi bi-check-lg"></i></span><div><strong>Order confirmed</strong><small>Restaurant received your order</small></div></div>
                <div class="timeline-step"><span class="timeline-icon"><i class="bi bi-fire"></i></span><div><strong>Being prepared</strong><small>Your meal is being freshly prepared</small></div></div>
                <div class="timeline-step"><span class="timeline-icon"><i class="bi bi-bicycle"></i></span><div><strong>Out for delivery</strong><small>Your rider will bring it to your door</small></div></div>
              </div>
              <div class="bg-light rounded-3 p-3 mt-4">
                <div class="d-flex gap-3"><i class="bi bi-geo-alt-fill text-primary fs-5"></i><div><small class="text-muted d-block">Delivering to</small><strong id="confirmationAddress"></strong><span id="confirmationCity" class="text-muted d-block small"></span></div></div>
              </div>
            </div>
            <div class="col-md-5">
              <div class="confirmation-summary rounded-4 p-3">
                <div class="d-flex justify-content-between mb-3"><span class="text-muted">Order number</span><strong id="confirmationOrderId"></strong></div>
                <div class="d-flex justify-content-between mb-3"><span class="text-muted">Estimated arrival</span><strong class="text-success">25â€“30 mins</strong></div>
                <div class="d-flex justify-content-between mb-3"><span class="text-muted">Payment</span><strong id="confirmationPayment"></strong></div>
                <div class="border-top pt-3 d-flex justify-content-between fs-5"><strong>Total paid</strong><strong class="text-primary" id="confirmationTotal"></strong></div>
              </div>
              <div class="d-grid gap-2 mt-3">
                <button type="button" class="btn btn-primary rounded-pill fw-bold" data-bs-dismiss="modal" onclick="document.getElementById('menu').scrollIntoView({ behavior: 'smooth' });">Order more food</button>
                <button type="button" class="btn btn-outline-secondary rounded-pill" data-bs-dismiss="modal" id="viewOrdersBtn"><i class="bi bi-person me-1"></i>View my orders</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- ================= TOAST NOTIFICATION ================= -->
  <div class="toast-container position-fixed bottom-0 end-0 p-3" style="z-index: 1090;">
    <div id="liveToast" class="toast align-items-center text-white bg-dark border-0 shadow-lg rounded-4" role="alert" aria-live="assertive" aria-atomic="true">
      <div class="d-flex">
        <div class="toast-body d-flex align-items-center gap-2">
          <i id="toastIcon" class="bi bi-check-circle-fill text-success fs-5"></i>
          <span id="toastMessage">Action completed successfully!</span>
        </div>
        <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
      </div>
    </div>
  </div>

  <!-- Bootstrap 5.3.3 JS Bundle -->
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
  <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
  <!-- Custom JS -->
  <script src="js/script.js"></script>
</body>
</html>
```

## Source: css/style.css

`$lang
/* ===================================================
   BiteDash Food Delivery System - Custom Styles
   =================================================== */

:root {
  --primary-color: #ff4757;
  --primary-hover: #e84118;
  --secondary-color: #2ed573;
  --dark-bg: #1e272e;
  --text-dark: #2f3542;
  --font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  --card-radius: 16px;
  --transition-smooth: all 0.25s cubic-bezier(0.165, 0.84, 0.44, 1);
}

body {
  font-family: var(--font-family);
  color: var(--text-dark);
  background-color: #fbfbfc;
  scroll-behavior: smooth;
  overflow-x: hidden;
}

html {
  scroll-behavior: smooth;
  scroll-padding-top: 82px;
}

.nav-anchor {
  height: 0;
  scroll-margin-top: 82px;
}

section[id] {
  scroll-margin-top: 82px;
}

/* ================= TOP PROMO BANNER ================= */
.top-banner {
  background: linear-gradient(90deg, #ff4757, #ff6b81, #ffa502);
  font-weight: 500;
  letter-spacing: 0.2px;
}

/* ================= NAVBAR ================= */
.brand-icon {
  width: 38px;
  height: 38px;
  background: linear-gradient(135deg, #ff4757, #ffa502);
  color: white;
  border-radius: 10px;
  font-size: 1.25rem;
  box-shadow: 0 4px 10px rgba(255, 71, 87, 0.3);
}

.brand-text {
  font-size: 1.45rem;
  font-weight: 800;
  letter-spacing: -0.5px;
}

.navbar .nav-link {
  font-weight: 600;
  color: #57606f;
  padding: 0.5rem 0.85rem !important;
  border-radius: 8px;
  transition: var(--transition-smooth);
}

.navbar .nav-link:hover,
.navbar .nav-link.active {
  color: #ff4757 !important;
  background-color: #fff0f1;
}

.account-hero {
  background: linear-gradient(135deg, #fff0f1, #fff8e6);
}

.account-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  color: #fff;
  font-weight: 800;
  font-size: 1.2rem;
  background: linear-gradient(135deg, var(--primary-color), #ffa502);
}

.auth-tabs .nav-link {
  color: #57606f;
  font-weight: 700;
}

.auth-tabs .nav-link.active {
  background: #fff;
  color: var(--primary-color);
  box-shadow: 0 2px 8px rgba(0,0,0,.06);
}

.order-history-item {
  border: 1px solid #edf0f5;
  border-radius: 12px;
  padding: .7rem .8rem;
}

.confirmation-header {
  background: linear-gradient(135deg, #1e272e, #37474f);
}

.confirmation-check {
  width: 68px;
  height: 68px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  background: #2ed573;
  color: #fff;
  font-size: 2rem;
  box-shadow: 0 0 0 8px rgba(46, 213, 115, .18);
}

.order-timeline {
  position: relative;
}

.timeline-step {
  display: flex;
  align-items: flex-start;
  gap: .85rem;
  min-height: 67px;
  position: relative;
}

.timeline-step:not(:last-child)::after {
  content: "";
  position: absolute;
  left: 17px;
  top: 36px;
  height: 32px;
  border-left: 2px dashed #dfe4ea;
}

.timeline-icon {
  width: 36px;
  height: 36px;
  display: grid;
  place-items: center;
  flex: 0 0 36px;
  border-radius: 50%;
  background: #f1f2f6;
  color: #a4b0be;
}

.timeline-step.active .timeline-icon {
  background: #e4f9ec;
  color: #20bf6b;
}

.timeline-step strong,
.timeline-step small {
  display: block;
}

.timeline-step small {
  color: #83909d;
  margin-top: .2rem;
}

.confirmation-summary {
  background: #f8f9fa;
  border: 1px solid #edf0f5;
}

.admin-header {
  background: linear-gradient(135deg, #1e272e, #485460);
}

.admin-stat {
  border: 1px solid #edf0f5;
  border-radius: 14px;
  padding: .8rem 1rem;
  background: #f8f9fa;
}

.admin-stat small,
.admin-stat strong {
  display: block;
}

.admin-stat small {
  color: #83909d;
}

.admin-stat strong {
  font-size: 1.4rem;
  margin-top: .2rem;
}

.status-select {
  min-width: 150px;
}

.nav-search-box input {
  background-color: #f1f2f6;
  border: 1px solid #dfe4ea;
  padding-left: 2.2rem !important;
  transition: var(--transition-smooth);
}

.nav-search-box input:focus {
  background-color: #ffffff;
  border-color: #ff4757;
  box-shadow: 0 0 0 0.2rem rgba(255, 71, 87, 0.15);
}

/* ================= HERO CAROUSEL ================= */
.hero-slide {
  height: 440px;
  background-size: cover;
  background-position: center;
  position: relative;
}

.hero-slide.slide-1 {
  background-image: url('https://images.unsplash.com/photo-1513104890138-7c749659a591?w=1600&auto=format&fit=crop&q=80');
}

.hero-slide.slide-2 {
  background-image: url('https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=1600&auto=format&fit=crop&q=80');
}

.hero-slide.slide-3 {
  background-image: url('https://images.unsplash.com/photo-1540420773420-3366772f4999?w=1600&auto=format&fit=crop&q=80');
}

.hero-overlay {
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, rgba(17, 24, 39, 0.88) 0%, rgba(17, 24, 39, 0.65) 55%, rgba(17, 24, 39, 0.25) 100%);
}

.fw-extrabold {
  font-weight: 800;
}

.tracking-wide {
  letter-spacing: 1px;
}

/* ================= FEATURE ICONS ================= */
.feature-item {
  border-radius: 14px;
  background: #ffffff;
  transition: var(--transition-smooth);
}

.feature-item:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
}

/* ================= RESTAURANT CARDS ================= */
.restaurant-card {
  border-radius: var(--card-radius);
  border: 1px solid #edf0f5;
  transition: var(--transition-smooth);
  overflow: hidden;
  background: #fff;
}

.restaurant-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 16px 30px rgba(0, 0, 0, 0.08);
}

.restaurant-img-wrapper {
  position: relative;
  height: 170px;
  overflow: hidden;
}

.restaurant-img-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}

.restaurant-card:hover .restaurant-img-wrapper img {
  transform: scale(1.05);
}

.time-badge {
  position: absolute;
  bottom: 12px;
  right: 12px;
  background: rgba(255, 255, 255, 0.95);
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 700;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

/* ================= FOOD MENU CARDS ================= */
.food-card {
  border-radius: var(--card-radius);
  border: 1px solid #f0f2f5;
  background: #ffffff;
  transition: var(--transition-smooth);
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.food-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.07);
}

.food-img-wrapper {
  position: relative;
  height: 190px;
  overflow: hidden;
  background-color: #f1f2f6;
}

.food-img-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}

.food-card:hover .food-img-wrapper img {
  transform: scale(1.06);
}

/* Veg / Non-veg icons */
.diet-badge {
  width: 20px;
  height: 20px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  font-size: 8px;
}

.diet-badge.veg {
  border: 2px solid #2ed573;
}

.diet-badge.veg::after {
  content: "";
  width: 8px;
  height: 8px;
  background-color: #2ed573;
  border-radius: 50%;
}

.diet-badge.non-veg {
  border: 2px solid #ff4757;
}

.diet-badge.non-veg::after {
  content: "";
  width: 8px;
  height: 8px;
  background-color: #ff4757;
  border-radius: 50%;
}

/* Cuisine tag on image */
.cuisine-tag {
  position: absolute;
  top: 12px;
  left: 12px;
  background: rgba(30, 39, 46, 0.85);
  color: white;
  padding: 3px 10px;
  border-radius: 20px;
  font-size: 0.72rem;
  font-weight: 600;
  backdrop-filter: blur(4px);
}

.rating-tag {
  position: absolute;
  top: 12px;
  right: 12px;
  background: rgba(255, 255, 255, 0.95);
  color: #2f3542;
  padding: 3px 8px;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 700;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

/* Buttons */
.btn-primary {
  background-color: #ff4757;
  border-color: #ff4757;
}

.btn-primary:hover,
.btn-primary:focus {
  background-color: #e84118;
  border-color: #e84118;
}

.btn-outline-primary {
  color: #ff4757;
  border-color: #ff4757;
}

.btn-outline-primary:hover,
.btn-check:checked + .btn-outline-primary {
  background-color: #ff4757;
  border-color: #ff4757;
  color: #fff;
}

/* ================= CART OFFCANVAS STYLING ================= */
.cart-item {
  border-bottom: 1px dashed #e4e7eb;
  padding: 10px 0;
}

.cart-item-img {
  width: 60px;
  height: 60px;
  border-radius: 10px;
  object-fit: cover;
}

.qty-control {
  display: inline-flex;
  align-items: center;
  border: 1px solid #ced6e0;
  border-radius: 20px;
  overflow: hidden;
  background: #f8f9fa;
}

.qty-control button {
  border: none;
  background: transparent;
  width: 28px;
  height: 28px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.2s;
}

.qty-control button:hover {
  background: #dfe4ea;
}

.menu-qty-control {
  border-color: #ff4757;
  background: #fff0f1;
}

.menu-qty-control button {
  color: #ff4757;
  width: 30px;
  height: 30px;
}

.menu-qty-control button:hover {
  background: #ffd9dd;
}

.menu-qty-control .qty-value {
  color: #ff4757;
}

.qty-control .qty-value {
  min-width: 24px;
  text-align: center;
  font-size: 0.85rem;
  font-weight: 700;
}

/* ================= MODAL STYLING ================= */
.modal-body-img {
  width: 100%;
  height: 260px;
  object-fit: cover;
}

.nutrition-pill {
  background: #f1f2f6;
  padding: 6px 12px;
  border-radius: 8px;
  text-align: center;
}

/* ================= FOOTER ================= */
.hover-primary:hover {
  color: #ff4757 !important;
}

.hover-white:hover {
  color: #ffffff !important;
}

/* ================= RESPONSIVE ADJUSTMENTS ================= */
@media (max-width: 768px) {
  .hero-slide {
    height: 380px;
  }
  .hero-slide h1 {
    font-size: 1.85rem;
  }
  .food-img-wrapper {
    height: 160px;
  }
}
```

## Source: js/script.js

`$lang
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
      description: "Slow-braised shredded beef brisket packed in dipped corn tortillas griddled crisp with Oaxaca cheese, served with rich consommÃ© dip.",
      ingredients: ["Braised Beef", "Corn Tortillas", "Oaxaca Cheese", "Cilantro & Onion", "Beef ConsommÃ©"],
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
      description: "Crisp stone-ground corn tortilla chips piled high with warm queso cheese dip, black beans, pico de gallo, pickled jalapeÃ±os, and guacamole.",
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
        ? userOrders.slice(-3).reverse().map(order => `<div class="order-history-item d-flex justify-content-between align-items-center mb-2"><div><strong>#${order.id}</strong><br><span class="text-muted">${order.date} Â· ${order.items} item${order.items === 1 ? '' : 's'}</span></div><span class="fw-bold text-primary">$${order.total}</span></div>`).join('')
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
          <div><strong>${restaurant.name}</strong><small class="text-muted d-block">${restaurant.cuisine} Â· ${restaurant.delivery_time}</small></div>
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
             <button type="button" onclick="updateCartQty(${dish.id}, -1)" aria-label="Decrease ${dish.title} quantity">âˆ’</button>
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
            <button type="button" onclick="updateCartQty(${item.id}, -1)">âˆ’</button>
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
    showToast(`ðŸŽ‰ Order <strong>#${orderId}</strong> placed successfully! ETA: 25 mins.`, 'success');
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
```

