import {useMediaQuery, useTheme} from '@mui/material';

const useInMobileLayout = () => {
  const theme = useTheme();
  return useMediaQuery(theme.breakpoints.down('md'));
};

export default useInMobileLayout;
