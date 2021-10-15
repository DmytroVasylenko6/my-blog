import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: {
          borderColor: '#e2b076',
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: '#e2b076',
        },
      },
    },

    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: '#e7984f',
          padding: ' 16.5px 14px;',
          '&:hover': {
            backgroundColor: '#d0833b',
          },
        },
      },
    },

    MuiTypography: {
      styleOverrides: {
        h1: {
          color: '#e2b076',
          textAlign: 'center',
          fontSize: '4rem',
          fontWeight: '500',
        },
        h2: {
          color: '#e2b076',
          textAlign: 'center',
          fontSize: '2rem',
          fontWeight: '400',
        },

        h3: {
          color: '#e2b076',
          textAlign: 'center',
          fontSize: '2rem',
          fontWeight: '400',
        },
      },
    },
  },
  palette: {
    mode: 'dark',
    primary: {
      main: '#e2b076',
    },
    secondary: {
      main: '#e2b076',
    },
  },
});

export default theme;
