
import React, { useState, useEffect } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { generateChallengeURL } from '@/lib/gameUtils';
import { Share2, X, Check, Copy } from 'lucide-react';

interface ChallengeModalProps {
  username: string;
  score: number;
  isOpen: boolean;
  onClose: () => void;
}

const ChallengeModal: React.FC<ChallengeModalProps> = ({ 
  username, 
  score, 
  isOpen, 
  onClose 
}) => {
  const [challengeUrl, setChallengeUrl] = useState('');
  const [copied, setCopied] = useState(false);
  
  useEffect(() => {
    if (isOpen && username) {
      const url = generateChallengeURL(username);
      setChallengeUrl(url);
    }
  }, [isOpen, username]);
  
  const handleCopyLink = () => {
    navigator.clipboard.writeText(challengeUrl)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        toast.success('Challenge link copied to clipboard!');
      })
      .catch(err => {
        console.error('Failed to copy: ', err);
        toast.error('Failed to copy link. Please try again.');
      });
  };
  
  const handleWhatsAppShare = () => {
    const message = `I challenge you to beat my score of ${score} points in The Globetrotter Challenge! Try it here: ${challengeUrl}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="bg-glass sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Challenge a Friend</DialogTitle>
        </DialogHeader>
        
        <div className="p-4 bg-white/50 rounded-lg my-4">
          <div className="text-center mb-4">
            <p className="text-sm text-gray-600 mb-1">Your current score</p>
            <p className="text-3xl font-bold text-green-400">{score} points</p>
          </div>
          
          <p className="text-sm text-gray-600 mb-4">
            Challenge your friends to beat your score! Share this link with them:
          </p>
          
          <div className="flex space-x-2 mb-4">
            <div className="flex-1 bg-white p-2 rounded border border-gray-200 text-sm overflow-hidden overflow-ellipsis whitespace-nowrap">
              {challengeUrl}
            </div>
            
            <Button 
              onClick={handleCopyLink} 
              variant="outline"
              className="flex-shrink-0 bg-white hover:bg-gray-50"
            >
              {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
            </Button>
          </div>
        </div>
        
        <DialogFooter className="flex flex-col sm:flex-row gap-3 sm:justify-between w-full">
          <Button 
            onClick={onClose} 
            variant="outline"
            className="w-full sm:w-auto bg-red-500 text-white hover:bg-gray-50"
          >
          
            Close
          </Button>
          
          <Button 
            onClick={handleWhatsAppShare} 
            className="w-full sm:w-auto bg-green-500 hover:bg-green-600 text-white"
          >
            <Share2 size={16} className="mr-2" />
            Share on WhatsApp
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ChallengeModal;
