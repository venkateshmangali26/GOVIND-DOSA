import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { store } from './data/store.js';
import { pool } from './db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const httpServer = http.createServer(app);
const PORT = process.env.PORT || 5000;

// 1. Setup WebSockets for Real-Time KDS & Order Tracker
const allowedOrigins = process.env.CLIENT_URL
  ? [process.env.CLIENT_URL, 'http://localhost:5173']
  : '*';

const io = new Server(httpServer, {
  cors: {
    origin: allowedOrigins,
    methods: ['GET', 'POST', 'PATCH', 'DELETE']
  }
});

io.on('connection', (socket) => {
  console.log('⚡ Real-time client connected to Kitchen KDS / Live Tracker:', socket.id);
  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

app.use(cors({
  origin: process.env.NODE_ENV === 'production' && process.env.CLIENT_URL ? [process.env.CLIENT_URL, 'http://localhost:5173'] : true
}));
app.use(express.json());

const VALID_STATUSES = [
  'received', 'preparing', 'ready', 'served', 'cancelled',
  'Placed', 'Preparing', 'Ready', 'Delivered', 'Cancelled'
];
const BUTTER_PRICES = { Regular: 0, Extra: 20, Bath: 40 };
const EXTRA_PRICES = { Cheese: 35, Podi: 15, ExtraChutney: 20, ExtraMasala: 25 };

// Zero-Trust: Recompute prices on the server so client cannot tamper with amounts
function priceOrderItems(items) {
  return items.map(it => {
    const menuItem = store.getMenuItem(String(it.id));
    if (!menuItem) throw new Error(`Unknown menu item: ${it.id}`);
    const qty = Math.max(1, Math.min(50, parseInt(it.quantity, 10) || 1));
    const c = it.customizations || {};
    const butter = BUTTER_PRICES[c.butter] ?? 0;
    const extras = (c.extraIds || []).reduce((s, id) => s + (EXTRA_PRICES[id] || 0), 0);
    const unitPrice = menuItem.price + butter + extras;
    return { ...it, quantity: qty, price: unitPrice, unitPrice, lineTotal: unitPrice * qty };
  });
}

app.use('/images', express.static(path.join(__dirname, '../public/images')));

app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    brand: 'Govind Dosa Enterprise Suite & CRM',
    database: pool ? 'PostgreSQL (Cloud Active)' : 'In-Memory (store.js)',
    timestamp: new Date().toISOString()
  });
});

// MENU
app.get('/api/menu', async (req, res) => {
  try {
    const { category, search, bestseller } = req.query;

    if (pool) {
      try {
        let query = 'SELECT * FROM menu_items WHERE 1=1';
        const params = [];
        if (category && category !== 'All' && category !== 'ALL') {
          params.push(category);
          query += ` AND (LOWER(category) = LOWER($${params.length}) OR LOWER(category_code) = LOWER($${params.length}))`;
        }
        if (bestseller === 'true') {
          query += ` AND is_bestseller = TRUE`;
        }
        if (search) {
          params.push(`%${search.toLowerCase()}%`);
          query += ` AND (LOWER(name) LIKE $${params.length} OR LOWER(description) LIKE $${params.length})`;
        }
        query += ' ORDER BY is_bestseller DESC, rating DESC, base_price ASC';
        const { rows } = await pool.query(query, params);
        if (rows.length > 0) {
          return res.json({ success: true, count: rows.length, items: rows });
        }
      } catch (dbErr) {
        console.warn('PostgreSQL query fallback to store.js:', dbErr.message);
      }
    }

    let items = store.getMenu();
    if (category && category !== 'All' && category !== 'ALL') {
      const catLower = category.toLowerCase();
      items = items.filter(i => i.category.toLowerCase() === catLower || (i.categoryCode && i.categoryCode.toLowerCase() === catLower));
    }
    if (bestseller === 'true') items = items.filter(i => i.isBestseller);
    if (search) {
      const q = search.toLowerCase();
      items = items.filter(i =>
        (i.name || '').toLowerCase().includes(q) ||
        (i.description || '').toLowerCase().includes(q) ||
        (i.tags && i.tags.some(t => t.toLowerCase().includes(q)))
      );
    }
    items.sort((a, b) => (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0) || (b.rating || 0) - (a.rating || 0) || (a.price || 0) - (b.price || 0));
    res.json({ success: true, count: items.length, items });
  } catch (err) { res.status(500).json({ success: false, error: err.message }); }
});

app.get('/api/menu/:id', (req, res) => {
  const item = store.getMenuItem(req.params.id);
  if (!item) return res.status(404).json({ success: false, error: 'Item not found' });
  res.json({ success: true, item });
});

// ORDERS
app.get('/api/orders', async (req, res) => {
  try {
    const { stage, status, limit } = req.query;

    if (pool) {
      try {
        let query = 'SELECT * FROM orders WHERE 1=1';
        const params = [];
        if (stage && stage !== 'ALL') {
          params.push(stage.toUpperCase());
          query += ` AND UPPER(stage) = $${params.length}`;
        }
        if (status && status !== 'All') {
          params.push(status.toLowerCase());
          query += ` AND LOWER(status) = $${params.length}`;
        }
        query += ' ORDER BY created_at DESC';
        const n = parseInt(limit, 10);
        if (Number.isInteger(n) && n > 0) {
          params.push(n);
          query += ` LIMIT $${params.length}`;
        }
        const { rows } = await pool.query(query, params);
        if (rows.length > 0) {
          return res.json({ success: true, count: rows.length, orders: rows });
        }
      } catch (dbErr) {
        console.warn('PostgreSQL orders fallback to store.js:', dbErr.message);
      }
    }

    let orders = store.getOrders();
    if (stage && stage !== 'ALL') orders = orders.filter(o => o.stage && o.stage.toUpperCase() === stage.toUpperCase());
    if (status && status !== 'All') orders = orders.filter(o => o.status && o.status.toLowerCase() === status.toLowerCase());
    const n = parseInt(limit, 10);
    if (Number.isInteger(n) && n > 0) orders = orders.slice(0, n);
    res.json({ success: true, count: orders.length, orders });
  } catch (err) { res.status(500).json({ success: false, error: err.message }); }
});

app.get('/api/orders/:id', async (req, res) => {
  const orderId = req.params.id;
  if (pool) {
    try {
      const { rows } = await pool.query('SELECT * FROM orders WHERE id = $1', [orderId]);
      if (rows.length > 0) return res.json({ success: true, order: rows[0] });
    } catch (err) {
      console.warn('PostgreSQL single order fetch fallback:', err.message);
    }
  }

  const order = store.getOrder
    ? store.getOrder(orderId)
    : (store.getOrders ? store.getOrders().find(o => String(o.id) === orderId) : null);
  if (!order) return res.status(404).json({ success: false, error: 'Order not found' });
  res.json({ success: true, order });
});

app.post('/api/orders', async (req, res) => {
  try {
    const { items, customerName = 'Walk-in Customer', customerPhone = null, diningMode = 'Dine-In', tableNumber = null, notes = '', couponApplied = null } = req.body;
    if (!Array.isArray(items) || !items.length)
      return res.status(400).json({ success: false, error: 'Order must contain at least one item' });

    let priced;
    try { priced = priceOrderItems(items); }
    catch (e) { return res.status(400).json({ success: false, error: e.message }); }
    const subtotal = priced.reduce((s, i) => s + i.lineTotal, 0);
    const tax = Math.round(subtotal * 0.05);
    const total = subtotal + tax;
    const orderId = `ORD-${Math.floor(1000 + Math.random() * 9000)}`;

    if (pool) {
      const client = await pool.connect();
      try {
        await client.query('BEGIN');
        let customerId = null;
        if (customerPhone) {
          const custRes = await client.query(
            `INSERT INTO customers (phone, name, total_orders, total_spent, last_visit)
             VALUES ($1, $2, 1, $3, CURRENT_TIMESTAMP)
             ON CONFLICT (phone) DO UPDATE
             SET name = EXCLUDED.name,
                 total_orders = customers.total_orders + 1,
                 total_spent = customers.total_spent + $3,
                 last_visit = CURRENT_TIMESTAMP
             RETURNING id`,
            [customerPhone, customerName, total]
          );
          customerId = custRes.rows[0]?.id;
        }

        const insertOrderSql = `
          INSERT INTO orders 
          (id, customer_id, customer_name, customer_phone, dining_mode, table_number, subtotal, tax, total_amount, status, stage, notes, coupon_applied)
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, 'received', 'NEW', $10, $11)
          RETURNING *`;
        const orderRes = await client.query(insertOrderSql, [
          orderId, customerId, customerName, customerPhone, diningMode, tableNumber, subtotal, tax, total, notes, couponApplied
        ]);
        const createdOrder = orderRes.rows[0];

        for (const item of priced) {
          await client.query(
            `INSERT INTO order_items (order_id, menu_item_id, item_name, quantity, butter_level, spice_level, unit_price, line_total)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
            [orderId, item.id, item.name, item.quantity, item.customizations?.butter || 'Regular', item.customizations?.spice || 'Medium', item.unitPrice, item.lineTotal]
          );
        }

        await client.query('COMMIT');

        // INSTANT KITCHEN KDS BROADCAST
        io.emit('orderCreated', createdOrder);
        return res.status(201).json({ success: true, order: createdOrder, message: 'Order sent to Govind ji tawa queue!' });
      } catch (pgErr) {
        await client.query('ROLLBACK');
        console.warn('PostgreSQL order insert rollback, falling back to memory store:', pgErr.message);
      } finally {
        client.release();
      }
    }

    // In-memory fallback
    const { id: _i, status: _s, stage: _g, total: _t, ...safeBody } = req.body;
    const newOrder = store.createOrder({ ...safeBody, items: priced, total });
    io.emit('orderCreated', newOrder);
    res.status(201).json({ success: true, order: newOrder, message: 'Order sent to Govind ji tawa queue!' });
  } catch (err) { res.status(500).json({ success: false, error: err.message }); }
});

// UPGRADED STATUS ENDPOINT (SQL TRANSACTION + INSTANT WEBSOCKET BROADCAST)
app.patch('/api/orders/:id/status', async (req, res) => {
  const { status, stage } = req.body;
  const orderId = req.params.id;

  if (!status && !stage) return res.status(400).json({ success: false, error: 'Status or stage is required' });
  if (status && !VALID_STATUSES.includes(status)) {
    return res.status(400).json({ success: false, error: `Status must be one of: ${VALID_STATUSES.join(', ')}` });
  }

  if (pool) {
    const client = await pool.connect();
    try {
      await client.query('BEGIN');
      const result = await client.query(
        'UPDATE orders SET status = COALESCE($1, status), stage = COALESCE($2, stage), updated_at = CURRENT_TIMESTAMP WHERE id = $3 RETURNING *',
        [status || null, stage || null, orderId]
      );

      if (result.rows.length === 0) throw new Error('Order not found');
      const updatedOrder = result.rows[0];
      await client.query('COMMIT');

      // INSTANT KITCHEN & TRACKER UPDATE: Broadcast to all connected screens
      io.emit('orderStatusUpdated', updatedOrder);
      return res.json({ success: true, order: updatedOrder, message: `Order status changed to ${status || stage}` });
    } catch (err) {
      await client.query('ROLLBACK');
      console.warn('PostgreSQL status update failed, attempting store fallback:', err.message);
    } finally {
      client.release();
    }
  }

  // In-memory store fallback
  try {
    const updated = store.updateOrderStatus(orderId, status);
    if (!updated) return res.status(404).json({ success: false, error: 'Order not found' });
    io.emit('orderStatusUpdated', updated);
    res.json({ success: true, order: updated, message: `Order status changed to ${status}` });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.patch('/api/orders/:id/stage', (req, res) => {
  try {
    const { action, stage } = req.body;
    if (!action) return res.status(400).json({ success: false, error: 'Action is required' });
    const updated = store.updateOrderStage(req.params.id, action, stage);
    if (!updated) return res.status(404).json({ success: false, error: 'Order not found' });
    io.emit('orderStageUpdated', updated);
    res.json({ success: true, order: updated });
  } catch (err) { res.status(500).json({ success: false, error: err.message }); }
});

// CUSTOMERS
app.get('/api/customers', (req, res) => {
  try {
    const { segment, q } = req.query;
    let customers = store.getCustomers ? store.getCustomers(segment, q) : [
      { id: 'cust-1', name: 'Amit Patel', phone: '9811122334', segment: 'VIP', loyaltyPoints: 340, totalOrders: 14, totalSpent: 4200, lastVisit: 'Yesterday', lifetimeSpend: 4200, favoriteDosa: "Govind Ji's Special Butter Burst Dosa" },
      { id: 'cust-2', name: 'Sneha Reddy', phone: '9722233445', segment: 'VIP', loyaltyPoints: 190, totalOrders: 8, totalSpent: 2400, lastVisit: '3 days ago', lifetimeSpend: 2400, favoriteDosa: 'Mysore Karam Roast' }
    ];
    res.json({ success: true, count: customers.length, customers });
  } catch (err) { res.status(500).json({ success: false, error: err.message }); }
});

// RESERVATIONS
app.get('/api/reservations', (req, res) => {
  try {
    const reservations = store.getReservations ? store.getReservations() : [
      { id: 'res-1', guestName: 'Rajesh Sharma', name: 'Rajesh Sharma', phone: '9876543210', guests: 4, partySize: 4, date: '2026-10-15', time: '19:30', timeSlot: '19:30', status: 'Confirmed' },
      { id: 'res-2', guestName: 'Priya Iyer', name: 'Priya Iyer', phone: '9123456789', guests: 2, partySize: 2, date: '2026-10-15', time: '20:15', timeSlot: '20:15', status: 'Pending' }
    ];
    res.json({ success: true, count: reservations.length, reservations });
  } catch (err) { res.status(500).json({ success: false, error: err.message }); }
});

app.post('/api/reservations', (req, res) => {
  try {
    const { guestName, name, phone, guests, partySize, date, time, timeSlot } = req.body;
    const gName = guestName || name;
    const gGuests = guests || partySize;
    const gTime = time || timeSlot;
    if (!gName || !phone || !date || !gTime) {
      return res.status(400).json({ success: false, error: 'Guest name, phone, date, and time are required' });
    }
    const { id: _i, status: _s, ...rest } = req.body;
    const resPayload = {
      ...rest,
      name: gName,
      guestName: gName,
      phone,
      partySize: gGuests || 2,
      guests: gGuests || 2,
      date,
      time: gTime,
      timeSlot: gTime,
      status: 'Confirmed'
    };
    const newRes = store.createReservation ? store.createReservation(resPayload) : { id: `res-${Date.now()}`, ...resPayload };
    res.status(201).json({ success: true, reservation: newRes, message: 'Table reservation booked successfully!' });
  } catch (err) { res.status(500).json({ success: false, error: err.message }); }
});

// COUPONS
app.get('/api/coupons', (req, res) => {
  try {
    const coupons = store.getCoupons ? store.getCoupons() : [];
    res.json({ success: true, count: coupons.length, coupons });
  } catch (err) { res.status(500).json({ success: false, error: err.message }); }
});

app.post('/api/coupons/validate', (req, res) => {
  try {
    const { code, subtotal } = req.body;
    const result = store.validateCoupon
      ? store.validateCoupon(code, Number(subtotal) || 0)
      : { valid: false, error: 'Coupon validation service unavailable' };
    res.json(result);
  } catch (err) { res.status(500).json({ valid: false, error: err.message }); }
});

// DASHBOARD
app.get('/api/dashboard', (req, res) => {
  try {
    const dashboard = store.getDashboardAnalytics ? store.getDashboardAnalytics() : { kpis: {}, topItems: [] };
    res.json(dashboard);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// CRM
app.get('/api/crm/pipeline', (req, res) => {
  try {
    const leads = store.getCrmPipeline();
    res.json({ success: true, count: leads.length, leads });
  } catch (err) { res.status(500).json({ success: false, error: err.message }); }
});

app.post('/api/crm/leads', (req, res) => {
  try {
    const { name, phone } = req.body;
    if (!name || !phone) return res.status(400).json({ success: false, error: 'Name and phone are required' });
    const newLead = store.addLead({
      name, company: req.body.company || 'Individual Diner', phone,
      email: req.body.email || '', stage: req.body.stage || 'Prospect / Inquiry',
      dealValue: Number(req.body.dealValue) || 1500, notes: req.body.notes || 'Direct CRM creation',
      tags: req.body.tags || ['Lead'], leadSource: req.body.leadSource || 'Manual Entry',
      assignedAgent: req.body.assignedAgent || 'Kiran Patel (CRM Manager)'
    });
    res.status(201).json({ success: true, lead: newLead, message: 'Customer added to CRM pipeline' });
  } catch (err) { res.status(500).json({ success: false, error: err.message }); }
});

app.patch('/api/crm/leads/:id/stage', (req, res) => {
  try {
    const { stage } = req.body;
    if (!stage) return res.status(400).json({ success: false, error: 'Stage is required' });
    const updated = store.updateLeadStage(req.params.id, stage);
    if (!updated) return res.status(404).json({ success: false, error: 'Lead not found' });
    res.json({ success: true, lead: updated, message: `Lead moved to ${stage}` });
  } catch (err) { res.status(500).json({ success: false, error: err.message }); }
});

app.delete('/api/crm/leads/:id', (req, res) => {
  try {
    const success = store.deleteLead(req.params.id);
    if (!success) return res.status(404).json({ success: false, error: 'Lead not found' });
    res.json({ success: true, message: 'CRM Lead archived' });
  } catch (err) { res.status(500).json({ success: false, error: err.message }); }
});

app.get('/api/crm/analytics', (req, res) => {
  try {
    const analytics = store.getAnalytics();
    res.json({ success: true, analytics });
  } catch (err) { res.status(500).json({ success: false, error: err.message }); }
});

app.post('/api/crm/campaigns', (req, res) => {
  try {
    const { title, audience, message } = req.body;
    if (!title || !audience) return res.status(400).json({ success: false, error: 'Title and audience required' });
    const campaign = store.triggerCampaign({ title, audience, message });
    res.status(201).json({ success: true, campaign, message: 'Marketing blast sent' });
  } catch (err) { res.status(500).json({ success: false, error: err.message }); }
});

// ==================== NEW: WHATSAPP NOTIFICATION DISPATCH ====================
app.post('/api/notifications/whatsapp', (req, res) => {
  try {
    const { phone, message } = req.body;
    if (!phone || !message) {
      return res.status(400).json({ success: false, error: 'Phone and message are required' });
    }
    // Simulate successful WhatsApp API dispatch (e.g. Twilio / WATI)
    res.json({ success: true, dispatchedTo: phone, timestamp: new Date().toISOString(), message: 'WhatsApp notification sent successfully!' });
  } catch (err) { res.status(500).json({ success: false, error: err.message }); }
});

app.use('/api', (req, res) => res.status(404).json({ success: false, error: 'Route not found' }));

httpServer.listen(PORT, () => {
  console.log(`Govind Dosa Real-Time Enterprise API server running at http://localhost:${PORT}`);
});
