import api from './api';

export async function register({ name, email, password }) {
  const response = await api.post('/auth/register', { name, email, password });
  return response.data;
}

export async function login({ email, password }) {
  const response = await api.post('/auth/login', { email, password });
  return response.data;
}

export async function getCurrentUser() {
  const token = localStorage.getItem('authToken');
  if (!token) return null;

  try {
    const response = await api.get('/auth/me');
    return response.data;
  } catch (error) {
    localStorage.removeItem('authToken');
    return null;
  }
}
