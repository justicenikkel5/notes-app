'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useUserStore } from '@/lib/store';
import { users } from '@/lib/data';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useUserStore();
  const router = useRouter();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    const success = login(username, password);
    
    if (success) {
      router.push('/');
    } else {
      setError('Invalid username or password');
    }
  };
  
  return (
    <div className="max-w-md mx-auto p-6 mt-10">
      <div className="bg-background border border-border rounded-lg p-8 shadow-sm">
        <h1 className="text-2xl font-bold mb-6 text-center">Sign In</h1>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1" htmlFor="username">
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2 border border-border rounded-md bg-background"
              required
            />
          </div>
          
          <div className="mb-6">
            <label className="block text-sm font-medium mb-1" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-border rounded-md bg-background"
              required
            />
          </div>
          
          <Button type="submit" className="w-full">
            Sign In
          </Button>
        </form>
        
        <div className="mt-6 text-sm text-center">
          <p className="text-muted-foreground mb-2">
            For demo purposes, you can sign in with any of these usernames:
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {users.map(user => (
              <button
                key={user.id}
                onClick={() => {
                  setUsername(user.username);
                  setPassword('password'); // Demo password
                }}
                className="text-blue-500 hover:underline"
              >
                {user.username}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 