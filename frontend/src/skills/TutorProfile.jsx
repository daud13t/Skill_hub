import { useState, useEffect } from 'react';
import api from '../api/axios';

export default function TutorProfile({ userId, onBack, onSelectSkill }) {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    api.get(`/accounts/users/${userId}/`).then((res) => setProfile(res.data));
  }, [userId]);

  if (!profile) return null;

  return (
    <div className="fade-in">
      <div className="detail-hero">
        <button className="back-pill" onClick={onBack}>← Back</button>
        <div className="detail-tutor-row" style={{ marginTop: 8 }}>
          <div className="tutor-avatar" style={{ width: 64, height: 64, fontSize: 24 }}>
            {profile.username.charAt(0).toUpperCase()}
          </div>
          <div>
            <h1 style={{ fontFamily: 'var(--font-display)', color: 'var(--white)', fontSize: 28 }}>
              {profile.username}
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 14 }}>
              {profile.skills.length} skill{profile.skills.length !== 1 ? 's' : ''} offered
            </p>
          </div>
        </div>
      </div>

      <div className="page">
        {profile.bio && (
          <div style={{ marginBottom: 28 }}>
            <h3 style={{ fontSize: 16, marginBottom: 10 }}>About</h3>
            <p style={{ fontSize: 15, lineHeight: 1.7, color: 'var(--ink)' }}>{profile.bio}</p>
          </div>
        )}

      {profile.contact_link && (
      <p className="profile-contact-line">
      <a href={profile.contact_link} target="_blank" rel="noopener noreferrer" className="profile-contact-btn">
            Contact {profile.username}
      </a>
      </p>
      )}

        <h3 style={{ fontSize: 16, marginBottom: 16 }}>Skills offered</h3>
        <div className="skill-grid" style={{ padding: 0, gridTemplateColumns: 'repeat(2, 1fr)' }}>
          {profile.skills.map((s) => (
            <div key={s.id} className="skill-card" onClick={() => onSelectSkill(s.id)}>
              <span className="skill-card-category">{s.category}</span>
              <h3 className="skill-card-title">{s.title}</h3>
              <p className="skill-card-meta">{s.view_count} views</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}