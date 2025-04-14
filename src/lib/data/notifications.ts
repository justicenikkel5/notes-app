export type NotificationType = 'new_follower' | 'new_comment' | 'tip_received' | 'playlist_invite' | 'track_like';

export interface Notification {
  id: string;
  userId: string; // recipient
  type: NotificationType;
  sourceUserId?: string; // who triggered it
  refId?: string; // related content id
  content: string;
  timestamp: string;
  isRead: boolean;
}

export const notifications: Notification[] = [
  {
    id: "1",
    userId: "1",
    type: "new_follower",
    sourceUserId: "3",
    content: "vinylvixen started following you",
    timestamp: "2023-09-19T09:27:43Z",
    isRead: false
  },
  {
    id: "2",
    userId: "1",
    type: "new_comment",
    sourceUserId: "4",
    refId: "1", // track id
    content: "groovegenius commented on your track 'Midnight Waves'",
    timestamp: "2023-09-18T15:42:11Z",
    isRead: true
  },
  {
    id: "3",
    userId: "1",
    type: "tip_received",
    sourceUserId: "2",
    refId: "1", // track id
    content: "beatsmith tipped you 5 notes for 'Midnight Waves'",
    timestamp: "2023-09-19T14:28:51Z",
    isRead: false
  },
  {
    id: "4",
    userId: "2",
    type: "playlist_invite",
    sourceUserId: "1",
    refId: "1", // playlist id
    content: "melodicmaven invited you to collaborate on 'Late Night Vibes'",
    timestamp: "2023-09-17T10:15:32Z",
    isRead: true
  },
  {
    id: "5",
    userId: "3",
    type: "track_like",
    sourceUserId: "5",
    refId: "2", // track id
    content: "jazzjourney liked your track 'Golden Hour'",
    timestamp: "2023-09-16T19:38:27Z",
    isRead: true
  },
  {
    id: "6",
    userId: "4",
    type: "tip_received",
    sourceUserId: "1",
    refId: "5", // track id
    content: "melodicmaven tipped you 3 notes for 'Disco Inferno'",
    timestamp: "2023-09-15T12:54:18Z",
    isRead: false
  },
  {
    id: "7",
    userId: "5",
    type: "new_comment",
    sourceUserId: "2",
    refId: "4", // track id
    content: "beatsmith commented on your track 'Velvet Dreams'",
    timestamp: "2023-09-18T23:11:06Z",
    isRead: false
  },
  {
    id: "8",
    userId: "2",
    type: "new_follower",
    sourceUserId: "4",
    content: "groovegenius started following you",
    timestamp: "2023-09-14T16:25:39Z",
    isRead: true
  },
  {
    id: "9",
    userId: "3",
    type: "playlist_invite",
    sourceUserId: "5",
    refId: "5", // playlist id
    content: "jazzjourney invited you to collaborate on 'Jazz Essentials'",
    timestamp: "2023-09-13T08:42:53Z",
    isRead: true
  },
  {
    id: "10",
    userId: "5",
    type: "tip_received",
    sourceUserId: "3",
    refId: "4", // track id
    content: "vinylvixen tipped you 10 notes for 'Velvet Dreams'",
    timestamp: "2023-09-20T11:15:32Z",
    isRead: false
  }
]; 