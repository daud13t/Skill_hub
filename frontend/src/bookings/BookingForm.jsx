import { useState } from 'react';
import Calendar from './Calendar';
import TimeSlots from './TimeSlots';
import api from '../api/axios';

export default function BookingForm({ skillId, onBooked }) {
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!date || !time) {
      setError('Pick a date and a time.');
      return;
    }
    setError('');
    const [h, m] = time.split(':').map(Number);
    const combined = new Date(date);
    combined.setHours(h, m, 0, 0);

    try {
      await api.post('/bookings/', {
        skill: skillId,
        requested_datetime: combined.toISOString(),
      });
      onBooked();
    } catch (err) {
      setError('Booking failed. Try a different time.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card">
      <h3 style={{ marginBottom: 20 }}>Book this skill</h3>
      <Calendar selectedDate={date} onSelect={setDate} />
      {date && (
        <>
          <p className="time-label">Available times</p>
          <TimeSlots selectedTime={time} onSelect={setTime} />
        </>
      )}
      {error && <p className="error-text">{error}</p>}
      <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: 20 }}>
        Request booking
      </button>
    </form>
  );
}