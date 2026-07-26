import { NavLink, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'
import './App.css'

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/users', label: 'Users' },
  { to: '/teams', label: 'Teams' },
  { to: '/activities', label: 'Activities' },
  { to: '/leaderboard', label: 'Leaderboard' },
  { to: '/workouts', label: 'Workouts' },
]

function App() {
  return (
    <div className="min-vh-100 bg-light">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
        <div className="container-fluid">
          <span className="navbar-brand fw-semibold">OctoFit Tracker</span>
          <div className="navbar-nav ms-auto flex-row gap-3">
            {navItems.map((item) => (
              <NavLink key={item.to} to={item.to} className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                {item.label}
              </NavLink>
            ))}
          </div>
        </div>
      </nav>

      <main className="container py-5">
        <section className="row align-items-center g-4 mb-4">
          <div className="col-lg-7">
            <p className="text-primary fw-semibold mb-3">OctoFit Tracker</p>
            <h1 className="display-5 fw-bold mb-3">Modern fitness tracking for teams and individuals.</h1>
            <p className="lead text-muted mb-0">
              Browse the live data from the backend API and keep your training plan connected to real records.
            </p>
          </div>
          <div className="col-lg-5">
            <div className="card shadow-sm border-0">
              <div className="card-body p-4">
                <h2 className="h5 fw-semibold mb-3">Frontend configuration</h2>
                <p className="small text-muted mb-0">
                  The app uses <code>import.meta.env.VITE_CODESPACE_NAME</code> for Codespaces URLs and falls back to localhost when it is not defined.
                </p>
              </div>
            </div>
          </div>
        </section>

        <Routes>
          <Route path="/" element={<Users />} />
          <Route path="/users" element={<Users />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
