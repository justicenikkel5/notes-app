'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { CoinsIcon } from 'lucide-react';
import { Track, User } from '@/lib/data';

interface TipButtonProps {
  track: Track;
  currentUser: User;
  onTip: (amount: number) => void;
}

const TIP_AMOUNTS = [1, 3, 5, 10, 25];

export function TipButton({ track, currentUser, onTip }: TipButtonProps) {
  const [open, setOpen] = useState(false);
  const [tipAmount, setTipAmount] = useState<number>(5);
  
  const handleTip = () => {
    onTip(tipAmount);
    setOpen(false);
  };
  
  return (
    <>
      <Button 
        variant="outline" 
        size="sm" 
        onClick={() => setOpen(true)}
        className="flex items-center gap-1"
      >
        <CoinsIcon className="h-4 w-4" />
        Tip
      </Button>
      
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Send a tip</DialogTitle>
            <DialogDescription>
              Support {track.artist} with Music Notes for their track "{track.title}"
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <p className="text-sm mb-2">Your balance: <span className="font-medium">{currentUser.notesBalance} Notes</span></p>
            
            <div className="flex flex-wrap gap-2 justify-center my-4">
              {TIP_AMOUNTS.map((amount) => (
                <Button
                  key={amount}
                  variant={tipAmount === amount ? "default" : "outline"}
                  size="sm"
                  onClick={() => setTipAmount(amount)}
                  className="min-w-16"
                  disabled={amount > currentUser.notesBalance}
                >
                  {amount} {amount === 1 ? 'Note' : 'Notes'}
                </Button>
              ))}
            </div>
          </div>
          
          <DialogFooter>
            <Button
              onClick={handleTip}
              disabled={tipAmount > currentUser.notesBalance}
            >
              Send {tipAmount} {tipAmount === 1 ? 'Note' : 'Notes'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
} 