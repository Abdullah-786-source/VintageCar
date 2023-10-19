import { createTheme } from '@mui/material/styles';


const theme = createTheme({
  palette: {
    background: {
        default: '#F5F5F5',
    },
    primary: {
      main: '#3876BF',
    },
    secondary: {
      main: '#FF6969',
    },
    icon: {
        main: '#3876BF',
      },
  },
  typography: {
    fontFamily: '"Roboto", sans-serif',
  },
  shape: {
    borderRadius: 4,
  },
});

export default theme;