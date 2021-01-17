import { createMuiTheme } from '@material-ui/core/styles';
import { yellow } from '@material-ui/core/colors';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: yellow[500],
      light: yellow[300],
      dark: yellow[900],
    },
    //secondary: {
      //main: '#f44336',
    //},
  },
});

export default theme;