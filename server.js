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
