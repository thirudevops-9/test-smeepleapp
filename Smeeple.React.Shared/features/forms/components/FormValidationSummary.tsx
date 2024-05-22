import {Box, Typography} from '@mui/material';
import {ErrorTwoTone} from '@mui/icons-material';

export type Props = {
  validationErrors: string[];
};

function FormValidationSummary({validationErrors}: Props) {
  if (!validationErrors || validationErrors.length <= 0) {
    return null;
  }

  return (
    <>
      {validationErrors.map((ve) => (
        <Box display="flex" alignItems="center" marginTop={1} key={ve}>
          <ErrorTwoTone fontSize="small" color="error" />
          <Typography variant="body2" color="error" ml={1}>
            {ve}
          </Typography>
        </Box>
      ))}
    </>
  );
}

export default FormValidationSummary;
