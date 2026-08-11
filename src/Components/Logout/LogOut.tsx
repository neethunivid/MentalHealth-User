import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import { IconButton } from '@mui/material';

interface LogoutComponentProps {
  className?: string; // Optional className prop
}

const LogoutComponent: React.FC<LogoutComponentProps> = ({ className }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear session and local storage
    sessionStorage.clear();
    localStorage.clear();

    // Clear cache 
    if (caches && caches.keys) {
      caches.keys().then(function (names) {
        names.forEach(function (name) {
          caches.delete(name);
        });
      });
    }

    // Redirect to login page 
    window.location.href = '/forum.html';
  };

  return (
    <IconButton onClick={handleLogout} color="primary" aria-label="logout">
      <LogoutIcon fontSize="large" className={className} style={{ fontWeight: 'bold' }} /> {/* Pass className prop here */}
    </IconButton>
  );
};

export default LogoutComponent;
