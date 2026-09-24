export type ActiveTab = 
  | 'landing'
  | 'dashboard'
  | 'community'
  | 'voting'
  | 'mess'
  | 'leave'
  | 'gatepass'
  | 'packages'
  | 'complaints'
  | 'payments'
  | 'announcements'
  | 'profile';

export interface StudentProfile {
  name: string;
  studentId: string;
  course: string;
  year: string;
  hostel: string;
  block: string;
  room: string;
  phone: string;
  email: string;
  emergencyContact: {
    name: string;
    relation: string;
    phone: string;
  };
  attendance: string;
  avatar: string;
  bloodGroup: string;
  guardianName: string;
}

export type PostCategory = 'general' | 'lost_found' | 'marketplace' | 'events' | 'study' | 'sports' | 'other';

export interface CommentItem {
  id: string;
  studentName: string;
  studentAvatar: string;
  studentRoom: string;
  timestamp: string;
  content: string;
}

export interface CommunityPost {
  id: string;
  studentName: string;
  studentRoom: string;
  studentAvatar: string;
  timestamp: string;
  category: PostCategory;
  title: string;
  content: string;
  likes: number;
  hasLiked: boolean;
  comments: CommentItem[];
  price?: number;
  isItemSold?: boolean;
  eventDate?: string;
  tag?: string;
}

export interface PollOption {
  id: string;
  label: string;
  votes: number;
}

export interface PollItem {
  id: string;
  title: string;
  description: string;
  category: string;
  options: PollOption[];
  totalVotes: number;
  userVotedOptionId?: string;
  expiresAt: string;
  status: 'active' | 'completed';
  highlightBadge?: string;
}

export type DayOfWeek = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';

export interface MealDetail {
  menu: string;
  timing: string;
  special?: string;
  calories?: string;
}

export interface DayMessMenu {
  day: DayOfWeek;
  breakfast: MealDetail;
  lunch: MealDetail;
  snacks: MealDetail;
  dinner: MealDetail;
}

export interface MessFeedback {
  id: string;
  studentName: string;
  date: string;
  mealType: 'Breakfast' | 'Lunch' | 'Snacks' | 'Dinner';
  rating: number;
  comment: string;
  timestamp: string;
}

export interface MessRegulation {
  id: string;
  title: string;
  timings?: string;
  points: string[];
}

export type LeaveType = 'Day Leave' | 'Weekend Leave' | 'Home Visit' | 'Emergency Leave' | 'Other';
export type LeaveStatus = 'Pending' | 'Approved' | 'Rejected' | 'Completed';

export interface LeavePass {
  id: string;
  leaveType: LeaveType;
  fromDate: string;
  toDate: string;
  reason: string;
  destination: string;
  emergencyContact: string;
  expectedReturnTime: string;
  status: LeaveStatus;
  appliedAt: string;
  approvedBy?: string;
  remarks?: string;
}

export type GatePassStatus = 'APPROVED' | 'EXPIRED' | 'USED' | 'PENDING';

export interface GatePass {
  id: string;
  studentName: string;
  room: string;
  hostel: string;
  passId: string;
  purpose: string;
  date: string;
  exitTime: string;
  expectedReturn: string;
  destination: string;
  status: GatePassStatus;
  generatedAt: string;
  validityRange: string;
}

export type PackageStatus = 'In Transit' | 'Arrived' | 'Ready for Pickup' | 'Collected';

export interface PackageItem {
  id: string;
  packageId: string;
  deliveryCompany: string;
  arrivalDate: string;
  studentName: string;
  roomNumber: string;
  status: PackageStatus;
  claimOtp: string;
  shelfLocation: string;
  courierIcon?: string;
}

export type ComplaintCategory = 
  | 'Electrical'
  | 'Plumbing'
  | 'Cleaning'
  | 'Internet/Wi-Fi'
  | 'Furniture'
  | 'Mess'
  | 'Security'
  | 'Room'
  | 'Other';

export type ComplaintPriority = 'Low' | 'Medium' | 'Urgent';
export type ComplaintStatus = 'Submitted' | 'Assigned' | 'In Progress' | 'Resolved';

export interface ComplaintUpdate {
  timestamp: string;
  note: string;
  status: ComplaintStatus;
}

export interface ComplaintItem {
  id: string;
  ticketId: string;
  title: string;
  category: ComplaintCategory;
  description: string;
  roomNumber: string;
  priority: ComplaintPriority;
  submittedAt: string;
  status: ComplaintStatus;
  assignedTechnician?: string;
  updates: ComplaintUpdate[];
}

export interface PaymentBreakdown {
  hostelFee: number;
  messFee: number;
  maintenanceFee: number;
  paidAmount: number;
  dueAmount: number;
}

export interface TransactionItem {
  id: string;
  transactionId: string;
  date: string;
  amount: number;
  category: string;
  status: 'Success' | 'Pending' | 'Failed';
  paymentMethod: string;
  receiptNumber: string;
  sem: string;
}

export interface AnnouncementItem {
  id: string;
  title: string;
  content: string;
  category: 'Maintenance' | 'Inspection' | 'Mess' | 'General' | 'Urgent' | 'Academic';
  date: string;
  read: boolean;
  author: string;
  authorRole: string;
  isUrgent?: boolean;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: 'pass' | 'package' | 'poll' | 'complaint' | 'payment' | 'announcement' | 'community';
  timestamp: string;
  read: boolean;
  targetTab?: ActiveTab;
}
