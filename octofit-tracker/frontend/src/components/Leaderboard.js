import React, { useState, useEffect } from 'react';

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const codespaceName = process.env.REACT_APP_CODESPACE_NAME || 'localhost';
        const apiUrl = `https://${codespaceName}-8000.app.github.dev/api/leaderboard/`;
        
        console.log('Fetching leaderboard from:', apiUrl);
        
        const response = await fetch(apiUrl);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Fetched leaderboard data:', data);
        
        // Handle both paginated and plain array responses
        const leaderboardData = data.results || data;
        setLeaderboard(Array.isArray(leaderboardData) ? leaderboardData : []);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching leaderboard:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  if (loading) {
    return (
      <div className="container">
        <div className="alert alert-info" role="alert">
          <strong>Loading...</strong> Fetching leaderboard data...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <div className="alert alert-danger" role="alert">
          <strong>Error:</strong> {error}
        </div>
      </div>
    );
  }

  const getMedalEmoji = (index) => {
    if (index === 0) return '🥇';
    if (index === 1) return '🥈';
    if (index === 2) return '🥉';
    return '👤';
  };

  return (
    <div className="container">
      <div className="row mb-4">
        <div className="col-12">
          <h2>🏆 Leaderboard</h2>
        </div>
      </div>

      {leaderboard.length === 0 ? (
        <div className="row">
          <div className="col-12">
            <div className="alert alert-info empty-state">
              <div className="empty-state-icon">📊</div>
              <h5>No leaderboard data available</h5>
              <p>Start competing to see the leaderboard!</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="row">
          <div className="col-12">
            <div className="table-responsive">
              <table className="table table-striped table-hover">
                <thead>
                  <tr>
                    <th className="text-center">Rank</th>
                    <th>User</th>
                    <th>Team</th>
                    <th className="text-end">Score</th>
                    <th className="text-end">Total Points</th>
                  </tr>
                </thead>
                <tbody>
                  {leaderboard.map((entry, index) => (
                    <tr key={entry.id || index}>
                      <td className="text-center">
                        <span className="badge bg-success fs-6">
                          {getMedalEmoji(index)} {index + 1}
                        </span>
                      </td>
                      <td>
                        <strong>{entry.user_name || entry.user || 'N/A'}</strong>
                      </td>
                      <td>
                        <span className="badge bg-info">{entry.team_name || entry.team || 'Solo'}</span>
                      </td>
                      <td className="text-end">
                        <strong>{entry.score || 'N/A'}</strong>
                      </td>
                      <td className="text-end">
                        <span className="badge bg-warning">{entry.total_points || entry.points || 'N/A'}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Leaderboard;
