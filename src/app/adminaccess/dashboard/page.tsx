"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';

const DashboardContainer = styled.div`
  min-height: 100vh;
  padding: 2rem;
  background: var(--bg-primary);
`;

const Header = styled.header`
  margin-bottom: 3rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  background: var(--accent-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const Subtitle = styled.p`
  color: var(--text-secondary);
  font-size: 1rem;
`;

const Controls = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
`;

const RangeButton = styled.button<{ $active: boolean }>`
  background: ${props => props.$active ? 'var(--accent-gradient)' : 'var(--bg-card)'};
  border: 1px solid ${props => props.$active ? 'var(--accent-primary)' : 'var(--border-color)'};
  border-radius: var(--radius-sm);
  padding: 0.5rem 1rem;
  color: var(--text-primary);
  font-size: 0.9rem;
  cursor: pointer;
  transition: all var(--transition-fast);

  &:hover {
    border-color: var(--accent-primary);
    transform: translateY(-2px);
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 3rem;
`;

const StatCard = styled.div`
  background: var(--bg-card);
  backdrop-filter: blur(12px);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  padding: 1.5rem;
  box-shadow: var(--glow-primary);
`;

const StatLabel = styled.p`
  color: var(--text-secondary);
  font-size: 0.875rem;
  margin-bottom: 0.5rem;
`;

const StatValue = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 0.25rem;
`;

const StatChange = styled.span<{ $positive?: boolean }>`
  color: ${props => props.$positive ? 'var(--accent-primary)' : 'var(--text-muted)'};
  font-size: 0.875rem;
`;

const Section = styled.section`
  margin-bottom: 3rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: var(--text-primary);
`;

const Table = styled.table`
  width: 100%;
  background: var(--bg-card);
  backdrop-filter: blur(12px);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--glow-primary);
`;

const TableHeader = styled.thead`
  background: var(--bg-secondary);
`;

const TableRow = styled.tr`
  border-bottom: 1px solid var(--border-color);
  
  &:last-child {
    border-bottom: none;
  }
`;

const TableHeaderCell = styled.th`
  padding: 1rem;
  text-align: left;
  color: var(--text-primary);
  font-weight: 600;
  font-size: 0.9rem;
`;

const TableCell = styled.td`
  padding: 1rem;
  color: var(--text-secondary);
  font-size: 0.9rem;
`;

const ChartContainer = styled.div`
  background: var(--bg-card);
  backdrop-filter: blur(12px);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  padding: 2rem;
  box-shadow: var(--glow-primary);
  margin-bottom: 2rem;
`;

const LogoutButton = styled.button`
  position: fixed;
  top: 2rem;
  right: 2rem;
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-sm);
  padding: 0.75rem 1.5rem;
  color: var(--text-primary);
  cursor: pointer;
  transition: all var(--transition-fast);

  &:hover {
    border-color: var(--accent-primary);
    transform: translateY(-2px);
  }
`;

const Loading = styled.div`
  text-align: center;
  padding: 3rem;
  color: var(--text-secondary);
`;

const ErrorMessage = styled.div`
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.3);
  border-radius: var(--radius-sm);
  padding: 1.5rem;
  color: #ef4444;
  margin-bottom: 2rem;
  line-height: 1.6;
  white-space: pre-line;
  
  code {
    background: rgba(0, 0, 0, 0.3);
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
    font-family: var(--font-mono);
    font-size: 0.875rem;
  }
`;

interface AnalyticsData {
  total_visits: number;
  unique_visitors: number;
  page_views: number;
  average_time: number;
  top_pages: Array<{ page_path: string; views: number }>;
  top_referrers: Array<{ referrer: string; visits: number }>;
  top_countries: Array<{ country: string; visits: number }>;
  visits_by_day: Array<{ date: string; visits: number }>;
  tab_views: Record<string, number>;
  click_events: Record<string, number>;
  range: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const [range, setRange] = useState('7d');
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    checkAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (range) {
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [range]);

  const checkAuth = async () => {
    const token = sessionStorage.getItem('admin_token');
    if (!token) {
      router.push('/adminaccess/login');
      return;
    }

    try {
      const response = await fetch('/api/admin/verify', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        sessionStorage.removeItem('admin_token');
        router.push('/adminaccess/login');
      }
    } catch (err) {
      sessionStorage.removeItem('admin_token');
      router.push('/adminaccess/login');
    }
  };

  const fetchData = async () => {
    setLoading(true);
    setError('');

    try {
      const token = sessionStorage.getItem('admin_token');
      const response = await fetch(`/api/admin/analytics?range=${range}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const analyticsData = await response.json();
        setData(analyticsData);
      } else if (response.status === 401) {
        sessionStorage.removeItem('admin_token');
        router.push('/adminaccess/login');
      } else {
        const errorData = await response.json().catch(() => ({}));
        const errorMsg = errorData?.error || 'Erro ao carregar dados';
        const errorHint = errorData?.details?.hint || '';
        setError(errorHint ? `${errorMsg}\n\n💡 ${errorHint}` : errorMsg);
      }
    } catch (err) {
      setError('Erro ao carregar dados. Verifique o console para mais detalhes.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('admin_token');
    router.push('/adminaccess/login');
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };

  if (loading && !data) {
    return (
      <DashboardContainer>
        <Loading>Carregando dados...</Loading>
      </DashboardContainer>
    );
  }

  return (
    <DashboardContainer>
      <LogoutButton onClick={handleLogout}>Sair</LogoutButton>

        <Header>
          <Title>Dashboard Admin</Title>
          <Subtitle>Análise de visitas e interações do portfólio</Subtitle>
        </Header>

        {error && <ErrorMessage>{error}</ErrorMessage>}

        <Controls>
          <RangeButton $active={range === '7d'} onClick={() => setRange('7d')}>
            7 Dias
          </RangeButton>
          <RangeButton $active={range === '30d'} onClick={() => setRange('30d')}>
            30 Dias
          </RangeButton>
          <RangeButton $active={range === '1y'} onClick={() => setRange('1y')}>
            1 Ano
          </RangeButton>
        </Controls>

        {data && (
          <>
            <StatsGrid>
              <StatCard>
                <StatLabel>Total de Visitas</StatLabel>
                <StatValue>{data.total_visits.toLocaleString('pt-BR')}</StatValue>
                <StatChange>Período: {range}</StatChange>
              </StatCard>

              <StatCard>
                <StatLabel>Visitantes Únicos</StatLabel>
                <StatValue>{data.unique_visitors.toLocaleString('pt-BR')}</StatValue>
                <StatChange>Baseado em IP</StatChange>
              </StatCard>

              <StatCard>
                <StatLabel>Visualizações de Páginas</StatLabel>
                <StatValue>{data.page_views.toLocaleString('pt-BR')}</StatValue>
                <StatChange>Todas as páginas</StatChange>
              </StatCard>

              <StatCard>
                <StatLabel>Abas Visualizadas</StatLabel>
                <StatValue>{Object.keys(data.tab_views).length}</StatValue>
                <StatChange>Total de abas diferentes</StatChange>
              </StatCard>

              <StatCard>
                <StatLabel>Tempo Médio de Permanência</StatLabel>
                <StatValue>
                  {data.average_time > 0
                    ? `${Math.floor(data.average_time / 60)}:${String(data.average_time % 60).padStart(2, '0')}`
                    : '0:00'}
                </StatValue>
                <StatChange>
                  {data.average_time > 0
                    ? `${data.average_time} segundos`
                    : 'Sem dados'}
                </StatChange>
              </StatCard>
            </StatsGrid>

            <Section>
              <SectionTitle>Páginas Mais Visitadas</SectionTitle>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHeaderCell>Página</TableHeaderCell>
                    <TableHeaderCell>Visualizações</TableHeaderCell>
                  </TableRow>
                </TableHeader>
                <tbody>
                  {data.top_pages.map((page, index) => (
                    <TableRow key={index}>
                      <TableCell>{page.page_path}</TableCell>
                      <TableCell>{page.views.toLocaleString('pt-BR')}</TableCell>
                    </TableRow>
                  ))}
                </tbody>
              </Table>
            </Section>

            <Section>
              <SectionTitle>Origem das Visitas</SectionTitle>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHeaderCell>Origem</TableHeaderCell>
                    <TableHeaderCell>Visitas</TableHeaderCell>
                  </TableRow>
                </TableHeader>
                <tbody>
                  {data.top_referrers.map((ref, index) => (
                    <TableRow key={index}>
                      <TableCell>{ref.referrer === 'Direct' ? 'Acesso Direto' : ref.referrer}</TableCell>
                      <TableCell>{ref.visits.toLocaleString('pt-BR')}</TableCell>
                    </TableRow>
                  ))}
                </tbody>
              </Table>
            </Section>

            <Section>
              <SectionTitle>Países</SectionTitle>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHeaderCell>País</TableHeaderCell>
                    <TableHeaderCell>Visitas</TableHeaderCell>
                  </TableRow>
                </TableHeader>
                <tbody>
                  {data.top_countries.length > 0 ? (
                    data.top_countries.map((country, index) => (
                      <TableRow key={index}>
                        <TableCell>{country.country}</TableCell>
                        <TableCell>{country.visits.toLocaleString('pt-BR')}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={2}>Nenhum dado de país disponível</TableCell>
                    </TableRow>
                  )}
                </tbody>
              </Table>
            </Section>

            <Section>
              <SectionTitle>Abas Verificadas</SectionTitle>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHeaderCell>Página: Aba</TableHeaderCell>
                    <TableHeaderCell>Visualizações</TableHeaderCell>
                  </TableRow>
                </TableHeader>
                <tbody>
                  {Object.entries(data.tab_views).map(([key, count], index) => (
                    <TableRow key={index}>
                      <TableCell>{key}</TableCell>
                      <TableCell>{count.toLocaleString('pt-BR')}</TableCell>
                    </TableRow>
                  ))}
                </tbody>
              </Table>
            </Section>

            <Section>
              <SectionTitle>Eventos de Clique</SectionTitle>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHeaderCell>Tipo de Elemento</TableHeaderCell>
                    <TableHeaderCell>Cliques</TableHeaderCell>
                  </TableRow>
                </TableHeader>
                <tbody>
                  {Object.entries(data.click_events).map(([type, count], index) => (
                    <TableRow key={index}>
                      <TableCell>{type}</TableCell>
                      <TableCell>{count.toLocaleString('pt-BR')}</TableCell>
                    </TableRow>
                  ))}
                </tbody>
              </Table>
            </Section>

            <Section>
              <SectionTitle>Visitas por Dia</SectionTitle>
              <ChartContainer>
                {data.visits_by_day.length > 0 ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {data.visits_by_day.map((day, index) => (
                      <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{ minWidth: '100px', color: 'var(--text-secondary)' }}>
                          {formatDate(day.date)}
                        </div>
                        <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <div
                            style={{
                              height: '24px',
                              background: 'var(--accent-gradient)',
                              width: `${(day.visits / Math.max(...data.visits_by_day.map(d => d.visits))) * 100}%`,
                              borderRadius: '4px',
                            }}
                          />
                          <span style={{ color: 'var(--text-primary)', minWidth: '40px' }}>
                            {day.visits}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p style={{ color: 'var(--text-secondary)' }}>Nenhum dado disponível</p>
                )}
              </ChartContainer>
            </Section>
          </>
        )}
    </DashboardContainer>
  );
}
