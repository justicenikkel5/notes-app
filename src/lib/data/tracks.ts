export interface Track {
  id: string;
  title: string;
  artist: string;
  uploadedById: string;
  url: string;
  artworkUrl: string;
  tags: string[];
  upvotes: number;
  createdAt: string;
  duration: number; // in seconds
  plays: number;
}

export const tracks: Track[] = [
  {
    id: "1",
    title: "Midnight Waves",
    artist: "Electric Ocean",
    uploadedById: "1",
    url: "https://example.com/tracks/midnight-waves.mp3",
    artworkUrl: "https://images.unsplash.com/photo-1614149162883-504ce4d13909",
    tags: ["electronic", "ambient", "downtempo"],
    upvotes: 134,
    createdAt: "2023-09-12T14:32:11Z",
    duration: 237,
    plays: 2450
  },
  {
    id: "2",
    title: "Golden Hour",
    artist: "Sunset Collective",
    uploadedById: "3",
    url: "https://example.com/tracks/golden-hour.mp3",
    artworkUrl: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3",
    tags: ["indie", "folk", "acoustic"],
    upvotes: 87,
    createdAt: "2023-08-27T10:15:43Z",
    duration: 195,
    plays: 1823
  },
  {
    id: "3",
    title: "Urban Rhythms",
    artist: "City Beat",
    uploadedById: "2",
    url: "https://example.com/tracks/urban-rhythms.mp3",
    artworkUrl: "https://images.unsplash.com/photo-1511379938547-c1f69419868d",
    tags: ["hiphop", "beats", "instrumental"],
    upvotes: 219,
    createdAt: "2023-09-05T16:45:23Z",
    duration: 184,
    plays: 3762
  },
  {
    id: "4",
    title: "Velvet Dreams",
    artist: "Midnight Jazz",
    uploadedById: "5",
    url: "https://example.com/tracks/velvet-dreams.mp3",
    artworkUrl: "https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f",
    tags: ["jazz", "smooth", "saxophone"],
    upvotes: 76,
    createdAt: "2023-09-18T21:10:54Z",
    duration: 312,
    plays: 891
  },
  {
    id: "5",
    title: "Disco Inferno",
    artist: "Groove Machine",
    uploadedById: "4",
    url: "https://example.com/tracks/disco-inferno.mp3",
    artworkUrl: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819",
    tags: ["funk", "disco", "dance"],
    upvotes: 152,
    createdAt: "2023-08-30T09:22:17Z",
    duration: 224,
    plays: 2105
  },
  {
    id: "6",
    title: "Neon Streets",
    artist: "Retro Synth",
    uploadedById: "2",
    url: "https://example.com/tracks/neon-streets.mp3",
    artworkUrl: "https://images.unsplash.com/photo-1492044715545-15ddbb07d4b4",
    tags: ["synthwave", "retro", "electronic"],
    upvotes: 98,
    createdAt: "2023-09-10T11:37:42Z",
    duration: 267,
    plays: 1456
  },
  {
    id: "7",
    title: "Mountain High",
    artist: "Nature Sounds",
    uploadedById: "1",
    url: "https://example.com/tracks/mountain-high.mp3",
    artworkUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4",
    tags: ["acoustic", "folk", "vocal"],
    upvotes: 62,
    createdAt: "2023-09-15T08:14:23Z",
    duration: 198,
    plays: 734
  },
  {
    id: "8",
    title: "Electric Dreams",
    artist: "Digital Wave",
    uploadedById: "4",
    url: "https://example.com/tracks/electric-dreams.mp3",
    artworkUrl: "https://images.unsplash.com/photo-1535223289827-42f1e9919769",
    tags: ["electronic", "dance", "edm"],
    upvotes: 175,
    createdAt: "2023-08-25T15:19:31Z",
    duration: 244,
    plays: 2980
  }
]; 