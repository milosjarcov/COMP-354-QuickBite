
import { db } from "./supabaseClient.js";
import { createAddButton } from "./cartUI.js";

async function displayMenuItems() {
  const container = document.getElementById("menu-items");

  if (!container) return;

  container.textContent = "Loading menu items...";

  const { data, error } = await db
    .from("menu_items")
    .select("id, restaurant_id, name, price, available")
    .eq("available", true);

  if (error) {
    console.error("Error loading menu:", error);
    container.textContent = "Unable to load menu items.";
    return;
  }

  container.replaceChildren();

  if (!data || data.length === 0) {
    container.textContent = "No menu items available.";
    return;
  }

  data.forEach(item => {
    const row = document.createElement("div");
    row.className = "d-flex align-items-center gap-3 mb-3";

    const itemDetails = document.createElement("span");
    itemDetails.textContent =
      `${item.name} - $${Number(item.price).toFixed(2)}`;

    row.appendChild(itemDetails);
    row.appendChild(createAddButton(item));

    container.appendChild(row);
  });
}

displayMenuItems();
