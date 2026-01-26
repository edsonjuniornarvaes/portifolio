import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { trackTabView } from '@/lib/analytics';

export function useTabTracking(tabName: string) {
  const pathname = usePathname();

  useEffect(() => {
    if (tabName) {
      trackTabView(pathname, tabName);
    }
  }, [pathname, tabName]);
}
