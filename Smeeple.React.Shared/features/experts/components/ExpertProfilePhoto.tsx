import {Box, Typography} from '@mui/material';

type Props = {
  photoUrl: string | null;
  size: number;
  showNoPhoto?: boolean;
};

function ExpertProfilePhoto({photoUrl, size, showNoPhoto}: Props) {
  if (!photoUrl) {
    if (showNoPhoto) {
      return (
        <Box
          sx={{
            width: size,
            height: size,
            background: '#C1C6C9',
            borderRadius: size / 2,
            flexShrink: 0,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Typography>No Photo</Typography>
        </Box>
      );
    }
    return null;
  }
  return (
    <img
      style={{width: size, height: size, borderRadius: size / 2, objectFit: 'cover'}}
      src={photoUrl}
      alt="Profile Avatar"
    />
  );
}

export default ExpertProfilePhoto;
