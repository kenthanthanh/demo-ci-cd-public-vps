import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { postApi } from '../../services/api';
import type { Post } from '../../types';
import './Posts.css';

function PostDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    postApi
      .getById(id)
      .then(setPost)
      .catch(() => setError('Failed to load post.'))
      .finally(() => setLoading(false));
  }, [id]);

  const handleDelete = async () => {
    if (!id || !confirm('Are you sure you want to delete this post?')) return;
    try {
      await postApi.delete(id);
      navigate('/posts');
    } catch {
      setError('Failed to delete post.');
    }
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="alert alert-error">{error}</div>;
  if (!post) return <div className="alert alert-error">Post not found.</div>;

  return (
    <div className="post-detail">
      <Link to="/posts" className="back-link">
        &larr; Back to posts
      </Link>

      <article className="post-article">
        <h1>{post.title}</h1>
        <div className="post-meta">
          <span>By {post.author}</span>
          <span>{new Date(post.created_at).toLocaleDateString()}</span>
        </div>
        <div className="post-content">{post.content}</div>
      </article>

      <div className="post-actions">
        <Link to={`/posts/${post._id}/edit`} className="btn btn-outline btn-sm">
          Edit
        </Link>
        <button onClick={handleDelete} className="btn btn-danger btn-sm">
          Delete
        </button>
      </div>
    </div>
  );
}

export default PostDetailPage;
