-- Anyone can read restaurants and menus and place orders.
-- Nobody can read, update or delete orders from the app yet
-- (no SELECT/UPDATE/DELETE policies on orders = blocked by RLS).
-- Drop first so the script can be re-run safely
DROP policy IF EXISTS "Public can view restaurants" ON restaurants;

DROP policy IF EXISTS "Public can view menu items" ON menu_items;

DROP policy IF EXISTS "Public can place orders" ON orders;

DROP policy IF EXISTS "Public can add order items" ON order_items;

CREATE policy "Public can view restaurants" ON restaurants FOR
SELECT
  TO anon,
  authenticated USING (TRUE);

CREATE policy "Public can view menu items" ON menu_items FOR
SELECT
  TO anon,
  authenticated USING (TRUE);

-- New orders must start as 'Received' and have a future pickup time
CREATE policy "Public can place orders" ON orders FOR
INSERT
  TO anon,
  authenticated WITH CHECK (
    STATUS = 'Received'
    AND pickup_time > NOW()
  );

CREATE policy "Public can add order items" ON order_items FOR
INSERT
  TO anon,
  authenticated WITH CHECK (TRUE);