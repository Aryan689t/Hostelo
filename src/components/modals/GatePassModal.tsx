import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { Input } from '../common/Input';
import { Select } from '../common/Select';
import { Button } from '../common/Button';
import { useHostelo } from '../../context/HosteloContext';
import type { GatePass } from '../../types';

interface GatePassModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPassGenerated?: (pass: GatePass) => void;
}

export const GatePassModal: React.FC<GatePassModalProps> = ({
  isOpen,
  onClose,
  onPassGenerated,
}) => {
  const { createGatePass, profile } = useHostelo();

  const [purpose, setPurpose] = useState('Stationery & Tech Bookstore Visit');
  const [date, setDate] = useState('Today');
  const [exitTime, setExitTime] = useState('06:00 PM');
  const [expectedReturn, setExpectedReturn] = useState('09:00 PM');
  const [destination, setDestination] = useState('City Center Mall / Tech District');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!purpose.trim() || !destination.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const generated = createGatePass({
        purpose,
        date,
        exitTime,
        expectedReturn,
        destination,
      });
      setIsSubmitting(false);
      onClose();
      if (onPassGenerated) onPassGenerated(generated);
    }, 400);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Request Digital Gate Pass"
      subtitle="Fast temporary outing pass approved instantly for valid hours (till 10:00 PM)"
      maxWidth="md"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Student Info preview */}
        <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 flex items-center justify-between text-xs">
          <div>
            <span className="text-slate-500">Student:</span>{' '}
            <span className="font-semibold text-slate-900">{profile.name}</span>
          </div>
          <div>
            <span className="text-slate-500">Room:</span>{' '}
            <span className="font-mono font-bold text-blue-600">{profile.room}</span>
          </div>
          <div>
            <span className="text-slate-500">Hostel:</span>{' '}
            <span className="font-semibold text-slate-900">{profile.hostel}</span>
          </div>
        </div>

        <Input
          label="Purpose of Outing"
          placeholder="e.g. Buying medicines, dinner with parents, project work"
          value={purpose}
          onChange={(e) => setPurpose(e.target.value)}
          required
        />

        <Input
          label="Destination / Location"
          placeholder="e.g. City Center Mall, Metro Station, South Ext"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          required
        />

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Select
            label="Date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            options={[
              { value: 'Today', label: 'Today (Immediate)' },
              { value: 'Tomorrow', label: 'Tomorrow' },
            ]}
          />

          <Input
            label="Exit Time"
            placeholder="06:00 PM"
            value={exitTime}
            onChange={(e) => setExitTime(e.target.value)}
            required
          />

          <Input
            label="Expected Return"
            placeholder="09:00 PM"
            value={expectedReturn}
            onChange={(e) => setExpectedReturn(e.target.value)}
            required
            helperText="Before 10:00 PM curfew"
          />
        </div>

        <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2.5">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" isLoading={isSubmitting}>
            Generate Digital Ticket
          </Button>
        </div>
      </form>
    </Modal>
  );
};
