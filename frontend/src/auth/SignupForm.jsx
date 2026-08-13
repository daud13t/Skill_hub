// src/auth/SignupForm.jsx
import { useState } from 'react';
import api from '../api/axios';

export default function SignupForm({ onSignedUp, onSwitchToLogin }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await api.post('/accounts/register/', { username, email, password });
      onSignedUp();
    } catch (err) {
      setError('Signup failed. Username or email may already be taken.');
    }
  };

  return (
    <div className="auth-split">
      <div className="auth-hero">
        <div className="auth-hero-content">
          <span className="auth-hero-eyebrow">SkillsHub</span>
          <h1 className="auth-hero-headline">
            Teach what you know.<br />Learn what you don't.
          </h1>
          <p className="auth-hero-sub">
            One account, two sides. Switch between teaching and learning whenever you want.
          </p>
        </div>
        <div className="auth-hero-orbit">
          <div className="orbit-node node-1">Guitar</div>
          <div className="orbit-node node-2">Python</div>
          <div className="orbit-node node-3">Spanish</div>
          <div className="orbit-node node-4">Cooking</div>
        </div>
      </div>

      <div className="auth-panel">
        <div className="auth-panel-inner">
          <h2>Create your account</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-field">
              <label>Username</label>
              <input value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div className="form-field">
              <label>Email</label>
              <input value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="form-field">
              <label>Password</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            {error && <p className="error-text">{error}</p>}
            <button type="submit" className="btn-primary" style={{ width: '100%' }}>Sign Up</button>
            <p className="link-text" onClick={onSwitchToLogin}>Already have an account? Log in</p>
          </form>
        </div>
      </div>
    </div>
  );
}