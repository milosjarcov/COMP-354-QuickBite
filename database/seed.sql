INSERT INTO
  restaurants (name, description, address)
VALUES
  (
    'Pho Saigon',
    'Vietnamese noodle soups and banh mi',
    '1200 Rue Sainte-Catherine O'
  ),
  (
    'La Bella Pizza',
    'Wood-fired pizza and pasta',
    '450 Boulevard Saint-Laurent'
  ) ON conflict (name) DO nothing;

INSERT INTO
  menu_items (restaurant_id, name, description, price)
SELECT
  r.id,
  m.name,
  m.description,
  m.price
FROM
  restaurants r
  JOIN (
    VALUES
      (
        'Pho Saigon',
        'Beef Pho',
        'Rice noodles in slow-cooked beef broth',
        14.50
      ),
      (
        'Pho Saigon',
        'Chicken Pho',
        'Rice noodles in chicken broth',
        13.50
      ),
      (
        'Pho Saigon',
        'Banh Mi',
        'Grilled pork baguette sandwich',
        9.00
      ),
      (
        'Pho Saigon',
        'Spring Rolls (2)',
        'Fresh rolls with peanut sauce',
        6.50
      ),
      (
        'Pho Saigon',
        'Vietnamese Coffee',
        'Iced coffee with condensed milk',
        4.75
      ),
      (
        'La Bella Pizza',
        'Margherita Pizza',
        'Tomato, mozzarella, basil',
        16.00
      ),
      (
        'La Bella Pizza',
        'Pepperoni Pizza',
        'Tomato, mozzarella, pepperoni',
        18.00
      ),
      (
        'La Bella Pizza',
        'Spaghetti Bolognese',
        'Beef and tomato sauce',
        15.50
      ),
      (
        'La Bella Pizza',
        'Caesar Salad',
        'Romaine, parmesan, croutons',
        10.00
      ),
      (
        'La Bella Pizza',
        'Tiramisu',
        'Classic coffee-soaked dessert',
        7.50
      )
  ) AS m(restaurant_name, name, description, price) ON m.restaurant_name = r.name;