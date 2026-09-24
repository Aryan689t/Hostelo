import React, { useState } from 'react';
import {
  CreditCard,
  Download,
  CheckCircle2,
  FileText,
  Receipt,
} from 'lucide-react';
import { useHostelo } from '../context/HosteloContext';
import type { TransactionItem } from '../types';
import { Card, CardHeader } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { Modal } from '../components/common/Modal';

interface PaymentsPageProps {
  onOpenPaymentModal: () => void;
}

export const PaymentsPage: React.FC<PaymentsPageProps> = ({ onOpenPaymentModal }) => {
  const { paymentBreakdown, transactions, profile, showToast } = useHostelo();
  const [selectedReceipt, setSelectedReceipt] = useState<TransactionItem | null>(null);

  const totalFee =
    paymentBreakdown.hostelFee + paymentBreakdown.messFee + paymentBreakdown.maintenanceFee;

  const handleDownloadReceipt = (txn: TransactionItem) => {
    showToast(`Receipt #${txn.receiptNumber} downloaded as PDF!`, 'success');
  };

  return (
    <div className="space-y-8 animate-fade-in max-w-5xl mx-auto pb-16">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="primary" size="sm">FEE ACCOUNT LEDGER</Badge>
            <span className="text-xs text-slate-400 font-mono">Academic Year 2026-27</span>
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight mt-1">
            Hostel & Mess Payments
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Real-time balance breakdown, digital checkout, and GST-compliant official student receipts.
          </p>
        </div>

        {paymentBreakdown.dueAmount > 0 && (
          <Button
            variant="primary"
            icon={CreditCard}
            onClick={onOpenPaymentModal}
            className="shadow-sm shadow-blue-500/20"
          >
            Pay Balance ₹{paymentBreakdown.dueAmount.toLocaleString('en-IN')}
          </Button>
        )}
      </div>

      {/* Balance Breakdown Strip */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Outstanding Card */}
        <Card className="border-blue-200 bg-linear-to-b from-blue-50/50 to-white space-y-4">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Current Outstanding Balance
          </p>
          <div>
            <h3
              className={`text-4xl font-extrabold font-mono tracking-tight ${
                paymentBreakdown.dueAmount > 0 ? 'text-blue-600' : 'text-emerald-600'
              }`}
            >
              ₹{paymentBreakdown.dueAmount.toLocaleString('en-IN')}
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              {paymentBreakdown.dueAmount > 0
                ? 'Due for Semester 4 hostel and mess advance adjustment'
                : 'All hostel and mess dues are fully settled! ✓'}
            </p>
          </div>

          <div className="pt-2">
            {paymentBreakdown.dueAmount > 0 ? (
              <Button
                variant="primary"
                size="md"
                className="w-full"
                onClick={onOpenPaymentModal}
              >
                Pay Now
              </Button>
            ) : (
              <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center justify-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Zero Outstanding Dues</span>
              </div>
            )}
          </div>
        </Card>

        {/* Detailed Itemized Ledger Breakdown */}
        <Card className="lg:col-span-2 space-y-3">
          <CardHeader
            title="Semester 4 Fee Itemization"
            subtitle="Transparent breakdown according to hostel council norms"
            icon={<Receipt className="w-5 h-5" />}
          />

          <div className="space-y-2.5 text-xs">
            <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 border border-slate-200/80">
              <span className="font-semibold text-slate-700">Hostel Accommodation & Utilities</span>
              <span className="font-mono font-bold text-slate-900">
                ₹{paymentBreakdown.hostelFee.toLocaleString('en-IN')}
              </span>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 border border-slate-200/80">
              <span className="font-semibold text-slate-700">Mess & Dining Advance</span>
              <span className="font-mono font-bold text-slate-900">
                ₹{paymentBreakdown.messFee.toLocaleString('en-IN')}
              </span>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 border border-slate-200/80">
              <span className="font-semibold text-slate-700">Hostel Maintenance & Common Room Fund</span>
              <span className="font-mono font-bold text-slate-900">
                ₹{paymentBreakdown.maintenanceFee.toLocaleString('en-IN')}
              </span>
            </div>

            <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-xs">
              <span className="font-bold text-slate-500 uppercase">Total Billable Amount</span>
              <span className="font-mono font-extrabold text-slate-900 text-sm">
                ₹{totalFee.toLocaleString('en-IN')}
              </span>
            </div>

            <div className="flex items-center justify-between text-xs text-emerald-600 font-semibold">
              <span>Paid / Settled</span>
              <span className="font-mono font-bold">
                - ₹{paymentBreakdown.paidAmount.toLocaleString('en-IN')}
              </span>
            </div>

            <div className="flex items-center justify-between text-xs text-blue-600 font-extrabold pt-1">
              <span>Net Balance Due</span>
              <span className="font-mono text-base">
                ₹{paymentBreakdown.dueAmount.toLocaleString('en-IN')}
              </span>
            </div>
          </div>
        </Card>
      </div>

      {/* Payment History & Downloadable Receipts */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-900">Transaction History & Receipts</h3>
          <span className="text-xs text-slate-500 font-mono">{transactions.length} Transactions</span>
        </div>

        <div className="space-y-3">
          {transactions.map((txn) => (
            <Card
              key={txn.id}
              className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs"
            >
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 text-sm">{txn.category}</span>
                    <Badge variant="success" size="sm">
                      {txn.status}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 text-slate-500 font-mono text-[11px] mt-0.5">
                    <span>{txn.transactionId}</span>
                    <span>•</span>
                    <span>{txn.date}</span>
                    <span>•</span>
                    <span className="text-slate-700">{txn.paymentMethod}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0">
                <div className="text-right">
                  <p className="text-base font-black font-mono text-slate-900">
                    ₹{txn.amount.toLocaleString('en-IN')}
                  </p>
                  <p className="text-[10px] text-slate-400 font-mono">{txn.receiptNumber}</p>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    icon={FileText}
                    onClick={() => setSelectedReceipt(txn)}
                  >
                    View Receipt
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    icon={Download}
                    onClick={() => handleDownloadReceipt(txn)}
                  />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Printable Receipt Modal */}
      {selectedReceipt && (
        <Modal
          isOpen={Boolean(selectedReceipt)}
          onClose={() => setSelectedReceipt(null)}
          title="Official Student Payment Receipt"
          subtitle="Hostel Block B Accounts Department"
          maxWidth="md"
        >
          <div className="space-y-4">
            {/* Receipt UI Sheet */}
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 text-xs space-y-4 font-sans">
              {/* Receipt Top */}
              <div className="flex items-start justify-between pb-4 border-b border-slate-200">
                <div>
                  <h4 className="text-base font-black text-slate-900 tracking-tight">HOSTELO TREASURY</h4>
                  <p className="text-[10px] text-slate-500 font-mono">GSTIN: 07AAACH1234F1Z8</p>
                </div>
                <div className="text-right">
                  <Badge variant="success" size="md">PAID IN FULL</Badge>
                  <p className="text-[10px] font-mono text-slate-500 mt-1">{selectedReceipt.receiptNumber}</p>
                </div>
              </div>

              {/* Student & Txn Info */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400">Student Name</span>
                  <p className="font-bold text-slate-900">{profile.name}</p>
                  <p className="text-slate-500">{profile.studentId}</p>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400">Room & Block</span>
                  <p className="font-bold text-slate-900 font-mono">{profile.room}</p>
                  <p className="text-slate-500">{profile.hostel}</p>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400">Transaction ID</span>
                  <p className="font-mono text-slate-800">{selectedReceipt.transactionId}</p>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400">Payment Date</span>
                  <p className="font-mono text-slate-800">{selectedReceipt.date}</p>
                </div>
              </div>

              {/* Amount Box */}
              <div className="bg-white p-3.5 rounded-xl border border-slate-200 flex items-center justify-between">
                <div>
                  <p className="font-bold text-slate-900">{selectedReceipt.category}</p>
                  <p className="text-[10px] text-slate-500">Method: {selectedReceipt.paymentMethod}</p>
                </div>
                <p className="text-xl font-black font-mono text-slate-900">
                  ₹{selectedReceipt.amount.toLocaleString('en-IN')}
                </p>
              </div>

              <div className="pt-2 flex items-center justify-between text-[10px] text-slate-400 font-mono border-t border-slate-200">
                <span>Authorized Digital Stamp</span>
                <span>Generated by Hostelo v2.4</span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <Button
                variant="outline"
                size="sm"
                icon={Download}
                onClick={() => {
                  handleDownloadReceipt(selectedReceipt);
                  setSelectedReceipt(null);
                }}
              >
                Download PDF
              </Button>
              <Button variant="primary" size="sm" onClick={() => setSelectedReceipt(null)}>
                Done
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
