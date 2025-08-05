import React, { useState, useEffect } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Sparkles, Loader2, Star, Heart } from 'lucide-react';

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

interface ClothingCardProps {
  item: ClothingItem;
  userImage?: string;
  style?: React.CSSProperties;
  className?: string;
  isGenerating?: boolean;
  onRegenerateComplete?: () => void;
}

export function ClothingCard({ 
  item, 
  userImage, 
  style, 
  className = '',
  isGenerating = false,
  onRegenerateComplete
}: ClothingCardProps) {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isGenerating) {
      setIsLoading(true);
      const timer = setTimeout(() => {
        setIsLoading(false);
        onRegenerateComplete?.();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isGenerating, onRegenerateComplete]);

  return (
    <div 
      className={`relative w-full h-full rounded-3xl overflow-hidden ${className}`}
      style={{ 
        background: 'var(--neuro-bg-tertiary)',
        ...style 
      }}
    >
      {/* Gen Z Scrapbook Picture Area - Full Size */}
      <div className="absolute inset-0">
        {/* Scrapbook Background with Textures */}
        <div className="w-full h-full relative overflow-hidden">
          {/* Paper texture background */}
          <div className="absolute inset-0" 
               style={{
                 background: `
                   radial-gradient(circle at 20% 80%, rgba(255, 182, 193, 0.1) 0%, transparent 50%),
                   radial-gradient(circle at 80% 20%, rgba(173, 216, 230, 0.1) 0%, transparent 50%),
                   radial-gradient(circle at 40% 40%, rgba(255, 255, 224, 0.05) 0%, transparent 50%)
                 `
               }}>
          </div>
          
          {/* Grid pattern - very subtle */}
          <div className="absolute inset-0 opacity-5">
            <div style={{ 
              backgroundImage: 'linear-gradient(var(--neuro-shadow-dark) 1px, transparent 1px), linear-gradient(90deg, var(--neuro-shadow-dark) 1px, transparent 1px)',
              backgroundSize: '30px 30px'
            }} className="w-full h-full"></div>
          </div>

          {/* Main Photo Area - Much Larger Polaroid */}
          <div className="absolute inset-2 flex items-center justify-center">
            <div className="relative w-full h-full max-w-80 max-h-96">
              {/* Polaroid-style frame - Much larger */}
              <div className="relative w-full h-full p-2 bg-white rounded-xl shadow-lg transform rotate-1 hover:rotate-0 transition-transform duration-300"
                   style={{ 
                     boxShadow: '8px 8px 16px rgba(0,0,0,0.1), -2px -2px 8px rgba(255,255,255,0.8)',
                     border: '2px solid #f8f8f8'
                   }}>
                
                {/* User Image - Much larger */}
                {userImage ? (
                  <ImageWithFallback
                    src={userImage}
                    alt="Model photo"
                    className="w-full h-5/6 object-cover object-center rounded-lg"
                  />
                ) : (
                  <div className="w-full h-5/6 bg-gray-200 rounded-lg flex items-center justify-center">
                    <span className="text-gray-500 text-sm text-center">Model<br/>Photo</span>
                  </div>
                )}
                
                {/* Polaroid caption area */}
                <div className="h-1/6 bg-white flex items-center justify-center">
                  <span className="text-xs text-gray-600 font-handwriting" style={{ fontFamily: 'cursive' }}>
                    ✨ trying on looks ✨
                  </span>
                </div>
              </div>

              {/* Gen Z Stickers and Doodles - Repositioned for larger image */}
              
              {/* Heart sticker */}
              <div className="absolute -top-3 -right-3 w-10 h-10 gradient-sunset rounded-full flex items-center justify-center transform rotate-12 animate-float shadow-lg">
                <Heart className="w-5 h-5 text-white fill-current" />
              </div>
              
              {/* Star sticker */}
              <div className="absolute -bottom-4 -left-4 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center transform -rotate-12 animate-float shadow-md" style={{ animationDelay: '1s' }}>
                <Star className="w-4 h-4 text-white fill-current" />
              </div>
              
              {/* Lightning bolt doodle */}
              <div className="absolute top-4 left-4 text-3xl transform -rotate-12 animate-float opacity-80" style={{ animationDelay: '2s' }}>
                ⚡
              </div>
              
              {/* Rainbow sticker */}
              <div className="absolute bottom-12 right-4 text-2xl transform rotate-12 animate-float" style={{ animationDelay: '3s' }}>
                🌈
              </div>
              
              {/* Sparkle doodles */}
              <div className="absolute top-16 right-12 text-xl transform rotate-45 animate-float opacity-70" style={{ animationDelay: '4s' }}>
                ✨
              </div>
              
              {/* Fire emoji sticker */}
              <div className="absolute bottom-32 left-4 text-2xl animate-float" style={{ animationDelay: '5s' }}>
                🔥
              </div>
            </div>
          </div>

          {/* Washi Tape Decorations - Repositioned */}
          <div className="absolute top-6 left-3 w-20 h-5 gradient-sunset opacity-60 rounded-full transform -rotate-45"></div>
          <div className="absolute bottom-16 right-6 w-24 h-4 gradient-ocean opacity-50 rounded-full transform rotate-30"></div>
          <div className="absolute top-2/3 right-3 w-4 h-16 gradient-cosmic opacity-40 rounded-full transform rotate-12"></div>

          {/* Scattered Dots Pattern */}
          <div className="absolute top-20 left-12 w-3 h-3 bg-pink-400 rounded-full opacity-60 animate-float"></div>
          <div className="absolute top-40 right-16 w-2 h-2 bg-blue-400 rounded-full opacity-50 animate-float" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-28 left-16 w-3 h-3 bg-yellow-400 rounded-full opacity-70 animate-float" style={{ animationDelay: '2s' }}></div>
          <div className="absolute bottom-48 right-12 w-1.5 h-1.5 bg-green-400 rounded-full opacity-60 animate-float" style={{ animationDelay: '3s' }}></div>

          {/* Hand-drawn style arrows */}
          <div className="absolute top-32 left-20 text-pink-500 opacity-60 transform rotate-45" style={{ fontSize: '24px' }}>
            ↗️
          </div>
          <div className="absolute bottom-40 right-20 text-blue-500 opacity-50 transform -rotate-45" style={{ fontSize: '22px' }}>
            ↙️
          </div>
        </div>
        
        {/* Virtual Try-On Outfit Overlay */}
        {!isLoading && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
            <div className="relative animate-shimmer">
              <ImageWithFallback
                src={item.image}
                alt={item.name}
                className="w-56 h-56 object-contain mix-blend-multiply opacity-75 drop-shadow-2xl"
              />
            </div>
          </div>
        )}
      </div>
      
      {/* AI Processing Overlay */}
      {(isLoading || isGenerating) && (
        <div className="absolute inset-0 glassmorphism flex items-center justify-center z-30">
          <div className="neuro-outset rounded-3xl px-8 py-6 flex items-center gap-4"
               style={{ background: 'var(--neuro-bg-tertiary)' }}>
            <div className="gradient-cosmic w-6 h-6 rounded-full flex items-center justify-center animate-spin">
              <Loader2 className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm" style={{ color: 'var(--neuro-text-primary)' }}>
              AI is styling you...
            </span>
          </div>
        </div>
      )}
      
      {/* AI Generated Badge */}
      {item.aiGenerated && (
        <div className="absolute top-4 left-4 gradient-cosmic text-white px-4 py-2 rounded-2xl text-xs flex items-center gap-2 z-20">
          <Sparkles className="w-3 h-3" />
          AI Generated
        </div>
      )}
    </div>
  );
}