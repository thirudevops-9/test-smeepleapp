import DescriptionIcon from '@mui/icons-material/Description';
import ImageIcon from '@mui/icons-material/Image';
import {Box, Link, Stack, Typography} from '@mui/material';
import {ImageFileTypes} from '../../../constants/ImageFileTypes';
import {MIDNIGHT_BLUE} from '../../../styles/theme';

type ReviewSupportingDocumentProps = {
  url?: string | null;
  fileName?: string | null;
  required?: boolean;
};

function ReviewStepSupportingDocument({fileName, url}: ReviewSupportingDocumentProps) {
  if (!fileName || !url) return null;
  const lowercaseFileName = fileName.toLowerCase();
  const isImage = ImageFileTypes.some((ft) => lowercaseFileName.endsWith(`.${ft}`));
  return (
    <Box m={1}>
      <Link
        href={url}
        target="_blank"
        sx={{
          display: 'block',
          borderBottom: 'none',
          width: 150,
        }}
      >
        <Stack alignItems="center">
          {isImage ? <ImageIcon sx={{fontSize: 80}} /> : <DescriptionIcon sx={{fontSize: 80}} />}
          <Typography sx={{color: MIDNIGHT_BLUE, wordBreak: 'break-all'}} variant="caption">
            {fileName}
          </Typography>
        </Stack>
      </Link>
    </Box>
  );
}

export default ReviewStepSupportingDocument;
