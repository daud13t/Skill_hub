import { useState, useEffect } from 'react';
import api from '../api/axios';

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/bookings/')
      .then((res) => setBookings(res.data))
      .finally(() => setLoading(false));
  }, []);

  const groups = {
    pending: bookings.filter((b) => b.status === 'pending'),
    confirmed: bookings.filter((b) => b.status === 'confirmed'),
    cancelled: bookings.filter((b) => b.status === 'cancelled'),
  };

  const groupLabels = {
    pending: 'Waiting on confirmation',
    confirmed: 'Confirmed',
    cancelled: 'Cancelled',
  };

  return (
    <div className="bookings-page fade-in">
      <div className="bookings-header">
        <h1>My bookings</h1>
        <span className="bookings-count">{bookings.length} total</span>
      </div>

      {bookings.length === 0 && (
        <div className="bookings-empty">
          <p>No bookings yet. Head to the feed and book a session with a tutor.</p>
        </div>
      )}

      {Object.entries(groups).map(([status, items]) =>
        items.length > 0 ? (
          <div key={status} className="bookings-group">
            <h3 className="bookings-group-label">{groupLabels[status]} <span>{items.length}</span></h3>
            <div className="bookings-list">
              {items.map((b) => {
                const date = new Date(b.requested_datetime);
                return (
                  <div key={b.id} className={`booking-row status-border-${b.status}`}>
                    <div className="booking-date-block">
                      <span className="booking-date-day">{date.getDate()}</span>
                      <span className="booking-date-month">{date.toLocaleString('default', { month: 'short' })}</span>
                    </div>
                    <div className="booking-info">
                      <p className="booking-skill">{b.skill_title}</p>
                      <p className="booking-with">with {b.student_username}</p>
                    </div>
                    <div className="booking-time">
                      {date.toLocaleTimeString('default', { hour: 'numeric', minute: '2-digit' })}
                    </div>
                    <span className={`status-badge status-${b.status}`}>{b.status}</span>
                  </div>
                );
              })}
            </div>
          </div>
        ) : null
      )}
    </div>
  );
}