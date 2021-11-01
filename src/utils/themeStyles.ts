import { createTheme } from '@mui/material/styles';

export const themeDark = createTheme({
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

export const themeLight = createTheme({
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: {
          borderColor: '#202020',
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: '#202020',
        },
      },
    },

    MuiButton: {
      styleOverrides: {
        root: {
          color: '#ffffff',
          backgroundColor: '#7134f5',
          padding: ' 16.5px 14px;',
          '&:hover': {
            backgroundColor: '#5f15ff',
          },
        },
      },
    },

    MuiTypography: {
      styleOverrides: {
        h1: {
          color: '#202020',
          textAlign: 'center',
          fontSize: '4rem',
          fontWeight: 'bold',
        },
        h2: {
          color: '#202020',
          textAlign: 'center',
          fontSize: '2rem',
          fontWeight: 'normal',
        },

        h3: {
          color: '#202020',
          textAlign: 'center',
          fontSize: '2rem',
          fontWeight: 'normal',
        },
      },
    },
  },
  palette: {
    mode: 'light',

    primary: {
      main: '#202020',
    },
    secondary: {
      main: '#202020',
    },
  },
});
