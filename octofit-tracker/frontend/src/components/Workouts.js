import React, { useState, useEffect } from 'react';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const codespaceName = process.env.REACT_APP_CODESPACE_NAME || 'localhost';
        const apiUrl = `https://${codespaceName}-8000.app.github.dev/api/workouts/`;
        
        console.log('Fetching workouts from:', apiUrl);
        
        const response = await fetch(apiUrl);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Fetched workouts data:', data);
        
        // Handle both paginated and plain array responses
        const workoutsData = data.results || data;
        setWorkouts(Array.isArray(workoutsData) ? workoutsData : []);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching workouts:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchWorkouts();
  }, []);

  if (loading) {
    return (
      <div className="container">
        <div className="alert alert-info" role="alert">
          <strong>Loading...</strong> Fetching workouts data...
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

  const getDifficultyBadgeColor = (difficulty) => {
    if (!difficulty) return 'secondary';
    const level = difficulty.toLowerCase();
    if (level === 'easy' || level === 'beginner') return 'success';
    if (level === 'medium' || level === 'intermediate') return 'warning';
    if (level === 'hard' || level === 'advanced') return 'danger';
    return 'info';
  };

  return (
    <div className="container">
      <div className="row mb-4">
        <div className="col-12">
          <h2>💪 Workouts</h2>
          <p className="text-muted">Get personalized workout suggestions tailored to your fitness goals</p>
        </div>
      </div>

      {workouts.length === 0 ? (
        <div className="row">
          <div className="col-12">
            <div className="alert alert-info empty-state">
              <div className="empty-state-icon">🏋️</div>
              <h5>No workouts found</h5>
              <p>No personalized workouts are currently available.</p>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="row">
            {workouts.map((workout) => (
              <div key={workout.id} className="col-md-6 col-lg-4 mb-4">
                <div className="card">
                  <div className="card-header d-flex justify-content-between align-items-center">
                    <strong>{workout.name || 'N/A'}</strong>
                    <span className={`badge bg-${getDifficultyBadgeColor(workout.difficulty)}`}>
                      {workout.difficulty || 'N/A'}
                    </span>
                  </div>
                  <div className="card-body">
                    <p className="card-text">{workout.description || 'No description'}</p>
                    <div className="row mb-3">
                      <div className="col-6">
                        <small className="text-muted">Duration:</small>
                        <br />
                        <strong>{workout.duration || 'N/A'} min</strong>
                      </div>
                      <div className="col-6">
                        <small className="text-muted">Level:</small>
                        <br />
                        <strong>{workout.difficulty || 'N/A'}</strong>
                      </div>
                    </div>
                    <div className="d-grid gap-2">
                      <button className="btn btn-primary btn-sm">Start Workout</button>
                      <button className="btn btn-outline-secondary btn-sm">View Details</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="row mt-4">
            <div className="col-12">
              <h3>All Workouts</h3>
              <div className="table-responsive">
                <table className="table table-striped table-hover">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Workout Name</th>
                      <th>Description</th>
                      <th>Duration (minutes)</th>
                      <th>Difficulty</th>
                      <th className="text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {workouts.map((workout) => (
                      <tr key={workout.id}>
                        <td>
                          <span className="badge bg-primary">{workout.id}</span>
                        </td>
                        <td>
                          <strong>{workout.name || 'N/A'}</strong>
                        </td>
                        <td>
                          <small>{workout.description || 'N/A'}</small>
                        </td>
                        <td>{workout.duration || 'N/A'}</td>
                        <td>
                          <span className={`badge bg-${getDifficultyBadgeColor(workout.difficulty)}`}>
                            {workout.difficulty || 'N/A'}
                          </span>
                        </td>
                        <td className="text-center">
                          <button className="btn btn-sm btn-success me-2" title="Start">
                            ▶️
                          </button>
                          <button className="btn btn-sm btn-info me-2" title="View">
                            👁️
                          </button>
                          <button className="btn btn-sm btn-warning" title="Favorite">
                            ⭐
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Workouts;
