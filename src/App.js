// App.js
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import ResetPassword from './components/ResetPassword';
import Dashboard from './components/Dashboard';
import Libros from './components/Libros';
import Autores from './components/Autores';
import SessionTokens from './components/SessionTokens';
import { setNavigate } from './axiosConfig';

function AppRoutes() {
  const navigate = useNavigate();

  useEffect(() => {
    setNavigate(navigate);
  }, [navigate]);

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/reset" element={<ResetPassword />} />

      <Route path="/menu" element={<Dashboard />}>
        <Route path="libros" element={<Libros />} />
        <Route path="autores" element={<Autores />} />
        <Route path="tokens" element={<SessionTokens />} />
      </Route>
    </Routes>
  );
}

export default function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}
