import {alpha, createTheme} from '@mui/material/styles';
import type {} from '@mui/x-date-pickers/themeAugmentation';

export const WHITE = '#FFF';

export const GREY_X_LIGHT = '#F2F2F2';

export const GREY_REGULAR = '#A8A8A8';

export const GREY_MEDIUM = '#808080';

export const GREY_DARK = '#4F4F4F';

export const ERROR = '#A72D1E';

// bg for categories on Find Expert page / bg behind $ icon
export const OFF_WHITE = '#F2F3F3';

export const SMEEPLE_GREEN_DARK = '#296647';

// used for pills, review stars, potential large background color fills
export const SMEEPLE_GREEN = '#5EBF8F';

export const SMEEPLE_GREEN_LIGHT = '#E2F3EB';

export const PERIWINKLE_DARK = '#170EBE';

// used for sub headers / small titles / some iconography / SME rate labels
export const PERIWINKLE = '#615AF3';

export const PERIWINKLE_LIGHT = '#EDECFE';

export const ORANGE_DARK = '#8B4E04';

// used as call out / action color / Links / button bgs / bottom tab bar selected color
export const ORANGE = '#F8961F';

export const ORANGE_LIGHT = '#FEEDD7';

// default color for text unless otherwise specified
// background of bottom tab bar
export const MIDNIGHT_BLUE = '#151943';

export const MIDNIGHT_BLUE_LIGHT = '#EFF0FA';

export const DARK_BLUE = '#2D3287';

export default createTheme({
  typography: {
    fontFamily: `"Karla", "Helvetica", "Arial", sans-serif`,
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    h1: {
      fontWeight: 800,
    },
    h2: {
      fontWeight: 800,
    },
    h3: {
      fontWeight: 800,
    },
    h4: {
      fontWeight: 800,
    },
    h5: {
      fontWeight: 'bold',
      fontSize: 21,
    },
    h6: {
      fontSize: 18,
      fontWeight: 'bold',
      textTransform: 'uppercase',
      color: PERIWINKLE,
    },
    body1: {
      fontSize: 21,
    },
    body2: {
      fontSize: 18,
    },
    button: {
      fontWeight: 800,
    },
  },
  palette: {
    primary: {
      light: ORANGE_LIGHT,
      main: ORANGE,
      dark: ORANGE_DARK,
    },
    secondary: {
      light: PERIWINKLE_LIGHT,
      main: PERIWINKLE,
      dark: PERIWINKLE_DARK,
    },
    text: {
      primary: MIDNIGHT_BLUE,
    },
    info: {
      main: SMEEPLE_GREEN,
      contrastText: MIDNIGHT_BLUE,
    },
    error: {
      main: ERROR,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        outlined: {
          color: MIDNIGHT_BLUE,
          borderColor: alpha(MIDNIGHT_BLUE, 0.5),
          '&:hover': {
            borderColor: MIDNIGHT_BLUE,
          },
        },
      },
    },
    MuiDatePicker: {
      styleOverrides: {
        root: {
          backgroundColor: 'red',
        },
      },
    },

    MuiLink: {
      styleOverrides: {
        root: {
          color: MIDNIGHT_BLUE,
          borderBottom: `2px dashed ${ORANGE}`,
          paddingBottom: '2px',
          textDecoration: 'none',
        },
      },
    },
  },
});
