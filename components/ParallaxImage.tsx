import React, { useEffect, useRef, useState } from 'react';

interface ParallaxImageProps {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  speed?: number; // Subtle parallax multiplier, e.g. 0.12
  onClick?: () => void;
  children?: React.ReactNode;
}

export const ParallaxImage: React.FC<ParallaxImageProps> = ({
  src,
  alt,
  className = '',
  containerClassName = '',
  speed = 0.12,
  onClick,
  children
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Detect closest scrolling container (#project-overlay for project modal, or window)
    const scrollParent = container.closest('#project-overlay') || window;

    let ticking = false;

    const updateParallax = () => {
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      // Calculate only if the element is in or near viewport
      if (rect.bottom >= -150 && rect.top <= viewportHeight + 150) {
        const elementCenter = rect.top + rect.height / 2;
        const viewportCenter = viewportHeight / 2;
        const distanceFromCenter = elementCenter - viewportCenter;

        // Subtle translateY translation (clamped to prevent any visual seams)
        const translation = -distanceFromCenter * speed;
        const clampedTranslation = Math.max(-26, Math.min(26, translation));
        setOffsetY(clampedTranslation);
      }
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateParallax);
        ticking = true;
      }
    };

    scrollParent.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    
    // Initial run
    updateParallax();

    return () => {
      scrollParent.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [speed]);

  return (
    <div
      ref={containerRef}
      onClick={onClick}
      className={`relative overflow-hidden ${containerClassName}`}
    >
      <div
        className="w-full h-full will-change-transform transition-transform duration-100 ease-out"
        style={{
          transform: `translate3d(0, ${offsetY}px, 0) scale(1.08)`,
        }}
      >
        <img
          src={src}
          alt={alt}
          loading="lazy"
          className={`w-full h-full object-cover select-none ${className}`}
        />
      </div>
      {children}
    </div>
  );
};

export default ParallaxImage;
