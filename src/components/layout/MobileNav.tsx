import React, { useState } from 'react';
import {
  LayoutDashboard,
  Users,
  Vote,
  Utensils,
  Menu,
  X,
  CalendarDays,
  Ticket,
  Package,
  Wrench,
  CreditCard,
  Bell,
  User,
  Sparkles,
} from 'lucide-react';
import { useHostelo } from '../../context/HosteloContext';
import type { ActiveTab } from '../../types';
import { Avatar } from '../common/Avatar';
import { Badge } from '../common/Badge';

export const MobileNav: React.FC = () => {
  const { activeTab, setActiveTab, profile, unreadNotifsCount } = useHostelo();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const mainBottomTabs: { id: ActiveTab; label: string; icon: React.ElementType }[] = [
    { id: 'dashboard', label: 'Home', icon: LayoutDashboard },
    { id: 'community', label: 'Community', icon: Users },
    { id: 'voting', label: 'Voting', icon: Vote },
    { id: 'mess', label: 'Mess', icon: Utensils },
  ];

  const allLinks: { id: ActiveTab; label: string; icon: React.ElementType; badge?: string }[] = [
    { id: 'dashboard', label: 'Student Dashboard', icon: LayoutDashboard },
    { id: 'community', label: 'Community Feed', icon: Users },
    { id: 'voting', label: 'Democratic Voting', icon: Vote, badge: 'Active' },
    { id: 'mess', label: 'Mess Timetable & Rating', icon: Utensils },
    { id: 'leave', label: 'Leave Pass (Outstation)', icon: CalendarDays },
    { id: 'gatepass', label: 'Digital Gate Pass', icon: Ticket },
    { id: 'packages', label: 'Package Delivery Hub', icon: Package },
    { id: 'complaints', label: 'Complaints & Maintenance', icon: Wrench },
    { id: 'payments', label: 'Payments & Fee Dues', icon: CreditCard, badge: '₹1,250' },
    { id: 'announcements', label: 'Announcements', icon: Bell },
    { id: 'profile', label: 'My Student Profile', icon: User },
  ];

  return (
    <>
      {/* Bottom Sticky Mobile Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-2 py-1.5 flex items-center justify-around">
        {mainBottomTabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center py-1 px-3 rounded-lg transition-colors cursor-pointer ${
                isActive ? 'text-blue-600 font-semibold' : 'text-slate-500'
              }`}
            >
              <Icon className="w-5 h-5 mb-0.5" />
              <span className="text-[10px]">{tab.label}</span>
            </button>
          );
        })}

        {/* More Menu Drawer Trigger */}
        <button
          onClick={() => setDrawerOpen(true)}
          className={`flex flex-col items-center py-1 px-3 rounded-lg transition-colors cursor-pointer relative ${
            drawerOpen || !mainBottomTabs.some((t) => t.id === activeTab)
              ? 'text-blue-600 font-semibold'
              : 'text-slate-500'
          }`}
        >
          <Menu className="w-5 h-5 mb-0.5" />
          <span className="text-[10px]">More</span>
          {unreadNotifsCount > 0 && (
            <span className="absolute top-1 right-2 w-2 h-2 bg-blue-600 rounded-full" />
          )}
        </button>
      </nav>

      {/* Slide-out Mobile Drawer */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          <div
            className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs"
            onClick={() => setDrawerOpen(false)}
          />

          <div className="relative ml-auto w-4/5 max-w-xs bg-white h-full shadow-2xl flex flex-col justify-between p-5 animate-fade-in z-10">
            <div>
              {/* Drawer Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-sm">
                    H
                  </div>
                  <span className="font-extrabold text-slate-900 tracking-tight">HOSTELO</span>
                </div>
                <button
                  onClick={() => setDrawerOpen(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-800"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Student Summary */}
              <div className="py-3 border-b border-slate-100 flex items-center gap-3">
                <Avatar name={profile.name} src={profile.avatar} size="md" />
                <div>
                  <p className="text-xs font-bold text-slate-900">{profile.name}</p>
                  <p className="text-[11px] font-mono text-slate-500">{profile.room} • {profile.block}</p>
                </div>
              </div>

              {/* Navigation links */}
              <div className="py-3 space-y-1 max-h-[50vh] overflow-y-auto">
                {allLinks.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveTab(item.id);
                        setDrawerOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium cursor-pointer transition-colors ${
                        isActive
                          ? 'bg-blue-50 text-blue-700 font-semibold'
                          : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon className="w-4 h-4" />
                        <span>{item.label}</span>
                      </div>
                      {item.badge && (
                        <Badge size="sm" variant="primary">
                          {item.badge}
                        </Badge>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Drawer Footer */}
            <div className="pt-3 border-t border-slate-100 space-y-2">
              <button
                onClick={() => {
                  setActiveTab('landing');
                  setDrawerOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 py-2 rounded-lg bg-slate-100 text-slate-700 text-xs font-semibold hover:bg-slate-200"
              >
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                <span>Go to Landing Page</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
