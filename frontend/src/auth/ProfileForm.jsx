import { useState, useEffect } from 'react';
import api from '../api/axios';

export default function ProfileForm() {
  const [bio, setBio] = useState('');
  const [contactLink, setContactLink] = useState('');
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    api.get('/accounts/profile/').then((res) => {
      setBio(res.data.bio || '');
      setContactLink(res.data.contact_link || '');
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSaved(false);
    try {
      await api.patch('/accounts/profile/', { bio, contact_link: contactLink });
      setSaved(true);
    } catch (err) {
      setError('Could not save. Make sure the contact link is a valid URL.');
    }
  };

  return (
    <div className="page">
      <h1 style={{ fontFamily: 'var(--font-display)', color: 'var(--navy)', marginBottom: 24 }}>
        Edit your profile
      </h1>
      <form onSubmit={handleSubmit} className="card">
        <div className="form-field">
          <label>Bio</label>
          <textarea
            rows={5}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Tell students a bit about yourself and what you teach."
          />
        </div>
        <div className="form-field">
          <label>Contact link</label>
          <input
            type="url"
            value={contactLink}
            onChange={(e) => setContactLink(e.target.value)}
            placeholder="https://wa.me/1234567890 or a Google Meet link"
          />
        </div>
        {error && <p className="error-text">{error}</p>}
        {saved && <p style={{ color: 'var(--orange)', fontSize: 14, marginBottom: 8 }}>Saved.</p>}
        <button type="submit" className="btn-primary" style={{ width: '100%' }}>Save</button>
      </form>
    </div>
  );
}