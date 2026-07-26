import { useEffect, useState } from 'react';
import { getApiBaseUrl, fetchJson } from '../utils/api';

export default function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadLeaderboard() {
      try {
        const baseUrl = getApiBaseUrl();
        const data = await fetchJson(`${baseUrl}/api/leaderboard/`);
        setEntries(Array.isArray(data) ? data : data.results || []);
      } catch (err) {
        setError(err.message || 'Unable to load leaderboard');
      } finally {
        setLoading(false);
      }
    }

    loadLeaderboard();
  }, []);

  return (
    <section>
      <h2 className="h4 fw-semibold mb-3">Leaderboard</h2>
      {loading && <p>Loading leaderboard…</p>}
      {error && <p className="text-danger">{error}</p>}
      {!loading && !error && (
        <div className="list-group">
          {entries.map((entry) => (
            <div className="list-group-item d-flex justify-content-between align-items-center" key={entry._id || entry.id || entry.rank}>
              <span>{entry.rank}. {entry.name}</span>
              <span className="fw-semibold">{entry.score}</span>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
