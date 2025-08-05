import React, { useState, useEffect } from 'react';
import { Send, Sparkles, Loader2 } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

interface ChatInterfaceProps {
  onOutfitChange: (prompt: string) => void;
  currentOutfit?: string;
  isGenerating?: boolean;
}

export function ChatInterface({ onOutfitChange, currentOutfit, isGenerating = false }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isGenerating) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    onOutfitChange(inputValue);

    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: `I'm generating a new outfit based on: "${inputValue}". The virtual try-on will update shortly! ✨`,
        sender: 'ai',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="relative">
      {/* Messages Overlay - appears when there are messages */}
      {messages.length > 0 && (
        <div className="absolute bottom-full left-0 right-0 mb-4 max-h-48 overflow-y-auto">
          <div className="neuro-outset rounded-3xl p-4 space-y-3"
               style={{ background: 'var(--neuro-bg-secondary)' }}>
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] px-4 py-2 rounded-2xl text-sm ${
                    message.sender === 'user'
                      ? 'gradient-sunset text-white neuro-inset ml-4'
                      : 'neuro-button mr-4'
                  }`}
                  style={message.sender === 'ai' ? { 
                    background: 'var(--neuro-bg-tertiary)', 
                    color: 'var(--neuro-text-primary)' 
                  } : {}}
                >
                  {message.text}
                </div>
              </div>
            ))}
            
            {isGenerating && (
              <div className="flex justify-start">
                <div className="neuro-button px-4 py-2 rounded-2xl mr-4 flex items-center gap-2"
                     style={{ background: 'var(--neuro-bg-tertiary)' }}>
                  <div className="gradient-cosmic w-4 h-4 rounded-full flex items-center justify-center animate-spin">
                    <Loader2 className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-sm" style={{ color: 'var(--neuro-text-primary)' }}>
                    Generating outfit...
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Input Area - matching uploaded design */}
      <div className="neuro-outset rounded-3xl p-4"
           style={{ background: 'var(--neuro-bg-secondary)' }}>
        <div className="flex items-center gap-3">
          <div className="flex-1 relative">
            <input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Tell me how you want it..."
              disabled={isGenerating}
              className="w-full neuro-inset rounded-2xl px-4 py-3 text-sm outline-none transition-all duration-200 focus:neuro-pressed"
              style={{ 
                background: 'var(--neuro-bg-tertiary)', 
                color: 'var(--neuro-text-primary)',
                border: 'none'
              }}
            />
            
            {/* Sparkle decoration */}
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <Sparkles className="w-4 h-4 opacity-40" style={{ color: 'var(--neuro-text-secondary)' }} />
            </div>
          </div>
          
          {/* Send Button - Electric Blue */}
          <button
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isGenerating}
            className="w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:scale-100"
            style={{
              background: 'var(--accent-electric-blue)',
              boxShadow: '4px 4px 8px rgba(131, 56, 236, 0.3), -2px -2px 6px rgba(131, 56, 236, 0.1), inset 1px 1px 2px rgba(255, 255, 255, 0.2)'
            }}
          >
            <Send className="w-5 h-5 text-white" />
          </button>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute -top-1 right-8 w-2 h-2 gradient-sunset rounded-full animate-float opacity-70"></div>
        <div className="absolute -bottom-1 left-8 w-3 h-3 gradient-ocean rounded-full animate-float opacity-60" style={{ animationDelay: '2s' }}></div>
      </div>
    </div>
  );
}