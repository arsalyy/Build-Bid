import React, { useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/home'
import Start from './pages/start'
import Login from 'pages/login'
import SignUp from 'pages/signup'
import Dashboard from 'pages/dashboard'
import About from 'pages/about'
import Contact from 'pages/contact'
import AuthRoute from 'AuthRoute'
import Admin from 'pages/admin'
import Details from 'pages/details'
import Quote from 'pages/quote'
import { setLoggedIn } from 'actions/adminAction'
import { useDispatch } from 'react-redux'
import AppRoute from 'AppRoute'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setLoggedIn(false))
  })

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/dashboard" element={<AuthRoute Component={Dashboard} />} />
      <Route path="/details" element={<AuthRoute Component={AppRoute} ComponentProp={Details} />} />
      <Route path="/login" element={<Login />} />
      <Route path="/quote" element={<AuthRoute Component={AppRoute} ComponentProp={Quote} />} />
      <Route path="/start" element={<AuthRoute Component={AppRoute} ComponentProp={Start} />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/*" element={<Navigate to="/" />} />
    </Routes>
  )
}

export default App
