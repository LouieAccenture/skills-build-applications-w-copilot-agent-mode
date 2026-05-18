import React, { useState, useEffect } from 'react';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('');
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const codespaceName = process.env.REACT_APP_CODESPACE_NAME || 'localhost';
  const apiUrl = `https://${codespaceName}-8000.app.github.dev/api/activities/`;

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        console.log('Fetching activities from:', apiUrl);
        const response = await fetch(apiUrl);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Fetched activities data:', data);

        const activitiesData = Array.isArray(data.results) ? data.results : data;
        setActivities(Array.isArray(activitiesData) ? activitiesData : []);
      } catch (fetchError) {
        console.error('Error fetching activities:', fetchError);
        setError(fetchError.message);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, [apiUrl]);

  const filteredActivities = activities.filter((activity) => {
    const text = `${activity.name || ''} ${activity.description || ''}`.toLowerCase();
    return text.includes(filter.toLowerCase());
  });

  const openModal = (activity) => {
    setSelectedActivity(activity);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedActivity(null);
  };

  const renderModal = () => {
    if (!showModal || !selectedActivity) return null;

    return (
      <>
        <div className="modal fade show d-block" tabIndex="-1" role="dialog" onClick={closeModal}>
          <div className="modal-dialog modal-lg modal-dialog-centered" role="document" onClick={(event) => event.stopPropagation()}>
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Activity Details</h5>
                <button type="button" className="btn-close" aria-label="Close" onClick={closeModal} />
              </div>
              <div className="modal-body">
                <p className="mb-2"><strong>Name:</strong> {selectedActivity.name || 'N/A'}</p>
                <p className="mb-2"><strong>Description:</strong> {selectedActivity.description || 'N/A'}</p>
                <p className="mb-2"><strong>Calories Burned:</strong> {selectedActivity.calories_burned || 'N/A'}</p>
                <p className="mb-2"><strong>Duration:</strong> {selectedActivity.duration || 'N/A'} minutes</p>
                <p className="mb-0"><strong>ID:</strong> {selectedActivity.id || 'N/A'}</p>
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
        <div className="alert alert-info">Loading activities data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-4">
        <div className="alert alert-danger">Error fetching activities: {error}</div>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-start mb-4 gap-3">
        <div>
          <h2>🎯 Activities</h2>
          <p className="text-muted">Activity data from the backend REST API endpoint.</p>
        </div>
        <button className="btn btn-success" onClick={() => window.location.reload()}>
          Refresh Data
        </button>
      </div>

      <form className="row g-3 align-items-center mb-4" onSubmit={(event) => event.preventDefault()}>
        <div className="col-md-8">
          <div className="input-group">
            <span className="input-group-text">Search</span>
            <input
              className="form-control"
              type="search"
              value={filter}
              placeholder="Search activities..."
              onChange={(event) => setFilter(event.target.value)}
            />
          </div>
        </div>
        <div className="col-md-4 text-md-end">
          <span className="text-muted">Endpoint: {apiUrl}</span>
        </div>
      </form>

      {filteredActivities.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">📋</div>
          <h5>No activities found</h5>
          <p>Try a different search term or add activity records in the backend.</p>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-hover align-middle">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Description</th>
                <th>Calories</th>
                <th>Duration</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredActivities.map((activity, index) => (
                <tr key={activity.id || index}>
                  <td>{activity.id || 'N/A'}</td>
                  <td>{activity.name || 'N/A'}</td>
                  <td>{activity.description || 'N/A'}</td>
                  <td>{activity.calories_burned || 'N/A'}</td>
                  <td>{activity.duration || 'N/A'}</td>
                  <td>
                    <button type="button" className="btn btn-sm btn-primary" onClick={() => openModal(activity)}>
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

export default Activities;
