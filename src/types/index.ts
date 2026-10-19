export type UserRole = 'admin' | 'therapist' | 'parent';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  title: string;
  assignedChildId?: string; // For parent persona (e.g. Liam Jenkins)
  therapistId?: string; // For therapist persona (e.g. Michael Chen)
}

export interface Guardian {
  id: string;
  name: string;
  relationship: string;
  phone: string;
  email: string;
  address: string;
  preferredContactMethod: 'phone' | 'email' | 'sms';
}

export interface Goal {
  id: string;
  title: string;
  category: 'Speech' | 'Motor Skills' | 'Behavioral' | 'Sensory' | 'Social' | 'Life Skills';
  targetDate: string;
  baseline: string;
  currentProgress: number; // 0 - 100%
  status: 'not_started' | 'in_progress' | 'mastered';
  notes: string;
}

export interface Child {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  age: number;
  gender: 'Male' | 'Female' | 'Non-Binary';
  primaryDiagnosis: string;
  secondaryDiagnosis?: string;
  enrollmentDate: string;
  status: 'active' | 'in_review' | 'graduated' | 'on_hold';
  guardian: Guardian;
  assignedTherapistId: string;
  assignedTherapistName: string;
  programIds: string[];
  emergencyContact: string;
  allergiesSensoryNotes: string;
  goals: Goal[];
  avatar: string;
  notes?: string;
}

export interface Therapist {
  id: string;
  name: string;
  title: string;
  credentials: string; // e.g. "MS, OTR/L", "M.S., CCC-SLP", "BCBA"
  email: string;
  phone: string;
  bio: string;
  specializations: string[];
  activeCaseloadCount: number;
  weeklyHours: number;
  availability: string[];
  avatar: string;
  joinedYear: number;
  roomPreference?: string;
}

export interface Program {
  id: string;
  title: string;
  category: string;
  description: string;
  detailedOverview: string;
  durationMinutes: number;
  ageRange: string;
  leadTherapistId: string;
  leadTherapistName: string;
  maxCapacity: number;
  enrolledCount: number;
  iconName: string;
  scheduleDescription: string;
  objectives: string[];
  benefits: string[];
}

export type AppointmentStatus = 'scheduled' | 'confirmed' | 'completed' | 'cancelled' | 'no_show';

export interface Appointment {
  id: string;
  childId: string;
  childName: string;
  therapistId: string;
  therapistName: string;
  programId: string;
  programTitle: string;
  date: string; // YYYY-MM-DD
  startTime: string; // HH:MM
  endTime: string; // HH:MM
  room: string;
  status: AppointmentStatus;
  notes?: string;
  cancellationReason?: string;
}

export interface SessionRecord {
  id: string;
  appointmentId?: string;
  childId: string;
  childName: string;
  therapistId: string;
  therapistName: string;
  date: string;
  durationMinutes: number;
  programTitle: string;
  soapSubjective: string;
  soapObjective: string;
  soapAssessment: string;
  soapPlan: string;
  milestonesWorkedOn: string[];
  progressScore: number; // 0 - 100
  parentVisible: boolean;
  homeExercises?: string;
}

export type InvoiceStatus = 'paid' | 'pending' | 'overdue';

export interface InvoiceLineItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  childId: string;
  childName: string;
  guardianName: string;
  guardianEmail: string;
  issueDate: string;
  dueDate: string;
  items: InvoiceLineItem[];
  subtotal: number;
  discount: number;
  total: number;
  amountPaid: number;
  balanceDue: number;
  status: InvoiceStatus;
  paymentMethod?: string;
  paidAt?: string;
}

export interface ActivityLog {
  id: string;
  timestamp: string;
  actorName: string;
  actorRole: string;
  action: string;
  targetName: string;
  category: 'clinical' | 'administrative' | 'billing' | 'scheduling';
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  unread: boolean;
  type: 'appointment' | 'progress' | 'billing' | 'system';
}

export interface OrganizationSettings {
  name: string;
  tagline: string;
  email: string;
  phone: string;
  address: string;
  licenseNumber: string;
  operatingHours: string;
  smsReminders: boolean;
  emailProgressReports: boolean;
  billingAlerts: boolean;
  compactDensity: boolean;
}
