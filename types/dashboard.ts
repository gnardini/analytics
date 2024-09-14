export interface CountsData {
  users: number;
  sessions: number;
  visits: number;
}

export interface MetricData {
  name: string;
  count: number;
}

export interface DataPoint {
  date: string;
  users: number;
  sessions: number;
  visits: number;
}

export interface MetricsData {
  pages: MetricData[];
  referrers: MetricData[];
  devices: MetricData[];
  browsers: MetricData[];
  countries: MetricData[];
  languages: MetricData[];
}