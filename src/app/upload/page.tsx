'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { UploadCloud, Music, X, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useUserStore } from '@/lib/store';

export default function UploadPage() {
  const { currentUser, isAuthenticated } = useUserStore();
  const router = useRouter();
  
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  
  // Redirect if not authenticated
  if (!isAuthenticated) {
    router.push('/login');
  }
  
  const handleAddTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim().toLowerCase())) {
      setTags([...tags, newTag.trim().toLowerCase()]);
      setNewTag('');
    }
  };
  
  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };
  
  const handleTagKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // This is a mock function since we're not actually uploading
    setIsUploading(true);
    
    // Simulate progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setUploadProgress(progress);
      
      if (progress >= 100) {
        clearInterval(interval);
        // In a real app, we would send the data to the backend
        // and handle the response
        setTimeout(() => {
          // Redirect to home after "upload"
          router.push('/');
        }, 500);
      }
    }, 300);
  };
  
  return (
    <div className="max-w-2xl mx-auto p-4 sm:p-6">
      <h1 className="text-2xl font-bold mb-6">Upload Track</h1>
      
      <form onSubmit={handleSubmit}>
        {/* File upload */}
        <div className="mb-6">
          <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
            <div className="flex flex-col items-center">
              <UploadCloud className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">Drag and drop your track here</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Support for MP3, WAV, FLAC up to 20MB
              </p>
              <Button type="button" variant="outline">
                <Music className="h-4 w-4 mr-2" />
                Select File
              </Button>
            </div>
          </div>
        </div>
        
        {/* Track info */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="title">
              Track Title
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 border border-border rounded-md bg-background"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="artist">
              Artist Name
            </label>
            <input
              id="artist"
              type="text"
              value={artist}
              onChange={(e) => setArtist(e.target.value)}
              className="w-full p-2 border border-border rounded-md bg-background"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="description">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 border border-border rounded-md bg-background h-24"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Tags</label>
            <div className="flex flex-wrap gap-2 mb-2">
              {tags.map(tag => (
                <div 
                  key={tag}
                  className="bg-black/5 dark:bg-white/10 text-sm rounded-full px-3 py-1 flex items-center"
                >
                  {tag}
                  <button 
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    className="ml-2 text-muted-foreground hover:text-foreground"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
            <div className="flex">
              <input
                type="text"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyDown={handleTagKeyDown}
                placeholder="Add tags (e.g. electronic, rock)"
                className="flex-1 p-2 border border-border rounded-l-md bg-background"
              />
              <Button 
                type="button"
                onClick={handleAddTag}
                className="rounded-l-none"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
        
        {isUploading ? (
          <div className="mt-6">
            <div className="w-full bg-black/10 dark:bg-white/10 rounded-full h-2 mb-2">
              <div 
                className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
            <p className="text-sm text-center text-muted-foreground">
              Uploading... {uploadProgress}%
            </p>
          </div>
        ) : (
          <Button type="submit" className="w-full mt-6">
            Upload Track
          </Button>
        )}
      </form>
    </div>
  );
} 