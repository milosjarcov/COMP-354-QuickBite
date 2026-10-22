import { db } from "./supabaseClient.js";

const list = document.getElementById("restaurants");
const selectedId = new URLSearchParams(location.search).get("id");

const { data, error } = await db.from("restaurants").select("id, name, description, address").order("name");

if (error) {
  console.error(error);
  list.textContent = "Could not load restaurants.";
} else if (data.length === 0) {
  list.textContent = "No restaurants available.";
} else {
  list.innerHTML = "";

  // clicking a restaurant reloads this page with only its menu
  for (const r of data) {
    const link = document.createElement("a");
    link.href = "?id=" + r.id;
    link.className = "list-group-item list-group-item-action";
    if (String(r.id) === selectedId) link.classList.add("active");
    link.innerHTML = `<strong>${r.name}</strong><br>${r.description ?? ""}<br><small class="text-muted">${r.address ?? ""}</small>`;
    list.appendChild(link);
  }
}
