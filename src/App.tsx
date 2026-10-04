import React from 'react';



import { createMuiTheme } from '@material-ui/core/styles';

import AppRouter from './AppRouter';
import ThemeProvider from '@mui/material/styles/ThemeProvider';

const theme = createMuiTheme({
  typography: {
    fontFamily: [
      '"MPLUSRounded1c"',
      '"Hiragino Kaku Gothic ProN"',
      '"Yu Gothic"',
      '"Meiryo"',
      'sans-serif',
    ].join(','),
  }
});

function App() {
  return (

    <div className="App">

      <AppRouter />

    </div>



  );
}

export default App;
