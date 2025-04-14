'use client';

import { useState } from 'react';
import { Comment, Track, User, comments as allComments, users } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { formatDistanceToNow } from 'date-fns';
import { MessageSquareIcon, ReplyIcon, ThumbsUpIcon } from 'lucide-react';
import CommentForm from './comment-form';
import CommentTimeline from './comment-timeline';

interface CommentSectionProps {
  track: Track;
  currentUser: User;
}

export default function CommentSection({ track, currentUser }: CommentSectionProps) {
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [showReplies, setShowReplies] = useState<Record<string, boolean>>({});
  
  // Get comments for this track
  const trackComments = allComments.filter(comment => comment.trackId === track.id);
  
  // Separate top-level comments and replies
  const topLevelComments = trackComments.filter(comment => !comment.parentId);
  const replies = trackComments.filter(comment => comment.parentId);
  
  // Get replies for a specific comment
  const getRepliesForComment = (commentId: string) => {
    return replies.filter(reply => reply.parentId === commentId);
  };

  // Toggle reply form
  const toggleReplyForm = (commentId: string) => {
    setReplyingTo(replyingTo === commentId ? null : commentId);
  };
  
  // Toggle showing replies
  const toggleShowReplies = (commentId: string) => {
    setShowReplies(prev => ({
      ...prev,
      [commentId]: !prev[commentId]
    }));
  };
  
  // Get user data for a comment
  const getUserForComment = (userId: string) => {
    return users.find(user => user.id === userId);
  };
  
  // Format the timestamp
  const formatTimestamp = (timestamp: string) => {
    return formatDistanceToNow(new Date(timestamp), { addSuffix: true });
  };
  
  // Format time position (e.g., 1:24)
  const formatTimePosition = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="mt-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold">Comments ({trackComments.length})</h2>
      </div>
      
      {/* Comment timeline visualization */}
      <CommentTimeline 
        track={track} 
        comments={trackComments.filter(c => c.timePosition !== undefined)}
      />
      
      {/* New comment form */}
      <div className="mb-8">
        <CommentForm trackId={track.id} currentUser={currentUser} parentId={null} />
      </div>
      
      {/* Comments list */}
      <div className="space-y-6">
        {topLevelComments.map(comment => {
          const user = getUserForComment(comment.userId);
          const commentReplies = getRepliesForComment(comment.id);
          
          return (
            <div key={comment.id} className="rounded-lg border p-4">
              {/* Comment header */}
              <div className="flex items-start gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={user?.profilePictureUrl} alt={user?.username} />
                  <AvatarFallback>{user?.username.slice(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{user?.username}</span>
                    <span className="text-xs text-muted-foreground">
                      {formatTimestamp(comment.timestamp)}
                    </span>
                    
                    {comment.timePosition && (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-xs h-6 px-2 rounded-full bg-muted hover:bg-muted"
                      >
                        at {formatTimePosition(comment.timePosition)}
                      </Button>
                    )}
                  </div>
                  
                  {/* Comment content */}
                  <p className="mt-1">{comment.content}</p>
                  
                  {/* Comment actions */}
                  <div className="flex gap-4 mt-2">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-xs text-muted-foreground h-6 px-2 flex items-center gap-1"
                      onClick={() => toggleReplyForm(comment.id)}
                    >
                      <ReplyIcon className="h-3 w-3" />
                      Reply
                    </Button>
                    
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-xs text-muted-foreground h-6 px-2 flex items-center gap-1"
                    >
                      <ThumbsUpIcon className="h-3 w-3" />
                      Like ({comment.likes})
                    </Button>
                    
                    {commentReplies.length > 0 && (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-xs text-muted-foreground h-6 px-2 flex items-center gap-1"
                        onClick={() => toggleShowReplies(comment.id)}
                      >
                        <MessageSquareIcon className="h-3 w-3" />
                        {showReplies[comment.id] ? 'Hide' : 'Show'} replies ({commentReplies.length})
                      </Button>
                    )}
                  </div>
                  
                  {/* Reply form */}
                  {replyingTo === comment.id && (
                    <div className="mt-3">
                      <CommentForm 
                        trackId={track.id} 
                        currentUser={currentUser} 
                        parentId={comment.id} 
                        onSubmitSuccess={() => setReplyingTo(null)}
                      />
                    </div>
                  )}
                  
                  {/* Replies */}
                  {showReplies[comment.id] && commentReplies.length > 0 && (
                    <div className="mt-3 space-y-3 pl-6 border-l-2 border-muted">
                      {commentReplies.map(reply => {
                        const replyUser = getUserForComment(reply.userId);
                        
                        return (
                          <div key={reply.id} className="pt-3">
                            <div className="flex items-start gap-3">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src={replyUser?.profilePictureUrl} alt={replyUser?.username} />
                                <AvatarFallback>{replyUser?.username.slice(0, 2).toUpperCase()}</AvatarFallback>
                              </Avatar>
                              
                              <div>
                                <div className="flex items-center gap-2">
                                  <span className="font-medium">{replyUser?.username}</span>
                                  <span className="text-xs text-muted-foreground">
                                    {formatTimestamp(reply.timestamp)}
                                  </span>
                                </div>
                                
                                <p className="mt-1">{reply.content}</p>
                                
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  className="text-xs text-muted-foreground h-6 px-2 flex items-center gap-1 mt-1"
                                >
                                  <ThumbsUpIcon className="h-3 w-3" />
                                  Like ({reply.likes})
                                </Button>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
} 