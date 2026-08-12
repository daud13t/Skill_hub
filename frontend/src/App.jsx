import { useState } from 'react';
import { AuthProvider, useAuth } from './auth/AuthContext';
import LoginForm from './auth/LoginForm';
import SkillFeed from './skills/SkillFeed';
import SkillDetail from './skills/SkillDetail';
import SkillForm from './skills/SkillForm';
import MyBookings from './bookings/MyBookings';
import AvailabilityToggle from './bookings/AvailabilityToggle';

function AppContent() {
  const { user, logout } = useAuth();
  const [view, setView] = useState('feed');
  const [selectedSkillId, setSelectedSkillId] = useState(null);

  if (!user) {
    return <LoginForm />;
  }

  return (
    <div>
      <nav>
        <span>Logged in as {user.username}</span>
        <button onClick={() => setView('feed')}>Feed</button>
        <button onClick={() => setView('post')}>Post a Skill</button>
        <button onClick={() => setView('bookings')}>My Bookings</button>
        <AvailabilityToggle />
        <button onClick={logout}>Log Out</button>
      </nav>

      {view === 'feed' && !selectedSkillId && (
        <SkillFeed onSelect={(id) => setSelectedSkillId(id)} />
      )}
      {view === 'feed' && selectedSkillId && (
        <SkillDetail skillId={selectedSkillId} onBack={() => setSelectedSkillId(null)} />
      )}
      {view === 'post' && (
        <SkillForm onCreated={() => setView('feed')} />
      )}
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