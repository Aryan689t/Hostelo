import React, { useState } from 'react';
import {
  CheckCircle2,
  AlertTriangle,
  Check,
} from 'lucide-react';
import { useHostelo } from '../context/HosteloContext';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';

export const AnnouncementsPage: React.FC = () => {
  const { announcements, markAnnouncementAsRead, markAllAnnouncementsAsRead, searchQuery } = useHostelo();
  const [selectedCat, setSelectedCat] = useState<string>('all');

  const filtered = announcements.filter((ann) => {
    const matchesCat = selectedCat === 'all' || ann.category.toLowerCase() === selectedCat.toLowerCase();
    const matchesSearch =
      searchQuery === '' ||
      ann.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ann.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const unreadCount = announcements.filter((a) => !a.read).length;

  return (
    <div className="space-y-8 animate-fade-in max-w-5xl mx-auto pb-16">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="primary" size="sm">OFFICIAL WARDEN NOTICE BOARD</Badge>
            {unreadCount > 0 && (
              <span className="text-xs text-blue-600 font-semibold">{unreadCount} unread notices</span>
            )}
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight mt-1">
            Hostel Announcements & Advisories
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Important circulars regarding maintenance schedules, inspections, mess notices, and campus rules.
          </p>
        </div>

        {unreadCount > 0 && (
          <Button
            variant="outline"
            size="sm"
            icon={Check}
            onClick={markAllAnnouncementsAsRead}
          >
            Mark All as Read
          </Button>
        )}
      </div>

      {/* Category Filter */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
        {['all', 'Maintenance', 'Inspection', 'Mess', 'Academic'].map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCat(cat)}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              selectedCat === cat
                ? 'bg-[#0F172A] text-white shadow-xs'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {cat === 'all' ? 'All Circulars' : cat}
          </button>
        ))}
      </div>

      {/* Announcements List */}
      <div className="space-y-4">
        {filtered.map((ann) => (
          <Card
            key={ann.id}
            className={`space-y-3 transition-all ${
              !ann.read ? 'border-blue-200 bg-blue-50/20' : 'border-slate-200'
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-2">
                <Badge variant={ann.isUrgent ? 'danger' : 'primary'} size="sm">
                  {ann.category}
                </Badge>
                {ann.isUrgent && (
                  <span className="text-[11px] font-bold text-rose-600 uppercase flex items-center gap-1">
                    <AlertTriangle className="w-3.5 h-3.5" /> High Priority
                  </span>
                )}
              </div>

              <div className="flex items-center gap-3 text-xs text-slate-400 font-mono">
                <span>{ann.date}</span>
                {!ann.read ? (
                  <button
                    onClick={() => markAnnouncementAsRead(ann.id)}
                    className="text-[11px] font-bold text-blue-600 hover:text-blue-800 cursor-pointer"
                  >
                    Mark as Read
                  </button>
                ) : (
                  <span className="text-slate-400 text-[11px] flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-slate-400" /> Read
                  </span>
                )}
              </div>
            </div>

            <div>
              <h3 className="text-base font-bold text-slate-900 leading-snug">{ann.title}</h3>
              <p className="text-xs sm:text-sm text-slate-700 mt-2 leading-relaxed whitespace-pre-line">
                {ann.content}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <div>
                Issued by: <strong className="text-slate-800">{ann.author}</strong> ({ann.authorRole})
              </div>
              <span className="text-[10px] text-slate-400">Authenticated via Hostelo Warden Console</span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
