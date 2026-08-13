import { useState, useEffect } from 'react';
import api from '../api/axios';

export default function AvailabilityToggle() {
  const [isAvailable, setIsAvailable] = useState(false);

  useEffect(() => {
    api.get('/bookings/availability/').then((res) => setIsAvailable(res.data.is_available));
  }, []);

  const toggle = async () => {
    const res = await api.patch('/bookings/availability/', { is_available: !isAvailable });
    setIsAvailable(res.data.is_available);
  };

  return (
    <button className={`availability-pill ${isAvailable ? 'is-on' : ''}`} onClick={toggle}>
      {isAvailable ? 'Available' : 'Not available'}
    </button>
  );
}