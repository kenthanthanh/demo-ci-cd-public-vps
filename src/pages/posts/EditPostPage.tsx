import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { postApi } from '../../services/api';
import type { PostFormData } from '../../types';
import './Posts.css';

function EditPostPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<PostFormData>({
    title: '',
    content: '',
    author: '',
  });
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!id) return;
    postApi
      .getById(id)
      .then((post) => {
        setFormData({ title: post.title, content: post.content, author: post.author });
      })
      .catch(() => {
        navigate('/posts');
      })
      .finally(() => setLoading(false));
  }, [id, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;
    setSubmitting(true);
    setErrors({});

    try {
      await postApi.update(id, formData);
      navigate('/posts');
    } catch (err: unknown) {
      if (err && typeof err === 'object' && 'response' in err) {
        const axiosErr = err as { response?: { data?: { errors?: Record<string, string[]> } } };
        if (axiosErr.response?.data?.errors) {
          setErrors(axiosErr.response.data.errors);
        }
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="post-form-page">
      <Link to="/posts" className="back-link">
        &larr; Back to posts
      </Link>
      <h1>Edit Post</h1>

      <form onSubmit={handleSubmit} className="post-form">
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            id="title"
            name="title"
            type="text"
            value={formData.title}
            onChange={handleChange}
            required
            maxLength={255}
          />
          {errors.title && <span className="field-error">{errors.title[0]}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="author">Author</label>
          <input
            id="author"
            name="author"
            type="text"
            value={formData.author}
            onChange={handleChange}
            required
            maxLength={100}
          />
          {errors.author && <span className="field-error">{errors.author[0]}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            required
            rows={8}
          />
          {errors.content && <span className="field-error">{errors.content[0]}</span>}
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary btn-sm" disabled={submitting}>
            {submitting ? 'Saving...' : 'Save Changes'}
          </button>
          <Link to="/posts" className="btn btn-outline btn-sm">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}

export default EditPostPage;
