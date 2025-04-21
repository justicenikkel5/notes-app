'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useUserStore } from '@/lib/store';
import { users } from '@/lib/data';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function LoginPage() {
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [signupUsername, setSignupUsername] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const { login, signup } = useUserStore();
  const router = useRouter();
  
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    const success = login(loginUsername, loginPassword);
    
    if (success) {
      router.push('/');
    } else {
      setError('Invalid username or password');
    }
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Basic validation
    if (signupPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (signupPassword.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    const success = signup(signupUsername, signupPassword);
    
    if (success) {
      router.push('/');
    } else {
      setError('Username already exists');
    }
  };
  
  return (
    <div className="max-w-md mx-auto p-6 mt-10">
      <div className="bg-background border border-border rounded-lg p-8 shadow-sm">
        <h1 className="text-2xl font-bold mb-6 text-center">Welcome to MusicNotes</h1>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="login">Sign In</TabsTrigger>
            <TabsTrigger value="signup">Create Account</TabsTrigger>
          </TabsList>
          
          <TabsContent value="login">
            <form onSubmit={handleLogin}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1" htmlFor="loginUsername">
                  Username
                </label>
                <input
                  id="loginUsername"
                  type="text"
                  value={loginUsername}
                  onChange={(e) => setLoginUsername(e.target.value)}
                  className="w-full p-2 border border-border rounded-md bg-background"
                  required
                />
              </div>
              
              <div className="mb-6">
                <label className="block text-sm font-medium mb-1" htmlFor="loginPassword">
                  Password
                </label>
                <input
                  id="loginPassword"
                  type="password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
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
                      setLoginUsername(user.username);
                      setLoginPassword('password'); // Demo password
                    }}
                    className="text-blue-500 hover:underline"
                  >
                    {user.username}
                  </button>
                ))}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="signup">
            <form onSubmit={handleSignup}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1" htmlFor="signupUsername">
                  Username
                </label>
                <input
                  id="signupUsername"
                  type="text"
                  value={signupUsername}
                  onChange={(e) => setSignupUsername(e.target.value)}
                  className="w-full p-2 border border-border rounded-md bg-background"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1" htmlFor="signupPassword">
                  Password
                </label>
                <input
                  id="signupPassword"
                  type="password"
                  value={signupPassword}
                  onChange={(e) => setSignupPassword(e.target.value)}
                  className="w-full p-2 border border-border rounded-md bg-background"
                  required
                />
                <p className="text-xs text-muted-foreground mt-1">Must be at least 6 characters</p>
              </div>
              
              <div className="mb-6">
                <label className="block text-sm font-medium mb-1" htmlFor="confirmPassword">
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full p-2 border border-border rounded-md bg-background"
                  required
                />
              </div>
              
              <Button type="submit" className="w-full">
                Create Account
              </Button>
            </form>
            
            <p className="mt-4 text-sm text-center text-muted-foreground">
              By creating an account, you'll receive 50 Notes to start exploring locked content!
            </p>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
} 