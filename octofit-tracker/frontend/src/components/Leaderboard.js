import React, { useState, useEffect } from 'react';

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('');
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const codespaceName = process.env.REACT_APP_CODESPACE_NAME || 'localhost';
  const apiUrl = `https://${codespaceName}-8000.app.github.dev/api/leaderboard/`;

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        console.log('Fetching leaderboard from:', apiUrl);
        const response = await fetch(apiUrl);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Fetched leaderboard data:', data);

        const leaderboardData = Array.isArray(data.results) ? data.results : data;
        setLeaderboard(Array.isArray(leaderboardData) ? leaderboardData : []);
      } catch (fetchError) {
        console.error('Error fetching leaderboard:', fetchError);
        setError(fetchError.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, [apiUrl]);

  const filteredLeaderboard = leaderboard.filter((entry) => {
    const text = `${entry.user_name || entry.user || ''} ${entry.team_name || entry.team || ''}`.toLowerCase();
    return text.includes(filter.toLowerCase());
  });

  const openModal = (entry) => {
    setSelectedEntry(entry);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedEntry(null);
    setShowModal(false);
  };

  const getMedalEmoji = (index) => {
    if (index === 0) return '🥇';
    if (index === 1) return '🥈';
    if (index === 2) return '🥉';
    return '👤';
  };

  const renderModal = () => {
    if (!showModal || !selectedEntry) return null;

    return (
      <>
        <div className="modal fade show d-block" tabIndex="-1" role="dialog" onClick={closeModal}>
          <div className="modal-dialog modal-lg modal-dialog-centered" role="document" onClick={(event) => event.stopPropagation()}>
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Leaderboard Entry</h5>
                <button type="button" className="btn-close" aria-label="Close" onClick={closeModal} />
              </div>
              <div className="modal-body">
                <p><strong>User:</strong> {selectedEntry.user_name || selectedEntry.user || 'N/A'}</p>
                <p><strong>Team:</strong> {selectedEntry.team_name || selectedEntry.team || 'N/A'}</p>
                <p><strong>Score:</strong> {selectedEntry.score || 'N/A'}</p>
                <p><strong>Total Points:</strong> {selectedEntry.total_points || selectedEntry.points || 'N/A'}</p>
                <p><strong>Rank:</strong> {selectedEntry.rank || 'N/A'}</p>
                <p><strong>ID:</strong> {selectedEntry.id || 'N/A'}</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={closeModal}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="modal-backdrop fade show" />
      </>
    );
  };

  if (loading) {
    return (
      <div className="container py-4">
        <div className="alert alert-info">Loading leaderboard data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-4">
        <div className="alert alert-danger">Error fetching leaderboard: {error}</div>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-start mb-4 gap-3">
        <div>
          <h2>🏆 Leaderboard</h2>
          <p className="text-muted">Competition standings pulled from the backend API.</p>
        </div>
        <button className="btn btn-success" onClick={() => window.location.reload()}>
          Refresh
        </button>
      </div>

      <form className="row g-3 align-items-center mb-4" onSubmit={(event) => event.preventDefault()}>
        <div className="col-md-8">
          <div className="input-group">
            <span className="input-group-text">Search</span>
            <input
              type="search"
              className="form-control"
              placeholder="Search by user or team..."
              value={filter}
              onChange={(event) => setFilter(event.target.value)}
            />
          </div>
        </div>
        <div className="col-md-4 text-md-end text-muted">Endpoint: {apiUrl}</div>
      </form>

      {filteredLeaderboard.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">📊</div>
          <h5>No leaderboard entries found</h5>
          <p>Update the backend data or adjust your search terms to see scores.</p>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-hover align-middle">
            <thead>
              <tr>
                <th>Rank</th>
                <th>User</th>
                <th>Team</th>
                <th className="text-end">Score</th>
                <th className="text-end">Points</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredLeaderboard.map((entry, index) => (
                <tr key={entry.id || index}>
                  <td>{getMedalEmoji(index)} {index + 1}</td>
                  <td>{entry.user_name || entry.user || 'N/A'}</td>
                  <td>{entry.team_name || entry.team || 'N/A'}</td>
                  <td className="text-end">{entry.score || 'N/A'}</td>
                  <td className="text-end">{entry.total_points || entry.points || 'N/A'}</td>
                  <td>
                    <button type="button" className="btn btn-sm btn-primary" onClick={() => openModal(entry)}>
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {renderModal()}
    </div>
  );
}

export default Leaderboard;
