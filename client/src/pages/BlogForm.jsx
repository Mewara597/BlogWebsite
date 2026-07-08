import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createBlog, getBlog, updateBlog } from '../services/blogs';

export default function BlogForm() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (!id) return;
    async function loadBlog() {
      try {
        const data = await getBlog(id);
        setTitle(data.title);
        setContent(data.content);
      } catch (err) {
        setError('Could not load blog');
      }
    }
    loadBlog();
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    if (!title || !content) {
      setError('Title and content are required');
      return;
    }

    try {
      if (id) {
        await updateBlog(id, { title, content });
      } else {
        await createBlog({ title, content });
      }
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Could not save blog');
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h2>{id ? 'Edit Blog' : 'New Blog'}</h2>
        {error && <div className="error">{error}</div>}
        <form onSubmit={handleSubmit}>
          <label>Title</label>
          <input value={title} onChange={(e) => setTitle(e.target.value)} required />
          <label>Content</label>
          <textarea rows="10" value={content} onChange={(e) => setContent(e.target.value)} required />
          <button type="submit">{id ? 'Update Blog' : 'Create Blog'}</button>
          <button type="button" className="secondary" onClick={() => navigate('/dashboard')} style={{ marginLeft: '8px' }}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}
