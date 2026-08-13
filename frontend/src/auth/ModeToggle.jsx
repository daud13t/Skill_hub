import { useState, useEffect } from 'react';
import api from '../api/axios';

export default function ModeToggle({ onModeChange }) {
  const [mode, setMode] = useState('student');

  useEffect(() => {
    api.get('/accounts/profile/').then((res) => {
      setMode(res.data.current_mode);
      onModeChange(res.data.current_mode);
    });
  }, []);

  const toggle = async () => {
    const newMode = mode === 'student' ? 'tutor' : 'student';
    const res = await api.patch('/accounts/profile/', { current_mode: newMode });
    setMode(res.data.current_mode);
    onModeChange(res.data.current_mode);
  };

  return (
    <button className="mode-switch" onClick={toggle}>
      <span className={`mode-switch-option ${mode === 'student' ? 'active' : ''}`}>Learning</span>
      <span className={`mode-switch-option ${mode === 'tutor' ? 'active' : ''}`}>Teaching</span>
      <span className={`mode-switch-thumb ${mode === 'tutor' ? 'right' : ''}`} />
    </button>
  );
}