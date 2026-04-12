
import React from 'react';
import { trackClickEvent } from '@/services/analytics';

type TrackableElementProps = {
  children: React.ReactNode;
  elementType: string;
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
};

const TrackableElement: React.FC<TrackableElementProps> = ({ 
  children, 
  elementType,
  className = '',
  onClick
}) => {
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    // Track the click
    trackClickEvent(event, elementType);
    
    // Call the original onClick handler if provided
    if (onClick) {
      onClick(event);
    }
  };

  return (
    <div className={className} onClick={handleClick}>
      {children}
    </div>
  );
};

export default TrackableElement;
