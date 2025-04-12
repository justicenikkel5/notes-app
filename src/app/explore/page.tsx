'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { tracks } from "@/lib/data";
import dynamic from 'next/dynamic';

const TrackCard = dynamic(() => import('@/components/tracks/track-card'), { ssr: false });

// Get unique tags from all tracks
const allTags = Array.from(new Set(tracks.flatMap(track => track.tags)));

export default function ExplorePage() {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  
  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };
  
  const filteredTracks = selectedTags.length === 0
    ? tracks
    : tracks.filter(track => track.tags.some(tag => selectedTags.includes(tag)));
  
  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-1">Explore</h1>
        <p className="text-muted-foreground">Discover music by genre, mood, or style</p>
      </div>
      
      <div className="mb-6 flex flex-wrap gap-2">
        {allTags.map(tag => (
          <Button
            key={tag}
            variant={selectedTags.includes(tag) ? "accent" : "outline"}
            size="sm"
            className="rounded-full"
            onClick={() => toggleTag(tag)}
          >
            {tag}
          </Button>
        ))}
      </div>
      
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredTracks.map((track) => (
          <TrackCard key={track.id} track={track} />
        ))}
      </div>
    </div>
  );
} 