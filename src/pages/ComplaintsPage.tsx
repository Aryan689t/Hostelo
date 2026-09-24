import React, { useState } from 'react';
import {
  Wrench,
  Plus,
  Wifi,
  Zap,
  Droplet,
  Sparkles,
} from 'lucide-react';
import { useHostelo } from '../context/HosteloContext';
import type { ComplaintCategory, ComplaintStatus } from '../types';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';

interface ComplaintsPageProps {
  onOpenComplaintModal: () => void;
}

export const ComplaintsPage: React.FC<ComplaintsPageProps> = ({ onOpenComplaintModal }) => {
  const { complaints } = useHostelo();
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const filteredComplaints = complaints.filter((c) => {
    const matchesCat = filterCategory === 'all' || c.category === filterCategory;
    const matchesStatus = filterStatus === 'all' || c.status === filterStatus;
    return matchesCat && matchesStatus;
  });

  const getCategoryIcon = (category: ComplaintCategory) => {
    switch (category) {
      case 'Internet/Wi-Fi':
        return <Wifi className="w-4 h-4 text-blue-600" />;
      case 'Electrical':
        return <Zap className="w-4 h-4 text-amber-500" />;
      case 'Plumbing':
        return <Droplet className="w-4 h-4 text-sky-600" />;
      case 'Cleaning':
        return <Sparkles className="w-4 h-4 text-emerald-500" />;
      default:
        return <Wrench className="w-4 h-4 text-slate-600" />;
    }
  };

  const getStatusBadge = (status: ComplaintStatus) => {
    switch (status) {
      case 'Submitted':
        return <Badge variant="neutral" size="sm">Submitted</Badge>;
      case 'Assigned':
        return <Badge variant="primary" size="sm">Assigned</Badge>;
      case 'In Progress':
        return <Badge variant="warning" size="sm">In Progress</Badge>;
      case 'Resolved':
        return <Badge variant="success" size="sm">Resolved ✓</Badge>;
    }
  };

  return (
    <div className="space-y-8 animate-fade-in max-w-5xl mx-auto pb-16">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="primary" size="sm">FACILITY MAINTENANCE HELPDESK</Badge>
            <span className="text-xs text-slate-400 font-mono">Avg Resolution: 3.4 hrs</span>
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight mt-1">
            Complaints & Maintenance
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Report electrical, plumbing, network, carpentry, or cleanliness issues with end-to-end status tracking.
          </p>
        </div>

        <Button
          variant="primary"
          icon={Plus}
          onClick={onOpenComplaintModal}
          className="shadow-sm shadow-blue-500/20"
        >
          + Log New Complaint
        </Button>
      </div>

      {/* Filter Row */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
          {['all', 'Internet/Wi-Fi', 'Electrical', 'Plumbing', 'Cleaning', 'Room'].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                filterCategory === cat
                  ? 'bg-[#0F172A] text-white shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {cat === 'all' ? 'All Categories' : cat}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-1.5 text-xs text-slate-500">
          <span>Status:</span>
          {['all', 'In Progress', 'Assigned', 'Resolved'].map((st) => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`px-2.5 py-1 rounded text-xs font-semibold cursor-pointer ${
                filterStatus === st ? 'bg-blue-50 text-blue-700 font-bold' : 'hover:text-slate-900'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Complaints List */}
      <div className="space-y-4">
        {filteredComplaints.length === 0 ? (
          <Card className="text-center py-12">
            <Wrench className="w-10 h-10 text-slate-300 mx-auto mb-2" />
            <h4 className="text-sm font-bold text-slate-800">No complaints matching filter</h4>
            <p className="text-xs text-slate-500 mt-1">Need maintenance or room assistance?</p>
            <Button variant="outline" size="sm" className="mt-4" onClick={onOpenComplaintModal}>
              Log Complaint Ticket
            </Button>
          </Card>
        ) : (
          filteredComplaints.map((cmp) => (
            <Card key={cmp.id} className="border-slate-200 space-y-4">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center shrink-0">
                    {getCategoryIcon(cmp.category)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-extrabold text-blue-600 bg-blue-50 px-1.5 py-0.2 rounded border border-blue-100">
                        {cmp.ticketId}
                      </span>
                      <span className="text-xs font-semibold text-slate-700">{cmp.category}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Badge variant={cmp.priority === 'Urgent' ? 'danger' : 'warning'} size="sm">
                    {cmp.priority} Priority
                  </Badge>
                  {getStatusBadge(cmp.status)}
                </div>
              </div>

              {/* Body */}
              <div>
                <h4 className="text-base font-bold text-slate-900">{cmp.title}</h4>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">{cmp.description}</p>
              </div>

              {/* Room & Submissions */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs bg-slate-50 p-3 rounded-xl border border-slate-200/80">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400">Location</span>
                  <p className="font-mono font-bold text-slate-800">{cmp.roomNumber}</p>
                </div>

                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400">Logged At</span>
                  <p className="text-slate-700 font-mono">{cmp.submittedAt}</p>
                </div>

                <div className="col-span-2 sm:col-span-1">
                  <span className="text-[10px] uppercase font-bold text-slate-400">Assigned To</span>
                  <p className="text-slate-800 font-semibold">{cmp.assignedTechnician || 'Dispatching...'}</p>
                </div>
              </div>

              {/* Step Resolution Progress Bar: Submitted → Assigned → In Progress → Resolved */}
              <div className="pt-2">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                  Resolution Flow
                </p>
                <div className="grid grid-cols-4 gap-2 text-center text-[10px] font-medium">
                  {['Submitted', 'Assigned', 'In Progress', 'Resolved'].map((step, idx) => {
                    const statusOrder = ['Submitted', 'Assigned', 'In Progress', 'Resolved'];
                    const currentIdx = statusOrder.indexOf(cmp.status);
                    const isDone = idx <= currentIdx;
                    const isCurrent = idx === currentIdx;

                    return (
                      <div key={step} className="space-y-1">
                        <div
                          className={`h-1.5 rounded-full transition-all ${
                            isDone ? 'bg-blue-600' : 'bg-slate-200'
                          }`}
                        />
                        <span className={isCurrent ? 'font-bold text-blue-700' : isDone ? 'text-slate-700' : 'text-slate-400'}>
                          {step}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};
