import {Divider} from '@mui/material';

function ContentDivider() {
  return (
    <Divider
      variant="fullWidth"
      sx={{
        mt: 3,
        mb: 3,
        '&::before, &::after': {
          top: 0,
        },
      }}
    >
      or
    </Divider>
  );
}

export default ContentDivider;
