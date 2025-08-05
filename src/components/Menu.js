import { useNavigate } from 'react-router-dom';
import { FaBook, FaPenAlt, FaKey, FaSignOutAlt } from 'react-icons/fa';
import '../styles/Menu.css';

const Menu = ({ username, onToggleTokens }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('refreshToken');
    navigate('/');
  };

  return (
    <div className="menu-container">
      <div className="menu-header">
        <h3 className="user-greeting">Hola, {username}</h3>
        <nav className="menu-nav">
          <button 
            className="menu-button" 
            onClick={() => navigate('/menu/libros')}
          >
            <FaBook /> Libros
          </button>
          <button 
            className="menu-button" 
            onClick={() => navigate('/menu/autores')}
          >
            <FaPenAlt /> Autores
          </button>
          <button 
            className="menu-button" 
            onClick={onToggleTokens}
          >
            <FaKey /> Tokens
          </button>
          <button 
            className="menu-button logout-btn" 
            onClick={handleLogout}
          >
            <FaSignOutAlt /> Salir
          </button>
        </nav>
      </div>
    </div>
  );
};

export default Menu;