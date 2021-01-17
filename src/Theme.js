import { createMuiTheme } from '@material-ui/core/styles';
import { green, pink } from '@material-ui/core/colors';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: pink[500],
      light: pink[300],
      dark: pink[900],
    },
    //secondary: {
      //main: '#f44336',
    //},
  },
});

export default theme;