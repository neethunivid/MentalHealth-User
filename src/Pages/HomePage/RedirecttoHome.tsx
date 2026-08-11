// RedirectToHome.js
import React, { useEffect } from 'react';

const RedirectToHome = () => {
  useEffect(() => {
    // Redirect to  HTML page
    window.location.href = '/home.html'; 
  }, []);

  return null; // No UI is needed, just a redirect
};

export default RedirectToHome;
