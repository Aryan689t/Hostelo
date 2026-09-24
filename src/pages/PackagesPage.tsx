import React, { useState } from 'react';
import {
  Package,
  CheckCircle2,
  KeyRound,
} from 'lucide-react';
import { useHostelo } from '../context/HosteloContext';
import type { PackageStatus } from '../types';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';

export const PackagesPage: React.FC = () => {
  const { packages, markPackageCollected } = useHostelo();
  const [filter, setFilter] = useState<string>('all');

  const filteredPackages = packages.filter((pkg) => {
    if (filter === 'all') return true;
    return pkg.status.toLowerCase().replace(/\s+/g, '_') === filter;
  });

  const getStatusBadge = (status: PackageStatus) => {
    switch (status) {
      case 'Ready for Pickup':
        return <Badge variant="warning" size="md">Ready for Pickup</Badge>;
      case 'Arrived':
        return <Badge variant="primary" size="md">Arrived at Gate</Badge>;
      case 'In Transit':
        return <Badge variant="default" size="md">In Transit</Badge>;
      case 'Collected':
        return <Badge variant="success" size="md">Collected ✓</Badge>;
    }
  };

  return (
    <div className="space-y-8 animate-fade-in max-w-5xl mx-auto pb-16">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="primary" size="sm">RECEPTION PARCEL DESK</Badge>
            <span className="text-xs text-slate-400 font-mono">Secure Verification OTP</span>
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight mt-1">
            Online Shopping & Packages
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Track Amazon, Flipkart, and courier deliveries received at hostel reception. Show your OTP to claim.
          </p>
        </div>

        <div className="flex items-center gap-2 p-3 bg-amber-50 rounded-xl border border-amber-200 text-amber-900 text-xs">
          <KeyRound className="w-4 h-4 text-amber-600 shrink-0" />
          <span>Reception Desk Timings: <strong>09:00 AM – 09:00 PM</strong></span>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2">
        {[
          { id: 'all', label: 'All Packages' },
          { id: 'ready_for_pickup', label: 'Ready for Pickup' },
          { id: 'in_transit', label: 'In Transit' },
          { id: 'collected', label: 'Collected History' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilter(tab.id)}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              filter === tab.id
                ? 'bg-[#0F172A] text-white shadow-xs'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Packages Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredPackages.length === 0 ? (
          <Card className="col-span-2 text-center py-12">
            <Package className="w-10 h-10 text-slate-300 mx-auto mb-2" />
            <h4 className="text-sm font-bold text-slate-800">No packages in this filter</h4>
            <p className="text-xs text-slate-500 mt-1">Incoming packages will show up as soon as security logs them.</p>
          </Card>
        ) : (
          filteredPackages.map((pkg) => (
            <Card
              key={pkg.id}
              className={`space-y-4 border ${
                pkg.status === 'Ready for Pickup' ? 'border-amber-200 bg-amber-50/10' : 'border-slate-200'
              }`}
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-3 pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xs">
                    <Package className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">{pkg.deliveryCompany}</h4>
                    <p className="text-[11px] font-mono text-slate-400">ID: {pkg.packageId}</p>
                  </div>
                </div>
                {getStatusBadge(pkg.status)}
              </div>

              {/* Details */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Recipient</p>
                  <p className="text-xs font-bold text-slate-800 mt-0.5">{pkg.studentName}</p>
                  <p className="text-[11px] font-mono text-slate-500">Room {pkg.roomNumber}</p>
                </div>

                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Storage Shelf</p>
                  <p className="text-xs font-semibold text-slate-800 mt-0.5">{pkg.shelfLocation}</p>
                  <p className="text-[11px] text-slate-500">{pkg.arrivalDate}</p>
                </div>
              </div>

              {/* OTP & Action */}
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-3">
                <div className="bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200 text-xs">
                  <span className="text-slate-400 text-[10px] block uppercase font-bold">Claim OTP</span>
                  <span className="text-sm font-black font-mono tracking-widest text-blue-600">
                    {pkg.claimOtp}
                  </span>
                </div>

                {pkg.status === 'Ready for Pickup' ? (
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => markPackageCollected(pkg.id)}
                    icon={CheckCircle2}
                  >
                    Mark as Collected
                  </Button>
                ) : (
                  <span className="text-xs text-slate-400 font-mono">
                    {pkg.status === 'Collected' ? 'Collected from Desk' : 'Awaiting Delivery'}
                  </span>
                )}
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};
