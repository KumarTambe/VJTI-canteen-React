import { useState } from 'react'
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'


import Admin from './pages/Admin.jsx'
import Chat from './pages/Chat.jsx'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login.jsx'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/chat' element={<Chat />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/admin' element={<Admin />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;