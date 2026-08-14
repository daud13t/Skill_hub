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
import ProfileForm from './auth/ProfileForm';
import TutorProfile from './skills/TutorProfile';
import api from './api/axios';

function AppContent() {
  const { user, logout, checkingAuth } = useAuth();
  const [authView, setAuthView] = useState('login');
  const [view, setView] = useState('feed');
  const [selectedSkillId, setSelectedSkillId] = useState(null);
  const [mode, setMode] = useState('student');
  const [profileUserId, setProfileUserId] = useState(null);

  useEffect(() => {
    if (user) {
      api.get('/accounts/profile/').then((res) => setMode(res.data.current_mode));
    }
  }, [user]);

  if (checkingAuth) {
    return (
      <div style={{ padding: 48, textAlign: 'center', color: 'var(--gray)' }}>
        Loading.
      </div>
    );
  }

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
          <button className={`nav-link ${view === 'feed' ? 'active' : ''}`} onClick={() => { setView('feed'); setProfileUserId(null); }}>Feed</button>
          {mode === 'tutor' && <button className={`nav-link ${view === 'post' ? 'active' : ''}`} onClick={() => { setView('post'); setProfileUserId(null); }}>Post a Skill</button>}
          <button className={`nav-link ${view === 'bookings' ? 'active' : ''}`} onClick={() => { setView('bookings'); setProfileUserId(null); }}>My Bookings</button>
          <button className={`nav-link ${view === 'profile' ? 'active' : ''}`} onClick={() => { setView('profile'); setProfileUserId(null); }}>My Profile</button>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <ModeToggle onModeChange={setMode} />
          {mode === 'tutor' && <AvailabilityToggle />}
          <span className="nav-user">{user.username}</span>
          <button className="nav-link" onClick={logout}>Log out</button>
        </div>
      </nav>

      {profileUserId && (
        <TutorProfile
          userId={profileUserId}
          onBack={() => setProfileUserId(null)}
          onSelectSkill={(skillId) => {
            setProfileUserId(null);
            setView('feed');
            setSelectedSkillId(skillId);
          }}
        />
      )}

      {!profileUserId && view === 'feed' && !selectedSkillId && (
        <SkillFeed
          onSelect={(id) => setSelectedSkillId(id)}
          onSelectTutor={(id) => setProfileUserId(id)}
        />
      )}
      {!profileUserId && view === 'feed' && selectedSkillId && (
        <SkillDetail
          skillId={selectedSkillId}
          onBack={() => setSelectedSkillId(null)}
          onSelectTutor={(id) => setProfileUserId(id)}
        />
      )}
      {!profileUserId && view === 'post' && mode === 'tutor' && <SkillForm onCreated={() => setView('feed')} />}
      {!profileUserId && view === 'bookings' && <MyBookings />}
      {!profileUserId && view === 'profile' && <ProfileForm />}
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