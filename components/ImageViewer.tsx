import React, { useState, useEffect, useRef } from 'react';
import { X, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';

interface ImageViewerProps {
  src: string;
  alt: string;
  onClose: () => void;
}

const ImageViewer: React.FC<ImageViewerProps> = ({ src, alt, onClose }) => {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  
  // Prevent scrolling the body behind the modal
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const handleZoom = (delta: number) => {
    setScale(prev => {
      const newScale = Math.min(Math.max(1, prev + delta), 5);
      if (newScale === 1) setPosition({ x: 0, y: 0 });
      return newScale;
    });
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.stopPropagation();
    const delta = e.deltaY * -0.002;
    setScale(prev => {
      const newScale = Math.min(Math.max(1, prev + delta), 5);
      if (newScale === 1) setPosition({ x: 0, y: 0 });
      return newScale;
    });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (scale > 1) {
      e.preventDefault();
      setIsDragging(true);
      setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && scale > 1) {
      e.preventDefault();
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const resetZoom = () => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  return (
    <div 
      className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center animate-fadeIn select-none"
      onClick={(e) => {
        // Close if clicking outside the image (only if not zoomed)
        if (scale === 1 && e.target === e.currentTarget) onClose();
      }}
      onWheel={handleWheel}
    >
      {/* Top Controls */}
      <div className="absolute top-6 right-6 z-[110] flex gap-4 items-center">
        <div className="bg-stone-900/80 rounded-full px-4 py-2 text-white font-highlight text-sm border border-stone-700 backdrop-blur">
             {Math.round(scale * 100)}%
        </div>
        <button 
          onClick={onClose}
          className="p-3 bg-stone-800 hover:bg-red-900/50 text-white rounded-full transition-colors border border-stone-700"
        >
          <X size={24} />
        </button>
      </div>

      {/* Bottom Controls */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-[110] flex gap-2 bg-stone-900/90 p-2 rounded-full border border-stone-700 backdrop-blur shadow-2xl">
        <button onClick={() => handleZoom(-0.5)} className="p-3 hover:bg-stone-700 rounded-full text-white transition-colors" title="Zoom Out">
          <ZoomOut size={20} />
        </button>
        <button onClick={resetZoom} className="p-3 hover:bg-stone-700 rounded-full text-white transition-colors" title="Reset">
          <RotateCcw size={20} />
        </button>
        <button onClick={() => handleZoom(0.5)} className="p-3 hover:bg-stone-700 rounded-full text-white transition-colors" title="Zoom In">
          <ZoomIn size={20} />
        </button>
      </div>

      {/* Image Container */}
      <div 
        className="relative w-full h-full flex items-center justify-center p-4 overflow-hidden"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        style={{ cursor: scale > 1 ? (isDragging ? 'grabbing' : 'grab') : 'default' }}
      >
        <img 
          src={src} 
          alt={alt} 
          className="max-w-full max-h-full object-contain transition-transform duration-75 ease-out"
          style={{ 
            transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
          }}
          draggable={false}
          onClick={(e) => e.stopPropagation()}
        />
      </div>
    </div>
  );
};

export default ImageViewer;