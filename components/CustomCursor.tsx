import React, { useEffect, useRef, useState } from 'react';

const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if device has fine pointer (mouse)
    const isFinePointer = window.matchMedia('(pointer: fine)').matches;
    if (!isFinePointer) return;

    setIsVisible(true);

    const moveCursor = (e: MouseEvent) => {
      if (cursorRef.current) {
        // Using translate3d for better performance
        cursorRef.current.style.transform = `translate3d(${e.clientX - 16}px, ${e.clientY - 16}px, 0) scale(${cursorRef.current.dataset.scale || 1})`;
      }
    };
    
    const handleMouseOver = (e: MouseEvent) => {
       const target = e.target as HTMLElement;
       // Check for interactive elements
       if (target.closest('a, button, input, textarea, [role="button"], .cursor-pointer')) {
          setIsHovering(true);
          if(cursorRef.current) cursorRef.current.dataset.scale = "1.5";
       } else {
          setIsHovering(false);
          if(cursorRef.current) cursorRef.current.dataset.scale = "1";
       }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
        window.removeEventListener('mousemove', moveCursor);
        window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  if (!isVisible) return null;

  return (
     <div 
        ref={cursorRef}
        className="fixed top-0 left-0 w-8 h-8 border border-coral dark:border-white rounded-full pointer-events-none z-[9999] transition-transform duration-100 ease-out flex items-center justify-center mix-blend-difference"
        data-scale="1"
     >
       <div className={`w-1.5 h-1.5 bg-coral dark:bg-white rounded-full transition-opacity duration-200 ${isHovering ? 'opacity-0' : 'opacity-100'}`} />
     </div>
  );
};

export default CustomCursor;