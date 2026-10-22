
import { db } from "./supabaseClient.js";
import { createAddButton } from "./cartUI.js";

async function displayMenuItems() {
  const container = document.getElementById("menu-items");

  if (!container) return;

  container.textContent = "Loading menu items...";

  // ?id=2 in the URL means a restaurant was clicked, so only show its menu
  const restaurantId = new URLSearchParams(location.search).get("id");

  let query = db
    .from("menu_items")
    .select("id, restaurant_id, name, description, price, available")
    .eq("available", true);

  if (restaurantId) {
    query = query.eq("restaurant_id", restaurantId);
    showRestaurantName(restaurantId);
  }

  const { data, error } = await query;

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

    const description = document.createElement("small");
    description.className = "text-muted";
    description.textContent = item.description ?? "";

    row.appendChild(itemDetails);
    row.appendChild(description);
    row.appendChild(createAddButton(item));

    container.appendChild(row);
  });
}

async function showRestaurantName(restaurantId) {
  document.getElementById("show-all").hidden = false;

  const { data } = await db.from("restaurants").select("name").eq("id", restaurantId).single();

  if (data) {
    document.getElementById("menu-title").textContent = "Menu: " + data.name;
  }
}

displayMenuItems();
