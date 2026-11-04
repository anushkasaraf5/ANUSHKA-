import React, { useState, useMemo, useEffect } from 'react';
import { FlipbookPage } from '../types';
import { ChevronLeft, ChevronRight, BookOpen, PauseCircle, PlayCircle } from 'lucide-react';

interface FlipbookProps {
  pages: FlipbookPage[];
}

// Internal interface for the flattened page structure
interface RenderablePage {
  id: string;
  imageUrl: string;
  isSpread: boolean;
  side: 'left' | 'right' | 'single';
}

const Flipbook: React.FC<FlipbookProps> = ({ pages }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Flatten the input pages (Covers + Spreads) into a sequential list of book pages (1, 2, 3...)
  const renderablePages = useMemo(() => {
    const flatPages: RenderablePage[] = [];

    pages.forEach((page, index) => {
      if (page.type === 'cover' || page.type === 'back') {
        // Covers are single width pages
        flatPages.push({
          id: `page-${index}`,
          imageUrl: page.imageUrl,
          isSpread: false,
          side: 'single'
        });
      } else if (page.type === 'spread') {
        // Spreads are split into two pages (Left and Right)
        flatPages.push({
          id: `page-${index}-L`,
          imageUrl: page.imageUrl,
          isSpread: true,
          side: 'left'
        });
        flatPages.push({
          id: `page-${index}-R`,
          imageUrl: page.imageUrl,
          isSpread: true,
          side: 'right'
        });
      }
    });
    return flatPages;
  }, [pages]);

  // Auto-flip logic
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;

    if (!isPaused) {
      interval = setInterval(() => {
        setCurrentPage((prev) => {
          // If at the end, close the book (reset to 0)
          if (prev >= renderablePages.length - 1) {
            return 0;
          }
          // If closed (0), open it (1)
          if (prev === 0) {
            return 1;
          }
          // Otherwise turn page (advance by 2)
          return prev + 2;
        });
      }, 3500); // Flip every 3.5 seconds
    }

    return () => clearInterval(interval);
  }, [isPaused, renderablePages.length]);

  const nextPage = () => {
    if (currentPage < renderablePages.length) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(prev => prev - 1);
    }
  };

  return (
    <div 
      className="w-full max-w-3xl mx-auto py-8 px-2 flex flex-col items-center"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* 3D Book Container */}
      {/* Aspect Ratio: A standard portrait page is roughly 3:4. Two pages = 6:4 or 3:2. */}
      <div className="relative w-full aspect-[3/2] perspective-1500 group select-none">
        <div className="w-full h-full relative preserve-3d">
           
           {/* Book Spine/Shadow/Base */}
           <div className="absolute top-2 bottom-2 left-[49%] right-[49%] bg-stone-900/10 dark:bg-black/30 blur-sm z-0"></div>
           <div className="absolute inset-x-4 -bottom-4 h-4 bg-black/20 blur-xl rounded-[50%]"></div>

           {/* BOOK LOGIC:
               We render pages in pairs or individually depending on z-index requirements.
               Simplest CSS 3D Flipbook logic:
               - All pages are anchored at center.
               - Pages < currentPage are rotated -180deg (Left side).
               - Pages >= currentPage are rotated 0deg (Right side).
               - Z-Index management is crucial.
           */}

           {renderablePages.map((page, index) => {
             // Logic:
             // Even indices (0, 2, 4...) are naturally on the RIGHT.
             // Odd indices (1, 3, 5...) are naturally on the LEFT (back of the previous page).
             
             // Let's reorganize into Leaves.
             const leafIndex = Math.floor(index / 2);
             const isFrontOfLeaf = index % 2 === 0; 
             
             // Let's just create a container for each *Leaf* based on the even pages.
             if (!isFrontOfLeaf) return null; // Skip odd pages, they are rendered as 'back' of the leaf

             const frontPage = page;
             const backPage = renderablePages[index + 1];

             // State of this leaf
             // If currentPage > index, this leaf is flipped to the left.
             const isFlipped = currentPage > index;
             
             // Z-Index:
             // If not flipped (Right side): Lower index = Higher Z (on top).
             // If flipped (Left side): Higher index = Higher Z (on top).
             const zIndex = isFlipped ? index : (renderablePages.length - index);

             return (
               <div
                 key={`leaf-${leafIndex}`}
                 className="absolute top-0 left-1/2 w-1/2 h-full origin-left transition-transform duration-700 ease-in-out cursor-pointer preserve-3d"
                 style={{
                   zIndex: zIndex,
                   transform: `rotateY(${isFlipped ? -180 : 0}deg)`,
                 }}
                 onClick={() => {
                   if (isFlipped) prevPage(); // Click left side to go back
                   else nextPage(); // Click right side to go forward
                 }}
               >
                 {/* FRONT OF LEAF (Right Page) */}
                 <div className="absolute inset-0 backface-hidden bg-white dark:bg-stone-900 overflow-hidden shadow-[-1px_0_5px_rgba(0,0,0,0.1)] rounded-r-sm">
                    {/* Render Content for Front Page */}
                    <div className="w-full h-full relative">
                        {/* Image Layer */}
                        <div 
                           className="w-full h-full bg-cover bg-no-repeat bg-center"
                           style={{ 
                             backgroundImage: `url(${frontPage.imageUrl})`,
                             // If spread, we only show the right half
                             backgroundPosition: frontPage.side === 'right' ? '100% center' : (frontPage.side === 'left' ? '0% center' : 'center'),
                             backgroundSize: frontPage.isSpread ? '200% 100%' : 'cover'
                           }}
                        />
                        {/* Gradient Overlay for lighting effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-black/10 to-transparent pointer-events-none mix-blend-multiply"></div>
                    </div>
                 </div>

                 {/* BACK OF LEAF (Left Page) */}
                 {backPage && (
                   <div 
                      className="absolute inset-0 backface-hidden bg-white dark:bg-stone-900 overflow-hidden shadow-[1px_0_5px_rgba(0,0,0,0.1)] rounded-l-sm"
                      style={{ transform: 'rotateY(180deg)' }}
                   >
                      <div className="w-full h-full relative">
                          {/* Image Layer */}
                          <div 
                             className="w-full h-full bg-cover bg-no-repeat bg-center"
                             style={{ 
                               backgroundImage: `url(${backPage.imageUrl})`,
                               // If spread, we only show the left half
                               backgroundPosition: backPage.side === 'left' ? '0% center' : (backPage.side === 'right' ? '100% center' : 'center'),
                               backgroundSize: backPage.isSpread ? '200% 100%' : 'cover'
                             }}
                          />
                          {/* Gradient Overlay for lighting effect - reversed for left page */}
                          <div className="absolute inset-0 bg-gradient-to-l from-black/10 to-transparent pointer-events-none mix-blend-multiply"></div>
                      </div>
                   </div>
                 )}
               </div>
             );
           })}
        </div>
        
        {/* Play/Pause Indicator (Overlay) */}
        <div className="absolute top-4 right-4 z-20 text-stone-400 bg-white/80 dark:bg-black/80 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none backdrop-blur-sm">
           {isPaused ? <PauseCircle size={20} /> : <PlayCircle size={20} />}
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center gap-8 mt-6">
        <button 
          onClick={() => {
             // Go back 2 pages (1 leaf)
             if (currentPage > 0) setCurrentPage(p => p - 2 < 0 ? 0 : p - 2);
          }}
          disabled={currentPage === 0}
          className="p-3 rounded-full bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors text-stone-900 dark:text-white"
        >
          <ChevronLeft size={24} />
        </button>
        
        <div className="text-sm font-subheading font-medium text-stone-500 uppercase tracking-widest flex flex-col items-center">
           <span>{currentPage === 0 ? "Cover" : currentPage >= renderablePages.length ? "End" : `Page ${currentPage} - ${currentPage + 1}`}</span>
           <span className="text-[13px] text-stone-400 mt-1 opacity-70">{isPaused ? "(Paused)" : "(Auto-playing)"}</span>
        </div>

        <button 
          onClick={() => {
             // Go forward 2 pages
             if (currentPage < renderablePages.length) setCurrentPage(p => p + 2);
          }}
          disabled={currentPage >= renderablePages.length}
          className="p-3 rounded-full bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors text-stone-900 dark:text-white"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      <style>{`
        .perspective-1500 {
          perspective: 1500px;
        }
        .preserve-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
      `}</style>
    </div>
  );
};

export default Flipbook;