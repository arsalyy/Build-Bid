import { Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/home'
import Start from './pages/start'
import Login from 'pages/login'
import SignUp from 'pages/signup'
import Dashboard from 'pages/dashboard'

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/login" element={<Login />} />
      <Route path="/start" element={<Start />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/*" element={<Navigate to="/" />} />
    </Routes>
  )
}

export default App
