import React, { useState, useRef, useEffect } from 'react';
import {
  Bell,
  Search,
  Plus,
  Ticket,
  Wrench,
  CreditCard,
  MessageSquare,
  ChevronDown,
  ArrowRight,
} from 'lucide-react';
import { useHostelo } from '../../context/HosteloContext';
import { Avatar } from '../common/Avatar';
import { Badge } from '../common/Badge';

interface NavbarProps {
  onOpenGatePassModal: () => void;
  onOpenComplaintModal: () => void;
  onOpenLeaveModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenGatePassModal,
  onOpenComplaintModal,
  onOpenLeaveModal,
}) => {
  const {
    activeTab,
    setActiveTab,
    searchQuery,
    setSearchQuery,
    profile,
    unreadNotifsCount,
    isNotifPanelOpen,
    setIsNotifPanelOpen,
    notifications,
    markNotificationAsRead,
    markAllNotificationsAsRead,
  } = useHostelo();

  const [isActionsOpen, setIsActionsOpen] = useState(false);
  const actionsRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);

  // Close popups on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (actionsRef.current && !actionsRef.current.contains(e.target as Node)) {
        setIsActionsOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setIsNotifPanelOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [setIsNotifPanelOpen]);

  const titles: Record<string, { title: string; subtitle: string }> = {
    dashboard: { title: 'Overview', subtitle: `Welcome back, ${profile.name}` },
    community: { title: 'Student Community', subtitle: 'Connect, trade, discuss & share with hostel mates' },
    voting: { title: 'Democratic Voting', subtitle: 'Hostel polls, mess choices & council elections' },
    mess: { title: 'Mess Timetable & Rating', subtitle: '7-day nutritious menu, live feedback & regulations' },
    leave: { title: 'Leave Pass Management', subtitle: 'Submit multi-day outstation & home visit permissions' },
    gatepass: { title: 'Digital Gate Pass', subtitle: 'Instant temporary outing passes with secure verification' },
    packages: { title: 'Delivery & Reception', subtitle: 'Track incoming courier parcels ready at the front desk' },
    complaints: { title: 'Complaints & Maintenance', subtitle: 'Electrical, Wi-Fi, plumbing & civil repair tickets' },
    payments: { title: 'Payments & Hostel Fees', subtitle: 'Transparent ledger, balance dues & instant online receipts' },
    announcements: { title: 'Official Notices', subtitle: 'Warden advisories, inspection schedules & alerts' },
    profile: { title: 'Student Profile & Settings', subtitle: 'Hostel registration, emergency contacts & preferences' },
  };

  const currentHeader = titles[activeTab] || { title: 'Hostelo', subtitle: 'Hostel System' };

  return (
    <header className="sticky top-0 z-20 bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 sm:px-8 py-3.5 flex items-center justify-between gap-4">
      {/* Title / Breadcrumb */}
      <div className="flex items-center gap-3">
        <div className="hidden sm:block">
          <h1 className="text-lg font-bold text-slate-900 tracking-tight leading-tight">
            {currentHeader.title}
          </h1>
          <p className="text-xs text-slate-500 hidden md:block">{currentHeader.subtitle}</p>
        </div>
        <div className="sm:hidden font-extrabold text-blue-600 text-lg flex items-center gap-2">
          <span>HOSTELO</span>
          <span className="text-xs font-normal text-slate-400">/</span>
          <span className="text-xs font-semibold text-slate-800">{currentHeader.title}</span>
        </div>
      </div>

      {/* Global Search & Actions */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Search Bar */}
        <div className="relative hidden lg:block w-64 xl:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search passes, notices, posts... ( / )"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-50 hover:bg-slate-100/80 focus:bg-white text-xs pl-9 pr-8 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] text-slate-400 hover:text-slate-600 font-mono"
            >
              ESC
            </button>
          )}
        </div>

        {/* Quick Action Dropdown */}
        <div className="relative" ref={actionsRef}>
          <button
            onClick={() => setIsActionsOpen(!isActionsOpen)}
            className="flex items-center gap-1.5 bg-[#0F172A] hover:bg-[#1E293B] text-white text-xs font-semibold px-3 py-2 rounded-lg transition-all shadow-xs cursor-pointer active:scale-95"
          >
            <Plus className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">New Action</span>
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </button>

          {isActionsOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl border border-slate-200 shadow-xl py-1.5 z-40 animate-fade-in">
              <div className="px-3 py-1.5 border-b border-slate-100 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Quick Dispatch
              </div>
              <button
                onClick={() => {
                  setIsActionsOpen(false);
                  onOpenGatePassModal();
                }}
                className="w-full text-left px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 flex items-center gap-2.5 cursor-pointer"
              >
                <div className="w-6 h-6 rounded-md bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Ticket className="w-3.5 h-3.5" />
                </div>
                <div>
                  <p className="text-slate-900 font-semibold">Generate Gate Pass</p>
                  <p className="text-[10px] text-slate-400">Quick evening outing pass</p>
                </div>
              </button>

              <button
                onClick={() => {
                  setIsActionsOpen(false);
                  onOpenComplaintModal();
                }}
                className="w-full text-left px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 flex items-center gap-2.5 cursor-pointer"
              >
                <div className="w-6 h-6 rounded-md bg-amber-50 text-amber-600 flex items-center justify-center">
                  <Wrench className="w-3.5 h-3.5" />
                </div>
                <div>
                  <p className="text-slate-900 font-semibold">Report Maintenance Issue</p>
                  <p className="text-[10px] text-slate-400">Wi-Fi, electric, plumbing</p>
                </div>
              </button>

              <button
                onClick={() => {
                  setIsActionsOpen(false);
                  onOpenLeaveModal();
                }}
                className="w-full text-left px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 flex items-center gap-2.5 cursor-pointer"
              >
                <div className="w-6 h-6 rounded-md bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <MessageSquare className="w-3.5 h-3.5" />
                </div>
                <div>
                  <p className="text-slate-900 font-semibold">Apply for Leave</p>
                  <p className="text-[10px] text-slate-400">Weekend or home trip</p>
                </div>
              </button>

              <div className="border-t border-slate-100 my-1"></div>
              <button
                onClick={() => {
                  setIsActionsOpen(false);
                  setActiveTab('payments');
                }}
                className="w-full text-left px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 flex items-center gap-2.5 cursor-pointer"
              >
                <div className="w-6 h-6 rounded-md bg-indigo-50 text-indigo-600 flex items-center justify-center">
                  <CreditCard className="w-3.5 h-3.5" />
                </div>
                <div>
                  <p className="text-slate-900 font-semibold">Pay Hostel Dues</p>
                  <p className="text-[10px] text-slate-400">₹1,250 pending</p>
                </div>
              </button>
            </div>
          )}
        </div>

        {/* Notifications Tray */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setIsNotifPanelOpen((prev: boolean) => !prev)}
            className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 relative transition-colors cursor-pointer"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadNotifsCount > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 bg-blue-600 rounded-full ring-2 ring-white" />
            )}
          </button>

          {/* Notification Flyout */}
          {isNotifPanelOpen && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl border border-slate-200 shadow-2xl z-40 overflow-hidden animate-fade-in">
              <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                    Notifications
                  </span>
                  {unreadNotifsCount > 0 && (
                    <Badge variant="primary" size="sm">
                      {unreadNotifsCount} new
                    </Badge>
                  )}
                </div>
                {unreadNotifsCount > 0 && (
                  <button
                    onClick={markAllNotificationsAsRead}
                    className="text-[11px] font-semibold text-blue-600 hover:text-blue-800 transition-colors cursor-pointer"
                  >
                    Mark all read
                  </button>
                )}
              </div>

              <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
                {notifications.length === 0 ? (
                  <div className="p-6 text-center text-xs text-slate-400">
                    No new notifications
                  </div>
                ) : (
                  notifications.map((notif) => (
                    <div
                      key={notif.id}
                      onClick={() => {
                        markNotificationAsRead(notif.id);
                        if (notif.targetTab) {
                          setActiveTab(notif.targetTab);
                          setIsNotifPanelOpen(false);
                        }
                      }}
                      className={`p-3.5 hover:bg-slate-50 transition-colors cursor-pointer flex gap-3 ${
                        !notif.read ? 'bg-blue-50/30' : ''
                      }`}
                    >
                      <div
                        className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${
                          !notif.read ? 'bg-blue-600' : 'bg-slate-300'
                        }`}
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <p className="text-xs font-semibold text-slate-900">{notif.title}</p>
                          <span className="text-[10px] text-slate-400 font-mono">{notif.timestamp}</span>
                        </div>
                        <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">{notif.message}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className="p-2 border-t border-slate-100 bg-slate-50/50 text-center">
                <button
                  onClick={() => {
                    setIsNotifPanelOpen(false);
                    setActiveTab('announcements');
                  }}
                  className="text-xs font-semibold text-slate-600 hover:text-blue-600 transition-colors inline-flex items-center gap-1 cursor-pointer"
                >
                  <span>View All Hostel Notices</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Profile Avatar Click */}
        <button
          onClick={() => setActiveTab('profile')}
          className="flex items-center gap-2 p-1 pl-1.5 pr-2 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer border border-transparent hover:border-slate-200"
        >
          <Avatar name={profile.name} src={profile.avatar} size="sm" />
          <div className="hidden xl:block text-left">
            <p className="text-xs font-semibold text-slate-900 leading-tight">{profile.name}</p>
            <p className="text-[10px] text-slate-400 font-mono">{profile.room}</p>
          </div>
        </button>
      </div>
    </header>
  );
};
