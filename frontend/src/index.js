import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ThemeProvider } from '@mui/material/styles';
import theme from './component/pages/CreateTheme';
import GoogleFont from 'react-google-fonts';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <GoogleFont font="Rubik" />
  <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);