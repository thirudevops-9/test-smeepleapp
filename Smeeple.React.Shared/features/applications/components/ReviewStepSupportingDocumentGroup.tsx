import {Box, Stack, Typography} from '@mui/material';
import type {SupportingDocument} from '../types/ApplicationDetailsModel';
import ReviewStepSupportingDocument from './ReviewStepSupportingDocument';

type ReviewSupportingDocumentProps = {
  required?: boolean;
  supportingDocuments: SupportingDocument[];
};

function ReviewStepSupportingDocumentGroup({
  required,
  supportingDocuments,
}: ReviewSupportingDocumentProps) {
  if (supportingDocuments.length === 0) return null;
  return (
    <Stack>
      <Typography variant="body2" fontWeight="bold">
        Supporting Document
        {supportingDocuments.length ? 's' : ''}
        {required ? '*' : ''}
      </Typography>
      <Box display="flex" flexDirection="row" flexWrap="wrap">
        {supportingDocuments.map((sd) => (
          <ReviewStepSupportingDocument key={sd.downloadableFileId} {...sd} required />
        ))}
      </Box>
    </Stack>
  );
}

export default ReviewStepSupportingDocumentGroup;
