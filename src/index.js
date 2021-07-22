import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {createTheme, MuiThemeProvider} from '@material-ui/core/styles';
import {Auth0Provider} from '@auth0/auth0-react';

const theme = createTheme({
  palette: {
    primary: {
      main: '#009688',
    },
    secondary: {
      main: '#1de9b6',
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider
        domain="pharma-see.eu.auth0.com"
        clientId="brQp5gxYHhEKwJ9yKJ2n4TnVc1zIr6Sk"
        redirectUri={window.location.origin}
    >
    <MuiThemeProvider theme={theme}>
      <App />
    </MuiThemeProvider>
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
