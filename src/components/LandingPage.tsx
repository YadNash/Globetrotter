import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { saveUserData, checkForChallenge, getUserData } from '@/lib/gameUtils';
import { ArrowRight, Globe, MapPin, Compass } from 'lucide-react';

interface LandingPageProps {
  onStart: (username: string) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => {
  const [username, setUsername] = useState('');
  const [challenger, setChallenger] = useState<string | null>(null);
  const [challengerScore, setChallengerScore] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const globeRef = useRef<HTMLDivElement>(null);
  
  const decorativeIcons = [
    { icon: <MapPin size={20} />, delay: 0.2, top: '20%', left: '10%' },
    { icon: <Compass size={24} />, delay: 0.5, top: '70%', left: '15%' },
    { icon: <Globe size={18} />, delay: 0.8, top: '30%', left: '85%' },
    { icon: <MapPin size={16} />, delay: 1.1, top: '80%', left: '80%' },
    { icon: <Compass size={22} />, delay: 1.4, top: '15%', left: '65%' },
  ];
  
  useEffect(() => {
    const challengerName = checkForChallenge();
    if (challengerName) {
      setChallenger(challengerName);
    }
    
    if (inputRef.current) {
      inputRef.current.focus();
    }
    
    const savedUser = getUserData();
    if (savedUser) {
      setUsername(savedUser.username);
      setChallengerScore(savedUser.score);
    }
  }, []);
  
  const handleStart = () => {
    if (username.trim().length > 0) {
      saveUserData(username, 0);
      onStart(username);
    } else if (inputRef.current) {
      inputRef.current.focus();
      
      inputRef.current.classList.add('animate-shake');
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.classList.remove('animate-shake');
        }
      }, 600);
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleStart();
    }
  };
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full overflow-hidden bg-gradient-to-b from-blue-50 to-sky-100 px-4 sm:px-6 relative">
      {decorativeIcons.map((item, index) => (
        <div 
          key={index}
          className="absolute text-primary/30 animate-float"
          style={{ 
            top: item.top, 
            left: item.left, 
            animationDelay: `${item.delay}s`,
            animationDuration: `${6 + index}s`
          }}
        >
          {item.icon}
        </div>
      ))}
      
      <div className="max-w-md w-full space-y-8 animate-fade-in">
        <div className="text-center">
          <div 
            ref={globeRef} 
            className="flex items-center justify-center h-24 w-24 rounded-full bg-glass mx-auto mb-6 animate-float relative group"
          >
            <div className="absolute inset-0 rounded-full bg-blue-400/20 animate-pulse-scale scale-125 opacity-0 group-hover:opacity-50 transition-opacity"></div>
            <Globe size={48} className="text-primary animate-pulse-scale" />
          </div>
          
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl mb-2 animate-slide-in">
            <span className="block">Globetrotter</span>
          </h1>
          
          <p className="text-xl text-gray-600 max-w-md mx-auto mb-8 text-balance animate-slide-in" style={{ animationDelay: '0.1s' }}>
            The Ultimate Travel Guessing Game
          </p>
          
          {challenger && (
            <div className="bg-glass rounded-xl p-4 mb-8 animate-scale-in" style={{ animationDelay: '0.2s' }}>
              <p className="text-gray-700 font-medium">
                {challenger} has challenged you to beat their score!
              </p>
              {challengerScore !== null && (
                <p className="text-sm text-gray-500 mt-1 animate-fade-in" style={{ animationDelay: '0.3s' }}>
                  Their score: {challengerScore} points
                </p>
              )}
            </div>
          )}
        </div>
        
        <div className="bg-glass rounded-xl p-6 shadow-xl animate-scale-in" style={{ animationDelay: '0.2s' }}>
          <div className="space-y-4">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 animate-fade-in" style={{ animationDelay: '0.3s' }}>
              Enter your traveler name
            </label>
            
            <Input
              id="username"
              ref={inputRef}
              type="text"
              placeholder="Your name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full px-4 py-2 border-gray-300 focus:ring-primary focus:border-primary transition-all duration-200 animate-fade-in"
              style={{ animationDelay: '0.4s' }}
            />
            
            <Button 
              onClick={handleStart}
              className="w-full flex items-center justify-center space-x-2 py-6 bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-300 hover:scale-105 animate-fade-in"
              style={{ animationDelay: '0.5s' }}
            >
              <span>Start Exploring</span>
              <ArrowRight size={18} className="animate-bounce-soft" />
            </Button>
          </div>
        </div>
      </div>
      
      <div className="mt-8 text-center text-sm text-gray-500 animate-fade-in" style={{ animationDelay: '0.6s' }}>
        <p>Test your knowledge of famous destinations around the world.</p>
      </div>
    </div>
  );
};

export default LandingPage;
