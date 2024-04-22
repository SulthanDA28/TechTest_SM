import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import {Routes, Route} from 'react-router-dom'
import Login from './component/Login'
import Register from './component/Register'
import Admin from './component/Admin'
import Approver from './component/Approver'
import Dashboard from './component/Dashboard'
import Status from './component/Status'
import Add from './component/Add'
import './App.css'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/admin" element={<Admin/>} />
        <Route path="/approver" element={<Approver/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/status" element={<Status/>} />
        <Route path="/add" element={<Add/>} />
      </Routes>
    </>
  )
}

export default App
