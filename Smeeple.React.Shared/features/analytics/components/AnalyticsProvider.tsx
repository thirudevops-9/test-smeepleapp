import {createContext, useContext, useMemo, useState, useEffect, useCallback} from 'react';
import {Analytics, getAnalytics, logEvent as fbLogEvent} from 'firebase/analytics';

import {FirebaseContext} from '../../firebase/components/FirebaseProvider';

type Props = {
  children: React.ReactNode;
};

type LogPageView = (pagePath: string) => void;

type Context = {
  analytics: Analytics | undefined;
  logPageView: LogPageView;
};

const DEFAULT_CONTEXT: Context = {
  analytics: undefined,
  logPageView: () => null,
};

export const AnalyticsContext = createContext<Context>(DEFAULT_CONTEXT);

export default function AnalyticsProvider({children}: Props) {
  const {app} = useContext(FirebaseContext);
  const [analytics, setAnalytics] = useState<Analytics>();

  useEffect(() => {
    const newAnalytics = getAnalytics(app);
    setAnalytics(newAnalytics);
  }, []);

  const logPageView = useCallback<LogPageView>(
    (pagePath) => {
      if (analytics === undefined) {
        // throw new Error('logEvent called before init');
        return;
      }

      fbLogEvent(analytics, 'page_view', {pagePath});
    },
    [analytics],
  );

  const value = useMemo<Context>(() => ({analytics, logPageView}), [analytics, logPageView]);

  return <AnalyticsContext.Provider value={value}>{children}</AnalyticsContext.Provider>;
}
