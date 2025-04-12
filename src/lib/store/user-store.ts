import { create } from 'zustand';
import { User, users } from '../data';

interface UserState {
  currentUser: User | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  updateNotesBalance: (amount: number) => void;
}

export const useUserStore = create<UserState>((set) => ({
  currentUser: null,
  isAuthenticated: false,
  
  login: (username, password) => {
    // Mock authentication - in a real app, this would validate against a backend
    const user = users.find(u => u.username === username);
    
    if (user) {
      set({ currentUser: user, isAuthenticated: true });
      return true;
    }
    
    return false;
  },
  
  logout: () => {
    set({ currentUser: null, isAuthenticated: false });
  },
  
  updateNotesBalance: (amount) => {
    set((state) => {
      if (!state.currentUser) return state;
      
      return {
        currentUser: {
          ...state.currentUser,
          notesBalance: state.currentUser.notesBalance + amount
        }
      };
    });
  }
})); 