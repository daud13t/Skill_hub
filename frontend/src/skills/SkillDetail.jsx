import { useState, useEffect } from 'react';
import api from '../api/axios';

export default function SkillDetail({ skillId, onBack }) {
  const [skill, setSkill] = useState(null);

  useEffect(() => {
    api.get(`/skills/${skillId}/`)
      .then((res) => setSkill(res.data));
  }, [skillId]);

  if (!skill) return <p>Loading...</p>;

  return (
    <div>
      <button onClick={onBack}>← Back</button>
      <h2>{skill.title}</h2>
      <p>{skill.category} · by {skill.tutor_username}</p>
      <p>{skill.description}</p>
      <p>{skill.view_count} views</p>
    </div>
  );
}