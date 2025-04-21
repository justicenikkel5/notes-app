import { create } from 'zustand';
import { User, users } from '../data';
import { v4 as uuidv4 } from 'uuid';

interface UserState {
  currentUser: User | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => boolean;
  signup: (username: string, password: string) => boolean;
  logout: () => void;
  updateNotesBalance: (amount: number) => void;
}

// Helper function to set auth cookie
const setAuthCookie = (isAuthenticated: boolean, userId?: string) => {
  if (isAuthenticated && userId) {
    // Set cookie for 7 days
    document.cookie = `auth=${userId}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Strict;`;
  } else {
    // Remove cookie
    document.cookie = 'auth=; path=/; max-age=0; SameSite=Strict;';
  }
};

// Helper function to check if user is already logged in via cookie
const checkAuthCookie = (): string | null => {
  const cookies = document.cookie.split(';');
  for (const cookie of cookies) {
    const [name, value] = cookie.trim().split('=');
    if (name === 'auth' && value) {
      return value;
    }
  }
  return null;
};

export const useUserStore = create<UserState>((set) => ({
  currentUser: null,
  isAuthenticated: false,
  
  login: (username, password) => {
    // Mock authentication - in a real app, this would validate against a backend
    const user = users.find(u => u.username === username);
    
    if (user) {
      set({ currentUser: user, isAuthenticated: true });
      // Set auth cookie
      setAuthCookie(true, user.id);
      return true;
    }
    
    return false;
  },
  
  signup: (username, password) => {
    // Check if username already exists
    const existingUser = users.find(u => u.username === username);
    if (existingUser) {
      return false;
    }
    
    // Create a new user
    const newUser: User = {
      id: uuidv4(),
      username,
      email: `${username}@example.com`, // Default email
      notesBalance: 50, // Start with some notes
      bio: `Hi, I'm ${username}!`,
      socialLinks: [],
      profilePictureUrl: `https://images.unsplash.com/photo-1494790108377-be9c29b29330`, // Default avatar
      createdAt: new Date().toISOString(),
      followersCount: 0,
      followingCount: 0
    };
    
    // In a real app, we would save this user to the database
    // For demo, we'll add to the in-memory users array
    users.push(newUser);
    
    // Set as current user
    set({ currentUser: newUser, isAuthenticated: true });
    // Set auth cookie
    setAuthCookie(true, newUser.id);
    return true;
  },
  
  logout: () => {
    set({ currentUser: null, isAuthenticated: false });
    // Remove auth cookie
    setAuthCookie(false);
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

// Initialize auth state from cookie on client-side
if (typeof window !== 'undefined') {
  const userId = checkAuthCookie();
  if (userId) {
    const user = users.find(u => u.id === userId);
    if (user) {
      useUserStore.setState({ 
        currentUser: user, 
        isAuthenticated: true 
      });
    }
  }
} 