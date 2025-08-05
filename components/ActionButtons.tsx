import React from 'react';
import { Heart, X, ArrowLeft, RotateCcw } from 'lucide-react';

interface ActionButtonsProps {
  onSave: () => void;
  onSkip: () => void;
  onPrevious: () => void;
  disabled?: boolean;
  canGoPrevious?: boolean;
}

export function ActionButtons({ onSave, onSkip, onPrevious, disabled = false, canGoPrevious = false }: ActionButtonsProps) {
  return (
    <div className="flex items-center justify-center gap-4 py-4">
      {/* Rewind Button */}
      <button
        className="flex-1 max-w-24 h-14 neuro-button rounded-3xl flex items-center justify-center transition-all duration-200 hover:neuro-pressed active:neuro-pressed disabled:opacity-50"
        style={{ 
          background: 'var(--neuro-bg-secondary)',
          color: 'var(--neuro-text-primary)'
        }}
        onClick={onPrevious}
        disabled={!canGoPrevious || disabled}
      >
        <span className="text-sm">Rewind</span>
      </button>
      
      {/* Skip Button */}
      <button
        className="flex-1 max-w-24 h-14 neuro-button rounded-3xl flex items-center justify-center transition-all duration-200 hover:neuro-pressed active:neuro-pressed"
        style={{ 
          background: 'var(--neuro-bg-secondary)',
          color: 'var(--neuro-text-primary)'
        }}
        onClick={onSkip}
        disabled={disabled}
      >
        <span className="text-sm">Skip</span>
      </button>
      
      {/* Save Button - darker brown like in uploaded image */}
      <button
        className="flex-1 max-w-24 h-14 rounded-3xl flex items-center justify-center text-white transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg"
        style={{ 
          background: 'linear-gradient(135deg, #8B4513, #A0522D)',
          boxShadow: 'inset 2px 2px 4px rgba(139, 69, 19, 0.7), inset -2px -2px 4px rgba(160, 82, 45, 0.3), 4px 4px 8px rgba(139, 69, 19, 0.3)'
        }}
        onClick={onSave}
        disabled={disabled}
      >
        <span className="text-sm">Save</span>
      </button>
    </div>
  );
}