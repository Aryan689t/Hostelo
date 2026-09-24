import React, { useState } from 'react';
import {
  Users,
  Plus,
  Heart,
  MessageSquare,
  Share2,
  Tag,
  Send,
  Calendar,
} from 'lucide-react';
import { useHostelo } from '../context/HosteloContext';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { Avatar } from '../components/common/Avatar';
import { Card } from '../components/common/Card';

interface CommunityPageProps {
  onOpenCreatePostModal: () => void;
}

export const CommunityPage: React.FC<CommunityPageProps> = ({ onOpenCreatePostModal }) => {
  const { posts, likePost, addComment, searchQuery, showToast } = useHostelo();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [openCommentsPostId, setOpenCommentsPostId] = useState<string | null>(null);
  const [commentInputs, setCommentInputs] = useState<Record<string, string>>({});

  const categories: { id: string; label: string; count?: number }[] = [
    { id: 'all', label: 'All Posts' },
    { id: 'general', label: 'General' },
    { id: 'lost_found', label: 'Lost & Found' },
    { id: 'marketplace', label: 'Marketplace (Buy/Sell)' },
    { id: 'events', label: 'Events' },
    { id: 'study', label: 'Study Circles' },
    { id: 'sports', label: 'Sports & Games' },
    { id: 'other', label: 'Other' },
  ];

  const filteredPosts = posts.filter((p) => {
    const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
    const matchesSearch =
      searchQuery === '' ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.studentName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleSendComment = (postId: string) => {
    const text = commentInputs[postId] || '';
    if (!text.trim()) return;
    addComment(postId, text);
    setCommentInputs((prev) => ({ ...prev, [postId]: '' }));
  };

  const handleShare = (postTitle: string) => {
    showToast(`Post link copied: "${postTitle}"`, 'info');
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-4xl mx-auto pb-16">
      {/* Top Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">Hostel Community</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Connect, trade textbooks, report lost items, and organize events with your hostel mates.
          </p>
        </div>

        <Button
          variant="primary"
          icon={Plus}
          onClick={onOpenCreatePostModal}
          className="shadow-sm shadow-blue-500/20"
        >
          + Create Post
        </Button>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-150 cursor-pointer ${
              selectedCategory === cat.id
                ? 'bg-[#0F172A] text-white shadow-xs'
                : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300 hover:bg-slate-50'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Feed List */}
      <div className="space-y-4">
        {filteredPosts.length === 0 ? (
          <Card className="text-center py-12">
            <Users className="w-10 h-10 text-slate-300 mx-auto mb-3" />
            <h4 className="text-sm font-bold text-slate-800">No posts in this category</h4>
            <p className="text-xs text-slate-500 mt-1">Be the first student to publish a post!</p>
            <Button
              variant="outline"
              size="sm"
              className="mt-4 text-xs"
              onClick={onOpenCreatePostModal}
            >
              Create New Post
            </Button>
          </Card>
        ) : (
          filteredPosts.map((post) => {
            const isCommentsOpen = openCommentsPostId === post.id;
            return (
              <Card key={post.id} className="space-y-4">
                {/* Author row */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <Avatar name={post.studentName} src={post.studentAvatar} size="md" />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-slate-900">{post.studentName}</span>
                        <span className="text-xs font-mono text-slate-500 bg-slate-100 px-1.5 py-0.2 rounded">
                          {post.studentRoom}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 font-mono mt-0.5">{post.timestamp}</p>
                    </div>
                  </div>

                  <Badge
                    variant={
                      post.category === 'marketplace'
                        ? 'success'
                        : post.category === 'lost_found'
                        ? 'warning'
                        : post.category === 'events'
                        ? 'purple'
                        : 'primary'
                    }
                    size="sm"
                  >
                    {post.tag || post.category.toUpperCase().replace('_', ' ')}
                  </Badge>
                </div>

                {/* Content */}
                <div>
                  <h3 className="text-base font-bold text-slate-900 leading-snug">{post.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-700 mt-1.5 leading-relaxed whitespace-pre-line">
                    {post.content}
                  </p>

                  {/* Marketplace Price Tag */}
                  {post.price !== undefined && (
                    <div className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold">
                      <Tag className="w-3.5 h-3.5" />
                      <span>Price: ₹{post.price.toLocaleString('en-IN')}</span>
                      <span className="text-[10px] font-normal text-emerald-600">• DM Room {post.studentRoom} to buy</span>
                    </div>
                  )}

                  {/* Event Date Tag */}
                  {post.eventDate && (
                    <div className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-violet-50 border border-violet-200 text-violet-800 text-xs font-semibold">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Date: {post.eventDate}</span>
                    </div>
                  )}
                </div>

                {/* Interactive Action Bar */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-4">
                    {/* Like button */}
                    <button
                      onClick={() => likePost(post.id)}
                      className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer ${
                        post.hasLiked
                          ? 'text-rose-600 bg-rose-50 font-bold'
                          : 'text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      <Heart
                        className={`w-4 h-4 ${post.hasLiked ? 'fill-rose-500 text-rose-500' : ''}`}
                      />
                      <span>{post.likes}</span>
                    </button>

                    {/* Comment toggle button */}
                    <button
                      onClick={() => setOpenCommentsPostId(isCommentsOpen ? null : post.id)}
                      className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>{post.comments.length} Comments</span>
                    </button>
                  </div>

                  <button
                    onClick={() => handleShare(post.title)}
                    className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer"
                  >
                    <Share2 className="w-4 h-4" />
                    <span className="hidden sm:inline">Share</span>
                  </button>
                </div>

                {/* Expandable Comments Drawer */}
                {isCommentsOpen && (
                  <div className="pt-3 border-t border-slate-100 space-y-3 bg-slate-50/60 -mx-5 -mb-5 p-5 rounded-b-xl animate-fade-in">
                    {/* Existing comments */}
                    {post.comments.length > 0 ? (
                      <div className="space-y-2.5">
                        {post.comments.map((comment) => (
                          <div
                            key={comment.id}
                            className="bg-white p-3 rounded-xl border border-slate-200/70 text-xs space-y-1"
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <Avatar name={comment.studentName} src={comment.studentAvatar} size="sm" />
                                <span className="font-bold text-slate-900">{comment.studentName}</span>
                                <span className="text-[10px] font-mono text-slate-400">
                                  {comment.studentRoom}
                                </span>
                              </div>
                              <span className="text-[10px] text-slate-400 font-mono">
                                {comment.timestamp}
                              </span>
                            </div>
                            <p className="text-slate-700 pl-7">{comment.content}</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-xs text-slate-400 text-center py-2">
                        No comments yet. Start the conversation!
                      </p>
                    )}

                    {/* New Comment Input */}
                    <div className="flex items-center gap-2 pt-1">
                      <input
                        type="text"
                        placeholder="Write a comment as Aarav..."
                        value={commentInputs[post.id] || ''}
                        onChange={(e) =>
                          setCommentInputs((prev) => ({ ...prev, [post.id]: e.target.value }))
                        }
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') handleSendComment(post.id);
                        }}
                        className="flex-1 bg-white text-xs px-3.5 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
                      />
                      <Button
                        size="sm"
                        variant="secondary"
                        icon={Send}
                        onClick={() => handleSendComment(post.id)}
                      >
                        Send
                      </Button>
                    </div>
                  </div>
                )}
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
};
