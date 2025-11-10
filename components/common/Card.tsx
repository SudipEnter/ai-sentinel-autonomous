
import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({ children, className = '', onClick }) => {
  const cardClasses = `bg-sentinel-bg-light border border-sentinel-border rounded-lg shadow-lg transition-all duration-300 ${
    onClick ? 'cursor-pointer hover:border-sentinel-blue hover:shadow-2xl' : ''
  } ${className}`;

  return (
    <div className={cardClasses} onClick={onClick}>
      {children}
    </div>
  );
};

export default Card;
