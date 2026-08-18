import { useState, useEffect } from 'react';
import api from '../api/axios';

export default function SkillFeed({ onSelect, onSelectTutor }) {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/skills/')
      .then((res) => setSkills(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const tutorCount = new Set(skills.map((s) => s.tutor_username)).size;

  return (
    <div className="fade-in">
      <section className="home-hero">
        <p className="home-hero-eyebrow">SkillsHub</p>
        <h1 className="home-hero-headline">Learn</h1>
        <p className="home-hero-sub">
          Real people teaching real skills. Guitar, code, sourdough, Spanish.
          Book a time, show up, learn something.
        </p>
      </section>

      {!loading && skills.length > 0 && (
        <section className="home-stats">
          <div className="home-stat">
            <span className="home-stat-number">{skills.length}</span>
            <span className="home-stat-label">Skill{skills.length !== 1 ? 's' : ''} listed</span>
          </div>
          <div className="home-stat">
            <span className="home-stat-number">{tutorCount}</span>
            <span className="home-stat-label">Tutor{tutorCount !== 1 ? 's' : ''} teaching</span>
          </div>
        </section>
      )}

      <section className="home-feed">
        <h2 className="home-feed-title">Browse skills</h2>
        {loading ? null : skills.length === 0 ? (
          <div className="bookings-empty">
            <p>No skills posted yet. Switch to tutor mode to be the first.</p>
          </div>
        ) : (
          <div className="skill-grid" style={{ padding: 0 }}>
            {skills.map((skill) => (
              <div key={skill.id} className="skill-card" onClick={() => onSelect(skill.id)}>
                <span className="skill-card-category">{skill.category}</span>
                <h3 className="skill-card-title">{skill.title}</h3>
                <p className="skill-card-meta">
                  Taught by{' '}
                  <span
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectTutor(skill.tutor_id);
                    }}
                    style={{ cursor: 'pointer' }}
                  >
                    {skill.tutor_username}
                  </span>
                  . {skill.view_count} views.
                </p>
              </div>
            ))}
          </div>
        )}
      </section>

      <footer className="home-footer">
        <div>
          <span className="nav-brand" style={{ color: 'var(--navy)' }}>SkillsHub</span>
          <p className="home-footer-tag">Learn something new from someone real.</p>
        </div>
        <p className="home-footer-copy">© {new Date().getFullYear()} SkillsHub</p>
      </footer>
    </div>
  );
}