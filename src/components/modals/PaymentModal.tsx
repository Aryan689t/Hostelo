import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { Input } from '../common/Input';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { useHostelo } from '../../context/HosteloContext';
import { CheckCircle2, CreditCard, Smartphone, Building2, ShieldCheck, Lock } from 'lucide-react';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultAmount?: number;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  defaultAmount,
}) => {
  const { paymentBreakdown, processPayment } = useHostelo();

  const [amount, setAmount] = useState<number>(defaultAmount || paymentBreakdown.dueAmount || 1250);
  const [methodTab, setMethodTab] = useState<'upi' | 'card' | 'netbanking'>('upi');
  const [upiApp, setUpiApp] = useState<'gpay' | 'phonepe' | 'paytm' | 'id'>('gpay');
  const [customUpiId, setCustomUpiId] = useState('aarav@okaxis');
  const [cardNumber, setCardNumber] = useState('4532 •••• •••• 8912');
  const [selectedBank, setSelectedBank] = useState('HDFC Bank');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [txnSummary, setTxnSummary] = useState<{ id: string; amount: number; method: string } | null>(null);

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    if (amount <= 0) return;

    setIsProcessing(true);
    const methodString = 
      methodTab === 'upi' ? `UPI • ${upiApp === 'gpay' ? 'Google Pay' : upiApp === 'phonepe' ? 'PhonePe' : upiApp === 'paytm' ? 'Paytm' : customUpiId}` :
      methodTab === 'card' ? `Card •• ${cardNumber.slice(-4) || '8912'}` :
      `${selectedBank} NetBanking`;

    setTimeout(() => {
      processPayment(amount, methodString);
      setIsProcessing(false);
      setIsSuccess(true);
      setTxnSummary({
        id: `TXN-${Math.floor(10000000 + Math.random() * 90000000)}`,
        amount,
        method: methodString,
      });
    }, 1200);
  };

  const handleClose = () => {
    setIsSuccess(false);
    setIsProcessing(false);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={isSuccess ? 'Payment Successful' : 'Pay Hostel & Mess Dues'}
      subtitle={isSuccess ? 'Hostel account ledger updated instantly' : 'Secure instant payment portal with 0% gateway surcharge'}
      maxWidth="md"
    >
      {isSuccess && txnSummary ? (
        <div className="text-center py-4 space-y-4 animate-fade-in">
          <div className="w-14 h-14 bg-emerald-50 border border-emerald-200 rounded-full flex items-center justify-center text-emerald-600 mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div>
            <h3 className="text-xl font-extrabold text-slate-900">
              ₹{txnSummary.amount.toLocaleString('en-IN')} Paid
            </h3>
            <p className="text-xs text-slate-500 mt-1">Transaction ID: {txnSummary.id}</p>
          </div>

          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 text-xs text-left space-y-2">
            <div className="flex justify-between">
              <span className="text-slate-500">Payment Mode:</span>
              <span className="font-semibold text-slate-900">{txnSummary.method}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Account:</span>
              <span className="font-semibold text-slate-900">Hostel Block B Treasury</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Status:</span>
              <Badge variant="success" size="sm">SETTLED</Badge>
            </div>
          </div>

          <div className="pt-2 flex items-center justify-center gap-2">
            <Button variant="primary" onClick={handleClose}>
              View Updated Ledger
            </Button>
          </div>
        </div>
      ) : (
        <form onSubmit={handlePay} className="space-y-4">
          {/* Amount Box */}
          <div className="bg-blue-50/70 p-4 rounded-xl border border-blue-100 flex items-center justify-between">
            <div>
              <p className="text-xs text-blue-900 font-medium">Outstanding Balance</p>
              <p className="text-2xl font-extrabold text-blue-950 mt-0.5">
                ₹{paymentBreakdown.dueAmount.toLocaleString('en-IN')}
              </p>
            </div>
            <div className="w-32">
              <Input
                label="Amount to Pay"
                type="number"
                value={amount}
                max={paymentBreakdown.dueAmount || 50000}
                onChange={(e) => setAmount(Number(e.target.value))}
                required
              />
            </div>
          </div>

          {/* Payment Method Tabs */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">
              Choose Payment Method
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setMethodTab('upi')}
                className={`py-2 px-3 rounded-lg border text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  methodTab === 'upi'
                    ? 'border-blue-600 bg-blue-50 text-blue-700 shadow-xs'
                    : 'border-slate-200 hover:bg-slate-50 text-slate-600'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>UPI Fast</span>
              </button>

              <button
                type="button"
                onClick={() => setMethodTab('card')}
                className={`py-2 px-3 rounded-lg border text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  methodTab === 'card'
                    ? 'border-blue-600 bg-blue-50 text-blue-700 shadow-xs'
                    : 'border-slate-200 hover:bg-slate-50 text-slate-600'
                }`}
              >
                <CreditCard className="w-3.5 h-3.5" />
                <span>Cards</span>
              </button>

              <button
                type="button"
                onClick={() => setMethodTab('netbanking')}
                className={`py-2 px-3 rounded-lg border text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  methodTab === 'netbanking'
                    ? 'border-blue-600 bg-blue-50 text-blue-700 shadow-xs'
                    : 'border-slate-200 hover:bg-slate-50 text-slate-600'
                }`}
              >
                <Building2 className="w-3.5 h-3.5" />
                <span>NetBanking</span>
              </button>
            </div>
          </div>

          {/* UPI Method UI */}
          {methodTab === 'upi' && (
            <div className="space-y-3 pt-1">
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'gpay', name: 'Google Pay' },
                  { id: 'phonepe', name: 'PhonePe' },
                  { id: 'paytm', name: 'Paytm UPI' },
                ].map((app) => (
                  <button
                    key={app.id}
                    type="button"
                    onClick={() => setUpiApp(app.id as any)}
                    className={`p-2.5 rounded-lg border text-xs text-center font-medium cursor-pointer transition-colors ${
                      upiApp === app.id
                        ? 'border-blue-500 bg-blue-50/60 text-blue-700 font-bold'
                        : 'border-slate-200 hover:border-slate-300 text-slate-700'
                    }`}
                  >
                    {app.name}
                  </button>
                ))}
              </div>

              <Input
                label="Or Enter VPA / UPI ID"
                value={customUpiId}
                onChange={(e) => {
                  setCustomUpiId(e.target.value);
                  setUpiApp('id');
                }}
                placeholder="username@upi"
                helperText="App notification will be pushed for 1-click authorization"
              />
            </div>
          )}

          {/* Card Method UI */}
          {methodTab === 'card' && (
            <div className="space-y-3 pt-1">
              <Input
                label="Card Number"
                placeholder="4532 0000 0000 8912"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                required
              />
              <div className="grid grid-cols-2 gap-3">
                <Input label="Expiry (MM/YY)" placeholder="08/28" defaultValue="08/28" required />
                <Input label="CVV" placeholder="•••" defaultValue="491" type="password" required />
              </div>
            </div>
          )}

          {/* Net Banking UI */}
          {methodTab === 'netbanking' && (
            <div className="space-y-3 pt-1">
              <div className="grid grid-cols-2 gap-2">
                {['HDFC Bank', 'State Bank of India', 'ICICI Bank', 'Axis Bank'].map((bank) => (
                  <button
                    key={bank}
                    type="button"
                    onClick={() => setSelectedBank(bank)}
                    className={`p-2.5 rounded-lg border text-xs font-medium cursor-pointer transition-colors text-left ${
                      selectedBank === bank
                        ? 'border-blue-500 bg-blue-50/60 text-blue-700 font-bold'
                        : 'border-slate-200 hover:border-slate-300 text-slate-700'
                    }`}
                  >
                    {bank}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="flex items-center gap-1.5 text-[11px] text-slate-500 pt-1">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>256-bit bank-grade simulated encryption. Instant receipt generation.</span>
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2.5">
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" isLoading={isProcessing} icon={Lock}>
              Pay ₹{amount.toLocaleString('en-IN')} Now
            </Button>
          </div>
        </form>
      )}
    </Modal>
  );
};
