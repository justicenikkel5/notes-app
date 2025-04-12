'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, MoreHorizontal, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { User } from '@/lib/data';

interface UserProfileCardProps {
  user: User;
  isCurrentUser?: boolean;
}

export default function UserProfileCard({ user, isCurrentUser = false }: UserProfileCardProps) {
  return (
    <div className="rounded-lg overflow-hidden bg-black/10 dark:bg-white/5">
      {/* Cover image (placeholder) */}
      <div className="h-32 bg-gradient-to-r from-blue-500 to-purple-500"></div>
      
      <div className="px-4 pb-4 relative">
        {/* Profile picture */}
        <div className="relative w-24 h-24 -mt-12 mb-3 border-4 border-background rounded-full overflow-hidden">
          <Image
            src={user.profilePictureUrl}
            alt={user.username}
            fill
            className="object-cover"
          />
        </div>
        
        {/* Action buttons */}
        <div className="absolute right-4 top-2 flex space-x-2">
          {!isCurrentUser && (
            <Button variant="accent" size="sm" className="rounded-full">
              <UserPlus className="h-4 w-4 mr-1" />
              Follow
            </Button>
          )}
          
          {isCurrentUser && (
            <Button variant="outline" size="sm" className="rounded-full">
              Edit Profile
            </Button>
          )}
          
          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
        
        {/* User info */}
        <div>
          <h2 className="text-xl font-bold">@{user.username}</h2>
          
          <div className="flex space-x-4 mt-1 text-sm text-muted-foreground">
            <span>{user.followersCount} followers</span>
            <span>{user.followingCount} following</span>
            <span><strong className="text-blue-500">{user.notesBalance}</strong> Notes</span>
          </div>
          
          <p className="mt-3 text-sm">{user.bio}</p>
          
          {/* Social links */}
          {user.socialLinks.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {user.socialLinks.map((link, index) => (
                <a 
                  key={index}
                  href={link} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center text-xs text-blue-500 hover:underline"
                >
                  <ExternalLink className="h-3 w-3 mr-1" />
                  {new URL(link).hostname.replace('www.', '')}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 