import { create } from 'zustand';
import { Playlist, playlists as initialPlaylists } from '../data';
import { useUserStore } from './user-store';

interface PlaylistsState {
  playlists: Playlist[];
  userPlaylists: (userId: string) => Playlist[];
  getPlaylistById: (id: string) => Playlist | undefined;
  unlockPlaylist: (playlistId: string) => boolean;
  isPlaylistUnlocked: (playlistId: string) => boolean;
}

// In a real app, this would be stored in a database
// For this prototype, we'll just track unlocked playlists in memory
const unlockedPlaylists = new Set<string>();

export const usePlaylistsStore = create<PlaylistsState>((set, get) => ({
  playlists: initialPlaylists,
  
  userPlaylists: (userId) => {
    return get().playlists.filter(playlist => playlist.creatorId === userId);
  },
  
  getPlaylistById: (id) => {
    return get().playlists.find(playlist => playlist.id === id);
  },
  
  unlockPlaylist: (playlistId) => {
    const userStore = useUserStore.getState();
    const playlist = get().getPlaylistById(playlistId);
    
    if (!playlist || !userStore.currentUser) {
      return false;
    }
    
    // Check if user has enough notes
    if (userStore.currentUser.notesBalance < playlist.notesRequired) {
      return false;
    }
    
    // Deduct notes
    userStore.updateNotesBalance(-playlist.notesRequired);
    
    // Unlock the playlist
    unlockedPlaylists.add(playlistId);
    
    return true;
  },
  
  isPlaylistUnlocked: (playlistId) => {
    const playlist = get().getPlaylistById(playlistId);
    
    if (!playlist) {
      return false;
    }
    
    // If playlist is not locked, it's available to everyone
    if (!playlist.isLocked) {
      return true;
    }
    
    // If it's the user's own playlist, it's unlocked
    const userStore = useUserStore.getState();
    if (userStore.currentUser && playlist.creatorId === userStore.currentUser.id) {
      return true;
    }
    
    // Check if user has unlocked it
    return unlockedPlaylists.has(playlistId);
  }
})); 