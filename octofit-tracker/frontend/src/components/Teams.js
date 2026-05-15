import React, { useState, useEffect } from 'react';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const codespaceName = process.env.REACT_APP_CODESPACE_NAME || 'localhost';
        const apiUrl = `https://${codespaceName}-8000.app.github.dev/api/teams/`;
        
        console.log('Fetching teams from:', apiUrl);
        
        const response = await fetch(apiUrl);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Fetched teams data:', data);
        
        // Handle both paginated and plain array responses
        const teamsData = data.results || data;
        setTeams(Array.isArray(teamsData) ? teamsData : []);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching teams:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchTeams();
  }, []);

  if (loading) {
    return (
      <div className="container">
        <div className="alert alert-info" role="alert">
          <strong>Loading...</strong> Fetching teams data...
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

  return (
    <div className="container">
      <div className="row mb-4">
        <div className="col-12">
          <h2>👨‍👩‍👧‍👦 Teams</h2>
          <button className="btn btn-success">+ Create New Team</button>
        </div>
      </div>

      {teams.length === 0 ? (
        <div className="row">
          <div className="col-12">
            <div className="alert alert-info empty-state">
              <div className="empty-state-icon">👥</div>
              <h5>No teams found</h5>
              <p>Create a team to get started or join an existing one!</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="row">
          {teams.map((team) => (
            <div key={team.id} className="col-md-6 col-lg-4 mb-4">
              <div className="card">
                <div className="card-header">
                  <strong>{team.name || 'N/A'}</strong>
                </div>
                <div className="card-body">
                  <p className="card-text">{team.description || 'No description'}</p>
                  <div className="row mb-3">
                    <div className="col-6">
                      <small className="text-muted">Members:</small>
                      <br />
                      <strong>{team.members_count || team.members || '0'}</strong>
                    </div>
                    <div className="col-6">
                      <small className="text-muted">Created By:</small>
                      <br />
                      <strong>{team.created_by || 'N/A'}</strong>
                    </div>
                  </div>
                  <div className="d-grid gap-2">
                    <button className="btn btn-primary btn-sm">View Details</button>
                    <button className="btn btn-outline-secondary btn-sm">Join Team</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {teams.length > 0 && (
        <div className="row mt-4">
          <div className="col-12">
            <h3>All Teams</h3>
            <div className="table-responsive">
              <table className="table table-striped table-hover">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Team Name</th>
                    <th>Description</th>
                    <th>Members</th>
                    <th>Created By</th>
                    <th className="text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {teams.map((team) => (
                    <tr key={team.id}>
                      <td>
                        <span className="badge bg-primary">{team.id}</span>
                      </td>
                      <td>
                        <strong>{team.name || 'N/A'}</strong>
                      </td>
                      <td>
                        <small>{team.description || 'N/A'}</small>
                      </td>
                      <td>
                        <span className="badge bg-info">{team.members_count || team.members || '0'}</span>
                      </td>
                      <td>{team.created_by || 'N/A'}</td>
                      <td className="text-center">
                        <button className="btn btn-sm btn-success me-2" title="Join">
                          ✓
                        </button>
                        <button className="btn btn-sm btn-info me-2" title="View">
                          👁️
                        </button>
                        <button className="btn btn-sm btn-danger" title="Leave">
                          ✕
                        </button>
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

export default Teams;
