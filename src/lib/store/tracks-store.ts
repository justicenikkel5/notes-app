import { create } from 'zustand';
import { Track, tracks as initialTracks } from '../data';
import { useUserStore } from './user-store';

interface TracksState {
  tracks: Track[];
  currentTrack: Track | null;
  isPlaying: boolean;
  
  // Feed
  getFeedTracks: () => Track[];
  getTrendingTracks: () => Track[];
  
  // Player controls
  setCurrentTrack: (track: Track | null) => void;
  togglePlayback: () => void;
  
  // Upvote
  upvoteTrack: (trackId: string) => boolean;
}

export const useTracksStore = create<TracksState>((set, get) => ({
  tracks: initialTracks,
  currentTrack: null,
  isPlaying: false,
  
  getFeedTracks: () => {
    // In a real app, this would filter based on user preferences
    return get().tracks.sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  },
  
  getTrendingTracks: () => {
    return get().tracks.sort((a, b) => b.upvotes - a.upvotes);
  },
  
  setCurrentTrack: (track) => {
    set({ currentTrack: track, isPlaying: track !== null });
  },
  
  togglePlayback: () => {
    set((state) => ({ isPlaying: !state.isPlaying }));
  },
  
  upvoteTrack: (trackId) => {
    const userStore = useUserStore.getState();
    
    // Check if user is authenticated and has enough notes
    if (!userStore.isAuthenticated || !userStore.currentUser) {
      return false;
    }
    
    if (userStore.currentUser.notesBalance < 1) {
      return false;
    }
    
    // Deduct 1 Note from user
    userStore.updateNotesBalance(-1);
    
    // Update track upvotes
    set((state) => ({
      tracks: state.tracks.map(track => 
        track.id === trackId 
          ? { ...track, upvotes: track.upvotes + 1 } 
          : track
      )
    }));
    
    return true;
  }
})); 