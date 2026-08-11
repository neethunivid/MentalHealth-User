import React from 'react';



import { createMuiTheme } from '@material-ui/core/styles';

import AppRouter from './AppRouter';
import ThemeProvider from '@mui/material/styles/ThemeProvider';

const theme = createMuiTheme({
  typography: {
    fontFamily: [
      "メイリオ",
      "Meiryo", 
      "ヒラギノ角ゴ Pro W3",
       "Hiragino Kaku Gothic Pro",
        "ＭＳ Ｐゴシック",
         "MS P Gothic",
          "Osaka",
           "Verdana",
            "Arial",
             "Helvetica",
              "sans-serif"

     
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
