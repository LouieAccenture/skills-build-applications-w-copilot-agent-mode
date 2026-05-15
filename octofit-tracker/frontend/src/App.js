import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
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
                  <Link className="nav-link" to="/users">
                    👥 Users
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/teams">
                    👨‍👩‍👧‍👦 Teams
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/activities">
                    🎯 Activities
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/workouts">
                    💪 Workouts
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/leaderboard">
                    🏆 Leaderboard
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <Routes>
          <Route 
            path="/" 
            element={
              <div className="container">
                <div className="row">
                  <div className="col-12">
                    <h1 className="hero-title">🎯 Welcome to Octofit Tracker</h1>
                    <p className="hero-subtitle">Your personal fitness tracking and competitive leaderboard platform</p>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6 col-lg-4">
                    <div className="card feature-card">
                      <div className="card-header">
                        👥 Users
                      </div>
                      <div className="card-body">
                        <p className="card-text">Manage your user profile and view other users in the fitness community.</p>
                        <Link to="/users" className="btn btn-primary btn-sm">
                          View Users →
                        </Link>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-6 col-lg-4">
                    <div className="card feature-card">
                      <div className="card-header">
                        👨‍👩‍👧‍👦 Teams
                      </div>
                      <div className="card-body">
                        <p className="card-text">Create or join teams to compete together and build community connections.</p>
                        <Link to="/teams" className="btn btn-primary btn-sm">
                          View Teams →
                        </Link>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-6 col-lg-4">
                    <div className="card feature-card">
                      <div className="card-header">
                        🎯 Activities
                      </div>
                      <div className="card-body">
                        <p className="card-text">Log and track your fitness activities, from running to weightlifting.</p>
                        <Link to="/activities" className="btn btn-primary btn-sm">
                          View Activities →
                        </Link>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-6 col-lg-4">
                    <div className="card feature-card">
                      <div className="card-header">
                        💪 Workouts
                      </div>
                      <div className="card-body">
                        <p className="card-text">Access personalized workout suggestions tailored to your fitness goals.</p>
                        <Link to="/workouts" className="btn btn-primary btn-sm">
                          View Workouts →
                        </Link>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-6 col-lg-4">
                    <div className="card feature-card">
                      <div className="card-header">
                        🏆 Leaderboard
                      </div>
                      <div className="card-body">
                        <p className="card-text">Compete with other users and teams on our competitive leaderboard.</p>
                        <Link to="/leaderboard" className="btn btn-primary btn-sm">
                          View Leaderboard →
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
                  <Link className="nav-link" to="/users">
                    👥 Users
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/teams">
                    👨‍👩‍👧‍👦 Teams
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/activities">
                    🎯 Activities
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/workouts">
                    💪 Workouts
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/leaderboard">
                    🏆 Leaderboard
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <Routes>
          <Route 
            path="/" 
            element={
              <div className="container">
                <div className="row">
                  <div className="col-12">
                    <h1>🎯 Welcome to Octofit Tracker</h1>
                    <p className="lead text-muted">Your personal fitness tracking and competitive leaderboard platform</p>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6 col-lg-4">
                    <div className="card">
                      <div className="card-header">
                        👥 Users
                      </div>
                      <div className="card-body">
                        <p className="card-text">Manage your user profile and view other users in the fitness community.</p>
                        <Link to="/users" className="btn btn-primary btn-sm">
                          View Users →
                        </Link>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-6 col-lg-4">
                    <div className="card">
                      <div className="card-header">
                        👨‍👩‍👧‍👦 Teams
                      </div>
                      <div className="card-body">
                        <p className="card-text">Create or join teams to compete together and build community connections.</p>
                        <Link to="/teams" className="btn btn-primary btn-sm">
                          View Teams →
                        </Link>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-6 col-lg-4">
                    <div className="card">
                      <div className="card-header">
                        🎯 Activities
                      </div>
                      <div className="card-body">
                        <p className="card-text">Log and track your fitness activities, from running to weightlifting.</p>
                        <Link to="/activities" className="btn btn-primary btn-sm">
                          View Activities →
                        </Link>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-6 col-lg-4">
                    <div className="card">
                      <div className="card-header">
                        💪 Workouts
                      </div>
                      <div className="card-body">
                        <p className="card-text">Access personalized workout suggestions tailored to your fitness goals.</p>
                        <Link to="/workouts" className="btn btn-primary btn-sm">
                          View Workouts →
                        </Link>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-6 col-lg-4">
                    <div className="card">
                      <div className="card-header">
                        🏆 Leaderboard
                      </div>
                      <div className="card-body">
                        <p className="card-text">Compete with other users and teams on our competitive leaderboard.</p>
                        <Link to="/leaderboard" className="btn btn-primary btn-sm">
                          View Leaderboard →
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
