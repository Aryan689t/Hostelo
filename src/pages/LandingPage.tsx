import React from 'react';
import {
  ArrowRight,
  Sparkles,
  Users,
  Vote,
  CalendarDays,
  Ticket,
  Package,
  Wrench,
  CreditCard,
  Utensils,
  ChevronRight,
} from 'lucide-react';
import { useHostelo } from '../context/HosteloContext';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';

export const LandingPage: React.FC = () => {
  const { setActiveTab, profile } = useHostelo();

  const features = [
    {
      icon: Users,
      title: 'Stay Connected',
      subtitle: 'Student Community',
      description: 'Connect with hostel mates, trade study books, organize sports tournaments, and find lost items.',
      tab: 'community' as const,
      color: 'bg-blue-50 text-blue-600',
    },
    {
      icon: Vote,
      title: 'Vote Together',
      subtitle: 'Hostel Democracy',
      description: 'Make hostel decisions democratically with live polling for mess menus, curfew rules, and council initiatives.',
      tab: 'voting' as const,
      color: 'bg-indigo-50 text-indigo-600',
    },
    {
      icon: CalendarDays,
      title: 'Manage Your Leave',
      subtitle: 'Outstation Permission',
      description: 'Apply for home visits and weekend leaves with instant parental SMS verification and warden approval status.',
      tab: 'leave' as const,
      color: 'bg-emerald-50 text-emerald-600',
    },
    {
      icon: Ticket,
      title: 'Digital Gate Pass',
      subtitle: 'Instant Outing Passes',
      description: 'Generate temporary digital gate passes with encrypted QR code verification directly from your phone.',
      tab: 'gatepass' as const,
      color: 'bg-amber-50 text-amber-600',
    },
    {
      icon: Utensils,
      title: 'Mess Timetable & Rating',
      subtitle: 'Nutritious Dining',
      description: 'Check 7-day breakfast, lunch, snacks, and dinner menus. Rate daily food quality and submit chef feedback.',
      tab: 'mess' as const,
      color: 'bg-orange-50 text-orange-600',
    },
    {
      icon: Package,
      title: 'Never Miss a Package',
      subtitle: 'Delivery Reception',
      description: 'Get notified the moment your Amazon, Flipkart, or courier parcel arrives at the hostel reception desk.',
      tab: 'packages' as const,
      color: 'bg-sky-50 text-sky-600',
    },
    {
      icon: Wrench,
      title: 'Raise Issues & Repairs',
      subtitle: 'Fast Maintenance',
      description: 'Report electrical, plumbing, Wi-Fi, or carpentry problems with automated technician tracking.',
      tab: 'complaints' as const,
      color: 'bg-rose-50 text-rose-600',
    },
    {
      icon: CreditCard,
      title: 'Simple Payments',
      subtitle: 'Transparent Ledger',
      description: 'Track hostel, mess, and maintenance fee breakdowns. Pay instantly via UPI or card with digital receipts.',
      tab: 'payments' as const,
      color: 'bg-purple-50 text-purple-600',
    },
  ];

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#0F172A] flex flex-col justify-between selection:bg-blue-600 selection:text-white">
      {/* Top Navigation */}
      <header className="sticky top-0 z-30 bg-[#F8F9FA]/90 backdrop-blur-md border-b border-slate-200/80 px-6 sm:px-12 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white font-black text-lg shadow-sm shadow-blue-500/20">
            H
          </div>
          <div>
            <span className="font-extrabold text-slate-900 tracking-tight text-lg">HOSTELO</span>
            <span className="text-[10px] font-mono text-slate-400 block -mt-1">THE HOSTEL OS</span>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-slate-600">
          <a href="#features" className="hover:text-blue-600 transition-colors">Features</a>
          <a href="#mockup" className="hover:text-blue-600 transition-colors">Live Preview</a>
          <a href="#architecture" className="hover:text-blue-600 transition-colors">Student OS</a>
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveTab('dashboard')}
            className="text-xs font-semibold text-slate-700 hover:text-slate-900 px-3 py-2 cursor-pointer"
          >
            Signed in as <span className="text-blue-600 font-bold">{profile.name.split(' ')[0]}</span>
          </button>
          <Button
            variant="primary"
            size="sm"
            onClick={() => setActiveTab('dashboard')}
            icon={ArrowRight}
            iconPosition="right"
          >
            Enter Dashboard
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative px-6 sm:px-12 pt-16 pb-20 max-w-6xl mx-auto w-full text-center">
        {/* Subtle decorative glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-blue-700 text-xs font-semibold mb-8 animate-fade-in shadow-xs">
          <Sparkles className="w-3.5 h-3.5" />
          <span>The Next-Generation Digital Hostel Platform</span>
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-slate-900 leading-[1.08] max-w-4xl mx-auto">
          Hostel life, <br />
          <span className="text-blue-600 underline decoration-blue-200 decoration-wavy decoration-2">simplified.</span>
        </h1>

        <p className="mt-6 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto font-normal leading-relaxed">
          One unified neo-minimalist platform for your hostel community, digital gate passes, democratic mess voting, package alerts, instant fee payments, and maintenance tickets.
        </p>

        {/* Primary CTAs */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            size="lg"
            variant="primary"
            onClick={() => setActiveTab('dashboard')}
            icon={ArrowRight}
            iconPosition="right"
            className="w-full sm:w-auto text-base px-8 py-3.5 shadow-md shadow-blue-500/20"
          >
            Enter Hostelo Workspace
          </Button>
          <a href="#features" className="w-full sm:w-auto">
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto text-base px-6 py-3.5"
            >
              Explore All Features
            </Button>
          </a>
        </div>

        {/* Live Interactive Mockup Frame */}
        <div id="mockup" className="mt-16 text-left relative">
          <div className="rounded-2xl border border-slate-200/90 bg-white p-2 shadow-2xl shadow-slate-900/5 ring-1 ring-slate-900/5">
            {/* Mock Window Bar */}
            <div className="bg-slate-100/90 rounded-xl px-4 py-2.5 flex items-center justify-between border-b border-slate-200 mb-2">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-400" />
                <span className="w-3 h-3 rounded-full bg-amber-400" />
                <span className="w-3 h-3 rounded-full bg-emerald-400" />
              </div>
              <div className="text-[11px] font-mono font-medium text-slate-500 bg-white px-3 py-1 rounded-md border border-slate-200">
                hostelo.internal / app / {profile.room}
              </div>
              <Badge variant="primary" size="sm">LIVE PREVIEW</Badge>
            </div>

            {/* Dashboard Quick Snapshot */}
            <div className="p-4 sm:p-6 bg-slate-50/50 rounded-xl space-y-6">
              {/* Top Greeting & Metric Pills */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-extrabold text-slate-900">Good morning, Aarav.</h2>
                  <p className="text-xs text-slate-500">Hostel Block B (Aryabhata Hall) • Room B-204</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="success" size="md">Attendance: 94.6%</Badge>
                  <Button size="sm" variant="secondary" onClick={() => setActiveTab('gatepass')}>
                    Show Active Pass (GP-2048)
                  </Button>
                </div>
              </div>

              {/* 4 Stat Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                <div className="bg-white p-4 rounded-xl border border-slate-200">
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Room</p>
                  <p className="text-xl font-extrabold text-slate-900 mt-1 font-mono">B-204</p>
                  <p className="text-[10px] text-slate-500 mt-0.5">Floor 2, North Wing</p>
                </div>
                <div className="bg-white p-4 rounded-xl border border-slate-200">
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Hostel</p>
                  <p className="text-xl font-extrabold text-slate-900 mt-1">Block B</p>
                  <p className="text-[10px] text-slate-500 mt-0.5">Warden: Prof. Rao</p>
                </div>
                <div className="bg-white p-4 rounded-xl border border-slate-200">
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Pending Dues</p>
                  <p className="text-xl font-extrabold text-blue-600 mt-1 font-mono">₹1,250</p>
                  <p className="text-[10px] text-emerald-600 mt-0.5">₹12,750 Paid</p>
                </div>
                <div className="bg-white p-4 rounded-xl border border-slate-200">
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Active Pass</p>
                  <p className="text-xl font-extrabold text-emerald-600 mt-1 font-mono">1 Active</p>
                  <p className="text-[10px] text-slate-500 mt-0.5">Till 09:00 PM</p>
                </div>
              </div>

              {/* Visual Card Row */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-800">Today's Dinner Menu</span>
                    <Badge variant="purple" size="sm">Special</Badge>
                  </div>
                  <p className="text-xs text-slate-600 font-medium">Paneer Butter Masala + Jeera Rice + Tawa Roti + Gulab Jamun</p>
                  <p className="text-[11px] font-mono text-slate-400">07:30 PM – 09:30 PM</p>
                </div>

                <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-800">Active Mess Poll</span>
                    <Badge variant="primary" size="sm">380 Votes</Badge>
                  </div>
                  <p className="text-xs text-slate-600 font-medium">North Indian Classics (42%) vs South Indian (31%)</p>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-blue-600 h-full w-[42%]" />
                  </div>
                </div>

                <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-800">Reception Package</span>
                    <Badge variant="warning" size="sm">Ready</Badge>
                  </div>
                  <p className="text-xs text-slate-600 font-medium">Amazon #PK-20491 arrived at front desk</p>
                  <p className="text-[11px] font-mono text-blue-600 font-bold">Claim OTP: 8492</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Showcase Grid */}
      <section id="features" className="px-6 sm:px-12 py-20 bg-white border-y border-slate-200">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Designed for effortless hostel life
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-600">
              Every critical hostel workflow engineered with neo-minimalist simplicity, zero clutter, and instantaneous response.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, idx) => {
              const Icon = f.icon;
              return (
                <div
                  key={idx}
                  onClick={() => setActiveTab(f.tab)}
                  className="bg-[#F8F9FA] rounded-xl p-6 border border-slate-200/80 hover:border-blue-300 hover:shadow-lg hover:-translate-y-1 transition-all duration-200 cursor-pointer flex flex-col justify-between group"
                >
                  <div>
                    <div className={`w-11 h-11 rounded-xl ${f.color} flex items-center justify-center mb-4 transition-transform group-hover:scale-105`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      {f.subtitle}
                    </p>
                    <h3 className="text-base font-bold text-slate-900 mt-1 group-hover:text-blue-600 transition-colors">
                      {f.title}
                    </h3>
                    <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                      {f.description}
                    </p>
                  </div>
                  <div className="mt-5 pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs font-semibold text-blue-600">
                    <span>Open {f.subtitle}</span>
                    <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Product Principle / Value Strip */}
      <section id="architecture" className="px-6 sm:px-12 py-16 max-w-5xl mx-auto text-center">
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
          
          <span className="text-xs font-mono uppercase tracking-widest text-blue-400 font-bold">
            Product Philosophy
          </span>
          <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-white mt-3 max-w-2xl mx-auto">
            "The operating system for modern campus hostel life."
          </h2>
          <p className="mt-4 text-xs sm:text-sm text-slate-400 max-w-xl mx-auto leading-relaxed">
            Eliminate chaotic WhatsApp groups, lost paper pass chits, and missed notice board pins. Everything you need to thrive in campus hostel living, packed in one fast digital workspace.
          </p>

          <div className="mt-8 flex items-center justify-center gap-4">
            <Button
              size="lg"
              variant="primary"
              onClick={() => setActiveTab('dashboard')}
              icon={ArrowRight}
              iconPosition="right"
              className="text-sm px-6 py-3"
            >
              Launch Student Dashboard
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white px-6 sm:px-12 py-8 text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-blue-600 flex items-center justify-center text-white font-black text-xs">
            H
          </div>
          <span className="font-extrabold text-slate-900">HOSTELO</span>
          <span>© 2026 Student Life Technologies.</span>
        </div>
        <div className="flex items-center gap-4 font-medium">
          <button onClick={() => setActiveTab('dashboard')} className="hover:text-slate-900 cursor-pointer">
            Dashboard
          </button>
          <button onClick={() => setActiveTab('mess')} className="hover:text-slate-900 cursor-pointer">
            Mess Timings
          </button>
          <button onClick={() => setActiveTab('gatepass')} className="hover:text-slate-900 cursor-pointer">
            Gate Pass
          </button>
          <button onClick={() => setActiveTab('complaints')} className="hover:text-slate-900 cursor-pointer">
            Maintenance
          </button>
        </div>
      </footer>
    </div>
  );
};
