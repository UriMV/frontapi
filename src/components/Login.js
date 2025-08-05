import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../api/authApi';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { FaUser, FaLock, FaSignInAlt } from 'react-icons/fa';
import '../styles/Login.css';

function Login() {
  const [form, setForm] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await loginUser(form);
      localStorage.setItem('token', data.token);
      localStorage.setItem('username', form.username);
      localStorage.setItem('refreshToken', data.refreshToken);
      Swal.fire({
        title: '¡Éxito!',
        text: 'Login exitoso',
        icon: 'success',
        timer: 1500,
        showConfirmButton: false
      }).then(() => {
        navigate('/menu');
      });
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: error.response?.data || error.message,
        icon: 'error',
        confirmButtonColor: '#6ab04c'
      });
    }
  };

  return (
    <div className="login-container">
      <div className="login-wrapper">
        <div className="login-content">
          <div className="login-illustration">
            <img 
              src="https://icons.veryicon.com/png/o/miscellaneous/icon-icon-of-ai-intelligent-dispensing/login-user-name-1.png" 
              alt="Login illustration"
            />
          </div>
          
          <div className="login-form-container">
            <div className="login-logo">
              <h2>Bienvenido de vuelta</h2>
              <p>Ingresa tus credenciales para acceder</p>
            </div>
            
            <form onSubmit={handleSubmit} className="login-form">
              <div className="input-group">
                <label htmlFor="username">Usuario</label>
                <div className="input-icon">
                  <FaUser />
                </div>
                <input
                  id="username"
                  name="username"
                  type="text"
                  placeholder="Ingresa tu usuario"
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="input-group">
                <label htmlFor="password">Contraseña</label>
                <div className="input-icon">
                  <FaLock />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Ingresa tu contraseña"
                  onChange={handleChange}
                  required
                />
              </div>
              
              <button type="submit" className="login-button">
                <FaSignInAlt style={{ marginRight: '8px' }} />
                Iniciar sesión
              </button>
              
              <div className="form-footer">
                <div className="form-links">
                  <Link to="/register">¿No tienes cuenta? Regístrate</Link>
                  <Link to="/reset">¿Olvidaste tu contraseña?</Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;