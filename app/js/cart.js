let cart = [];
let cartRestaurantId = null;

export function addToCart(item) {
  if (!item || !item.id || !item.restaurant_id) {
    throw new Error("Invalid menu item");
  }

  if (cartRestaurantId !== null &&
      cartRestaurantId !== item.restaurant_id) {
    throw new Error("You can only order from one restaurant at a time.");
  }

  const existingItem = cart.find(cartItem => cartItem.id === item.id);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      id: item.id,
      restaurant_id: item.restaurant_id,
      name: item.name,
      price: Number(item.price),
      quantity: 1
    });
  }

  cartRestaurantId = item.restaurant_id;
}

export function getCart() {
  return cart.map(item => ({ ...item }));
}

export function getCartTotal() {
  return cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
}

export function clearCart() {
  cart = [];
  cartRestaurantId = null;
}