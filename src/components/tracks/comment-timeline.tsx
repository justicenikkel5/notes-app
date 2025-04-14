'use client';

import { useMemo } from 'react';
import { Comment, Track } from '@/lib/data';
import { usePlayerStore } from '@/lib/store/player-store';

interface CommentTimelineProps {
  track: Track;
  comments: Comment[];
}

export default function CommentTimeline({ track, comments }: CommentTimelineProps) {
  const { currentTime, duration, isPlaying, currentTrackId, setCurrentTime } = usePlayerStore();
  
  // Filter to only comments with a timePosition
  const timelineComments = useMemo(() => {
    return comments
      .filter(comment => comment.timePosition !== undefined)
      .sort((a, b) => (a.timePosition || 0) - (b.timePosition || 0));
  }, [comments]);
  
  // Track duration used for positioning
  const trackDuration = track.duration;
  
  // Format time (mm:ss)
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };
  
  // Calculate position percentage
  const getPositionPercentage = (timePosition: number) => {
    return (timePosition / trackDuration) * 100;
  };
  
  // Handle clicking on a comment marker
  const handleCommentClick = (timePosition: number) => {
    if (currentTrackId === track.id) {
      setCurrentTime(timePosition);
    }
  };
  
  return (
    <div className="mb-6 relative">
      <div className="h-20 bg-muted rounded-md relative">
        {/* Progress bar */}
        {currentTrackId === track.id && (
          <div 
            className="absolute h-full bg-blue-500/20 z-10 rounded-l-md"
            style={{ width: `${(currentTime / duration) * 100}%` }}
          />
        )}
        
        {/* Current time indicator */}
        {currentTrackId === track.id && (
          <div 
            className="absolute h-full w-0.5 bg-blue-500 z-20 transition-all"
            style={{ left: `${(currentTime / duration) * 100}%` }}
          />
        )}
        
        {/* Comment markers */}
        {timelineComments.map((comment) => {
          const position = comment.timePosition || 0;
          const positionPercentage = getPositionPercentage(position);
          
          return (
            <div 
              key={comment.id}
              className="absolute top-0 z-15"
              style={{ left: `${positionPercentage}%` }}
            >
              <div 
                className="w-4 h-4 bg-orange-400 rounded-full -translate-x-2 translate-y-1 cursor-pointer transition-transform hover:scale-125"
                onClick={() => handleCommentClick(position)}
                title={`${comment.content} (${formatTime(position)})`}
              />
            </div>
          );
        })}
        
        {/* Time markers */}
        <div className="absolute bottom-0 w-full flex justify-between px-2 text-xs text-muted-foreground">
          <span>0:00</span>
          <span>{formatTime(trackDuration / 4)}</span>
          <span>{formatTime(trackDuration / 2)}</span>
          <span>{formatTime(trackDuration * 3 / 4)}</span>
          <span>{formatTime(trackDuration)}</span>
        </div>
      </div>
      
      {/* Comment count indicator */}
      <div className="mt-2 text-sm text-muted-foreground">
        {timelineComments.length} timestamped {timelineComments.length === 1 ? 'comment' : 'comments'}
      </div>
    </div>
  );
} 