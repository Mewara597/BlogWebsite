import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import BlogForm from './pages/BlogForm';
import { getCurrentUser } from './services/auth';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUser() {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
      setLoading(false);
    }
    loadUser();
  }, []);

  if (loading) return <div className="container">Loading...</div>;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to={user ? '/dashboard' : '/login'} />} />
        <Route path="/login" element={<Login onAuth={setUser} />} />
        <Route path="/register" element={<Register onAuth={setUser} />} />
        <Route path="/dashboard" element={user ? <Dashboard user={user} onLogout={() => setUser(null)} /> : <Navigate to="/login" />} />
        <Route path="/blog/new" element={user ? <BlogForm user={user} /> : <Navigate to="/login" />} />
        <Route path="/blog/edit/:id" element={user ? <BlogForm user={user} /> : <Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
