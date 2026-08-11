import { useState } from 'react';
import api from '../api/axios';

const CATEGORIES = ['programming', 'music', 'cooking', 'languages', 'fitness', 'art', 'other'];

export default function SkillForm({ onCreated }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/skills/', { title, description, category });
      setTitle('');
      setDescription('');
      onCreated();
    } catch (err) {
      setError('Failed to create skill.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Post a Skill</h2>
      <input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
      <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
      </select>
      {error && <p>{error}</p>}
      <button type="submit">Post</button>
    </form>
  );
}