import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { GlobalStyles } from './styles/GlobalStyles'
import { theme } from './styles/theme'

// Pages
import Dashboard from './pages/Dashboard'
import Quests from './pages/Quests'
import BossFight from './pages/BossFight'
import Leaderboard from './pages/Leaderboard'
import Profile from './pages/Profile'
import Login from './pages/Login'

// Components
import Navbar from './components/Navbar'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <div className="app-container">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/quests" element={<Quests />} />
            <Route path="/boss-fight" element={<BossFight />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </main>
        <div className="system-notification" id="system-notification">
          <p>"The System" is observing your progress...</p>
        </div>
      </div>
    </ThemeProvider>
  )
}

export default App