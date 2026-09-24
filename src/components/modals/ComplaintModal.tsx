import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { Input, Textarea } from '../common/Input';
import { Select } from '../common/Select';
import { Button } from '../common/Button';
import { useHostelo } from '../../context/HosteloContext';
import type { ComplaintCategory, ComplaintPriority } from '../../types';
import { UploadCloud } from 'lucide-react';

interface ComplaintModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ComplaintModal: React.FC<ComplaintModalProps> = ({ isOpen, onClose }) => {
  const { createComplaint, profile } = useHostelo();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<ComplaintCategory>('Internet/Wi-Fi');
  const [description, setDescription] = useState('');
  const [roomNumber, setRoomNumber] = useState(profile.room);
  const [priority, setPriority] = useState<ComplaintPriority>('Medium');
  const [hasImage, setHasImage] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      createComplaint({
        title,
        category,
        description,
        roomNumber,
        priority,
      });
      setIsSubmitting(false);
      onClose();
    }, 400);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="File Maintenance / Hostel Complaint"
      subtitle="Tickets are routed directly to hostel facility supervisors and electricians"
      maxWidth="md"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Complaint Summary"
          placeholder="e.g. Wi-Fi not connecting in room / Low water pressure"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Select
            label="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value as ComplaintCategory)}
            options={[
              { value: 'Internet/Wi-Fi', label: 'Internet / Wi-Fi Access' },
              { value: 'Electrical', label: 'Electrical (Fan, Light, Switch)' },
              { value: 'Plumbing', label: 'Plumbing & Washrooms' },
              { value: 'Cleaning', label: 'Room & Corridor Cleaning' },
              { value: 'Furniture', label: 'Furniture / Bed / Wardrobe' },
              { value: 'Mess', label: 'Mess & Food Quality' },
              { value: 'Security', label: 'Security & Key Lock' },
              { value: 'Room', label: 'Room Maintenance' },
              { value: 'Other', label: 'Other Facilities' },
            ]}
          />

          <Select
            label="Priority Level"
            value={priority}
            onChange={(e) => setPriority(e.target.value as ComplaintPriority)}
            options={[
              { value: 'Low', label: 'Low (General attention)' },
              { value: 'Medium', label: 'Medium (Within 24 hours)' },
              { value: 'Urgent', label: 'Urgent (Emergency repair)' },
            ]}
          />
        </div>

        <Input
          label="Room Number / Location"
          value={roomNumber}
          onChange={(e) => setRoomNumber(e.target.value)}
          placeholder="e.g. B-204 or Block B 2nd Floor Corridor"
          required
        />

        <Textarea
          label="Detailed Description"
          placeholder="Explain the problem and when it started occurring..."
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        {/* Optional Image Upload UI */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
            Attach Photo (Optional)
          </label>
          <div
            onClick={() => setHasImage(!hasImage)}
            className={`border border-dashed rounded-lg p-3 text-center cursor-pointer transition-colors ${
              hasImage
                ? 'border-blue-500 bg-blue-50/50 text-blue-700'
                : 'border-slate-300 hover:border-slate-400 bg-slate-50 text-slate-500'
            }`}
          >
            <UploadCloud className="w-5 h-5 mx-auto mb-1 text-slate-400" />
            <p className="text-xs font-medium">
              {hasImage ? '✓ Photo attached (photo_evidence.jpg)' : 'Click to simulate photo upload'}
            </p>
            <p className="text-[10px] text-slate-400 mt-0.5">PNG, JPG up to 5MB</p>
          </div>
        </div>

        <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2.5">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" isLoading={isSubmitting}>
            Log Complaint Ticket
          </Button>
        </div>
      </form>
    </Modal>
  );
};
