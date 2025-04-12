'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Track, User, tracks, users } from '@/lib/data';
import dynamic from 'next/dynamic';

const TrackCard = dynamic(() => import('@/components/tracks/track-card'), { ssr: false });

export default function LeaderboardsPage() {
  // Get trending tracks sorted by upvotes
  const trendingTracks = [...tracks].sort((a, b) => b.upvotes - a.upvotes);
  
  // Get top curators sorted by followers count
  const topCurators = [...users].sort((a, b) => b.followersCount - a.followersCount);
  
  // Get top note earners sorted by notes balance
  const topNoteEarners = [...users].sort((a, b) => b.notesBalance - a.notesBalance);
  
  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-1">Leaderboards</h1>
        <p className="text-muted-foreground">Discover what's trending in the MusicNotes community</p>
      </div>
      
      <Tabs defaultValue="tracks">
        <TabsList className="mb-6">
          <TabsTrigger value="tracks">Top Tracks</TabsTrigger>
          <TabsTrigger value="curators">Top Curators</TabsTrigger>
          <TabsTrigger value="earners">Top Note Earners</TabsTrigger>
        </TabsList>
        
        <TabsContent value="tracks">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {trendingTracks.slice(0, 6).map(track => (
              <TrackCard key={track.id} track={track} />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="curators">
          <div className="space-y-2">
            {topCurators.slice(0, 10).map((user, index) => (
              <Link 
                key={user.id} 
                href={`/profile/${user.id}`}
                className="flex items-center p-3 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
              >
                <div className="w-6 text-center font-medium text-muted-foreground mr-4">
                  {index + 1}
                </div>
                
                <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
                  <Image
                    src={user.profilePictureUrl}
                    alt={user.username}
                    fill
                    className="object-cover"
                  />
                </div>
                
                <div className="flex-1">
                  <h3 className="font-medium">@{user.username}</h3>
                  <p className="text-sm text-muted-foreground">{user.followersCount} followers</p>
                </div>
                
                <Button variant="outline" size="sm" className="rounded-full">
                  Follow
                </Button>
              </Link>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="earners">
          <div className="space-y-2">
            {topNoteEarners.slice(0, 10).map((user, index) => (
              <Link 
                key={user.id} 
                href={`/profile/${user.id}`}
                className="flex items-center p-3 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
              >
                <div className="w-6 text-center font-medium text-muted-foreground mr-4">
                  {index + 1}
                </div>
                
                <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
                  <Image
                    src={user.profilePictureUrl}
                    alt={user.username}
                    fill
                    className="object-cover"
                  />
                </div>
                
                <div className="flex-1">
                  <h3 className="font-medium">@{user.username}</h3>
                  <p className="text-sm text-muted-foreground">{user.bio.substring(0, 60)}...</p>
                </div>
                
                <div className="text-right">
                  <p className="font-bold text-blue-500">{user.notesBalance}</p>
                  <p className="text-xs text-muted-foreground">Notes</p>
                </div>
              </Link>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
} 