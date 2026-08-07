export interface RevenuePoint {
  month: string; // "2024-01"
  collected: number;
}

export interface VolumePoint {
  month: string;
  count: number;
}

export interface SuccessRateData {
  rate: number; // 0–1
  paid_on_time: number;
  total_due: number;
}

export interface AnalyticsOverview {
  revenue_series: RevenuePoint[];
  volume_series: VolumePoint[];
  success_rate: SuccessRateData;
}
