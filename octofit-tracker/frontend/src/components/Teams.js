import React, { useState, useEffect } from 'react';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('');
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const codespaceName = process.env.REACT_APP_CODESPACE_NAME || 'localhost';
  const apiUrl = `https://${codespaceName}-8000.app.github.dev/api/teams/`;

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        console.log('Fetching teams from:', apiUrl);
        const response = await fetch(apiUrl);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Fetched teams data:', data);

        const teamsData = Array.isArray(data.results) ? data.results : data;
        setTeams(Array.isArray(teamsData) ? teamsData : []);
      } catch (fetchError) {
        console.error('Error fetching teams:', fetchError);
        setError(fetchError.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTeams();
  }, [apiUrl]);

  const filteredTeams = teams.filter((team) => {
    const search = `${team.name || ''} ${team.description || ''} ${team.created_by || ''}`.toLowerCase();
    return search.includes(filter.toLowerCase());
  });

  const openModal = (team) => {
    setSelectedTeam(team);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedTeam(null);
    setShowModal(false);
  };

  const renderModal = () => {
    if (!showModal || !selectedTeam) return null;

    return (
      <>
        <div className="modal fade show d-block" tabIndex="-1" role="dialog" onClick={closeModal}>
          <div className="modal-dialog modal-lg modal-dialog-centered" role="document" onClick={(event) => event.stopPropagation()}>
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Team Details</h5>
                <button type="button" className="btn-close" aria-label="Close" onClick={closeModal} />
              </div>
              <div className="modal-body">
                <p><strong>Name:</strong> {selectedTeam.name || 'N/A'}</p>
                <p><strong>Description:</strong> {selectedTeam.description || 'N/A'}</p>
                <p><strong>Members:</strong> {selectedTeam.members_count || selectedTeam.members || 'N/A'}</p>
                <p><strong>Created By:</strong> {selectedTeam.created_by || 'N/A'}</p>
                <p><strong>ID:</strong> {selectedTeam.id || 'N/A'}</p>
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
        <div className="alert alert-info">Loading teams data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-4">
        <div className="alert alert-danger">Error fetching teams: {error}</div>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-start gap-3 mb-4">
        <div>
          <h2>👨‍👩‍👧‍👦 Teams</h2>
          <p className="text-muted">Team data from the Django REST API endpoint.</p>
        </div>
        <div className="d-flex gap-2">
          <button className="btn btn-success" onClick={() => window.location.reload()}>
            Refresh
          </button>
          <button className="btn btn-primary">+ Create New Team</button>
        </div>
      </div>

      <form className="row g-3 align-items-center mb-4" onSubmit={(event) => event.preventDefault()}>
        <div className="col-md-8">
          <div className="input-group">
            <span className="input-group-text">Search</span>
            <input
              type="search"
              className="form-control"
              placeholder="Search teams..."
              value={filter}
              onChange={(event) => setFilter(event.target.value)}
            />
          </div>
        </div>
        <div className="col-md-4 text-md-end text-muted">Endpoint: {apiUrl}</div>
      </form>

      {filteredTeams.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">👥</div>
          <h5>No teams found</h5>
          <p>Use the backend API to add teams or adjust your search.</p>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-hover align-middle">
            <thead>
              <tr>
                <th>ID</th>
                <th>Team Name</th>
                <th>Description</th>
                <th>Members</th>
                <th>Created By</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTeams.map((team, index) => (
                <tr key={team.id || index}>
                  <td>{team.id || 'N/A'}</td>
                  <td>{team.name || 'N/A'}</td>
                  <td>{team.description || 'N/A'}</td>
                  <td>{team.members_count || team.members || '0'}</td>
                  <td>{team.created_by || 'N/A'}</td>
                  <td>
                    <button type="button" className="btn btn-sm btn-primary" onClick={() => openModal(team)}>
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

export default Teams;
