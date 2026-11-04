import React, { useEffect, useRef, useState } from 'react';

interface ParallaxImageProps {
  src: string;
  fallbackSrc?: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  speed?: number;
  onClick?: () => void;
  children?: React.ReactNode;
}

export const ParallaxImage: React.FC<ParallaxImageProps> = ({
  src,
  fallbackSrc,
  alt,
  className = '',
  containerClassName = '',
  speed = 0.12,
  onClick,
  children,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [offsetY, setOffsetY] = useState(0);
  const [imgSrc, setImgSrc] = useState(src);

  useEffect(() => {
    setImgSrc(src);
  }, [src]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scrollParent = container.closest('#project-overlay') || window;
    let ticking = false;

    const updateParallax = () => {
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      if (rect.bottom >= -150 && rect.top <= viewportHeight + 150) {
        const elementCenter = rect.top + rect.height / 2;
        const viewportCenter = viewportHeight / 2;
        const distanceFromCenter = elementCenter - viewportCenter;

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
          src={imgSrc}
          alt={alt}
          loading="lazy"
          referrerPolicy="no-referrer"
          onError={() => {
            if (fallbackSrc && imgSrc !== fallbackSrc) {
              setImgSrc(fallbackSrc);
            }
          }}
          className={`w-full h-full object-cover select-none ${className}`}
        />
      </div>
      {children}
    </div>
  );
};

export default ParallaxImage;
