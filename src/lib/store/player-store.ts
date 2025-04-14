import { create } from 'zustand';
import { VisualizationType } from '@/lib/types/player';

interface PlayerStore {
  isPlaying: boolean;
  currentTrackId: string | null;
  currentTime: number;
  duration: number;
  volume: number;
  isMuted: boolean;
  isLoading: boolean;
  visualizationType: VisualizationType;
  
  // Actions
  play: (trackId: string) => void;
  pause: () => void;
  resume: () => void;
  stop: () => void;
  setCurrentTime: (time: number) => void;
  setVolume: (volume: number) => void;
  toggleMute: () => void;
  setVisualizationType: (type: VisualizationType) => void;
}

export const usePlayerStore = create<PlayerStore>((set) => ({
  isPlaying: false,
  currentTrackId: null,
  currentTime: 0,
  duration: 0,
  volume: 0.8,
  isMuted: false,
  isLoading: false,
  visualizationType: 'waveform', // Default visualization

  play: (trackId: string) => set({ 
    isPlaying: true, 
    currentTrackId: trackId, 
    currentTime: 0,
    isLoading: true 
  }),
  
  pause: () => set({ isPlaying: false }),
  
  resume: () => set({ isPlaying: true }),
  
  stop: () => set({ 
    isPlaying: false, 
    currentTrackId: null, 
    currentTime: 0,
    duration: 0 
  }),
  
  setCurrentTime: (time: number) => set({ currentTime: time }),
  
  setVolume: (volume: number) => set({ volume: Math.max(0, Math.min(1, volume)) }),
  
  toggleMute: () => set((state) => ({ isMuted: !state.isMuted })),

  setVisualizationType: (type: VisualizationType) => set({ visualizationType: type })
})); 