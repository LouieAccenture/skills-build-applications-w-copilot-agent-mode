import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink, Link } from 'react-router-dom';
import './App.css';
import Logo from './components/Logo';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';

function App() {
  console.log('App component initialized');
  console.log('Codespace Name:', process.env.REACT_APP_CODESPACE_NAME || 'localhost');

  return (
    <Router>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-dark bg-gradient">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">
              <Logo size="small" />
              <span className="brand-text">Octofit Tracker</span>
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <NavLink className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')} to="/">
                    Home
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')} to="/users">
                    👥 Users
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')} to="/teams">
                    👨‍👩‍👧‍👦 Teams
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')} to="/activities">
                    🎯 Activities
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')} to="/workouts">
                    💪 Workouts
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')} to="/leaderboard">
                    🏆 Leaderboard
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <Routes>
          <Route
            path="/"
            element={
              <div className="container py-4">
                <div className="row align-items-center mb-5">
                  <div className="col-lg-8">
                    <h1 className="hero-title">🎯 Welcome to Octofit Tracker</h1>
                    <p className="hero-subtitle">Your personal fitness tracking and competitive leaderboard platform.</p>
                  </div>
                  <div className="col-lg-4 text-lg-end">
                    <Link to="/users" className="btn btn-outline-light btn-lg me-2">
                      Browse Users
                    </Link>
                    <Link to="/activities" className="btn btn-warning btn-lg">
                      Explore Activities
                    </Link>
                  </div>
                </div>

                <div className="row g-4">
                  <div className="col-md-6 col-lg-4">
                    <div className="card feature-card">
                      <div className="card-header">👥 Users</div>
                      <div className="card-body">
                        <p className="card-text">Manage user profiles, track progress, and connect with your fitness community.</p>
                        <Link to="/users" className="btn btn-primary btn-sm">
                          View Users
                        </Link>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-6 col-lg-4">
                    <div className="card feature-card">
                      <div className="card-header">👨‍👩‍👧‍👦 Teams</div>
                      <div className="card-body">
                        <p className="card-text">Create or join teams to stay motivated together and compete friendly challenges.</p>
                        <Link to="/teams" className="btn btn-primary btn-sm">
                          View Teams
                        </Link>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-6 col-lg-4">
                    <div className="card feature-card">
                      <div className="card-header">🎯 Activities</div>
                      <div className="card-body">
                        <p className="card-text">Track workouts, log runs, and analyze your fitness activity history.</p>
                        <Link to="/activities" className="btn btn-primary btn-sm">
                          View Activities
                        </Link>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-6 col-lg-4">
                    <div className="card feature-card">
                      <div className="card-header">💪 Workouts</div>
                      <div className="card-body">
                        <p className="card-text">Browse workout plans and discover routines tailored to your goals.</p>
                        <Link to="/workouts" className="btn btn-primary btn-sm">
                          View Workouts
                        </Link>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-6 col-lg-4">
                    <div className="card feature-card">
                      <div className="card-header">🏆 Leaderboard</div>
                      <div className="card-body">
                        <p className="card-text">See how you rank against users and teams across the Octofit community.</p>
                        <Link to="/leaderboard" className="btn btn-primary btn-sm">
                          View Leaderboard
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            }
          />
          <Route path="/users" element={<Users />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
