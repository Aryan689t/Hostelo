import React from 'react';
import {
  Utensils,
  Vote,
  CalendarDays,
  Ticket,
  Package,
  Wrench,
  CreditCard,
  Bell,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';
import { useHostelo } from '../context/HosteloContext';
import { Card, CardHeader } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { ProgressBar } from '../components/common/ProgressBar';

interface DashboardPageProps {
  onOpenGatePassModal: () => void;
  onOpenComplaintModal: () => void;
  onOpenLeaveModal: () => void;
  onOpenPaymentModal: () => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({
  onOpenGatePassModal,
  onOpenComplaintModal,
  onOpenLeaveModal,
  onOpenPaymentModal,
}) => {
  const {
    profile,
    paymentBreakdown,
    gatePasses,
    leavePasses,
    complaints,
    packages,
    polls,
    messMenu,
    announcements,
    setActiveTab,
    castVote,
  } = useHostelo();

  const activeGatePass = gatePasses.find((gp) => gp.status === 'APPROVED');
  const activeLeavePass = leavePasses[0];
  const activeComplaint = complaints.find((c) => c.status !== 'Resolved') || complaints[0];
  const readyPackage = packages.find((p) => p.status === 'Ready for Pickup') || packages[0];
  const activePoll = polls.find((p) => p.status === 'active') || polls[0];
  const todayMenu = messMenu[0]; // Monday / Current day

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Welcome & Compact Metric Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                Hostel Block B • 2nd Floor
              </span>
              <span className="text-xs text-slate-400 font-mono">
                {new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1.5">
              Good morning, {profile.name.split(' ')[0]}.
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              You have <span className="font-semibold text-slate-700">1 active gate pass</span>, <span className="font-semibold text-slate-700">1 parcel ready</span> at reception, and <span className="font-semibold text-blue-600">₹{paymentBreakdown.dueAmount.toLocaleString('en-IN')} pending dues</span>.
            </p>
          </div>

          {/* Quick Quick Actions */}
          <div className="flex flex-wrap items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              icon={Ticket}
              onClick={onOpenGatePassModal}
            >
              Gate Pass
            </Button>
            <Button
              variant="outline"
              size="sm"
              icon={CalendarDays}
              onClick={onOpenLeaveModal}
            >
              Leave Pass
            </Button>
            <Button
              variant="outline"
              size="sm"
              icon={Wrench}
              onClick={onOpenComplaintModal}
            >
              Report Issue
            </Button>
            {paymentBreakdown.dueAmount > 0 && (
              <Button
                variant="primary"
                size="sm"
                icon={CreditCard}
                onClick={onOpenPaymentModal}
              >
                Pay ₹{paymentBreakdown.dueAmount}
              </Button>
            )}
          </div>
        </div>

        {/* 4 Compact Summary KPI Pillars */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-6 pt-5 border-t border-slate-100">
          <div
            onClick={() => setActiveTab('profile')}
            className="p-3.5 rounded-xl bg-slate-50/70 border border-slate-200/70 hover:bg-slate-100/70 transition-colors cursor-pointer"
          >
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Room</p>
            <p className="text-xl font-extrabold text-slate-900 mt-0.5 font-mono">{profile.room}</p>
            <p className="text-[11px] text-slate-500 mt-0.5">{profile.block}</p>
          </div>

          <div
            onClick={() => setActiveTab('profile')}
            className="p-3.5 rounded-xl bg-slate-50/70 border border-slate-200/70 hover:bg-slate-100/70 transition-colors cursor-pointer"
          >
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Hostel</p>
            <p className="text-xl font-extrabold text-slate-900 mt-0.5">{profile.hostel.replace('Hostel ', '')}</p>
            <p className="text-[11px] text-emerald-600 font-medium mt-0.5 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              Attendance: {profile.attendance}
            </p>
          </div>

          <div
            onClick={() => setActiveTab('payments')}
            className="p-3.5 rounded-xl bg-slate-50/70 border border-slate-200/70 hover:bg-slate-100/70 transition-colors cursor-pointer"
          >
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Pending</p>
            <p className={`text-xl font-extrabold mt-0.5 font-mono ${paymentBreakdown.dueAmount > 0 ? 'text-amber-600' : 'text-emerald-600'}`}>
              ₹{paymentBreakdown.dueAmount.toLocaleString('en-IN')}
            </p>
            <p className="text-[11px] text-slate-500 mt-0.5">₹{paymentBreakdown.paidAmount.toLocaleString('en-IN')} Settled</p>
          </div>

          <div
            onClick={() => setActiveTab('gatepass')}
            className="p-3.5 rounded-xl bg-slate-50/70 border border-slate-200/70 hover:bg-slate-100/70 transition-colors cursor-pointer"
          >
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Active Pass</p>
            <p className="text-xl font-extrabold text-emerald-600 mt-0.5 font-mono">
              {activeGatePass ? '1 Active' : '0 Active'}
            </p>
            <p className="text-[11px] text-slate-500 mt-0.5">
              {activeGatePass ? activeGatePass.validityRange.split(',')[1] || 'Valid today' : 'No active pass'}
            </p>
          </div>
        </div>
      </div>

      {/* Main Grid Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2-Column Section */}
        <div className="lg:col-span-2 space-y-6">
          {/* Card 1: Today's Mess Menu Highlight */}
          <Card>
            <CardHeader
              title="Today's Mess Schedule"
              subtitle="Daily curated menu with timings & dietary highlights"
              icon={<Utensils className="w-5 h-5" />}
              action={
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setActiveTab('mess')}
                  icon={ArrowRight}
                  iconPosition="right"
                >
                  Weekly Menu
                </Button>
              }
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-bold text-slate-800 uppercase tracking-wide">Breakfast</span>
                  <span className="text-[10px] font-mono text-slate-400">{todayMenu.breakfast.timing}</span>
                </div>
                <p className="text-xs text-slate-700 font-medium">{todayMenu.breakfast.menu}</p>
                <div className="mt-2 flex items-center justify-between text-[11px] text-slate-500">
                  <span>{todayMenu.breakfast.calories}</span>
                  <Badge variant="default" size="sm">Served</Badge>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-bold text-slate-800 uppercase tracking-wide">Lunch</span>
                  <span className="text-[10px] font-mono text-slate-400">{todayMenu.lunch.timing}</span>
                </div>
                <p className="text-xs text-slate-700 font-medium">{todayMenu.lunch.menu}</p>
                <div className="mt-2 flex items-center justify-between text-[11px] text-slate-500">
                  <span>{todayMenu.lunch.calories}</span>
                  <Badge variant="success" size="sm">Upcoming</Badge>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-bold text-slate-800 uppercase tracking-wide">Snacks & Tea</span>
                  <span className="text-[10px] font-mono text-slate-400">{todayMenu.snacks.timing}</span>
                </div>
                <p className="text-xs text-slate-700 font-medium">{todayMenu.snacks.menu}</p>
                <div className="mt-2 flex items-center justify-between text-[11px] text-slate-500">
                  <span>{todayMenu.snacks.calories}</span>
                  <Badge variant="neutral" size="sm">Evening</Badge>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-blue-50/40 border border-blue-200/80">
                <div className="flex items-center justify-between text-xs mb-1">
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-blue-900 uppercase tracking-wide">Dinner</span>
                    <Badge variant="primary" size="sm">Special</Badge>
                  </div>
                  <span className="text-[10px] font-mono text-blue-700">{todayMenu.dinner.timing}</span>
                </div>
                <p className="text-xs text-blue-950 font-medium">{todayMenu.dinner.menu}</p>
                <div className="mt-2 flex items-center justify-between text-[11px] text-blue-600 font-medium">
                  <span>{todayMenu.dinner.calories}</span>
                  <span className="font-semibold">Gulab Jamun Feast</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Card 2: Active Democratic Poll */}
          <Card>
            <CardHeader
              title="Active Hostel Poll"
              subtitle="Democratic student decision making"
              icon={<Vote className="w-5 h-5" />}
              action={
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setActiveTab('voting')}
                  icon={ArrowRight}
                  iconPosition="right"
                >
                  All Polls
                </Button>
              }
            />

            <div className="bg-slate-50 rounded-xl p-4 border border-slate-200/80">
              <div className="flex items-center justify-between mb-2">
                <Badge variant="primary" size="sm">{activePoll.category}</Badge>
                <span className="text-[11px] font-mono text-slate-500">{activePoll.expiresAt}</span>
              </div>
              <h4 className="text-sm font-bold text-slate-900">{activePoll.title}</h4>
              <p className="text-xs text-slate-600 mt-1">{activePoll.description}</p>

              <div className="space-y-2.5 mt-4">
                {activePoll.options.map((opt) => {
                  const pct = activePoll.totalVotes > 0 ? Math.round((opt.votes / activePoll.totalVotes) * 100) : 0;
                  const isVoted = activePoll.userVotedOptionId === opt.id;
                  return (
                    <div
                      key={opt.id}
                      onClick={() => !activePoll.userVotedOptionId && castVote(activePoll.id, opt.id)}
                      className={`p-3 rounded-lg border text-xs transition-all ${
                        isVoted
                          ? 'bg-blue-50/80 border-blue-300 font-semibold'
                          : activePoll.userVotedOptionId
                          ? 'bg-white border-slate-200 opacity-90'
                          : 'bg-white border-slate-200 hover:border-blue-300 hover:bg-blue-50/30 cursor-pointer'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-slate-800 flex items-center gap-1.5">
                          {isVoted && <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />}
                          {opt.label}
                        </span>
                        <span className="font-mono font-bold text-slate-700">{pct}% ({opt.votes})</span>
                      </div>
                      <ProgressBar value={pct} color={isVoted ? 'blue' : 'indigo'} size="sm" />
                    </div>
                  );
                })}
              </div>

              <div className="mt-3 pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs text-slate-500">
                <span>Total participation: <strong className="text-slate-800">{activePoll.totalVotes} students</strong></span>
                {activePoll.userVotedOptionId ? (
                  <span className="text-emerald-600 font-medium flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Vote Registered
                  </span>
                ) : (
                  <span className="text-blue-600 font-medium">Click any option to vote</span>
                )}
              </div>
            </div>
          </Card>

          {/* Card 3: Recent Complaint Status Timeline */}
          <Card>
            <CardHeader
              title="Recent Maintenance Ticket"
              subtitle="Real-time facility management tracking"
              icon={<Wrench className="w-5 h-5" />}
              action={
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setActiveTab('complaints')}
                  icon={ArrowRight}
                  iconPosition="right"
                >
                  View All ({complaints.length})
                </Button>
              }
            />

            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-blue-600">{activeComplaint.ticketId}</span>
                    <Badge variant={activeComplaint.priority === 'Urgent' ? 'danger' : 'warning'} size="sm">
                      {activeComplaint.priority} Priority
                    </Badge>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 mt-1">{activeComplaint.title}</h4>
                  <p className="text-xs text-slate-600 mt-0.5">{activeComplaint.description}</p>
                </div>
                <Badge variant="primary" size="md">
                  {activeComplaint.status}
                </Badge>
              </div>

              {/* Status Timeline Progression */}
              <div className="mt-5 pt-4 border-t border-slate-200/80">
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-3">
                  Resolution Progress: Submitted → Assigned → In Progress → Resolved
                </p>
                <div className="grid grid-cols-4 gap-2 text-center text-[11px] font-medium">
                  {['Submitted', 'Assigned', 'In Progress', 'Resolved'].map((step, idx) => {
                    const statusOrder = ['Submitted', 'Assigned', 'In Progress', 'Resolved'];
                    const currentIdx = statusOrder.indexOf(activeComplaint.status);
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
                {activeComplaint.assignedTechnician && (
                  <p className="text-xs text-slate-500 mt-3 text-right">
                    Assigned Technician: <strong className="text-slate-800">{activeComplaint.assignedTechnician}</strong>
                  </p>
                )}
              </div>
            </div>
          </Card>
        </div>

        {/* Right 1-Column Section */}
        <div className="space-y-6">
          {/* Card: Active Gate Pass Ticket */}
          <Card className="border-blue-200 bg-linear-to-b from-blue-50/40 to-white">
            <CardHeader
              title="Active Gate Pass"
              subtitle="Ready for scanner verification"
              icon={<Ticket className="w-5 h-5 text-blue-600" />}
              action={
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setActiveTab('gatepass')}
                  icon={ArrowRight}
                  iconPosition="right"
                >
                  Passes
                </Button>
              }
            />

            {activeGatePass ? (
              <div className="bg-white p-4 rounded-xl border border-slate-200/80 space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <div>
                    <span className="text-[10px] font-mono text-slate-400 uppercase font-semibold">Pass ID</span>
                    <p className="text-sm font-extrabold text-slate-900 font-mono">{activeGatePass.passId}</p>
                  </div>
                  <Badge variant="success" size="md">APPROVED</Badge>
                </div>

                <div className="text-xs space-y-1">
                  <p className="text-slate-500">Destination: <strong className="text-slate-800">{activeGatePass.destination}</strong></p>
                  <p className="text-slate-500">Valid Window: <span className="font-mono text-blue-600 font-semibold">{activeGatePass.validityRange}</span></p>
                  <p className="text-slate-500">Purpose: <span className="text-slate-700">{activeGatePass.purpose}</span></p>
                </div>

                <Button
                  variant="secondary"
                  size="sm"
                  className="w-full text-xs"
                  onClick={() => setActiveTab('gatepass')}
                >
                  Open QR Ticket
                </Button>
              </div>
            ) : (
              <div className="text-center py-6">
                <Ticket className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                <p className="text-xs text-slate-500">No active gate pass currently.</p>
                <Button variant="outline" size="sm" className="mt-3 text-xs" onClick={onOpenGatePassModal}>
                  Request New Gate Pass
                </Button>
              </div>
            )}
          </Card>

          {/* Card: Leave Status */}
          <Card>
            <CardHeader
              title="Leave Pass Status"
              subtitle="Outstation permissions"
              icon={<CalendarDays className="w-5 h-5" />}
              action={
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setActiveTab('leave')}
                  icon={ArrowRight}
                  iconPosition="right"
                >
                  Manage
                </Button>
              }
            />

            {activeLeavePass && (
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono font-bold text-slate-800">Leave #{activeLeavePass.id}</span>
                  <Badge variant="success" size="sm">{activeLeavePass.status} ✓</Badge>
                </div>
                <div className="text-xs text-slate-700">
                  <p className="font-semibold">{activeLeavePass.leaveType}: {activeLeavePass.destination}</p>
                  <p className="text-[11px] font-mono text-slate-500 mt-0.5">
                    {activeLeavePass.fromDate} → {activeLeavePass.toDate}
                  </p>
                </div>
                <p className="text-[11px] text-slate-500 italic bg-white p-2 rounded border border-slate-100">
                  "{activeLeavePass.remarks}"
                </p>
              </div>
            )}
          </Card>

          {/* Card: Incoming Packages */}
          <Card>
            <CardHeader
              title="Package Delivery"
              subtitle="Hostel reception parcel hub"
              icon={<Package className="w-5 h-5" />}
              action={
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setActiveTab('packages')}
                  icon={ArrowRight}
                  iconPosition="right"
                >
                  View ({packages.length})
                </Button>
              }
            />

            {readyPackage && (
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-900">{readyPackage.deliveryCompany}</span>
                  <Badge variant={readyPackage.status === 'Ready for Pickup' ? 'warning' : 'default'} size="sm">
                    {readyPackage.status}
                  </Badge>
                </div>
                <p className="text-xs text-slate-600 font-mono">Package #{readyPackage.packageId}</p>
                <div className="flex items-center justify-between bg-white p-2 rounded-lg border border-slate-200 text-xs">
                  <span className="text-slate-500">Claim OTP:</span>
                  <span className="font-mono font-bold text-blue-600 text-sm tracking-wider">{readyPackage.claimOtp}</span>
                </div>
              </div>
            )}
          </Card>

          {/* Card: Recent Hostel Announcements */}
          <Card>
            <CardHeader
              title="Notice Board"
              subtitle="Official administration notices"
              icon={<Bell className="w-5 h-5" />}
              action={
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setActiveTab('announcements')}
                  icon={ArrowRight}
                  iconPosition="right"
                >
                  All Notices
                </Button>
              }
            />

            <div className="space-y-3">
              {announcements.slice(0, 2).map((ann) => (
                <div
                  key={ann.id}
                  onClick={() => setActiveTab('announcements')}
                  className="p-3 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors cursor-pointer text-xs space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <Badge variant={ann.isUrgent ? 'danger' : 'primary'} size="sm">
                      {ann.category}
                    </Badge>
                    <span className="text-[10px] text-slate-400 font-mono">{ann.date}</span>
                  </div>
                  <h5 className="font-bold text-slate-900">{ann.title}</h5>
                  <p className="text-slate-600 line-clamp-2 leading-relaxed">{ann.content}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
