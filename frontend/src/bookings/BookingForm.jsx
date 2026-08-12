import { useState } from 'react';
import api from '../api/axios';

export default function BookingForm({ skillId, onBooked }) {
  const [datetime, setDatetime] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/bookings/', {
        skill: skillId,
        requested_datetime: new Date(datetime).toISOString(),
      });
      setDatetime('');
      onBooked();
    } catch (err) {
      setError('Booking failed.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Book this skill</h3>
      <input
        type="datetime-local"
        value={datetime}
        onChange={(e) => setDatetime(e.target.value)}
      />
      {error && <p>{error}</p>}
      <button type="submit">Request Booking</button>
    </form>
  );
}