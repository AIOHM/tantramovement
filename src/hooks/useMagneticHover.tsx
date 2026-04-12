import { useRef, useCallback } from 'react';

export const useMagneticHover = (strength: number = 0.3) => {
  const elementRef = useRef<HTMLElement | null>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const element = elementRef.current;
    if (!element) return;

    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;
    
    element.style.transform = `translate(${distanceX * strength}px, ${distanceY * strength}px)`;
  }, [strength]);

  const handleMouseLeave = useCallback(() => {
    const element = elementRef.current;
    if (!element) return;
    
    element.style.transform = 'translate(0px, 0px)';
    element.style.transition = 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
  }, []);

  const handleMouseEnter = useCallback(() => {
    const element = elementRef.current;
    if (!element) return;
    
    element.style.transition = 'transform 0.1s ease-out';
  }, []);

  return {
    ref: elementRef,
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    onMouseEnter: handleMouseEnter,
  };
};
