import { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './auth/AuthContext';
import LoginForm from './auth/LoginForm';
import SignupForm from './auth/SignupForm';
import ModeToggle from './auth/ModeToggle';
import SkillFeed from './skills/SkillFeed';
import SkillDetail from './skills/SkillDetail';
import SkillForm from './skills/SkillForm';
import MyBookings from './bookings/MyBookings';
import AvailabilityToggle from './bookings/AvailabilityToggle';
import api from './api/axios';

function AppContent() {
  const { user, logout, checkingAuth } = useAuth();
  const [authView, setAuthView] = useState('login');
  const [view, setView] = useState('feed');
  const [selectedSkillId, setSelectedSkillId] = useState(null);
  const [mode, setMode] = useState('student');

  useEffect(() => {
    if (user) {
      api.get('/accounts/profile/').then((res) => setMode(res.data.current_mode));
    }
  }, [user]);

  if (!user) {
    return authView === 'login' ? (
      <LoginForm onSwitchToSignup={() => setAuthView('signup')} />
    ) : (
      <SignupForm
        onSignedUp={() => setAuthView('login')}
        onSwitchToLogin={() => setAuthView('login')}
      />
    );
  }

  return (
    <div>
      <nav className="nav-bar">
        <span className="nav-brand">SkillsHub</span>
        <div className="nav-links">
          <button className={`nav-link ${view === 'feed' ? 'active' : ''}`} onClick={() => setView('feed')}>Feed</button>
          {mode === 'tutor' && <button className={`nav-link ${view === 'post' ? 'active' : ''}`} onClick={() => setView('post')}>Post a Skill</button>}
          <button className={`nav-link ${view === 'bookings' ? 'active' : ''}`} onClick={() => setView('bookings')}>My Bookings</button>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <ModeToggle onModeChange={setMode} />
          {mode === 'tutor' && <AvailabilityToggle />}
          <span className="nav-user">{user.username}</span>
          <button className="nav-link" onClick={logout}>Log out</button>
        </div>
      </nav>

      {view === 'feed' && !selectedSkillId && (
        <SkillFeed onSelect={(id) => setSelectedSkillId(id)} />
      )}
      {view === 'feed' && selectedSkillId && (
        <SkillDetail skillId={selectedSkillId} onBack={() => setSelectedSkillId(null)} />
      )}
      {view === 'post' && mode === 'tutor' && <SkillForm onCreated={() => setView('feed')} />}
      {view === 'bookings' && <MyBookings />}
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;