import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { fetchBlogs, deleteBlog } from '../services/blogs';

export default function Dashboard({ user, onLogout }) {
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState('');
  const [selectedBlog, setSelectedBlog] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadBlogs() {
      try {
        const data = await fetchBlogs();
        setBlogs(data);
      } catch (err) {
        setError('Could not load blogs');
      }
    }
    loadBlogs();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    onLogout();
    navigate('/login');
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this blog?')) return;
    try {
      await deleteBlog(id);
      setBlogs(blogs.filter((blog) => blog._id !== id));
    } catch (err) {
      setError('Could not delete blog');
    }
  };

  return (
    <div className="container">
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h2>Welcome, {user.name}</h2>
            <p>{user.email}</p>
          </div>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>

      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3>Your Blogs</h3>
          <button onClick={() => navigate('/blog/new')}>Add New Blog</button>
        </div>
        {error && <div className="error">{error}</div>}
        {blogs.length === 0 ? (
          <p>No blogs yet. Create your first post.</p>
        ) : (
          <div className="blog-row">
            {blogs.map((blog) => (
              <div key={blog._id} className="blog-item">
                <h3>{blog.title}</h3>
                <p>{blog.content.slice(0, 150)}...</p>
                <div style={{ margin: '10px 0', color: '#cbd5e1', fontSize: '0.95rem' }}>
                  <strong>Date:</strong> {new Date(blog.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </div>
                <div className="blog-actions">
                  <button onClick={() => setSelectedBlog(blog)}>View</button>
                  <button onClick={() => navigate(`/blog/edit/${blog._id}`)}>Edit</button>
                  <button className="secondary" onClick={() => handleDelete(blog._id)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {selectedBlog && (
        <div className="card" style={{ position: 'fixed', inset: 0, background: 'rgba(15, 23, 42, 0.65)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' }}>
          <div style={{ width: '100%', maxWidth: '700px', maxHeight: '85vh', background: 'white', color: '#0f172a', borderRadius: '16px', padding: '24px', position: 'relative', overflow: 'hidden' }}>
            <button className="secondary" style={{ position: 'absolute', top: '12px', right: '12px' }} onClick={() => setSelectedBlog(null)}>Close</button>
            <h3 style={{ marginRight: '90px' }}>{selectedBlog.title}</h3>
            <p style={{ color: '#64748b', marginTop: '6px' }}>
              Written on {new Date(selectedBlog.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
            <div style={{ marginTop: '16px', overflowY: 'auto', maxHeight: '65vh', paddingRight: '8px', whiteSpace: 'pre-wrap', lineHeight: 1.7 }}>
              {selectedBlog.content}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
