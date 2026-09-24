import React from 'react';
import {
  Ticket,
  Plus,
  ShieldCheck,
  Download,
} from 'lucide-react';
import { useHostelo } from '../context/HosteloContext';
import type { GatePass } from '../types';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';

interface GatePassPageProps {
  onOpenGatePassModal: () => void;
  onOpenTicketModal: (pass: GatePass) => void;
}

export const GatePassPage: React.FC<GatePassPageProps> = ({
  onOpenGatePassModal,
  onOpenTicketModal,
}) => {
  const { gatePasses, profile, showToast } = useHostelo();

  const activePass = gatePasses.find((p) => p.status === 'APPROVED');
  const pastPasses = gatePasses.filter((p) => p.status !== 'APPROVED');

  const handleDownloadTicket = (pass: GatePass) => {
    showToast(`Gate Pass ticket #${pass.passId} saved!`, 'success');
  };

  return (
    <div className="space-y-8 animate-fade-in max-w-5xl mx-auto pb-16">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="primary" size="sm">HOSTEL SECURITY GATE PASS</Badge>
            <span className="text-xs text-slate-400 font-mono">Instant QR Scanner Verified</span>
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight mt-1">
            Digital Outing Gate Pass
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Generate immediate temporary gate passes for city outings, essentials shopping, and library visits.
          </p>
        </div>

        <Button
          variant="primary"
          icon={Plus}
          onClick={onOpenGatePassModal}
          className="shadow-sm shadow-blue-500/20"
        >
          + Request New Pass
        </Button>
      </div>

      {/* Featured Active Digital Ticket Card */}
      {activePass ? (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Active Security Pass</span>
            </h3>
            <span className="text-xs text-emerald-600 font-semibold">Valid for Today's Outing</span>
          </div>

          <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-xl border border-slate-800 relative overflow-hidden">
            {/* Background Accent Glow */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-800">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-blue-400 font-bold">
                  CAMPUS ENTRY AUTHORIZATION
                </span>
                <h3 className="text-2xl sm:text-3xl font-black tracking-tight mt-1 text-white">
                  HOSTELO GATE PASS
                </h3>
                <p className="text-xs text-slate-400 mt-1 font-mono">
                  Token Hash: #GP-SEC-{activePass.passId}-2026
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-3.5 py-1.5 rounded-lg text-xs font-bold font-mono">
                  APPROVED ✓
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-white/10 text-white border-white/20 hover:bg-white/20 text-xs"
                  onClick={() => onOpenTicketModal(activePass)}
                >
                  Expand Full Ticket
                </Button>
              </div>
            </div>

            {/* Ticket Information Columns */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-6 text-xs">
              <div>
                <p className="text-slate-400 uppercase font-semibold text-[10px] tracking-wider">Student</p>
                <p className="text-sm font-bold text-white mt-0.5">{activePass.studentName}</p>
                <p className="text-[11px] text-slate-400">{profile.studentId}</p>
              </div>

              <div>
                <p className="text-slate-400 uppercase font-semibold text-[10px] tracking-wider">Room / Hostel</p>
                <p className="text-sm font-bold text-white mt-0.5 font-mono">{activePass.room}</p>
                <p className="text-[11px] text-slate-400">{activePass.hostel}</p>
              </div>

              <div>
                <p className="text-slate-400 uppercase font-semibold text-[10px] tracking-wider">Valid Outing Hours</p>
                <p className="text-sm font-bold text-emerald-300 mt-0.5 font-mono">
                  {activePass.validityRange}
                </p>
                <p className="text-[10px] text-slate-400">Curfew limit: 10:00 PM</p>
              </div>

              <div>
                <p className="text-slate-400 uppercase font-semibold text-[10px] tracking-wider">Pass ID</p>
                <p className="text-sm font-bold text-blue-400 mt-0.5 font-mono">{activePass.passId}</p>
                <p className="text-[10px] text-slate-400">Generated: {activePass.generatedAt}</p>
              </div>
            </div>

            {/* Bottom QR Section */}
            <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-950/60 p-4 rounded-xl">
              <div className="flex items-center gap-4">
                {/* SVG QR */}
                <div className="bg-white p-2 rounded-lg shrink-0">
                  <svg className="w-16 h-16" viewBox="0 0 100 100" fill="currentColor">
                    <rect x="5" y="5" width="28" height="28" rx="4" fill="#0F172A" />
                    <rect x="11" y="11" width="16" height="16" rx="2" fill="#FFFFFF" />
                    <rect x="15" y="15" width="8" height="8" rx="1" fill="#0F172A" />
                    <rect x="67" y="5" width="28" height="28" rx="4" fill="#0F172A" />
                    <rect x="73" y="11" width="16" height="16" rx="2" fill="#FFFFFF" />
                    <rect x="77" y="15" width="8" height="8" rx="1" fill="#0F172A" />
                    <rect x="5" y="67" width="28" height="28" rx="4" fill="#0F172A" />
                    <rect x="11" y="73" width="16" height="16" rx="2" fill="#FFFFFF" />
                    <rect x="15" y="77" width="8" height="8" rx="1" fill="#0F172A" />
                    <rect x="42" y="10" width="8" height="8" fill="#2563EB" />
                    <rect x="42" y="30" width="8" height="8" fill="#0F172A" />
                    <rect x="10" y="42" width="8" height="8" fill="#0F172A" />
                    <rect x="30" y="42" width="8" height="8" fill="#2563EB" />
                    <rect x="50" y="50" width="8" height="8" fill="#0F172A" />
                    <rect x="70" y="50" width="8" height="8" fill="#2563EB" />
                  </svg>
                </div>
                <div className="text-xs">
                  <p className="font-bold text-white flex items-center gap-1">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    Gate Scanner Ready
                  </p>
                  <p className="text-slate-400 mt-0.5">Destination: {activePass.destination}</p>
                  <p className="text-[11px] text-slate-500">Purpose: {activePass.purpose}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  icon={Download}
                  onClick={() => handleDownloadTicket(activePass)}
                  className="bg-slate-800 text-white border-slate-700 hover:bg-slate-700 text-xs"
                >
                  Save Pass
                </Button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Card className="text-center py-10 bg-slate-50/50">
          <Ticket className="w-10 h-10 text-slate-300 mx-auto mb-2" />
          <h4 className="text-base font-bold text-slate-800">No active gate pass right now</h4>
          <p className="text-xs text-slate-500 mt-1">Need to step out for errands or dinner?</p>
          <Button variant="primary" size="sm" className="mt-4" onClick={onOpenGatePassModal}>
            Generate Gate Pass
          </Button>
        </Card>
      )}

      {/* Previous Gate Passes History */}
      <div className="space-y-4">
        <h3 className="text-base font-bold text-slate-900">Pass History</h3>

        <div className="space-y-3">
          {pastPasses.map((pass) => (
            <Card key={pass.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-extrabold text-slate-900">{pass.passId}</span>
                  <Badge variant="neutral" size="sm">{pass.status}</Badge>
                </div>
                <p className="text-slate-700 font-medium mt-1">{pass.purpose}</p>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  {pass.date} • {pass.exitTime} – {pass.expectedReturn} • {pass.destination}
                </p>
              </div>

              <Button
                variant="outline"
                size="sm"
                className="text-xs shrink-0"
                onClick={() => onOpenTicketModal(pass)}
              >
                View Ticket
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
