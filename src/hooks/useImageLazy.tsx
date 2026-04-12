
import { useState, useEffect } from 'react';

/**
 * Hook for lazy loading images with a placeholder
 * @param src The source URL of the image to load
 * @param placeholderSrc Optional placeholder image to show while loading
 * @returns Object with loaded status and current image source
 */
export function useImageLazy(src: string, placeholderSrc: string = '/placeholder.svg') {
  const [imageSrc, setImageSrc] = useState(placeholderSrc);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // Reset states when src changes
    setImageLoaded(false);
    setError(null);
    
    // Skip loading if src is empty or same as placeholder
    if (!src || src === placeholderSrc) {
      setImageSrc(placeholderSrc);
      return;
    }

    const image = new Image();
    image.src = src;

    image.onload = () => {
      setImageSrc(src);
      setImageLoaded(true);
    };

    image.onerror = (e) => {
      console.error('Error loading image:', src, e);
      setError(new Error(`Failed to load image: ${src}`));
      setImageSrc(placeholderSrc); // Fallback to placeholder on error
    };

    // Clean up
    return () => {
      image.onload = null;
      image.onerror = null;
    };
  }, [src, placeholderSrc]);

  return { imageSrc, imageLoaded, error, isLoading: !imageLoaded && !error };
}

/**
 * Component for lazy loading images with placeholder and blur-up effect
 */
export function LazyImage({
  src,
  alt,
  className = '',
  placeholderSrc = '/placeholder.svg',
  width,
  height,
}: {
  src: string;
  alt: string;
  className?: string;
  placeholderSrc?: string;
  width?: number | string;
  height?: number | string;
}) {
  const { imageSrc, imageLoaded } = useImageLazy(src, placeholderSrc);

  return (
    <img
      src={imageSrc}
      alt={alt}
      width={width}
      height={height}
      loading="lazy"
      className={`transition-opacity duration-500 ${
        imageLoaded ? 'opacity-100' : 'opacity-70 blur-[2px]'
      } ${className}`}
    />
  );
}

export default useImageLazy;
