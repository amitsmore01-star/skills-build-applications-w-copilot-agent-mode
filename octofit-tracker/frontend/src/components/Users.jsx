import { useEffect, useState } from 'react';
import { getApiBaseUrl, fetchJson } from '../utils/api';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadUsers() {
      try {
        const baseUrl = getApiBaseUrl();
        const data = await fetchJson(`${baseUrl}/api/users/`);
        setUsers(Array.isArray(data) ? data : data.results || []);
      } catch (err) {
        setError(err.message || 'Unable to load users');
      } finally {
        setLoading(false);
      }
    }

    loadUsers();
  }, []);

  return (
    <section>
      <h2 className="h4 fw-semibold mb-3">Users</h2>
      {loading && <p>Loading users…</p>}
      {error && <p className="text-danger">{error}</p>}
      {!loading && !error && (
        <div className="row g-3">
          {users.map((user) => (
            <div className="col-md-6" key={user._id || user.id || user.email}>
              <div className="card h-100 shadow-sm border-0">
                <div className="card-body">
                  <h3 className="h6 fw-semibold">{user.name}</h3>
                  <p className="mb-1 text-muted">{user.email}</p>
                  <p className="mb-1"><strong>Goal:</strong> {user.fitnessGoal}</p>
                  <p className="mb-0"><strong>Level:</strong> {user.level}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
