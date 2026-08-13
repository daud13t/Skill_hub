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
      setError('Could not post this skill. Check the fields and try again.');
    }
  };

  return (
    <div className="page">
      <h1 style={{ fontFamily: 'var(--font-display)', color: 'var(--navy)', marginBottom: 24 }}>Post a skill</h1>
      <form onSubmit={handleSubmit} className="card">
        <div className="form-field">
          <label>Title</label>
          <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Intro to acoustic guitar" />
        </div>
        <div className="form-field">
          <label>Category</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            {CATEGORIES.map((c) => <option key={c} value={c}>{c[0].toUpperCase() + c.slice(1)}</option>)}
          </select>
        </div>
        <div className="form-field">
          <label>Description</label>
          <textarea rows={5} value={description} onChange={(e) => setDescription(e.target.value)} placeholder="What will students learn?" />
        </div>
        {error && <p className="error-text">{error}</p>}
        <button type="submit" className="btn-primary" style={{ width: '100%' }}>Post skill</button>
      </form>
    </div>
  );
}