import React, { useState, useEffect } from 'react';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('');
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const codespaceName = process.env.REACT_APP_CODESPACE_NAME || 'localhost';
  const apiUrl = `https://${codespaceName}-8000.app.github.dev/api/workouts/`;

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        console.log('Fetching workouts from:', apiUrl);
        const response = await fetch(apiUrl);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Fetched workouts data:', data);

        const workoutsData = Array.isArray(data.results) ? data.results : data;
        setWorkouts(Array.isArray(workoutsData) ? workoutsData : []);
      } catch (fetchError) {
        console.error('Error fetching workouts:', fetchError);
        setError(fetchError.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkouts();
  }, [apiUrl]);

  const filteredWorkouts = workouts.filter((workout) => {
    const search = `${workout.name || ''} ${workout.description || ''} ${workout.difficulty || ''}`.toLowerCase();
    return search.includes(filter.toLowerCase());
  });

  const getDifficultyBadgeColor = (difficulty) => {
    if (!difficulty) return 'secondary';
    const level = difficulty.toLowerCase();
    if (level === 'easy' || level === 'beginner') return 'success';
    if (level === 'medium' || level === 'intermediate') return 'warning';
    if (level === 'hard' || level === 'advanced') return 'danger';
    return 'info';
  };

  const openModal = (workout) => {
    setSelectedWorkout(workout);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedWorkout(null);
    setShowModal(false);
  };

  const renderModal = () => {
    if (!showModal || !selectedWorkout) return null;

    return (
      <>
        <div className="modal fade show d-block" tabIndex="-1" role="dialog" onClick={closeModal}>
          <div className="modal-dialog modal-lg modal-dialog-centered" role="document" onClick={(event) => event.stopPropagation()}>
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Workout Details</h5>
                <button type="button" className="btn-close" aria-label="Close" onClick={closeModal} />
              </div>
              <div className="modal-body">
                <p><strong>Name:</strong> {selectedWorkout.name || 'N/A'}</p>
                <p><strong>Description:</strong> {selectedWorkout.description || 'N/A'}</p>
                <p><strong>Duration:</strong> {selectedWorkout.duration || 'N/A'} minutes</p>
                <p><strong>Difficulty:</strong> {selectedWorkout.difficulty || 'N/A'}</p>
                <p><strong>ID:</strong> {selectedWorkout.id || 'N/A'}</p>
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
        <div className="alert alert-info">Loading workouts data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-4">
        <div className="alert alert-danger">Error fetching workouts: {error}</div>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-start gap-3 mb-4">
        <div>
          <h2>💪 Workouts</h2>
          <p className="text-muted">Workouts pulled from the Django REST API endpoint.</p>
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
              placeholder="Search workouts..."
              value={filter}
              onChange={(event) => setFilter(event.target.value)}
            />
          </div>
        </div>
        <div className="col-md-4 text-md-end text-muted">Endpoint: {apiUrl}</div>
      </form>

      {filteredWorkouts.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">🏋️</div>
          <h5>No workouts found</h5>
          <p>Use the backend API to add workout plans or adjust your search.</p>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-hover align-middle">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Description</th>
                <th>Duration</th>
                <th>Difficulty</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredWorkouts.map((workout, index) => (
                <tr key={workout.id || index}>
                  <td>{workout.id || 'N/A'}</td>
                  <td>{workout.name || 'N/A'}</td>
                  <td>{workout.description || 'N/A'}</td>
                  <td>{workout.duration || 'N/A'}</td>
                  <td>
                    <span className={`badge bg-${getDifficultyBadgeColor(workout.difficulty)}`}>
                      {workout.difficulty || 'N/A'}
                    </span>
                  </td>
                  <td>
                    <button type="button" className="btn btn-sm btn-primary" onClick={() => openModal(workout)}>
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

export default Workouts;
