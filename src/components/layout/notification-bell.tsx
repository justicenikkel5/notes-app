'use client';

import { useEffect, useState } from 'react';
import { Bell } from 'lucide-react';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuGroup, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@radix-ui/react-dropdown-menu';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import { Notification, User, notifications as allNotifications, users } from '@/lib/data';
import { formatDistanceToNow } from 'date-fns';
import Link from 'next/link';

interface NotificationBellProps {
  currentUserId: string;
}

export function NotificationBell({ currentUserId }: NotificationBellProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  
  // Filter notifications for current user and sort by timestamp (newest first)
  useEffect(() => {
    const userNotifications = allNotifications
      .filter(notification => notification.userId === currentUserId)
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    
    setNotifications(userNotifications);
  }, [currentUserId]);

  // Get unread notifications count
  const unreadCount = notifications.filter(notification => !notification.isRead).length;
  
  // Mark notifications as read when opening dropdown
  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    
    // In a real app, this would make an API call to mark notifications as read
    if (open && unreadCount > 0) {
      setTimeout(() => {
        setNotifications(prev => 
          prev.map(notification => ({ ...notification, isRead: true }))
        );
      }, 2000);
    }
  };
  
  // Get user data for a notification source
  const getUserForNotification = (userId?: string): User | null => {
    if (!userId) return null;
    const user = users.find(user => user.id === userId);
    return user || null;
  };
  
  // Format notification timestamp
  const formatTimestamp = (timestamp: string) => {
    return formatDistanceToNow(new Date(timestamp), { addSuffix: true });
  };
  
  // Render icon based on notification type
  const getNotificationIcon = (notification: Notification, sourceUser: User | null) => {
    return (
      <Avatar className="h-8 w-8">
        {sourceUser ? (
          <>
            <AvatarImage src={sourceUser.profilePictureUrl} alt={sourceUser.username} />
            <AvatarFallback>{sourceUser.username.slice(0, 2).toUpperCase()}</AvatarFallback>
          </>
        ) : (
          <AvatarFallback>N</AvatarFallback>
        )}
      </Avatar>
    );
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

  return (
    <DropdownMenu open={isOpen} onOpenChange={handleOpenChange}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 text-white rounded-full text-xs flex items-center justify-center">
              {unreadCount > 9 ? '9+' : unreadCount}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent align="end" className="w-80">
        <DropdownMenuLabel className="flex justify-between items-center">
          <span>Notifications</span>
          {notifications.length > 0 && (
            <Link href="/notifications" className="text-xs text-blue-500 hover:underline">
              View all
            </Link>
          )}
        </DropdownMenuLabel>
        
        <DropdownMenuSeparator />
        
        <div className="max-h-[400px] overflow-y-auto">
          <DropdownMenuGroup>
            {notifications.length > 0 ? (
              notifications.slice(0, 5).map((notification) => {
                const sourceUser = getUserForNotification(notification.sourceUserId);
                const isUnread = !notification.isRead;
                
                return (
                  <DropdownMenuItem key={notification.id} asChild>
                    <Link 
                      href={getNotificationLink(notification)}
                      className={`flex items-start gap-3 p-3 ${isUnread ? 'bg-blue-50 dark:bg-blue-950/30' : ''}`}
                    >
                      {getNotificationIcon(notification, sourceUser)}
                      
                      <div className="flex-1 min-w-0">
                        <p className="text-sm line-clamp-2">{notification.content}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {formatTimestamp(notification.timestamp)}
                        </p>
                      </div>
                      
                      {isUnread && (
                        <div className="w-2 h-2 bg-blue-500 rounded-full self-center" />
                      )}
                    </Link>
                  </DropdownMenuItem>
                );
              })
            ) : (
              <div className="py-4 text-center text-muted-foreground">
                <p>No notifications yet</p>
              </div>
            )}
          </DropdownMenuGroup>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
} 