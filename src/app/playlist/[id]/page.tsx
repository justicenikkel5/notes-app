'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Play, Clock, Share, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Playlist, Track, User as UserType, playlists, tracks, users } from '@/lib/data';
import { usePlaylistsStore } from '@/lib/store';
import { formatTime } from '@/lib/utils';
import dynamic from 'next/dynamic';

const TrackCard = dynamic(() => import('@/components/tracks/track-card'), { ssr: false });

export default function PlaylistDetailPage({ params }: { params: { id: string } }) {
  const { isPlaylistUnlocked } = usePlaylistsStore();
  const [playlist, setPlaylist] = useState<Playlist | null>(null);
  const [playlistTracks, setPlaylistTracks] = useState<Track[]>([]);
  const [creator, setCreator] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // In a real app, we'd fetch from an API
    setLoading(true);
    
    const foundPlaylist = playlists.find(p => p.id === params.id);
    
    if (foundPlaylist) {
      setPlaylist(foundPlaylist);
      
      // Get creator
      const foundCreator = users.find(u => u.id === foundPlaylist.creatorId);
      setCreator(foundCreator || null);
      
      // Get tracks
      const foundTracks = tracks.filter(t => foundPlaylist.trackIds.includes(t.id));
      setPlaylistTracks(foundTracks);
    }
    
    setLoading(false);
  }, [params.id]);
  
  if (loading) {
    return (
      <div className="max-w-5xl mx-auto p-4 sm:p-6 flex justify-center py-20">
        <div className="animate-pulse">Loading...</div>
      </div>
    );
  }
  
  if (!playlist) {
    return (
      <div className="max-w-5xl mx-auto p-4 sm:p-6 text-center py-20">
        <h1 className="text-2xl font-bold mb-4">Playlist Not Found</h1>
        <p className="text-muted-foreground">The playlist you're looking for doesn't exist or has been removed.</p>
      </div>
    );
  }
  
  const isUnlocked = !playlist.isLocked || isPlaylistUnlocked(playlist.id);
  
  if (playlist.isLocked && !isUnlocked) {
    return (
      <div className="max-w-5xl mx-auto p-4 sm:p-6 text-center py-20">
        <h1 className="text-2xl font-bold mb-4">Locked Playlist</h1>
        <p className="text-muted-foreground mb-6">You need to unlock this playlist to view its contents</p>
        
        <Link href={`/profile/${playlist.creatorId}`}>
          <Button>Go to Creator's Profile</Button>
        </Link>
      </div>
    );
  }
  
  const totalDuration = playlistTracks.reduce((total, track) => total + track.duration, 0);
  const totalMinutes = Math.floor(totalDuration / 60);
  
  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center gap-6 mb-8">
        <div className="relative w-full sm:w-48 h-48 flex-shrink-0">
          <Image
            src={playlist.artworkUrl}
            alt={playlist.title}
            fill
            className="object-cover rounded-lg"
          />
        </div>
        
        <div>
          <h1 className="text-3xl font-bold mb-2">{playlist.title}</h1>
          <p className="text-muted-foreground mb-4">{playlist.description}</p>
          
          <div className="flex items-center text-sm text-muted-foreground mb-4">
            {creator && (
              <Link href={`/profile/${creator.id}`} className="flex items-center hover:text-blue-500">
                <User className="h-4 w-4 mr-1" />
                <span>{creator.username}</span>
              </Link>
            )}
            
            <span className="mx-2">•</span>
            <span>{playlistTracks.length} tracks</span>
            <span className="mx-2">•</span>
            <span>{totalMinutes} min</span>
          </div>
          
          <div className="flex gap-3">
            <Button variant="accent" className="gap-2">
              <Play className="h-4 w-4" />
              Play All
            </Button>
            
            <Button variant="outline" className="gap-2">
              <Share className="h-4 w-4" />
              Share
            </Button>
          </div>
        </div>
      </div>
      
      <div className="mb-4 border-b border-border pb-2">
        <div className="grid grid-cols-[auto_1fr_auto] sm:grid-cols-[auto_1fr_auto_auto] items-center px-3 text-xs text-muted-foreground">
          <span className="mr-4">#</span>
          <span>TITLE</span>
          <span className="hidden sm:inline-block mr-6">
            <Clock className="h-3 w-3" />
          </span>
          <span className="justify-self-end">UPVOTES</span>
        </div>
      </div>
      
      <div>
        {playlistTracks.map((track, index) => (
          <div 
            key={track.id}
            className="grid grid-cols-[auto_1fr_auto] sm:grid-cols-[auto_1fr_auto_auto] items-center px-3 py-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-md"
          >
            <span className="mr-4 text-sm text-muted-foreground">{index + 1}</span>
            <TrackCard track={track} compact />
            <span className="hidden sm:inline-block text-sm text-muted-foreground mr-6">
              {formatTime(track.duration)}
            </span>
            <span className="text-sm text-muted-foreground justify-self-end">
              {track.upvotes}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
} 