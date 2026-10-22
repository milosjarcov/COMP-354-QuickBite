import { db } from "./supabaseClient.js";

const list = document.getElementById("restaurants");

const { data, error } = await db.from("restaurants").select("id, name, description, address").order("name");

if (error) {
  console.error(error);
  list.textContent = "Could not load restaurants.";
} else if (data.length === 0) {
  list.textContent = "No restaurants available.";
} else {
  list.innerHTML = "";

  // each restaurant links to its menu page
  for (const r of data) {
    const link = document.createElement("a");
    link.href = "menu.html?id=" + r.id;
    link.className = "list-group-item list-group-item-action";
    link.innerHTML = `<strong>${r.name}</strong><br>${r.description ?? ""}<br><small class="text-muted">${r.address ?? ""}</small>`;
    list.appendChild(link);
  }
}
