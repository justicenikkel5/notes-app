'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { 
  playlists, 
  users, 
  Playlist, 
  PlaylistCollaborator, 
  User 
} from '@/lib/data';
import { Button } from '@/components/ui/button';
import { CollaboratorsModal } from '@/components/playlists/collaborators-modal';
import Link from 'next/link';
import { ArrowLeft, Edit, Share, UserPlus } from 'lucide-react';

export default function PlaylistCollaboratePage() {
  const params = useParams();
  const playlistId = params.id as string;
  
  const [playlist, setPlaylist] = useState<Playlist | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  
  // In a real app, get the current user from auth
  const currentUserId = "1"; // melodicmaven 
  
  useEffect(() => {
    // Find the playlist
    const foundPlaylist = playlists.find(p => p.id === playlistId);
    if (foundPlaylist) {
      setPlaylist(foundPlaylist);
    }
    
    // Get current user
    const user = users.find(u => u.id === currentUserId);
    if (user) {
      setCurrentUser(user);
    }
  }, [playlistId, currentUserId]);
  
  // Check if user is the creator or has editor permissions
  const canEditCollaborators = playlist && (
    playlist.creatorId === currentUserId ||
    playlist.collaborators.some(c => c.userId === currentUserId && c.role === 'editor')
  );
  
  // Handle adding a collaborator
  const handleAddCollaborator = (userId: string, role: 'editor' | 'viewer') => {
    if (!playlist) return;
    
    const newCollaborator: PlaylistCollaborator = {
      userId,
      role,
      addedAt: new Date().toISOString()
    };
    
    // Update the local state
    setPlaylist({
      ...playlist,
      collaborators: [...playlist.collaborators, newCollaborator],
      isCollaborative: true
    });
    
    // In a real app, this would make an API call
  };
  
  // Handle removing a collaborator
  const handleRemoveCollaborator = (userId: string) => {
    if (!playlist) return;
    
    // Update the local state
    setPlaylist({
      ...playlist,
      collaborators: playlist.collaborators.filter(c => c.userId !== userId)
    });
    
    // In a real app, this would make an API call
  };
  
  // Handle updating a collaborator's role
  const handleUpdateCollaboratorRole = (userId: string, role: 'editor' | 'viewer') => {
    if (!playlist) return;
    
    // Update the local state
    setPlaylist({
      ...playlist,
      collaborators: playlist.collaborators.map(c => 
        c.userId === userId ? { ...c, role } : c
      )
    });
    
    // In a real app, this would make an API call
  };
  
  // Get user data
  const getUser = (userId: string) => {
    return users.find(u => u.id === userId);
  };
  
  if (!playlist) {
    return (
      <div className="max-w-5xl mx-auto p-4 sm:p-6">
        <p>Playlist not found</p>
      </div>
    );
  }
  
  const creator = getUser(playlist.creatorId);
  
  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6">
      <div className="mb-6">
        <Link 
          href={`/playlist/${playlistId}`}
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4"
        >
          <ArrowLeft className="mr-1 h-4 w-4" />
          Back to playlist
        </Link>
        
        <h1 className="text-2xl font-bold">{playlist.title}</h1>
        <p className="text-muted-foreground">
          Created by {creator?.username || 'Unknown user'} · {playlist.trackIds.length} tracks
        </p>
      </div>
      
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-xl font-semibold">Collaboration Settings</h2>
        
        {canEditCollaborators && (
          <Button onClick={() => setIsModalOpen(true)}>
            <UserPlus className="mr-2 h-4 w-4" />
            Manage collaborators
          </Button>
        )}
      </div>
      
      <div className="space-y-6">
        <div className="rounded-lg border p-6">
          <h3 className="text-lg font-semibold mb-4">Collaborators ({playlist.collaborators.length})</h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-muted rounded-md">
              <div className="flex items-center gap-2">
                <span className="font-medium">{creator?.username}</span>
                <span className="text-xs bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 px-2 py-0.5 rounded">
                  Creator
                </span>
              </div>
            </div>
            
            {playlist.collaborators.map(collab => {
              const user = getUser(collab.userId);
              
              return (
                <div key={collab.userId} className="flex items-center justify-between p-3 rounded-md border">
                  <div>
                    <span className="font-medium">{user?.username}</span>
                    <span className="text-xs text-muted-foreground ml-2">
                      {collab.role === 'editor' ? 'Can edit' : 'Can view'}
                    </span>
                  </div>
                  
                  {canEditCollaborators && (
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleUpdateCollaboratorRole(
                          collab.userId, 
                          collab.role === 'editor' ? 'viewer' : 'editor'
                        )}
                      >
                        {collab.role === 'editor' ? 'Make viewer' : 'Make editor'}
                      </Button>
                      
                      <Button 
                        variant="destructive" 
                        size="sm"
                        onClick={() => handleRemoveCollaborator(collab.userId)}
                      >
                        Remove
                      </Button>
                    </div>
                  )}
                </div>
              );
            })}
            
            {playlist.collaborators.length === 0 && (
              <p className="text-center text-muted-foreground py-6">
                This playlist doesn't have any collaborators yet.
              </p>
            )}
          </div>
        </div>
        
        <div className="rounded-lg border p-6">
          <h3 className="text-lg font-semibold mb-4">Sharing</h3>
          
          <p className="mb-4">
            Share this link with others to allow them to view{canEditCollaborators ? ' or collaborate on' : ''} this playlist:
          </p>
          
          <div className="flex gap-2">
            <div className="border rounded-md p-2 flex-1 bg-muted">
              https://musicnotes.app/playlist/{playlistId}
            </div>
            
            <Button variant="outline">
              <Share className="h-4 w-4 mr-2" />
              Copy link
            </Button>
          </div>
        </div>
      </div>
      
      {/* Collaborators Modal */}
      <CollaboratorsModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        playlist={playlist}
        onAddCollaborator={handleAddCollaborator}
        onRemoveCollaborator={handleRemoveCollaborator}
        onUpdateCollaboratorRole={handleUpdateCollaboratorRole}
      />
    </div>
  );
} 