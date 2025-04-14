'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { User } from '@/lib/data';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface CommentFormProps {
  trackId: string;
  currentUser: User;
  parentId: string | null;
  onSubmitSuccess?: () => void;
  initialTimePosition?: number;
}

export default function CommentForm({ 
  trackId, 
  currentUser, 
  parentId,
  onSubmitSuccess,
  initialTimePosition
}: CommentFormProps) {
  const [comment, setComment] = useState('');
  const [timePosition, setTimePosition] = useState<number | undefined>(initialTimePosition);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!comment.trim()) return;
    
    setIsSubmitting(true);
    
    // In a real app, we would send this to an API
    // For the prototype, we'll just simulate a successful submission
    setTimeout(() => {
      setComment('');
      setIsSubmitting(false);
      if (onSubmitSuccess) {
        onSubmitSuccess();
      }
    }, 500);
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="flex gap-3">
        <Avatar className="h-10 w-10 mt-1">
          <AvatarImage src={currentUser.profilePictureUrl} alt={currentUser.username} />
          <AvatarFallback>{currentUser.username.slice(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        
        <div className="flex-1">
          <Textarea
            placeholder={parentId ? "Write a reply..." : "Add a comment..."}
            value={comment}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setComment(e.target.value)}
            className="resize-none"
            rows={3}
          />
          
          {!parentId && timePosition !== undefined && (
            <div className="flex items-center mt-2 text-sm text-muted-foreground">
              <span>
                Comment at {Math.floor(timePosition / 60)}:{(timePosition % 60).toString().padStart(2, '0')}
              </span>
              <Button 
                type="button" 
                variant="ghost" 
                size="sm" 
                className="h-6 px-2 text-xs"
                onClick={() => setTimePosition(undefined)}
              >
                Remove timestamp
              </Button>
            </div>
          )}
          
          <div className="flex justify-end gap-2 mt-2">
            {parentId && (
              <Button 
                type="button" 
                variant="outline" 
                size="sm"
                onClick={onSubmitSuccess}
              >
                Cancel
              </Button>
            )}
            
            <Button 
              type="submit" 
              size="sm" 
              disabled={!comment.trim() || isSubmitting}
            >
              {isSubmitting ? 'Posting...' : parentId ? 'Reply' : 'Comment'}
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
} 