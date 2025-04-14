'use client';

import { useState, useEffect } from 'react';
import { Notification, User, notifications as allNotifications, users } from '@/lib/data';
import { formatDistanceToNow } from 'date-fns';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function NotificationsPage() {
  // In a real app, we'd get the current user ID from auth
  const currentUserId = "1"; // Using melodicmaven as the current user
  
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  
  // Filter notifications for current user and sort by timestamp (newest first)
  useEffect(() => {
    let userNotifications = allNotifications
      .filter(notification => notification.userId === currentUserId)
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    
    // Apply type filter if active
    if (activeFilter) {
      userNotifications = userNotifications.filter(notification => notification.type === activeFilter);
    }
    
    setNotifications(userNotifications);
  }, [currentUserId, activeFilter]);
  
  // Get unique notification types for filters
  const notificationTypes = [...new Set(allNotifications
    .filter(notification => notification.userId === currentUserId)
    .map(notification => notification.type))];
  
  // Mark all as read
  const markAllAsRead = () => {
    // In a real app, this would make an API call
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, isRead: true }))
    );
  };
  
  // Get user data for a notification source
  const getUserForNotification = (userId?: string) => {
    if (!userId) return null;
    return users.find(user => user.id === userId);
  };
  
  // Format notification timestamp
  const formatTimestamp = (timestamp: string) => {
    return formatDistanceToNow(new Date(timestamp), { addSuffix: true });
  };
  
  // Get notification link based on type
  const getNotificationLink = (notification: Notification) => {
    switch (notification.type) {
      case 'new_follower':
        return `/profile/${notification.sourceUserId}`;
      case 'new_comment':
      case 'track_like':
      case 'tip_received':
        return `/track/${notification.refId}`;
      case 'playlist_invite':
        return `/playlist/${notification.refId}`;
      default:
        return '#';
    }
  };
  
  // Format notification type for display
  const formatNotificationType = (type: string) => {
    switch (type) {
      case 'new_follower': return 'New Followers';
      case 'new_comment': return 'Comments';
      case 'tip_received': return 'Tips';
      case 'playlist_invite': return 'Playlist Invites';
      case 'track_like': return 'Likes';
      default: return type.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Notifications</h1>
        
        <Button 
          variant="outline" 
          size="sm"
          onClick={markAllAsRead}
          disabled={!notifications.some(n => !n.isRead)}
        >
          Mark all as read
        </Button>
      </div>
      
      {/* Filters */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        <Button
          variant={activeFilter === null ? "default" : "outline"}
          size="sm"
          onClick={() => setActiveFilter(null)}
        >
          All
        </Button>
        
        {notificationTypes.map(type => (
          <Button
            key={type}
            variant={activeFilter === type ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveFilter(type)}
          >
            {formatNotificationType(type)}
          </Button>
        ))}
      </div>
      
      {/* Notifications list */}
      <div className="space-y-2">
        {notifications.length > 0 ? (
          notifications.map((notification) => {
            const sourceUser = getUserForNotification(notification.sourceUserId);
            const isUnread = !notification.isRead;
            
            return (
              <Link 
                key={notification.id}
                href={getNotificationLink(notification)}
                className={`flex items-start gap-4 p-4 rounded-lg border ${
                  isUnread ? 'bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800' : ''
                } hover:bg-muted/50 transition-colors block`}
              >
                <Avatar className="h-10 w-10">
                  {sourceUser ? (
                    <>
                      <AvatarImage src={sourceUser.profilePictureUrl} alt={sourceUser.username} />
                      <AvatarFallback>{sourceUser.username.slice(0, 2).toUpperCase()}</AvatarFallback>
                    </>
                  ) : (
                    <AvatarFallback>N</AvatarFallback>
                  )}
                </Avatar>
                
                <div className="flex-1">
                  <p className={`${isUnread ? 'font-medium' : ''}`}>{notification.content}</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {formatTimestamp(notification.timestamp)}
                  </p>
                </div>
                
                {isUnread && (
                  <div className="w-2 h-2 bg-blue-500 rounded-full self-center" />
                )}
              </Link>
            );
          })
        ) : (
          <div className="py-8 text-center text-muted-foreground">
            <p>No notifications found</p>
            {activeFilter && (
              <Button 
                variant="link" 
                onClick={() => setActiveFilter(null)}
                className="mt-2"
              >
                Clear filters
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
} 