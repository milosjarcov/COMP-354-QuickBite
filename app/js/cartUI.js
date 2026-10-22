
import { addToCart, getCart, getCartTotal, clearCart } from "./cart.js";

// Display cart items and total
export function renderCart() {
  const cartContainer = document.getElementById("cart-items");
  const totalElement = document.getElementById("cart-total");

  if (!cartContainer || !totalElement) return;

  const items = getCart();
  cartContainer.replaceChildren();

  if (items.length === 0) {
    const message = document.createElement("p");
    message.textContent = "Your cart is empty.";
    cartContainer.appendChild(message);
  } else {
    items.forEach(item => {
      const row = document.createElement("p");
      row.textContent =
        `${item.name} | Quantity: ${item.quantity} | $${(item.price * item.quantity).toFixed(2)}`;
      cartContainer.appendChild(row);
    });
  }

  totalElement.textContent = getCartTotal().toFixed(2);
}

// Create an Add button for a menu item
export function createAddButton(item) {
  const button = document.createElement("button");
  button.textContent = "Add to Cart";
  button.className = "btn btn-primary btn-sm";

  button.addEventListener("click", () => {
    try {
      addToCart(item);
      renderCart();
    } catch (error) {
      alert(error.message);
    }
  });

  return button;
}

// Clear cart button
document.getElementById("clear-cart")?.addEventListener("click", () => {
  clearCart();
  renderCart();
});

renderCart();
