export interface Playlist {
  id: string;
  title: string;
  creatorId: string;
  trackIds: string[];
  notesRequired: number;
  isLocked: boolean;
  createdAt: string;
  description: string;
  artworkUrl: string;
}

export const playlists: Playlist[] = [
  {
    id: "1",
    title: "Late Night Vibes",
    creatorId: "1",
    trackIds: ["1", "4", "6"],
    notesRequired: 20,
    isLocked: true,
    createdAt: "2023-09-10T23:11:45Z",
    description: "The perfect playlist for those late-night coding sessions or relaxing after a long day.",
    artworkUrl: "https://images.unsplash.com/photo-1520262494112-9fe481d36ec3"
  },
  {
    id: "2",
    title: "Workout Beats",
    creatorId: "4",
    trackIds: ["3", "5", "8"],
    notesRequired: 15,
    isLocked: true,
    createdAt: "2023-08-28T16:42:33Z",
    description: "High-energy tracks to keep you motivated during your workout routine.",
    artworkUrl: "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5"
  },
  {
    id: "3",
    title: "Chill Acoustic",
    creatorId: "3",
    trackIds: ["2", "7"],
    notesRequired: 0,
    isLocked: false,
    createdAt: "2023-09-05T11:27:19Z",
    description: "Acoustic tracks to unwind and relax. Perfect for a Sunday morning.",
    artworkUrl: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b"
  },
  {
    id: "4",
    title: "Future Beats",
    creatorId: "2",
    trackIds: ["3", "6", "8"],
    notesRequired: 30,
    isLocked: true,
    createdAt: "2023-09-15T14:08:56Z",
    description: "Cutting-edge electronic music pushing the boundaries of sound design.",
    artworkUrl: "https://images.unsplash.com/photo-1557672172-298e090bd0f1"
  },
  {
    id: "5",
    title: "Jazz Essentials",
    creatorId: "5",
    trackIds: ["4"],
    notesRequired: 10,
    isLocked: true,
    createdAt: "2023-08-25T19:33:21Z",
    description: "A collection of timeless jazz classics and modern interpretations.",
    artworkUrl: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae"
  }
]; 