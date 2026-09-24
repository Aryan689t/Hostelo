import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { Input, Textarea } from '../common/Input';
import { Select } from '../common/Select';
import { Button } from '../common/Button';
import { useHostelo } from '../../context/HosteloContext';
import type { LeaveType } from '../../types';

interface LeavePassModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LeavePassModal: React.FC<LeavePassModalProps> = ({ isOpen, onClose }) => {
  const { createLeavePass, profile } = useHostelo();

  const [leaveType, setLeaveType] = useState<LeaveType>('Home Visit');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [reason, setReason] = useState('');
  const [destination, setDestination] = useState('');
  const [emergencyContact, setEmergencyContact] = useState(
    `${profile.emergencyContact.phone} (${profile.emergencyContact.relation} - ${profile.emergencyContact.name})`
  );
  const [expectedReturnTime, setExpectedReturnTime] = useState('08:00 PM');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fromDate || !toDate || !reason || !destination) return;

    setIsSubmitting(true);
    setTimeout(() => {
      createLeavePass({
        leaveType,
        fromDate,
        toDate,
        reason,
        destination,
        emergencyContact,
        expectedReturnTime,
      });
      setIsSubmitting(false);
      onClose();
    }, 400);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Apply for Outstation / Leave Pass"
      subtitle="Requires parental verification and Chief Warden approval"
      maxWidth="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Select
            label="Leave Category"
            value={leaveType}
            onChange={(e) => setLeaveType(e.target.value as LeaveType)}
            options={[
              { value: 'Home Visit', label: 'Home Visit (Vacation / Family)' },
              { value: 'Weekend Leave', label: 'Weekend Leave (Local Guardian)' },
              { value: 'Emergency Leave', label: 'Emergency Leave (Medical / Urgent)' },
              { value: 'Day Leave', label: 'Day Outing (Full Day)' },
              { value: 'Other', label: 'Other Academic / Official Duty' },
            ]}
          />

          <Input
            label="Expected Return Time"
            placeholder="e.g. 08:00 PM"
            value={expectedReturnTime}
            onChange={(e) => setExpectedReturnTime(e.target.value)}
            required
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="From Date"
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            required
          />

          <Input
            label="To Date"
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            required
          />
        </div>

        <Input
          label="Destination Address & City"
          placeholder="e.g. 42, Civil Lines, Jaipur, Rajasthan"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          required
        />

        <Textarea
          label="Reason for Leave"
          placeholder="Please describe the purpose of your leave in detail..."
          rows={3}
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          required
        />

        <Input
          label="Emergency Parent / Guardian Contact"
          placeholder="Phone & Name"
          value={emergencyContact}
          onChange={(e) => setEmergencyContact(e.target.value)}
          required
          helperText="SMS verification token will be dispatched to this number"
        />

        <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2.5">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" isLoading={isSubmitting}>
            Submit Leave Request
          </Button>
        </div>
      </form>
    </Modal>
  );
};
