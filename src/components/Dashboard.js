import React, { useState } from 'react';
import Menu from './Menu';
import { Outlet } from 'react-router-dom';
import SessionTokens from './SessionTokens';

const Dashboard = () => {
  const username = localStorage.getItem('username') || 'Usuario';
  const [showTokens, setShowTokens] = useState(false);

  const toggleTokens = () => setShowTokens(prev => !prev);

  return (
    <div className="dashboard-container">
      <Menu username={username} onToggleTokens={toggleTokens} />
      <div className="dashboard-content">
        {showTokens ? <SessionTokens /> : <Outlet />}
      </div>
    </div>
  );
};

export default Dashboard;
