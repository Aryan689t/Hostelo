import React, { useState } from 'react';
import {
  CalendarDays,
  Plus,
  MapPin,
  Phone,
} from 'lucide-react';
import { useHostelo } from '../context/HosteloContext';
import type { LeaveStatus } from '../types';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';

interface LeavePassPageProps {
  onOpenLeaveModal: () => void;
}

export const LeavePassPage: React.FC<LeavePassPageProps> = ({ onOpenLeaveModal }) => {
  const { leavePasses } = useHostelo();
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const filteredPasses = leavePasses.filter(
    (p) => filterStatus === 'all' || p.status.toLowerCase() === filterStatus.toLowerCase()
  );

  const getStatusBadge = (status: LeaveStatus) => {
    switch (status) {
      case 'Approved':
        return <Badge variant="success" size="md">Approved ✓</Badge>;
      case 'Pending':
        return <Badge variant="warning" size="md">Pending Review</Badge>;
      case 'Rejected':
        return <Badge variant="danger" size="md">Rejected</Badge>;
      case 'Completed':
        return <Badge variant="neutral" size="md">Completed</Badge>;
    }
  };

  return (
    <div className="space-y-8 animate-fade-in max-w-5xl mx-auto pb-16">
      {/* Top Banner */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="primary" size="sm">OUTSTATION PERMISSIONS</Badge>
            <span className="text-xs text-slate-400 font-mono">Parental Consent Integrated</span>
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight mt-1">
            Leave Pass Management
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Apply for home visits, weekend leaves, and emergencies with real-time status tracker.
          </p>
        </div>

        <Button
          variant="primary"
          icon={Plus}
          onClick={onOpenLeaveModal}
          className="shadow-sm shadow-blue-500/20"
        >
          + Apply for Leave
        </Button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2">
        {['all', 'Approved', 'Pending', 'Completed', 'Rejected'].map((status) => (
          <button
            key={status}
            onClick={() => setFilterStatus(status)}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all cursor-pointer ${
              filterStatus === status
                ? 'bg-[#0F172A] text-white shadow-xs'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Passes List */}
      <div className="space-y-4">
        {filteredPasses.length === 0 ? (
          <Card className="text-center py-12">
            <CalendarDays className="w-10 h-10 text-slate-300 mx-auto mb-3" />
            <h4 className="text-sm font-bold text-slate-800">No leave passes found</h4>
            <p className="text-xs text-slate-500 mt-1">You can apply for outstation leave anytime.</p>
            <Button variant="outline" size="sm" className="mt-4 text-xs" onClick={onOpenLeaveModal}>
              Apply for Leave
            </Button>
          </Card>
        ) : (
          filteredPasses.map((pass) => (
            <Card key={pass.id} className="border-slate-200 space-y-4">
              {/* Card Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-extrabold text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                    Leave Request #{pass.id}
                  </span>
                  <Badge variant="purple" size="sm">{pass.leaveType}</Badge>
                </div>
                <div>{getStatusBadge(pass.status)}</div>
              </div>

              {/* Details */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Leave Duration</p>
                  <p className="text-sm font-bold text-slate-900 font-mono mt-0.5">
                    {pass.fromDate} → {pass.toDate}
                  </p>
                  <p className="text-[11px] text-slate-500 mt-0.5">Return by: {pass.expectedReturnTime}</p>
                </div>

                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Destination</p>
                  <p className="text-xs font-semibold text-slate-900 mt-0.5 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{pass.destination}</span>
                  </p>
                  <p className="text-[11px] text-slate-500 mt-0.5 flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{pass.emergencyContact}</span>
                  </p>
                </div>

                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Approval Authority</p>
                  <p className="text-xs font-semibold text-slate-800 mt-0.5">
                    {pass.approvedBy || 'Warden Office Verification'}
                  </p>
                  <p className="text-[11px] text-slate-400 font-mono mt-0.5">Applied: {pass.appliedAt}</p>
                </div>
              </div>

              {/* Reason & Remarks */}
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-xs text-slate-700">
                <span className="font-semibold text-slate-900">Reason:</span> {pass.reason}
                {pass.remarks && (
                  <p className="text-[11px] text-emerald-700 font-medium mt-1">
                    ✓ Warden Note: {pass.remarks}
                  </p>
                )}
              </div>

              {/* Visual Timeline Tracker */}
              <div className="pt-2">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                  Application Lifecycle Tracker
                </p>
                <div className="grid grid-cols-4 gap-2 text-center text-[10px] font-semibold">
                  {[
                    { label: '1. Applied', done: true },
                    { label: '2. Parent SMS', done: true },
                    { label: '3. Warden Signed', done: pass.status === 'Approved' || pass.status === 'Completed' },
                    { label: '4. Security Closed', done: pass.status === 'Completed' },
                  ].map((step, idx) => (
                    <div key={idx} className="space-y-1">
                      <div
                        className={`h-1.5 rounded-full ${
                          step.done ? 'bg-blue-600' : 'bg-slate-200'
                        }`}
                      />
                      <span className={step.done ? 'text-blue-700' : 'text-slate-400'}>
                        {step.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};
