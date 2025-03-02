
import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Destination, 
  getRandomDestination, 
  createAnswerOptions 
} from '@/lib/gameData';
import { 
  getRandomClues, 
  getRandomFunFact, 
  generateConfetti 
} from '@/lib/gameUtils';
import ResultFeedback from './ResultFeedback';
import ScoreBoard from './ScoreBoard';
import CelebrationDialog from './CelebrationDialog';
import { ArrowRight, Clock, AlertCircle, HelpCircle } from 'lucide-react';
import { toast } from 'sonner';

interface GamePlayProps {
  username: string;
  onChallenge: () => void;
  onGameEnd: (finalScore: number) => void;
}

const QUESTION_TIME_LIMIT = 30; // 30 seconds per question
const MAX_WRONG_ANSWERS = 3; // Game ends after 3 wrong answers

const GamePlay: React.FC<GamePlayProps> = ({ username, onChallenge, onGameEnd }) => {
  const [currentDestination, setCurrentDestination] = useState<Destination | null>(null);
  const [clues, setClues] = useState<string[]>([]);
  const [options, setOptions] = useState<Destination[]>([]);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [funFact, setFunFact] = useState<string>('');
  const [score, setScore] = useState(0);
  const [answeredCount, setAnsweredCount] = useState(0);
  const [wrongAnswersCount, setWrongAnswersCount] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(QUESTION_TIME_LIMIT);
  const [gameContainerRef, setGameContainerRef] = useState<HTMLDivElement | null>(null);
  const [showCelebrationDialog, setShowCelebrationDialog] = useState(false);
  const [showFullImage, setShowFullImage] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  
  useEffect(() => {
    loadNewDestination();
    
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);
  
  useEffect(() => {
    if (wrongAnswersCount >= MAX_WRONG_ANSWERS) {
      endGame("You've reached the maximum number of wrong answers!");
    }
  }, [wrongAnswersCount]);
  
  useEffect(() => {
    if (timeRemaining <= 0 && selectedOption === null) {
      handleTimeUp();
    }
  }, [timeRemaining]);
  
  const startTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    
    setTimeRemaining(QUESTION_TIME_LIMIT);
    
    timerRef.current = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };
  
  const handleTimeUp = () => {
    if (selectedOption !== null || !currentDestination) return;
    
    toast("Time's up for this question!", {
      description: "Moving to the next question...",
      duration: 2000,
    });
    
    setWrongAnswersCount(prev => prev + 1);
    
    // Briefly show the correct answer
    setSelectedOption(currentDestination.id);
    setIsCorrect(false);
    
    if (currentDestination) {
      setFunFact(getRandomFunFact(currentDestination));
    }
    
    // Move to next question after a short delay
    setTimeout(() => {
      loadNewDestination();
    }, 2000);
  };
  
  const endGame = (message: string) => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    
    toast(message, {
      description: `Final score: ${score}`,
      duration: 3000,
    });
    
    onGameEnd(score);
  };
  
  const loadNewDestination = () => {
    const destination = getRandomDestination();
    const randomClues = getRandomClues(destination, 2);
    const answerOptions = createAnswerOptions(destination, 4);
    
    setCurrentDestination(destination);
    setClues(randomClues);
    setOptions(answerOptions);
    setSelectedOption(null);
    setIsCorrect(null);
    setFunFact('');
    setShowFullImage(false);
    
    // Reset and start the timer for the new question
    startTimer();
  };
  
  const handleOptionSelect = (destinationId: string) => {
    if (selectedOption !== null || !currentDestination) return;
    
    // Stop the timer when an option is selected
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    
    setSelectedOption(destinationId);
    const correct = destinationId === currentDestination.id;
    setIsCorrect(correct);
    
    setAnsweredCount(prev => prev + 1);
    if (correct) {
      setScore(prev => prev + 10);
      if (gameContainerRef) {
        generateConfetti(gameContainerRef);
      }
      setShowCelebrationDialog(true);
    } else {
      setWrongAnswersCount(prev => prev + 1);
      // Add shake animation to the container when wrong
      if (gameContainerRef) {
        gameContainerRef.classList.add('animate-shake');
        setTimeout(() => {
          gameContainerRef.classList.remove('animate-shake');
        }, 600);
      }
    }
    
    if (currentDestination) {
      setFunFact(getRandomFunFact(currentDestination));
    }
  };
  
  const handleNextQuestion = () => {
    loadNewDestination();
  };
  
  const handleRevealImage = () => {
    setShowFullImage(true);
  };
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  return (
    <div 
      ref={setGameContainerRef}
      className="flex flex-col items-center justify-start min-h-screen w-full pt-6 px-4 sm:px-6 bg-gradient-to-b from-blue-50 to-sky-100 overflow-hidden relative"
    >
      <ScoreBoard 
        username={username} 
        score={score} 
        answeredCount={answeredCount} 
        onChallenge={onChallenge}
      />
      
      <div className="max-w-2xl w-full mt-4 flex items-center justify-between px-2 animate-fade-in">
        <div className={`flex items-center gap-2 font-medium ${timeRemaining < 10 ? 'text-red-600 animate-pulse' : 'text-amber-600'}`}>
          <Clock size={18} className={timeRemaining < 10 ? 'animate-pulse' : ''} />
          <span className="text-lg">{formatTime(timeRemaining)}</span>
        </div>
        
        <div className="flex items-center gap-2 text-red-500 font-medium">
          <AlertCircle size={18} />
          <span className="text-lg">{wrongAnswersCount}/{MAX_WRONG_ANSWERS} Wrong</span>
        </div>
      </div>
      
      <div className="max-w-2xl w-full mt-4 relative">
        <div className="bg-glass rounded-xl p-6 shadow-xl mb-6 overflow-hidden animate-fade-in">
          <div className="flex items-center mb-4 text-primary">
            <HelpCircle size={20} className="mr-2 animate-pulse-soft" />
            <h2 className="text-lg font-medium">City Clues</h2>
          </div>
          
          {currentDestination && (
            <div className="mb-4 relative overflow-hidden rounded-lg shadow-md">
              {!showFullImage ? (
                <div className="relative animate-pulse-soft">
                  <div className="aspect-video w-full rounded-lg overflow-hidden bg-black/20 backdrop-blur-sm">
                    <img 
                      src={currentDestination.images.thumbnail || currentDestination.images.main} 
                      alt="Mystery city" 
                      className="w-full h-full object-cover opacity-25 filter blur-md"
                    />
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Button 
                      onClick={handleRevealImage}
                      variant="outline" 
                      className="bg-white/80 hover:bg-white animate-bounce-soft hover-glow"
                    >
                      Reveal Partial Image
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="aspect-video w-full rounded-lg overflow-hidden animate-scale-in">
                  <img 
                    src={currentDestination.images.thumbnail || currentDestination.images.main} 
                    alt="Mystery city" 
                    className="w-full h-full object-cover opacity-60"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50"></div>
                </div>
              )}
            </div>
          )}
          
          <div className="space-y-3">
            {clues.map((clue, index) => (
              <div 
                key={index} 
                className="p-3 border border-gray-100 rounded-lg bg-white/50 shadow-sm animate-slide-in hover-scale"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <p className="text-gray-700">{clue}</p>
              </div>
            ))}
          </div>
        </div>
        
        <h3 className="text-lg font-medium text-gray-700 mb-3 text-center animate-fade-in">Which city is this?</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
          {options.map((option, index) => (
            <Button
              key={option.id}
              onClick={() => handleOptionSelect(option.id)}
              disabled={selectedOption !== null}
              className={`px-4 py-6 h-auto text-left justify-start font-normal transition-all duration-300 animate-scale-in hover-glow
                ${
                  selectedOption === option.id
                    ? isCorrect
                      ? 'bg-green-500 hover:bg-green-500 text-white animate-pulse-soft'
                      : 'bg-red-500 hover:bg-red-500 text-white animate-shake'
                    : selectedOption !== null && option.id === currentDestination?.id
                    ? 'bg-green-500 hover:bg-green-500 text-white animate-pulse-soft'
                    : 'bg-white hover:bg-blue-50 text-gray-800 border border-gray-200 hover:border-blue-300 hover:shadow-md hover:translate-y-[-2px]'
                }`}
              style={{ animationDelay: `${index * 0.1 + 0.2}s` }}
            >
              {option.name}, {option.country}
            </Button>
          ))}
        </div>
        
        {selectedOption !== null && !showCelebrationDialog && (
          <ResultFeedback
            isCorrect={isCorrect!}
            funFact={funFact}
            destination={currentDestination!}
            onNext={handleNextQuestion}
          />
        )}
      </div>
      
      {currentDestination && (
        <CelebrationDialog 
          isOpen={showCelebrationDialog}
          onClose={() => setShowCelebrationDialog(false)}
          destination={currentDestination}
          funFact={funFact}
          onNext={handleNextQuestion}
        />
      )}
    </div>
  );
};

export default GamePlay;
