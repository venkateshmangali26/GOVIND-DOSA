-- =====================================================================
-- GOVIND DOSA ENTERPRISE SUITE • PRODUCTION RELATIONAL DATABASE SCHEMA
-- Compatible with Neon.tech, Supabase, AWS Aurora, and standard PostgreSQL
-- =====================================================================

-- Clean Slate (Careful in Production)
DROP TABLE IF EXISTS tiffin_deliveries CASCADE;
DROP TABLE IF EXISTS tiffin_subscriptions CASCADE;
DROP TABLE IF EXISTS crm_leads CASCADE;
DROP TABLE IF EXISTS reservations CASCADE;
DROP TABLE IF EXISTS order_items CASCADE;
DROP TABLE IF EXISTS orders CASCADE;
DROP TABLE IF EXISTS customers CASCADE;
DROP TABLE IF EXISTS coupons CASCADE;
DROP TABLE IF EXISTS menu_items CASCADE;

-- 1. MENU CATALOG TABLE
CREATE TABLE menu_items (
    id VARCHAR(30) PRIMARY KEY,
    name VARCHAR(120) NOT NULL,
    description TEXT,
    base_price DECIMAL(10, 2) NOT NULL,
    category VARCHAR(50) NOT NULL,
    category_code VARCHAR(30) NOT NULL,
    image_url VARCHAR(255),
    rating DECIMAL(2, 1) DEFAULT 4.8,
    reviews_count INT DEFAULT 1200,
    is_bestseller BOOLEAN DEFAULT FALSE,
    is_veg BOOLEAN DEFAULT TRUE,
    prep_time INT DEFAULT 7,
    calories INT DEFAULT 450,
    tags TEXT[],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_menu_category ON menu_items(category_code);
CREATE INDEX idx_menu_bestseller ON menu_items(is_bestseller);

-- 2. CUSTOMERS (CRM, LOYALTY & TIFFIN WALLET)
CREATE TABLE customers (
    id SERIAL PRIMARY KEY,
    phone VARCHAR(25) UNIQUE NOT NULL,
    name VARCHAR(120) NOT NULL,
    email VARCHAR(120),
    segment VARCHAR(30) DEFAULT 'Regular', -- 'VIP', 'Regular', 'New'
    wallet_balance DECIMAL(10, 2) DEFAULT 0.00,
    loyalty_points INT DEFAULT 0,
    total_orders INT DEFAULT 0,
    total_spent DECIMAL(10, 2) DEFAULT 0.00,
    favorite_dosa VARCHAR(120),
    last_visit TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_customers_phone ON customers(phone);
CREATE INDEX idx_customers_segment ON customers(segment);

-- 3. ORDERS (KITCHEN STATE MACHINE)
CREATE TABLE orders (
    id VARCHAR(30) PRIMARY KEY,
    customer_id INT REFERENCES customers(id) ON DELETE SET NULL,
    customer_name VARCHAR(120) NOT NULL,
    customer_phone VARCHAR(25),
    dining_mode VARCHAR(30) DEFAULT 'Dine-In', -- 'Dine-In', 'Takeaway', 'Delivery'
    table_number VARCHAR(20),
    subtotal DECIMAL(10, 2) NOT NULL,
    discount DECIMAL(10, 2) DEFAULT 0.00,
    tax DECIMAL(10, 2) NOT NULL,               -- 5% GST
    tip DECIMAL(10, 2) DEFAULT 0.00,
    total_amount DECIMAL(10, 2) NOT NULL,
    status VARCHAR(30) DEFAULT 'received',      -- 'received', 'preparing', 'ready', 'served', 'cancelled'
    stage VARCHAR(30) DEFAULT 'NEW',           -- 'NEW', 'TAWA', 'PLATING', 'READY', 'SERVED'
    coupon_applied VARCHAR(30),
    assigned_chef VARCHAR(60) DEFAULT 'Govind ji',
    estimated_time INT DEFAULT 8,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_stage ON orders(stage);
CREATE INDEX idx_orders_created ON orders(created_at DESC);

-- 4. ORDER LINE ITEMS
CREATE TABLE order_items (
    id SERIAL PRIMARY KEY,
    order_id VARCHAR(30) REFERENCES orders(id) ON DELETE CASCADE,
    menu_item_id VARCHAR(30) REFERENCES menu_items(id),
    item_name VARCHAR(120) NOT NULL,
    quantity INT NOT NULL CHECK (quantity > 0),
    butter_level VARCHAR(30) DEFAULT 'Regular', -- 'Regular', 'Extra', 'Bath'
    spice_level VARCHAR(40) DEFAULT 'Medium',
    extras JSONB DEFAULT '[]'::jsonb,
    unit_price DECIMAL(10, 2) NOT NULL,
    line_total DECIMAL(10, 2) NOT NULL,
    special_notes TEXT
);

CREATE INDEX idx_order_items_order ON order_items(order_id);

-- 5. COUPONS & PROMOTIONAL OFFERS
CREATE TABLE coupons (
    code VARCHAR(30) PRIMARY KEY,
    description TEXT,
    discount_type VARCHAR(20) NOT NULL, -- 'percentage' or 'flat'
    discount_value DECIMAL(10, 2) NOT NULL,
    min_order DECIMAL(10, 2) DEFAULT 0.00,
    max_discount DECIMAL(10, 2) DEFAULT 999.00,
    is_active BOOLEAN DEFAULT TRUE,
    valid_till DATE DEFAULT '2026-12-31'
);

-- 6. TABLE RESERVATIONS
CREATE TABLE reservations (
    id VARCHAR(30) PRIMARY KEY,
    guest_name VARCHAR(120) NOT NULL,
    phone VARCHAR(25) NOT NULL,
    email VARCHAR(120),
    party_size INT NOT NULL CHECK (party_size > 0),
    reservation_date DATE NOT NULL,
    time_slot VARCHAR(20) NOT NULL,
    table_number VARCHAR(20),
    status VARCHAR(30) DEFAULT 'confirmed', -- 'confirmed', 'pending', 'cancelled'
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 7. B2B & CATERING CRM LEADS
CREATE TABLE crm_leads (
    id VARCHAR(30) PRIMARY KEY,
    name VARCHAR(120) NOT NULL,
    company VARCHAR(120) DEFAULT 'Individual Diner',
    phone VARCHAR(25) NOT NULL,
    email VARCHAR(120),
    stage VARCHAR(40) DEFAULT 'Prospect / Inquiry', -- 'Prospect / Inquiry', 'Qualified / Hot Lead', 'Negotiation / Quote Sent', 'Closed Won / Active'
    deal_value DECIMAL(10, 2) DEFAULT 0.00,
    notes TEXT,
    tags TEXT[],
    lead_source VARCHAR(60) DEFAULT 'Website Storefront',
    assigned_agent VARCHAR(60) DEFAULT 'Kiran Patel (CRM Manager)',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 8. TIFFIN SUBSCRIPTIONS & WALLET
CREATE TABLE tiffin_subscriptions (
    id VARCHAR(30) PRIMARY KEY,
    customer_id INT REFERENCES customers(id),
    plan_name VARCHAR(80) NOT NULL,
    delivery_slot VARCHAR(30) DEFAULT '7:30 AM - 8:00 AM',
    address TEXT NOT NULL,
    status VARCHAR(30) DEFAULT 'active', -- 'active', 'paused', 'cancelled'
    wallet_balance DECIMAL(10, 2) DEFAULT 840.00,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE tiffin_deliveries (
    id VARCHAR(30) PRIMARY KEY,
    subscription_id VARCHAR(30) REFERENCES tiffin_subscriptions(id),
    delivery_date DATE NOT NULL,
    menu_summary VARCHAR(255) NOT NULL,
    rider_name VARCHAR(80) DEFAULT 'Naveen Kumar',
    rider_phone VARCHAR(25) DEFAULT '+91 98492 44332',
    status VARCHAR(30) DEFAULT 'scheduled', -- 'scheduled', 'out_for_delivery', 'delivered', 'skipped'
    skip_reason TEXT
);

-- =====================================================================
-- INITIAL SEED DATA
-- =====================================================================

-- Promo Coupons
INSERT INTO coupons (code, description, discount_type, discount_value, min_order, max_discount) VALUES
('GOVIND1988', 'Founder''s Day 10% Off', 'percentage', 10.00, 200.00, 100.00),
('AMUL50', 'Flat ₹50 Off on Feast', 'flat', 50.00, 300.00, 50.00),
('DOSA20', '20% Off on Butter Specials', 'percentage', 20.00, 400.00, 150.00),
('WEEKEND15', 'Weekend Special 15% Off', 'percentage', 15.00, 250.00, 80.00);

-- Core Menu Items
INSERT INTO menu_items (id, name, description, base_price, category, category_code, image_url, rating, reviews_count, is_bestseller, is_veg, prep_time, calories, tags) VALUES
('GD-D02', 'Govind Dosa', 'Govind ji''s legendary signature creation drenched in Amul butter, spiced potato masala & sautéed onions.', 115.00, 'Dosas', 'DOSAS', '/images/govind-dosa.jpg', 4.9, 3840, TRUE, TRUE, 7, 480, ARRAY['Chef''s Special', 'Signature', 'Bestseller']),
('GD-D17', 'Cheese Burst Dosa', 'Decadent dosa smothered with overflowing melted Amul mozzarella.', 155.00, 'Dosas', 'DOSAS', '/images/cheese-dosa.jpg', 4.9, 1420, TRUE, TRUE, 8, 590, ARRAY['Cheese Burst', 'Gooey', 'Bestseller']),
('GD-D05', 'Karam Dosa', 'Dosa topped with spicy authentic Mysore karam chili paste.', 95.00, 'Dosas', 'DOSAS', '/images/karam-dosa.jpg', 4.9, 2950, TRUE, TRUE, 6, 420, ARRAY['Karam Smeared', 'Spicy', 'Bestseller']),
('GD-D18', 'Schezwan Cheese Dosa', 'Crispy golden dosa smeared with fiery schezwan sauce and molten cheese.', 165.00, 'Dosas', 'DOSAS', '/images/schezwan-cheese-dosa.jpg', 4.8, 1580, TRUE, TRUE, 8, 560, ARRAY['Schezwan', 'Cheese Burst', 'Fusion']),
('GD-D19', 'Schezwan Paneer Dosa', 'Crispy folded dosa filled with fiery schezwan sauce, tender diced paneer & spring onions.', 165.00, 'Dosas', 'DOSAS', '/images/schezwan-paneer-dosa.jpg', 4.9, 1480, TRUE, TRUE, 8, 580, ARRAY['Schezwan', 'Paneer', 'Fusion']),
('GD-D20', 'Cream Cheese Dosa', 'Crisp cone-folded crepe oozing with warm bubbling melted cream cheese & fresh herbs.', 155.00, 'Dosas', 'DOSAS', '/images/cream-cheese-dosa.jpg', 4.8, 1190, TRUE, TRUE, 7, 520, ARRAY['Cream Cheese', 'Rich', 'Velvety']),
('GD-D01', 'Plain Dosa', 'Golden-crisp roasted dosa served on fresh banana leaf with aromatic sambar and chutney.', 65.00, 'Dosas', 'DOSAS', '/images/plain-dosa.jpg', 4.8, 1920, FALSE, TRUE, 5, 280, ARRAY['Crispy', 'Classic', 'Light']),
('GD-D07', 'Butter Dosa', 'Rich golden dosa bathed in pure sizzling Amul butter right off the hot tawa.', 95.00, 'Dosas', 'DOSAS', '/images/masala-dosa.jpg', 4.8, 2410, TRUE, TRUE, 6, 460, ARRAY['Amul Butter', 'Rich', 'Golden']),
('GD-D16', 'Paneer Cheese Dosa', 'Crispy dosa prepared with chutney layer, generous soft paneer and melted cheese.', 155.00, 'Dosas', 'DOSAS', '/images/paneer-cheese-dosa.jpg', 4.9, 2210, TRUE, TRUE, 9, 670, ARRAY['Paneer Cheese', 'Loaded', 'Bestseller']),
('GD-I03', 'Tawa Idly', 'Idli tossed on hot tawa in Amul butter and roasted gunpowder spices.', 105.00, 'Idly', 'IDLY', '/images/tawa_idli.jpg', 4.9, 3410, TRUE, TRUE, 6, 340, ARRAY['Tawa Fried', 'Iconic', 'Bestseller']),
('GD-I04', 'Sambar Idly', 'Two soft idlis completely immersed in a bowl of aromatic, piping hot Hyderabad sambar.', 75.00, 'Idly', 'IDLY', '/images/idli-sambar.jpg', 4.8, 1750, TRUE, TRUE, 3, 230, ARRAY['Sambar Dip', 'Piping Hot']),
('GD-I12', 'Spot Idly', 'Mini idlies seasoned with special Hyderabad spot masala right off the tawa.', 135.00, 'Idly', 'IDLY', '/images/spot-idly.jpg', 4.9, 2890, TRUE, TRUE, 8, 420, ARRAY['Spot Idly', 'Live Tawa', 'Hyderabad Special']),
('GD-I09', 'Idli 65', 'Crispy fried idli wedges wok-tossed in fiery tangy 65 masala with roasted dry red chilies.', 135.00, 'Idly', 'IDLY', '/images/idli-65.jpg', 4.8, 1680, TRUE, TRUE, 7, 350, ARRAY['Idli 65', 'Spicy', 'Crispy']),
('GD-W02', 'Tawa Wada', 'Crispy medu vada pan-roasted on sizzling tawa with gunpowder podi and butter.', 85.00, 'Wada', 'WADA', '/images/tawa-wada.jpg', 4.8, 1390, TRUE, TRUE, 6, 370, ARRAY['Tawa Roasted', 'Spicy', 'Crunchy']),
('GD-W08', 'Paneer Cheese Wada', 'Crispy wada stuffed and layered with paneer cubes and molten cheese.', 135.00, 'Wada', 'WADA', '/images/paneer-cheese-wada.jpg', 4.9, 1040, TRUE, TRUE, 8, 560, ARRAY['Paneer Cheese', 'Loaded', 'Bestseller']),
('GD-M02', 'Tawa Mysore Bajji', 'Fluffy fermented bajjis split and roasted in butter, onions & karam.', 75.00, 'Mysore Bajji', 'MYSORE_BAJJI', '/images/tawa-mysore-bajji.jpg', 4.9, 1950, TRUE, TRUE, 6, 390, ARRAY['Tawa Roasted', 'Spicy', 'Bestseller']),
('GD-M06', 'Paneer Cheese Mysore Bajji', 'Golden bajjis on banana leaf crowned with malai paneer and bubbling molten cheese.', 125.00, 'Mysore Bajji', 'MYSORE_BAJJI', '/images/paneer-cheese-mysore-bajji.jpg', 4.9, 1680, TRUE, TRUE, 7, 580, ARRAY['Paneer Cheese', 'Malai Paneer', 'Bestseller']),
('GD-U01', 'Tawa Upma', 'Signature roasted semolina prepared with curry leaves, cashews & Amul butter.', 135.00, 'Upma', 'UPMA', '/images/upma.jpg', 4.9, 2650, TRUE, TRUE, 6, 380, ARRAY['Tawa Upma', 'Signature', 'Bestseller']),
('GD-U07', 'Paneer Cheese Upma', 'The ultimate royal upma bursting with fresh paneer cubes and melted cheese.', 165.00, 'Upma', 'UPMA', '/images/cheese-upma.jpg', 4.9, 1610, TRUE, TRUE, 8, 530, ARRAY['Paneer Cheese', 'Royal', 'Bestseller']);

-- Seed VIP Customers
INSERT INTO customers (phone, name, email, segment, wallet_balance, loyalty_points, total_orders, total_spent, favorite_dosa) VALUES
('+91-98491-11223', 'Ramesh Iyer', 'ramesh.iyer@gmail.com', 'VIP', 1250.00, 1840, 47, 12480.00, 'Govind Ji''s Special Butter Burst Dosa'),
('+91-90000-55441', 'Priya Reddy', 'priya.reddy@gmail.com', 'Regular', 420.00, 620, 18, 4320.00, 'Mysore Karam Roast'),
('+91-99492-88101', 'Asha Krishnan', 'asha.k@hotmail.com', 'VIP', 2400.00, 2210, 62, 16840.00, 'Cheese Burst Dosa'),
('+91-98401-11992', 'Karthik Subramaniam', 'karthik.s@gmail.com', 'VIP', 3150.00, 3120, 88, 24560.00, 'Spot Idly');

-- Seed Sample Active Orders
INSERT INTO orders (id, customer_name, customer_phone, dining_mode, table_number, subtotal, discount, tax, tip, total_amount, status, stage, assigned_chef, notes) VALUES
('ORD-2841', 'Ramesh Iyer', '+91-98491-11223', 'Dine-In', 'T-07', 335.00, 0.00, 17.00, 0.00, 352.00, 'preparing', 'TAWA', 'Govind ji', 'Extra butter please'),
('ORD-2842', 'Priya Reddy', '+91-90000-55441', 'Takeaway', 'N/A', 95.00, 0.00, 5.00, 0.00, 100.00, 'ready', 'READY', 'Suresh', 'Pack chutney separately'),
('ORD-2843', 'Walk-in Customer', NULL, 'Dine-In', 'T-03', 290.00, 0.00, 15.00, 0.00, 305.00, 'preparing', 'PLATING', 'Mahesh', 'Hot & crispy');

-- Seed Sample Order Items
INSERT INTO order_items (order_id, menu_item_id, item_name, quantity, butter_level, spice_level, unit_price, line_total) VALUES
('ORD-2841', 'GD-D02', 'Govind Dosa', 2, 'Extra', 'Medium', 115.00, 230.00),
('ORD-2841', 'GD-I03', 'Tawa Idly', 1, 'Regular', 'Mild', 105.00, 105.00),
('ORD-2842', 'GD-D05', 'Karam Dosa', 1, 'Regular', 'Hot', 95.00, 95.00),
('ORD-2843', 'GD-D16', 'Paneer Cheese Dosa', 1, 'Regular', 'Medium', 155.00, 155.00),
('ORD-2843', 'GD-U01', 'Tawa Upma', 1, 'Regular', 'Medium', 135.00, 135.00);

-- Seed Sample B2B Leads
INSERT INTO crm_leads (id, name, company, phone, email, stage, deal_value, notes, tags, lead_source) VALUES
('LEAD-001', 'ITC Hotel Group', 'ITC Hotels', '+91-98491-00001', 'procurement@itchotels.in', 'Qualified / Hot Lead', 85000.00, 'Bulk catering for 3-day conference in HITEC City.', ARRAY['Catering', 'B2B', 'High Value'], 'Website Inquiry'),
('LEAD-002', 'Rajesh Caterers', 'Rajesh Catering Services', '+91-98491-00002', 'rajesh@caterershyd.com', 'Negotiation / Quote Sent', 32000.00, 'Wedding catering — 400 guests.', ARRAY['Catering', 'Wedding', 'B2B'], 'Referral'),
('LEAD-003', 'Microsoft Hyderabad Campus', 'Microsoft India', '+91-98491-00003', 'facilities@msindia.com', 'Prospect / Inquiry', 150000.00, 'Quarterly employee event — food truck setup.', ARRAY['Corporate', 'Event'], 'LinkedIn');
