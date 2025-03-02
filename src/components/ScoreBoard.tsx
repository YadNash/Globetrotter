
import React from 'react';
import { Button } from '@/components/ui/button';
import { Users, Trophy } from 'lucide-react';

interface ScoreBoardProps {
  username: string;
  score: number;
  answeredCount: number;
  onChallenge: () => void;
}

const ScoreBoard: React.FC<ScoreBoardProps> = ({ 
  username, 
  score, 
  answeredCount,
  onChallenge
}) => {
  return (
    <div className="w-full max-w-2xl bg-glass rounded-xl shadow-lg overflow-hidden animate-fade-in">
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="bg-primary/10 text-primary rounded-full p-2">
            <Trophy size={20} />
          </div>
          
          <div>
            <h3 className="font-medium text-gray-900">{username}</h3>
            <p className="text-sm text-gray-500">
              {answeredCount} {answeredCount === 1 ? 'destination' : 'destinations'} answered
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="text-right">
            <p className="text-sm text-gray-500">Score:</p>
            <p className="text-2xl font-bold text-gray-900">{score}</p>
          </div>
          
          <Button 
            onClick={onChallenge}
            variant="outline" 
            className="flex items-center gap-2 bg-green-400 border-gray-200 hover:bg-gray-50 text-gray-800"
          >
            <Users size={16} />
            <span className="hidden sm:inline">Challenge a Friend</span>
            <span className="sm:hidden">Challenge</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ScoreBoard;
