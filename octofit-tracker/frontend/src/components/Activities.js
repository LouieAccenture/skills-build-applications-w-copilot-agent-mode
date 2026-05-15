import React, { useState, useEffect } from 'react';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const codespaceName = process.env.REACT_APP_CODESPACE_NAME || 'localhost';
        const apiUrl = `https://${codespaceName}-8000.app.github.dev/api/activities/`;
        
        console.log('Fetching activities from:', apiUrl);
        
        const response = await fetch(apiUrl);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Fetched activities data:', data);
        
        // Handle both paginated and plain array responses
        const activitiesData = data.results || data;
        setActivities(Array.isArray(activitiesData) ? activitiesData : []);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching activities:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  if (loading) {
    return (
      <div className="container">
        <div className="alert alert-info" role="alert">
          <strong>Loading...</strong> Fetching activities data...
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
          <h2>🎯 Activities</h2>
        </div>
      </div>

      {activities.length === 0 ? (
        <div className="row">
          <div className="col-12">
            <div className="alert alert-info empty-state">
              <div className="empty-state-icon">📋</div>
              <h5>No activities found</h5>
              <p>Start by logging your first activity!</p>
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
                    <th>ID</th>
                    <th>Activity Name</th>
                    <th>Description</th>
                    <th>Calories Burned</th>
                    <th>Duration (minutes)</th>
                    <th className="text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {activities.map((activity) => (
                    <tr key={activity.id}>
                      <td>
                        <span className="badge bg-primary">{activity.id}</span>
                      </td>
                      <td>
                        <strong>{activity.name || 'N/A'}</strong>
                      </td>
                      <td>
                        <small>{activity.description || 'N/A'}</small>
                      </td>
                      <td>
                        <span className="badge bg-warning">{activity.calories_burned || 'N/A'} cal</span>
                      </td>
                      <td>{activity.duration || 'N/A'}</td>
                      <td className="text-center">
                        <button className="btn btn-sm btn-info me-2" title="View Details">
                          👁️
                        </button>
                        <button className="btn btn-sm btn-warning me-2" title="Edit">
                          ✏️
                        </button>
                        <button className="btn btn-sm btn-danger" title="Delete">
                          🗑️
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

export default Activities;
