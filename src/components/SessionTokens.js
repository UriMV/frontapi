import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaKey, FaCopy, FaInfoCircle, FaCheck, FaArrowLeft } from 'react-icons/fa';
import '../styles/SessionTokens.css';

const SessionTokens = () => {
  const token = localStorage.getItem('token');
  const refreshToken = localStorage.getItem('refreshToken');
  const [copiedToken, setCopiedToken] = useState(false);
  const [copiedRefreshToken, setCopiedRefreshToken] = useState(false);
  const navigate = useNavigate();

  // Solución 1: Forzar actualización de la ruta al cargar el componente
  useEffect(() => {
    window.history.replaceState(null, '', '/menu/tokens');
  }, []);

  const copyToClipboard = (text, type) => {
    if (!text) return;
    
    navigator.clipboard.writeText(text).then(() => {
      if (type === 'token') {
        setCopiedToken(true);
        setTimeout(() => setCopiedToken(false), 2000);
      } else {
        setCopiedRefreshToken(true);
        setTimeout(() => setCopiedRefreshToken(false), 2000);
      }
    });
  };

  return (
    <div className="tokens-container">
      <div className="tokens-header">
        {/* Solución 2: Botón de retroceso para navegación */}
        <button 
          onClick={() => navigate(-1)}
          className="back-button"
          aria-label="Volver atrás"
        >
          <FaArrowLeft /> Volver
        </button>
        
        <h2><FaKey style={{ marginRight: '10px' }} />Tokens de Sesión</h2>
        <p>Gestiona tus tokens de autenticación</p>
      </div>

      <div className="tokens-grid">
        <div className="token-card">
          <h3><FaKey />Token de Acceso</h3>
          <div className="token-content">
            <textarea 
              readOnly 
              value={token || 'No hay token disponible'} 
              className={!token ? 'empty-token' : ''}
              aria-label="Token de acceso"
            />
          </div>
          <div className="token-actions">
            <button 
              className="copy-btn" 
              onClick={() => copyToClipboard(token, 'token')}
              disabled={!token}
              aria-label={copiedToken ? 'Token copiado' : 'Copiar token'}
            >
              {copiedToken ? <FaCheck /> : <FaCopy />}
              {copiedToken ? 'Copiado!' : 'Copiar Token'}
            </button>
          </div>
          <div className="token-info">
            <FaInfoCircle />
            <span>Este token expira después de un tiempo y debe ser renovado</span>
          </div>
        </div>

        <div className="token-card">
          <h3><FaKey />Refresh Token</h3>
          <div className="token-content">
            <textarea 
              readOnly 
              value={refreshToken || 'No hay refresh token disponible'} 
              className={!refreshToken ? 'empty-token' : ''}
              aria-label="Refresh token"
            />
          </div>
          <div className="token-actions">
            <button 
              className="copy-btn" 
              onClick={() => copyToClipboard(refreshToken, 'refreshToken')}
              disabled={!refreshToken}
              aria-label={copiedRefreshToken ? 'Refresh token copiado' : 'Copiar refresh token'}
            >
              {copiedRefreshToken ? <FaCheck /> : <FaCopy />}
              {copiedRefreshToken ? 'Copiado!' : 'Copiar Refresh Token'}
            </button>
          </div>
          <div className="token-info">
            <FaInfoCircle />
            <span>Usa este token para obtener un nuevo token de acceso cuando expire</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SessionTokens;