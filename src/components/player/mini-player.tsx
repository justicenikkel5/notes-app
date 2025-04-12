'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Play, Pause, SkipBack, SkipForward, Volume2, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Track } from '@/lib/data';
import { useTracksStore, useUserStore } from '@/lib/store';
import { formatTime } from '@/lib/utils';

export function MiniPlayer() {
  const { currentTrack, isPlaying, togglePlayback, upvoteTrack } = useTracksStore();
  const { currentUser } = useUserStore();
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  // Create audio element when track changes
  useEffect(() => {
    if (!currentTrack) return;
    
    if (!audioRef.current) {
      audioRef.current = new Audio();
    }
    
    audioRef.current.src = currentTrack.url;
    audioRef.current.load();
    
    if (isPlaying) {
      try {
        audioRef.current.play();
      } catch (error) {
        console.error('Error playing audio', error);
      }
    }
    
    const audio = audioRef.current;
    
    const handleTimeUpdate = () => {
      if (audio.duration) {
        setProgress(audio.currentTime);
        setDuration(audio.duration);
      }
    };
    
    const handleEnded = () => {
      // In a real app, you might want to play the next track
      setProgress(0);
      togglePlayback();
    };
    
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);
    
    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [currentTrack, isPlaying, togglePlayback]);
  
  // Handle play/pause state changes
  useEffect(() => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      try {
        audioRef.current.play();
      } catch (error) {
        console.error('Error playing audio', error);
      }
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);
  
  function handleProgressChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (!audioRef.current) return;
    
    const newTime = parseFloat(e.target.value);
    audioRef.current.currentTime = newTime;
    setProgress(newTime);
  }
  
  // If no track is playing, don't render the player
  if (!currentTrack) return null;
  
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black/80 backdrop-blur-lg text-white p-2 sm:p-3 z-50">
      <div className="flex items-center max-w-7xl mx-auto">
        <div className="flex items-center min-w-0 flex-1">
          <div className="relative h-12 w-12 flex-shrink-0 mr-3">
            <Image
              src={currentTrack.artworkUrl}
              alt={currentTrack.title}
              fill
              className="object-cover rounded"
            />
          </div>
          
          <div className="min-w-0 mr-4">
            <h4 className="font-medium text-sm truncate">{currentTrack.title}</h4>
            <p className="text-xs text-white/70 truncate">{currentTrack.artist}</p>
          </div>
        </div>
        
        <div className="hidden sm:flex items-center flex-1 space-x-4">
          <Button variant="ghost" size="icon" className="text-white">
            <SkipBack className="h-5 w-5" />
            <span className="sr-only">Previous</span>
          </Button>
          
          <Button 
            onClick={togglePlayback}
            variant="ghost" 
            size="icon"
            className="h-10 w-10 bg-white/10 text-white hover:bg-white/20 rounded-full"
          >
            {isPlaying ? (
              <Pause className="h-5 w-5" />
            ) : (
              <Play className="h-5 w-5" />
            )}
            <span className="sr-only">{isPlaying ? 'Pause' : 'Play'}</span>
          </Button>
          
          <Button variant="ghost" size="icon" className="text-white">
            <SkipForward className="h-5 w-5" />
            <span className="sr-only">Next</span>
          </Button>
        </div>
        
        <div className="hidden lg:flex items-center flex-1 space-x-4">
          <div className="text-xs text-white/70">{formatTime(progress)}</div>
          
          <div className="flex-1">
            <input
              type="range"
              min="0"
              max={duration || currentTrack.duration}
              value={progress}
              onChange={handleProgressChange}
              className="w-full h-1 bg-white/20 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white"
            />
          </div>
          
          <div className="text-xs text-white/70">{formatTime(duration || currentTrack.duration)}</div>
        </div>
        
        <div className="flex items-center space-x-3 ml-4">
          <Button 
            onClick={() => upvoteTrack(currentTrack.id)}
            variant="ghost" 
            size="icon" 
            className="text-white"
            disabled={!currentUser}
          >
            <Heart className="h-5 w-5 text-blue-400" />
            <span className="sr-only">Like</span>
          </Button>
          
          <Button variant="ghost" size="icon" className="text-white hidden sm:flex">
            <Volume2 className="h-5 w-5" />
            <span className="sr-only">Volume</span>
          </Button>
          
          <Button 
            onClick={togglePlayback}
            variant="ghost" 
            size="icon"
            className="sm:hidden h-10 w-10 bg-white/10 text-white hover:bg-white/20 rounded-full"
          >
            {isPlaying ? (
              <Pause className="h-5 w-5" />
            ) : (
              <Play className="h-5 w-5" />
            )}
            <span className="sr-only">{isPlaying ? 'Pause' : 'Play'}</span>
          </Button>
        </div>
      </div>
    </div>
  );
} 