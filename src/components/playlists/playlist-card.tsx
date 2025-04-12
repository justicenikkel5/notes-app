'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Lock, Play, Unlock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Playlist, Track, User, tracks, users } from '@/lib/data';
import { usePlaylistsStore, useUserStore } from '@/lib/store';

interface PlaylistCardProps {
  playlist: Playlist;
}

export default function PlaylistCard({ playlist }: PlaylistCardProps) {
  const [showUnlockModal, setShowUnlockModal] = useState(false);
  const { isPlaylistUnlocked, unlockPlaylist } = usePlaylistsStore();
  const { currentUser } = useUserStore();
  
  const creator = users.find(user => user.id === playlist.creatorId);
  const playlistTracks = tracks.filter(track => playlist.trackIds.includes(track.id));
  const isUnlocked = !playlist.isLocked || isPlaylistUnlocked(playlist.id);
  
  function handleUnlock() {
    if (unlockPlaylist(playlist.id)) {
      setShowUnlockModal(false);
    }
  }
  
  return (
    <div className="bg-black/10 hover:bg-black/20 dark:bg-white/5 dark:hover:bg-white/10 rounded-lg overflow-hidden transition-all duration-300">
      <div className="relative aspect-square">
        <Image
          src={playlist.artworkUrl}
          alt={playlist.title}
          fill
          className="object-cover"
        />
        
        {playlist.isLocked && !isUnlocked && (
          <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-white p-4">
            <Lock className="h-8 w-8 mb-2" />
            <p className="text-center font-semibold mb-1">Locked Playlist</p>
            <p className="text-center text-sm mb-3">Spend {playlist.notesRequired} Notes to unlock</p>
            
            <Button 
              variant="accent"
              onClick={() => setShowUnlockModal(true)}
              disabled={!currentUser || (currentUser && currentUser.notesBalance < playlist.notesRequired)}
              className="mt-2"
            >
              Unlock
            </Button>
          </div>
        )}
        
        {isUnlocked && (
          <Link href={`/playlist/${playlist.id}`} className="absolute inset-0">
            <div className="absolute inset-0 bg-black/30 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
              <Button variant="ghost" size="icon" className="text-white bg-black/30 rounded-full h-12 w-12">
                <Play className="h-6 w-6" />
              </Button>
            </div>
          </Link>
        )}
      </div>
      
      <div className="p-3">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold">{playlist.title}</h3>
            {creator && (
              <p className="text-sm text-foreground/60">by @{creator.username}</p>
            )}
          </div>
          
          {playlist.isLocked && (
            <div className="text-xs flex items-center">
              {isUnlocked ? (
                <span className="flex items-center text-green-500">
                  <Unlock className="h-3 w-3 mr-1" />
                  Unlocked
                </span>
              ) : (
                <span className="flex items-center text-blue-500">
                  <Lock className="h-3 w-3 mr-1" />
                  {playlist.notesRequired} Notes
                </span>
              )}
            </div>
          )}
        </div>
        
        <p className="text-xs text-foreground/60 mt-2 line-clamp-2">{playlist.description}</p>
        
        <div className="mt-3 text-xs text-foreground/60">
          <p>{playlistTracks.length} tracks</p>
        </div>
      </div>
      
      {/* Unlock Modal */}
      {showUnlockModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-background rounded-lg max-w-md w-full p-6">
            <h3 className="text-xl font-bold mb-4">Unlock "{playlist.title}"</h3>
            
            <div className="mb-6">
              <p className="mb-2">
                Spend <span className="text-blue-500 font-bold">{playlist.notesRequired} Notes</span> to unlock this playlist?
              </p>
              
              {currentUser && (
                <p className="text-sm text-muted-foreground">
                  Your balance: <span className="text-blue-500 font-bold">{currentUser.notesBalance} Notes</span>
                </p>
              )}
            </div>
            
            <div className="flex justify-end gap-3">
              <Button variant="ghost" onClick={() => setShowUnlockModal(false)}>
                Cancel
              </Button>
              <Button 
                variant="accent"
                onClick={handleUnlock}
                disabled={!currentUser || (currentUser && currentUser.notesBalance < playlist.notesRequired)}
              >
                Confirm
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 