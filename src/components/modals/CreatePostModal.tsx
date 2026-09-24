import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { Input, Textarea } from '../common/Input';
import { Select } from '../common/Select';
import { Button } from '../common/Button';
import { useHostelo } from '../../context/HosteloContext';
import type { PostCategory } from '../../types';

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreatePostModal: React.FC<CreatePostModalProps> = ({ isOpen, onClose }) => {
  const { createPost } = useHostelo();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState<PostCategory>('general');
  const [price, setPrice] = useState<string>('');
  const [eventDate, setEventDate] = useState<string>('');
  const [tag, setTag] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      createPost({
        title,
        content,
        category,
        price: price ? parseFloat(price) : undefined,
        eventDate: eventDate || undefined,
        tag: tag || undefined,
      });
      setIsSubmitting(false);
      onClose();
      // Reset
      setTitle('');
      setContent('');
      setCategory('general');
      setPrice('');
      setEventDate('');
    }, 400);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Create Community Post"
      subtitle="Share announcements, buy/sell, find lost items, or start study groups"
      maxWidth="md"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <Select
          label="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value as PostCategory)}
          options={[
            { value: 'general', label: 'General Discussion' },
            { value: 'lost_found', label: 'Lost & Found' },
            { value: 'marketplace', label: 'Marketplace (Buy / Sell)' },
            { value: 'events', label: 'Hostel Events & Gatherings' },
            { value: 'study', label: 'Study Circles & Exam Prep' },
            { value: 'sports', label: 'Sports & Gaming' },
            { value: 'other', label: 'Other' },
          ]}
        />

        <Input
          label="Post Title"
          placeholder="e.g. Selling semester 3 reference books / Study group on Saturday"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        {category === 'marketplace' && (
          <Input
            label="Price (₹ INR)"
            type="number"
            placeholder="e.g. 650"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            helperText="Set a fair price for fellow hostel students"
          />
        )}

        {category === 'events' && (
          <Input
            label="Event Date & Time"
            placeholder="e.g. Saturday 6:00 PM at Basketball Court"
            value={eventDate}
            onChange={(e) => setEventDate(e.target.value)}
            required
          />
        )}

        <Textarea
          label="Post Description"
          placeholder="Write your post details here..."
          rows={4}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />

        <Input
          label="Custom Tag (Optional)"
          placeholder="e.g. URGENT, FREE, STUDY GROUP"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
        />

        <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2.5">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" isLoading={isSubmitting}>
            Publish to Feed
          </Button>
        </div>
      </form>
    </Modal>
  );
};
