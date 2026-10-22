CREATE TABLE IF NOT EXISTS restaurants (
  id bigint generated always AS identity PRIMARY KEY,
  name text NOT NULL UNIQUE,
  description text,
  address text,
  created_at timestamptz NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS menu_items (
  id bigint generated always AS identity PRIMARY KEY,
  restaurant_id bigint NOT NULL REFERENCES restaurants(id) ON DELETE CASCADE,
  name text NOT NULL,
  description text,
  price numeric(6, 2) NOT NULL CHECK (price >= 0),
  available boolean NOT NULL DEFAULT TRUE,
  created_at timestamptz NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  restaurant_id bigint NOT NULL REFERENCES restaurants(id),
  customer_name text NOT NULL CHECK (char_length(trim(customer_name)) > 0),
  pickup_time timestamptz NOT NULL,
  STATUS text NOT NULL DEFAULT 'Received' CHECK (
    STATUS IN (
      'Received',
      'Preparing',
      'Ready for Pickup',
      'Completed'
    )
  ),
  created_at timestamptz NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS order_items (
  id bigint generated always AS identity PRIMARY KEY,
  order_id uuid NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  menu_item_id bigint NOT NULL REFERENCES menu_items(id),
  quantity int NOT NULL CHECK (quantity > 0),
  unit_price numeric(6, 2) NOT NULL CHECK (unit_price >= 0)
);

ALTER TABLE
  restaurants enable ROW LEVEL SECURITY;

ALTER TABLE
  menu_items enable ROW LEVEL SECURITY;

ALTER TABLE
  orders enable ROW LEVEL SECURITY;

ALTER TABLE
  order_items enable ROW LEVEL SECURITY;