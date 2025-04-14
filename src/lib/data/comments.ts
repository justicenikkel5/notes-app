export interface Comment {
  id: string;
  trackId: string;
  userId: string;
  content: string;
  timestamp: string;
  timePosition?: number; // Optional timestamp in track (seconds)
  parentId?: string; // For threaded replies
  likes: number;
}

export const comments: Comment[] = [
  {
    id: "1",
    trackId: "1",
    userId: "3",
    content: "Love that synth at 1:24!",
    timestamp: "2023-09-15T16:42:11Z",
    timePosition: 84, // 1:24 in seconds
    likes: 5
  },
  {
    id: "2",
    trackId: "1",
    userId: "2",
    content: "The bass line on this track is incredible.",
    timestamp: "2023-09-16T09:18:32Z",
    likes: 3
  },
  {
    id: "3",
    trackId: "1",
    userId: "4",
    content: "Agreed! The production is so clean.",
    timestamp: "2023-09-16T10:22:47Z",
    parentId: "2", // Reply to comment #2
    likes: 1
  },
  {
    id: "4",
    trackId: "1",
    userId: "5",
    content: "That transition at 3:05 is mind-blowing!",
    timestamp: "2023-09-17T14:33:21Z",
    timePosition: 185, // 3:05 in seconds
    likes: 7
  },
  {
    id: "5",
    trackId: "2",
    userId: "1",
    content: "So peaceful. Perfect for my morning routine.",
    timestamp: "2023-09-10T08:45:13Z",
    likes: 4
  },
  {
    id: "6",
    trackId: "3",
    userId: "5",
    content: "This beat is fire! The hi-hats at 0:45 are crazy.",
    timestamp: "2023-09-11T19:12:38Z",
    timePosition: 45, // 0:45 in seconds
    likes: 9
  },
  {
    id: "7",
    trackId: "3",
    userId: "1",
    content: "How did you get that snare sound? It's so punchy!",
    timestamp: "2023-09-12T21:05:59Z",
    likes: 2
  },
  {
    id: "8",
    trackId: "3",
    userId: "2",
    content: "I layered three different samples and added some tape saturation.",
    timestamp: "2023-09-13T10:17:25Z",
    parentId: "7", // Reply to comment #7
    likes: 3
  },
  {
    id: "9",
    trackId: "4",
    userId: "3",
    content: "This saxophone performance is incredible. So much feeling!",
    timestamp: "2023-09-19T15:28:41Z",
    timePosition: 127, // 2:07 in seconds
    likes: 6
  },
  {
    id: "10",
    trackId: "5",
    userId: "2",
    content: "This is going straight into my workout playlist!",
    timestamp: "2023-09-14T17:52:08Z",
    likes: 5
  }
]; 