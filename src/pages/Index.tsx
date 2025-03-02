
import React, { useState, useEffect } from 'react';
import { saveUserData } from '@/lib/gameUtils';
import LandingPage from '@/components/LandingPage';
import GamePlay from '@/components/GamePlay';
import ChallengeModal from '@/components/ChallengeModal';
import { Button } from '@/components/ui/button';
import { Trophy, RefreshCw, Sparkles } from 'lucide-react';

const Index = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [username, setUsername] = useState('');
  const [score, setScore] = useState(0);
  const [isChallengeModalOpen, setIsChallengeModalOpen] = useState(false);
  const [gameEnded, setGameEnded] = useState(false);
  const [finalScore, setFinalScore] = useState(0);
  
  // Track score updates from GamePlay
  const handleScoreUpdate = (newScore: number) => {
    setScore(newScore);
    saveUserData(username, newScore);
  };
  
  // Start the game when username is set
  const handleStartGame = (name: string) => {
    setUsername(name);
    setGameStarted(true);
    setGameEnded(false);
  };
  
  // Open challenge modal
  const handleOpenChallenge = () => {
    setIsChallengeModalOpen(true);
  };
  
  // Close challenge modal
  const handleCloseChallenge = () => {
    setIsChallengeModalOpen(false);
  };

  // Handle game end
  const handleGameEnd = (finalScore: number) => {
    setFinalScore(finalScore);
    setGameEnded(true);
    saveUserData(username, finalScore);
  };

  // Restart the game
  const handleRestartGame = () => {
    setGameEnded(false);
    setScore(0);
  };
  
  return (
    <div className="min-h-screen">
      {!gameStarted ? (
        <LandingPage onStart={handleStartGame} />
      ) : gameEnded ? (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-50 to-sky-100 p-6 overflow-hidden">
          <div className="relative">
            {/* Confetti Elements */}
            <div className="absolute -top-10 -left-10 w-6 h-6 bg-yellow-400 rounded-full animate-confetti" style={{ animationDelay: '0.1s', animationDuration: '1.2s' }}></div>
            <div className="absolute -top-10 left-10 w-4 h-4 bg-blue-400 rounded-full animate-confetti" style={{ animationDelay: '0.3s', animationDuration: '1.5s' }}></div>
            <div className="absolute -top-8 left-32 w-5 h-5 bg-green-400 rounded-full animate-confetti" style={{ animationDelay: '0.5s', animationDuration: '1.3s' }}></div>
            <div className="absolute -top-12 right-10 w-6 h-6 bg-pink-400 rounded-full animate-confetti" style={{ animationDelay: '0.2s', animationDuration: '1.7s' }}></div>
            <div className="absolute -top-10 right-32 w-4 h-4 bg-purple-400 rounded-full animate-confetti" style={{ animationDelay: '0.4s', animationDuration: '1.4s' }}></div>
            
            <div className="bg-white rounded-xl p-8 shadow-xl text-center max-w-md w-full animate-scale-in">
              <div className="mb-4 flex justify-center">
                <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center group animate-pulse-scale">
                  <Trophy size={40} className="text-amber-500 group-hover:animate-bounce-soft" />
                </div>
              </div>
              
              <h1 className="text-2xl font-bold mb-2 animate-slide-in" style={{ animationDelay: '0.1s' }}>Game Over, {username}!</h1>
              <p className="text-gray-600 mb-6 animate-slide-in" style={{ animationDelay: '0.2s' }}>Your final score is:</p>
              
              <div className="text-5xl font-bold text-primary mb-8 animate-scale-in flex items-center justify-center gap-2" style={{ animationDelay: '0.3s' }}>
                {finalScore}
                <Sparkles className="text-amber-500 animate-pulse w-6 h-6" />
              </div>
              
              <div className="space-y-3">
                <Button 
                  onClick={handleRestartGame}
                  className="w-full py-6 flex items-center justify-center gap-2 animate-slide-in hover:scale-105 transition-transform"
                  style={{ animationDelay: '0.4s' }}
                >
                  <RefreshCw size={18} className="animate-spin-slow" />
                  Play Again
                </Button>
                
                <Button 
                  onClick={handleOpenChallenge}
                  variant="outline"
                  className="w-full py-6 animate-slide-in hover:bg-primary/10 transition-colors"
                  style={{ animationDelay: '0.5s' }}
                >
                  Challenge a Friend
                </Button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <GamePlay 
          username={username} 
          onChallenge={handleOpenChallenge}
          onGameEnd={handleGameEnd}
        />
      )}
      
      <ChallengeModal
        username={username}
        score={finalScore || score}
        isOpen={isChallengeModalOpen}
        onClose={handleCloseChallenge}
      />
    </div>
  );
};

export default Index;
