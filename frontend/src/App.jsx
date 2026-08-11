// src/App.jsx
import { AuthProvider, useAuth } from './auth/AuthContext';
import LoginForm from './auth/LoginForm';

function AppContent() {
  const { user, logout } = useAuth();

  if (!user) {
    return <LoginForm />;
  }

  return (
    <div>
      <p>Logged in as {user.username}</p>
      <button onClick={logout}>Log Out</button>
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