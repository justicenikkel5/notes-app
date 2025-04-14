'use client';

import { useEffect, useRef, useState } from 'react';
import WaveSurfer from 'wavesurfer.js';
import { VisualizationType, VisualizerConfig } from '@/lib/types/player';
import { usePlayerStore } from '@/lib/store/player-store';

interface VisualizerProps {
  audioUrl: string;
  trackId: string;
}

export function Visualizer({ audioUrl, trackId }: VisualizerProps) {
  const waveformRef = useRef<HTMLDivElement>(null);
  const wavesurfer = useRef<WaveSurfer | null>(null);
  const [isReady, setIsReady] = useState(false);
  
  const { 
    isPlaying, 
    currentTrackId, 
    visualizationType,
    play, 
    pause, 
    setCurrentTime,
    setVolume
  } = usePlayerStore();

  // Default configs for different visualization types
  const visualizerConfigs: Record<VisualizationType, VisualizerConfig> = {
    waveform: {
      type: 'waveform',
      colors: {
        waveColor: '#A1A1AA',
        progressColor: '#3B82F6',
      },
      showCursor: true,
      waveformHeight: 60,
      cursorWidth: 2,
    },
    bars: {
      type: 'bars',
      colors: {
        waveColor: '#A1A1AA',
        progressColor: '#3B82F6',
      },
      barWidth: 3,
      barGap: 2,
      barCount: 70,
    },
    circle: {
      type: 'circle',
      colors: {
        waveColor: '#A1A1AA',
        progressColor: '#3B82F6',
        backgroundColor: '#1E1E2E',
      },
      radius: 100,
      rotationSpeed: 0.5,
    },
    frequency: {
      type: 'frequency',
      colors: {
        waveColor: '#A1A1AA',
        progressColor: '#3B82F6',
      },
      fftSize: 1024,
      smoothing: 0.8,
    },
  };

  // Initialize and update WaveSurfer instance
  useEffect(() => {
    if (!waveformRef.current) return;

    // In a real implementation, we would use different plugins and configurations
    // for each visualization type. For this prototype, we're simulating the different
    // visualization types with the basic WaveSurfer setup.
    
    const config = visualizerConfigs[visualizationType];
    const options = {
      container: waveformRef.current,
      url: audioUrl,
      waveColor: config.colors.waveColor,
      progressColor: config.colors.progressColor,
      cursorWidth: config.type === 'waveform' ? 
        (config as any).cursorWidth : 0,
      barWidth: config.type === 'bars' ? 
        (config as any).barWidth : undefined,
      barGap: config.type === 'bars' ? 
        (config as any).barGap : undefined,
      height: 80,
      responsive: true,
    };

    // Clean up previous instance
    if (wavesurfer.current) {
      wavesurfer.current.destroy();
    }

    // Create new instance
    wavesurfer.current = WaveSurfer.create(options);

    // Set up event handlers
    wavesurfer.current.on('ready', () => {
      setIsReady(true);
      setVolume(0.8);
      
      // Auto-play if this is the current track
      if (currentTrackId === trackId && isPlaying) {
        wavesurfer.current?.play();
      }
    });

    wavesurfer.current.on('timeupdate', (time) => {
      setCurrentTime(time);
    });

    wavesurfer.current.on('finish', () => {
      pause();
    });

    // Clean up
    return () => {
      if (wavesurfer.current) {
        wavesurfer.current.destroy();
      }
    };
  }, [audioUrl, visualizationType, trackId, currentTrackId, isPlaying, setCurrentTime, setVolume, pause]);

  // Handle play/pause
  useEffect(() => {
    if (!wavesurfer.current || !isReady) return;

    if (currentTrackId === trackId) {
      if (isPlaying) {
        wavesurfer.current.play();
      } else {
        wavesurfer.current.pause();
      }
    }
  }, [isPlaying, currentTrackId, trackId, isReady]);

  return (
    <div 
      className={`relative ${
        visualizationType === 'circle' ? 'flex justify-center items-center' : ''
      }`}
    >
      <div 
        ref={waveformRef} 
        className={`w-full ${
          visualizationType === 'circle' ? 'h-56 w-56 rounded-full' : 'h-20'
        }`}
      />
      {!isReady && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-t-blue-500 border-blue-200 rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
} 