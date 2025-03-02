
import React, { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Destination } from '@/lib/gameData';
import { ArrowRight, Smile, Frown } from 'lucide-react';

interface ResultFeedbackProps {
  isCorrect: boolean;
  funFact: string;
  destination: Destination;
  onNext: () => void;
}

const ResultFeedback: React.FC<ResultFeedbackProps> = ({ 
  isCorrect, 
  funFact, 
  destination, 
  onNext 
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Scroll to feedback if needed
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      const isVisible = rect.top >= 0 && rect.bottom <= window.innerHeight;
      
      if (!isVisible) {
        cardRef.current.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'center'
        });
      }
    }
  }, []);

  return (
    <div 
      ref={cardRef}
      className={`bg-glass rounded-xl p-6 shadow-xl mb-6 animate-scale-in overflow-hidden ${
        isCorrect ? 'border-green-200' : 'border-red-200'
      }`}
    >
      <div className="flex items-center gap-3 mb-4">
        <div className={`
          rounded-full p-2 
          ${isCorrect ? 'bg-green-100 text-green-600 animate-pulse-soft' : 'bg-red-100 text-red-600 animate-shake'}
        `}>
          {isCorrect ? (
            <Smile className="w-6 h-6" />
          ) : (
            <Frown className="w-6 h-6" />
          )}
        </div>
        
        <h3 className="text-xl font-semibold animate-reveal-text">
          {isCorrect ? 'Correct!' : 'Not quite right!'}
        </h3>
      </div>
      
      <div className="flex flex-col md:flex-row gap-6 items-center">
        <div className="w-full md:w-1/3 aspect-video rounded-lg overflow-hidden shadow-md">
          <img 
            src={destination.images.main}
            alt={destination.name}
            className="w-full h-full object-cover transition-all duration-700 hover:scale-110"
          />
        </div>
        
        <div className="w-full md:w-2/3">
          <h4 className="text-lg font-medium mb-2 animate-reveal-text" style={{ animationDelay: '0.1s' }}>
            {destination.name}, {destination.country}
          </h4>
          
          <div className="bg-white/60 p-3 rounded-lg mb-4 shadow-sm animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <p className="text-gray-700">{funFact}</p>
          </div>
          
          <Button 
            onClick={onNext}
            className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white hover-scale hover-glow animate-fade-in"
            style={{ animationDelay: '0.3s' }}
          >
            <span>Next City</span>
            <ArrowRight size={16} className="animate-bounce-soft" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ResultFeedback;
