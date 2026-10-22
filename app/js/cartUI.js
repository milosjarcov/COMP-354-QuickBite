import {
  addToCart,
  getCart,
  getCartTotal,
  clearCart,
  decrementItemQuantity,
  removefromCart,
  incrementItemQuantity,
} from "./cart.js";

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
    items.forEach((item) => {
      const row = document.createElement("div");
      row.classList.add("d-flex", "gap-2", "align-items-center");
      const message = document.createElement("p");

      const buttons = document.createElement("div");

      buttons.classList.add("d-flex", "gap-2");

      const plusBtn = createEditButton("btn btn-outline-primary", "+");

      plusBtn.addEventListener("click", () => {
        incrementItemQuantity(item);
        renderCart();
      });

      const minusBtn = createEditButton("btn btn-outline-primary", "-");

      minusBtn.addEventListener("click", () => {
        decrementItemQuantity(item);
        renderCart();
      });

      const removeBtn = createEditButton(
        "btn btn-outline-danger",
        "Remove this item from cart",
      );

      removeBtn.addEventListener("click", () => {
        removefromCart(item);
        renderCart();
      });
      buttons.appendChild(plusBtn);
      buttons.appendChild(minusBtn);
      buttons.appendChild(removeBtn);

      message.textContent = `${item.name} | Quantity: ${item.quantity} | $${(item.price * item.quantity).toFixed(2)}`;
      row.appendChild(message);
      row.appendChild(buttons);
      cartContainer.appendChild(row);
    });
  }

  totalElement.textContent = getCartTotal().toFixed(2);
}

function createEditButton(css, symbol) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = css;
  button.textContent = symbol;
  return button;
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
