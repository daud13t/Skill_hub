import { useState, useEffect } from 'react';
import api from '../api/axios';

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    api.get('/bookings/').then((res) => setBookings(res.data));
  }, []);

  return (
    <div>
      <h2>My Bookings</h2>
      {bookings.map((b) => (
        <div key={b.id}>
          <p>{b.skill_title} — {b.student_username} — {new Date(b.requested_datetime).toLocaleString()} — {b.status}</p>
        </div>
      ))}
    </div>
  );
}