import React, { useState, useEffect } from 'react';
import { motion, PanInfo, useMotionValue, useTransform, useAnimation } from 'motion/react';
import { ClothingCard } from './ClothingCard';

interface ClothingItem {
  id: string;
  name: string;
  brand: string;
  price: number;
  image: string;
  category: 'top' | 'bottom' | 'dress' | 'shoes' | 'accessory';
  color: string;
  aiGenerated?: boolean;
  prompt?: string;
}

interface SwipeContainerProps {
  items: ClothingItem[];
  onSave: (item: ClothingItem) => void;
  onSkip: (item: ClothingItem) => void;
  onPrevious: (item: ClothingItem) => void;
  userImage?: string;
  currentIndex: number;
  onIndexChange: (index: number) => void;
  isGenerating?: boolean;
  triggerAction?: 'save' | 'skip' | 'previous' | null;
  onActionComplete?: () => void;
}

export function SwipeContainer({ 
  items, 
  onSave, 
  onSkip, 
  onPrevious,
  userImage, 
  currentIndex,
  onIndexChange,
  isGenerating = false,
  triggerAction,
  onActionComplete
}: SwipeContainerProps) {
  const [exitX, setExitX] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-15, 15]);
  const opacity = useTransform(x, [-200, -150, 0, 150, 200], [0, 1, 1, 1, 0]);
  const controls = useAnimation();

  // Handle programmatic animations from button clicks
  useEffect(() => {
    if (triggerAction && !isAnimating && currentIndex < items.length) {
      setIsAnimating(true);
      const currentItem = items[currentIndex];
      
      switch (triggerAction) {
        case 'save':
          animateCard(200, () => {
            onSave(currentItem);
            goToNext();
          });
          break;
        case 'skip':
          animateCard(-200, () => {
            onSkip(currentItem);
            goToNext();
          });
          break;
        case 'previous':
          animateCard(200, () => {
            onPrevious(currentItem);
            goToPrevious();
          });
          break;
      }
    }
  }, [triggerAction]);

  const animateCard = (direction: number, callback: () => void) => {
    controls.start({
      x: direction,
      opacity: 0,
      transition: { duration: 0.3 }
    }).then(() => {
      callback();
      setTimeout(() => {
        setIsAnimating(false);
        onActionComplete?.();
      }, 100);
    });
  };

  const handleDragEnd = (event: any, info: PanInfo) => {
    if (isGenerating || isAnimating) return;
    
    const threshold = 100;
    
    if (info.offset.x > threshold) {
      // Swiped right - Save
      setExitX(200);
      handleSave();
    } else if (info.offset.x < -threshold) {
      // Swiped left - Skip
      setExitX(-200);
      handleSkip();
    } else {
      // Return to center
      x.set(0);
    }
  };

  const handleSave = () => {
    if (currentIndex < items.length) {
      onSave(items[currentIndex]);
      goToNext();
    }
  };

  const handleSkip = () => {
    if (currentIndex < items.length) {
      onSkip(items[currentIndex]);
      goToNext();
    }
  };

  const goToNext = () => {
    setTimeout(() => {
      onIndexChange(currentIndex + 1);
      resetCard();
    }, 300);
  };

  const goToPrevious = () => {
    setTimeout(() => {
      onIndexChange(currentIndex - 1);
      resetCard();
    }, 300);
  };

  const resetCard = () => {
    setExitX(0);
    x.set(0);
    controls.set({ x: 0, opacity: 1 });
  };

  if (currentIndex >= items.length) {
    return (
      <div className="flex items-center justify-center h-full px-6">
        <div className="text-center">
          <div className="w-24 h-24 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">✨</span>
          </div>
          <h2 className="text-xl mb-2">All done!</h2>
          <p className="text-gray-600">Check your collection or ask for more styles in the chat!</p>
        </div>
      </div>
    );
  }

  const currentItem = items[currentIndex];
  const nextItem = items[currentIndex + 1];

  return (
    <div className="relative w-full h-full flex items-center justify-center px-4">
      {/* Next card (background) */}
      {nextItem && (
        <div className="absolute inset-6">
          <ClothingCard
            item={nextItem}
            userImage={userImage}
            className="opacity-30 scale-95"
          />
        </div>
      )}
      
      {/* Current card (foreground) */}
      <motion.div
        className={`absolute inset-4 ${isGenerating || isAnimating ? '' : 'cursor-grab active:cursor-grabbing'}`}
        style={{
          x,
          rotate,
          opacity,
        }}
        animate={controls}
        drag={isGenerating || isAnimating ? false : "x"}
        dragConstraints={{ left: 0, right: 0 }}
        onDragEnd={handleDragEnd}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <ClothingCard 
          item={currentItem} 
          userImage={userImage}
          isGenerating={isGenerating}
        />
        
        {/* Swipe indicators */}
        {!isGenerating && !isAnimating && (
          <>
            <motion.div
              className="absolute top-1/2 left-6 transform -translate-y-1/2 bg-pink-500 text-white px-4 py-2 rounded-2xl shadow-lg"
              style={{
                opacity: useTransform(x, [0, 100], [0, 1]),
                scale: useTransform(x, [0, 100], [0.8, 1]),
              }}
            >
              SAVE
            </motion.div>
            
            <motion.div
              className="absolute top-1/2 right-6 transform -translate-y-1/2 bg-gray-500 text-white px-4 py-2 rounded-2xl shadow-lg"
              style={{
                opacity: useTransform(x, [-100, 0], [1, 0]),
                scale: useTransform(x, [-100, 0], [1, 0.8]),
              }}
            >
              SKIP
            </motion.div>
          </>
        )}
      </motion.div>
    </div>
  );
}