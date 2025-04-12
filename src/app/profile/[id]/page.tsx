'use client';

import { useEffect, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, tracks, playlists, users } from "@/lib/data";
import { useUserStore } from "@/lib/store";
import dynamic from 'next/dynamic';

const UserProfileCard = dynamic(() => import("@/components/users/user-profile-card"), { ssr: false });
const TrackCard = dynamic(() => import('@/components/tracks/track-card'), { ssr: false });
const PlaylistCard = dynamic(() => import('@/components/playlists/playlist-card'), { ssr: false });

export default function ProfilePage({ params }: { params: { id: string } }) {
  const { currentUser } = useUserStore();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // In a real app, we'd fetch from an API
    setLoading(true);
    const foundUser = users.find(u => u.id === params.id);
    setUser(foundUser || null);
    setLoading(false);
  }, [params.id]);
  
  if (loading) {
    return (
      <div className="max-w-5xl mx-auto p-4 sm:p-6 flex justify-center py-20">
        <div className="animate-pulse">Loading...</div>
      </div>
    );
  }
  
  if (!user) {
    return (
      <div className="max-w-5xl mx-auto p-4 sm:p-6 text-center py-20">
        <h1 className="text-2xl font-bold mb-4">User Not Found</h1>
        <p className="text-muted-foreground">The user you're looking for doesn't exist or has been removed.</p>
      </div>
    );
  }
  
  // Get tracks uploaded by this user
  const userTracks = tracks.filter(track => track.uploadedById === user.id);
  
  // Get playlists created by this user
  const userPlaylists = playlists.filter(playlist => playlist.creatorId === user.id);
  
  const isCurrentUser = currentUser?.id === user.id;
  
  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6">
      <UserProfileCard user={user} isCurrentUser={isCurrentUser} />
      
      <div className="mt-8">
        <Tabs defaultValue="tracks">
          <TabsList className="mb-6">
            <TabsTrigger value="tracks">Tracks</TabsTrigger>
            <TabsTrigger value="playlists">Playlists</TabsTrigger>
          </TabsList>
          
          <TabsContent value="tracks">
            {userTracks.length > 0 ? (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {userTracks.map(track => (
                  <TrackCard key={track.id} track={track} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium mb-2">No tracks shared yet</h3>
                <p className="text-muted-foreground">
                  {isCurrentUser 
                    ? "You haven't shared any tracks yet. Upload or share your first track!"
                    : `${user.username} hasn't shared any tracks yet.`}
                </p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="playlists">
            {userPlaylists.length > 0 ? (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {userPlaylists.map(playlist => (
                  <PlaylistCard key={playlist.id} playlist={playlist} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium mb-2">No playlists created yet</h3>
                <p className="text-muted-foreground">
                  {isCurrentUser 
                    ? "You haven't created any playlists yet. Create your first playlist to organize your music!"
                    : `${user.username} hasn't created any playlists yet.`}
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
} 