import { create } from "zustand";
import { invoiceQueries } from "@/lib/supabase/queries/invoiceQueries";
import { analyticsQueries } from "@/lib/supabase/queries/analyticsQueries";

export interface Metric {
  title: string;
  value: string;
  trend: string;
  trendType: 'positive' | 'negative';
  comparison: string;
}

export interface ActivityTextPart {
  text: string;
  bold?: boolean;
}

export interface Activity {
  id: string;
  iconName: 'CheckCircle2' | 'Send' | 'AlertCircle' | 'FileEdit';
  iconColor: string;
  iconBg: string;
  textParts: ActivityTextPart[];
  time: string;
}

export interface Invoice {
  id: string;
  customer: string;
  issued: string;
  due: string;
  amount: string;
  status: string;
  statusClass: string;
}

export interface PaymentStats {
  onTimePercentage: number;
  latePercentage: number;
  onTimeCount: number;
  lateCount: number;
  outstandingCount: number;
}

export interface PeriodData {
  revenueTotal: string;
  revenueKicker: string;
  revenueSubtitle: string;
  pathD: string;
}

export const PERIOD_DATA_MAP: Record<'7d' | '30d' | '90d' | '12m', PeriodData> = {
  '7d': {
    revenueTotal: '$24,850',
    revenueKicker: 'LAST 7 DAYS',
    revenueSubtitle: 'Last 7 days',
    pathD: 'M 50 200 C 150 180, 250 160, 350 120 C 450 90, 550 100, 650 60 C 750 40, 800 30, 800 20',
  },
  '30d': {
    revenueTotal: '$98,420',
    revenueKicker: 'LAST 30 DAYS',
    revenueSubtitle: 'Last 30 days',
    pathD: 'M 50 180 C 120 160, 200 170, 300 130 C 400 100, 500 110, 600 70 C 700 50, 750 40, 800 30',
  },
  '90d': {
    revenueTotal: '$294,150',
    revenueKicker: 'LAST 90 DAYS',
    revenueSubtitle: 'Last 90 days',
    pathD: 'M 50 170 C 110 150, 220 160, 320 120 C 420 80, 520 90, 620 60 C 720 40, 770 30, 800 25',
  },
  '12m': {
    revenueTotal: '$844,400',
    revenueKicker: 'LAST 12 MONTHS',
    revenueSubtitle: 'Last 12 months',
    pathD: 'M 50 160 C 100 140, 150 150, 200 130 C 250 110, 300 120, 350 90 C 400 60, 450 80, 500 70 C 550 60, 600 50, 650 80 C 700 110, 750 30, 800 20',
  },
};

interface DashboardStore {
  metrics: Metric[];
  revenueTotal: string;
  invoiceVolumes: number[];
  paymentStats: PaymentStats;
  activities: Activity[];
  recentInvoices: Invoice[];
  selectedPeriod: '7d' | '30d' | '90d' | '12m';
  selectedDateNum: string;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  setSelectedPeriod: (period: '7d' | '30d' | '90d' | '12m') => void;
  setSelectedDateNum: (num: string) => void;
  refreshData: () => Promise<void>;
}

const INITIAL_METRICS: Metric[] = [
  {
    title: 'Outstanding revenue',
    value: '$184,320',
    trend: '+12.4%',
    trendType: 'positive',
    comparison: 'vs last month'
  },
  {
    title: 'Invoices paid',
    value: '142',
    trend: '+8.1%',
    trendType: 'positive',
    comparison: 'this month'
  },
  {
    title: 'Avg. time to pay',
    value: '16 days',
    trend: '-2.3 days',
    trendType: 'positive', 
    comparison: 'faster than June'
  },
  {
    title: 'Upcoming payments',
    value: '$62,540',
    trend: '-4.2%',
    trendType: 'negative',
    comparison: 'next 30 days'
  }
];

const INITIAL_ACTIVITIES: Activity[] = [
  {
    id: 'act-1',
    iconName: 'CheckCircle2',
    iconColor: '#22c55e',
    iconBg: 'rgba(34, 197, 94, 0.1)',
    textParts: [
      { text: 'Aperture Films', bold: true },
      { text: ' paid Invoice INV-2026-0133' }
    ],
    time: '2h ago'
  },
  {
    id: 'act-2',
    iconName: 'Send',
    iconColor: '#3b82f6',
    iconBg: 'rgba(59, 130, 246, 0.1)',
    textParts: [
      { text: 'You sent reminder for ' },
      { text: 'INV-2026-0140', bold: true }
    ],
    time: '5h ago'
  },
  {
    id: 'act-3',
    iconName: 'AlertCircle',
    iconColor: '#ef4444',
    iconBg: 'rgba(239, 68, 68, 0.1)',
    textParts: [
      { text: 'System flagged INV-2026-0138 as ' },
      { text: 'Overdue', bold: true }
    ],
    time: 'Yesterday'
  },
  {
    id: 'act-4',
    iconName: 'FileEdit',
    iconColor: '#9ca3af',
    iconBg: 'rgba(107, 114, 128, 0.1)',
    textParts: [
      { text: 'You created draft INV-2026-0138' }
    ],
    time: '2d ago'
  },
  {
    id: 'act-5',
    iconName: 'CheckCircle2',
    iconColor: '#22c55e',
    iconBg: 'rgba(34, 197, 94, 0.1)',
    textParts: [
      { text: 'Cove Hospitality', bold: true },
      { text: ' paid invoice INV-2026-0137' }
    ],
    time: '2d ago'
  }
];

const INITIAL_INVOICES: Invoice[] = [
  { id: 'INV-2026-0200', customer: 'Sable & Co.', issued: 'Aug 04', due: 'Aug 18', amount: '$1,200.00', status: 'Paid', statusClass: 'statusPaid' },
  { id: 'INV-2026-0199', customer: 'Northwind Studio', issued: 'Aug 03', due: 'Aug 17', amount: '$2,171.00', status: 'Pending', statusClass: 'statusPending' },
  { id: 'INV-2026-0198', customer: 'Halcyon Labs', issued: 'Aug 02', due: 'Aug 16', amount: '$3,142.00', status: 'Overdue', statusClass: 'statusOverdue' },
  { id: 'INV-2026-0197', customer: 'Aperture Films', issued: 'Aug 01', due: 'Aug 15', amount: '$4,113.00', status: 'Draft', statusClass: 'statusDraft' },
  { id: 'INV-2026-0196', customer: 'Meridian Group', issued: 'Jul 31', due: 'Aug 14', amount: '$5,084.00', status: 'Paid', statusClass: 'statusPaid' },
  { id: 'INV-2026-0195', customer: 'Cove Hospitality', issued: 'Jul 30', due: 'Aug 13', amount: '$6,055.00', status: 'Paid', statusClass: 'statusPaid' },
  { id: 'INV-2026-0194', customer: 'Palette Studio', issued: 'Jul 29', due: 'Aug 12', amount: '$7,026.00', status: 'Paid', statusClass: 'statusPaid' },
];

export const useDashboardStore = create<DashboardStore>((set) => ({
  metrics: INITIAL_METRICS,
  revenueTotal: '$844,400',
  invoiceVolumes: [22, 35, 32, 42, 38, 50, 48, 58, 55, 62, 60, 65],
  paymentStats: {
    onTimePercentage: 92,
    latePercentage: 5,
    onTimeCount: 131,
    lateCount: 8,
    outstandingCount: 3
  },
  activities: INITIAL_ACTIVITIES,
  recentInvoices: INITIAL_INVOICES,
  selectedPeriod: '12m',
  selectedDateNum: '4',
  isLoading: false,
  error: null,
  
  setSelectedPeriod: (period) => set({ selectedPeriod: period }),
  setSelectedDateNum: (num) => set({ selectedDateNum: num }),
  
  refreshData: async () => {
    set({ isLoading: true, error: null });
    try {
      const [fetchedInvoices, analyticsData] = await Promise.all([
        invoiceQueries.list(),
        analyticsQueries.overview(),
      ]);

      // If Supabase returned data, format and set it
      if (fetchedInvoices && fetchedInvoices.length > 0) {
        const mappedInvoices: Invoice[] = fetchedInvoices.map((inv: any) => ({
          id: inv.invoice_number || inv.id,
          customer: inv.customer_name || 'Customer',
          issued: inv.issue_date || 'Aug 04',
          due: inv.due_date || 'Aug 18',
          amount: `$${Number(inv.amount || 0).toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
          status: inv.status || 'Draft',
          statusClass: `status${inv.status || 'Draft'}`,
        }));
        set({ recentInvoices: mappedInvoices });
      }

      if (analyticsData && Array.isArray(analyticsData)) {
        const total = analyticsData.reduce((acc, item) => acc + (Number(item.amount) || 0), 0);
        if (total > 0) {
          set({ revenueTotal: `$${total.toLocaleString('en-US')}` });
        }
      }
    } catch (err: any) {
      console.warn("Could not fetch Supabase data, keeping mock data:", err.message);
      set({ error: err.message });
    } finally {
      set({ isLoading: false });
    }
  }
}));
