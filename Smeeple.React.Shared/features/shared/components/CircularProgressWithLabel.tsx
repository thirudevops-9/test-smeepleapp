import type {CircularProgressProps, TypographyProps} from '@mui/material';
import {Box, CircularProgress, Typography} from '@mui/material';
import {SMEEPLE_GREEN_DARK, SMEEPLE_GREEN_LIGHT} from '../../../styles/theme';

function CircularProgressWithLabel(
  // eslint-disable-next-line @typescript-eslint/ban-types
  props: CircularProgressProps & {
    value: number;
    typographyProps?: TypographyProps<'div'>;
  },
) {
  const {value, sx} = props;
  const {typographyProps, ...rest} = props;
  const absoluteBoxSx = {
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };
  return (
    <Box sx={{position: 'relative', display: 'inline-flex'}}>
      <CircularProgress
        variant="determinate"
        {...{...rest, sx: {...(sx || {}), color: SMEEPLE_GREEN_LIGHT}}}
        value={100}
      />
      <Box sx={absoluteBoxSx}>
        <CircularProgress variant="determinate" {...rest} />
      </Box>
      <Box sx={absoluteBoxSx}>
        <Typography
          variant="caption"
          color={SMEEPLE_GREEN_DARK}
          {...(typographyProps || {})}
        >{`${Math.round(value)}%`}</Typography>
      </Box>
    </Box>
  );
}

export default CircularProgressWithLabel;
