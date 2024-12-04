import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#ff0000',
        },
        secondary: {
          main: '#4caf50',
        },
  },
  typography: {
    fontFamily: '"Roboto", sans-serif',
  },
});

export default theme;
