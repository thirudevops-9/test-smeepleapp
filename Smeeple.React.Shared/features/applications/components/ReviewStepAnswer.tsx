import {Stack, Typography} from '@mui/material';
import {MIDNIGHT_BLUE} from '../../../styles/theme';

type ReviewAnswerProps = {
  required?: boolean;
  label: string;
  answer?: string | null;
};

function ReviewStepAnswer({required, label, answer}: ReviewAnswerProps) {
  return (
    <Stack sx={{borderBottom: `1px dashed ${MIDNIGHT_BLUE}`, mb: 2}}>
      <Typography variant="body2" fontWeight="bold">
        {label + (required ? '*' : '')}
      </Typography>
      <Typography variant="body2">{answer || '-'}</Typography>
    </Stack>
  );
}

export default ReviewStepAnswer;
