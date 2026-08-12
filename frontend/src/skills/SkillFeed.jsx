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

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2>Skills</h2>
      {skills.map((skill) => (
        <div key={skill.id} onClick={() => onSelect(skill.id)} style={{ cursor: 'pointer' }}>
          <h3>{skill.title}</h3>
          <p>{skill.category} · by {skill.tutor_username} · {skill.view_count} views</p>
        </div>
      ))}
    </div>
  );
}