import React, { useState, useEffect } from 'react';

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const codespaceName = process.env.REACT_APP_CODESPACE_NAME || 'localhost';
        const apiUrl = `https://${codespaceName}-8000.app.github.dev/api/users/`;
        
        console.log('Fetching users from:', apiUrl);
        
        const response = await fetch(apiUrl);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Fetched users data:', data);
        
        // Handle both paginated and plain array responses
        const usersData = data.results || data;
        setUsers(Array.isArray(usersData) ? usersData : []);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching users:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return (
      <div className="container">
        <div className="alert alert-info" role="alert">
          <strong>Loading...</strong> Fetching users data...
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
          <h2>👥 Users</h2>
        </div>
      </div>

      {users.length === 0 ? (
        <div className="row">
          <div className="col-12">
            <div className="alert alert-info empty-state">
              <div className="empty-state-icon">👤</div>
              <h5>No users found</h5>
              <p>No user data is currently available.</p>
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
                    <th>Username</th>
                    <th>Email</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th className="text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id}>
                      <td>
                        <span className="badge bg-primary">{user.id}</span>
                      </td>
                      <td>
                        <strong>{user.username || 'N/A'}</strong>
                      </td>
                      <td>
                        <a href={`mailto:${user.email}`}>{user.email || 'N/A'}</a>
                      </td>
                      <td>{user.first_name || 'N/A'}</td>
                      <td>{user.last_name || 'N/A'}</td>
                      <td className="text-center">
                        <button className="btn btn-sm btn-primary me-2" title="Profile">
                          📋
                        </button>
                        <button className="btn btn-sm btn-info me-2" title="Message">
                          💬
                        </button>
                        <button className="btn btn-sm btn-warning" title="Block">
                          ⛔
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

export default Users;
