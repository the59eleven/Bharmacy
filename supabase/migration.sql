-- Bharmacy Database Schema
-- Run this in your Supabase SQL Editor (Database > SQL Editor > New Query)

-- Enable UUID extension if needed
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Products table
CREATE TABLE IF NOT EXISTS products (
  id SERIAL PRIMARY KEY,
  sku VARCHAR(20) NOT NULL UNIQUE,
  name VARCHAR(100) NOT NULL,
  cas_number VARCHAR(30),
  type VARCHAR(50) NOT NULL,
  supplier VARCHAR(10) NOT NULL,
  stock INTEGER NOT NULL DEFAULT 0,
  unit_cost DECIMAL(10, 2) NOT NULL,
  markup INTEGER NOT NULL DEFAULT 0,
  our_price DECIMAL(10, 2) NOT NULL,
  status VARCHAR(20) NOT NULL DEFAULT 'Out of Stock',
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Orders table
CREATE TABLE IF NOT EXISTS orders (
  id SERIAL PRIMARY KEY,
  order_id VARCHAR(20) NOT NULL UNIQUE,
  customer VARCHAR(100) NOT NULL,
  product_count INTEGER NOT NULL DEFAULT 0,
  total DECIMAL(10, 2) NOT NULL,
  status VARCHAR(20) NOT NULL DEFAULT 'Pending',
  date VARCHAR(20) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Order items (junction table)
CREATE TABLE IF NOT EXISTS order_items (
  id SERIAL PRIMARY KEY,
  order_id INTEGER NOT NULL,
  product_name VARCHAR(100) NOT NULL
);

-- Suppliers table
CREATE TABLE IF NOT EXISTS suppliers (
  id SERIAL PRIMARY KEY,
  supplier_id VARCHAR(10) NOT NULL UNIQUE,
  name VARCHAR(100) NOT NULL,
  code VARCHAR(10) NOT NULL,
  reliability INTEGER NOT NULL DEFAULT 0,
  grade VARCHAR(5) NOT NULL,
  product_count INTEGER NOT NULL DEFAULT 0,
  total_volume INTEGER NOT NULL DEFAULT 0,
  avg_margin INTEGER NOT NULL DEFAULT 0,
  status VARCHAR(20) NOT NULL DEFAULT 'Active',
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE suppliers ENABLE ROW LEVEL SECURITY;

-- Create permissive policies for service role (full access)
CREATE POLICY "service_role_products" ON products FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "service_role_orders" ON orders FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "service_role_order_items" ON order_items FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "service_role_suppliers" ON suppliers FOR ALL USING (true) WITH CHECK (true);
