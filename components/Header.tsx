import React from 'react';
import { Settings, User, ShoppingBag, Camera, Bookmark } from 'lucide-react';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

interface HeaderProps {
  userImage?: string;
  userName?: string;
  wardrobeCount?: number;
}

export function Header({ userImage, userName = "You", wardrobeCount = 0 }: HeaderProps) {
  return (
    <div className="flex items-center justify-between py-4">
      {/* Profile Section */}
      <div className="flex items-center gap-4">
        <div className="neuro-outset rounded-full p-1" style={{ background: 'var(--neuro-bg-secondary)' }}>
          <Avatar className="w-12 h-12 neuro-inset">
            <AvatarImage src={userImage} alt={userName} className="object-cover" />
            <AvatarFallback style={{ background: 'var(--neuro-bg-tertiary)', color: 'var(--neuro-text-primary)' }}>
              <User className="w-6 h-6" />
            </AvatarFallback>
          </Avatar>
        </div>
        
        <div>
          <h1 className="text-xl tracking-wide" style={{ color: 'var(--neuro-text-primary)' }}>
            PockeTailor
          </h1>
        </div>
      </div>
      
      {/* Action Buttons - matching uploaded design */}
      <div className="flex items-center gap-3">
        {/* Wardrobe Button */}
        <div className="relative">
          <button className="w-11 h-11 neuro-button rounded-xl flex items-center justify-center transition-all duration-200 hover:neuro-pressed active:neuro-pressed"
                  style={{ background: 'var(--neuro-bg-secondary)' }}>
            <Bookmark className="w-5 h-5" style={{ color: 'var(--neuro-text-primary)' }} />
          </button>
          {wardrobeCount > 0 && (
            <div className="absolute -top-2 -right-2 w-5 h-5 gradient-sunset rounded-full flex items-center justify-center animate-glow">
              <span className="text-xs text-white font-medium">
                {wardrobeCount > 9 ? '9+' : wardrobeCount}
              </span>
            </div>
          )}
        </div>
        
        {/* Camera Button */}
        <button className="w-11 h-11 neuro-button rounded-xl flex items-center justify-center transition-all duration-200 hover:neuro-pressed active:neuro-pressed"
                style={{ background: 'var(--neuro-bg-secondary)' }}>
          <Camera className="w-5 h-5" style={{ color: 'var(--neuro-text-primary)' }} />
        </button>
        
        {/* Settings Button */}
        <button className="w-11 h-11 neuro-button rounded-xl flex items-center justify-center transition-all duration-200 hover:neuro-pressed active:neuro-pressed"
                style={{ background: 'var(--neuro-bg-secondary)' }}>
          <Settings className="w-5 h-5" style={{ color: 'var(--neuro-text-primary)' }} />
        </button>
      </div>
    </div>
  );
}