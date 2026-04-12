
import React from 'react';

type ImagePosition = 'left' | 'right' | 'background' | 'card' | 'rounded' | 'gradient';

interface ImageContentLayoutProps {
  imageUrl: string;
  imageAlt: string;
  children: React.ReactNode;
  position: ImagePosition;
  className?: string;
  style?: React.CSSProperties;
  layoutNumber?: number;
}

/**
 * Component for displaying content with images in various layouts
 * Use the position prop to control the image layout style
 */
const ImageContentLayout: React.FC<ImageContentLayoutProps> = ({
  imageUrl,
  imageAlt,
  children,
  position = 'left',
  className = '',
  style,
  layoutNumber
}) => {
  // Helper for image dimensions based on position
  const getImageDimensions = () => {
    switch (position) {
      case 'background':
        return 'w-full h-full object-cover';
      case 'card':
      case 'rounded':
        return 'w-full h-64 md:h-72 object-cover';
      default:
        return 'w-full h-64 md:h-auto object-cover';
    }
  };

  // Render layout based on position type
  switch (position) {
    case 'left':
      return (
        <div className={`grid md:grid-cols-2 gap-6 md:gap-10 items-center ${className}`} style={style}>
          {layoutNumber && <div className="absolute -top-4 -left-2 w-8 h-8 rounded-full bg-deep-gold text-white flex items-center justify-center font-medium">{layoutNumber}</div>}
          <div className="relative overflow-hidden rounded-lg">
            <img src={imageUrl} alt={imageAlt} className={getImageDimensions()} loading="lazy" />
          </div>
          <div className="space-y-4">{children}</div>
        </div>
      );

    case 'right':
      return (
        <div className={`grid md:grid-cols-2 gap-6 md:gap-10 items-center ${className}`} style={style}>
          {layoutNumber && <div className="absolute -top-4 -left-2 w-8 h-8 rounded-full bg-deep-gold text-white flex items-center justify-center font-medium">{layoutNumber}</div>}
          <div className="space-y-4 order-2 md:order-1">{children}</div>
          <div className="relative overflow-hidden rounded-lg order-1 md:order-2">
            <img src={imageUrl} alt={imageAlt} className={getImageDimensions()} loading="lazy" />
          </div>
        </div>
      );

    case 'background':
      return (
        <div className={`relative ${className}`} style={style}>
          {layoutNumber && <div className="absolute -top-4 -left-2 z-20 w-8 h-8 rounded-full bg-deep-gold text-white flex items-center justify-center font-medium">{layoutNumber}</div>}
          <div className="absolute inset-0 z-0">
            <img src={imageUrl} alt={imageAlt} className="w-full h-full object-cover" loading="lazy" />
            <div className="absolute inset-0 bg-chocolate/60 backdrop-blur-[2px]"></div>
          </div>
          <div className="relative z-10 p-8 md:p-12 text-white space-y-4">{children}</div>
        </div>
      );

    case 'card':
      return (
        <div className={`bg-white rounded-lg shadow-md overflow-hidden ${className}`} style={style}>
          {layoutNumber && <div className="absolute -top-4 -left-2 w-8 h-8 rounded-full bg-deep-gold text-white flex items-center justify-center font-medium">{layoutNumber}</div>}
          <img src={imageUrl} alt={imageAlt} className="w-full h-64 object-cover" loading="lazy" />
          <div className="p-6 space-y-4">{children}</div>
        </div>
      );

    case 'rounded':
      return (
        <div className={`flex flex-col md:flex-row items-center gap-6 md:gap-10 ${className}`} style={style}>
          {layoutNumber && <div className="absolute -top-4 -left-2 w-8 h-8 rounded-full bg-deep-gold text-white flex items-center justify-center font-medium">{layoutNumber}</div>}
          <div className="md:w-1/3 flex-shrink-0">
            <img src={imageUrl} alt={imageAlt} className="w-64 h-64 object-cover rounded-full mx-auto shadow-lg" loading="lazy" />
          </div>
          <div className="md:w-2/3 space-y-4">{children}</div>
        </div>
      );

    case 'gradient':
      return (
        <div className={`relative overflow-hidden rounded-lg ${className}`} style={style}>
          {layoutNumber && <div className="absolute -top-4 -left-2 z-20 w-8 h-8 rounded-full bg-deep-gold text-white flex items-center justify-center font-medium">{layoutNumber}</div>}
          <div className="absolute inset-0 z-0">
            <img src={imageUrl} alt={imageAlt} className="w-full h-full object-cover" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-r from-chocolate/80 to-deep-gold/40"></div>
          </div>
          <div className="relative z-10 p-8 md:p-12 text-white space-y-4">{children}</div>
        </div>
      );

    default:
      return (
        <div className={`grid md:grid-cols-2 gap-6 md:gap-10 items-center ${className}`} style={style}>
          <div className="relative overflow-hidden rounded-lg">
            <img src={imageUrl} alt={imageAlt} className={getImageDimensions()} loading="lazy" />
          </div>
          <div className="space-y-4">{children}</div>
        </div>
      );
  }
};

export default ImageContentLayout;
