import {useContext} from 'react';
import {AnalyticsContext} from '../components/AnalyticsProvider';

const useAnalytics = () => {
  const context = useContext(AnalyticsContext);
  return context;
};

export default useAnalytics;
