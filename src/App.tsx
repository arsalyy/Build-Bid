import { Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/home'
import Start from './pages/start'

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/start" element={<Start />} />
      <Route path="/*" element={<Navigate to="/" />} />
    </Routes>
  )
}

export default App
