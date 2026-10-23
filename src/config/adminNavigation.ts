import {
  LayoutDashboard,
  Users,
  Stethoscope,
  CalendarDays,
  FileSpreadsheet,
  Layers,
  CreditCard,
  BarChart3,
  Settings,
  Link2,
  Activity,
  UserCheck,
  LucideIcon
} from 'lucide-react';

export interface NavItemConfig {
  id: string;
  label: string;
  href: string;
  icon: LucideIcon;
  badge?: string;
  badgeVariant?: 'default' | 'success' | 'warning' | 'live';
  alert?: boolean;
  special?: boolean;
  description?: string;
}

export interface NavSectionConfig {
  id: string;
  category: string;
  items: NavItemConfig[];
}

/**
 * Standard Admin Sidebar Navigation Architecture
 * Grouped categorically according to clinical ERP and practice management best practices.
 */
export const ADMIN_SIDEBAR_SECTIONS: NavSectionConfig[] = [
  {
    id: 'core',
    category: 'Core Operations',
    items: [
      {
        id: 'overview',
        label: 'Dashboard Overview',
        href: '/dashboard',
        icon: LayoutDashboard,
        description: 'Practice metrics and daily summary'
      },
      {
        id: 'analytics',
        label: 'Analytics & Reports',
        href: '/reports',
        icon: BarChart3,
        description: 'Outcome charts and compliance reports'
      }
    ]
  },
  {
    id: 'clinical',
    category: 'Clinical Care Delivery',
    items: [
      {
        id: 'children',
        label: 'Children & Intake',
        href: '/children',
        icon: Users,
        badge: '8',
        badgeVariant: 'default',
        description: 'Active pediatric caseload and intake review'
      },
      {
        id: 'therapists',
        label: 'Therapists & Staff',
        href: '/therapists',
        icon: Stethoscope,
        description: 'Specialists, OT/SLP credentials, and assignments'
      },
      {
        id: 'appointments',
        label: 'Appointments & Cal',
        href: '/appointments',
        icon: CalendarDays,
        description: 'Daily therapy pod schedule'
      },
      {
        id: 'sessions',
        label: 'Sessions & SOAP Notes',
        href: '/sessions',
        icon: FileSpreadsheet,
        description: 'Clinical documentation and records'
      }
    ]
  },
  {
    id: 'workspace',
    category: 'Therapist Workspace',
    items: [
      {
        id: 'therapist-portal',
        label: 'Therapist Portal',
        href: '/therapist-portal',
        icon: Stethoscope,
        special: true,
        description: 'Therapist caseload management'
      },
      {
        id: 'active-workspace',
        label: 'Active Workspace',
        href: '/therapist-workspace',
        icon: Activity,
        badge: 'Live',
        badgeVariant: 'live',
        special: true,
        description: 'Real-time session telemetry & observation cards'
      }
    ]
  },
  {
    id: 'operations',
    category: 'Programs & Finance',
    items: [
      {
        id: 'programs',
        label: 'Therapy Programs',
        href: '/admin-programs',
        icon: Layers,
        description: 'Standardized clinical curriculum'
      },
      {
        id: 'billing',
        label: 'Billing & Invoices',
        href: '/billing',
        icon: CreditCard,
        badge: 'Due',
        badgeVariant: 'warning',
        alert: true,
        description: 'Claims, payments, and guardian invoicing'
      }
    ]
  },
  {
    id: 'portals',
    category: 'Portals & Systems',
    items: [
      {
        id: 'integrations',
        label: 'Portal Integrations',
        href: '/integrations',
        icon: Link2,
        badge: 'API',
        badgeVariant: 'default',
        description: 'Webhooks, credentials, and third-party sync'
      },
      {
        id: 'parent-portal',
        label: 'Parent Portal View',
        href: '/parent',
        icon: UserCheck,
        special: true,
        description: 'Guardian progress review mirror'
      },
      {
        id: 'settings',
        label: 'Platform Settings',
        href: '/settings',
        icon: Settings,
        description: 'System preferences and branding'
      }
    ]
  }
];
