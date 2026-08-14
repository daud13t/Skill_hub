import { useState, useEffect } from 'react';
import api from '../api/axios';
import BookingForm from '../bookings/BookingForm';

export default function SkillDetail({ skillId, onBack, onSelectTutor }) {
  const [skill, setSkill] = useState(null);
  const [booked, setBooked] = useState(false);

  useEffect(() => {
    api.get(`/skills/${skillId}/`).then((res) => setSkill(res.data));
  }, [skillId]);

  if (!skill) return null;

  const viewFill = Math.min(100, Math.round((skill.view_count / 200) * 100));
  const initial = skill.tutor_username.charAt(0).toUpperCase();

  return (
    <div className="fade-in">
      <div className="detail-hero">
        <button className="back-pill" onClick={onBack}>← Back to feed</button>
        <span className="skill-card-category" style={{ background: 'rgba(255,255,255,0.15)', color: 'var(--white)' }}>
          {skill.category}
        </span>
        <h1 className="detail-hero-title">{skill.title}</h1>
        <div className="detail-tutor-row">
          <div className="tutor-avatar" onClick={() => onSelectTutor(skill.tutor_id)} style={{ cursor: 'pointer' }}>
            {initial}
          </div>
          <div style={{ cursor: 'pointer' }} onClick={() => onSelectTutor(skill.tutor_id)}>
            <p className="tutor-name">{skill.tutor_username}</p>
            <p className="tutor-label">Tutor · view profile</p>
          </div>
          <div className="view-stat">
            <div className="view-stat-bar">
              <div className="view-stat-fill" style={{ width: `${viewFill}%` }} />
            </div>
            <span className="view-stat-label">{skill.view_count} views</span>
          </div>
        </div>
      </div>

      <div className="detail-content">
        <div className="detail-description-block">
          <h3>About this skill</h3>
          <p>{skill.description}</p>
        </div>

        <div className="detail-booking-block">
          {booked ? (
            <div className="booking-confirmed">Booking requested. The tutor will confirm shortly.</div>
          ) : (
            <BookingForm skillId={skill.id} onBooked={() => setBooked(true)} />
          )}
        </div>
      </div>
    </div>
  );
}