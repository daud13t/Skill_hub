import { useState } from 'react';

const DAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];

export default function Calendar({ selectedDate, onSelect }) {
  const [viewDate, setViewDate] = useState(new Date());

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  const isSameDay = (a, b) =>
    a && b && a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();

  const changeMonth = (delta) => setViewDate(new Date(year, month + delta, 1));

  const pickDay = (day) => {
    if (!day) return;
    const picked = new Date(year, month, day);
    if (picked < today) return;
    onSelect(picked);
  };

  return (
    <div className="cal">
      <div className="cal-header">
        <button type="button" className="cal-nav" onClick={() => changeMonth(-1)} aria-label="Previous month">‹</button>
        <span className="cal-month">{MONTHS[month]} {year}</span>
        <button type="button" className="cal-nav" onClick={() => changeMonth(1)} aria-label="Next month">›</button>
      </div>
      <div className="cal-grid cal-daynames">
        {DAYS.map((d, i) => <span key={i} className="cal-dayname">{d}</span>)}
      </div>
      <div className="cal-grid">
        {cells.map((day, i) => {
          if (!day) return <span key={i} />;
          const cellDate = new Date(year, month, day);
          const isPast = cellDate < today;
          const isToday = isSameDay(cellDate, today);
          const isSelected = isSameDay(cellDate, selectedDate);
          return (
            <button
              type="button"
              key={i}
              className={`cal-day ${isToday ? 'is-today' : ''} ${isSelected ? 'is-selected' : ''} ${isPast ? 'is-past' : ''}`}
              onClick={() => pickDay(day)}
              disabled={isPast}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
}