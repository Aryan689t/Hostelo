import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import type {
  ActiveTab,
  StudentProfile,
  CommunityPost,
  PollItem,
  DayMessMenu,
  MessRegulation,
  LeavePass,
  GatePass,
  PackageItem,
  ComplaintItem,
  PaymentBreakdown,
  TransactionItem,
  AnnouncementItem,
  NotificationItem,
  MessFeedback,
  PostCategory,
  LeaveType,
  ComplaintCategory,
  ComplaintPriority,
} from '../types';
import {
  initialProfile,
  initialPaymentBreakdown,
  initialTransactions,
  initialGatePasses,
  initialLeavePasses,
  initialComplaints,
  initialPackages,
  initialPolls,
  initialPosts,
  weeklyMessMenu,
  messRegulations,
  initialAnnouncements,
  initialNotifications,
  initialFeedbacks,
} from '../data/mockData';

interface HosteloContextType {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  
  // Profile
  profile: StudentProfile;
  updateProfile: (updated: Partial<StudentProfile>) => void;

  // Community
  posts: CommunityPost[];
  createPost: (data: { title: string; content: string; category: PostCategory; price?: number; eventDate?: string; tag?: string }) => void;
  likePost: (postId: string) => void;
  addComment: (postId: string, content: string) => void;

  // Polls & Voting
  polls: PollItem[];
  castVote: (pollId: string, optionId: string) => void;

  // Mess
  messMenu: DayMessMenu[];
  regulations: MessRegulation[];
  feedbacks: MessFeedback[];
  addMessFeedback: (mealType: 'Breakfast' | 'Lunch' | 'Snacks' | 'Dinner', rating: number, comment: string) => void;

  // Passes
  leavePasses: LeavePass[];
  createLeavePass: (data: { leaveType: LeaveType; fromDate: string; toDate: string; reason: string; destination: string; emergencyContact: string; expectedReturnTime: string }) => void;
  gatePasses: GatePass[];
  createGatePass: (data: { purpose: string; date: string; exitTime: string; expectedReturn: string; destination: string }) => GatePass;
  activeGatePass: GatePass | null;

  // Packages
  packages: PackageItem[];
  markPackageCollected: (pkgId: string) => void;

  // Complaints
  complaints: ComplaintItem[];
  createComplaint: (data: { title: string; category: ComplaintCategory; description: string; roomNumber: string; priority: ComplaintPriority }) => void;

  // Payments
  paymentBreakdown: PaymentBreakdown;
  transactions: TransactionItem[];
  processPayment: (amount: number, method: string) => boolean;

  // Announcements
  announcements: AnnouncementItem[];
  markAnnouncementAsRead: (id: string) => void;
  markAllAnnouncementsAsRead: () => void;

  // Notifications
  notifications: NotificationItem[];
  unreadNotifsCount: number;
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;
  isNotifPanelOpen: boolean;
  setIsNotifPanelOpen: (open: boolean | ((prev: boolean) => boolean)) => void;

  // Toasts
  toast: { message: string; type: 'success' | 'info' | 'error' } | null;
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;
  triggerConfetti: () => void;
}

const HosteloContext = createContext<HosteloContextType | undefined>(undefined);

export const HosteloProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation & UI state
  const [activeTab, setActiveTabState] = useState<ActiveTab>('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [isNotifPanelOpen, setIsNotifPanelOpen] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' | 'error' } | null>(null);

  // Load state with fallback to mock data
  const [profile, setProfile] = useState<StudentProfile>(() => {
    const saved = localStorage.getItem('hostelo_profile');
    return saved ? JSON.parse(saved) : initialProfile;
  });

  const [posts, setPosts] = useState<CommunityPost[]>(() => {
    const saved = localStorage.getItem('hostelo_posts');
    return saved ? JSON.parse(saved) : initialPosts;
  });

  const [polls, setPolls] = useState<PollItem[]>(() => {
    const saved = localStorage.getItem('hostelo_polls');
    return saved ? JSON.parse(saved) : initialPolls;
  });

  const [feedbacks, setFeedbacks] = useState<MessFeedback[]>(() => {
    const saved = localStorage.getItem('hostelo_feedbacks');
    return saved ? JSON.parse(saved) : initialFeedbacks;
  });

  const [leavePasses, setLeavePasses] = useState<LeavePass[]>(() => {
    const saved = localStorage.getItem('hostelo_leave_passes');
    return saved ? JSON.parse(saved) : initialLeavePasses;
  });

  const [gatePasses, setGatePasses] = useState<GatePass[]>(() => {
    const saved = localStorage.getItem('hostelo_gate_passes');
    return saved ? JSON.parse(saved) : initialGatePasses;
  });

  const [packages, setPackages] = useState<PackageItem[]>(() => {
    const saved = localStorage.getItem('hostelo_packages');
    return saved ? JSON.parse(saved) : initialPackages;
  });

  const [complaints, setComplaints] = useState<ComplaintItem[]>(() => {
    const saved = localStorage.getItem('hostelo_complaints');
    return saved ? JSON.parse(saved) : initialComplaints;
  });

  const [paymentBreakdown, setPaymentBreakdown] = useState<PaymentBreakdown>(() => {
    const saved = localStorage.getItem('hostelo_payment_breakdown');
    return saved ? JSON.parse(saved) : initialPaymentBreakdown;
  });

  const [transactions, setTransactions] = useState<TransactionItem[]>(() => {
    const saved = localStorage.getItem('hostelo_transactions');
    return saved ? JSON.parse(saved) : initialTransactions;
  });

  const [announcements, setAnnouncements] = useState<AnnouncementItem[]>(() => {
    const saved = localStorage.getItem('hostelo_announcements');
    return saved ? JSON.parse(saved) : initialAnnouncements;
  });

  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    const saved = localStorage.getItem('hostelo_notifications');
    return saved ? JSON.parse(saved) : initialNotifications;
  });

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('hostelo_profile', JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    localStorage.setItem('hostelo_posts', JSON.stringify(posts));
  }, [posts]);

  useEffect(() => {
    localStorage.setItem('hostelo_polls', JSON.stringify(polls));
  }, [polls]);

  useEffect(() => {
    localStorage.setItem('hostelo_feedbacks', JSON.stringify(feedbacks));
  }, [feedbacks]);

  useEffect(() => {
    localStorage.setItem('hostelo_leave_passes', JSON.stringify(leavePasses));
  }, [leavePasses]);

  useEffect(() => {
    localStorage.setItem('hostelo_gate_passes', JSON.stringify(gatePasses));
  }, [gatePasses]);

  useEffect(() => {
    localStorage.setItem('hostelo_packages', JSON.stringify(packages));
  }, [packages]);

  useEffect(() => {
    localStorage.setItem('hostelo_complaints', JSON.stringify(complaints));
  }, [complaints]);

  useEffect(() => {
    localStorage.setItem('hostelo_payment_breakdown', JSON.stringify(paymentBreakdown));
  }, [paymentBreakdown]);

  useEffect(() => {
    localStorage.setItem('hostelo_transactions', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem('hostelo_announcements', JSON.stringify(announcements));
  }, [announcements]);

  useEffect(() => {
    localStorage.setItem('hostelo_notifications', JSON.stringify(notifications));
  }, [notifications]);

  // Active tab setter helper
  const setActiveTab = (tab: ActiveTab) => {
    setActiveTabState(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Toast handler
  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3800);
  };

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#2563EB', '#3B82F6', '#10B981', '#6366F1'],
      });
    } catch {
      // ignore
    }
  };

  // Profile update
  const updateProfile = (updated: Partial<StudentProfile>) => {
    setProfile((prev) => ({ ...prev, ...updated }));
    showToast('Profile updated successfully!', 'success');
  };

  // Community handlers
  const createPost = (data: { title: string; content: string; category: PostCategory; price?: number; eventDate?: string; tag?: string }) => {
    const newPost: CommunityPost = {
      id: `post-${Date.now()}`,
      studentName: profile.name,
      studentRoom: profile.room,
      studentAvatar: profile.avatar,
      timestamp: 'Just now',
      category: data.category,
      title: data.title,
      content: data.content,
      likes: 0,
      hasLiked: false,
      comments: [],
      price: data.price,
      eventDate: data.eventDate,
      tag: data.tag || data.category.toUpperCase(),
    };

    setPosts((prev) => [newPost, ...prev]);
    showToast('Post published to hostel feed!', 'success');
    triggerConfetti();
  };

  const likePost = (postId: string) => {
    setPosts((prev) =>
      prev.map((post) => {
        if (post.id === postId) {
          const hasLiked = !post.hasLiked;
          return {
            ...post,
            hasLiked,
            likes: hasLiked ? post.likes + 1 : Math.max(0, post.likes - 1),
          };
        }
        return post;
      })
    );
  };

  const addComment = (postId: string, content: string) => {
    if (!content.trim()) return;
    const newComment = {
      id: `c-${Date.now()}`,
      studentName: profile.name,
      studentAvatar: profile.avatar,
      studentRoom: profile.room,
      timestamp: 'Just now',
      content: content.trim(),
    };

    setPosts((prev) =>
      prev.map((p) => (p.id === postId ? { ...p, comments: [...p.comments, newComment] } : p))
    );
    showToast('Comment added!', 'info');
  };

  // Polls & Voting
  const castVote = (pollId: string, optionId: string) => {
    setPolls((prev) =>
      prev.map((poll) => {
        if (poll.id === pollId) {
          if (poll.userVotedOptionId) {
            showToast('You have already voted on this poll', 'info');
            return poll;
          }
          const updatedOptions = poll.options.map((opt) =>
            opt.id === optionId ? { ...opt, votes: opt.votes + 1 } : opt
          );
          return {
            ...poll,
            options: updatedOptions,
            totalVotes: poll.totalVotes + 1,
            userVotedOptionId: optionId,
          };
        }
        return poll;
      })
    );
    showToast('Vote cast successfully!', 'success');
    triggerConfetti();
  };

  // Mess feedback
  const addMessFeedback = (mealType: 'Breakfast' | 'Lunch' | 'Snacks' | 'Dinner', rating: number, comment: string) => {
    const newFeedback: MessFeedback = {
      id: `fb-${Date.now()}`,
      studentName: profile.name,
      date: 'Today',
      mealType,
      rating,
      comment: comment || 'Rated ' + rating + '/5 stars',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setFeedbacks((prev) => [newFeedback, ...prev]);
    showToast('Thank you for rating today\'s meal!', 'success');
  };

  // Leave pass
  const createLeavePass = (data: {
    leaveType: LeaveType;
    fromDate: string;
    toDate: string;
    reason: string;
    destination: string;
    emergencyContact: string;
    expectedReturnTime: string;
  }) => {
    const newPass: LeavePass = {
      id: `LV-${Math.floor(1000 + Math.random() * 9000)}`,
      leaveType: data.leaveType,
      fromDate: data.fromDate,
      toDate: data.toDate,
      reason: data.reason,
      destination: data.destination,
      emergencyContact: data.emergencyContact,
      expectedReturnTime: data.expectedReturnTime,
      status: 'Pending',
      appliedAt: 'Today, ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      remarks: 'Application submitted to Warden Office for verification.',
    };

    setLeavePasses((prev) => [newPass, ...prev]);
    showToast(`Leave request #${newPass.id} submitted for review!`, 'success');
  };

  // Gate pass
  const createGatePass = (data: {
    purpose: string;
    date: string;
    exitTime: string;
    expectedReturn: string;
    destination: string;
  }): GatePass => {
    const passId = `GP-${Math.floor(2000 + Math.random() * 8000)}`;
    const newPass: GatePass = {
      id: `gp-${Date.now()}`,
      passId,
      studentName: profile.name,
      room: profile.room,
      hostel: profile.hostel,
      purpose: data.purpose,
      date: data.date || 'Today',
      exitTime: data.exitTime,
      expectedReturn: data.expectedReturn,
      destination: data.destination,
      status: 'APPROVED',
      generatedAt: 'Today, ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      validityRange: `${data.date || 'Today'}, ${data.exitTime} – ${data.expectedReturn}`,
    };

    setGatePasses((prev) => [newPass, ...prev]);
    showToast(`Digital Gate Pass ${newPass.passId} generated!`, 'success');
    triggerConfetti();
    return newPass;
  };

  const activeGatePass = gatePasses.find((gp) => gp.status === 'APPROVED') || null;

  // Packages
  const markPackageCollected = (pkgId: string) => {
    setPackages((prev) =>
      prev.map((pkg) => (pkg.id === pkgId ? { ...pkg, status: 'Collected' as const } : pkg))
    );
    showToast('Package marked as collected from reception!', 'success');
  };

  // Complaints
  const createComplaint = (data: {
    title: string;
    category: ComplaintCategory;
    description: string;
    roomNumber: string;
    priority: ComplaintPriority;
  }) => {
    const ticketId = `CMP-${Math.floor(1000 + Math.random() * 9000)}`;
    const nowTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newComplaint: ComplaintItem = {
      id: `cmp-${Date.now()}`,
      ticketId,
      title: data.title,
      category: data.category,
      description: data.description,
      roomNumber: data.roomNumber || profile.room,
      priority: data.priority,
      submittedAt: `Today, ${nowTime}`,
      status: 'Submitted',
      updates: [
        {
          timestamp: nowTime,
          note: 'Ticket registered into maintenance dispatch queue.',
          status: 'Submitted',
        },
      ],
    };

    setComplaints((prev) => [newComplaint, ...prev]);
    showToast(`Complaint ticket #${ticketId} created!`, 'success');
  };

  // Payments
  const processPayment = (amount: number, method: string): boolean => {
    const txnId = `TXN-${Math.floor(10000000 + Math.random() * 90000000)}`;
    const recId = `REC-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    
    const newTxn: TransactionItem = {
      id: `tx-${Date.now()}`,
      transactionId: txnId,
      date: 'Today, ' + new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      amount: amount,
      category: 'Hostel & Mess Outstanding Dues (Sem 4)',
      status: 'Success',
      paymentMethod: method,
      receiptNumber: recId,
      sem: 'Semester 4',
    };

    setTransactions((prev) => [newTxn, ...prev]);
    setPaymentBreakdown((prev) => ({
      ...prev,
      paidAmount: prev.paidAmount + amount,
      dueAmount: Math.max(0, prev.dueAmount - amount),
    }));

    showToast(`Payment of ₹${amount.toLocaleString('en-IN')} successful via ${method}!`, 'success');
    triggerConfetti();
    return true;
  };

  // Announcements
  const markAnnouncementAsRead = (id: string) => {
    setAnnouncements((prev) =>
      prev.map((ann) => (ann.id === id ? { ...ann, read: true } : ann))
    );
  };

  const markAllAnnouncementsAsRead = () => {
    setAnnouncements((prev) => prev.map((ann) => ({ ...ann, read: true })));
    showToast('All announcements marked as read', 'info');
  };

  // Notifications
  const markNotificationAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notif) => (notif.id === id ? { ...notif, read: true } : notif))
    );
  };

  const markAllNotificationsAsRead = () => {
    setNotifications((prev) => prev.map((notif) => ({ ...notif, read: true })));
    showToast('All notifications marked as read', 'info');
  };

  const unreadNotifsCount = notifications.filter((n) => !n.read).length;

  return (
    <HosteloContext.Provider
      value={{
        activeTab,
        setActiveTab,
        searchQuery,
        setSearchQuery,
        profile,
        updateProfile,
        posts,
        createPost,
        likePost,
        addComment,
        polls,
        castVote,
        messMenu: weeklyMessMenu,
        regulations: messRegulations,
        feedbacks,
        addMessFeedback,
        leavePasses,
        createLeavePass,
        gatePasses,
        createGatePass,
        activeGatePass,
        packages,
        markPackageCollected,
        complaints,
        createComplaint,
        paymentBreakdown,
        transactions,
        processPayment,
        announcements,
        markAnnouncementAsRead,
        markAllAnnouncementsAsRead,
        notifications,
        unreadNotifsCount,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        isNotifPanelOpen,
        setIsNotifPanelOpen,
        toast,
        showToast,
        triggerConfetti,
      }}
    >
      {children}
    </HosteloContext.Provider>
  );
};

export const useHostelo = () => {
  const context = useContext(HosteloContext);
  if (!context) {
    throw new Error('useHostelo must be used within a HosteloProvider');
  }
  return context;
};
