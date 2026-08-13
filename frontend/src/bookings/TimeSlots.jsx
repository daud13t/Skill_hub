// src/bookings/TimeSlots.jsx
const SLOTS = [];
for (let h = 8; h <= 20; h++) {
  SLOTS.push(`${h}:00`);
  if (h < 20) SLOTS.push(`${h}:30`);
}

function formatSlot(slot) {
  const [h, m] = slot.split(':').map(Number);
  const period = h >= 12 ? 'PM' : 'AM';
  const hour12 = h % 12 === 0 ? 12 : h % 12;
  return `${hour12}:${m.toString().padStart(2, '0')} ${period}`;
}

export default function TimeSlots({ selectedTime, onSelect }) {
  return (
    <div className="time-grid">
      {SLOTS.map((slot) => (
        <button
          type="button"
          key={slot}
          className={`time-slot ${selectedTime === slot ? 'is-selected' : ''}`}
          onClick={() => onSelect(slot)}
        >
          {formatSlot(slot)}
        </button>
      ))}
    </div>
  );
}