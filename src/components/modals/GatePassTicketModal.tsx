import React from 'react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import type { GatePass } from '../../types';
import { CheckCircle2, ShieldCheck, Download, Share2 } from 'lucide-react';
import { useHostelo } from '../../context/HosteloContext';

interface GatePassTicketModalProps {
  pass: GatePass | null;
  isOpen: boolean;
  onClose: () => void;
}

export const GatePassTicketModal: React.FC<GatePassTicketModalProps> = ({
  pass,
  isOpen,
  onClose,
}) => {
  const { showToast } = useHostelo();

  if (!pass) return null;

  const handleDownload = () => {
    showToast(`Pass ${pass.passId} saved to downloads!`, 'success');
  };

  const handleShare = () => {
    showToast('Gate pass link copied to clipboard!', 'info');
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Hostel Security Gate Pass"
      subtitle="Present this digital ticket at Main Gate Security Checkpoint"
      maxWidth="md"
    >
      <div className="space-y-5">
        {/* Ticket Container */}
        <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-xl border border-slate-800 relative overflow-hidden">
          {/* Subtle Background Pattern */}
          <div className="absolute -top-12 -right-12 w-40 h-40 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-12 -left-12 w-40 h-40 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

          {/* Ticket Header */}
          <div className="flex items-start justify-between pb-4 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-blue-400 font-bold uppercase tracking-wider">
                  OFFICIAL HOSTEL ENTRY TICKET
                </span>
              </div>
              <h3 className="text-xl font-black tracking-tight mt-1">HOSTELO GATE PASS</h3>
            </div>
            <div className="text-right">
              <Badge variant="success" size="md" className="font-mono">
                {pass.status}
              </Badge>
              <p className="text-[10px] font-mono text-slate-400 mt-1">{pass.passId}</p>
            </div>
          </div>

          {/* Ticket Details Grid */}
          <div className="grid grid-cols-2 gap-4 py-4 text-xs">
            <div>
              <p className="text-slate-400 text-[11px] uppercase tracking-wider font-semibold">Student</p>
              <p className="text-sm font-bold text-white mt-0.5">{pass.studentName}</p>
            </div>
            <div>
              <p className="text-slate-400 text-[11px] uppercase tracking-wider font-semibold">Room & Hostel</p>
              <p className="text-sm font-bold text-white mt-0.5">
                {pass.room} <span className="text-slate-400 font-normal">({pass.hostel})</span>
              </p>
            </div>

            <div>
              <p className="text-slate-400 text-[11px] uppercase tracking-wider font-semibold">Valid Outing Hours</p>
              <p className="text-xs font-mono font-medium text-emerald-300 mt-0.5">
                {pass.validityRange || `${pass.date}, ${pass.exitTime} – ${pass.expectedReturn}`}
              </p>
            </div>
            <div>
              <p className="text-slate-400 text-[11px] uppercase tracking-wider font-semibold">Destination</p>
              <p className="text-xs text-slate-200 mt-0.5 truncate">{pass.destination}</p>
            </div>

            <div className="col-span-2 bg-slate-800/60 p-2.5 rounded-lg border border-slate-700/60 flex items-center justify-between">
              <div>
                <p className="text-[10px] text-slate-400 uppercase font-semibold">Purpose</p>
                <p className="text-xs text-slate-200">{pass.purpose}</p>
              </div>
              <div className="flex items-center gap-1 text-[11px] text-emerald-400 font-medium">
                <ShieldCheck className="w-4 h-4" />
                <span>Verified</span>
              </div>
            </div>
          </div>

          {/* Ticket Perforation Notch */}
          <div className="relative py-2 flex items-center justify-between">
            <div className="w-full border-t border-dashed border-slate-700" />
            <div className="absolute -left-8 w-4 h-4 rounded-full bg-white" />
            <div className="absolute -right-8 w-4 h-4 rounded-full bg-white" />
          </div>

          {/* QR Code Section */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-950/70 p-4 rounded-xl border border-slate-800">
            {/* Visual SVG QR Mockup */}
            <div className="bg-white p-2.5 rounded-lg shrink-0 shadow-sm">
              <svg className="w-24 h-24" viewBox="0 0 100 100" fill="currentColor">
                <rect x="5" y="5" width="28" height="28" rx="4" fill="#0F172A" />
                <rect x="11" y="11" width="16" height="16" rx="2" fill="#FFFFFF" />
                <rect x="15" y="15" width="8" height="8" rx="1" fill="#0F172A" />

                <rect x="67" y="5" width="28" height="28" rx="4" fill="#0F172A" />
                <rect x="73" y="11" width="16" height="16" rx="2" fill="#FFFFFF" />
                <rect x="77" y="15" width="8" height="8" rx="1" fill="#0F172A" />

                <rect x="5" y="67" width="28" height="28" rx="4" fill="#0F172A" />
                <rect x="11" y="73" width="16" height="16" rx="2" fill="#FFFFFF" />
                <rect x="15" y="77" width="8" height="8" rx="1" fill="#0F172A" />

                <rect x="40" y="8" width="6" height="6" fill="#2563EB" />
                <rect x="50" y="12" width="8" height="6" fill="#0F172A" />
                <rect x="40" y="24" width="6" height="8" fill="#0F172A" />
                <rect x="52" y="22" width="6" height="6" fill="#2563EB" />

                <rect x="8" y="42" width="8" height="6" fill="#0F172A" />
                <rect x="22" y="46" width="6" height="6" fill="#2563EB" />
                <rect x="36" y="38" width="8" height="8" fill="#0F172A" />
                <rect x="48" y="42" width="6" height="6" fill="#0F172A" />
                <rect x="60" y="36" width="8" height="6" fill="#2563EB" />
                <rect x="72" y="44" width="8" height="8" fill="#0F172A" />
                <rect x="86" y="40" width="6" height="6" fill="#0F172A" />

                <rect x="40" y="58" width="8" height="6" fill="#0F172A" />
                <rect x="54" y="54" width="6" height="8" fill="#2563EB" />
                <rect x="68" y="60" width="6" height="6" fill="#0F172A" />
                <rect x="80" y="56" width="8" height="8" fill="#0F172A" />

                <rect x="40" y="72" width="6" height="8" fill="#2563EB" />
                <rect x="52" y="70" width="8" height="6" fill="#0F172A" />
                <rect x="66" y="74" width="6" height="8" fill="#0F172A" />
                <rect x="78" y="72" width="8" height="8" fill="#2563EB" />
                <rect x="50" y="86" width="8" height="6" fill="#0F172A" />
                <rect x="64" y="88" width="6" height="6" fill="#0F172A" />
                <rect x="76" y="84" width="8" height="8" fill="#0F172A" />
              </svg>
            </div>

            <div className="text-center sm:text-left space-y-1">
              <div className="flex items-center justify-center sm:justify-start gap-1.5 text-xs text-emerald-400 font-semibold">
                <CheckCircle2 className="w-4 h-4" />
                <span>Scan at Gate Scanner</span>
              </div>
              <p className="text-[11px] text-slate-400">
                Security token hash: <span className="font-mono text-slate-300">#HOSTELO-{pass.passId}-SEC</span>
              </p>
              <p className="text-[10px] text-slate-500">Auto-expires at designated curfew return time.</p>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center justify-between pt-2">
          <Button variant="ghost" size="sm" icon={Share2} onClick={handleShare}>
            Share Pass
          </Button>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" icon={Download} onClick={handleDownload}>
              Download Pass
            </Button>
            <Button variant="primary" size="sm" onClick={onClose}>
              Done
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
