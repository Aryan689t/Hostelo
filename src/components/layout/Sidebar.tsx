import React from 'react';
import {
  LayoutDashboard,
  Users,
  Vote,
  Utensils,
  CalendarDays,
  Ticket,
  Package,
  Wrench,
  CreditCard,
  Bell,
  LogOut,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { useHostelo } from '../../context/HosteloContext';
import type { ActiveTab } from '../../types';
import { Avatar } from '../common/Avatar';
import { Badge } from '../common/Badge';

export const Sidebar: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    profile,
    complaints,
    packages,
  } = useHostelo();

  const pendingPackagesCount = packages.filter((p) => p.status === 'Ready for Pickup').length;
  const activeComplaintsCount = complaints.filter((c) => c.status !== 'Resolved').length;

  const navItems: {
    id: ActiveTab;
    label: string;
    icon: React.ElementType;
    badge?: number | string;
    badgeVariant?: 'primary' | 'warning' | 'danger' | 'success';
  }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'community', label: 'Community', icon: Users },
    { id: 'voting', label: 'Voting', icon: Vote, badge: 'Live', badgeVariant: 'primary' },
    { id: 'mess', label: 'Mess Menu', icon: Utensils },
    { id: 'leave', label: 'Leave Pass', icon: CalendarDays },
    { id: 'gatepass', label: 'Gate Pass', icon: Ticket },
    {
      id: 'packages',
      label: 'Packages',
      icon: Package,
      badge: pendingPackagesCount > 0 ? pendingPackagesCount : undefined,
      badgeVariant: 'warning',
    },
    {
      id: 'complaints',
      label: 'Complaints',
      icon: Wrench,
      badge: activeComplaintsCount > 0 ? activeComplaintsCount : undefined,
      badgeVariant: 'danger',
    },
    { id: 'payments', label: 'Payments', icon: CreditCard, badge: '₹1.2k', badgeVariant: 'warning' },
    { id: 'announcements', label: 'Announcements', icon: Bell },
  ];

  return (
    <aside className="w-64 h-screen sticky top-0 bg-white border-r border-slate-200 flex flex-col justify-between select-none z-30 shrink-0 hidden md:flex">
      {/* Brand Header */}
      <div>
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <button
            onClick={() => setActiveTab('landing')}
            className="flex items-center gap-2.5 group cursor-pointer text-left"
          >
            <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold text-lg shadow-sm shadow-blue-500/20 group-hover:bg-blue-700 transition-colors">
              H
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-slate-900 tracking-tight text-lg">HOSTELO</span>
                <span className="text-[10px] font-semibold bg-blue-50 text-blue-700 px-1.5 py-0.2 rounded border border-blue-100">
                  v2.4
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium -mt-0.5">Hostel Operating System</p>
            </div>
          </button>
        </div>

        {/* Navigation List */}
        <nav className="p-3 space-y-1 max-h-[calc(100vh-210px)] overflow-y-auto no-scrollbar">
          <p className="px-3 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            Workspace
          </p>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150 cursor-pointer ${
                  isActive
                    ? 'bg-blue-50/80 text-blue-700 font-semibold shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon
                    className={`w-4 h-4 transition-colors ${
                      isActive ? 'text-blue-600' : 'text-slate-400 group-hover:text-slate-600'
                    }`}
                  />
                  <span>{item.label}</span>
                </div>
                {item.badge !== undefined && (
                  <Badge
                    size="sm"
                    variant={item.badgeVariant || (isActive ? 'primary' : 'default')}
                  >
                    {item.badge}
                  </Badge>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer / Profile Section */}
      <div className="p-3 border-t border-slate-100 bg-slate-50/50">
        <button
          onClick={() => setActiveTab('profile')}
          className={`w-full flex items-center justify-between p-2 rounded-xl transition-all duration-150 cursor-pointer ${
            activeTab === 'profile'
              ? 'bg-white shadow-xs border border-slate-200'
              : 'hover:bg-white hover:border hover:border-slate-200/80'
          }`}
        >
          <div className="flex items-center gap-2.5 truncate">
            <Avatar name={profile.name} src={profile.avatar} size="md" />
            <div className="text-left truncate">
              <p className="text-xs font-semibold text-slate-900 truncate leading-tight">
                {profile.name}
              </p>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="text-[11px] font-mono text-slate-500 font-medium">
                  {profile.room}
                </span>
                <span className="text-[10px] text-slate-300">•</span>
                <span className="text-[11px] text-slate-500 truncate">
                  {profile.block.split(' ')[0]} {profile.block.split(' ')[1]}
                </span>
              </div>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />
        </button>

        <div className="mt-2 pt-2 border-t border-slate-200/60 flex items-center justify-between px-2 text-[11px] text-slate-500">
          <button
            onClick={() => setActiveTab('landing')}
            className="flex items-center gap-1 hover:text-slate-900 transition-colors cursor-pointer"
          >
            <Sparkles className="w-3 h-3 text-blue-500" />
            <span>Landing</span>
          </button>
          <button
            onClick={() => setActiveTab('landing')}
            className="flex items-center gap-1 hover:text-rose-600 transition-colors cursor-pointer"
          >
            <LogOut className="w-3 h-3" />
            <span>Exit</span>
          </button>
        </div>
      </div>
    </aside>
  );
};
