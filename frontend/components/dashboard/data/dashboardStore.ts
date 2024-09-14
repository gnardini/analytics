
import { create } from 'zustand';

type DataType = 'users' | 'sessions' | 'visits';

interface DashboardState {
  dataType: DataType;
  dateRange: {
    label: string;
    value: string;
    granularity: 'day' | 'week' | 'month';
  };
  setDataType: (dataType: DataType) => void;
  setDateRange: (dateRange: {
    label: string;
    value: string;
    granularity: 'day' | 'week' | 'month';
  }) => void;
}

export const useDashboardStore = create<DashboardState>((set) => ({
  dataType: 'users',
  dateRange: { label: 'Last 30 days', value: 'last_30_days', granularity: 'day' },
  setDataType: (dataType) => set({ dataType }),
  setDateRange: (dateRange) => set({ dateRange }),
}));
