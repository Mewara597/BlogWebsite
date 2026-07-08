import api from './api';

export async function fetchBlogs() {
  const response = await api.get('/blogs');
  return response.data;
}

export async function createBlog(blogData) {
  const response = await api.post('/blogs', blogData);
  return response.data;
}

export async function getBlog(id) {
  const response = await api.get(`/blogs/${id}`);
  return response.data;
}

export async function updateBlog(id, blogData) {
  const response = await api.put(`/blogs/${id}`, blogData);
  return response.data;
}

export async function deleteBlog(id) {
  const response = await api.delete(`/blogs/${id}`);
  return response.data;
}
