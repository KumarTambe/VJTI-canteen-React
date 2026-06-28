import { useState } from 'react'
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'

import Admin from './pages/Admin.jsx'
import Chat from './pages/Chat.jsx'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login.jsx'
import Navbar from './components/Navbar.jsx'
import ProtectedRoute from './components/ProtectedRoutes.jsx'
import DishChat from './pages/DishChat.jsx'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/chat' element={
          <ProtectedRoute>
            <Chat />
          </ProtectedRoute>
        } />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/admin' element={
          <ProtectedRoute>
            <Admin />
          </ProtectedRoute>
        } />
        <Route path='/login' element={<Login />} />
        <Route path='/dish/:id' element={<DishChat />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;