import CloseIcon from '@mui/icons-material/Close';
import DescriptionIcon from '@mui/icons-material/Description';
import ImageIcon from '@mui/icons-material/Image';
import {Box, IconButton, Stack, Typography} from '@mui/material';
import {ImageFileTypes} from '../../../constants/ImageFileTypes';
import {MIDNIGHT_BLUE, ORANGE, WHITE} from '../../../styles/theme';

type ReviewSupportingDocumentProps = {
  fileName?: string | null;
  onRemoveClicked?: () => void;
  disabled?: boolean;
};

function MultiFileInputDocument({
  fileName,
  onRemoveClicked,
  disabled,
}: ReviewSupportingDocumentProps) {
  if (!fileName) return null;
  const lowercaseFileName = fileName.toLowerCase();
  const isImage = ImageFileTypes.some((ft) => lowercaseFileName.endsWith(`.${ft}`));
  return (
    <Stack alignItems="center" p={1} sx={{opacity: disabled ? 0.5 : 1}} width={175}>
      <Box position="relative">
        {isImage ? (
          <ImageIcon sx={{fontSize: 40, color: ORANGE}} />
        ) : (
          <DescriptionIcon sx={{fontSize: 40, color: ORANGE}} />
        )}
        <IconButton
          onClick={onRemoveClicked}
          size="small"
          disabled={disabled}
          sx={{
            position: 'absolute',
            top: '-10px',
            right: '-10px',
            backgroundColor: MIDNIGHT_BLUE,
            color: WHITE,
            '&:hover': {
              backgroundColor: MIDNIGHT_BLUE,
            },
          }}
        >
          <CloseIcon fontSize="inherit" />
        </IconButton>
      </Box>
      <Typography sx={{color: MIDNIGHT_BLUE, wordBreak: 'break-all'}} variant="caption">
        {fileName}
      </Typography>
    </Stack>
  );
}

export default MultiFileInputDocument;
