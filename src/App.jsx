import React from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Employee from './pages/Employee';
import "bootstrap/dist/css/bootstrap.css"
import Verification from './pages/Auth/Verification';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Login />} path="/login" />
        <Route element={<Register />} path="/register" />
        <Route element={<Verification />} path="/authentication/:token" />
        <Route element={<Employee />} path="/" />
      </Routes>
    </BrowserRouter>
  )
}

export default App