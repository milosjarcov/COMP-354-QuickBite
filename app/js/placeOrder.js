import { db } from "./supabaseClient.js";
import { getCart, clearCart } from "./cart.js";
import { isValidPickupTime } from "./pickupTime.js";
import { renderCart } from "./cartUI.js";

const button = document.getElementById("place-order");
const message = document.getElementById("order-message");

button.addEventListener("click", placeOrder);

async function placeOrder() {
  const items = getCart();
  const name = document.getElementById("customer-name").value.trim();
  const pickupTime = document.getElementById("pickup-time").value;

  message.textContent = "";

  if (items.length === 0) {
    message.textContent = "Your cart is empty.";
    return;
  }
  if (!name) {
    message.textContent = "Please enter your name.";
    return;
  }
  if (!isValidPickupTime(pickupTime)) {
    message.textContent = "Please choose a pickup time.";
    return;
  }

  button.disabled = true;

  // there's no select policy on orders, so we can't get the new id back from supabase.
  // making the id here instead
  const orderId = crypto.randomUUID();

  const { error: orderError } = await db.from("orders").insert({
    id: orderId,
    restaurant_id: items[0].restaurant_id,
    customer_name: name,
    pickup_time: new Date(pickupTime).toISOString()
  });

  if (orderError) {
    console.error(orderError);
    message.textContent = "Could not place your order. Please try again.";
    button.disabled = false;
    return;
  }

  const orderItems = items.map(item => ({
    order_id: orderId,
    menu_item_id: item.id,
    quantity: item.quantity,
    unit_price: item.price
  }));

  const { error: itemsError } = await db.from("order_items").insert(orderItems);

  if (itemsError) {
    console.error(itemsError);
    message.textContent = "Could not place your order. Please try again.";
    button.disabled = false;
    return;
  }

  clearCart();
  renderCart();
  button.disabled = false;
  message.textContent = "";
}
