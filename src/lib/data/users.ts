export interface User {
  id: string;
  username: string;
  email: string;
  notesBalance: number;
  bio: string;
  socialLinks: string[];
  profilePictureUrl: string;
  createdAt: string;
  followersCount: number;
  followingCount: number;
}

export const users: User[] = [
  {
    id: "1",
    username: "melodicmaven",
    email: "melody@example.com",
    notesBalance: 245,
    bio: "Indie music curator with a passion for discovering underground artists.",
    socialLinks: ["https://twitter.com/melodicmaven", "https://instagram.com/melodicmaven"],
    profilePictureUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    createdAt: "2023-08-15T14:22:01Z",
    followersCount: 723,
    followingCount: 231
  },
  {
    id: "2",
    username: "beatsmith",
    email: "beats@example.com",
    notesBalance: 782,
    bio: "Electronic producer and DJ. Creating beats that make you move.",
    socialLinks: ["https://twitter.com/beatsmith", "https://soundcloud.com/beatsmith"],
    profilePictureUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d",
    createdAt: "2023-06-21T09:45:33Z",
    followersCount: 1204,
    followingCount: 152
  },
  {
    id: "3",
    username: "vinylvixen",
    email: "vinyl@example.com",
    notesBalance: 431,
    bio: "Vinyl collector and classic rock enthusiast. Sharing forgotten gems.",
    socialLinks: ["https://instagram.com/vinylvixen"],
    profilePictureUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb",
    createdAt: "2023-09-05T17:11:44Z",
    followersCount: 512,
    followingCount: 187
  },
  {
    id: "4",
    username: "groovegenius",
    email: "groove@example.com",
    notesBalance: 198,
    bio: "Funk and soul specialist. If it doesn't make you dance, I don't share it.",
    socialLinks: ["https://twitter.com/groovegenius", "https://mixcloud.com/groovegenius"],
    profilePictureUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
    createdAt: "2023-07-12T11:38:29Z",
    followersCount: 843,
    followingCount: 305
  },
  {
    id: "5",
    username: "jazzjourney",
    email: "jazz@example.com",
    notesBalance: 562,
    bio: "Jazz historian and trumpet player. Exploring the evolution of improvisation.",
    socialLinks: ["https://twitter.com/jazzjourney", "https://instagram.com/jazzjourney"],
    profilePictureUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956",
    createdAt: "2023-05-30T08:27:15Z",
    followersCount: 376,
    followingCount: 129
  }
]; 