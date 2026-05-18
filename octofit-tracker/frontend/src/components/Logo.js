import React from 'react';

function Logo({ size = 'small' }) {
  const sizeClasses = {
    small: { width: '40px', height: '40px' },
    medium: { width: '60px', height: '60px' },
    large: { width: '80px', height: '80px' }
  };

  return (
    <img
      src="/octofitapp-small.svg"
      alt="Octofit Logo"
      style={sizeClasses[size] || sizeClasses.small}
      className="octofit-logo"
    />
  );
}

export default Logo;
