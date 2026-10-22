
const SLOT_INTERVAL_MINUTES = 15;

function roundUpToSlot(date) {
  const rounded = new Date(date);
  rounded.setSeconds(0, 0);

  const remainder = rounded.getMinutes() % SLOT_INTERVAL_MINUTES;

  if (remainder !== 0) {
    rounded.setMinutes(
      rounded.getMinutes() + SLOT_INTERVAL_MINUTES - remainder
    );
  }

  if (rounded <= date) {
    rounded.setMinutes(rounded.getMinutes() + SLOT_INTERVAL_MINUTES);
  }

  return rounded;
}

function formatLocalDateTime(date) {
  const pad = number => String(number).padStart(2, "0");

  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

export function generatePickupSlots(now = new Date()) {
  const slots = [];
  const end = new Date(now.getTime() + 24 * 60 * 60 * 1000);

  for (
    let slot = roundUpToSlot(now);
    slot <= end;
    slot.setMinutes(slot.getMinutes() + SLOT_INTERVAL_MINUTES)
  ) {
    slots.push(new Date(slot));
  }

  return slots;
}

export function isValidPickupTime(value, now = new Date()) {
  if (!value) return false;

  const selected = new Date(value);

  return (
    !Number.isNaN(selected.getTime()) &&
    selected > now &&
    selected.getMinutes() % SLOT_INTERVAL_MINUTES === 0 &&
    selected.getSeconds() === 0
  );
}

export function setupPickupTime() {
  const select = document.getElementById("pickup-time");
  const summary = document.getElementById("selected-pickup-time");

  if (!select || !summary) return;

  function refreshSlots() {
    const previousSelection = select.value;
    select.replaceChildren();

    const placeholder = document.createElement("option");
    placeholder.value = "";
    placeholder.textContent = "Choose a pickup time";
    select.appendChild(placeholder);

    generatePickupSlots().forEach(date => {
      const option = document.createElement("option");
      option.value = formatLocalDateTime(date);
      option.textContent = date.toLocaleString([], {
        weekday: "short",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit"
      });
      select.appendChild(option);
    });

    if (isValidPickupTime(previousSelection)) {
      select.value = previousSelection;
    }

    if (!select.value) {
      summary.textContent = "No pickup time selected.";
    }
  }

  select.addEventListener("focus", refreshSlots);

  select.addEventListener("change", () => {
    summary.textContent = isValidPickupTime(select.value)
      ? `Selected pickup time: ${select.selectedOptions[0].textContent}`
      : "No valid pickup time selected.";
  });

  refreshSlots();
}
