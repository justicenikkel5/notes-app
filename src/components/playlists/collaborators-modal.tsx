'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Playlist, PlaylistCollaborator, User, users } from '@/lib/data';
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import { CheckIcon, TrashIcon, UserPlusIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface CollaboratorsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  playlist: Playlist;
  onAddCollaborator: (userId: string, role: 'editor' | 'viewer') => void;
  onRemoveCollaborator: (userId: string) => void;
  onUpdateCollaboratorRole: (userId: string, role: 'editor' | 'viewer') => void;
}

export function CollaboratorsModal({
  open,
  onOpenChange,
  playlist,
  onAddCollaborator,
  onRemoveCollaborator,
  onUpdateCollaboratorRole,
}: CollaboratorsModalProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState<'editor' | 'viewer'>('editor');

  // Get the collaborators with their user info
  const collaboratorsWithUserInfo = playlist.collaborators.map((collab) => {
    const user = users.find((u) => u.id === collab.userId);
    return { ...collab, user };
  });

  // Get potential collaborators (users who aren't already collaborators or the creator)
  const potentialCollaborators = users.filter(
    (user) => 
      user.id !== playlist.creatorId && 
      !playlist.collaborators.some((collab) => collab.userId === user.id) &&
      user.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Playlist Collaborators</DialogTitle>
        </DialogHeader>
        
        <div className="flex flex-col gap-4">
          <div>
            <h3 className="text-sm font-medium mb-2">Add collaborators</h3>
            <div className="flex gap-2 mb-3">
              <Input 
                placeholder="Search users..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1"
              />
              <div className="flex gap-1">
                <Button
                  variant={selectedRole === 'editor' ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedRole('editor')}
                >
                  Editor
                </Button>
                <Button
                  variant={selectedRole === 'viewer' ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedRole('viewer')}
                >
                  Viewer
                </Button>
              </div>
            </div>
            
            <div className="max-h-40 overflow-y-auto border rounded-md">
              {potentialCollaborators.length > 0 ? (
                potentialCollaborators.map((user) => (
                  <div 
                    key={user.id} 
                    className="flex items-center justify-between p-2 hover:bg-muted"
                  >
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user.profilePictureUrl} alt={user.username} />
                        <AvatarFallback>{user.username.slice(0, 2).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-medium">{user.username}</span>
                    </div>
                    <Button
                      size="sm"
                      onClick={() => onAddCollaborator(user.id, selectedRole)}
                    >
                      <UserPlusIcon className="h-4 w-4 mr-1" />
                      Add
                    </Button>
                  </div>
                ))
              ) : (
                <div className="p-3 text-center text-sm text-muted-foreground">
                  No users found
                </div>
              )}
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-medium mb-2">Current collaborators</h3>
            <div className="border rounded-md">
              {collaboratorsWithUserInfo.length > 0 ? (
                collaboratorsWithUserInfo.map((collab) => (
                  <div 
                    key={collab.userId} 
                    className="flex items-center justify-between p-2 hover:bg-muted"
                  >
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={collab.user?.profilePictureUrl} alt={collab.user?.username} />
                        <AvatarFallback>{collab.user?.username.slice(0, 2).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">{collab.user?.username}</p>
                        <p className="text-xs text-muted-foreground">
                          {collab.role === 'editor' ? 'Can edit' : 'Can view'}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => 
                          onUpdateCollaboratorRole(
                            collab.userId, 
                            collab.role === 'editor' ? 'viewer' : 'editor'
                          )
                        }
                      >
                        {collab.role === 'editor' ? 'Make viewer' : 'Make editor'}
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => onRemoveCollaborator(collab.userId)}
                      >
                        <TrashIcon className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-3 text-center text-sm text-muted-foreground">
                  No collaborators yet
                </div>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
} 