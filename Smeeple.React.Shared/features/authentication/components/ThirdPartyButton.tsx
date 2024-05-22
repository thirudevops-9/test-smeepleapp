import {Box, Button} from '@mui/material';

const ICON_SIZE = '34px';

interface Props {
  text: string;
  iconSrc: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

function ThirdPartyButton({text, iconSrc, onClick}: Props) {
  return (
    <Button
      variant="outlined"
      size="large"
      onClick={onClick}
      sx={{
        textTransform: 'none',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        '& .MuiButton-startIcon': {
          width: ICON_SIZE,
          marginLeft: 0,
        },
      }}
      startIcon={
        <Box
          component="img"
          src={iconSrc}
          role="presentation"
          sx={{width: ICON_SIZE, height: ICON_SIZE, objectFit: 'contain'}}
        />
      }
    >
      <Box
        sx={{
          minWidth: 'max-content',
          marginLeft: 1,
        }}
      >
        {text}
      </Box>
    </Button>
  );
}

export default ThirdPartyButton;
