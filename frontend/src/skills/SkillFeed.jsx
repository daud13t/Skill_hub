// src/skills/SkillFeed.jsx
import { useState, useEffect } from 'react';
import api from '../api/axios';

export default function SkillFeed({ onSelect }) {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/skills/')
      .then((res) => setSkills(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);



  return (
    <div className="skill-grid fade-in">
      {skills.map((skill) => (
        <div key={skill.id} className="skill-card" onClick={() => onSelect(skill.id)}>
          <span className="skill-card-category">{skill.category}</span>
          <h3 className="skill-card-title">{skill.title}</h3>
          <p className="skill-card-meta">Taught by {skill.tutor_username}. {skill.view_count} views.</p>
        </div>
      ))}
    </div>
  );
}