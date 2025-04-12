'use client';

import { useTracksStore } from "@/lib/store";
import { tracks } from "@/lib/data";

export default function Home() {
  // In a real app, we'd use server-side data fetching
  // For the prototype, we'll use our mock data directly
  const feedTracks = tracks.sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
  
  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-1">Your Feed</h1>
        <p className="text-muted-foreground">Discover tracks from people you follow and trending music</p>
      </div>
      
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {feedTracks.map((track) => (
          <TrackCard key={track.id} track={track} />
        ))}
      </div>
    </div>
  );
}

// Client component import
import dynamic from 'next/dynamic';
const TrackCard = dynamic(() => import('@/components/tracks/track-card'), { ssr: false });
