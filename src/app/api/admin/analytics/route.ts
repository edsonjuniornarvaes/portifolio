import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase';

// Verificar autenticação
async function verifyAuth(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  const token = authHeader?.replace('Bearer ', '') || request.cookies.get('admin_token')?.value;

  if (!token) {
    return false;
  }

  try {
    const decoded = Buffer.from(token, 'base64').toString('utf-8');
    const [email] = decoded.split(':');
    return email === 'edsonjunior.narvaes@gmail.com';
  } catch {
    return false;
  }
}

export async function GET(request: NextRequest) {
  // Verificar autenticação
  const isAuthenticated = await verifyAuth(request);
  if (!isAuthenticated) {
    return NextResponse.json(
      { error: 'Não autorizado' },
      { status: 401 }
    );
  }

  try {
    const supabase = createServerClient();
    const { searchParams } = new URL(request.url);
    const range = searchParams.get('range') || '7d'; // 7d, 30d, 1y

    // Calcular datas baseado no range
    const now = new Date();
    let startDate: Date;
    
    switch (range) {
      case '7d':
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case '30d':
        startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        break;
      case '1y':
        startDate = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
        break;
      default:
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    }

    // Buscar page views
    const { data: pageViews, error: pageViewsError } = await supabase
      .from('page_views')
      .select('*')
      .gte('created_at', startDate.toISOString())
      .order('created_at', { ascending: false });

    if (pageViewsError) throw pageViewsError;

    // Buscar tab views
    const { data: tabViews, error: tabViewsError } = await supabase
      .from('tab_views')
      .select('*')
      .gte('created_at', startDate.toISOString())
      .order('created_at', { ascending: false });

    if (tabViewsError) throw tabViewsError;

    // Buscar click events
    const { data: clickEvents, error: clickEventsError } = await supabase
      .from('click_events')
      .select('*')
      .gte('created_at', startDate.toISOString())
      .order('created_at', { ascending: false });

    if (clickEventsError) throw clickEventsError;

    // Processar estatísticas
    const totalVisits = pageViews?.length || 0;
    const uniqueVisitors = new Set(pageViews?.map(pv => pv.ip_address).filter(Boolean)).size;
    
    // Calcular tempo médio de permanência
    const durations = pageViews?.filter(pv => pv.duration !== null && pv.duration > 0).map(pv => pv.duration) || [];
    const averageTime = durations.length > 0
      ? Math.round(durations.reduce((sum, d) => sum + d, 0) / durations.length)
      : 0;
    
    // Top pages
    const pageCounts: Record<string, number> = {};
    pageViews?.forEach(pv => {
      pageCounts[pv.page_path] = (pageCounts[pv.page_path] || 0) + 1;
    });
    const topPages = Object.entries(pageCounts)
      .map(([page_path, views]) => ({ page_path, views }))
      .sort((a, b) => b.views - a.views)
      .slice(0, 10);

    // Top referrers
    const referrerCounts: Record<string, number> = {};
    pageViews?.forEach(pv => {
      const ref = pv.referrer || 'Direct';
      referrerCounts[ref] = (referrerCounts[ref] || 0) + 1;
    });
    const topReferrers = Object.entries(referrerCounts)
      .map(([referrer, visits]) => ({ referrer, visits }))
      .sort((a, b) => b.visits - a.visits)
      .slice(0, 10);

    // Top countries
    const countryCounts: Record<string, number> = {};
    pageViews?.forEach(pv => {
      if (pv.country) {
        countryCounts[pv.country] = (countryCounts[pv.country] || 0) + 1;
      }
    });
    const topCountries = Object.entries(countryCounts)
      .map(([country, visits]) => ({ country, visits }))
      .sort((a, b) => b.visits - a.visits)
      .slice(0, 10);

    // Visits by day
    const visitsByDay: Record<string, number> = {};
    pageViews?.forEach(pv => {
      const date = new Date(pv.created_at).toISOString().split('T')[0];
      visitsByDay[date] = (visitsByDay[date] || 0) + 1;
    });
    const visitsByDayArray = Object.entries(visitsByDay)
      .map(([date, visits]) => ({ date, visits }))
      .sort((a, b) => a.date.localeCompare(b.date));

    // Tab views count
    const tabCounts: Record<string, number> = {};
    tabViews?.forEach(tv => {
      const key = `${tv.page_path}:${tv.tab_name}`;
      tabCounts[key] = (tabCounts[key] || 0) + 1;
    });

    // Click events by type
    const clickCounts: Record<string, number> = {};
    clickEvents?.forEach(ce => {
      clickCounts[ce.element_type] = (clickCounts[ce.element_type] || 0) + 1;
    });

    return NextResponse.json({
      total_visits: totalVisits,
      unique_visitors: uniqueVisitors,
      page_views: totalVisits,
      average_time: averageTime,
      top_pages: topPages,
      top_referrers: topReferrers,
      top_countries: topCountries,
      visits_by_day: visitsByDayArray,
      tab_views: tabCounts,
      click_events: clickCounts,
      range,
    });
  } catch (error) {
    console.error('Analytics error:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar dados de analytics' },
      { status: 500 }
    );
  }
}
