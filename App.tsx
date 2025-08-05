import React, { useState } from 'react';
import { Header } from './components/Header';
import { SwipeContainer } from './components/SwipeContainer';
import { ActionButtons } from './components/ActionButtons';
import { ChatInterface } from './components/ChatInterface';
import exampleImage from 'figma:asset/007bac3d9bba8f2d0d382f0e1681efe3597df02f.png';

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

// Mock clothing data with some AI-generated items
const mockClothingItems: ClothingItem[] = [
  {
    id: '1',
    name: 'Vintage Denim Jacket',
    brand: 'Urban Style',
    price: 89,
    image: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=400&h=400&fit=crop',
    category: 'top',
    color: '#4169E1'
  },
  {
    id: '2',
    name: 'Floral Summer Dress',
    brand: 'Bloom & Co',
    price: 125,
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=400&fit=crop',
    category: 'dress',
    color: '#FFB6C1'
  },
  {
    id: '3',
    name: 'Classic White Sneakers',
    brand: 'ComfortWalk',
    price: 95,
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop',
    category: 'shoes',
    color: '#FFFFFF'
  },
  {
    id: '4',
    name: 'Cozy Knit Sweater',
    brand: 'WarmThreads',
    price: 75,
    image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&h=400&fit=crop',
    category: 'top',
    color: '#8B4513'
  }
];

// Mock Gemini Flash API function
const generateOutfitWithGemini = async (prompt: string, userImage: string): Promise<ClothingItem> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Mock AI-generated outfit based on prompt
  const aiOutfits = [
    {
      id: `ai-${Date.now()}`,
      name: `AI Styled ${prompt.includes('casual') ? 'Casual' : prompt.includes('formal') ? 'Formal' : 'Custom'} Outfit`,
      brand: 'AI Designer',
      price: Math.floor(Math.random() * 200) + 50,
      image: `https://images.unsplash.com/photo-${Math.floor(Math.random() * 1000000000)}?w=400&h=400&fit=crop`,
      category: 'top' as const,
      color: '#FF6B9D',
      aiGenerated: true,
      prompt: prompt
    }
  ];
  
  return aiOutfits[0];
};

export default function App() {
  const [savedItems, setSavedItems] = useState<ClothingItem[]>([]);
  const [currentItems, setCurrentItems] = useState<ClothingItem[]>(mockClothingItems);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [triggerAction, setTriggerAction] = useState<'save' | 'skip' | 'previous' | null>(null);
  const [navigationHistory, setNavigationHistory] = useState<number[]>([]);

  // Using the new uploaded example image
  const userImage = exampleImage;

  const handleSave = (item: ClothingItem) => {
    setSavedItems(prev => [...prev, item]);
    setNavigationHistory(prev => [...prev, currentIndex]);
    console.log('Saved to wardrobe:', item.name);
  };

  const handleSkip = (item: ClothingItem) => {
    setNavigationHistory(prev => [...prev, currentIndex]);
    console.log('Skipped:', item.name);
  };

  const handlePrevious = (item: ClothingItem) => {
    console.log('Going back from:', item.name);
    setNavigationHistory(prev => prev.slice(0, -1));
  };

  const handleOutfitChange = async (prompt: string) => {
    setIsGenerating(true);
    
    try {
      const newOutfit = await generateOutfitWithGemini(prompt, userImage);
      const updatedItems = [...currentItems];
      updatedItems.splice(currentIndex, 0, newOutfit);
      setCurrentItems(updatedItems);
    } catch (error) {
      console.error('Error generating outfit:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleButtonSave = () => {
    if (currentIndex < currentItems.length && !triggerAction) {
      setTriggerAction('save');
    }
  };

  const handleButtonSkip = () => {
    if (currentIndex < currentItems.length && !triggerAction) {
      setTriggerAction('skip');
    }
  };

  const handleButtonPrevious = () => {
    if (navigationHistory.length > 0 && !triggerAction) {
      setTriggerAction('previous');
    }
  };

  const handleActionComplete = () => {
    setTriggerAction(null);
  };

  const handleIndexChange = (newIndex: number) => {
    if (triggerAction === 'previous' && navigationHistory.length > 0) {
      const previousIndex = navigationHistory[navigationHistory.length - 1];
      setCurrentIndex(previousIndex);
    } else {
      setCurrentIndex(newIndex);
    }
  };

  const canGoPrevious = navigationHistory.length > 0;

  return (
    <div className="min-h-screen p-6" style={{ background: 'var(--neuro-bg-primary)' }}>
      {/* Outer Neumorphic Container - matching uploaded design */}
      <div className="max-w-md mx-auto h-[calc(100vh-3rem)] neuro-outset rounded-3xl p-4" 
           style={{ background: 'var(--neuro-bg-primary)' }}>
        
        {/* Inner Container */}
        <div className="h-full neuro-inset rounded-3xl p-4 flex flex-col overflow-hidden"
             style={{ background: 'var(--neuro-bg-secondary)' }}>
          
          {/* Header */}
          <Header 
            userImage={userImage}
            userName="Sofia"
            wardrobeCount={savedItems.length}
          />
          
          {/* Main Content Container */}
          <div className="flex-1 neuro-inset rounded-3xl p-4 my-4 relative overflow-hidden"
               style={{ background: 'var(--neuro-bg-tertiary)' }}>
            
            {/* Decorative Gen Z Elements */}
            <div className="absolute top-4 right-4 w-8 h-8 rounded-full gradient-sunset animate-float opacity-70"></div>
            <div className="absolute bottom-6 left-6 w-6 h-6 rounded-full gradient-ocean animate-float opacity-60" style={{ animationDelay: '2s' }}></div>
            <div className="absolute top-1/2 left-2 w-4 h-4 rounded-full gradient-cosmic animate-float opacity-50" style={{ animationDelay: '4s' }}></div>
            
            {/* Main Swipe Area */}
            <div className="h-full">
              <SwipeContainer
                items={currentItems}
                onSave={handleSave}
                onSkip={handleSkip}
                onPrevious={handlePrevious}
                userImage={userImage}
                currentIndex={currentIndex}
                onIndexChange={handleIndexChange}
                isGenerating={isGenerating}
                triggerAction={triggerAction}
                onActionComplete={handleActionComplete}
              />
            </div>
          </div>
          
          {/* Action Buttons */}
          <ActionButtons
            onSave={handleButtonSave}
            onSkip={handleButtonSkip}
            onPrevious={handleButtonPrevious}
            disabled={currentIndex >= currentItems.length || isGenerating || !!triggerAction}
            canGoPrevious={canGoPrevious}
          />
          
          {/* Chat Interface */}
          <div className="mt-4">
            <ChatInterface
              onOutfitChange={handleOutfitChange}
              currentOutfit={currentIndex < currentItems.length ? currentItems[currentIndex]?.name : undefined}
              isGenerating={isGenerating}
            />
          </div>
        </div>
      </div>
    </div>
  );
}