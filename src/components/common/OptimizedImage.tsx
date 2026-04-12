
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number | string;
  height?: number | string;
  priority?: boolean;
  onLoad?: () => void;
  onError?: () => void;
}

/**
 * Component for optimized image loading with blur-up effect
 */
const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className,
  width,
  height,
  priority = false,
  onLoad,
  onError,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);

  // Reset states if src changes
  useEffect(() => {
    setIsLoaded(false);
    setError(false);
  }, [src]);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setError(true);
    onError?.();
    console.error(`Failed to load image: ${src}`);
  };

  return (
    <div className={cn('relative overflow-hidden', className)}>
      {/* Low quality placeholder - shown while loading */}
      {!isLoaded && (
        <div 
          className="absolute inset-0 bg-gray-200 animate-pulse"
          style={{ width, height }}
        />
      )}
      
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? 'eager' : 'lazy'}
        onLoad={handleLoad}
        onError={handleError}
        className={cn(
          'transition-opacity duration-500',
          isLoaded ? 'opacity-100' : 'opacity-0',
          error && 'hidden'
        )}
      />
      
      {/* Fallback for errors */}
      {error && (
        <div 
          className="flex items-center justify-center bg-gray-100 text-gray-500 text-sm"
          style={{ width, height: height || '200px' }}
        >
          <span>Image not available</span>
        </div>
      )}
    </div>
  );
};

export default OptimizedImage;
