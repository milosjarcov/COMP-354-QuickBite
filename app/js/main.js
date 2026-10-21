import { db } from "./supabaseClient.js";

const { data, error } = await db.from("restaurants").select("*");

if (!error) {
  console.log("restaurants:", data);
  document.getElementById("output").textContent = data.map((r) => r.name).join(",");
}
