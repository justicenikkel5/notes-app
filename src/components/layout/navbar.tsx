'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Home, 
  Search, 
  Upload, 
  Library, 
  TrendingUp, 
  User, 
  LogIn, 
  LogOut,
  Menu,
  X,
  Moon,
  Sun
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useUserStore } from '@/lib/store';

export function Navbar() {
  const { currentUser, isAuthenticated, logout } = useUserStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  const NavigationItems = () => (
    <>
      <NavItem href="/" icon={<Home />} label="Feed" />
      <NavItem href="/explore" icon={<Search />} label="Explore" />
      <NavItem href="/upload" icon={<Upload />} label="Upload" />
      <NavItem href="/library" icon={<Library />} label="Library" />
      <NavItem href="/leaderboards" icon={<TrendingUp />} label="Leaderboards" />
      {isAuthenticated && (
        <NavItem href={`/profile/${currentUser?.id}`} icon={<User />} label="Profile" />
      )}
    </>
  );
  
  return (
    <>
      {/* Mobile Header */}
      <header className="fixed top-0 left-0 right-0 h-14 bg-background border-b border-border z-40 md:hidden">
        <div className="flex items-center justify-between h-full px-4">
          <Link href="/" className="font-bold text-xl">
            MusicNotes
          </Link>
          
          {isAuthenticated && currentUser && (
            <div className="flex items-center">
              <p className="text-sm font-medium mr-2">
                <span className="text-blue-500 font-bold">{currentUser.notesBalance}</span> Notes
              </p>
            </div>
          )}
          
          <Button variant="ghost" size="icon" onClick={toggleMobileMenu}>
            {mobileMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </header>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-background z-30 pt-16 pb-20 overflow-auto md:hidden">
          <nav className="flex flex-col p-4 space-y-1">
            <NavigationItems />
          </nav>
          
          <div className="absolute bottom-20 left-0 right-0 p-4 border-t border-border">
            <div className="flex justify-between items-center">
              {isAuthenticated && currentUser ? (
                <div className="flex items-center gap-3">
                  <div className="relative w-10 h-10">
                    <Image
                      src={currentUser.profilePictureUrl}
                      alt={currentUser.username}
                      fill
                      className="object-cover rounded-full"
                    />
                  </div>
                  <div>
                    <p className="font-medium">@{currentUser.username}</p>
                    <p className="text-sm text-muted-foreground">
                      <span className="text-blue-500 font-bold">{currentUser.notesBalance}</span> Notes
                    </p>
                  </div>
                </div>
              ) : (
                <div>
                  <Link href="/login">
                    <Button>
                      <LogIn className="h-4 w-4 mr-2" />
                      Sign In
                    </Button>
                  </Link>
                </div>
              )}
              
              <Button variant="ghost" size="icon">
                <Moon className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      )}
      
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex md:w-64 lg:w-72 fixed top-0 left-0 bottom-0 bg-background border-r border-border z-30 flex-col p-4">
        <Link href="/" className="font-bold text-2xl mb-8">
          MusicNotes
        </Link>
        
        <nav className="flex-1 flex flex-col space-y-1">
          <NavigationItems />
        </nav>
        
        <div className="mt-auto pt-4 border-t border-border">
          <div className="flex justify-between items-center mb-4">
            <Button variant="ghost" size="icon">
              <Moon className="h-5 w-5" />
            </Button>
            
            {isAuthenticated && (
              <Button variant="ghost" size="sm" onClick={logout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            )}
          </div>
          
          {isAuthenticated && currentUser ? (
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10">
                <Image
                  src={currentUser.profilePictureUrl}
                  alt={currentUser.username}
                  fill
                  className="object-cover rounded-full"
                />
              </div>
              <div>
                <p className="font-medium">@{currentUser.username}</p>
                <p className="text-sm text-muted-foreground">
                  <span className="text-blue-500 font-bold">{currentUser.notesBalance}</span> Notes
                </p>
              </div>
            </div>
          ) : (
            <div>
              <Link href="/login">
                <Button>
                  <LogIn className="h-4 w-4 mr-2" />
                  Sign In
                </Button>
              </Link>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}

interface NavItemProps {
  href: string;
  icon: React.ReactNode;
  label: string;
}

function NavItem({ href, icon, label }: NavItemProps) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-accent transition-colors"
    >
      <span className="text-muted-foreground">{icon}</span>
      <span>{label}</span>
    </Link>
  );
} 