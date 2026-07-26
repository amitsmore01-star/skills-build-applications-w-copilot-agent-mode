import { useEffect, useState } from 'react';
import { fetchJson } from '../utils/api';

export default function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadTeams() {
      try {
        const apiUrl = import.meta.env.VITE_CODESPACE_NAME
          ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/teams/`
          : 'http://localhost:8000/api/teams/';
        const data = await fetchJson(apiUrl);
        setTeams(Array.isArray(data) ? data : data.results || []);
      } catch (err) {
        setError(err.message || 'Unable to load teams');
      } finally {
        setLoading(false);
      }
    }

    loadTeams();
  }, []);

  return (
    <section>
      <h2 className="h4 fw-semibold mb-3">Teams</h2>
      {loading && <p>Loading teams…</p>}
      {error && <p className="text-danger">{error}</p>}
      {!loading && !error && (
        <div className="row g-3">
          {teams.map((team) => (
            <div className="col-md-6" key={team._id || team.id || team.name}>
              <div className="card h-100 shadow-sm border-0">
                <div className="card-body">
                  <h3 className="h6 fw-semibold">{team.name}</h3>
                  <p className="mb-1 text-muted">Sport: {team.sport}</p>
                  <p className="mb-0">Members: {team.members?.join(', ') || 'N/A'}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
