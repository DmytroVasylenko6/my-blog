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
          color: 'unset',
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
          fontWeight: 'bold',
        },
        h2: {
          color: '#e2b076',
          textAlign: 'center',
          fontSize: '2rem',
          fontWeight: 'normal',
        },

        h3: {
          color: '#e2b076',
          textAlign: 'center',
          fontSize: '2rem',
          fontWeight: 'normal',
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
