'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { tracks, playlists } from "@/lib/data";
import { useUserStore } from "@/lib/store";
import { PlusCircle } from 'lucide-react';
import dynamic from 'next/dynamic';

const TrackCard = dynamic(() => import('@/components/tracks/track-card'), { ssr: false });
const PlaylistCard = dynamic(() => import('@/components/playlists/playlist-card'), { ssr: false });

export default function LibraryPage() {
  const { currentUser, isAuthenticated } = useUserStore();
  
  // In a real app, these would be filtered based on the user's saved items
  // For the prototype, we'll just use a subset of our mock data
  const savedTracks = tracks.slice(0, 4);
  const userPlaylists = currentUser 
    ? playlists.filter(playlist => playlist.creatorId === currentUser.id)
    : [];
  
  // Unlocked playlists would come from a real database in a real app
  const unlockedPlaylists = playlists.filter(playlist => !userPlaylists.includes(playlist)).slice(0, 2);
  
  if (!isAuthenticated) {
    return (
      <div className="max-w-5xl mx-auto p-4 sm:p-6 text-center">
        <h1 className="text-2xl font-bold mb-4">Your Library</h1>
        <p className="text-muted-foreground mb-6">Sign in to view your saved tracks and playlists</p>
        
        <Link href="/login">
          <Button>Sign In</Button>
        </Link>
      </div>
    );
  }
  
  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Your Library</h1>
        
        <Button variant="outline" size="sm" className="rounded-full">
          <PlusCircle className="h-4 w-4 mr-2" />
          Create Playlist
        </Button>
      </div>
      
      <Tabs defaultValue="playlists">
        <TabsList className="mb-6">
          <TabsTrigger value="playlists">Playlists</TabsTrigger>
          <TabsTrigger value="tracks">Tracks</TabsTrigger>
          <TabsTrigger value="unlocked">Unlocked</TabsTrigger>
        </TabsList>
        
        <TabsContent value="playlists">
          {userPlaylists.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {userPlaylists.map(playlist => (
                <PlaylistCard key={playlist.id} playlist={playlist} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium mb-2">No playlists yet</h3>
              <p className="text-muted-foreground mb-4">Create your first playlist to start organizing your music</p>
              <Button>Create Playlist</Button>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="tracks">
          {savedTracks.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {savedTracks.map(track => (
                <TrackCard key={track.id} track={track} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium mb-2">No saved tracks</h3>
              <p className="text-muted-foreground mb-4">Discover and save tracks to build your collection</p>
              <Link href="/explore">
                <Button>Explore Music</Button>
              </Link>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="unlocked">
          {unlockedPlaylists.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {unlockedPlaylists.map(playlist => (
                <PlaylistCard key={playlist.id} playlist={playlist} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium mb-2">No unlocked content</h3>
              <p className="text-muted-foreground mb-4">Spend Notes to unlock exclusive playlists from your favorite curators</p>
              <Link href="/explore">
                <Button>Discover Playlists</Button>
              </Link>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
} 