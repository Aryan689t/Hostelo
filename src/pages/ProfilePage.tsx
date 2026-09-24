import React, { useState } from 'react';
import {
  User,
  Mail,
  Phone,
  ShieldCheck,
  Edit3,
  Bell,
  LogOut,
} from 'lucide-react';
import { useHostelo } from '../context/HosteloContext';
import { Card, CardHeader } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { Avatar } from '../components/common/Avatar';
import { Input } from '../components/common/Input';
import { Modal } from '../components/common/Modal';

export const ProfilePage: React.FC = () => {
  const { profile, updateProfile, setActiveTab, showToast } = useHostelo();

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [name, setName] = useState(profile.name);
  const [phone, setPhone] = useState(profile.phone);
  const [email, setEmail] = useState(profile.email);
  const [course, setCourse] = useState(profile.course);
  const [room, setRoom] = useState(profile.room);
  const [emergencyPhone, setEmergencyPhone] = useState(profile.emergencyContact.phone);
  const [emergencyName, setEmergencyName] = useState(profile.emergencyContact.name);

  // Preference switches state
  const [smsNotif, setSmsNotif] = useState(true);
  const [messReminder, setMessReminder] = useState(true);
  const [packageAlert, setPackageAlert] = useState(true);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      name,
      phone,
      email,
      course,
      room,
      emergencyContact: {
        name: emergencyName,
        relation: profile.emergencyContact.relation,
        phone: emergencyPhone,
      },
    });
    setIsEditModalOpen(false);
  };

  return (
    <div className="space-y-8 animate-fade-in max-w-5xl mx-auto pb-16">
      {/* Profile Header Hero Card */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <Avatar name={profile.name} src={profile.avatar} size="xl" />
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                  {profile.name}
                </h2>
                <Badge variant="primary" size="sm">Verified Resident</Badge>
              </div>
              <p className="text-xs text-slate-500 font-mono mt-0.5">{profile.studentId}</p>
              <p className="text-xs text-slate-700 font-medium mt-1">
                {profile.course} • {profile.year}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Button
              variant="outline"
              size="sm"
              icon={Edit3}
              onClick={() => setIsEditModalOpen(true)}
              className="flex-1 sm:flex-initial"
            >
              Edit Profile
            </Button>
            <Button
              variant="secondary"
              size="sm"
              icon={LogOut}
              onClick={() => {
                showToast('Signed out of session', 'info');
                setActiveTab('landing');
              }}
              className="flex-1 sm:flex-initial"
            >
              Logout
            </Button>
          </div>
        </div>

        {/* Room & Allocation Quick Pills */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-slate-100 text-xs">
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/70">
            <span className="text-[10px] uppercase font-bold text-slate-400">Assigned Room</span>
            <p className="text-base font-extrabold font-mono text-blue-600 mt-0.5">{profile.room}</p>
            <p className="text-[11px] text-slate-500">2nd Floor, North</p>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/70">
            <span className="text-[10px] uppercase font-bold text-slate-400">Hostel Building</span>
            <p className="text-base font-bold text-slate-900 mt-0.5">{profile.hostel}</p>
            <p className="text-[11px] text-slate-500">{profile.block}</p>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/70">
            <span className="text-[10px] uppercase font-bold text-slate-400">Hostel Attendance</span>
            <p className="text-base font-extrabold font-mono text-emerald-600 mt-0.5">{profile.attendance}</p>
            <p className="text-[11px] text-slate-500">Above 85% requirement</p>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/70">
            <span className="text-[10px] uppercase font-bold text-slate-400">Blood Group</span>
            <p className="text-base font-bold font-mono text-rose-600 mt-0.5">{profile.bloodGroup}</p>
            <p className="text-[11px] text-slate-500">Medical Record Logged</p>
          </div>
        </div>
      </div>

      {/* Grid: Contact Information & Settings */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Contact & Parent Information */}
        <Card className="space-y-4">
          <CardHeader
            title="Student Credentials & Contact"
            subtitle="Official institutional records"
            icon={<ShieldCheck className="w-5 h-5 text-blue-600" />}
          />

          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-200/70">
              <span className="text-slate-500 flex items-center gap-1.5">
                <Mail className="w-4 h-4 text-slate-400" /> University Email
              </span>
              <span className="font-mono font-bold text-slate-900">{profile.email}</span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-200/70">
              <span className="text-slate-500 flex items-center gap-1.5">
                <Phone className="w-4 h-4 text-slate-400" /> Mobile Phone
              </span>
              <span className="font-mono font-bold text-slate-900">{profile.phone}</span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-200/70">
              <span className="text-slate-500 flex items-center gap-1.5">
                <User className="w-4 h-4 text-slate-400" /> Parent / Guardian
              </span>
              <span className="font-bold text-slate-900">{profile.emergencyContact.name} ({profile.emergencyContact.relation})</span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-200/70">
              <span className="text-slate-500 flex items-center gap-1.5">
                <Phone className="w-4 h-4 text-slate-400" /> Emergency Contact
              </span>
              <span className="font-mono font-bold text-slate-900">{profile.emergencyContact.phone}</span>
            </div>
          </div>
        </Card>

        {/* Preferences & Notification Toggles */}
        <Card className="space-y-4">
          <CardHeader
            title="Notification & System Preferences"
            subtitle="Manage real-time communication channels"
            icon={<Bell className="w-5 h-5 text-indigo-600" />}
          />

          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-200/70">
              <div>
                <p className="font-bold text-slate-900">SMS Outing & Gate Pass Confirmations</p>
                <p className="text-[11px] text-slate-500">Push SMS notifications upon security scan</p>
              </div>
              <input
                type="checkbox"
                checked={smsNotif}
                onChange={(e) => setSmsNotif(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-200/70">
              <div>
                <p className="font-bold text-slate-900">Mess Menu Special Alerts</p>
                <p className="text-[11px] text-slate-500">Get notified for feast lunches & special dinners</p>
              </div>
              <input
                type="checkbox"
                checked={messReminder}
                onChange={(e) => setMessReminder(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-200/70">
              <div>
                <p className="font-bold text-slate-900">Package Delivery OTP Notifications</p>
                <p className="text-[11px] text-slate-500">Instant notification when a parcel arrives at reception</p>
              </div>
              <input
                type="checkbox"
                checked={packageAlert}
                onChange={(e) => setPackageAlert(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded cursor-pointer"
              />
            </div>

            <div className="pt-2 text-right">
              <span className="text-[11px] text-emerald-600 font-medium">✓ Preferences automatically saved</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Edit Profile Modal */}
      {isEditModalOpen && (
        <Modal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          title="Edit Student Profile Details"
          subtitle="Changes will reflect across hostel attendance and passes"
          maxWidth="md"
        >
          <form onSubmit={handleSaveProfile} className="space-y-4">
            <Input
              label="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <div className="grid grid-cols-2 gap-3">
              <Input
                label="Mobile Phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
              <Input
                label="Room Number"
                value={room}
                onChange={(e) => setRoom(e.target.value)}
                required
              />
            </div>

            <Input
              label="Institutional Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <Input
              label="Degree / Department"
              value={course}
              onChange={(e) => setCourse(e.target.value)}
              required
            />

            <div className="grid grid-cols-2 gap-3">
              <Input
                label="Parent Name"
                value={emergencyName}
                onChange={(e) => setEmergencyName(e.target.value)}
                required
              />
              <Input
                label="Emergency Phone"
                value={emergencyPhone}
                onChange={(e) => setEmergencyPhone(e.target.value)}
                required
              />
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2.5">
              <Button type="button" variant="outline" onClick={() => setIsEditModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" variant="primary">
                Save Changes
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
