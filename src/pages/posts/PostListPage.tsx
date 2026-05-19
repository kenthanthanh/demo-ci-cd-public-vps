import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { postApi } from '../../services/api';
import type { Post, PaginatedResponse } from '../../types';
import './Posts.css';

function PostListPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [pagination, setPagination] = useState({ currentPage: 1, lastPage: 1, total: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPosts = async (page: number) => {
    setLoading(true);
    setError(null);
    try {
      const res: PaginatedResponse<Post> = await postApi.getAll(page);
      setPosts(res.data);
      setPagination({
        currentPage: res.current_page,
        lastPage: res.last_page,
        total: res.total,
      });
    } catch {
      setError('Failed to load posts. Make sure the backend is running.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts(1);
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this post?')) return;
    try {
      await postApi.delete(id);
      fetchPosts(pagination.currentPage);
    } catch {
      setError('Failed to delete post.');
    }
  };

  return (
    <div className="posts-page">
      <div className="posts-header">
        <h1>Posts</h1>
        <Link to="/posts/create" className="btn btn-primary btn-sm">
          + New Post
        </Link>
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      {loading ? (
        <div className="loading">Loading...</div>
      ) : posts.length === 0 ? (
        <div className="empty-state">
          <p>No posts yet.</p>
          <Link to="/posts/create" className="btn btn-primary btn-sm">
            Create your first post
          </Link>
        </div>
      ) : (
        <>
          <div className="posts-table-wrapper">
            <table className="posts-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Author</th>
                  <th>Created</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {posts.map((post) => (
                  <tr key={post._id}>
                    <td>
                      <Link to={`/posts/${post._id}`} className="post-link">
                        {post.title}
                      </Link>
                    </td>
                    <td>{post.author}</td>
                    <td>{new Date(post.created_at).toLocaleDateString()}</td>
                    <td>
                      <div className="action-buttons">
                        <Link to={`/posts/${post._id}/edit`} className="btn btn-outline btn-xs">
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDelete(post._id)}
                          className="btn btn-danger btn-xs"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {pagination.lastPage > 1 && (
            <div className="pagination">
              <button
                onClick={() => fetchPosts(pagination.currentPage - 1)}
                disabled={pagination.currentPage <= 1}
                className="btn btn-outline btn-xs"
              >
                Prev
              </button>
              <span className="pagination-info">
                Page {pagination.currentPage} / {pagination.lastPage} (Total: {pagination.total})
              </span>
              <button
                onClick={() => fetchPosts(pagination.currentPage + 1)}
                disabled={pagination.currentPage >= pagination.lastPage}
                className="btn btn-outline btn-xs"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default PostListPage;
