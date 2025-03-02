
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Trophy, Star, ArrowRight } from 'lucide-react';
import { Destination } from '@/lib/gameData';

interface CelebrationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  destination: Destination;
  funFact: string;
  onNext: () => void;
}

const CelebrationDialog: React.FC<CelebrationDialogProps> = ({ 
  isOpen, 
  onClose, 
  destination, 
  funFact,
  onNext 
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md animate-scale-in bg-gradient-to-b from-blue-50 to-white border-2 border-green-300">
        <DialogHeader className="text-center">
          <div className="flex justify-center mb-2">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center">
              <Trophy className="h-8 w-8 text-green-600" />
            </div>
          </div>
          <DialogTitle className="text-2xl font-bold text-green-700">
            Correct!
          </DialogTitle>
        </DialogHeader>
        
        <div className="flex flex-col items-center p-2">
          <div className="w-full aspect-video rounded-lg overflow-hidden mb-4">
            <img 
              src={destination.images.main}
              alt={destination.name}
              className="w-full h-full object-cover"
            />
          </div>
          
          <h3 className="text-xl font-medium text-center mb-2">{destination.name}, {destination.country}</h3>
          
          <div className="bg-green-50 p-4 rounded-lg mb-6 w-full">
            <p className="text-gray-700">{funFact}</p>
          </div>
          
          <Button 
            onClick={() => {
              onNext();
              onClose();
            }}
            className="w-full py-6 bg-green-600 hover:bg-green-700 flex items-center justify-center gap-2"
          >
            <span>Continue Journey</span>
            <ArrowRight size={16} />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CelebrationDialog;
