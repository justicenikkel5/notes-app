export type TransactionType = 'upvote' | 'upload_reward' | 'unlock_playlist' | 'daily_login';

export interface NotesTransaction {
  id: string;
  userId: string;
  amount: number; // positive for earning, negative for spending
  type: TransactionType;
  refId?: string; // optional reference to track or playlist ID
  timestamp: string;
}

export const notesTransactions: NotesTransaction[] = [
  {
    id: "1",
    userId: "1",
    amount: 10,
    type: "upload_reward",
    refId: "1",
    timestamp: "2023-09-12T14:32:11Z"
  },
  {
    id: "2",
    userId: "1",
    amount: -1,
    type: "upvote",
    refId: "3",
    timestamp: "2023-09-12T16:42:23Z"
  },
  {
    id: "3",
    userId: "2",
    amount: 15,
    type: "upload_reward",
    refId: "3",
    timestamp: "2023-09-05T16:45:23Z"
  },
  {
    id: "4",
    userId: "3",
    amount: -10,
    type: "unlock_playlist",
    refId: "5",
    timestamp: "2023-09-08T11:23:45Z"
  },
  {
    id: "5",
    userId: "4",
    amount: 1,
    type: "daily_login",
    timestamp: "2023-09-18T09:00:12Z"
  },
  {
    id: "6",
    userId: "5",
    amount: 8,
    type: "upload_reward",
    refId: "4",
    timestamp: "2023-09-18T21:10:54Z"
  },
  {
    id: "7",
    userId: "2",
    amount: -1,
    type: "upvote",
    refId: "7",
    timestamp: "2023-09-17T13:28:51Z"
  },
  {
    id: "8",
    userId: "3",
    amount: 1,
    type: "daily_login",
    timestamp: "2023-09-18T10:15:32Z"
  }
]; 