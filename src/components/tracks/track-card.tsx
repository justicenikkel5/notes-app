'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Play, Pause, Heart, Share, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Track, User, users } from '@/lib/data';
import { useTracksStore } from '@/lib/store';
import { formatTime, getRelativeTime } from '@/lib/utils';

interface TrackCardProps {
  track: Track;
  compact?: boolean;
}

export default function TrackCard({ track, compact = false }: TrackCardProps) {
  const { currentTrack, isPlaying, setCurrentTrack, togglePlayback, upvoteTrack } = useTracksStore();
  const [isHovered, setIsHovered] = useState(false);
  
  const uploader: User | undefined = users.find(user => user.id === track.uploadedById);
  const isActive = currentTrack?.id === track.id;
  
  function handlePlayPause() {
    if (isActive) {
      togglePlayback();
    } else {
      setCurrentTrack(track);
    }
  }
  
  function handleUpvote() {
    upvoteTrack(track.id);
  }
  
  return (
    <div 
      className={`group bg-black/10 hover:bg-black/20 dark:bg-white/5 dark:hover:bg-white/10 rounded-lg overflow-hidden transition-all duration-300 ${compact ? 'flex items-center p-2' : 'mb-4'}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`relative ${compact ? 'w-16 h-16 mr-3' : 'w-full aspect-square'}`}>
        <Image 
          src={track.artworkUrl}
          alt={track.title}
          fill
          className="object-cover"
        />
        <button
          onClick={handlePlayPause}
          className={`absolute inset-0 flex items-center justify-center bg-black/40 transition-opacity duration-300 ${(isHovered || isActive) ? 'opacity-100' : 'opacity-0'}`}
        >
          {isActive && isPlaying ? (
            <Pause className="text-white h-10 w-10" />
          ) : (
            <Play className="text-white h-10 w-10" />
          )}
        </button>
      </div>
      
      <div className={compact ? 'flex-1' : 'p-3'}>
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-foreground line-clamp-1">{track.title}</h3>
            <p className="text-sm text-foreground/60">{track.artist}</p>
            {!compact && uploader && (
              <p className="text-xs text-foreground/40 mt-1">
                Shared by @{uploader.username} • {getRelativeTime(track.createdAt)}
              </p>
            )}
          </div>
          
          {!compact && (
            <div className="flex items-center space-x-1">
              <Button 
                onClick={handleUpvote}
                size="sm"
                variant="ghost"
                className="h-8 w-8 rounded-full text-blue-500"
              >
                <Heart className="h-4 w-4" />
                <span className="sr-only">Upvote</span>
              </Button>
              
              <Button 
                size="sm"
                variant="ghost"
                className="h-8 w-8 rounded-full"
              >
                <Share className="h-4 w-4" />
                <span className="sr-only">Share</span>
              </Button>
              
              <Button 
                size="sm"
                variant="ghost"
                className="h-8 w-8 rounded-full"
              >
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">More</span>
              </Button>
            </div>
          )}
        </div>
        
        {!compact && (
          <div className="flex justify-between items-center mt-2 text-xs text-foreground/60">
            <div className="flex space-x-2">
              <span>{formatTime(track.duration)}</span>
              <span>•</span>
              <span>{track.plays.toLocaleString()} plays</span>
              <span>•</span>
              <span>{track.upvotes} upvotes</span>
            </div>
            
            <div className="flex space-x-1">
              {track.tags.map(tag => (
                <span 
                  key={tag}
                  className="px-2 py-0.5 bg-black/5 dark:bg-white/10 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 