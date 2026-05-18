import React, { useState, useEffect } from 'react';

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const codespaceName = process.env.REACT_APP_CODESPACE_NAME || 'localhost';
  const apiUrl = `https://${codespaceName}-8000.app.github.dev/api/users/`;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        console.log('Fetching users from:', apiUrl);
        const response = await fetch(apiUrl);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Fetched users data:', data);

        const usersData = Array.isArray(data.results) ? data.results : data;
        setUsers(Array.isArray(usersData) ? usersData : []);
      } catch (fetchError) {
        console.error('Error fetching users:', fetchError);
        setError(fetchError.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [apiUrl]);

  const filteredUsers = users.filter((user) => {
    const search = `${user.username || ''} ${user.email || ''} ${user.first_name || ''} ${user.last_name || ''}`.toLowerCase();
    return search.includes(filter.toLowerCase());
  });

  const openModal = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedUser(null);
    setShowModal(false);
  };

  const renderModal = () => {
    if (!showModal || !selectedUser) return null;

    return (
      <>
        <div className="modal fade show d-block" tabIndex="-1" role="dialog" onClick={closeModal}>
          <div className="modal-dialog modal-lg modal-dialog-centered" role="document" onClick={(event) => event.stopPropagation()}>
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">User Details</h5>
                <button type="button" className="btn-close" aria-label="Close" onClick={closeModal} />
              </div>
              <div className="modal-body">
                <p><strong>Username:</strong> {selectedUser.username || 'N/A'}</p>
                <p><strong>Email:</strong> {selectedUser.email || 'N/A'}</p>
                <p><strong>First Name:</strong> {selectedUser.first_name || 'N/A'}</p>
                <p><strong>Last Name:</strong> {selectedUser.last_name || 'N/A'}</p>
                <p><strong>ID:</strong> {selectedUser.id || 'N/A'}</p>
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
        <div className="alert alert-info">Loading users data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-4">
        <div className="alert alert-danger">Error fetching users: {error}</div>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-start gap-3 mb-4">
        <div>
          <h2>👥 Users</h2>
          <p className="text-muted">Users loaded from your Django REST API endpoint.</p>
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
              placeholder="Search users..."
              value={filter}
              onChange={(event) => setFilter(event.target.value)}
            />
          </div>
        </div>
        <div className="col-md-4 text-md-end text-muted">Endpoint: {apiUrl}</div>
      </form>

      {filteredUsers.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">👤</div>
          <h5>No users found</h5>
          <p>Update or seed your backend users API to display results.</p>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-hover align-middle">
            <thead>
              <tr>
                <th>ID</th>
                <th>Username</th>
                <th>Email</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user, index) => (
                <tr key={user.id || index}>
                  <td>{user.id || 'N/A'}</td>
                  <td>{user.username || 'N/A'}</td>
                  <td>{user.email || 'N/A'}</td>
                  <td>{user.first_name || 'N/A'}</td>
                  <td>{user.last_name || 'N/A'}</td>
                  <td>
                    <button type="button" className="btn btn-sm btn-primary" onClick={() => openModal(user)}>
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

export default Users;
