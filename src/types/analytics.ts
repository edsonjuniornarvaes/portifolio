export interface PageView {
  id: string;
  page_path: string;
  page_title: string;
  referrer: string | null;
  user_agent: string | null;
  ip_address: string | null;
  country: string | null;
  city: string | null;
  device_type: string | null;
  browser: string | null;
  duration: number | null;
  created_at: string;
}

export interface TabView {
  id: string;
  page_path: string;
  tab_name: string;
  created_at: string;
}

export interface ClickEvent {
  id: string;
  page_path: string;
  element_type: string;
  element_id: string | null;
  element_text: string | null;
  created_at: string;
}

export interface AnalyticsStats {
  total_visits: number;
  unique_visitors: number;
  page_views: number;
  average_time: number; // Tempo médio em segundos
  top_pages: Array<{ page_path: string; views: number }>;
  top_referrers: Array<{ referrer: string; visits: number }>;
  top_countries: Array<{ country: string; visits: number }>;
  visits_by_day: Array<{ date: string; visits: number }>;
}

export interface TimeRange {
  label: string;
  days: number;
}
